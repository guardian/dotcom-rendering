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
	minCapacity: 27,
	maxCapacity: 120,
	instanceType: 't4g.small',
});

new DotcomRendering(app, 'DotcomRendering-CODE', {
	...sharedProps,
	app: 'rendering',
	stage: 'CODE',
	minCapacity: 1,
	maxCapacity: 4,
	instanceType: 't4g.large',
});

new DotcomRendering(app, 'DotcomRendering-front-web-CODE', {
	...sharedProps,
	app: 'front-web',
	stage: 'CODE',
	minCapacity: 1,
	maxCapacity: 4,
	instanceType: 't4g.micro',
});

new DotcomRendering(app, 'DotcomRendering-front-web-PROD', {
	...sharedProps,
	app: 'front-web',
	stage: 'PROD',
	// TODO: up this once we have code working
	minCapacity: 1,
	maxCapacity: 4,
	instanceType: 't4g.micro',
});
