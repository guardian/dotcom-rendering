import { css } from '@emotion/react';
import type { Breakpoint } from '@guardian/source-foundations';
import { border, from } from '@guardian/source-foundations';
import type { TrailTabType, TrailType } from '../../types/trails';
import { MostPopularFooterGrid } from './MostPopularFooterGrid';
import { MostViewedFooterGrid } from './MostViewedFooterGrid';
import { MostViewedFooterSecondTierItem } from './MostViewedFooterSecondTierItem';

type Props = {
	tabs: TrailTabType[];
	selectedColour?: string;
	mostCommented?: TrailType;
	mostShared?: TrailType;
	abTestCypressDataAttr?: string;
	variantFromRunnable?: string;
	sectionName?: string;
	deeplyRead?: TrailTabType;
};

const stackBelow = (breakpoint: Breakpoint) => css`
	display: flex;
	flex-direction: column;

	${from[breakpoint]} {
		flex-direction: row;
	}
`;

const secondTierStyles = css`
	border-left: 1px solid ${border.secondary};
	border-right: 1px solid ${border.secondary};

	${from.tablet} {
		padding-top: 24px;
	}
`;

/**
 * # Most Viewed Footer
 *
 * List of 10 most viewed articles to show at the bottom of pages.
 *
 * @Todo add Storybook link
 */
export const MostViewedFooter = ({
	tabs,
	mostCommented,
	mostShared,
	abTestCypressDataAttr,
	variantFromRunnable,
	sectionName,
	selectedColour,
	deeplyRead,
}: Props) => {
	const mostViewed = tabs.length > 0 ? tabs[0] : undefined;
	const showMostPopular =
		deeplyRead &&
		mostViewed &&
		deeplyRead.trails.length > 0 &&
		mostViewed.trails.length > 0;

	return (
		<div
			css={css`
				width: 100%;
			`}
			data-cy="mostviewed-footer"
			data-cy-ab-user-in-variant={abTestCypressDataAttr}
			data-cy-ab-runnable-test={variantFromRunnable}
		>
			{showMostPopular ? (
				<MostPopularFooterGrid
					data={mostViewed}
					sectionName={sectionName}
					deeplyRead={deeplyRead}
				/>
			) : (
				<MostViewedFooterGrid
					data={tabs}
					sectionName={sectionName}
					selectedColour={selectedColour}
				/>
			)}
			{!showMostPopular && (
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
			)}
		</div>
	);
};
