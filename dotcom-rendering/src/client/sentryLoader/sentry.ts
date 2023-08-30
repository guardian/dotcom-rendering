import * as Sentry from '@sentry/browser';
import type { BrowserOptions } from '@sentry/browser';
import { CaptureConsole } from '@sentry/integrations';
import {
	adaptive,
	BUILD_VARIANT,
	dcrJavascriptBundle,
} from '../../../scripts/webpack/bundles';

const allowUrls: BrowserOptions['allowUrls'] = [
	/webpack-internal/,
	new RegExp(`/$(process.env.HOSTNAME || 'localhost')/`),
	/assets\.guim\.co\.uk/,
	/ophan\.co\.uk/,
];

// Ignore these errors
// https://docs.sentry.io/platforms/javascript/#decluttering-sentry
const ignoreErrors = [
	"Can't execute code from a freed script",
	/InvalidStateError/gi,
	'This video is no longer available.',
	'UnknownError',
	'The quota has been exceeded',
	// Browsers throw exceptions for cancelled network requests
	// https://stackoverflow.com/questions/55738408/javascript-typeerror-cancelled-error-when-calling-fetch-on-ios/70452078#70452078
	// https://request-cancellation-test.vercel.app/
	/Fetch error:/gi,
	'Network request failed',
	'NetworkError',
	'Failed to fetch',
	'TypeError: Failed to fetch',
	'TypeError: NetworkError when attempting to fetch resource',
	'TypeError: Load failed',
	'TypeError: Importing a module script failed',
	'TypeError: error loading dynamically imported module',
];

const { config } = window.guardian;
const {
	page: { dcrSentryDsn },
	stage,
} = config;

Sentry.init({
	ignoreErrors,
	allowUrls,
	dsn: dcrSentryDsn,
	environment: stage || 'DEV',
	integrations: [new CaptureConsole({ levels: ['error'] })],
	maxBreadcrumbs: 50,
	// sampleRate: // We use Math.random in init.ts to sample errors
});

if (
	BUILD_VARIANT &&
	window.guardian.config.tests[dcrJavascriptBundle('Variant')] === 'variant'
) {
	Sentry.setTag('dcr.bundle', dcrJavascriptBundle('Variant'));
}

if (window.guardian.config.tests[adaptive('Variant')] === 'variant') {
	Sentry.setTag('dcr.bundle', 'adaptive');
}

export const reportError = (error: Error, feature?: string): void => {
	Sentry.withScope(() => {
		if (feature) {
			Sentry.setTag('feature', feature);
		}
		Sentry.captureException(error);
	});
};
