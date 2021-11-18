import '../webpackPublicPath';
import { startup } from '@root/src/web/browser/startup';
import {
	onConsentChange,
	getConsentFor,
} from '@guardian/consent-management-platform';
import { ConsentState } from '@guardian/consent-management-platform/dist/types';
import { log } from '@guardian/libs';
import { loadScript } from '@root/src/web/lib/loadScript';
import { init as initGa, sendPageView } from './ga';

const init = (): Promise<void> => {
	initGa();
	sendPageView();

	/**
	 * Consent
	 *
	 * Setup a listener for consent changes so that if the reader removes consent for tracking we
	 * remove ga from the page
	 */
	onConsentChange((state: ConsentState) => {
		const consentGiven = getConsentFor('google-analytics', state);
		if (consentGiven) {
			Promise.all([
				loadScript('https://www.google-analytics.com/analytics.js'),
				loadScript(window.guardian.gaPath),
			])
				.then(() => {
					log('dotcom', 'GA script loaded');
				})
				.catch((e) => console.error(`GA - error: ${e}`));
		} else {
			// We should never be able to directly set things to the global window object.
			// But in this case we want to stub things for testing, so it's ok to ignore this rule
			// @ts-ignore
			window.ga = null;
		}
	});

	return Promise.resolve();
};

startup('ga', null, init);
