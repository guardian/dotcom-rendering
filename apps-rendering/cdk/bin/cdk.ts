import 'source-map-support/register';
import { App } from '@aws-cdk/core';
import { MobileAppsRendering } from '../lib/mobile-apps-rendering';

const app = new App();
const cloudFormationStackName = process.env.GU_CFN_STACK_NAME;
new MobileAppsRendering(app, 'MobileAppsRendering', {
	stack: 'mobile',
	cloudFormationStackName,
});

new MobileAppsRendering(app, 'MobileAppsRenderingPreview', {
  stack: 'mobile-preview',
  cloudFormationStackName,
});
