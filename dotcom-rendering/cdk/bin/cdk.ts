import { App } from 'aws-cdk-lib';
import { InstanceSize } from 'aws-cdk-lib/aws-ec2';
import { DotcomRendering } from '../lib/dotcom-rendering';
import { RenderingCDKStack } from '../lib/renderingStack';

const cdkApp = new App();

/** OLD article stack */
const sharedProps = {
	stack: 'frontend',
	region: 'eu-west-1',
};

new DotcomRendering(cdkApp, 'DotcomRendering-PROD', {
	...sharedProps,
	app: 'rendering',
	stage: 'PROD',
	minCapacity: 18,
	maxCapacity: 80,
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

/** NEW article stack */
new RenderingCDKStack(cdkApp, 'ArticleRendering-CODE', {
	guApp: 'article-rendering',
	stage: 'CODE',
	domainName: 'article-rendering.code.dev-guardianapis.com',
	scaling: { minimumInstances: 1, maximumInstances: 4 },
	instanceSize: InstanceSize.MICRO,
});
new RenderingCDKStack(cdkApp, 'ArticleRendering-PROD', {
	guApp: 'article-rendering',
	stage: 'PROD',
	domainName: 'article-rendering.guardianapis.com',
	scaling: {
		minimumInstances: 18,
		maximumInstances: 120,
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
	instanceSize: InstanceSize.SMALL,
});

/** Facia */
new RenderingCDKStack(cdkApp, 'FaciaRendering-CODE', {
	guApp: 'facia-rendering',
	stage: 'CODE',
	domainName: 'facia-rendering.code.dev-guardianapis.com',
	scaling: { minimumInstances: 1, maximumInstances: 4 },
	instanceSize: InstanceSize.SMALL,
});
new RenderingCDKStack(cdkApp, 'FaciaRendering-PROD', {
	guApp: 'facia-rendering',
	stage: 'PROD',
	domainName: 'facia-rendering.guardianapis.com',
	scaling: {
		minimumInstances: 4,
		maximumInstances: 20,
		policy: {
			scalingStepsOut: [
				// No scaling up effect when latency is lower than 0.3s
				{ lower: 0, upper: 0.3, change: 0 },
				// When latency is higher than 0.3s we scale up by 50%
				{ lower: 0.3, change: 50 },
				// When latency is higher than 0.4s we scale up by 80%
				{ lower: 0.4, change: 80 },
			],
			scalingStepsIn: [
				// No scaling down effect when latency is higher than 0.25s
				{ lower: 0.25, change: 0 },
				// When latency is lower than 0.25s we scale down by 1
				{ upper: 0.25, lower: 0, change: -1 },
			],
		},
	},
	instanceSize: InstanceSize.SMALL,
});

/** Misc */
// new RenderingCDKStack(cdkApp, 'MiscRendering-CODE', {
// 	guApp: 'misc-rendering',
// 	stage: 'CODE',
//	domainName: 'misc-rendering.code.dev-guardianapis.com',
// 	scaling: { minimumInstances: 1, maximumInstances: 2 },
//  instanceSize: InstanceSize.MICRO,
// });
// new RenderingCDKStack(cdkApp, 'MiscRenderingPROD', {
// 	guApp: 'misc-rendering',
// 	stage: 'PROD',
//	domainName: 'misc-rendering.guardianapis.com',
// 	scaling: { minimumInstances: 1, maximumInstances: 2 },
//  instanceSize: InstanceSize.MICRO,
// });

/** Interactive */
// new RenderingCDKStack(cdkApp, 'InteractiveRendering-CODE', {
// 	guApp: 'interactive-rendering',
// 	stage: 'CODE',
//	domainName: 'interactive-rendering.code.dev-guardianapis.com',
// 	scaling: { minimumInstances: 1, maximumInstances: 2 },
//  instanceSize: InstanceSize.MICRO,
// });
// new RenderingCDKStack(cdkApp, 'InteractiveRenderingPROD', {
// 	guApp: 'interactive-rendering',
// 	stage: 'PROD',
//	domainName: 'interactive-rendering.guardianapis.com',
// 	scaling: { minimumInstances: 1, maximumInstances: 2 },
//  instanceSize: InstanceSize.MICRO,
// });
