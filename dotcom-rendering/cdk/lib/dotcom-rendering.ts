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
import type { App } from 'aws-cdk-lib';
import { CfnOutput, Duration } from 'aws-cdk-lib';
import { HealthCheck } from 'aws-cdk-lib/aws-autoscaling';
import { InstanceType, Peer } from 'aws-cdk-lib/aws-ec2';
import { CfnLoadBalancer } from 'aws-cdk-lib/aws-elasticloadbalancing';
import { CfnInclude } from 'aws-cdk-lib/cloudformation-include';
import { getUserData } from './launch-config';
import type { DCRProps } from './types';

export class DotcomRendering extends GuStack {
	constructor(scope: App, id: string, props: DCRProps) {
		super(scope, id, props);

		const { app, region, stack, stage } = props;

		const ssmPrefix = `/${stage}/${stack}/${app}`;

		// This fetches the VPC using the SSM parameter defined for this account
		// and specifies the CIDR block to use with it here
		const vpcCidrBlock = '10.248.136.0/22';
		const vpc = GuVpc.fromIdParameter(this, 'vpc', {
			vpcCidrBlock,
		});
		const publicSubnets = GuVpc.subnetsFromParameter(this, {
			type: SubnetType.PUBLIC,
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

		const lb = new CfnLoadBalancer(this, 'InternalLoadBalancer', {
			listeners: [
				{
					instancePort: '9000',
					protocol: 'HTTP',
					loadBalancerPort: '80',
				},
			],
			healthCheck: {
				target: 'HTTP:9000/_healthcheck',
				interval: '30',
				timeout: '10',
				unhealthyThreshold: '10',
				healthyThreshold: '2',
			},
			subnets: publicSubnets.map((subnet) => subnet.subnetId),
			scheme: 'internal',
			securityGroups: [lbSecurityGroup.securityGroupId],
			crossZone: true,
			accessLoggingPolicy: {
				enabled: true,
				emitInterval: 5,
				s3BucketName: new GuStringParameter(this, 'ELBLogsParameter', {
					default: `${ssmPrefix}/elb.logs.bucketName`,
					fromSSM: true,
					description: 'S3 Bucket Name for ELB logs',
				}).valueAsString,
				s3BucketPrefix: `ELBLogs/${stack}/${app}/${stage}`,
			},
			loadBalancerName: `${stack}-${stage}-${app}-ELB`,
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
			vpcSubnets: { subnets: publicSubnets },
		});
		this.overrideLogicalId(asg, {
			logicalId: 'AutoscalingGroup',
			reason: 'Retaining a stateful resource previously defined in YAML',
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
				InternalLoadBalancer: lb.ref,
				InstanceRole: instanceRole.roleName,
			},
		});

		new CfnOutput(this, 'LoadBalancerUrl', {
			value: lb.attrDnsName,
		});
	}
}
