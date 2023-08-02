import { join } from 'path';
import type { GuStackProps } from '@guardian/cdk/lib/constructs/core';
import { GuStack } from '@guardian/cdk/lib/constructs/core';
import { GuVpc, GuSecurityGroup } from '@guardian/cdk/lib/constructs/ec2';
import { Peer } from 'aws-cdk-lib/aws-ec2';
import type { App } from 'aws-cdk-lib';
import { CfnInclude } from 'aws-cdk-lib/cloudformation-include';

interface DCRProps extends GuStackProps {
	app: string;
}

export class DotcomRendering extends GuStack {
	constructor(scope: App, id: string, props: DCRProps) {
		super(scope, id, props);

		const vpc = GuVpc.fromIdParameter(this, 'vpc', {
			vpcCidrBlock: '10.248.136.0/22',
		});

		const cfnParameters = {
			VpcId: vpc.vpcId,
			VPCIpBlock: vpc.vpcCidrBlock,
		};

		const yamlTemplateFilePath = join(
			__dirname,
			'../..',
			'cloudformation.yml',
		);

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

		new CfnInclude(this, 'YamlTemplate', {
			templateFile: yamlTemplateFilePath,
			parameters: cfnParameters,
			// VpcId: vpc.vpcId,
			// VPCIpBlock: vpc.vpcCidrBlock,
			// InstanceSecurityGroup: instanceSecurityGroup.securityGroupId,
		});
	}
}
