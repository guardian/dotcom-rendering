// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign, ArticleDisplay, ArticleSpecial } from '@guardian/libs';
import {
	from,
	headlineBold17,
	neutral,
	remSpace,
	textSansBold17,
} from '@guardian/source/foundations';
import type { Item } from 'item';
import { getFormat } from 'item';
import { maybeRender } from 'lib';
import { background, text } from 'palette';

import { articleWidthStyles, darkModeCss, wideContentWidth } from 'styles';
import GallerySeries from './GallerySeries';
import ImmersiveSeries from './ImmersiveSeries';

// ----- Component ----- //

interface Props {
	item: Item;
}

const standardLinkStyles = (format: ArticleFormat): SerializedStyles => {
	return css`
		${headlineBold17};
		/**
		 * Typography preset styles should not be overridden.
		 * This has been done because the styles do not directly map to the new presets.
		 * Please speak to your team's designer and update this to use a more appropriate preset.
		 */
		line-height: 1.4;
		color: ${text.seriesTitle(format)};
		text-decoration: none;

		${darkModeCss`
			color: ${text.seriesTitleDark(format)};
		`}
	`;
};

const labsLinkStyles = (format: ArticleFormat): SerializedStyles => css`
	${textSansBold17};
	/**
	 * Typography preset styles should not be overridden.
	 * This has been done because the styles do not directly map to the new presets.
	 * Please speak to your team's designer and update this to use a more appropriate preset.
	 */
	line-height: 1.4;
	color: ${text.seriesTitle(format)};
	text-decoration: none;

	${darkModeCss`
		color: ${text.seriesTitleDark(format)};
	`}
`;

const immersiveLinkStyles = css`
	color: ${neutral[100]};
	text-decoration: none;
	white-space: nowrap;
	${headlineBold17};
	/**
	 * Typography preset styles should not be overridden.
	 * This has been done because the styles do not directly map to the new presets.
	 * Please speak to your team's designer and update this to use a more appropriate preset.
	 */
	line-height: 1.4;
`;

const immersiveLabsLinkStyles = css`
	${textSansBold17};
	/**
	 * Typography preset styles should not be overridden.
	 * This has been done because the styles do not directly map to the new presets.
	 * Please speak to your team's designer and update this to use a more appropriate preset.
	 */
	line-height: 1.4;
`;

const blogLinkStyles = (format: ArticleFormat): SerializedStyles => css`
	${headlineBold17};
	color: ${text.seriesTitle(format)};
	text-decoration: none;

	${darkModeCss`
		color: ${text.seriesTitleDark(format)};
	`}
`;

const getLinkStyles = (format: ArticleFormat): SerializedStyles => {
	if (
		format.display === ArticleDisplay.Immersive &&
		format.theme === ArticleSpecial.Labs
	) {
		return css(immersiveLinkStyles, immersiveLabsLinkStyles);
	}

	if (format.display === ArticleDisplay.Immersive) {
		return immersiveLinkStyles;
	}

	if (format.theme === ArticleSpecial.Labs) {
		return labsLinkStyles(format);
	}

	if (
		format.design === ArticleDesign.LiveBlog ||
		format.design === ArticleDesign.DeadBlog
	) {
		return blogLinkStyles(format);
	}

	return standardLinkStyles(format);
};

const immersiveStyles = (format: ArticleFormat): SerializedStyles => css`
	padding: ${remSpace[1]} ${remSpace[3]};
	background-color: ${background.series(format)};
	position: absolute;
	left: 0;
	transform: translateY(-100%);
	margin-top: calc(80vh - 5rem);
	display: inline-block;

	${from.desktop} {
		margin-top: calc(80vh - 7rem);
	}

	${from.wide} {
		margin-left: calc(
			((100% - ${wideContentWidth}px) / 2) - ${remSpace[3]}
		);
	}
`;

const standardStyles: SerializedStyles = css`
	${articleWidthStyles}
	padding-top: ${remSpace[1]};
	padding-bottom: ${remSpace[2]};
`;

const getStyles = (format: ArticleFormat): SerializedStyles => {
	if (format.display === ArticleDisplay.Immersive) {
		return css(immersiveStyles(format));
	}

	if (
		format.design === ArticleDesign.LiveBlog ||
		format.design === ArticleDesign.DeadBlog
	) {
		return css`
			${from.desktop} {
				margin-top: ${remSpace[1]};
			}
		`;
	}

	return standardStyles;
};

const Series = ({ item }: Props) => {
	// There are some inconsistencies between kickers in AR and DCR.
	// Until a decision is made, we are not rendering this component in the Interview Design.
	// See issue here: https://github.com/guardian/dotcom-rendering/issues/4760
	if (item.design === ArticleDesign.Interview) {
		return null;
	}

	if (item.display === ArticleDisplay.Immersive) {
		return (
			<ImmersiveSeries series={item.series} format={getFormat(item)} />
		);
	}

	if (item.design === ArticleDesign.Gallery) {
		return <GallerySeries series={item.series} format={getFormat(item)} />;
	}

	return maybeRender(item.series.toOption(), (series) => (
		<nav css={getStyles(item)}>
			<a css={getLinkStyles(item)} href={series.webUrl}>
				{series.webTitle}
			</a>
		</nav>
	));
};
// ----- Exports ----- //

export default Series;
