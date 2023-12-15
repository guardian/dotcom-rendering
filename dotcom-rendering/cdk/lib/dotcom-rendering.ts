import { GuAutoScalingGroup } from '@guardian/cdk/lib/constructs/autoscaling';
import {
	GuDistributionBucketParameter,
	GuLoggingStreamNameParameter,
	GuStack,
	GuStringParameter,
} from '@guardian/cdk/lib/constructs/core';
import {
	GuSecurityGroup,
	GuVpc,
	SubnetType,
} from '@guardian/cdk/lib/constructs/ec2';
import {
	GuAllowPolicy,
	GuInstanceRole,
} from '@guardian/cdk/lib/constructs/iam';
import { GuClassicLoadBalancer } from '@guardian/cdk/lib/constructs/loadbalancing';
import type { App } from 'aws-cdk-lib';
import { CfnOutput, Duration, Tags } from 'aws-cdk-lib';
import {
	AdjustmentType,
	CfnScalingPolicy,
	HealthCheck,
} from 'aws-cdk-lib/aws-autoscaling';
import { CfnAlarm } from 'aws-cdk-lib/aws-cloudwatch';
import { InstanceType, Peer } from 'aws-cdk-lib/aws-ec2';
import { LoadBalancingProtocol } from 'aws-cdk-lib/aws-elasticloadbalancing';
import { StringParameter } from 'aws-cdk-lib/aws-ssm';
import type { DCRAlarmConfig, DCRProps } from './types';
import { getUserData } from './userData';

/**
 * DCR infrastructure provisioning via CDK
 *
 * We currently specify resources by using individual CDK constructs but at some
 * point it would be better to move towards the GuEc2App pattern
 * @see https://github.com/guardian/cdk/blob/main/src/patterns/ec2-app/base.ts
 *
 * For this we'll need to do a dual-stack migration
 * @see https://github.com/guardian/cdk/blob/main/docs/migration-guide-ec2.md
 */
