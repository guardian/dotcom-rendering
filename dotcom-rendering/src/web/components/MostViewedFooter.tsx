import { css } from '@emotion/react';
import type { Breakpoint } from '@guardian/source-foundations';
import { border, from } from '@guardian/source-foundations';
import type { Palette } from '../../types/palette';
import type { TrailTabType, TrailType } from '../../types/trails';
import { MostViewedFooterGrid } from './MostViewedFooterGrid';
import { MostViewedFooterSecondTierItem } from './MostViewedFooterSecondTierItem';

type Props = {
	tabs: TrailTabType[];
	palette: Palette;
	mostCommented?: TrailType;
	mostShared?: TrailType;
	abTestCypressDataAttr?: string;
	variantFromRunnable?: string;
	sectionName?: string;
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

export const MostViewedFooter = ({
	tabs,
	mostCommented,
	mostShared,
	abTestCypressDataAttr,
	variantFromRunnable,
	sectionName,
	palette,
}: Props) => {
	return (
		<div
			css={css`
				width: 100%;
			`}
			data-cy="mostviewed-footer"
			data-cy-ab-user-in-variant={abTestCypressDataAttr}
			data-cy-ab-runnable-test={variantFromRunnable}
		>
			<MostViewedFooterGrid
				data={tabs}
				sectionName={sectionName}
				palette={palette}
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
