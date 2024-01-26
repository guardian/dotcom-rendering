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
import { AdjustmentType, StepScalingPolicy } from 'aws-cdk-lib/aws-autoscaling';
import { Metric } from 'aws-cdk-lib/aws-cloudwatch';
import { SnsAction } from 'aws-cdk-lib/aws-cloudwatch-actions';
import type { InstanceSize } from 'aws-cdk-lib/aws-ec2';
import { InstanceClass, InstanceType, Peer } from 'aws-cdk-lib/aws-ec2';
import { Topic } from 'aws-cdk-lib/aws-sns';
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

		const latencyMetric = new Metric({
			dimensionsMap: {
				LoadBalancer: ec2app.loadBalancer.loadBalancerFullName,
				TargetGroup: ec2app.targetGroup.targetGroupFullName,
			},
			metricName: 'TargetResponseTime',
			namespace: 'AWS/ApplicationELB',
			period: Duration.seconds(30),
			statistic: 'Average', // TODO - should we use p90?
		});

		/** Scaling policies ASCII diagram
		 *
		 * Metric value (latency in seconds)
		 *  0         0.15         0.2         0.3         infinity
		 * --------------------------------------------------------
		 *  |   - 1    |     0      |   + 50%   |     + 80%      |
		 * --------------------------------------------------------
		 * Instance change
		 *
		 * -
		 * When scaling up, we use percentage change (+50% initially then +80% if particularly high)
		 * When scaling down, we use absolute change (-1 each interval)
		 * We take no scaling actions when latency is between 0.15s and 0.2s to avoid flapping
		 * @see https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scaling-simple-step.html#step-scaling-considerations
		 */

		/** Scale out policy on latency above 0.2s */
		const scaleOutPolicy = new StepScalingPolicy(
			this,
			'LatencyScaleUpPolicy',
			{
				autoScalingGroup: ec2app.autoScalingGroup,
				metric: latencyMetric,
				scalingSteps: [
					{
						// No scaling up effect between 0 and 0.2s latency
						change: 0,
						lower: 0,
						upper: 0.2,
					},
					{
						// When latency is higher than 0.2s we scale up by 50%
						change: 50,
						lower: 0.2,
					},
					{
						// When latency is higher than 0.3s we scale up by 80%
						change: 80,
						lower: 0.3,
					},
				],
				adjustmentType: AdjustmentType.PERCENT_CHANGE_IN_CAPACITY,
				evaluationPeriods: 5,
			},
		);

		const criticalAlertsTopic = Topic.fromTopicArn(
			this,
			'CriticalAlertsTopic',
			`arn:aws:sns:${region}:${this.account}:Frontend-${stage}-CriticalAlerts`,
		);
		const criticalAlertsSnsAction = new SnsAction(criticalAlertsTopic);

		/** Adds a notification action in PROD to the scale out policy alarm */
		if (stage === 'PROD') {
			scaleOutPolicy.upperAlarm?.addAlarmAction(criticalAlertsSnsAction);
		}

		/** Scale in policy on latency below 0.15s */
		new StepScalingPolicy(this, 'LatencyScaleDownPolicy', {
			autoScalingGroup: ec2app.autoScalingGroup,
			metric: latencyMetric,
			scalingSteps: [
				{
					// No scaling down effect when latency is higher than 0.15s
					change: 0,
					lower: 0.12,
				},
				{
					// When latency is lower than 0.15s we scale down by 1
					change: -1,
					upper: 0.12,
					lower: 0,
				},
			],
			adjustmentType: AdjustmentType.CHANGE_IN_CAPACITY,
			evaluationPeriods: 10,
		});

		// Saves the value of the rendering base URL to SSM for frontend apps to use
		new StringParameter(this, 'RenderingBaseURLParam', {
			parameterName: `/${guStack}/${stage.toLowerCase()}/${guApp}.baseURL`,
			stringValue: `https://${domainName}`,
			description: `The rendering base URL for frontend to call the ${guApp} app in the ${stage} environment`,
		});
	}
}
