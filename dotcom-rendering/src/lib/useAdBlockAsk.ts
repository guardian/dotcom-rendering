import { EventTimer } from '@guardian/commercial';
import { getConsentFor, onConsentChange } from '@guardian/libs';
import { useEffect, useState } from 'react';
import { adFreeDataIsPresent } from '../client/userFeatures/cookies/adFree';
import { useAB } from './useAB';
import { useIsSignedIn } from './useAuthStatus';
import { useDetectAdBlock } from './useDetectAdBlock';

const useIsInAdBlockAskVariant = (): boolean => {
	const abTestAPI = useAB()?.api;
	const isInVariant = !!abTestAPI?.isUserInVariant('AdBlockAsk', 'variant');
	return isInVariant;
};

export const useAdblockAsk = ({
	slotId,
	shouldHideReaderRevenue,
	isPaidContent,
}: {
	slotId: `dfp-ad--${string}`;
	shouldHideReaderRevenue: boolean;
	isPaidContent: boolean;
}): boolean => {
	const isSignedInOrPending: boolean | 'Pending' = useIsSignedIn();
	const isInVariant = useIsInAdBlockAskVariant();
	const adBlockerDetected = useDetectAdBlock();
	const [isAdFree, setIsAdFree] = useState<boolean>(false);
	const [hasConsentForGoogletag, setHasConsentForGoogletag] = useState(false);

	const canDisplayAdBlockAsk =
		!shouldHideReaderRevenue &&
		!isPaidContent &&
		!isAdFree &&
		hasConsentForGoogletag;

	useEffect(() => {
		onConsentChange((consentState) => {
			if (consentState.tcfv2) {
				return setHasConsentForGoogletag(
					getConsentFor('googletag', consentState),
				);
			}
			setHasConsentForGoogletag(true);
		});
	}, []);

	useEffect(() => {
		// If the user's signed in status is pending, assume they are signed in for the purposes of ad-free
		setIsAdFree(
			adFreeDataIsPresent(
				isSignedInOrPending === 'Pending' ? true : isSignedInOrPending,
			),
		);
	}, [isSignedInOrPending]);

	useEffect(() => {
		// Only perform the detection check in the variant of the AB test, if we haven't already detected an ad-blocker and the reader/content is eligible for displaying such a message
		if (isInVariant) {
			EventTimer.get().setProperty('didDisplayAdBlockAsk', false);

			if (adBlockerDetected && canDisplayAdBlockAsk) {
				// Some ad-blockers will remove slots from the DOM, while others don't
				// This clean-up ensures that any space we've reserved for an ad is removed,
				// in order to properly layout the ask.
				document
					.getElementById(slotId)
					?.closest('.ad-slot-container')
					?.remove();
				EventTimer.get().setProperty('didDisplayAdBlockAsk', true);
			}
		}
	}, [isInVariant, adBlockerDetected, slotId, canDisplayAdBlockAsk]);

	return adBlockerDetected && canDisplayAdBlockAsk && isInVariant;
};
