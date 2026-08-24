import type { GuStack } from '@guardian/cdk/lib/constructs/core';
import { GuHttpsEgressSecurityGroup } from '@guardian/cdk/lib/constructs/ec2/security-groups/base';
import { Duration, type aws_ec2 as ec2 } from 'aws-cdk-lib';
import type { AutoScalingGroup } from 'aws-cdk-lib/aws-autoscaling';
import type { ISubnet, IVpc } from 'aws-cdk-lib/aws-ec2';
import {
	CfnTrafficMirrorFilter,
	CfnTrafficMirrorFilterRule,
	CfnTrafficMirrorTarget,
} from 'aws-cdk-lib/aws-ec2';
import {
	Cluster,
	ContainerImage,
	CpuArchitecture,
	Protocol as ECSProtocol,
	FargateService,
	FargateTaskDefinition,
	OperatingSystemFamily,
	PropagatedTagSource,
} from 'aws-cdk-lib/aws-ecs';
import {
	type ApplicationLoadBalancer,
	Protocol as ELBProtocol,
	NetworkLoadBalancer,
} from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import * as events from 'aws-cdk-lib/aws-events';
import { LambdaFunction } from 'aws-cdk-lib/aws-events-targets';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

export interface HttpTrafficMirroringProps {
	readonly vpc: IVpc;
	readonly privateSubnets: ISubnet[];
	readonly app: GuStack;
	readonly availabilityZone?: string;
	readonly trafficSource: AutoScalingGroup;
	readonly trafficTarget: ApplicationLoadBalancer;
}

export class HttpTrafficMirroring extends Construct {
	constructor(
		scope: Construct,
		id: string,
		props: HttpTrafficMirroringProps,
	) {
		super(scope, id);

		// if (props.trafficTarget.vpc === undefined) {
		// 	throw new Error("VPC not defined in mirroring target application load balancer.");
		// }
		// const vpc = props.trafficTarget.vpc;

		this.node.addDependency(props.trafficSource);
		this.node.addDependency(props.trafficTarget);

		const handlerNlb = this.createHandler(
			props.vpc,
			props.privateSubnets,
			props.app,
			props.trafficTarget,
		);

		const mirrorTarget: CfnTrafficMirrorTarget = new CfnTrafficMirrorTarget(
			this,
			'Target',
			{
				networkLoadBalancerArn: handlerNlb.loadBalancerArn,
			},
		);

		const mirrorFilter: ec2.CfnTrafficMirrorFilter =
			new CfnTrafficMirrorFilter(this, 'Filter', {
				description: `Traffic mirror filter created by ${id}`,
			});

		new CfnTrafficMirrorFilterRule(this, 'AllowAllInbound', {
			trafficMirrorFilterId: mirrorFilter.attrId,
			ruleAction: 'accept',
			ruleNumber: 100,
			trafficDirection: 'ingress',
			destinationCidrBlock: '0.0.0.0/0', // TODO: Narrow the CIDR block scopes.
			sourceCidrBlock: '0.0.0.0/0',
		});

		// Lambda function to attach Mirror Session on ASG instance launch
		// TODO: Will this always attach and run before the very first asg instances are created?
		const attacherLambda = new lambda.Function(
			this,
			'SessionAttacherLambda',
			{
				runtime: lambda.Runtime.NODEJS_24_X,
				handler: 'index.handler',
				timeout: Duration.seconds(30),
				code: lambda.Code.fromInline(`
		      const { EC2Client, DescribeInstancesCommand, CreateTrafficMirrorSessionCommand } = require('@aws-sdk/client-ec2');
		      const ec2 = new EC2Client();

		      exports.handler = async (event) => {
		        const instanceId = event.detail.EC2InstanceId;
		        const targetId = process.env.TARGET_ID;
		        const filterId = process.env.FILTER_ID;

		        console.log(\`Processing launch event for instance: \${instanceId}\`);

		        // Fetch instance details to get primary ENI ID
		        const describeRes = await ec2.send(new DescribeInstancesCommand({ InstanceIds: [instanceId] }));
		        const instance = describeRes.Reservations?.[0]?.Instances?.[0];
		        const primaryEniId = instance?.NetworkInterfaces?.[0]?.NetworkInterfaceId;

		        if (!primaryEniId) {
		          throw new Error(\`Unable to find primary ENI for instance: \${instanceId}\`);
		        }

		        // Attach Traffic Mirror Session (ASG instance ENI -> EC2 Worker Target ENI)
		        const sessionRes = await ec2.send(new CreateTrafficMirrorSessionCommand({
		          NetworkInterfaceId: primaryEniId,
		          TrafficMirrorTargetId: targetId,
		          TrafficMirrorFilterId: filterId,
		          SessionNumber: 1,
		          Description: \`Auto-attached traffic mirror for instance \${instanceId}\`,
		        }));

		        console.log(\`Successfully created session: \${sessionRes.TrafficMirrorSession.TrafficMirrorSessionId}\`);
		      };
		    `),
				environment: {
					TARGET_ID: mirrorTarget.attrId,
					FILTER_ID: mirrorFilter.attrId,
				},
			},
		);

		// Grant Lambda EC2 access permissions
		attacherLambda.addToRolePolicy(
			new iam.PolicyStatement({
				actions: [
					'ec2:DescribeInstances',
					'ec2:CreateTrafficMirrorSession',
				],
				resources: ['*'],
			}),
		);

		// EventBridge Rule to trigger Lambda on ASG Instance Launch
		const launchRule = new events.Rule(this, 'AsgInstanceLaunchRule', {
			eventPattern: {
				source: ['aws.autoscaling'],
				detailType: ['EC2 Instance Launch Successful'],
				detail: {
					AutoScalingGroupName: [
						props.trafficSource.autoScalingGroupName,
					],
				},
			},
		});

		launchRule.addTarget(new LambdaFunction(attacherLambda));
	}

