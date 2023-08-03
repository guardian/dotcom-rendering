import {
	getConsentFor,
	onConsentChange,
} from '@guardian/consent-management-platform';
import type { ConsentState } from '@guardian/consent-management-platform/dist/types';
import { loadScript, log } from '@guardian/libs';
import { init, sendPageView } from './ga';

export const ga = (): Promise<void> =>
	new Promise((resolve) => {
		// Check if we have consent for GA so that if the reader removes consent for tracking we
		// remove ga from the page

		onConsentChange((consentState: ConsentState) => {
			const consentGivenForGA = getConsentFor(
				'google-analytics',
				consentState,
			);
			if (consentGivenForGA) {
				loadScript('https://www.google-analytics.com/analytics.js')
					.then(() => {
						log('dotcom', 'GA script loaded');

						init();
						sendPageView();
					})
					.catch((e) => {
						// We don't need to log script loading errors (these will mostly be adblock, etc),
						if (!String(e).includes('Error loading script')) {
							// This is primarily for logging errors with our GA code.
							window.guardian.modules.sentry.reportError(
								e instanceof Error ? e : new Error(e),
								'ga',
							);
						}
					})
					.finally(() => resolve());
			} else {
				// Disable Google Analytics
				// @ts-expect-error -- We should never be able to directly set things to the global window object
				// but in this case we want to stub things for testing, so it's ok to ignore this rule
				window.ga = null;
				resolve();
			}
		});
	});
