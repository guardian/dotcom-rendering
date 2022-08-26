import * as Sentry from '@sentry/browser';
import type { BrowserOptions } from '@sentry/browser';
import { CaptureConsole } from '@sentry/integrations';

const allowUrls: BrowserOptions['allowUrls'] = [
	/webpack-internal/,
	new RegExp(`/$(process.env.HOSTNAME || 'localhost')/`),
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

const { config } = window.guardian;
const {
	switches: { enableSentryReporting },
	isDev,
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
	beforeSend(event) {
		// Skip sending events in certain situations
		const dontSend = isDev || !enableSentryReporting;
		if (dontSend) {
			return null;
		}
		return event;
	},
});

Sentry.setTag(
	'dcr.bundle',
	window.guardian.config.page.abTests.jsBundleVariant,
);

export const reportError = (error: Error, feature?: string): void => {
	Sentry.withScope(() => {
		if (feature) {
			Sentry.setTag('feature', feature);
		}
		Sentry.captureException(error);
	});
};
