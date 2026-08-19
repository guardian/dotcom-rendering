import {
	Duration,
	aws_ec2 as ec2,
	aws_events as events,
	aws_events_targets as targets,
	aws_iam as iam,
	aws_lambda as lambda,
} from 'aws-cdk-lib';
import type { AutoScalingGroup } from 'aws-cdk-lib/aws-autoscaling';
import { Instance, ISubnet, IVpc } from 'aws-cdk-lib/aws-ec2';
import type { ApplicationLoadBalancer } from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import { Construct } from 'constructs';

export interface HttpTrafficMirroringProps {
	readonly vpc: IVpc;
	readonly privateSubnets: ISubnet[];
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

		const handlerInstance = this.createEc2Handler(
			props.vpc,
			props.privateSubnets,
			props.trafficTarget,
			props.availabilityZone,
		);

		// Ensure the ASG instances can send VXLAN (UDP 4789) to the handler
		handlerInstance.connections.allowFrom(
			props.trafficSource,
			ec2.Port.udp(4789),
			'Allow VXLAN mirrored traffic from ASG instances',
		);

		const mirrorTarget: ec2.CfnTrafficMirrorTarget =
			new ec2.CfnTrafficMirrorTarget(this, 'Target', {
				networkInterfaceId: this.getENIId(handlerInstance),
			});

		const mirrorFilter: ec2.CfnTrafficMirrorFilter =
			new ec2.CfnTrafficMirrorFilter(this, 'Filter', {
				description: `Traffic mirror filter created by ${id}`,
			});

		new ec2.CfnTrafficMirrorFilterRule(this, 'AllowAllInbound', {
			trafficMirrorFilterId: mirrorFilter.attrId,
			ruleAction: 'accept',
			ruleNumber: 100,
			trafficDirection: 'ingress',
			destinationCidrBlock: '0.0.0.0/0', // TODO: Narrow the CIDR block scopes.
			sourceCidrBlock: '0.0.0.0/0',
		});

		// Lambda function to attach Mirror Session on ASG instance launch
		const attacherLambda = new lambda.Function(
			this,
			'SessionAttacherLambda',
			{
				runtime: lambda.Runtime.NODEJS_20_X,
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

		// 5. EventBridge Rule to trigger Lambda on ASG Instance Launch
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

		launchRule.addTarget(new targets.LambdaFunction(attacherLambda));
	}

	/**
	 * Spawns an EC2 instance that strips VXLAN headers and replays HTTP payloads to the Target ALB.
	 */
	private createEc2Handler(
		vpc: ec2.IVpc,
		subnets: ISubnet[],
		targetAlb: ApplicationLoadBalancer,
		availabilityZone?: string,
	): ec2.Instance {
		const worker = new ec2.Instance(this, 'VXLANHandler', {
			vpc: vpc,
			vpcSubnets: { subnets: subnets },
			// availabilityZone: availabilityZone,
			instanceType: ec2.InstanceType.of(
				ec2.InstanceClass.T3,
				ec2.InstanceSize.MEDIUM,
			),
			machineImage: ec2.MachineImage.latestAmazonLinux2023(),
		});

		// Write a UserData script to unwrap VXLAN on port 4789 and forward HTTP requests to the ALB
		worker.userData.addCommands(
			'yum update -y',
			'yum install -y python3-pip gcc python3-devel',
			'pip3 install scapy requests',

			// Minimal Python daemon to capture UDP 4789 (VXLAN), strip frame headers, and fire non-blocking HTTP requests
			"cat << 'EOF' > /opt/vxlan_unwrapper.py",
			'import socket',
			'import threading',
			'import requests',
			'from scapy.all import Ether, IP, TCP, Raw',
			'',
			`TARGET_ALB_URL = "http://${targetAlb.loadBalancerDnsName}"`,
			'',
			'def forward_request(method, path, headers, payload):',
			'    try:',
			'        # Send HTTP request to ALB, fire-and-forget (timeout=0.1 / ignore response)',
			'        requests.request(method, TARGET_ALB_URL + path, headers=headers, data=payload, timeout=0.1)',
			'    except Exception:',
			'        pass',
			'',
			'def listen_vxlan():',
			'    sock = socket.socket(socket.AF_INET, socket.SOCK_RAW, socket.IPPROTO_UDP)',
			'    sock.bind(("0.0.0.0", 4789))',
			'    while True:',
			'        data, _ = sock.recvfrom(65535)',
			'        # Skip UDP header (8 bytes) & VXLAN header (8 bytes)',
			'        inner_packet = data[16:]',
			'        try:',
			'            pkt = Ether(inner_packet)',
			'            if pkt.haslayer(Raw) and pkt.haslayer(TCP):',
			'                payload = pkt[Raw].load.decode("utf-8", errors="ignore")',
			'                if payload.startswith(("GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS")):',
			'                    lines = payload.split("\\r\\n")',
			'                    parts = lines[0].split(" ")',
			'                    if len(parts) >= 2:',
			'                        method, path = parts[0], parts[1]',
			'                        threading.Thread(target=forward_request, args=(method, path, {}, None)).start()',
			'        except Exception:',
			'            pass',
			'',
			'if __name__ == "__main__":',
			'    listen_vxlan()',
			'EOF',

			// Run as a system service
			"cat << 'EOF' > /etc/systemd/system/vxlan-worker.service",
			'[Unit]',
			'Description=VXLAN Unwrapper and HTTP Forwarder',
			'After=network.target',
			'[Service]',
			'ExecStart=/usr/bin/python3 /opt/vxlan_unwrapper.py',
			'Restart=always',
			'[Install]',
			'WantedBy=multi-user.target',
			'EOF',

			'systemctl daemon-reload',
			'systemctl enable --now vxlan-worker',
		);

		return worker;
	}

	getENIId(instance: Instance): string {
		return '';
	}
}
