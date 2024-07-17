import { App } from 'aws-cdk-lib';
import { InstanceClass, InstanceSize, InstanceType } from 'aws-cdk-lib/aws-ec2';
import { DotcomRendering } from '../lib/dotcom-rendering';
import { RenderingCDKStack } from '../lib/renderingStack';

const cdkApp = new App();

/** OLD article stack */
const sharedProps = {
	stack: 'frontend',
	region: 'eu-west-1',
};

/** Legacy, only serves the all newsletters page */
new DotcomRendering(cdkApp, 'DotcomRendering-PROD', {
	...sharedProps,
	app: 'rendering',
	stage: 'PROD',
	minCapacity: 3,
	maxCapacity: 30,
	instanceType: 't4g.small',
});
new DotcomRendering(cdkApp, 'DotcomRendering-CODE', {
	...sharedProps,
	app: 'rendering',
	stage: 'CODE',
	minCapacity: 1,
	maxCapacity: 4,
	instanceType: 't4g.micro',
});

/** Article */
new RenderingCDKStack(cdkApp, 'ArticleRendering-CODE', {
	guApp: 'article-rendering',
	stage: 'CODE',
	domainName: 'article-rendering.code.dev-guardianapis.com',
	scaling: { minimumInstances: 1, maximumInstances: 3 },
	instanceType: InstanceType.of(InstanceClass.T4G, InstanceSize.MICRO),
});
new RenderingCDKStack(cdkApp, 'ArticleRendering-PROD', {
	guApp: 'article-rendering',
	stage: 'PROD',
	domainName: 'article-rendering.guardianapis.com',
	scaling: {
		minimumInstances: 18,
		maximumInstances: 180,
		policy: {
			scalingStepsOut: [
				// No scaling up effect when latency is lower than 0.2s
				{ lower: 0, upper: 0.2, change: 0 },
				// When latency is higher than 0.2s we scale up by 50%
				{ lower: 0.2, change: 50 },
				// When latency is higher than 0.3s we scale up by 80%
				{ lower: 0.3, change: 80 },
			],
			scalingStepsIn: [
				// No scaling down effect when latency is higher than 0.12s
				{ lower: 0.12, change: 0 },
				// When latency is lower than 0.12s we scale down by 1
				{ upper: 0.12, lower: 0, change: -1 },
			],
		},
	},
	instanceType: InstanceType.of(InstanceClass.C7G, InstanceSize.MEDIUM),
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
		minimumInstances: 18,
		maximumInstances: 180,
		policy: {
			scalingStepsOut: [
				// No scaling up effect when latency is lower than 0.4s
				{ lower: 0, upper: 0.4, change: 0 },
				// When latency is higher than 0.4s we scale up by 50%
				{ lower: 0.4, change: 50 },
				// When latency is higher than 0.5s we scale up by 80%
				{ lower: 0.5, change: 80 },
			],
			scalingStepsIn: [
				// No scaling down effect when latency is higher than 0.35s
				{ lower: 0.35, change: 0 },
				// When latency is lower than 0.35s we scale down by 1
				{ upper: 0.35, lower: 0, change: -1 },
			],
		},
	},
	instanceType: InstanceType.of(InstanceClass.C7G, InstanceSize.MEDIUM),
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
		minimumInstances: 18,
		maximumInstances: 180,
		policy: {
			scalingStepsOut: [
				// No scaling up effect when latency is lower than 0.4s
				{ lower: 0, upper: 0.4, change: 0 },
				// When latency is higher than 0.4s we scale up by 50%
				{ lower: 0.4, change: 50 },
				// When latency is higher than 0.5s we scale up by 80%
				{ lower: 0.5, change: 80 },
			],
			scalingStepsIn: [
				// No scaling down effect when latency is higher than 0.35s
				{ lower: 0.35, change: 0 },
				// When latency is lower than 0.35s we scale down by 1
				{ upper: 0.35, lower: 0, change: -1 },
			],
		},
	},
	instanceType: InstanceType.of(InstanceClass.C7G, InstanceSize.MEDIUM),
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
		policy: {
			scalingStepsOut: [
				// No scaling up effect when latency is lower than 0.2s
				{ lower: 0, upper: 0.2, change: 0 },
				// When latency is higher than 0.3s we scale up by 50%
				{ lower: 0.2, change: 50 },
				// When latency is higher than 0.3s we scale up by 80%
				{ lower: 0.3, change: 80 },
			],
			scalingStepsIn: [
				// No scaling down effect when latency is higher than 0.15s
				{ lower: 0.15, change: 0 },
				// When latency is lower than 0.15s we scale down by 1
				{ upper: 0.15, lower: 0, change: -1 },
			],
		},
	},
	instanceType: InstanceType.of(InstanceClass.C7G, InstanceSize.MEDIUM),
});
