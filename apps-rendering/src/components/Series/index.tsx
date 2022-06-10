// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { text } from '@guardian/common-rendering/src/editorialPalette';
import type { ArticleFormat, ArticleTheme } from '@guardian/libs';
import { ArticleDesign, ArticleDisplay, ArticleSpecial } from '@guardian/libs';
import {
	from,
	headline,
	labs,
	neutral,
	remSpace,
	textSans,
} from '@guardian/source-foundations';
import { getFormat, Item } from 'item';
import { maybeRender } from 'lib';
import type { FC } from 'react';
import { articleWidthStyles, darkModeCss, wideContentWidth } from 'styles';
import { getThemeStyles } from 'themeStyles';
import ImmersiveSeries from './immersiveSeries';

// ----- Component ----- //

interface Props {
	item: Item;
}

const standardLinkStyles = (theme: ArticleTheme): SerializedStyles => {
	const { kicker, inverted } = getThemeStyles(theme);

	return css`
		${headline.xxxsmall({ lineHeight: 'loose', fontWeight: 'bold' })}
		color: ${kicker};
		text-decoration: none;

		${darkModeCss`
			color: ${inverted};
		`}
	`;
};

const labsLinkStyles = (theme: ArticleTheme): SerializedStyles => css`
	${textSans.medium({ lineHeight: 'loose', fontWeight: 'bold' })}
	color: ${labs[300]};
	text-decoration: none;

	${darkModeCss`
		color: ${getThemeStyles(theme).inverted};
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

const getLinkStyles = ({
	design,
	display,
	theme,
}: ArticleFormat): SerializedStyles => {
	if (display === ArticleDisplay.Immersive && theme === ArticleSpecial.Labs) {
		return css(immersiveLinkStyles, immersiveLabsLinkStyles);
	}

	if (display === ArticleDisplay.Immersive) {
		return immersiveLinkStyles;
	}

	if (theme === ArticleSpecial.Labs) {
		return labsLinkStyles(theme);
	}

	if (
		design === ArticleDesign.LiveBlog ||
		design === ArticleDesign.DeadBlog
	) {
		return blogLinkStyles({ design, display, theme });
	}

	return standardLinkStyles(theme);
};

const immersiveStyles = (theme: ArticleTheme): SerializedStyles => css`
	padding: ${remSpace[1]} ${remSpace[3]};
	background-color: ${theme === ArticleSpecial.Labs
		? labs[300]
		: getThemeStyles(theme).kicker};
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

const getStyles = ({
	design,
	display,
	theme,
}: ArticleFormat): SerializedStyles => {
	if (display === ArticleDisplay.Immersive) {
		return css(immersiveStyles(theme));
	}

	if (
		design === ArticleDesign.LiveBlog ||
		design === ArticleDesign.DeadBlog
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
		return <ImmersiveSeries series={item.series} format={getFormat(item)} />;
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
