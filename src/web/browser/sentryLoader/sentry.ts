import * as Sentry from '@sentry/browser';
import { CaptureConsole } from '@sentry/integrations';

// Only send errors matching these regexes
const whitelistUrls = [
	/webpack-internal/,
	/localhost/,
	/assets\.guim\.co\.uk/,
	/ophan\.co\.uk/,
];

// Ignore these errors
const ignoreErrors = [
	// https://docs.sentry.io/platforms/javascript/#decluttering-sentry
	"Can't execute code from a freed script",
	/InvalidStateError/gi,
	/Fetch error:/gi,
	'Network request failed',
	'NetworkError',
	'Failed to fetch',
	'This video is no longer available.',
	'UnknownError',
	'TypeError: Failed to fetch',
	'TypeError: NetworkError when attempting to fetch resource',
	'The quota has been exceeded',
];

const CAPIBrowser: CAPIBrowserType = window.guardian.app.data.CAPI;
const {
	editionLongForm,
	contentType,
	config: { isDev, enableSentryReporting, dcrSentryDsn },
} = CAPIBrowser;

Sentry.init({
	ignoreErrors,
	whitelistUrls,
	dsn: dcrSentryDsn,
	environment: window.guardian.config.stage || 'DEV',
	integrations: [new CaptureConsole({ levels: ['error'] })],
	maxBreadcrumbs: 50,
	// sampleRate: // We use Math.random in init.ts to sample errors
	beforeSend(event) {
		// Skip sending events in certain situations
		const dontSend = isDev || !enableSentryReporting;
		if (dontSend) {
			return null;
		}
		return event;
	},
});

Sentry.configureScope((scope) => {
	scope.setTag('edition', editionLongForm);
	scope.setTag('contentType', contentType);
});

export const reportError = (error: Error, feature?: string): void => {
	Sentry.withScope(() => {
		if (feature) {
			Sentry.setTag('feature', feature);
		}
		Sentry.captureException(error);
	});
};
