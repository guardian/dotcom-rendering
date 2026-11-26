import { App, Duration, Size } from 'aws-cdk-lib';
import { InstanceClass, InstanceSize, InstanceType } from 'aws-cdk-lib/aws-ec2';
import type { RenderingCDKStackProps } from '../lib/renderingStack';
import { RenderingCDKStack } from '../lib/renderingStack';

function getImageIdentifier(): string {
	const imageIdentifier: string | undefined = process.env.IMAGE_DIGEST;
	if (!imageIdentifier) {
		throw new Error('Image identifier must be provided');
	}
	return imageIdentifier;
}

const cdkApp = new App();

const cpuScalingSteps = {
	scalingStepsOut: [
		// When p90 CPU is lower than 60% no scaling up
		{ lower: 0, upper: 60, change: 0 },
		// When p90 CPU is higher than 60% we scale up by 50%
		{ lower: 60, change: 50 },
		// When p90 CPU is higher than 80% we scale up by 80%
		{ lower: 80, change: 80 },
	],
};

/** Article */
// Note that this is deliberate for scaling testing purposes. The CODE stack is configured to use the PROD ECS settings.
export const ArticleRenderingPropsCODE: RenderingCDKStackProps = {
	guApp: 'article-rendering',
	stage: 'CODE',
	domainName: 'article-rendering.code.dev-guardianapis.com',
	ec2Props: {
		scaling: { minimumInstances: 1, maximumInstances: 3 },
		instanceType: InstanceType.of(InstanceClass.T4G, InstanceSize.SMALL),
	},
	ecsProps: {
		imageIdentifier: getImageIdentifier(),
		cpu: 1024,
		memoryLimitMiB: 2048,
		scaling: {
			minimumTasks: 42,
			maximumTasks: 240,
			cpuScaling: {
				targetValue: 20,
				// TODO: Tune cooldown values.
				// https://docs.aws.amazon.com/autoscaling/application/userguide/target-tracking-scaling-policy-overview.html#target-tracking-cooldown
				scaleInCooldown: Duration.seconds(20),
				scaleOutCooldown: Duration.seconds(20),
			},
		},
		instancesRequirements: {
			memoryMin: Size.mebibytes(2048),
			vCpuCountMin: 1,
			allowedInstanceTypes: ['c8g.*'],
		},
	},
	targetGroupWeights: {
		ec2: 0,
		ecs: 1,
	},
};

new RenderingCDKStack(
	cdkApp,
	'ArticleRendering-CODE',
	ArticleRenderingPropsCODE,
);

export const ArticleRenderingPropsPROD: RenderingCDKStackProps = {
	guApp: 'article-rendering',
	stage: 'PROD',
	domainName: 'article-rendering.guardianapis.com',
	ec2Props: {
		scaling: {
			minimumInstances: 42,
			maximumInstances: 240,
			policies: {
				step: {
					cpu: cpuScalingSteps,
					latency: {
						scalingStepsOut: [
							// When latency is lower than 0.2s no scaling up
							{ lower: 0, upper: 0.2, change: 0 },
							// When latency is higher than 0.2s we scale up by 50%
							{ lower: 0.2, change: 50 },
							// When latency is higher than 0.3s we scale up by 80%
							{ lower: 0.3, change: 80 },
						],
						scalingStepsIn: [
							// When latency is higher than 0.12s no scaling down
							{ lower: 0.12, change: 0 },
							// When latency is lower than 0.12s we scale down by 1
							{ upper: 0.12, lower: 0, change: -1 },
						],
					},
				},
			},
		},
		instanceType: InstanceType.of(InstanceClass.C8G, InstanceSize.MEDIUM),
	},
	ecsProps: {
		imageIdentifier: getImageIdentifier(),
		cpu: 1024,
		memoryLimitMiB: 2048,
		scaling: {
			minimumTasks: 42,
			maximumTasks: 240,
			cpuScaling: {
				targetValue: 20,
				// TODO: Tune cooldown values.
				// https://docs.aws.amazon.com/autoscaling/application/userguide/target-tracking-scaling-policy-overview.html#target-tracking-cooldown
				scaleInCooldown: Duration.seconds(60),
				scaleOutCooldown: Duration.seconds(60),
			},
		},
		instancesRequirements: {
			memoryMin: Size.mebibytes(2048),
			vCpuCountMin: 1,
			allowedInstanceTypes: ['c8g.*'],
		},
	},
	targetGroupWeights: {
		ec2: 99,
		ecs: 1,
	},
};

new RenderingCDKStack(
	cdkApp,
	'ArticleRendering-PROD',
	ArticleRenderingPropsPROD,
);

/** Facia aka Fronts */
export const FaciaRenderingPropsCODE: RenderingCDKStackProps = {
	guApp: 'facia-rendering',
	stage: 'CODE',
	domainName: 'facia-rendering.code.dev-guardianapis.com',
	ecsProps: {
		imageIdentifier: getImageIdentifier(),
		cpu: 1024,
		memoryLimitMiB: 1280,
		scaling: {
			minimumTasks: 1,
			maximumTasks: 3,
			cpuScaling: {
				targetValue: 20,
				// TODO: Tune cooldown values.
				// https://docs.aws.amazon.com/autoscaling/application/userguide/target-tracking-scaling-policy-overview.html#target-tracking-cooldown
				scaleInCooldown: Duration.seconds(60),
				scaleOutCooldown: Duration.seconds(60),
			},
		},
		instancesRequirements: {
			memoryMin: Size.mebibytes(2048),
			vCpuCountMin: 1,
			allowedInstanceTypes: ['c8g.medium'],
		},
	},
};
new RenderingCDKStack(cdkApp, 'FaciaRendering-CODE', FaciaRenderingPropsCODE);

