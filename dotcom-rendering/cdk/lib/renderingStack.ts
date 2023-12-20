import { type Alarms, GuEc2App } from '@guardian/cdk';
import { AccessScope } from '@guardian/cdk/lib/constants';
import type { NoMonitoring } from '@guardian/cdk/lib/constructs/cloudwatch';
import type { GuStackProps } from '@guardian/cdk/lib/constructs/core';
import {
	GuStack as CDKStack,
	GuDistributionBucketParameter,
} from '@guardian/cdk/lib/constructs/core';
import type { GuAsgCapacity } from '@guardian/cdk/lib/types';
import type { App as CDKApp } from 'aws-cdk-lib';
import type { InstanceSize } from 'aws-cdk-lib/aws-ec2';
import { InstanceClass, InstanceType, Peer } from 'aws-cdk-lib/aws-ec2';
import { getUserData } from './userData';

export interface RenderingCDKStackProps extends Omit<GuStackProps, 'stack'> {
	guApp: `${'article' | 'facia' | 'misc' | 'interactive'}-rendering` | string; // TODO - remove string
	instanceSize: InstanceSize;
	scaling: GuAsgCapacity;
}

/** DCR infrastructure provisioning via CDK */
export class RenderingCDKStack extends CDKStack {
	constructor(scope: CDKApp, id: string, props: RenderingCDKStackProps) {
		super(scope, id, {
			...props,
			// Any version of this app should run in the eu-west-1 region
			env: { region: 'eu-west-1' },
			// Set the stack within the constructor as this won't vary between apps
			stack: 'frontend',
		});

		const { stack: guStack } = this;
		const { guApp, stage, instanceSize, scaling } = props;

		const artifactsBucket =
			GuDistributionBucketParameter.getInstance(this).valueAsString;

		const monitoringConfiguration =
			stage === 'PROD'
				? ({
						snsTopicName: `Frontend-${stage}-CriticalAlerts`,
						// TODO – how does this overlap with the DevX debug dashboard?
						http5xxAlarm: {
							tolerated5xxPercentage: 10,
							numberOfMinutesAboveThresholdBeforeAlarm: 1,
						},
						unhealthyInstancesAlarm: true,
				  } satisfies Alarms)
				: ({ noMonitoring: true } satisfies NoMonitoring);

		new GuEc2App(this, {
			app: guApp,
			// TODO - should we change to 3000?
			applicationPort: 9000,
			access: {
				// Restrict access to this range within the VPC
				cidrRanges: [Peer.ipv4('10.0.0.0/8')],
				scope: AccessScope.INTERNAL,
			},
			accessLogging: {
				enabled: true,
				prefix: `ELBLogs/${guStack}/${guApp}/${stage}`,
			},
			// Certificate is necessary for the creation of a listener on port 443,
			// instead of the default 8080 which is unreachable.
			certificateProps: {
				domainName: `${guApp}.${
					stage === 'PROD' ? '' : 'code.dev-'
				}gutools.co.uk`,
			},
			instanceType: InstanceType.of(InstanceClass.T4G, instanceSize),
			monitoringConfiguration,
			scaling,
			userData: getUserData({
				guApp,
				guStack,
				stage,
				artifactsBucket,
			}),
		});
	}
}
