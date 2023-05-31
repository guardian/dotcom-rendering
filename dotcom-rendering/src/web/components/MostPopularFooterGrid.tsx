import { css } from '@emotion/react';
import {
	border,
	from,
	headline,
	neutral,
	textSans,
} from '@guardian/source-foundations';
import type { TrailTabType, TrailType } from '../../types/trails';
import { MostViewedFooterItem } from './MostViewedFooterItem';

const gridContainer = css`
	display: grid;
	grid-auto-flow: 1fr;

	/* One column view */
	grid-template-columns: 1fr;
	grid-template-rows: auto auto auto auto auto auto auto auto auto auto;

	/* Two column view */
	${from.tablet} {
		grid-template-columns: 1fr 1fr;
		grid-template-rows: auto auto auto auto auto;
	}

	/* We set left border on the grid container, and then right border on
    the gridItems to prevent borders doubling up */
	border-left: 1px solid ${border.secondary};
`;

const titleContainer = css`
	border-right: 1px solid #dcdcdc;
	border-bottom: 1px solid #dcdcdc;
	padding: 7px 11px 18px;
`;

const title = css`
	${headline.xxxsmall({ fontWeight: 'bold' })};
	color: ${neutral[7]};
	overflow-wrap: break-word;
`;

const description = css`
	${textSans.xsmall()};
	color: ${neutral[46]};
	overflow-wrap: break-word;
`;

const displayContent = css`
	display: contents;
`;

const itemOverridesStyle = (index: number) => {
	return css`
		grid-row: ${index + 2} / ${index + 3};
		border-top: ${index + 1 == 6 && `1px solid ${border.secondary}`};
	`;
};

type Props = {
	data: TrailTabType;
	sectionName?: string;
	deeplyRead: TrailTabType;
};

export const MostPopularFooterGrid = ({
	data,
	sectionName = '',
	deeplyRead,
}: Props) => {
	return (
		<div css={gridContainer}>
			<section css={displayContent}>
				<div css={titleContainer}>
					<h3 css={title}>Most viewed</h3>
					<div css={description}>What readers are clicking on</div>
				</div>
				<ol
					data-link-name={data.heading}
					data-link-context={`most-popular/${sectionName}`}
					css={displayContent}
				>
					{data.trails.map((trail: TrailType, j: number) => (
						<MostViewedFooterItem
							key={trail.url}
							position={j + 1}
							url={trail.url}
							format={trail.format}
							headlineText={trail.headline}
							ageWarning={trail.ageWarning}
							cssOverrides={itemOverridesStyle(j)}
						/>
					))}
				</ol>
			</section>
			<section css={displayContent}>
				<div css={titleContainer}>
					<h3 css={title}>Deeply read</h3>
					<div css={description}>
						What readers are spending time with
					</div>
				</div>
				<ol
					data-link-name={deeplyRead.heading}
					data-link-context={`most-popular/${sectionName}`}
					css={displayContent}
				>
					{deeplyRead.trails.map((trail: TrailType, j: number) => (
						<MostViewedFooterItem
							key={trail.url}
							position={j + 1}
							url={trail.url}
							format={trail.format}
							headlineText={trail.headline}
							ageWarning={trail.ageWarning}
							cssOverrides={itemOverridesStyle(j)}
						/>
					))}
				</ol>
			</section>
		</div>
	);
};
