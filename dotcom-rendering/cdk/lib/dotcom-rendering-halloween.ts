import type { Alarms } from '@guardian/cdk';
import { GuNodeApp } from '@guardian/cdk';
import { AccessScope } from '@guardian/cdk/lib/constants';
import type { NoMonitoring } from '@guardian/cdk/lib/constructs/cloudwatch';
import { GuStack, type GuStackProps } from '@guardian/cdk/lib/constructs/core';
import type { GuAsgCapacity } from '@guardian/cdk/lib/types';
import type { App } from 'aws-cdk-lib';
import { Monitoring } from 'aws-cdk-lib/aws-autoscaling';
import {
	InstanceClass,
	type InstanceSize,
	InstanceType,
	IpAddresses,
	Peer,
} from 'aws-cdk-lib/aws-ec2';
import { satisfies } from 'compare-versions';
import { getUserData } from './userData';

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

		const userData = getUserData({
			app,
			elkStreamId: 'fake-value-for-now-please-change-me',
			region,
			stage,
		});

		const vpcCidrBlock = '10.248.136.0/22';
		// const vpc = GuVpc.fromIdParameter(this, 'vpc', { vpcCidrBlock });
		// const publicSubnets = GuVpc.subnetsFromParameter(this, {
		// 	type: SubnetType.PUBLIC,
		// });
		// const privateSubnets = GuVpc.subnetsFromParameter(this, {
		// 	type: SubnetType.PRIVATE,
		// });

		// const criticalAlertsTopicArn = `arn:aws:sns:${region}:${this.account}:Frontend-${stage}-CriticalAlerts`;

		const monitoringConfiguration =
			stage === 'PROD'
				? ({
						snsTopicName: `Frontend-${stage}-CriticalAlerts`,
						// TODO - how does this overlap with the DevX debug dashboard?
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
				// TODO - ask DevX about Peer & CIDR ranges (and VPCs)
				// … and what would be the meaning of an empty array?
				// Should it be [IPeer, …IPeer[]]
				cidrRanges: [Peer.ipv4(vpcCidrBlock)],
				scope: AccessScope.INTERNAL,
			},
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
