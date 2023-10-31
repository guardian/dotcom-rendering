import type { Alarms } from '@guardian/cdk';
import { GuNodeApp } from '@guardian/cdk';
import { AccessScope } from '@guardian/cdk/lib/constants';
import { GuUserData } from '@guardian/cdk/lib/constructs/autoscaling';
import type { NoMonitoring } from '@guardian/cdk/lib/constructs/cloudwatch';
import { GuStack, type GuStackProps } from '@guardian/cdk/lib/constructs/core';
import type { GuAsgCapacity } from '@guardian/cdk/lib/types';
import type { App } from 'aws-cdk-lib';
import {
	InstanceClass,
	type InstanceSize,
	InstanceType,
	Peer,
} from 'aws-cdk-lib/aws-ec2';

interface DCRHalloweenProps extends GuStackProps {
	app: string;
	instanceSize: InstanceSize;
	scaling: GuAsgCapacity;
}

export class DotcomRenderingHalloween extends GuStack {
	// This should be coming from the base class, no?
	constructor(scope: App, id: string, props: DCRHalloweenProps) {
		super(scope, id, props);

		const { region } = this;
		const { app, stage, instanceSize, scaling } = props;

		const userData = new GuUserData(this, {
			app,
			distributable: {
				fileName: `${app}.tar.gz`,
				executionStatement: [`tar -zxf ${app}.tar.gz ${app}`,
				 `cd ${app}`,
				`sudo NODE_ENV=production GU_STAGE=${stage} make start-prod`].join(' && '),
			}}).userData;

			userData.addCommands(`/opt/aws-kinesis-agent/configure-aws-kinesis-agent ${region} 'fake-value-for-now-please-change-me' /var/log/dotcom-rendering/dotcom-rendering.log`)

		const vpcCidrBlock = '10.248.136.0/22';


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

		const nodeApp = new GuNodeApp(this, {
			// access: '',
			app,
			access: {
				// TODO – ask DevX about Peer & CIDR ranges (and VPCs)
				// … and what would be the meaning of an empty array?
				// Should it be [IPeer, …IPeer[]]
				cidrRanges: [Peer.ipv4(vpcCidrBlock)],
				scope: AccessScope.INTERNAL,
			},
			// TODO – is this true? Should every GuNodeApp need to be public facing?
			certificateProps: { domainName: 'www.theguardian.com' },
			instanceType: InstanceType.of(InstanceClass.T4G, instanceSize),
			monitoringConfiguration,
			// { minimumInstances: props.minCapacity, maximumInstances: props.maxCapacity}
			scaling,
			userData,
		});

		console.log(nodeApp);
	}
}
