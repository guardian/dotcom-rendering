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
	scaling: { minimumInstances: 1, maximumInstances: 2 },
	instanceSize: InstanceSize.MICRO,
});
new RenderingCDKStack(cdkApp, 'ArticleRendering-PROD', {
	guApp: 'article-rendering',
	stage: 'PROD',
	domainName: 'article-rendering.guardianapis.com',
	scaling: { minimumInstances: 18, maximumInstances: 120 },
	instanceSize: InstanceSize.SMALL,
});

/** Facia */
// new RenderingCDKStack(cdkApp, 'FaciaRendering-CODE', {
// 	guApp: 'facia-rendering',
// 	stage: 'CODE',
//	domainName: 'facia-rendering.code.dev-guardianapis.com',
// 	scaling: { minimumInstances: 1, maximumInstances: 2 },
// 	instanceSize: InstanceSize.MICRO,
// });
// new RenderingCDKStack(cdkApp, 'FaciaRendering-PROD', {
// 	guApp: 'facia-rendering',
// 	stage: 'PROD',
//	domainName: 'facia-rendering.guardianapis.com',
// 	scaling: { minimumInstances: 1, maximumInstances: 2 },
// 	instanceSize: InstanceSize.MICRO,
// });

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
