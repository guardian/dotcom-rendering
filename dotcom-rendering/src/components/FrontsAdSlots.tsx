import { Hide } from '@guardian/source/react-components';
import { getMerchHighPosition } from '../lib/getFrontsAdPositions';
import { palette as themePalette } from '../palette';
import { AdSlot } from './AdSlot.web';
import { Section } from './Section';

export const MerchHighOrMobileAdSlot = ({
	renderAds,
	index,
	collectionCount,
	isPaidContent,
	mobileAdPositions,
	hasPageSkin,
}: {
	renderAds: boolean;
	index: number;
	collectionCount: number;
	isPaidContent: boolean | undefined;
	mobileAdPositions: (number | undefined)[];
	hasPageSkin: boolean;
}) => {
	if (!renderAds) return null;

	const minContainers = isPaidContent ? 1 : 2;
	const shouldInsertMerchHighSlot =
		!hasPageSkin &&
		collectionCount > minContainers &&
		index === getMerchHighPosition(collectionCount);

	if (shouldInsertMerchHighSlot) {
		return (
			<Hide from="desktop">
				<AdSlot
					data-print-layout="hide"
					position="merchandising-high"
				/>
			</Hide>
		);
	}

	if (mobileAdPositions.includes(index)) {
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
 * Hide the merchandising slot if there is a page skin and above desktop breakpoint
 * Page skins are only active above desktop breakpoints
 *
 */
export const MerchandisingSlot = ({
	renderAds,
	hasPageSkin,
}: {
	renderAds: boolean;
	hasPageSkin: boolean;
}) => {
	return (
		renderAds && (
			<Section
				fullWidth={true}
				data-print-layout="hide"
				padSides={false}
				showTopBorder={false}
				showSideBorders={false}
				backgroundColour={themePalette('--article-section-background')}
				element="aside"
			>
				{hasPageSkin ? (
					<Hide from="desktop">
						<AdSlot
							data-print-layout="hide"
							position="merchandising"
						/>
					</Hide>
				) : (
					<AdSlot data-print-layout="hide" position="merchandising" />
				)}
			</Section>
		)
	);
};

/**
 * Renders a fronts-banner ad when in the fronts banner AB test.
 * Only applies to network fronts on desktop screens and wider.
 */
export const FrontsBannerAdSlot = ({
	renderAds,
	hasPageSkin,
	adSlotIndex,
}: {
	renderAds: boolean;
	hasPageSkin: boolean;
	adSlotIndex: number;
}) => {
	return (
		renderAds &&
		!hasPageSkin && (
			<AdSlot
				data-print-layout="hide"
				position="fronts-banner"
				index={adSlotIndex + 1}
				hasPageskin={hasPageSkin}
			/>
		)
	);
};
