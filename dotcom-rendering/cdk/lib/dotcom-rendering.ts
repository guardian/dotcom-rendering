import { join } from 'node:path';
import type { GuStackProps } from '@guardian/cdk/lib/constructs/core';
import { GuStack, GuStringParameter } from '@guardian/cdk/lib/constructs/core';
import { GuSecurityGroup, GuVpc } from '@guardian/cdk/lib/constructs/ec2';
import { GuClassicLoadBalancer } from '@guardian/cdk/lib/constructs/loadbalancing';
import { GuAllowPolicy, GuInstanceRole } from '@guardian/cdk/lib/constructs/iam';
import type { App } from 'aws-cdk-lib';
import { Duration } from "aws-cdk-lib";
import { Peer } from 'aws-cdk-lib/aws-ec2';
import { LoadBalancingProtocol } from "aws-cdk-lib/aws-elasticloadbalancing";
import { CfnInclude } from 'aws-cdk-lib/cloudformation-include';

interface DCRProps extends GuStackProps {
	app: string;
	region: string;
}

export class DotcomRendering extends GuStack {
	constructor(scope: App, id: string, props: DCRProps) {
		super(scope, id, props);

		// This fetches the VPC using the SSM parameter defined for this account
		// and specifies the CIDR block to use with it here
		const vpc = GuVpc.fromIdParameter(this, 'vpc', {
			vpcCidrBlock: '10.248.136.0/22',
		});

		const lbSecurityGroup = new GuSecurityGroup(
			this,
			'InternalLoadBalancerSecurityGroup',
			{
				app: props.app,
				description:
					'Allows HTTP and HTTPS inbound connections from within the VPC',
				vpc,
				ingresses: [
					{
						range: Peer.ipv4(vpc.vpcCidrBlock),
						port: 80,
						description: 'TCP 80 ingress',
					},
					{
						range: Peer.ipv4(vpc.vpcCidrBlock),
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

		const instanceSecurityGroup = new GuSecurityGroup(
			this,
			'InstanceSecurityGroup',
			{
				app: props.app,
				description:
					'rendering instance',
				vpc,
				ingresses: [
					{
						range: Peer.ipv4(vpc.vpcCidrBlock),
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

		const lb = new GuClassicLoadBalancer(this, 'InternalLoadBalancer', {
			app: props.app,
			vpc,
			listeners: [{
				internalProtocol: LoadBalancingProtocol.HTTP,
				internalPort: 80,
				externalProtocol: LoadBalancingProtocol.HTTP,
				externalPort: 9000,
			}],
			healthCheck: {
				port: 9000,
				path: '/_healthcheck',
				healthyThreshold: 2,
				unhealthyThreshold: 10,
				interval: Duration.seconds(30),
				timeout: Duration.seconds(10),
			},
			subnetSelection: { subnets: vpc.publicSubnets },
			crossZone: true,
			accessLoggingPolicy: {
				enabled: true,
				emitInterval: 5,
				s3BucketName: new GuStringParameter(this, 'ELBLogsParameter', {
					default: `/${props.stack}/${props.app}/${props.stage}/elb.logs.bucketName`,
					fromSSM: true,
					description: 'S3 Bucket Name for ELB logs',
				}).valueAsString,
				s3BucketPrefix: `/ELBLogs/${props.stack}/${props.app}/${props.stage}`,
			},
		});

		this.overrideLogicalId(lb, {
			logicalId: 'InternalLoadBalancer',
			reason: 'Retaining a stateful resource previously defined in YAML',
		});

		const instanceRole = new GuInstanceRole(this, {
			app: props.app,
			additionalPolicies: [
				//todo: do we need the first two policies? They are provided by default?
				new GuAllowPolicy(this, 'AllowPolicyGetArtifactsBucket', {
					actions: ['s3:GetObject'],
					resources: ['arn:aws:s3:::aws-frontend-artifacts/*']
				}),
				new GuAllowPolicy(this, 'AllowPolicyCloudwatchLogs', {
					actions: ['cloudwatch:*', 'logs:*'],
					resources: ['*']
				}),
				new GuAllowPolicy(this, 'AllowPolicyDescribeEc2Autoscaling', {
					actions: [
						'ec2:DescribeTags',
						'ec2:DescribeInstances',
						'autoscaling:DescribeAutoScalingGroups',
						'autoscaling:DescribeAutoScalingInstances'
					],
					resources: ['*']
				}),
				new GuAllowPolicy(this, 'AllowPolicyDescribeDecryptKms', {
					actions: ['kms:Decrypt', 'kms:DescribeKey'],
					resources: [`arn:aws:kms:${this.region}:${this.account}:FrontendConfigKey`],

				}),
				new GuAllowPolicy(this, 'AllowPolicyGetSsmParamsByPath', {
					actions: ['ssm:GetParametersByPath', 'ssm:GetParameter'],
					resources: [`arn:aws:ssm:${props.region}:${this.account}:parameter/frontend/*`, `arn:aws:ssm:${props.region}:${this.account}:parameter/dotcom/*`]
				}),
			]
		});

		this.overrideLogicalId(instanceRole, {
			logicalId: 'InstanceRole',
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
				VpcId: vpc.vpcId,
				VPCIpBlock: vpc.vpcCidrBlock,
				InternalLoadBalancerSecurityGroup: lbSecurityGroup.securityGroupId,
				InstanceSecurityGroup: instanceSecurityGroup.securityGroupId,
				InternalLoadBalancer: lb.idWithApp,
				InstanceRole: instanceRole.roleName,
			}
		});
	}
}
