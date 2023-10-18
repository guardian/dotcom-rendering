import { Hide } from '@guardian/source-react-components';
import { AdSlot } from '../../components/AdSlot.web';
import { MAX_FRONTS_BANNER_ADS } from '../../lib/commercial-constants';
import { getMerchHighPosition } from '../../lib/getAdPositions';

export const decideMerchHighAndMobileAdSlots = (
	renderAds: boolean,
	index: number,
	collectionCount: number,
	isPaidContent: boolean | undefined,
	mobileAdPositions: (number | undefined)[],
	hasPageSkin: boolean,
	showBannerAds?: boolean,
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
	isInFrontsBannerTest?: boolean,
	targetedCollections?: string[],
	collectionName?: string,
) => {
	const isFirstContainer = index === 0;
	if (!renderAds || hasPageSkin || isFirstContainer) {
		return null;
	}

	// The fronts banner 0% AB test has concluded. However, it still exists so that
	// the commercial team can opt in and test ad campaigns against the live site.
	// In this test, fronts-banner ads are inserted above specific collections and pages.
	if (isInFrontsBannerTest && collectionName) {
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
		// Insert an ad after every third collection. Warning: may skip an ad if a collection isn't rendered.
		// e.g. if the 15th collection doesn't render, an ad is shown above the 12th and the 18th
	} else if (
		showBannerAds &&
		numBannerAdsInserted.current < MAX_FRONTS_BANNER_ADS &&
		index % 3 === 0
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
