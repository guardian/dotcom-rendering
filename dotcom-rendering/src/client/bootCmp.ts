import type { ConsentState } from '@guardian/libs';
import { cmp, getConsentDetailsForOphan, onConsent } from '@guardian/libs';
import { getCookie, log } from '@guardian/libs';
import { getLocaleCode } from '../lib/getCountryCode';
import { isUserLoggedIn } from '../lib/identity';
import type { RenderingTarget } from '../types/renderingTarget';
import { getOphan } from './ophan/ophan';
import { allowRejectAll } from './userFeatures/cookies/allowRejectAll';

const submitConsentToOphan = async (renderingTarget: RenderingTarget) => {
	const consentState: ConsentState = await onConsent();
	// Register changes in consent state with Ophan
	const ophan = await getOphan(renderingTarget);
	return ophan.record(getConsentDetailsForOphan(consentState));
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
 * as a separate chunk. @see {PrivacySettingsLink.island.tsx}
 */
const eagerlyImportPrivacySettingsLinkIsland = () =>
	import(
		/* webpackMode: 'eager' */ '../components/PrivacySettingsLink.island'
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
