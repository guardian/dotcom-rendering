import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { DotcomRendering } from '../lib/dotcom-rendering';

const app = new App();

const sharedProps = {
	app: 'rendering',
	stack: 'frontend',
	region: 'eu-west-1',
};

new DotcomRendering(app, 'DotcomRendering-PROD', {
	...sharedProps,
	stage: 'PROD',
	instanceType: 't4g.small',
});
new DotcomRendering(app, 'DotcomRendering-CODE', {
	...sharedProps,
	stage: 'CODE',
	instanceType: 't4g.micro',
});
