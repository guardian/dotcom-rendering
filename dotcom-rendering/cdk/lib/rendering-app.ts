import { type Alarms, GuEc2App } from '@guardian/cdk';
import { AccessScope } from '@guardian/cdk/lib/constants';
import type { NoMonitoring } from '@guardian/cdk/lib/constructs/cloudwatch';
import {
	GuStack,
	type GuStackProps,
	GuStringParameter,
} from '@guardian/cdk/lib/constructs/core';
import type { GuAsgCapacity } from '@guardian/cdk/lib/types';
import type { App } from 'aws-cdk-lib';
import {
	InstanceClass,
	type InstanceSize,
	InstanceType,
	Peer,
} from 'aws-cdk-lib/aws-ec2';
import { getUserData } from './userData';

type RenderingAppProps = Omit<GuStackProps, 'stack'> & {
	/** The name of the application (TBC on name for "applications"...) */
	app: `${'article' | 'front' | 'applications'}-${'apps' | 'web'}`;
	instanceSize: InstanceSize;
	scaling: GuAsgCapacity;
};

export class RenderingApp extends GuStack {
	constructor(scope: App, id: string, props: RenderingAppProps) {
		// Any version of this app should run in the eu-west-1 region
		super(scope, id, {
			...props,
			env: { region: 'eu-west-1' },
			stack: 'dotcom-rendering',
		});

		const { region, stack } = this;
		const { app, stage, instanceSize, scaling } = props;

		const ssmPrefix = `/${stage}/${stack}/${app}`;

		const elkStreamId = new GuStringParameter(this, 'ELKStreamId', {
			fromSSM: true,
			default: `${ssmPrefix}/logging.stream.name`,
		}).valueAsString;

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
			app,
			// TODO - should we change to 3000?
			applicationPort: 9000,
			access: {
				// Restrict access to this range within the VPC
				cidrRanges: [Peer.ipv4('10.0.0.0/8')],
				scope: AccessScope.INTERNAL,
			},
			accessLogging: {
				enabled: true,
				prefix: `ELBLogs/${stack}/${app}/${stage}`,
			},
			instanceType: InstanceType.of(InstanceClass.T4G, instanceSize),
			monitoringConfiguration,
			scaling,
			userData: getUserData({ app, region, stage, elkStreamId }),
			// TODO - check changes to healthcheck
			// TODO - check load balancer DNS output compatibility with frontend
		});
	}
}
