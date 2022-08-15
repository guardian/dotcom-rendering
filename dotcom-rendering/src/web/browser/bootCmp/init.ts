import {
	cmp,
	getConsentFor,
	onConsentChange,
} from '@guardian/consent-management-platform';
import type { ConsentState } from '@guardian/consent-management-platform/dist/types';
import { getCookie, log } from '@guardian/libs';
import { getLocaleCode } from '../../lib/getCountryCode';
import { injectPrivacySettingsLink } from '../../lib/injectPrivacySettingsLink';
import { loadScript } from '../../lib/loadScript';
import type { OphanAction, OphanComponentType } from '../ophan/ophan';
import { submitComponentEvent } from '../ophan/ophan';
import { startup } from '../startup';

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
			log('dotcom', `CMP willShowPrivacyMessage - error: ${String(e)}`),
		);

	onConsentChange((consentState: ConsentState) => {
		if (!consentState) return;
		// Register changes in consent state with Ophan

		/*
			(Date: February 2022. Author: Pascal. This is a work in progress...)

			### General Context

			We are sending consent data from the client side to the datalake through Ophan, using Ophan Component Events.

			We are using Ophan Component Events because consent events do not have a first class type in the Ophan pipeline
			(this may change in the future)

			At the moment we are using MANAGE_CONSENT as the default action while we develop this code.

			### Encoding Conventions

			At the moment, the payload is essentially contained in the `labels` attribute (an array of strings) of the
			component object. We are going to encode consent data for more than one jusridiction. To make this unambiguous
			we are going to use a specific convention.

			Each element of the array represents a particular attribute. Note that the collection of attributes is different
			from one jurisdiction to another. To have an unambiguous reading we prefix each attribute value with a code
			that helps identify the attribute type.

			An element of the array is then always of the form "<code>:<value>"

			Codes:
				01: Specify the jurisdiction. Accepted values: "TCF.v2", "CCPA" and "AUS"
				02: TCF.v2 Consent UUID
				03: TCF.v2 Consent string
				04: CCPA (Consent) UUID
				05: CCPA Do not sell, boolean, with the serialization: true -> "true", false -> "false"
			    06: AUS (Consent) UUID # Note that the cookie is called "ccpaUUID"
				07: AUS consentStatus

			For TCF.v2, an exmaple of array is ["01:TCF.v2", "02:<consent UUID>"", "03:<consent string>""]
			For CCPA,   an exmaple of array is ["01:CCPA", "04:<consent UUID>", "05:true"]
			For AUS,    an exmaple of array is ["01:AUS", "06:<consent UUID>", "07:consentedAll"]

			Note: it is possible to deprecate CODES, but they cannot the reused.
		*/

		const decideConsentCarrierLabels = () => {
			if (consentState.tcfv2) {
				const consentUUID = getCookie({ name: 'consentUUID' }) || '';
				const consentString = consentState.tcfv2.tcString;
				return [
					'01:TCF.v2',
					`02:${consentUUID}`,
					`03:${consentString}`,
				];
			}
			if (consentState.ccpa) {
				const ccpaUUID = getCookie({ name: 'ccpaUUID' }) || '';
				const flag = consentState.ccpa.doNotSell ? 'true' : 'false';
				return ['01:CCPA', `04:${ccpaUUID}`, `05:${flag}`];
			}
			if (consentState.aus) {
				const ccpaUUID = getCookie({ name: 'ccpaUUID' }) || '';
				const consentStatus =
					getCookie({ name: 'consentStatus' }) || '';
				return ['01:AUS', `06:${ccpaUUID}`, `07:${consentStatus}`];
			}
			return [];
		};

		const componentType: OphanComponentType = 'CONSENT';

		const action: OphanAction = 'MANAGE_CONSENT';
		const event = {
			component: {
				componentType,
				products: [],
				labels: decideConsentCarrierLabels(),
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
				.catch((e) => console.error(`GA - error: ${String(e)}`));
		} else {
			// Disable Google Analytics
			// Note. We should never be able to directly set things to the global window object
			// but in this case we want to stub things for testing, so it's ok to ignore this rule
			// @ts-expect-error
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
