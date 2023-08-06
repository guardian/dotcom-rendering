import { join } from 'node:path';
import type { GuStackProps } from '@guardian/cdk/lib/constructs/core';
import { GuStack } from '@guardian/cdk/lib/constructs/core';
import { GuSecurityGroup, GuVpc } from '@guardian/cdk/lib/constructs/ec2';
import type { App } from 'aws-cdk-lib';
import { Peer } from 'aws-cdk-lib/aws-ec2';
import { CfnInclude } from 'aws-cdk-lib/cloudformation-include';

interface DCRProps extends GuStackProps {
	app: string;
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
				InternalLoadBalancerSecurityGroup:
					lbSecurityGroup.securityGroupId,
			},
		});
	}
}
