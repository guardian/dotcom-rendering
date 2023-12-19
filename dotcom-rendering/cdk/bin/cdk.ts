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
	minCapacity: 27,
	maxCapacity: 120,
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
	guApp: 'article',
	stage: 'CODE',
	scaling: { minimumInstances: 1, maximumInstances: 2 },
	instanceSize: InstanceSize.MICRO,
});
new RenderingCDKStack(cdkApp, 'ArticleRendering-PROD', {
	guApp: 'article',
	stage: 'PROD',
	scaling: { minimumInstances: 27, maximumInstances: 120 },
	instanceSize: InstanceSize.SMALL,
});

/** Facia */
// new RenderingCDKStack(cdkApp, 'FaciaRendering-CODE', {
// 	guApp: 'facia',
// 	stage: 'CODE',
// 	scaling: { minimumInstances: 1, maximumInstances: 2 },
// 	instanceSize: InstanceSize.MICRO,
// });
// new RenderingCDKStack(cdkApp, 'FaciaRendering-PROD', {
// 	guApp: 'facia',
// 	stage: 'PROD',
// 	scaling: { minimumInstances: 1, maximumInstances: 2 },
// 	instanceSize: InstanceSize.MICRO,
// });

/** Misc */
// new RenderingCDKStack(cdkApp, 'MiscRendering-CODE', {
// 	guApp: 'misc',
// 	stage: 'CODE',
// 	scaling: { minimumInstances: 1, maximumInstances: 2 },
//  instanceSize: InstanceSize.MICRO,
// });
// new RenderingCDKStack(cdkApp, 'MiscRenderingPROD', {
// 	guApp: 'misc',
// 	stage: 'PROD',
// 	scaling: { minimumInstances: 1, maximumInstances: 2 },
//  instanceSize: InstanceSize.MICRO,
// });

/** Interactive */
// new RenderingCDKStack(cdkApp, 'InteractiveRendering-CODE', {
// 	guApp: 'interactive',
// 	stage: 'CODE',
// 	scaling: { minimumInstances: 1, maximumInstances: 2 },
//  instanceSize: InstanceSize.MICRO,
// });
// new RenderingCDKStack(cdkApp, 'InteractiveRenderingPROD', {
// 	guApp: 'interactive',
// 	stage: 'PROD',
// 	scaling: { minimumInstances: 1, maximumInstances: 2 },
//  instanceSize: InstanceSize.MICRO,
// });
