import 'source-map-support/register';
import { App } from '@aws-cdk/core';
import { MobileAppsRendering } from '../lib/mobile-apps-rendering';

const app = new App();
const cloudFormationStackName = process.env.GU_CFN_STACK_NAME;
new MobileAppsRendering(app, 'MobileAppsRendering', {
	stack: 'mobile',
	cloudFormationStackName,
	recordPrefix: 'mobile-rendering',
	asgMinSize: { CODE: 1, PROD: 3 },
	asgMaxSize: { CODE: 2, PROD: 12 },
});

new MobileAppsRendering(app, 'MobileAppsRenderingPreview', {
	stack: 'mobile-preview',
	cloudFormationStackName,
	recordPrefix: 'mobile-preview-rendering',
	asgMinSize: { CODE: 1, PROD: 1 },
	asgMaxSize: { CODE: 2, PROD: 2 },
});
