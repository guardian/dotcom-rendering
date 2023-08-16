import {
	getConsentFor,
	onConsent,
	onConsentChange,
} from '@guardian/consent-management-platform';
import type { ConsentState } from '@guardian/consent-management-platform/dist/types';
import { loadScript, log } from '@guardian/libs';
import { init, sendPageView } from './ga';

/** Memoize loading to prevent loading twice */
let isLoaded = false;

/** Enable Google Analytics */
const loadGoogleAnalytics = async () => {
	if (isLoaded) return;

	try {
		await loadScript('https://www.google-analytics.com/analytics.js');
		isLoaded = true;

		log('dotcom', 'GA script loaded');

		init();
		sendPageView();
	} catch (error) {
		isLoaded = false;
		// We don't need to log script loading errors (these will mostly be adblock, etc),
		if (!String(error).includes('Error loading script')) {
			// This is primarily for logging errors with our GA code.
			window.guardian.modules.sentry.reportError(
				error instanceof Error ? error : new Error(String(error)),
				'ga',
			);
		}
	}
};

/** Disable Google Analytics */
const unloadGoogleAnalytics = () => {
	// @ts-expect-error -- We should never be able to directly set things to the global window object
	// but in this case we want to stub things for testing, so it's ok to ignore this rule
	window.ga = null;
	isLoaded = false;
};

const manageGoogleAnalytics = async (state: ConsentState) => {
	if (getConsentFor('google-analytics', state)) {
		await loadGoogleAnalytics();
	} else {
		unloadGoogleAnalytics();
	}
};

export const ga = async (): Promise<void> => {
	await onConsent().then(manageGoogleAnalytics);

	// Check if we have consent for GA so that if the reader removes consent for tracking we
	// remove ga from the page
	onConsentChange((consentState) => {
		void manageGoogleAnalytics(consentState);
	});
};
