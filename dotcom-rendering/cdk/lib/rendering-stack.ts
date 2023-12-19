import { GuAutoScalingGroup } from '@guardian/cdk/lib/constructs/autoscaling';
import type { GuStackProps } from '@guardian/cdk/lib/constructs/core';
import {
	GuStack as CDKStack,
	GuDistributionBucketParameter,
	GuLoggingStreamNameParameter,
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
import type { App as CDKApp } from 'aws-cdk-lib';
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
import { getUserData } from './userData';

export interface RenderingCDKStackProps extends Omit<GuStackProps, 'stack'> {
	/**
	 * The name of the application
	 */
	guApp: 'article' | 'facia' | 'misc' | 'interactive';
	/**
	 * The minimum number of instances in the autoscaling group
	 */
	minCapacity: number;
	/**
	 * The maximum number of instances in the autoscaling group.
	 * Defaults to twice the minimum capacity if not specified
	 */
	maxCapacity?: number;
	/**
	 * EC2 Instance Type to use for dotcom-rendering
	 */
	instanceType: string;
}

interface DCRAlarmConfig {
	comparisonOperator: string;
	threshold: number;
	evaluationPeriod: number;
	period: number;
}

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
export class RenderingCDKStack extends CDKStack {
	constructor(scope: CDKApp, id: string, props: RenderingCDKStackProps) {
		super(scope, id, {
			...props,
			// Any version of this app should run in the eu-west-1 region
			env: { region: 'eu-west-1' },
			// Set the stack within the constructor as this won't vary between apps
			stack: 'rendering',
		});

		const { guApp, stage } = props;
		const { region, stack: guStack } = this;

		const ssmPrefix = `/${stage}/${guStack}/${guApp}`;

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

		const artifactsBucket =
			GuDistributionBucketParameter.getInstance(this).valueAsString;

		const loggingStreamName =
			GuLoggingStreamNameParameter.getInstance(this).valueAsString;

		// ------------------------------------
		// Load balancer related resources
		// ------------------------------------
		const lbSecurityGroup = new GuSecurityGroup(
			this,
			'InternalLoadBalancerSecurityGroup',
			{
				app: guApp,
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
		 * TODO - migrate this ELB (classic load balancer) to an ALB (guApplication load balancer)
		 * @see https://github.com/guardian/cdk/blob/512536bd590b26d9fcac5d39329e8217103d7859/src/constructs/loadbalancing/elb.ts#L24-L46
		 *
		 * GOTCHA: The load balancer for article is named specifically for backwards compatibility
		 */
		const loadBalancerName =
			guApp === 'article'
				? `frontend-${stage}-rendering-ELB`
				: `${guStack}-${stage}-${guApp}`;
		const loadBalancer = new GuClassicLoadBalancer(
			this,
			'InternalLoadBalancer',
			{
				app: guApp,
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
					s3BucketPrefix: `ELBLogs/${guStack}/${guApp}/${stage}`,
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
			parameterName: `/${guStack}/${stage}/${guApp}.loadBalancerDnsName`,
			stringValue: loadBalancer.loadBalancerDnsName,
		});

		// ------------------------------------

		// ------------------------------------
		// Autoscaling group related resources
		// ------------------------------------
		const instanceSecurityGroup = new GuSecurityGroup(
			this,
			'InstanceSecurityGroup',
			{
				app: guApp,
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

		const instanceRole = new GuInstanceRole(this, {
			app: guApp,
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
			app: guApp,
			vpc,
			instanceType: new InstanceType(props.instanceType),
			minimumInstances: props.minCapacity,
			maximumInstances: props.maxCapacity,
			healthCheck: HealthCheck.elb({ grace: Duration.minutes(2) }),
			userData: getUserData({
				guApp,
				guStack,
				stage,
				artifactsBucket,
			}),
			role: instanceRole,
			additionalSecurityGroups: [instanceSecurityGroup],
			vpcSubnets: { subnets: privateSubnets },
			withoutImdsv2: true,
		});

		Tags.of(asg).add('LogKinesisStreamName', loggingStreamName);
		Tags.of(asg).add('SystemdUnit', `${guApp}.service`);

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
