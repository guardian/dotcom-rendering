import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { MobileAppsRendering } from '../lib/mobile-apps-rendering';

const app = new App();
const cloudFormationStackName = process.env.GU_CFN_STACK_NAME;

// ----- MobileAppsRendering CODE ----- //
new MobileAppsRendering(app, 'MobileAppsRendering-CODE', {
	stack: 'mobile',
	stage: 'CODE',
	cloudFormationStackName,
	recordPrefix: 'mobile-rendering',
	asgSize: {
		min: 1,
		max: 2,
	},
	domainName: 'mobile-aws.code.dev-guardianapis.com',
	hostedZoneId: 'Z6PRU8YR6TQDK',
	targetCpuUtilisation: 20,
});

// ----- MobileAppsRendering PROD ----- //
new MobileAppsRendering(app, 'MobileAppsRendering-PROD', {
	stack: 'mobile',
	stage: 'PROD',
	cloudFormationStackName,
	recordPrefix: 'mobile-rendering',
	asgSize: {
		min: 3,
		max: 12,
	},
	domainName: 'mobile-aws.guardianapis.com',
	hostedZoneId: 'Z1EYB4AREPXE3B',
	targetCpuUtilisation: 20,
});

// ----- MobileAppsRenderingPreview CODE ----- //
new MobileAppsRendering(app, 'MobileAppsRenderingPreview-CODE', {
	stack: 'mobile-preview',
	stage: 'CODE',
	cloudFormationStackName,
	recordPrefix: 'mobile-preview-rendering',
	asgSize: {
		min: 1,
		max: 2,
	},
	domainName: 'mobile-aws.code.dev-guardianapis.com',
	hostedZoneId: 'Z6PRU8YR6TQDK',
	targetCpuUtilisation: 20,
});

// ----- MobileAppsRenderingPreview PROD ----- //
new MobileAppsRendering(app, 'MobileAppsRenderingPreview-PROD', {
	stack: 'mobile-preview',
	stage: 'PROD',
	cloudFormationStackName,
	recordPrefix: 'mobile-preview-rendering',
	asgSize: {
		min: 1,
		max: 2,
	},
	domainName: 'mobile-aws.guardianapis.com',
	hostedZoneId: 'Z1EYB4AREPXE3B',
	targetCpuUtilisation: 20,
});
