import type { Alarms } from '@guardian/cdk';
import { AccessScope } from '@guardian/cdk/lib/constants';
import type { NoMonitoring } from '@guardian/cdk/lib/constructs/cloudwatch';
import type { GuStackProps } from '@guardian/cdk/lib/constructs/core';
import {
	GuStack as CDKStack,
	GuDistributionBucketParameter,
} from '@guardian/cdk/lib/constructs/core';
import { GuCname } from '@guardian/cdk/lib/constructs/dns/dns-records';
import { GuAllowPolicy } from '@guardian/cdk/lib/constructs/iam';
import { GuLoadBalancedAppExperimental } from '@guardian/cdk/lib/experimental/patterns/gu-load-balanced-app';
import type { GuAsgCapacity } from '@guardian/cdk/lib/types';
import { aws_cloudwatch, type App as CDKApp, Duration } from 'aws-cdk-lib';
import type { ScalingInterval } from 'aws-cdk-lib/aws-applicationautoscaling';
import { AdjustmentType, StepScalingPolicy } from 'aws-cdk-lib/aws-autoscaling';
import { Metric, Unit } from 'aws-cdk-lib/aws-cloudwatch';
import { SnsAction } from 'aws-cdk-lib/aws-cloudwatch-actions';
import type { InstanceType } from 'aws-cdk-lib/aws-ec2';
import { Peer } from 'aws-cdk-lib/aws-ec2';
import type { CfnService } from 'aws-cdk-lib/aws-ecs';
import {
	ContainerDependencyCondition,
	ContainerImage,
	LogDrivers,
} from 'aws-cdk-lib/aws-ecs';
import { ClusterSettings } from 'aws-cdk-lib/aws-ecs/mixins';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Subscription, SubscriptionProtocol, Topic } from 'aws-cdk-lib/aws-sns';
import { StringParameter } from 'aws-cdk-lib/aws-ssm';
import { getUserData } from './userData';

export interface RenderingCDKStackProps extends Omit<GuStackProps, 'stack'> {
	guApp: `${'article' | 'facia' | 'interactive' | 'tag-page'}-rendering`;
	domainName: string;
	instanceType: InstanceType;
	scaling: GuAsgCapacity & {
		policies?: {
			step?: {
				cpu?: {
					scalingStepsOut: ScalingInterval[];
				};
				latency?: {
					scalingStepsOut: ScalingInterval[];
					scalingStepsIn: ScalingInterval[];
				};
			};
		};
	};

	/**
	 * Which image to run.
	 * This should be the image digest (e.g. 'sha256:abc123') to ensure immutable deployments.
	 *
	 * @note Currently optional to control which services run in an EC2-ECS hybrid mode, or EC2-only.
	 *
	 * @see https://docs.docker.com/dhi/core-concepts/digests
	 */
	imageIdentifier?: string;
}

const addCPUStepScalingPolicy = (
	context: RenderingCDKStack,
	app: GuLoadBalancedAppExperimental,
	props: RenderingCDKStackProps,
	stage: string,
) => {
	if (stage === 'PROD' && props.scaling.policies?.step?.cpu) {
		const cpuMetric = new Metric({
			namespace: 'AWS/EC2',
			metricName: 'CPUUtilization',
			unit: Unit.PERCENT,
			dimensionsMap: {
				AutoScalingGroupName:
					app.autoScalingGroup!.autoScalingGroupName,
			},
			statistic: aws_cloudwatch.Stats.percentile(90),
			period: Duration.seconds(30),
		});

		/** Scaling policies ASCII diagram
		 *
		 * Metric value (latency in seconds)
		 *  0        lower       middle       upper         infinity
		 * --------------------------------------------------------
		 *  |   - z    |     0      |   + x%   |     + y%      |
		 * --------------------------------------------------------
		 * Instance change
		 *
		 * -
		 * When scaling up, we use percentage change (+x% initially then +y% if particularly high)
		 * When scaling down, we use absolute change (-z each interval)
		 * We take no scaling actions when latency is between lower and middle values to avoid flapping
		 * @see https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scaling-simple-step.html#step-scaling-considerations
		 */

		const scaleOutPolicy = new StepScalingPolicy(
			context,
			'CPUScaleUpPolicy',
			{
				autoScalingGroup: app.autoScalingGroup!,
				metric: cpuMetric,
				scalingSteps: props.scaling.policies.step.cpu.scalingStepsOut,
				adjustmentType: AdjustmentType.PERCENT_CHANGE_IN_CAPACITY,
				evaluationPeriods: 2, // 1 minute = 2 × 30 seconds
			},
		);

		const scalingAlertsTopic = new Topic(context, 'CPUScalingAlertsTopic');
		new Subscription(context, 'CPUScalingAlertsSubscriptionEmail', {
			endpoint: 'dotcom.platform@theguardian.com',
			protocol: SubscriptionProtocol.EMAIL,
			topic: scalingAlertsTopic,
		});

		scaleOutPolicy.upperAlarm?.addAlarmAction(
			new SnsAction(scalingAlertsTopic),
		);
	}
};

