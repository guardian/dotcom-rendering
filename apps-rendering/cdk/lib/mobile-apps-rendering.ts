import { GuEc2App } from '@guardian/cdk';
import { AccessScope } from '@guardian/cdk/lib/constants';
import type { GuStackProps } from '@guardian/cdk/lib/constructs/core';
import { GuStack } from '@guardian/cdk/lib/constructs/core';
import { GuAllowPolicy } from '@guardian/cdk/lib/constructs/iam';
import type { App, CfnElement } from 'aws-cdk-lib';
import { Duration } from 'aws-cdk-lib';
import {
	InstanceClass,
	InstanceSize,
	InstanceType,
	Peer,
} from 'aws-cdk-lib/aws-ec2';
import {
	HostedZone,
	RecordSet,
	RecordTarget,
	RecordType,
} from 'aws-cdk-lib/aws-route53';

interface AsgSize {
	min: number;
	max: number;
}

interface AppsStackProps extends GuStackProps {
	recordPrefix: string;
	asgSize: AsgSize;
	domainName: string;
	hostedZoneId: string;
	targetCpuUtilisation: number;
}

export class MobileAppsRendering extends GuStack {
	constructor(scope: App, id: string, props: AppsStackProps) {
		super(scope, id, props);

		const appName = 'mobile-apps-rendering';

		const appsRenderingDomain = props.domainName;
		const domainName = `${props.recordPrefix}.${appsRenderingDomain}`;

		const hostedZone = HostedZone.fromHostedZoneAttributes(
			this,
			'HostedZone',
			{
				zoneName: appsRenderingDomain,
				hostedZoneId: props.hostedZoneId,
			},
		);

		const scalingTargetCpuUtilisation = props.targetCpuUtilisation;

		const appsRenderingApp = new GuEc2App(this, {
			applicationPort: 3040,
			app: 'mobile-apps-rendering',
			access: {
				scope: AccessScope.INTERNAL,
				cidrRanges: [Peer.ipv4('10.0.0.0/8')],
			},
			instanceType: InstanceType.of(
				InstanceClass.T4G,
				InstanceSize.MICRO,
			),
			certificateProps: {
				domainName,
				hostedZoneId: props.hostedZoneId,
			},
			monitoringConfiguration: {
				noMonitoring: true,
			},
			roleConfiguration: {
				additionalPolicies: [
					new GuAllowPolicy(this, 'GetParametersByPath', {
						resources: ['*'],
						actions: ['ssm:GetParametersByPath'],
					}),
				],
			},
			userData: `#!/bin/bash -ev
			groupadd mapi
			useradd -r -m -s /usr/bin/nologin -g mapi ${appName}

			export App=${appName}
			export Stack=${this.stack}
			export Stage=${this.stage}
			export NODE_ENV=production

			aws s3 cp s3://mobile-dist/${this.stack}/${this.stage}/${appName}/${appName}.zip /tmp
			mkdir -p /opt/${appName}
			unzip /tmp/${appName}.zip -d /opt/${appName}
			chown -R ${appName}:mapi /opt/${appName}

			mkdir -p /usr/share/${appName}/logs
			chown -R ${appName}:mapi /usr/share/${appName}
			ln -s /usr/share/${appName}/logs /var/log/${appName}
			chown -R ${appName}:mapi /var/log/${appName}

			export PM2_HOME="/usr/share/${appName}"
			export ASSETS_MANIFEST="/opt/${appName}/manifest.json"

			/usr/local/node/pm2 start --name ${appName} --uid ${appName} --gid mapi /opt/${appName}/server.js
			/opt/aws-kinesis-agent/configure-aws-kinesis-agent ${this.region} mobile-log-aggregation-${this.stage} '/var/log/${appName}/*'
			/usr/local/node/pm2 logrotate -u ${appName}`,
			scaling: {
				minimumInstances: props.asgSize.min,
				maximumInstances: props.asgSize.max,
			},
		});

		const asg = appsRenderingApp.autoScalingGroup;
		asg.scaleOnCpuUtilization('CpuScalingPolicy', {
			targetUtilizationPercent: scalingTargetCpuUtilisation,
		});

		const recordSet = new RecordSet(this, 'DnsRecord', {
			recordType: RecordType.CNAME,
			target: RecordTarget.fromValues(
				appsRenderingApp.loadBalancer.loadBalancerDnsName,
			),
			zone: hostedZone,
			recordName: props.recordPrefix,
			ttl: Duration.hours(1),
		});

		const defaultChild = recordSet.node.defaultChild as CfnElement;
		defaultChild.overrideLogicalId('DnsRecord');
	}
}