export const FaciaRenderingPropsPROD: RenderingCDKStackProps = {
	guApp: 'facia-rendering',
	stage: 'PROD',
	domainName: 'facia-rendering.guardianapis.com',
	ecsProps: {
		imageIdentifier: getImageIdentifier(),
		cpu: 1024,
		memoryLimitMiB: 1280,
		scaling: {
			minimumTasks: 21,
			maximumTasks: 210,
			cpuScaling: {
				targetValue: 20,
				// TODO: Tune cooldown values.
				// https://docs.aws.amazon.com/autoscaling/application/userguide/target-tracking-scaling-policy-overview.html#target-tracking-cooldown
				scaleInCooldown: Duration.seconds(60),
				scaleOutCooldown: Duration.seconds(60),
			},
		},
		instancesRequirements: {
			memoryMin: Size.mebibytes(2048),
			vCpuCountMin: 1,
			allowedInstanceTypes: ['c8g.medium'],
		},
	},
};
new RenderingCDKStack(cdkApp, 'FaciaRendering-PROD', FaciaRenderingPropsPROD);

/** Tag pages */
export const TagPageRenderingPropsCODE: RenderingCDKStackProps = {
	guApp: 'tag-page-rendering',
	stage: 'CODE',
	domainName: 'tag-page-rendering.code.dev-guardianapis.com',
	ecsProps: {
		imageIdentifier: getImageIdentifier(),
		cpu: 1024,
		memoryLimitMiB: 2048,
		scaling: {
			minimumTasks: 1,
			maximumTasks: 3,
			cpuScaling: {
				targetValue: 20,
				scaleInCooldown: Duration.seconds(60),
				scaleOutCooldown: Duration.seconds(60),
			},
		},
		instancesRequirements: {
			memoryMin: Size.mebibytes(2048),
			vCpuCountMin: 1,
			allowedInstanceTypes: ['c8g.*'],
		},
	},
};

new RenderingCDKStack(
	cdkApp,
	'TagPageRendering-CODE',
	TagPageRenderingPropsCODE,
);

export const TagPageRenderingPropsPROD: RenderingCDKStackProps = {
	guApp: 'tag-page-rendering',
	stage: 'PROD',
	domainName: 'tag-page-rendering.guardianapis.com',
	ecsProps: {
		imageIdentifier: getImageIdentifier(),
		cpu: 1024,
		memoryLimitMiB: 2048,
		scaling: {
			minimumTasks: 18,
			maximumTasks: 30,
			cpuScaling: {
				targetValue: 20,
				// TODO: Tune cooldown values.
				// https://docs.aws.amazon.com/autoscaling/application/userguide/target-tracking-scaling-policy-overview.html#target-tracking-cooldown
				scaleInCooldown: Duration.seconds(60),
				scaleOutCooldown: Duration.seconds(60),
			},
		},
		instancesRequirements: {
			memoryMin: Size.mebibytes(2048),
			vCpuCountMin: 1,
			allowedInstanceTypes: ['c8g.*'],
		},
	},
};

new RenderingCDKStack(
	cdkApp,
	'TagPageRendering-PROD',
	TagPageRenderingPropsPROD,
);

export const InteractiveRenderingPropsCODE: RenderingCDKStackProps = {
	guApp: 'interactive-rendering',
	stage: 'CODE',
	domainName: 'interactive-rendering.code.dev-guardianapis.com',
	ecsProps: {
		imageIdentifier: getImageIdentifier(),
		cpu: 1024,
		memoryLimitMiB: 2048,
		scaling: {
			minimumTasks: 1,
			maximumTasks: 3,
			cpuScaling: {
				targetValue: 20,
				// TODO: Tune cooldown values.
				// https://docs.aws.amazon.com/autoscaling/application/userguide/target-tracking-scaling-policy-overview.html#target-tracking-cooldown
				scaleInCooldown: Duration.seconds(60),
				scaleOutCooldown: Duration.seconds(60),
			},
		},
	},
};
/** Interactive */
new RenderingCDKStack(
	cdkApp,
	'InteractiveRendering-CODE',
	InteractiveRenderingPropsCODE,
);

export const InteractiveRenderingPropsPROD: RenderingCDKStackProps = {
	guApp: 'interactive-rendering',
	stage: 'PROD',
	domainName: 'interactive-rendering.guardianapis.com',
	ecsProps: {
		imageIdentifier: getImageIdentifier(),
		cpu: 1024,
		memoryLimitMiB: 2048,
		scaling: {
			minimumTasks: 3,
			maximumTasks: 30,
			cpuScaling: {
				targetValue: 20,
				// TODO: Tune cooldown values.
				// https://docs.aws.amazon.com/autoscaling/application/userguide/target-tracking-scaling-policy-overview.html#target-tracking-cooldown
				scaleInCooldown: Duration.seconds(60),
				scaleOutCooldown: Duration.seconds(60),
			},
		},
		instancesRequirements: {
			memoryMin: Size.mebibytes(2048),
			vCpuCountMin: 1,
			allowedInstanceTypes: ['c8g.*'],
		},
	},
};
new RenderingCDKStack(
	cdkApp,
	'InteractiveRendering-PROD',
	InteractiveRenderingPropsPROD,
);
