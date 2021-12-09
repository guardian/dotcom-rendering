import { getCookie, log } from '@guardian/libs';
import { getLocaleCode } from '@frontend/web/lib/getCountryCode';
import {
	cmp,
	onConsentChange,
	getConsentFor,
} from '@guardian/consent-management-platform';
import { injectPrivacySettingsLink } from '@root/src/web/lib/injectPrivacySettingsLink';
import { startup } from '@root/src/web/browser/startup';
import { ConsentState } from '@guardian/consent-management-platform/dist/types';

import { loadScript } from '@root/src/web/lib/loadScript';
import {
	OphanComponentType,
	OphanAction,
	submitComponentEvent,
} from '../ophan/ophan';

const trackPerformance = (
	timingCategory: string,
	timingVar: any,
	timingLabel: string,
): void => {
	const { ga } = window;

	if (!ga) {
		return;
	}

	if (window.performance && window.performance.now) {
		ga(
			'allEditorialPropertyTracker.send',
			'timing',
			timingCategory,
			timingVar,
			Math.round(window.performance.now()),
			timingLabel,
		);
	}
};

const init = async (): Promise<void> => {
	/**
	 * Keep this file in sync with CONSENT_TIMING in static/src/javascripts/boot.js in frontend
	 * mark: CONSENT_TIMING
	 */
	if (!window.guardian.config.switches.consentManagement) return; // CMP turned off!
	const browserId = getCookie({ name: 'bwid', shouldMemoize: true });
	const { pageViewId } = window.guardian.config.ophan;

	// Track when CMP will show with GA
	cmp.willShowPrivacyMessage()
		.then((willShow) => {
			trackPerformance(
				'consent',
				'acquired',
				willShow ? 'new' : 'existing',
			);
		})
		.catch((e) =>
			log('dotcom', `CMP willShowPrivacyMessage - error: ${e}`),
		);

	onConsentChange((consentState: ConsentState) => {
		if (!consentState) return;

		// Register changes in consent state with Ophan
		const decideConsentString = () => {
			if (consentState.tcfv2) {
				return consentState.tcfv2?.tcString;
			}
			return '';
		};
		const componentType: OphanComponentType = 'CONSENT';
		const consentUUID = getCookie({ name: 'consentUUID' }) || '';
		const consentString = decideConsentString();
		// I am using MANAGE_CONSENT as the default action while we develop this code (Pascal).
		const action: OphanAction = 'MANAGE_CONSENT';
		const event = {
			component: {
				componentType,
				products: [],
				labels: [consentUUID, consentString],
			},
			action,
		};
		submitComponentEvent(event);

		// Check if we have consent for GA so that if the reader removes consent for tracking we
		// remove ga from the page
		const consentGivenForGA = getConsentFor(
			'google-analytics',
			consentState,
		);
		if (consentGivenForGA) {
			Promise.all([
				loadScript('https://www.google-analytics.com/analytics.js'),
				loadScript(window.guardian.gaPath),
			])
				.then(() => {
					log('dotcom', 'GA script loaded');
				})
				.catch((e) => console.error(`GA - error: ${e}`));
		} else {
			// Disable Google Analytics
			// Note. We should never be able to directly set things to the global window object
			// but in this case we want to stub things for testing, so it's ok to ignore this rule
			// @ts-ignore
			window.ga = null;
		}
	});

	document.onreadystatechange = () => {
		if (
			document.readyState === 'interactive' ||
			document.readyState === 'complete'
		) {
			// Manually updates the footer DOM because it's not hydrated
			injectPrivacySettingsLink();
		}
	};

	cmp.init({
		pubData: {
			platform: 'next-gen',
			// If `undefined`, the resulting consent signal cannot be joined to a page view.
			browserId: browserId ?? undefined,
			pageViewId,
		},
		country: (await getLocaleCode()) || undefined,
	});
	log('dotcom', 'CMP initialised');

	return Promise.resolve();
};

startup('bootCmp', null, init);
