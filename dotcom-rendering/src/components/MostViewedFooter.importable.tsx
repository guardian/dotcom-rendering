import { css } from '@emotion/react';
import type { Breakpoint } from '@guardian/source-foundations';
import { from, palette as sourcePalette } from '@guardian/source-foundations';
import type { TrailTabType, TrailType } from '../types/trails';
import { MostViewedFooterGrid } from './MostViewedFooterGrid';
import { MostViewedFooterSecondTierItem } from './MostViewedFooterSecondTierItem';

type Props = {
	tabs: TrailTabType[];
	selectedColour?: string;
	mostCommented?: TrailType;
	mostShared?: TrailType;
	abTestCypressDataAttr?: string;
	variantFromRunnable?: string;
	sectionId?: string;
	hasPageSkin?: boolean;
};

const stackBelow = (breakpoint: Breakpoint) => css`
	display: flex;
	flex-direction: column;

	${from[breakpoint]} {
		flex-direction: row;
	}
`;

const secondTierStyles = css`
	border-left: 1px solid ${sourcePalette.neutral[86]};
	border-right: 1px solid ${sourcePalette.neutral[86]};

	${from.tablet} {
		padding-top: 24px;
	}
`;

/**
 * List of 10 most viewed articles to show at the bottom of pages.
 *
 * ## Why does this need to be an Island?
 *
 * Most viewed data if fetched client-side.
 *
 * ---
 *
 * (No visual story exists)
 */
export const MostViewedFooter = ({
	tabs,
	mostCommented,
	mostShared,
	abTestCypressDataAttr,
	variantFromRunnable,
	sectionId,
	selectedColour,
	hasPageSkin = false,
}: Props) => {
	return (
		<div
			css={css`
				width: 100%;
			`}
			data-testid="mostviewed-footer"
			data-testid-ab-user-in-variant={abTestCypressDataAttr}
			data-testid-ab-runnable-test={variantFromRunnable}
			data-link-name="most popular"
		>
			<MostViewedFooterGrid
				data={tabs}
				sectionId={sectionId}
				selectedColour={selectedColour}
				hasPageSkin={hasPageSkin}
			/>
			<div css={[stackBelow('tablet'), secondTierStyles]}>
				{mostCommented && (
					<MostViewedFooterSecondTierItem
						trail={mostCommented}
						title="Most commented"
						showRightBorder={true}
					/>
				)}
				{mostShared && (
					<MostViewedFooterSecondTierItem
						trail={mostShared}
						title="Most shared"
					/>
				)}
			</div>
		</div>
	);
};
