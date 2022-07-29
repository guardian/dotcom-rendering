// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import {
	background,
	text,
} from '@guardian/common-rendering/src/editorialPalette';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign, ArticleDisplay, ArticleSpecial } from '@guardian/libs';
import {
	from,
	headline,
	neutral,
	remSpace,
	textSans,
} from '@guardian/source-foundations';
import type { Item } from 'item';
import { getFormat } from 'item';
import { maybeRender } from 'lib';
import type { FC } from 'react';
import { articleWidthStyles, darkModeCss, wideContentWidth } from 'styles';
import GallerySeries from './GallerySeries';
import ImmersiveSeries from './ImmersiveSeries';

// ----- Component ----- //

interface Props {
	item: Item;
}

const standardLinkStyles = (format: ArticleFormat): SerializedStyles => {
	return css`
		${headline.xxxsmall({ lineHeight: 'loose', fontWeight: 'bold' })}
		color: ${text.seriesTitle(format)};
		text-decoration: none;

		${darkModeCss`
			color: ${text.seriesTitleDark(format)};
		`}
	`;
};

const labsLinkStyles = (format: ArticleFormat): SerializedStyles => css`
	${textSans.medium({ lineHeight: 'loose', fontWeight: 'bold' })}
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
	${headline.xxxsmall({ lineHeight: 'loose', fontWeight: 'bold' })}
`;

const immersiveLabsLinkStyles = css`
	${textSans.medium({ lineHeight: 'loose', fontWeight: 'bold' })}
`;

const blogLinkStyles = (format: ArticleFormat): SerializedStyles => css`
	${headline.xxxsmall({ lineHeight: 'tight', fontWeight: 'bold' })}
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
`;

const getStyles = (format: ArticleFormat): SerializedStyles => {
	if (format.display === ArticleDisplay.Immersive) {
		return css(immersiveStyles(format));
	}

	if (
		format.design === ArticleDesign.LiveBlog ||
		format.design === ArticleDesign.DeadBlog
	) {
		return css();
	}

	return standardStyles;
};

const Series: FC<Props> = ({ item }: Props) => {
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

	return maybeRender(item.series, (series) => (
		<nav css={getStyles(item)}>
			<a css={getLinkStyles(item)} href={series.webUrl}>
				{series.webTitle}
			</a>
		</nav>
	));
};
// ----- Exports ----- //

export default Series;
