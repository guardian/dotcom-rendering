import type { ConsentState } from '@guardian/libs';
import { cmp, onConsent } from '@guardian/libs';
import { getCookie, log } from '@guardian/libs';
import { getLocaleCode } from '../lib/getCountryCode';
import { isUserLoggedIn } from '../lib/identity';
import type { RenderingTarget } from '../types/renderingTarget';
import { getOphan } from './ophan/ophan';
import { allowRejectAll } from './userFeatures/cookies/allowRejectAll';

const submitConsentToOphan = async (renderingTarget: RenderingTarget) => {
	const consentState: ConsentState = await onConsent();

	const consentDetails = (): {
		consentJurisdiction: 'TCF' | 'USNAT' | 'AUS' | 'OTHER';
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
			// Users who interacted with the CCPA banner before the migration to usnat will still have a ccpaUUID cookie. The usnatUUID cookie is set when the USNAT banner is interacted with. We need to check both cookies to ensure we have the correct consentUUID.
			const consentUUID =
				getCookie({ name: 'usnatUUID' }) ??
				getCookie({ name: 'ccpaUUID' });
			return {
				consentJurisdiction: 'USNAT',
				consentUUID: consentUUID ?? '',
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
	const isUserSignedIn = await isUserLoggedIn();
	// If user has the "reject all" benefit then show the reduced, "non-advertised" list
	const useNonAdvertisedList = allowRejectAll(isUserSignedIn);

	const country = code ?? undefined;
	cmp.init({
		pubData: {
			platform: 'next-gen',
			// If `undefined`, the resulting consent signal cannot be joined to a page view.
			browserId: browserId ?? undefined,
			pageViewId,
		},
		country,
		useNonAdvertisedList,
		isUserSignedIn,
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
