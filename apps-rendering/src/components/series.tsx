// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { ArticleFormat, ArticleTheme } from '@guardian/libs';
import { ArticleDesign, ArticleDisplay, ArticleSpecial } from '@guardian/libs';
import { remSpace } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { labs, neutral } from '@guardian/src-foundations/palette';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { map, withDefault } from '@guardian/types';
import type { Item } from 'item';
import { pipe } from 'lib';
import type { FC, ReactElement } from 'react';
import { articleWidthStyles, darkModeCss, wideContentWidth } from 'styles';
import { getThemeStyles } from 'themeStyles';

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

const liveLinkStyles = (theme: ArticleTheme): SerializedStyles => css`
	${headline.xxxsmall({ lineHeight: 'tight', fontWeight: 'bold' })}
	color: ${getThemeStyles(theme).liveblogKicker};
	text-decoration: none;
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
		return liveLinkStyles(theme);
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

const Series: FC<Props> = ({ item }: Props) =>
	pipe(
		item.series,
		map((series) => (
			<nav css={getStyles(item)}>
				<a css={getLinkStyles(item)} href={series.webUrl}>
					{series.webTitle}
				</a>
			</nav>
		)),
		withDefault<ReactElement | null>(null),
	);

// ----- Exports ----- //

export default Series;
