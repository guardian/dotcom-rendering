import { Hide } from '@guardian/source/react-components';
import type { ReactNode } from 'react';
import { palette as themePalette } from '../palette';
import { AdSlot } from './AdSlot.web';
import { Section } from './Section';

/** The merchandising high slot is usually the second ad position on a page.
 * If there are fewer than 4 collections it is first ad position. */
const getMerchHighSlot = (collectionCount: number): number =>
	collectionCount >= 4 ? 1 : 0;

export const decideMerchHighAndMobileAdSlots = (
	renderAds: boolean,
	index: number,
	collectionCount: number,
	isPaidContent: boolean | undefined,
	mobileAdPositions: (number | undefined)[],
	hasPageSkin: boolean,
) => {
	if (!renderAds) return null;

	const minContainers = isPaidContent ? 1 : 2;
	const merchHighSlot = getMerchHighSlot(collectionCount);
	const shouldInsertMerchHighSlot =
		!hasPageSkin &&
		collectionCount > minContainers &&
		index === mobileAdPositions[merchHighSlot];

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
export const decideMerchandisingSlot = (
	renderAds: boolean,
	hasPageSkin: boolean,
) => {
	if (!renderAds) return null;
	const MerchandisingSection = ({ children }: { children: ReactNode }) => (
		<Section
			fullWidth={true}
			data-print-layout="hide"
			padSides={false}
			showTopBorder={false}
			showSideBorders={false}
			backgroundColour={themePalette('--article-section-background')}
			element="aside"
		>
			{children}
		</Section>
	);
	return hasPageSkin ? (
		<MerchandisingSection>
			<Hide from="desktop">
				<AdSlot data-print-layout="hide" position="merchandising" />
			</Hide>
		</MerchandisingSection>
	) : (
		<MerchandisingSection>
			<AdSlot data-print-layout="hide" position="merchandising" />
		</MerchandisingSection>
	);
};

/**
 * Renders a fronts-banner ad when in the fronts banner AB test.
 * Only applies to network fronts on desktop screens and wider.
 */
export const decideFrontsBannerAdSlot = (
	renderAds: boolean,
	hasPageSkin: boolean,
	index: number,
	desktopAdPositions: number[],
) => {
	if (!renderAds || hasPageSkin) {
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
