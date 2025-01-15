import { Hide } from '@guardian/source/react-components';
import { palette as themePalette } from '../palette';
import { AdSlot } from './AdSlot.web';
import { Section } from './Section';

export const MobileAdSlot = ({
	renderAds,
	adSlotIndex,
}: {
	renderAds: boolean;
	adSlotIndex: number;
}) => {
	return (
		renderAds && (
			<Hide from="tablet">
				<AdSlot
					index={adSlotIndex}
					data-print-layout="hide"
					position="mobile-front"
				/>
			</Hide>
		)
	);
};

export const MerchHighAdSlot = ({
	renderAds,
	hasPageSkin,
	isPaidContent,
	collectionCount,
}: {
	renderAds: boolean;
	hasPageSkin: boolean;
	isPaidContent: boolean;
	collectionCount: number;
}) => {
	const minContainers = isPaidContent ? 1 : 2;
	const shouldInsertMerchHighSlot =
		renderAds && !hasPageSkin && collectionCount > minContainers;

	return (
		shouldInsertMerchHighSlot && (
			<Hide from="desktop">
				<AdSlot
					data-print-layout="hide"
					position="merchandising-high"
				/>
			</Hide>
		)
	);
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
