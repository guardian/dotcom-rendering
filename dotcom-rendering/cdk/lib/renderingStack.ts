import { type Alarms, GuEc2App } from '@guardian/cdk';
import { AccessScope } from '@guardian/cdk/lib/constants';
import type { NoMonitoring } from '@guardian/cdk/lib/constructs/cloudwatch';
import type { GuStackProps } from '@guardian/cdk/lib/constructs/core';
import {
	GuStack as CDKStack,
	GuDistributionBucketParameter,
} from '@guardian/cdk/lib/constructs/core';
import { GuCname } from '@guardian/cdk/lib/constructs/dns/dns-records';
import { GuAllowPolicy } from '@guardian/cdk/lib/constructs/iam';
import type { GuAsgCapacity } from '@guardian/cdk/lib/types';
import { type App as CDKApp, Duration } from 'aws-cdk-lib';
import { AdjustmentType, StepScalingAction } from 'aws-cdk-lib/aws-autoscaling';
import {
	Alarm,
	ComparisonOperator,
	Metric,
	TreatMissingData,
} from 'aws-cdk-lib/aws-cloudwatch';
import { AutoScalingAction } from 'aws-cdk-lib/aws-cloudwatch-actions';
import type { InstanceSize } from 'aws-cdk-lib/aws-ec2';
import { InstanceClass, InstanceType, Peer } from 'aws-cdk-lib/aws-ec2';
import { StringParameter } from 'aws-cdk-lib/aws-ssm';
import { getUserData } from './userData';

export interface RenderingCDKStackProps extends Omit<GuStackProps, 'stack'> {
	guApp: `${'article' | 'facia' | 'misc' | 'interactive'}-rendering`;
	domainName: string;
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

		const { stack: guStack, region, account } = this;
		const { guApp, stage, instanceSize, scaling, domainName } = props;

		const artifactsBucket =
			GuDistributionBucketParameter.getInstance(this).valueAsString;

		const monitoringConfiguration =
			stage === 'PROD'
				? ({
						snsTopicName: `Frontend-${stage}-CriticalAlerts`,
						// TODO – how does this overlap with the DevX debug dashboard?
						http5xxAlarm: {
							tolerated5xxPercentage: 0.5, // Monitor and increase if too noisy
							numberOfMinutesAboveThresholdBeforeAlarm: 1,
						},
						unhealthyInstancesAlarm: true,
				  } satisfies Alarms)
				: ({ noMonitoring: true } satisfies NoMonitoring);

		const ec2app = new GuEc2App(this, {
			app: guApp,
			access: {
				// Restrict access to this range within the VPC
				cidrRanges: [Peer.ipv4('10.0.0.0/8')],
				scope: AccessScope.INTERNAL,
			},
			accessLogging: {
				enabled: true,
				prefix: `ELBLogs/${guStack}/${guApp}/${stage}`,
			},
			applicationLogging: {
				enabled: true,
				systemdUnitName: guApp,
			},
			// TODO - should we change to 3000?
			applicationPort: 9000,
			// Certificate is necessary for the creation of a listener on port 443,
			// instead of the default 8080 which is unreachable.
			certificateProps: { domainName },
			healthcheck: { path: '/_healthcheck' },
			instanceType: InstanceType.of(InstanceClass.T4G, instanceSize),
			monitoringConfiguration,
			roleConfiguration: {
				additionalPolicies: [
					new GuAllowPolicy(this, 'AllowPolicyCloudwatchLogs', {
						actions: ['cloudwatch:*', 'logs:*'],
						resources: ['*'],
					}),
					new GuAllowPolicy(this, 'AllowPolicyDescribeDecryptKms', {
						actions: ['kms:Decrypt', 'kms:DescribeKey'],
						resources: [
							`arn:aws:kms:${region}:${account}:FrontendConfigKey`,
						],
					}),
					new GuAllowPolicy(this, 'AllowPolicyGetSsmParamsByPath', {
						actions: [
							'ssm:GetParametersByPath',
							'ssm:GetParameter',
						],
						resources: [
							// This is for backwards compatibility reasons with frontend apps and an old SSM naming system
							// TODO - ideally we should convert these params to use the newer naming style for consistency
							`arn:aws:ssm:${region}:${this.account}:parameter/frontend/*`,
							`arn:aws:ssm:${region}:${this.account}:parameter/dotcom/*`,
						],
					}),
				],
			},
			scaling,
			userData: getUserData({
				guApp,
				guStack,
				stage,
				artifactsBucket,
			}),
		});

		// Maps the certificate domain name to the load balancer DNS name
		new GuCname(this, 'LoadBalancerDNS', {
			domainName,
			app: guApp,
			resourceRecord: ec2app.loadBalancer.loadBalancerDnsName,
			ttl: Duration.hours(1),
		});

		// Alarms
		// evaluationPeriods and period should change for PROD. These values were chosen for testing purposes.
		// Currently, they are period: 60 and evaluationPeriod: 1
		// https://github.com/guardian/dotcom-rendering/blob/main/dotcom-rendering/cdk/lib/dotcom-rendering.ts#L299
		const highLatencyAlarm = new Alarm(
			this,
			`${guStack}-${guApp}-HighLatencyAlarm`,
			{
				// When merged this can become actionsEnabled: stage === 'PROD'
				actionsEnabled: true,
				alarmDescription: `ALB latency for ${guStack}-${guApp} is higher than 0.2 ms`,
				threshold: 0.2,
				comparisonOperator:
					ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
				evaluationPeriods: 1,
				metric: new Metric({
					dimensionsMap: {
						LoadBalancerName: ec2app.loadBalancer.loadBalancerName,
					},
					metricName: 'TargetResponseTime',
					namespace: 'AWS/ApplicationELB',
					period: Duration.seconds(30),
					statistic: 'Average',
				}),

				treatMissingData: TreatMissingData.MISSING,
			},
		);

		const scaleUpStep = new StepScalingAction(this, 'ScaleUp', {
			adjustmentType: AdjustmentType.PERCENT_CHANGE_IN_CAPACITY,
			autoScalingGroup: ec2app.autoScalingGroup,
			// Current PROD: 10 minutes
			// https://github.com/guardian/dotcom-rendering/blob/main/dotcom-rendering/cdk/lib/dotcom-rendering.ts#L276-L277
			cooldown: Duration.seconds(30),
		});

		scaleUpStep.addAdjustment({
			lowerBound: 0,
			adjustment: 100,
		});

		highLatencyAlarm.addAlarmAction(new AutoScalingAction(scaleUpStep));

		const scaleDownStep = new StepScalingAction(this, 'ScaleDown', {
			adjustmentType: AdjustmentType.CHANGE_IN_CAPACITY,
			autoScalingGroup: ec2app.autoScalingGroup,

			// Current PROD: Every 2 minutes take out one instance for prod. This is for testing purposes
			// https://github.com/guardian/dotcom-rendering/blob/main/dotcom-rendering/cdk/lib/dotcom-rendering.ts#L282
			cooldown: Duration.seconds(15),
		});

		scaleDownStep.addAdjustment({
			lowerBound: 0,
			adjustment: -1,
		});

		highLatencyAlarm.addOkAction(new AutoScalingAction(scaleDownStep));

		// Saves the value of the rendering base URL to SSM for frontend apps to use
		new StringParameter(this, 'RenderingBaseURLParam', {
			parameterName: `/${guStack}/${stage.toLowerCase()}/${guApp}.baseURL`,
			stringValue: `https://${domainName}`,
			description: `The rendering base URL for frontend to call the ${guApp} app in the ${stage} environment`,
		});
	}
}
