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
import {
	ArnFormat,
	aws_cloudwatch,
	type App as CDKApp,
	Duration,
	RemovalPolicy,
} from 'aws-cdk-lib';
import type { ScalingInterval } from 'aws-cdk-lib/aws-applicationautoscaling';
import { AdjustmentType, StepScalingPolicy } from 'aws-cdk-lib/aws-autoscaling';
import { Metric, Unit } from 'aws-cdk-lib/aws-cloudwatch';
import { SnsAction } from 'aws-cdk-lib/aws-cloudwatch-actions';
import type { InstanceType } from 'aws-cdk-lib/aws-ec2';
import { Peer } from 'aws-cdk-lib/aws-ec2';
import type { CfnService, ScalableTaskCount } from 'aws-cdk-lib/aws-ecs';
import { ClusterSettings } from 'aws-cdk-lib/aws-ecs/mixins';
import { CfnRule } from 'aws-cdk-lib/aws-events';
import { Effect, PolicyStatement, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import {
	CfnDelivery,
	CfnDeliveryDestination,
	CfnDeliverySource,
	CfnResourcePolicy,
	LogGroup,
	RetentionDays,
} from 'aws-cdk-lib/aws-logs';
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
							memoryLimitMiB: 1024,
							cpu: 512,
							scaling: {
								minimumTasks: 1,
								maximumTasks: 9,
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
			};

			for (const [key, value] of Object.entries(ecsEnvVars)) {
				app.ecsService?.taskDefinition.defaultContainer?.addEnvironment(
					key,
					value,
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

				// Until we make these changes in GuCDK, we have to be a bit hacky to set the CPU Scaling option.
				const ecsScalableTarget = app.ecsService.node.tryFindChild(
					'TaskCount',
				) as ScalableTaskCount;
				if (ecsScalableTarget) {
					ecsScalableTarget.scaleOnCpuUtilization('CpuScaling', {
						targetUtilizationPercent: 50,
					});
				} else {
					throw new Error(
						'Could not create CPU scaling policy for ECS',
					);
				}

				// Add Action Logs
				// This should provide infra level information such as how long it takes to pull an image
				//
				// https://docs.aws.amazon.com/AmazonECS/latest/developerguide/action-logs-getting-started.html
				const ecsServiceName = `${guApp}-${stage}`;

				const actionLogGroup = new LogGroup(this, 'EcsActionLogGroup', {
					logGroupName: `/aws/vendedlogs/ecs/action-logs/${ecsServiceName}`,
					retention: RetentionDays.ONE_WEEK,
					removalPolicy: RemovalPolicy.DESTROY,
				});

				actionLogGroup.addToResourcePolicy(
					new PolicyStatement({
						effect: Effect.ALLOW,
						principals: [
							new ServicePrincipal('delivery.logs.amazonaws.com'),
						],
						actions: ['logs:CreateLogStream', 'logs:PutLogEvents'],
						resources: [actionLogGroup.logGroupArn],
					}),
				);

				const deliverySource = new CfnDeliverySource(
					this,
					'EcsActionDeliverySource',
					{
						name: `${ecsServiceName}-source`,
						resourceArn: app.ecsService.cluster.clusterArn,
						logType: 'ACTION_LOGS',
					},
				);

				const deliveryDestination = new CfnDeliveryDestination(
					this,
					'EcsActionDeliveryDestination',
					{
						name: `${ecsServiceName}-destination`,
						destinationResourceArn: actionLogGroup.logGroupArn,
					},
				);

				new CfnDelivery(this, 'EcsActionDelivery', {
					deliverySourceName: deliverySource.name,
					deliveryDestinationArn: deliveryDestination.attrArn,
				});

				// Deliver per-health-check-attempt results (PASS/FAIL, latency, target
				// IP:port, reason code) straight to CloudWatch Logs as vended logs, so we
				// can query them alongside task-state events to reconstruct the
				// registration → healthy phase of a task's lifecycle.
				// See https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-cloudwatch-logs.html
				const healthCheckLogsName = `/aws/elasticloadbalancing/${ecsServiceName}-health-check`;
				const healthCheckLogs = new LogGroup(this, 'HealthCheckLogs', {
					logGroupName: healthCheckLogsName,
					retention: RetentionDays.ONE_WEEK,
					removalPolicy: RemovalPolicy.DESTROY,
				});

				const healthCheckLogSource = new CfnDeliverySource(
					this,
					'HealthCheckLogSource',
					{
						name: `${ecsServiceName}-health-check`,
						logType: 'ALB_HEALTH_CHECK_LOGS',
						resourceArn: app.loadBalancer.loadBalancerArn,
					},
				);

				const healthCheckLogDestination = new CfnDeliveryDestination(
					this,
					'HealthCheckLogDestination',
					{
						name: `${ecsServiceName}-health-check`,
						destinationResourceArn: healthCheckLogs.logGroupArn,
					},
				);

				// Allow the CloudWatch Logs delivery service to write to the log group.
				const healthCheckLogsPolicy = new CfnResourcePolicy(
					this,
					'HealthCheckLogsDeliveryPolicy',
					{
						policyName: `${ecsServiceName}-health-check-logs`,
						policyDocument: JSON.stringify({
							Version: '2012-10-17',
							Statement: [
								{
									Sid: 'AllowLogDeliveryWrite',
									Effect: 'Allow',
									Principal: {
										Service: 'delivery.logs.amazonaws.com',
									},
									Action: [
										'logs:CreateLogStream',
										'logs:PutLogEvents',
									],
									Resource: this.formatArn({
										service: 'logs',
										resource: 'log-group',
										resourceName: `${healthCheckLogsName}:log-stream:*`,
										arnFormat:
											ArnFormat.COLON_RESOURCE_NAME,
									}),
									Condition: {
										StringEquals: {
											'aws:SourceAccount': this.account,
										},
										ArnLike: {
											'aws:SourceArn':
												healthCheckLogSource.attrArn,
										},
									},
								},
							],
						}),
					},
				);

				const healthCheckLogDelivery = new CfnDelivery(
					this,
					'HealthCheckLogDelivery',
					{
						deliverySourceName: healthCheckLogSource.name,
						deliveryDestinationArn:
							healthCheckLogDestination.attrArn,
					},
				);
				healthCheckLogDelivery.addDependency(healthCheckLogSource);
				healthCheckLogDelivery.addDependency(healthCheckLogsPolicy);

				// Record every ECS task lifecycle transition (PROVISIONING → ... → STOPPED)
				// so we can reconstruct a per-state timeline for scale-out latency analysis.
				const taskStateEvents = new LogGroup(this, 'TaskStateEvents', {
					logGroupName: `/aws/events/${ecsServiceName}-task-state`,
					retention: RetentionDays.ONE_WEEK,
					removalPolicy: RemovalPolicy.DESTROY,
				});

				// Use a low-level CfnRule + native resource policy rather than the L2
				// CloudWatchLogGroup target: the L2 target injects a Lambda-backed custom
				// resource (an asset), which requires `cdk deploy`. This keeps the stack
				// deployable via plain CloudFormation changesets.
				const taskStateRule = new CfnRule(this, 'TaskStateChangeRule', {
					eventPattern: {
						source: ['aws.ecs'],
						'detail-type': ['ECS Task State Change'],
						detail: {
							clusterArn: [app.ecsService.cluster.clusterArn],
						},
					},
					targets: [
						{
							id: 'TaskStateEventsLog',
							arn: this.formatArn({
								service: 'logs',
								resource: 'log-group',
								resourceName: taskStateEvents.logGroupName,
								arnFormat: ArnFormat.COLON_RESOURCE_NAME,
							}),
						},
					],
				});

				new CfnResourcePolicy(this, 'TaskStateEventsPolicy', {
					policyName: `${ecsServiceName}-task-state-events`,
					policyDocument: JSON.stringify({
						Version: '2012-10-17',
						Statement: [
							{
								Sid: 'AllowEventBridgeToLog',
								Effect: 'Allow',
								Principal: { Service: 'events.amazonaws.com' },
								Action: [
									'logs:CreateLogStream',
									'logs:PutLogEvents',
								],
								Resource: taskStateEvents.logGroupArn,
								Condition: {
									ArnEquals: {
										'aws:SourceArn': taskStateRule.attrArn,
									},
								},
							},
						],
					}),
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
