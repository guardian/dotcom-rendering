import { css } from '@emotion/react';
import {
	from,
	headline,
	palette,
	textSans,
	until,
} from '@guardian/source-foundations';
import type { TrailTabType, TrailType } from '../types/trails';
import { MostViewedFooterItem } from './MostViewedFooterItem';

const gridContainerStyle = css`
	display: grid;
	grid-auto-flow: 1fr;

	/* One column view */
	grid-template-columns: 1fr;
	grid-template-rows: repeat(22, auto);

	/* Two column view */
	${from.tablet} {
		grid-template-columns: 1fr 1fr;
		grid-template-rows: repeat(11, auto);
	}

	${until.leftCol} {
		margin-top: 9px;
	}

	/* We set left border on the grid container, and then right border on
    the gridItems to prevent borders doubling up */
	border-left: 1px solid ${palette.neutral[86]};
`;

const gridContainerStyleWithPageSkin = css`
	display: grid;
	grid-auto-flow: 1fr;

	/* One column view */
	grid-template-columns: 1fr;
	grid-template-rows: repeat(22, auto);

	/* Two column view */
	${from.tablet} {
		grid-template-columns: 1fr 1fr;
		grid-template-rows: repeat(11, auto);
	}

	margin-top: 9px;

	/* We set left border on the grid container, and then right border on
    the gridItems to prevent borders doubling up */
	border-left: 1px solid ${palette.neutral[86]};
`;

const titleContainerStyle = css`
	border-right: 1px solid ${palette.neutral[86]};
	${until.leftCol} {
		/* Below leftCol always set top border */
		border-top: 1px solid ${palette.neutral[86]};
	}
	${from.leftCol} {
		border-bottom: 1px solid ${palette.neutral[86]};
	}
	padding: 7px 10px 18px;
`;

const titleContainerStyleWithPageSkin = css`
	border-right: 1px solid ${palette.neutral[86]};
	border-top: 1px solid ${palette.neutral[86]};
	padding: 7px 10px 18px;
`;

const titleStyle = css`
	${headline.xxxsmall({ fontWeight: 'bold' })};
	color: ${palette.neutral[7]};
	overflow-wrap: break-word;
`;

const descriptionStyle = css`
	${textSans.xsmall()};
	line-height: 125%;
	color: ${palette.neutral[46]};
	overflow-wrap: break-word;
`;

const displayContent = css`
	display: contents;
`;

const mostViewedOverridesStyle = (index: number) => {
	return css`
		grid-row: ${index + 2} / ${index + 3};
		grid-column: 1/2;
		border-top: ${index + 1 == 6 && `1px solid ${palette.neutral[86]}`};
	`;
};

const deeplyOverridesStyle = (index: number, mostViewedLength: number) => {
	return css`
		grid-row: ${index + 2} / ${index + 3};
		grid-column: 2/3;
		border-top: ${index + 1 == 6 && `1px solid ${palette.neutral[86]}`};

		${until.tablet} {
			grid-row: ${index + mostViewedLength + 3} /
				${index + mostViewedLength + 4};
			grid-column: 1/2;
		}
	`;
};

const ophanLinkName = (name: string) => name.toLowerCase().replace(/ /g, '-');

type Props = {
	mostViewed: TrailTabType;
	sectionName?: string;
	deeplyRead: TrailTabType;
	hasPageSkin?: boolean;
};

export const MostPopularFooterGrid = ({
	mostViewed,
	deeplyRead,
	sectionName = '',
	hasPageSkin = false,
}: Props) => {
	const shortenedMostViewed = mostViewed.trails.slice(0, 10);
	const shortenedDeeplyRead = deeplyRead.trails.slice(0, 10);

	return (
		<div
			data-component={ophanLinkName(sectionName)}
			data-link-name={ophanLinkName(sectionName)}
			css={
				hasPageSkin
					? gridContainerStyleWithPageSkin
					: gridContainerStyle
			}
		>
			<section data-link-name="most-viewed" css={displayContent}>
				<div
					css={[
						hasPageSkin
							? titleContainerStyleWithPageSkin
							: titleContainerStyle,
					]}
				>
					<h3 css={titleStyle}>Most viewed</h3>
					<div css={descriptionStyle}>
						What readers are clicking on
					</div>
				</div>
				<ol css={displayContent}>
					{shortenedMostViewed.map((trail: TrailType, j: number) => (
						<MostViewedFooterItem
							key={trail.url}
							position={j + 1}
							url={trail.url}
							format={trail.format}
							headlineText={trail.headline}
							ageWarning={trail.ageWarning}
							cssOverrides={mostViewedOverridesStyle(j)}
							hasPageSkin={hasPageSkin}
						/>
					))}
				</ol>
			</section>
			<section data-link-name="deeply-read" css={displayContent}>
				<div
					css={[
						hasPageSkin
							? titleContainerStyleWithPageSkin
							: titleContainerStyle,
					]}
				>
					<h3 css={titleStyle}>{deeplyRead.heading}</h3>
					<div css={descriptionStyle}>
						What readers are spending time with
					</div>
				</div>
				<ol css={displayContent}>
					{shortenedDeeplyRead.map((trail: TrailType, j: number) => (
						<MostViewedFooterItem
							key={trail.url}
							position={j + 1}
							url={trail.url}
							format={trail.format}
							headlineText={trail.headline}
							ageWarning={trail.ageWarning}
							cssOverrides={deeplyOverridesStyle(
								j,
								shortenedMostViewed.length,
							)}
							hasPageSkin={hasPageSkin}
						/>
					))}
				</ol>
			</section>
		</div>
	);
};
