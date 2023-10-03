import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { DotcomRendering } from '../lib/dotcom-rendering';

const app = new App();

const sharedProps = {
	stack: 'frontend',
	region: 'eu-west-1',
};

new DotcomRendering(app, 'DotcomRendering-PROD', {
	...sharedProps,
	app: 'rendering',
	stage: 'PROD',
	minCapacity: 30,
	maxCapacity: 120,
	instanceType: 't4g.small',
});

new DotcomRendering(app, 'DotcomRendering-CODE', {
	...sharedProps,
	app: 'rendering',
	stage: 'CODE',
	minCapacity: 1,
	maxCapacity: 4,
	instanceType: 't4g.micro',
});

new DotcomRendering(app, 'DotcomRendering-render-front-CODE', {
	...sharedProps,
	app: 'render-front',
	stage: 'CODE',
	minCapacity: 1,
	maxCapacity: 4,
	instanceType: 't4g.micro',
});

new DotcomRendering(app, 'DotcomRendering-render-front-PROD', {
	...sharedProps,
	app: 'render-front',
	stage: 'PROD',
	// TODO: up this once we have code working
	minCapacity: 1,
	maxCapacity: 4,
	instanceType: 't4g.micro',
});
