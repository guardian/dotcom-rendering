import type { ConsentState } from '@guardian/libs';
import { cmp, onConsent } from '@guardian/libs';
import { getCookie, log } from '@guardian/libs';
import { getLocaleCode } from '../lib/getCountryCode';
import type { RenderingTarget } from '../types/renderingTarget';
import { getOphan } from './ophan/ophan';

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
		if (consentState.usnat) {
			return {
				consentJurisdiction: 'USNAT',
				consentUUID: getCookie({ name: 'usnatUUID' }) ?? '',
				consent: consentState.usnat.doNotSell ? 'false' : 'true',
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
		submitConsentToOphan(renderingTarget),
	]);
};
