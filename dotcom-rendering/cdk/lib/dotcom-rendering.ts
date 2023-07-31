import { join } from 'path';
import type { GuStackProps } from '@guardian/cdk/lib/constructs/core';
import { GuStack } from '@guardian/cdk/lib/constructs/core';
import { GuSecurityGroup, GuVpc } from '@guardian/cdk/lib/constructs/ec2';
import type { App } from 'aws-cdk-lib';
import { CfnInclude } from 'aws-cdk-lib/cloudformation-include';

type DCRProps = GuStackProps & {app: string};
export class DotcomRendering extends GuStack {
	constructor(scope: App, id: string, props: DCRProps ) {
		super(scope, id, props);

		const vpc = GuVpc.fromIdParameter(this, 'vpc', {
			vpcCidrBlock: '10.248.136.0/22',
		});

		const lbSecurityGroup = new GuSecurityGroup(this, "InternalLoadBalancerSecurityGroup", {
			app: props.app,
			vpc,
			securityGroupName: "lbSecurityGroup",
			// ingresses: [//we need to add this ],
		});

		const cfnParameters = {
			VpcId: vpc.vpcId,
			VPCIpBlock: vpc.vpcCidrBlock,
			InternalLoadBalancerSecurityGroup: lbSecurityGroup,
		};

		const yamlTemplateFilePath = join(
			__dirname,
			'../..',
			'cloudformation.yml',
		);

		new CfnInclude(this, 'YamlTemplate', {
			templateFile: yamlTemplateFilePath,
			parameters: cfnParameters,
		});
	}
}
