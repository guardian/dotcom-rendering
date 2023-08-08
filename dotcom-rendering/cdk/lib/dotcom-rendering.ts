import { join } from 'node:path';
import { GuAutoScalingGroup } from '@guardian/cdk/lib/constructs/autoscaling';
import {
	GuAmiParameter,
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
import { CfnOutput, Duration } from 'aws-cdk-lib';
import { AdjustmentType, CfnScalingPolicy, HealthCheck } from 'aws-cdk-lib/aws-autoscaling';
import { InstanceType, Peer } from 'aws-cdk-lib/aws-ec2';
import { LoadBalancingProtocol } from 'aws-cdk-lib/aws-elasticloadbalancing';
import { CfnInclude } from 'aws-cdk-lib/cloudformation-include';
import type { DCRProps } from './types';
import { getUserData } from './userData';

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
			reason: 'Retaining a stateful resource previously defined in YAML',
		});

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
					LoadBalancerName: `${stack}-${stage}-${app}-ELB`,
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

		const instanceSecurityGroup = new GuSecurityGroup(
			this,
			'InstanceSecurityGroup',
			{
				app,
				description: 'rendering instance',
				vpc,
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
			reason: 'Retaining a stateful resource previously defined in YAML',
		});

		const instanceRole = new GuInstanceRole(this, {
			app,
			additionalPolicies: [
				//todo: do we need the first two policies? They are provided by default?
				new GuAllowPolicy(this, 'AllowPolicyGetArtifactsBucket', {
					actions: ['s3:GetObject'],
					resources: ['arn:aws:s3:::aws-frontend-artifacts/*'],
				}),
				new GuAllowPolicy(this, 'AllowPolicyCloudwatchLogs', {
					actions: ['cloudwatch:*', 'logs:*'],
					resources: ['*'],
				}),
				new GuAllowPolicy(this, 'AllowPolicyDescribeEc2Autoscaling', {
					actions: [
						'ec2:DescribeTags',
						'ec2:DescribeInstances',
						'autoscaling:DescribeAutoScalingGroups',
						'autoscaling:DescribeAutoScalingInstances',
					],
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
						`arn:aws:ssm:${region}:${this.account}:parameter/frontend/*`,
						`arn:aws:ssm:${region}:${this.account}:parameter/dotcom/*`,
						`arn:aws:ssm:${region}:${this.account}:parameter/${ssmPrefix}/*`,
					],
				}),
			],
		});
		this.overrideLogicalId(instanceRole, {
			logicalId: 'InstanceRole',
			reason: 'Retaining a stateful resource previously defined in YAML',
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
				region,
				stage,
				elkStreamId: new GuStringParameter(this, 'ELKStreamId', {
					fromSSM: true,
					default: `${ssmPrefix}/logging.stream.name`,
				}).valueAsString,
			}),
			imageId: new GuAmiParameter(this, {
				app,
				fromSSM: true,
				default: `${ssmPrefix}/ami.imageId`,
			}),
			imageRecipe: props.amiRecipe,
			role: instanceRole,
			additionalSecurityGroups: [instanceSecurityGroup],
			vpcSubnets: { subnets: privateSubnets },
			withoutImdsv2: true,
		});
		this.overrideLogicalId(asg, {
			logicalId: 'AutoscalingGroup',
			reason: 'Retaining a stateful resource previously defined in YAML',
		});

		asg.attachToClassicLB(loadBalancer);

		const scaleDownPolicy = new CfnScalingPolicy(this, 'ScaleDownPolicy', {
			adjustmentType: AdjustmentType.CHANGE_IN_CAPACITY,
			autoScalingGroupName: asg.autoScalingGroupName,
			cooldown: '120',
			scalingAdjustment: -1,
		  });

		const scaleUpPolicy = new CfnScalingPolicy(this, 'ScaleUpPolicy', {
			adjustmentType: AdjustmentType.PERCENT_CHANGE_IN_CAPACITY,
			autoScalingGroupName: asg.autoScalingGroupName,
			cooldown: '600',
			scalingAdjustment: 100,
		  });

		const yamlTemplateFilePath = join(
			__dirname,
			'../..',
			'cloudformation.yml',
		);

		new CfnInclude(this, 'YamlTemplate', {
			templateFile: yamlTemplateFilePath,
			parameters: {
				AutoscalingGroup: asg.autoScalingGroupName,
				InternalLoadBalancer: loadBalancer.loadBalancerName,
				InstanceRole: instanceRole.roleName,
				ScaleDownPolicy: scaleDownPolicy.logicalId,
				ScaleUpPolicy: scaleUpPolicy.logicalId,
			},
		});

		new CfnOutput(this, 'LoadBalancerUrl', {
			value: loadBalancer.loadBalancerDnsName,
		});
	}
}
