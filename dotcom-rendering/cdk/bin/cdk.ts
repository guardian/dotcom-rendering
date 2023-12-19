import { App } from 'aws-cdk-lib';
import { RenderingApp } from '../lib/rendering-app';

const app = new App();

new RenderingApp(app, 'ArticleRendering-CODE', {
	app: 'article',
	stage: 'CODE',
	minCapacity: 1,
	maxCapacity: 4,
	instanceType: 't4g.micro',
});
new RenderingApp(app, 'ArticleRendering-PROD', {
	app: 'article',
	stage: 'PROD',
	minCapacity: 27,
	maxCapacity: 120,
	instanceType: 't4g.small',
});

new RenderingApp(app, 'FaciaRendering-CODE', {
	app: 'facia',
	stage: 'CODE',
	minCapacity: 1,
	maxCapacity: 4,
	instanceType: 't4g.micro',
});
new RenderingApp(app, 'FaciaRendering-PROD', {
	app: 'facia',
	stage: 'PROD',
	minCapacity: 1,
	maxCapacity: 4,
	instanceType: 't4g.micro',
});

// new RenderingApp(app, 'GeneralRendering-CODE', {
// 	app: 'general',
// 	stage: 'CODE',
// 	minCapacity: 1,
// 	maxCapacity: 4,
// 	instanceType: 't4g.micro',
// });
// new RenderingApp(app, 'GeneralRenderingPROD', {
// 	app: 'general',
// 	stage: 'PROD',
// 	minCapacity: 1,
// 	maxCapacity: 4,
// 	instanceType: 't4g.micro',
// });
