import type { Alarms } from '@guardian/cdk';
import { GuEc2App } from '@guardian/cdk';
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

interface RenderingAppProps extends GuStackProps {
	app: string;
	instanceSize: InstanceSize;
	scaling: GuAsgCapacity;
}

export class RenderingApp extends GuStack {
	constructor(scope: App, id: string, props: RenderingAppProps) {
		super(scope, id, props);

		const { region, stack } = this;
		const { app, stage, instanceSize, scaling } = props;

		const ssmPrefix = `/${stage}/${stack}/${app}`;

		const vpcCidrBlock = '10.248.136.0/22';

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
		// TODO – We wanted to use GUNodeApp but it required a certificate ?
		new GuEc2App(this, {
			app,
			// TODO - should we change to 3000?
			applicationPort: 9000,
			access: {
				// TODO – ask DevX about Peer & CIDR ranges (and VPCs)
				// … and what would be the meaning of an empty array?
				// Should it be [IPeer, …IPeer[]]
				cidrRanges: [Peer.ipv4(vpcCidrBlock)],
				scope: AccessScope.INTERNAL,
			},
			instanceType: InstanceType.of(InstanceClass.T4G, instanceSize),
			monitoringConfiguration,
			scaling,
			/** TODO - talk to DevX about using the GuUserData construct
			 * We are limited by not using systemd because of automatic log shipping
			 * @see https://github.com/guardian/cdk/blob/713c8eb6ef971307050492293a11aa89aaa173c1/src/patterns/ec2-app/base.ts#L64C1-L75C4
			 */
			userData: getUserData({ app, region, stage, elkStreamId }),
			// TODO - figure out why region required but not available here
			// accessLogging: {
			// 	enabled: true,
			// 	prefix: `ELBLogs/${stack}/${app}/${stage}`,
			// },
			// TODO - check changes to healthcheck
			// TODO - check load balancer DNS output compatibility with frontend
		});
	}
}
