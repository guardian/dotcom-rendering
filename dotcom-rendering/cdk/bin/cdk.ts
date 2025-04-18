import { App } from 'aws-cdk-lib';
import { InstanceClass, InstanceSize, InstanceType } from 'aws-cdk-lib/aws-ec2';
import { RenderingCDKStack } from '../lib/renderingStack';

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
new RenderingCDKStack(cdkApp, 'ArticleRendering-CODE', {
	guApp: 'article-rendering',
	stage: 'CODE',
	domainName: 'article-rendering.code.dev-guardianapis.com',
	scaling: { minimumInstances: 1, maximumInstances: 3 },
	instanceType: InstanceType.of(InstanceClass.T4G, InstanceSize.SMALL),
});
new RenderingCDKStack(cdkApp, 'ArticleRendering-PROD', {
	guApp: 'article-rendering',
	stage: 'PROD',
	domainName: 'article-rendering.guardianapis.com',
	scaling: {
		minimumInstances: 24,
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
});

/** Facia */
new RenderingCDKStack(cdkApp, 'FaciaRendering-CODE', {
	guApp: 'facia-rendering',
	stage: 'CODE',
	domainName: 'facia-rendering.code.dev-guardianapis.com',
	scaling: { minimumInstances: 1, maximumInstances: 3 },
	instanceType: InstanceType.of(InstanceClass.T4G, InstanceSize.SMALL),
});
new RenderingCDKStack(cdkApp, 'FaciaRendering-PROD', {
	guApp: 'facia-rendering',
	stage: 'PROD',
	domainName: 'facia-rendering.guardianapis.com',
	scaling: {
		minimumInstances: 21,
		maximumInstances: 210,
		policies: {
			step: {
				cpu: cpuScalingSteps,
				latency: {
					scalingStepsOut: [
						// When latency is lower than 0.4s no scaling up
						{ lower: 0, upper: 0.4, change: 0 },
						// When latency is higher than 0.4s we scale up by 50%
						{ lower: 0.4, change: 50 },
						// When latency is higher than 0.5s we scale up by 80%
						{ lower: 0.5, change: 80 },
					],
					scalingStepsIn: [
						// When latency is higher than 0.35s no scaling down
						{ lower: 0.35, change: 0 },
						// When latency is lower than 0.35s we scale down by 1
						{ upper: 0.35, lower: 0, change: -1 },
					],
				},
			},
		},
	},
	instanceType: InstanceType.of(InstanceClass.C8G, InstanceSize.MEDIUM),
});

/** Tag pages */
new RenderingCDKStack(cdkApp, 'TagPageRendering-CODE', {
	guApp: 'tag-page-rendering',
	stage: 'CODE',
	domainName: 'tag-page-rendering.code.dev-guardianapis.com',
	scaling: { minimumInstances: 1, maximumInstances: 3 },
	instanceType: InstanceType.of(InstanceClass.T4G, InstanceSize.SMALL),
});
new RenderingCDKStack(cdkApp, 'TagPageRendering-PROD', {
	guApp: 'tag-page-rendering',
	stage: 'PROD',
	domainName: 'tag-page-rendering.guardianapis.com',
	scaling: {
		minimumInstances: 9,
		maximumInstances: 90,
		policies: {
			step: {
				cpu: cpuScalingSteps,
				latency: {
					scalingStepsOut: [
						// When latency is lower than 0.4s no scaling up
						{ lower: 0, upper: 0.4, change: 0 },
						// When latency is higher than 0.4s we scale up by 50%
						{ lower: 0.4, change: 50 },
						// When latency is higher than 0.5s we scale up by 80%
						{ lower: 0.5, change: 80 },
					],
					scalingStepsIn: [
						// When latency is higher than 0.35s no scaling down
						{ lower: 0.35, change: 0 },
						// When latency is lower than 0.35s we scale down by 1
						{ upper: 0.35, lower: 0, change: -1 },
					],
				},
			},
		},
	},
	instanceType: InstanceType.of(InstanceClass.C8G, InstanceSize.MEDIUM),
});

/** Interactive */
new RenderingCDKStack(cdkApp, 'InteractiveRendering-CODE', {
	guApp: 'interactive-rendering',
	stage: 'CODE',
	domainName: 'interactive-rendering.code.dev-guardianapis.com',
	scaling: { minimumInstances: 1, maximumInstances: 3 },
	instanceType: InstanceType.of(InstanceClass.T4G, InstanceSize.MICRO),
});
new RenderingCDKStack(cdkApp, 'InteractiveRendering-PROD', {
	guApp: 'interactive-rendering',
	stage: 'PROD',
	domainName: 'interactive-rendering.guardianapis.com',
	scaling: {
		minimumInstances: 3,
		maximumInstances: 30,
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
						// When latency is higher than 0.15s no scaling down
						{ lower: 0.15, change: 0 },
						// When latency is lower than 0.15s we scale down by 1
						{ upper: 0.15, lower: 0, change: -1 },
					],
				},
			},
		},
	},
	instanceType: InstanceType.of(InstanceClass.C8G, InstanceSize.MEDIUM),
});