	private createHandler(
		vpc: ec2.IVpc,
		subnets: ISubnet[],
		stack: GuStack,
		target: ApplicationLoadBalancer,
	): NetworkLoadBalancer {
		const cluster = Cluster.fromClusterAttributes(
			this,
			'MirroringHandlerEcsCluster',
			{
				clusterName: 'MirroringHandlerEcsCluster',
				vpc,
			},
		);

		const taskDefinition = new FargateTaskDefinition(
			this,
			'MirroringHandlerEcsTaskDefinition',
			{
				memoryLimitMiB: 2048,
				cpu: 1024,
				runtimePlatform: {
					cpuArchitecture: CpuArchitecture.ARM64,
					operatingSystemFamily: OperatingSystemFamily.LINUX,
				},
			},
		);

		// TCP for health check
		// We have to add this first as the network load balancer will send health check traffic to the default container.
		// If we don't add this first then we fail to add the ECS service to the target group as there is no tcp endpoint.
		// Can not do health check over UDP.
		//
		// Nginx by default serves a simple welcome page on port 80, which can pass the health check.
		taskDefinition.addContainer('MirroringHandlerHealthCheckContainer', {
			image: ContainerImage.fromRegistry('nginx'),
			portMappings: [
				{ containerPort: 80, protocol: ECSProtocol.TCP, hostPort: 80 },
			],
			// TODO: logging: fireLensLogDriver,
			readonlyRootFilesystem: true,
		});

		taskDefinition.addContainer('MirroringHandlerContainer', {
			image: ContainerImage.fromRegistry('jauderho/goreplay'),
			portMappings: [
				{
					containerPort: 4789,
					protocol: ECSProtocol.UDP,
					hostPort: 4789,
				},
			],
			command: [
				'--input-raw',
				':80',
				'--input-raw-engine',
				'vxlan',
				'--output-http',
				`http://${target.loadBalancerDnsName}`,
			],
			// TODO: logging: fireLensLogDriver,
			readonlyRootFilesystem: true,
		});

		const fargateService = new FargateService(
			this,
			'MirroringHandlerFargateService',
			{
				cluster,
				taskDefinition,
				vpcSubnets: { subnets },
				// Important for service deployments; with the AWS defaults the service can be scaled down when deploying
				minHealthyPercent: 100,
				// Also important for service deployments; with the AWS defaults we don't get a fast failure when deploying a 'bad' build
				circuitBreaker: { enable: true, rollback: true },
				propagateTags: PropagatedTagSource.SERVICE,
				// By default, AWS will create a new security group which allows all outbound traffic
				// We don't want this so explicitly allow outbound HTTPS only
				// This is what we do for the current GuEc2App pattern:
				// https://github.com/guardian/cdk/blob/3b5688637024642055ed0bf576f668e56e40830d/src/constructs/autoscaling/asg.ts#L143-L145
				securityGroups: [
					GuHttpsEgressSecurityGroup.forVpc(stack, {
						app: `${stack.app}-ecs`,
						vpc,
					}),
				],
			},
		);

		const nlb = new NetworkLoadBalancer(this, 'MirroringHandlerNLB', {
			vpc,
			internetFacing: false, // Don't think this is needed given the subnets, but i want to be safe
			vpcSubnets: { subnets },
		});

		const listener = nlb.addListener('MirroringHandlerListener', {
			port: 4789,
			protocol: ELBProtocol.UDP,
		});

		const targetGroup = listener.addTargets('ECSHandlers', {
			port: 4789,
			protocol: ELBProtocol.UDP,
		});

		targetGroup.addTarget(fargateService);

		return nlb;
	}
}
