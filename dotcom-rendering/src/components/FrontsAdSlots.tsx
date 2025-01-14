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
	return renderAds ? (
		<Hide from="tablet">
			<AdSlot
				index={adSlotIndex}
				data-print-layout="hide"
				position="mobile-front"
			/>
		</Hide>
	) : null;
};

export const MerchandisingHighAdSlot = ({
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

	return shouldInsertMerchHighSlot ? (
		<Hide from="desktop">
			<AdSlot data-print-layout="hide" position="merchandising-high" />
		</Hide>
	) : null;
};

/**
 * Renders a merchandising slot. Hides above desktop breakpoint if there is a page skin.
 * Page skins are only active above desktop breakpoints.
 */
export const MerchandisingAdSlot = ({
	renderAds,
	hasPageSkin,
}: {
	renderAds: boolean;
	hasPageSkin: boolean;
}) => {
	return renderAds ? (
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
					<AdSlot data-print-layout="hide" position="merchandising" />
				</Hide>
			) : (
				<AdSlot data-print-layout="hide" position="merchandising" />
			)}
		</Section>
	) : null;
};

/**
 * Renders a fronts-banner ad on desktop screens and wider.
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
	if (!renderAds || hasPageSkin) {
		return null;
	}

	return (
		<AdSlot
			data-print-layout="hide"
			position="fronts-banner"
			index={adSlotIndex + 1}
			hasPageskin={hasPageSkin}
		/>
	);
};
