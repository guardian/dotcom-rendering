import { css } from '@emotion/react';
import { ArticleDesign } from '@guardian/libs';
import type { Breakpoint } from '@guardian/source-foundations';
import { border, from, headline, text } from '@guardian/source-foundations';
import { decidePalette } from '../lib/decidePalette';
import { AdSlot, labelStyles } from './AdSlot';
import { Hide } from './Hide';
import { LeftColumn } from './LeftColumn';
import { MostPopularContainerGrid } from './MostPopularContainerGrid';

const stackBelow = (breakpoint: Breakpoint) => css`
	display: flex;
	flex-direction: column;

	${from[breakpoint]} {
		flex-direction: row;
	}
`;

const headingStyles = css`
	${headline.xsmall()};
	color: ${text.primary};
	font-weight: 900;
	padding-right: 5px;
	padding-bottom: 14px;
	padding-top: 3px;

	${from.leftCol} {
		${headline.xsmall()};
		font-weight: 900;
	}

	${from.wide} {
		font-weight: 900;
	}
`;

const adSlotUnspecifiedWidth = css`
	.ad-slot {
		margin: 12px auto;
		min-width: 300px;
		min-height: 274px;
		text-align: center;
	}
`;

const mostPopularAdStyle = css`
	.ad-slot--mostpop {
		width: 300px;
		margin: 12px auto;
		min-width: 300px;
		min-height: 274px;
		text-align: center;
		${from.desktop} {
			margin: 0;
			width: auto;
		}
	}
	${labelStyles};
`;

interface Props {
	sectionName?: string;
	format: ArticleFormat;
	data: TrailTabType[];
}

const secondTierStyles = css`
	border-left: 1px solid ${border.secondary};
	border-right: 1px solid ${border.secondary};

	${from.tablet} {
		padding-top: 24px;
	}
`;

export const MostPopularContainerLayout = ({
	data,
	sectionName,
	format,
}: Props) => {
	const palette = decidePalette(format);

	return (
		<div
			data-print-layout="hide"
			className="content-footer"
			css={adSlotUnspecifiedWidth}
		>
			<div
				css={[stackBelow('leftCol'), mostPopularAdStyle]}
				data-link-name="most-popular"
				data-component="most-popular"
			>
				<LeftColumn
					size={
						format.design === ArticleDesign.LiveBlog ||
						format.design === ArticleDesign.DeadBlog
							? 'wide'
							: 'compact'
					}
				>
					<h2 css={headingStyles}>Most popular</h2>
				</LeftColumn>
				{/* We need to respect the side ad slot above desktop. The
					result is that we need to do some mutation here to make
					sure components are stacked at the correct breakpoints.
				*/}
				<section css={stackBelow('desktop')}>
					<div css={stackBelow('leftCol')}>
						<Hide when="above" breakpoint="leftCol">
							<h2 css={headingStyles}>Most popular</h2>
						</Hide>

						<div
							css={css`
								width: 100%;
							`}
							data-cy="mostviewed-footer"
						>
							<MostPopularContainerGrid
								data={data.slice(0, 10)}
								sectionName={sectionName}
								palette={palette}
							/>
							<div css={[stackBelow('tablet'), secondTierStyles]}>
								{/* {'mostCommented' in data && (
									<MostViewedFooterSecondTierItem
										trail={decideTrail(data.mostCommented)}
										title="Most commented"
										showRightBorder={true}
									/>
								)}
								{'mostShared' in data && (
									<MostViewedFooterSecondTierItem
										trail={decideTrail(data.mostShared)}
										title="Most shared"
									/>
								)} */}
							</div>
						</div>
					</div>
					<div
						css={css`
							margin: 6px 0 0 10px;
						`}
					>
						<AdSlot position="mostpop" display={format.display} />
					</div>
				</section>
			</div>
		</div>
	);
};
