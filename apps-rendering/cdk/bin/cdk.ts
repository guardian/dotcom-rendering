import { App } from 'aws-cdk-lib';
import { MobileAppsRendering } from '../lib/mobile-apps-rendering';
import { InstanceSize } from 'aws-cdk-lib/aws-ec2';

const app = new App();

// ----- MobileAppsRendering CODE ----- //
new MobileAppsRendering(app, 'MobileAppsRendering-CODE', {
	stack: 'mobile',
	stage: 'CODE',
	recordPrefix: 'mobile-rendering',
	asgCapacity: {
		minimumInstances: 1,
		maximumInstances: 2,
	},
	instanceSize: InstanceSize.MICRO,
	appsRenderingDomain: 'mobile-aws.code.dev-guardianapis.com',
	hostedZoneId: 'Z6PRU8YR6TQDK',
	targetCpuUtilisation: 20,
});

// ----- MobileAppsRendering PROD ----- //
new MobileAppsRendering(app, 'MobileAppsRendering-PROD', {
	stack: 'mobile',
	stage: 'PROD',
	recordPrefix: 'mobile-rendering',
	asgCapacity: {
		minimumInstances: 6,
		maximumInstances: 24,
	},
	instanceSize: InstanceSize.SMALL,
	appsRenderingDomain: 'mobile-aws.guardianapis.com',
	hostedZoneId: 'Z1EYB4AREPXE3B',
	targetCpuUtilisation: 20,
});

// ----- MobileAppsRenderingPreview CODE ----- //
new MobileAppsRendering(app, 'MobileAppsRenderingPreview-CODE', {
	stack: 'mobile-preview',
	stage: 'CODE',
	recordPrefix: 'mobile-preview-rendering',
	asgCapacity: {
		minimumInstances: 1,
		maximumInstances: 2,
	},
	instanceSize: InstanceSize.MICRO,
	appsRenderingDomain: 'mobile-aws.code.dev-guardianapis.com',
	hostedZoneId: 'Z6PRU8YR6TQDK',
	targetCpuUtilisation: 20,
});

// ----- MobileAppsRenderingPreview PROD ----- //
new MobileAppsRendering(app, 'MobileAppsRenderingPreview-PROD', {
	stack: 'mobile-preview',
	stage: 'PROD',
	recordPrefix: 'mobile-preview-rendering',
	asgCapacity: {
		minimumInstances: 1,
		maximumInstances: 2,
	},
	instanceSize: InstanceSize.MICRO,
	appsRenderingDomain: 'mobile-aws.guardianapis.com',
	hostedZoneId: 'Z1EYB4AREPXE3B',
	targetCpuUtilisation: 20,
});
