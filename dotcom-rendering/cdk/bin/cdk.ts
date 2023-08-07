import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { DotcomRendering } from '../lib/dotcom-rendering';

const app = new App();
new DotcomRendering(app, 'DotcomRendering-PROD', {
	app: 'rendering',
	stack: 'frontend',
	stage: 'PROD',
});
new DotcomRendering(app, 'DotcomRendering-CODE', {
	app: 'rendering',
	stack: 'frontend',
	stage: 'CODE',
});