const addLatencyStepScalingPolicy = (
	context: RenderingCDKStack,
	app: GuLoadBalancedAppExperimental,
	props: RenderingCDKStackProps,
	stage: string,
) => {
	if (stage === 'PROD' && props.scaling.policies?.step?.latency) {
		const latencyMetric = new Metric({
			dimensionsMap: {
				LoadBalancer: app.loadBalancer.loadBalancerFullName,
				TargetGroup: app.targetGroups.ec2!.targetGroupFullName,
			},
			metricName: 'TargetResponseTime',
			namespace: 'AWS/ApplicationELB',
			period: Duration.seconds(30),
			statistic: 'Average', // TODO - should we use p90?
		});

		/** Scaling policies ASCII diagram
		 *
		 * Metric value (latency in seconds)
		 *  0        lower       middle       upper         infinity
		 * --------------------------------------------------------
		 *  |   - z    |     0      |   + x%   |     + y%      |
		 * --------------------------------------------------------
		 * Instance change
		 *
		 * -
		 * When scaling up, we use percentage change (+x% initially then +y% if particularly high)
		 * When scaling down, we use absolute change (-z each interval)
		 * We take no scaling actions when latency is between lower and middle values to avoid flapping
		 * @see https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scaling-simple-step.html#step-scaling-considerations
		 */

		const scaleOutPolicy = new StepScalingPolicy(
			context,
			'LatencyScaleUpPolicy',
			{
				autoScalingGroup: app.autoScalingGroup!,
				metric: latencyMetric,
				scalingSteps:
					props.scaling.policies.step.latency.scalingStepsOut,
				adjustmentType: AdjustmentType.PERCENT_CHANGE_IN_CAPACITY,
				evaluationPeriods: 2, // 1 minute = 2 × 30 seconds
			},
		);

		const scalingAlertsTopic = new Topic(
			context,
			'LatencyScalingAlertsTopic',
		);
		new Subscription(context, 'LatencyScalingAlertsSubscriptionEmail', {
			endpoint: 'dotcom.platform@theguardian.com',
			protocol: SubscriptionProtocol.EMAIL,
			topic: scalingAlertsTopic,
		});

		scaleOutPolicy.upperAlarm?.addAlarmAction(
			new SnsAction(scalingAlertsTopic),
		);

		/** Scale in policy */
		new StepScalingPolicy(context, 'LatencyScaleDownPolicy', {
			autoScalingGroup: app.autoScalingGroup!,
			metric: latencyMetric,
			scalingSteps: props.scaling.policies.step.latency.scalingStepsIn,
			adjustmentType: AdjustmentType.CHANGE_IN_CAPACITY,
			evaluationPeriods: 10,
		});
	}
};

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
		const {
			guApp,
			stage,
			instanceType,
			scaling,
			domainName,
			imageIdentifier,
		} = props;

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

		const app = new GuLoadBalancedAppExperimental(this, {
			app: guApp,
			access: {
				// Restrict access to this range within the VPC
				cidrRanges: [Peer.ipv4('10.0.0.0/8')],
				scope: AccessScope.INTERNAL,
			},
			// TODO - should we change to 3000?
			applicationPort: 9000,
			// Certificate is necessary for the creation of a listener on port 443,
			// instead of the default 8080 which is unreachable.
			certificateProps: { domainName },
			healthcheck: { path: '/_healthcheck' },
			monitoringConfiguration,
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
					actions: ['ssm:GetParametersByPath', 'ssm:GetParameter'],
					resources: [
						// This is for backwards compatibility reasons with frontend apps and an old SSM naming system
						// TODO - ideally we should convert these params to use the newer naming style for consistency
						`arn:aws:ssm:${region}:${this.account}:parameter/frontend/*`,
						`arn:aws:ssm:${region}:${this.account}:parameter/dotcom/*`,
					],
				}),
			],
			ec2Props: {
				instanceMetricGranularity: '1Minute',
				applicationLogging: {
					enabled: true,
					systemdUnitName: guApp,
				},
				instanceType,
				scaling,
				userData: getUserData({
					guApp,
					guStack,
					stage,
					artifactsBucket,
				}),
			},

			// Provision ECS resources only when `imageIdentifier` has been provided
			...(imageIdentifier == null
				? {}
				: {
						ecsProps: {
							repositoryName: 'guardian/dotcom-rendering',
							imageIdentifier,

							// TODO tune these values
							memoryLimitMiB: 2048,
							cpu: 1024,
							scaling: {
								minimumTasks: 1,
								maximumTasks: 2,
							},
						},

						// Route all traffic to EC2
						targetGroupWeights: {
							ec2: 1,
							ecs: 0,
						},
					}),
		});

		if (imageIdentifier != null) {
			const ecsEnvVars: Record<string, string> = {
				NODE_ENV: 'production',
				GU_STAGE: stage,
				GU_APP: guApp,
				GU_STACK: guStack,
				OTEL_EXPORTER_OTLP_ENDPOINT: 'http://localhost:4318',
				OTEL_SERVICE_NAME: guApp,
			};

			for (const [key, value] of Object.entries(ecsEnvVars)) {
				app.ecsService?.taskDefinition.defaultContainer?.addEnvironment(
					key,
					value,
				);
			}

			/**
			 * The ADOT (AWS Distro for OpenTelemetry) Collector, run as a
			 * sidecar. The app exports OTLP traces to it over localhost, and it
			 * forwards them to AWS X-Ray.
			 *
			 * Transcribed from the collector's own `awsvpc` sidecar deployment
			 * template, at the version we run.
			 *
			 * @see https://github.com/aws-observability/aws-otel-collector/blob/v0.49.0/deployment-template/ecs/aws-otel-fargate-sidecar-deployment-cfn.yaml
			 * @see https://aws-otel.github.io/docs/setup/ecs
			 *
			 * The default config.yaml used is also available on github
			 * @see https://github.com/aws-observability/aws-otel-collector/blob/0771477f9db2879afad3ae3ff7811b5264a151a8/config/ecs/ecs-default-config.yaml
			 */
			if (app.ecsService) {
				const { taskDefinition } = app.ecsService;

				const collector = taskDefinition.addContainer(
					'aws-otel-collector',
					{
						// Pinned, where the template uses `latest`, so that deploys are immutable
						image: ContainerImage.fromRegistry(
							'public.ecr.aws/aws-observability/aws-otel-collector:v0.49.0',
						),
						command: ['--config=/etc/ecs/ecs-default-config.yaml'],
						cpu: 256,
						memoryLimitMiB: 512,
						logging: LogDrivers.awsLogs({ streamPrefix: 'ecs' }),
						healthCheck: {
							// `CMD`, not `CMD-SHELL`, as the image is distroless and has no shell
							command: ['CMD', '/healthcheck'],
							interval: Duration.seconds(5),
							retries: 2,
							timeout: Duration.seconds(3),
						},
						// In the template the collector is the task; here it is a
						// sidecar, and must not take the rendering app down with it
						essential: false,
					},
				);

				taskDefinition.defaultContainer?.addContainerDependencies({
					container: collector,
					condition: ContainerDependencyCondition.START,
				});

				/**
				 * `AWSDistroOpenTelemetryPolicy`, less `ssm:GetParameters`, which
				 * is only used when `--config` names an SSM parameter.
				 *
				 * @see https://aws-otel.github.io/docs/setup/permissions
				 */
				taskDefinition.addToTaskRolePolicy(
					new PolicyStatement({
						actions: [
							'logs:PutLogEvents',
							'logs:CreateLogGroup',
							'logs:CreateLogStream',
							'logs:DescribeLogStreams',
							'logs:DescribeLogGroups',
							'logs:PutRetentionPolicy',
							'xray:PutTraceSegments',
							'xray:PutTelemetryRecords',
							'xray:GetSamplingRules',
							'xray:GetSamplingTargets',
							'xray:GetSamplingStatisticSummaries',
						],
						resources: ['*'],
					}),
				);
			}

			// TODO make these changes at the pattern level in GuCDK
			if (app.ecsService) {
				app.ecsService.cluster.with(
					new ClusterSettings([
						{ name: 'containerInsights', value: 'enhanced' },
					]),
				);

				const cfnService = app.ecsService.node
					.defaultChild as CfnService;
				cfnService.addPropertyOverride('Monitoring', {
					MetricConfigurations: [
						{
							MetricNames: [
								'CPUUtilization',
								'MemoryUtilization',
							],
							ResolutionSeconds: 20,
						},
					],
				});
			}
		}

		/**
		 * The default Node server keep alive timeout is 5 seconds
		 * @see https://nodejs.org/api/http.html#serverkeepalivetimeout
		 *
		 * This ensures that the load balancer idle timeout is less than the Node server keep alive timeout
		 * so that the Node app does not prematurely close the connection before the load balancer can accept the response.
		 * @see https://docs.aws.amazon.com/elasticloadbalancing/latest/application/application-load-balancers.html#connection-idle-timeout
		 */
		app.loadBalancer.setAttribute('idle_timeout.timeout_seconds', '4');

		// Maps the certificate domain name to the load balancer DNS name
		new GuCname(this, 'LoadBalancerDNS', {
			domainName,
			app: guApp,
			resourceRecord: app.loadBalancer.loadBalancerDnsName,
			ttl: Duration.hours(1),
		});

		/** Add CPU utilisation based STEP scaling policy for PROD only if a policy is defined */
		addCPUStepScalingPolicy(this, app, props, stage);

		/** Add latency-based STEP scaling policy for PROD only if a policy is defined */
		addLatencyStepScalingPolicy(this, app, props, stage);

		// Saves the value of the rendering base URL to SSM for frontend apps to use
		new StringParameter(this, 'RenderingBaseURLParam', {
			parameterName: `/${guStack}/${stage.toLowerCase()}/${guApp}.baseURL`,
			stringValue: `https://${domainName}`,
			description: `The rendering base URL for frontend to call the ${guApp} app in the ${stage} environment`,
		});
	}
}
