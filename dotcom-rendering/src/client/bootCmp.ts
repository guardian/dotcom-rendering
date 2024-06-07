import type { ConsentState } from '@guardian/libs';
import type {
	OphanAction,
	OphanComponentEvent,
	OphanComponentType,
} from '@guardian/libs';
import { cmp, onConsent } from '@guardian/libs';
import { getCookie, log } from '@guardian/libs';
import { getLocaleCode } from '../lib/getCountryCode';
import type { RenderingTarget } from '../types/renderingTarget';
import { submitComponentEvent } from './ophan/ophan';
import { getOphan } from './ophan/ophan';

const submitConsentEventsToOphan = (renderingTarget: RenderingTarget) =>
	onConsent().then((consentState: ConsentState) => {
		// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-unnecessary-condition -- Review if this check is needed
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

		https://github.com/guardian/transparency-consent-docs/blob/main/docs/capturing-consent-from-client-side.md#era-2-encoding-conventions
	*/

		const decideConsentCarrierLabels = () => {
			if (consentState.tcfv2) {
				const consentUUID = getCookie({ name: 'consentUUID' }) ?? '';
				const consentString = consentState.tcfv2.tcString;
				return [
					'01:TCF.v2',
					`02:${consentUUID}`,
					`03:${consentString}`,
				];
			}
			// if (consentState.ccpa) {
			// 	const ccpaUUID = getCookie({ name: 'ccpaUUID' }) ?? '';
			// 	const flag = consentState.ccpa.doNotSell ? 'true' : 'false';
			// 	return ['01:CCPA', `04:${ccpaUUID}`, `05:${flag}`];
			// }

			if (consentState.ccpa) {
				const usnatUUID = getCookie({ name: 'usnatUUID' }) ?? '';
				const flag = consentState.ccpa.doNotSell ? 'true' : 'false';
				return ['01:USNAT', `04:${usnatUUID}`, `05:${flag}`];
			}
			if (consentState.aus) {
				const ccpaUUID = getCookie({ name: 'ccpaUUID' }) ?? '';
				const consentStatus =
					getCookie({ name: 'consentStatus' }) ?? '';
				const personalisedAdvertising = consentState.aus
					.personalisedAdvertising
					? 'true'
					: 'false';
				return [
					'01:AUS',
					`06:${ccpaUUID}`,
					`07:${consentStatus}`,
					`08:${personalisedAdvertising}`,
				];
			}
			return [];
		};

		const componentType = 'CONSENT' satisfies OphanComponentType;

		const action = 'MANAGE_CONSENT' satisfies OphanAction;
		const event = {
			component: {
				componentType,
				products: [],
				labels: decideConsentCarrierLabels(),
			},
			action,
		} satisfies OphanComponentEvent;

		return submitComponentEvent(event, renderingTarget);
	});

const submitConsentToOphan = async (renderingTarget: RenderingTarget) => {
	const consentState: ConsentState = await onConsent();

	const consentDetails = (): {
		consentJurisdiction: 'TCF' | 'CCPA' | 'AUS' | 'USNAT' | 'OTHER';
		consentUUID: string;
		consent: string;
	} => {
		if (consentState.tcfv2) {
			return {
				consentJurisdiction: 'TCF',
				consentUUID: getCookie({ name: 'consentUUID' }) ?? '',
				consent: consentState.tcfv2.tcString,
			};
		}
		if (consentState.ccpa) {
			return {
				consentJurisdiction: 'USNAT',
				consentUUID: getCookie({ name: 'usnatUUID' }) ?? '',
				consent: consentState.ccpa.doNotSell ? 'false' : 'true',
			};
		}
		if (consentState.aus) {
			return {
				consentJurisdiction: 'AUS',
				consentUUID: getCookie({ name: 'ccpaUUID' }) ?? '',
				/*consent =
						getCookie({ name: 'consentStatus' }) ?? '';
						*/
				consent: consentState.aus.personalisedAdvertising
					? 'true'
					: 'false',
			};
		}
		return {
			consentJurisdiction: 'OTHER',
			consentUUID: '',
			consent: '',
		};
	};

	// Register changes in consent state with Ophan
	const ophan = await getOphan(renderingTarget);
	return ophan.record(consentDetails());
};

const initialiseCmp = async () => {
	const code = await getLocaleCode();
	const browserId = getCookie({ name: 'bwid', shouldMemoize: true });
	const { pageViewId } = window.guardian.config.ophan;

	const country = code ?? undefined;
	cmp.init({
		pubData: {
			platform: 'next-gen',
			// If `undefined`, the resulting consent signal cannot be joined to a page view.
			browserId: browserId ?? undefined,
			pageViewId,
		},
		country,
	});
	log('dotcom', 'CMP initialised');
};
/**
 * Hydrating this island is so critical that it should not be imported
 * as a separate chunk. @see {PrivacySettingsLink.importable.tsx}
 */
const eagerlyImportPrivacySettingsLinkIsland = () =>
	import(
		/* webpackMode: 'eager' */ '../components/PrivacySettingsLink.importable'
	);

/**
 * Keep this file in sync with CONSENT_TIMING in static/src/javascripts/boot.js in frontend
 * mark: CONSENT_TIMING
 */
export const bootCmp = async (
	renderingTarget: RenderingTarget,
): Promise<void> => {
	if (!window.guardian.config.switches.consentManagement) return; // CMP turned off!

	await Promise.all([
		initialiseCmp(),
		eagerlyImportPrivacySettingsLinkIsland(),
		submitConsentEventsToOphan(renderingTarget),
		submitConsentToOphan(renderingTarget),
	]);
};
