import { Hide } from '@guardian/source-react-components';
import { AdSlot } from '../../components/AdSlot.web';
import { getMerchHighPosition } from '../../lib/getAdPositions';

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
	showBannerAds: boolean,
	index: number,
	desktopAdPositions: number[],
) => {
	if (!renderAds || hasPageSkin || !showBannerAds) {
		return null;
	}

	if (desktopAdPositions.includes(index)) {
		const adIndex = desktopAdPositions.findIndex((_) => _ === index);
		if (adIndex === -1) return null;

		return (
			<AdSlot
				data-print-layout="hide"
				position="fronts-banner"
				index={adIndex + 1}
				hasPageskin={hasPageSkin}
			/>
		);
	}

	return null;
};
