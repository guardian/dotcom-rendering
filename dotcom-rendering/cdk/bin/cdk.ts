import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { InstanceSize } from 'aws-cdk-lib/aws-ec2';
import { DotcomRendering } from '../lib/dotcom-rendering';
import { DotcomRenderingHalloween } from '../lib/dotcom-rendering-halloween';

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

// TODO: understand what the implications of this would be
new DotcomRenderingHalloween(app, 'DotcomRendering-Halloween-CODE', {
	stack: 'frontend',
	app: 'rendering-halloween',
	stage: 'CODE',
	instanceSize: InstanceSize.MICRO,
	scaling: { minimumInstances: 1, maximumInstances: 2 },
});
