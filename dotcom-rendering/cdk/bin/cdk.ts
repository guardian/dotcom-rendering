import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { DotcomRendering } from '../lib/dotcom-rendering';

const app = new App();
new DotcomRendering(app, 'DotcomRendering-PROD', {
	app: 'DotcomRendering-PROD',
	stack: 'frontend',
	stage: 'PROD',
});
new DotcomRendering(app, 'DotcomRendering-CODE', {
	app: 'DotcomRendering-CODE',
	stack: 'frontend',
	stage: 'CODE',
});

app.synth()