export class DotcomRendering extends GuStack {
	constructor(scope: App, id: string, props: DCRProps) {
		super(scope, id, props);

		const { app, region, stack, stage } = props;

		const ssmPrefix = `/${stage}/${stack}/${app}`;

		// This fetches the VPC using the SSM parameter defined for this account
		// and specifies the CIDR block to use with it here
		const vpcCidrBlock = '10.248.136.0/22';
		const vpc = GuVpc.fromIdParameter(this, 'vpc', { vpcCidrBlock });
		const publicSubnets = GuVpc.subnetsFromParameter(this, {
			type: SubnetType.PUBLIC,
		});
		const privateSubnets = GuVpc.subnetsFromParameter(this, {
			type: SubnetType.PRIVATE,
		});

		// ------------------------------------
		// Load balancer related resources
		// ------------------------------------
		const lbSecurityGroup = new GuSecurityGroup(
			this,
			'InternalLoadBalancerSecurityGroup',
			{
				app,
				description:
					'Allows HTTP and HTTPS inbound connections from within the VPC',
				vpc,
				ingresses: [
					{
						range: Peer.ipv4(vpcCidrBlock),
						port: 80,
						description: 'TCP 80 ingress',
					},
					{
						range: Peer.ipv4(vpcCidrBlock),
						port: 443,
						description: 'TCP 443 ingress',
					},
				],
			},
		);
		this.overrideLogicalId(lbSecurityGroup, {
			logicalId: 'InternalLoadBalancerSecurityGroup',
			reason: 'Retaining logical ID of resource created via CDK which cannot be changed easily',
		});

		/**
		 * TODO - migrate this ELB (classic load balancer) to an ALB (application load balancer)
		 * @see https://github.com/guardian/cdk/blob/512536bd590b26d9fcac5d39329e8217103d7859/src/constructs/loadbalancing/elb.ts#L24-L46
		 *
		 * GOTCHA: The load balancer name appends `-ELB` when the `app = "rendering"` for backwards compatibility
		 * We removed this to avoid the `LoadBalancerName.length > 32`. This will be fixable once we migrate to ALBs.
		 */
		const loadBalancerName =
			app === 'rendering'
				? `${stack}-${stage}-${app}-ELB`
				: `${stack}-${stage}-${app}`;
		const loadBalancer = new GuClassicLoadBalancer(
			this,
			'InternalLoadBalancer',
			{
				app,
				vpc,
				accessLoggingPolicy: {
					enabled: true,
					s3BucketName: new GuStringParameter(
						this,
						'ELBLogsParameter',
						{
							default: `${ssmPrefix}/elb.logs.bucketName`,
							fromSSM: true,
							description: 'S3 Bucket Name for ELB logs',
						},
					).valueAsString,
					emitInterval: 5,
					s3BucketPrefix: `ELBLogs/${stack}/${app}/${stage}`,
				},
				crossZone: true,
				healthCheck: {
					interval: Duration.seconds(30),
					port: 9000,
					protocol: LoadBalancingProtocol.HTTP,
					timeout: Duration.seconds(10),
					healthyThreshold: 2,
					unhealthyThreshold: 10,
					path: '/_healthcheck',
				},
				listeners: [
					{
						externalPort: 80,
						externalProtocol: LoadBalancingProtocol.HTTP,
						internalPort: 9000,
						internalProtocol: LoadBalancingProtocol.HTTP,
					},
				],
				subnetSelection: { subnets: publicSubnets },
				propertiesToOverride: {
					LoadBalancerName: loadBalancerName,
					// Note: this does not prevent the GuClassicLoadBalancer
					// from creating a default security group, though it does
					// override which one is used/associated with the load balancer
					SecurityGroups: [lbSecurityGroup.securityGroupId],
				},
			},
		);
		this.overrideLogicalId(loadBalancer, {
			logicalId: 'InternalLoadBalancer',
			reason: 'Retaining a stateful resource previously defined in YAML',
		});
		// Load balancer DNS name output
		new CfnOutput(this, 'LoadBalancerUrl', {
			value: loadBalancer.loadBalancerDnsName,
		});

		new StringParameter(this, 'loadBalancerDnsName', {
			// Annoyingly this doesn't follow the same pattern as the other SSM parameters
			parameterName: `/${stack}/${stage}/${app}.loadBalancerDnsName`,
			stringValue: loadBalancer.loadBalancerDnsName,
		});

		const artifactsBucket =
			GuDistributionBucketParameter.getInstance(this).valueAsString;

		// ------------------------------------

		// ------------------------------------
		// Autoscaling group related resources
		// ------------------------------------
		const instanceSecurityGroup = new GuSecurityGroup(
			this,
			'InstanceSecurityGroup',
			{
				app,
				vpc,
				// This description is poor but changing it results in deletion and
				// recreation of the security group, which is not ideal
				description: 'rendering instance',
				ingresses: [
					{
						range: Peer.ipv4(vpcCidrBlock),
						port: 9000,
						description: 'TCP 9000 ingress',
					},
				],
			},
		);
		this.overrideLogicalId(instanceSecurityGroup, {
			logicalId: 'InstanceSecurityGroup',
			reason: 'Retaining logical ID of resource created via CDK which cannot be changed easily',
		});

		const loggingStreamName =
			GuLoggingStreamNameParameter.getInstance(this).valueAsString;

		const instanceRole = new GuInstanceRole(this, {
			app,
			additionalPolicies: [
				new GuAllowPolicy(this, 'AllowPolicyGetArtifactsBucket', {
					actions: ['s3:GetObject'],
					resources: [`arn:aws:s3:::${artifactsBucket}/*`],
				}),
				new GuAllowPolicy(this, 'AllowPolicyCloudwatchLogs', {
					actions: ['cloudwatch:*', 'logs:*'],
					resources: ['*'],
				}),
				new GuAllowPolicy(this, 'AllowPolicyDescribeDecryptKms', {
					actions: ['kms:Decrypt', 'kms:DescribeKey'],
					resources: [
						`arn:aws:kms:${region}:${this.account}:FrontendConfigKey`,
					],
				}),
				new GuAllowPolicy(this, 'AllowPolicyGetSsmParamsByPath', {
					actions: ['ssm:GetParametersByPath', 'ssm:GetParameter'],
					resources: [
						`arn:aws:ssm:${region}:${this.account}:parameter${ssmPrefix}/*`,
						// TODO - these SSM prefixes are dated, should convert the params to the naming structure above
						`arn:aws:ssm:${region}:${this.account}:parameter/frontend/*`,
						`arn:aws:ssm:${region}:${this.account}:parameter/dotcom/*`,
					],
				}),
			],
		});
		this.overrideLogicalId(instanceRole, {
			logicalId: 'InstanceRole',
			reason: 'Retaining logical ID of resource created via CDK which cannot be changed easily',
		});

		const asg = new GuAutoScalingGroup(this, 'AutoscalingGroup', {
			app,
			vpc,
			instanceType: new InstanceType(props.instanceType),
			minimumInstances: props.minCapacity,
			maximumInstances: props.maxCapacity,
			healthCheck: HealthCheck.elb({ grace: Duration.minutes(2) }),
			userData: getUserData({
				app,
				stage,
				artifactsBucket,
			}),
			role: instanceRole,
			additionalSecurityGroups: [instanceSecurityGroup],
			vpcSubnets: { subnets: privateSubnets },
			withoutImdsv2: true,
		});

		Tags.of(asg).add('LogKinesisStreamName', loggingStreamName); // do we need PropagateAtLaunch?
		Tags.of(asg).add('SystemdUnit', `${app}.service`);

		// ! Important !
		// Ensure the ASG is attached to the load balancer
		// This is because our auto scaling group uses the ELB for healthchecks
		// If the ASG and ELB are not attached, the ASG health checks will fail
		asg.attachToClassicLB(loadBalancer);

		this.overrideLogicalId(asg, {
			logicalId: 'AutoscalingGroup',
			reason: 'Retaining a stateful resource previously defined in YAML',
		});
		// ------------------------------------

		// ------------------------------------
		// Alarms
		// ------------------------------------

		/** TODO - migrate these simple scaling policies
		 * @see https://github.com/guardian/dotcom-rendering/issues/8345#issuecomment-1647502598
		 */
		const scaleUpPolicy = new CfnScalingPolicy(this, 'ScaleUpPolicy', {
			adjustmentType: AdjustmentType.PERCENT_CHANGE_IN_CAPACITY,
			autoScalingGroupName: asg.autoScalingGroupName,
			cooldown: '600',
			scalingAdjustment: 100,
		});
		const scaleDownPolicy = new CfnScalingPolicy(this, 'ScaleDownPolicy', {
			adjustmentType: AdjustmentType.CHANGE_IN_CAPACITY,
			autoScalingGroupName: asg.autoScalingGroupName,
			cooldown: '120',
			scalingAdjustment: -1,
		});

		/** Returns an appropriate alarm description given the appropriate configuration object */
		const getAlarmDescription = ({
			title,
			comparisonOperator,
			threshold,
			evaluationPeriod,
			period,
		}: { title: string } & DCRAlarmConfig): string =>
			`${title} is ${comparisonOperator} of ${threshold} over ${evaluationPeriod} period(s) of ${period} seconds`;

		// Latency scaling alarm
		const latencyScalingAlarmConfig: DCRAlarmConfig = {
			threshold: 0.2,
			period: 60,
			evaluationPeriod: 1,
			comparisonOperator: 'GreaterThanOrEqualToThreshold',
		};
		new CfnAlarm(this, 'LatencyScalingAlarm', {
			actionsEnabled: stage === 'PROD',
			alarmDescription: getAlarmDescription({
				title: 'Scale up if latency',
				...latencyScalingAlarmConfig,
			}),
			dimensions: [
				{
					name: 'LoadBalancerName',
					value: loadBalancer.loadBalancerName,
				},
			],
			evaluationPeriods: latencyScalingAlarmConfig.evaluationPeriod,
			metricName: 'Latency',
			namespace: 'AWS/ELB',
			period: latencyScalingAlarmConfig.period,
			statistic: 'Average',
			threshold: latencyScalingAlarmConfig.threshold,
			comparisonOperator: latencyScalingAlarmConfig.comparisonOperator,
			okActions: [scaleDownPolicy.attrArn],
			alarmActions: [scaleUpPolicy.attrArn],
		});

		// Backend 5XX alarm
		const criticalAlertsTopicArn = `arn:aws:sns:${region}:${this.account}:Frontend-${stage}-CriticalAlerts`;
		const backend5XXAlarmConfig: DCRAlarmConfig = {
			threshold: 100,
			period: 60,
			evaluationPeriod: 5,
			comparisonOperator: 'GreaterThanOrEqualToThreshold',
		};
		new CfnAlarm(this, 'Backend5xxAlarm', {
			actionsEnabled: stage === 'PROD',
			alarmDescription: getAlarmDescription({
				title: 'Notify if 5XX backend errors',
				...backend5XXAlarmConfig,
			}),
			comparisonOperator: backend5XXAlarmConfig.comparisonOperator,
			dimensions: [
				{
					name: 'LoadBalancerName',
					value: loadBalancer.loadBalancerName,
				},
			],
			metricName: 'HTTPCode_Backend_5XX',
			namespace: 'AWS/ELB',
			evaluationPeriods: backend5XXAlarmConfig.evaluationPeriod,
			period: backend5XXAlarmConfig.period,
			statistic: 'Sum',
			threshold: backend5XXAlarmConfig.threshold,
			alarmActions: [criticalAlertsTopicArn],
			okActions: [criticalAlertsTopicArn],
		});
		// ------------------------------------
	}
}
