import { css } from '@emotion/react';
import {
	from,
	headlineBold17,
	textSans14,
	until,
} from '@guardian/source/foundations';
import { Link } from '@guardian/source/react-components';
import { palette } from '../palette';
import type { TrailTabType, TrailType } from '../types/trails';
import { MostViewedFooterItem } from './MostViewedFooterItem';

const gridContainerStyle = css`
	display: grid;
	grid-auto-flow: column;

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
	border-left: 1px solid ${palette('--article-border')};
`;

const gridContainerStyleWithPageSkin = css`
	display: grid;
	grid-auto-flow: column;

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
	border-left: 1px solid ${palette('--article-border')};
`;

const titleContainerStyle = css`
	border-right: 1px solid ${palette('--article-border')};
	border-top: 1px solid ${palette('--article-border')};
	${from.leftCol} {
		border-top: none;
	}

	padding: 7px 10px 18px;
`;

const titleContainerStyleWithPageSkin = css`
	border-right: 1px solid;
	border-top: 1px solid;
	border-color: ${palette('--article-border')};
	padding: 7px 10px 18px;
`;

const titleStyle = css`
	${headlineBold17};
	color: ${palette('--headline-colour')};
	overflow-wrap: break-word;
`;

const descriptionStyle = css`
	${textSans14};
	line-height: 125%;
	color: ${palette('--most-viewed-description')};
	overflow-wrap: break-word;
`;

const displayContent = css`
	display: contents;
`;

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
						What readers are spending time with (
						<Link
							cssOverrides={descriptionStyle}
							href="https://www.theguardian.com/info/2024/feb/28/what-is-the-deeply-read-list"
						>
							Learn more
						</Link>
						)
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
						/>
					))}
				</ol>
			</section>
		</div>
	);
};
