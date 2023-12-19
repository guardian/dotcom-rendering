import { App } from 'aws-cdk-lib';
import { RenderingCDKStack } from '../lib/rendering-stack';

const cdkApp = new App();

new RenderingCDKStack(cdkApp, 'ArticleRendering-CODE', {
	guApp: 'article',
	stage: 'CODE',
	minCapacity: 1,
	maxCapacity: 4,
	instanceType: 't4g.micro',
});
new RenderingCDKStack(cdkApp, 'ArticleRendering-PROD', {
	guApp: 'article',
	stage: 'PROD',
	minCapacity: 27,
	maxCapacity: 120,
	instanceType: 't4g.small',
});

new RenderingCDKStack(cdkApp, 'FaciaRendering-CODE', {
	guApp: 'facia',
	stage: 'CODE',
	minCapacity: 1,
	maxCapacity: 4,
	instanceType: 't4g.micro',
});
new RenderingCDKStack(cdkApp, 'FaciaRendering-PROD', {
	guApp: 'facia',
	stage: 'PROD',
	minCapacity: 1,
	maxCapacity: 4,
	instanceType: 't4g.micro',
});

// new RenderingCDKStack(cdkApp, 'MiscRendering-CODE', {
// 	guApp: 'misc',
// 	stage: 'CODE',
// 	minCapacity: 1,
// 	maxCapacity: 4,
// 	instanceType: 't4g.micro',
// });
// new RenderingCDKStack(cdkApp, 'MiscRenderingPROD', {
// 	guApp: 'misc',
// 	stage: 'PROD',
// 	minCapacity: 1,
// 	maxCapacity: 4,
// 	instanceType: 't4g.micro',
// });

// new RenderingCDKStack(cdkApp, 'InteractiveRendering-CODE', {
// 	guApp: 'interactive',
// 	stage: 'CODE',
// 	minCapacity: 1,
// 	maxCapacity: 4,
// 	instanceType: 't4g.micro',
// });
// new RenderingCDKStack(cdkApp, 'InteractiveRenderingPROD', {
// 	guApp: 'interactive',
// 	stage: 'PROD',
// 	minCapacity: 1,
// 	maxCapacity: 4,
// 	instanceType: 't4g.micro',
// });
