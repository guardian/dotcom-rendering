import { Hide } from '@guardian/source-react-components';
import { AdSlot } from '../../components/AdSlot.web';
import { frontsBannerAdCollections } from '../../lib/frontsBannerAbTestAdPositions';
import { frontsBannerExcludedCollections } from '../../lib/frontsBannerExclusions';
import { getMerchHighPosition } from '../../lib/getAdPositions';

/**
 * The maximum number of fronts-banner ads that can be inserted on any front.
 */
export const MAX_FRONTS_BANNER_ADS = 6;

export const decideMerchHighAndMobileAdSlots = (
	renderAds: boolean,
	index: number,
	collectionCount: number,
	isPaidContent: boolean | undefined,
	mobileAdPositions: (number | undefined)[],
	hasPageSkin: boolean,
	showBannerAds: boolean,
) => {
	if (!renderAds) return null;

	const minContainers = isPaidContent ? 1 : 2;
	const shouldInsertMerchHighSlot =
		collectionCount > minContainers &&
		index === getMerchHighPosition(collectionCount);

	if (shouldInsertMerchHighSlot) {
		return showBannerAds ? (
			<Hide from="desktop">
				<AdSlot
					data-print-layout="hide"
					position="merchandising-high"
					hasPageskin={hasPageSkin}
				/>
			</Hide>
		) : (
			<AdSlot
				data-print-layout="hide"
				position="merchandising-high"
				hasPageskin={hasPageSkin}
			/>
		);
	} else if (mobileAdPositions.includes(index)) {
		return (
			<Hide from="tablet">
				<AdSlot
					index={mobileAdPositions.indexOf(index)}
					data-print-layout="hide"
					position="mobile-front"
				/>
			</Hide>
		);
	}

	return null;
};

/**
 * Renders a fronts-banner ad when in the fronts banner AB test.
 * Only applies to network fronts on desktop screens and wider.
 */
export const decideFrontsBannerAdSlot = (
	renderAds: boolean,
	hasPageSkin: boolean,
	numBannerAdsInserted: React.MutableRefObject<number>,
	showBannerAds: boolean,
	index: number,
	pageId: string,
	collectionName: string | null,
	targetedCollections?: string[],
) => {
	const isFirstContainer = index === 0;
	if (!renderAds || hasPageSkin || isFirstContainer || !showBannerAds) {
		return null;
	}

	// If the showBannerAds feature switch is on and the page was included in the AB test, then
	// show ads above the collections as specified in that AB test. One reason is that on /uk
	// the "Ukraine invasion" collection is third and we don't want to place an ad above this
	// container, which means we don't get a banner ad until the 6th collection.
	if (
		collectionName &&
		Object.keys(frontsBannerAdCollections).includes(pageId)
	) {
		if (targetedCollections?.includes(collectionName)) {
			numBannerAdsInserted.current = numBannerAdsInserted.current + 1;

			return (
				<AdSlot
					data-print-layout="hide"
					position="fronts-banner"
					index={numBannerAdsInserted.current}
					hasPageskin={hasPageSkin}
				/>
			);
		}
	}

	// Insert an ad after every third collection. Warning: may skip an ad if a collection isn't rendered.
	// e.g. if the 15th collection doesn't render, an ad is shown above the 12th and the 18th, skipping the 15th.
	else if (
		numBannerAdsInserted.current < MAX_FRONTS_BANNER_ADS &&
		(index + 1) % 3 === 0 && // Insert ad above the 3rd, 6th, ..., container. Index starts at zero.
		!isCollectionExclusionPresent(pageId, collectionName)
	) {
		numBannerAdsInserted.current = numBannerAdsInserted.current + 1;

		return (
			<AdSlot
				data-print-layout="hide"
				position="fronts-banner"
				index={numBannerAdsInserted.current}
				hasPageskin={hasPageSkin}
			/>
		);
	}

	return null;
};

const isCollectionExclusionPresent = (
	pageId: string,
	collectionName: string | null,
): boolean => {
	// Tag Fronts collections don't have names, so no exclusions can be present.
	if (!collectionName) {
		return false;
	}

	return Boolean(
		frontsBannerExcludedCollections[pageId]?.includes(collectionName),
	);
};
