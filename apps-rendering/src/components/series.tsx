// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign, ArticleDisplay, ArticleSpecial } from '@guardian/libs';
import { palette, remSpace } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { neutral } from '@guardian/src-foundations/palette';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { map, withDefault } from '@guardian/types';
import type { Item } from 'item';
import { pipe } from 'lib';
import type { FC, ReactElement } from 'react';
import { articleWidthStyles, darkModeCss, wideContentWidth } from 'styles';
import { getThemeStyles } from 'themeStyles';
import type { ThemeStyles } from 'themeStyles';

// ----- Component ----- //

interface Props {
	item: Item;
}

const isDisplayLabs = (format: ArticleFormat): boolean =>
	format.theme === ArticleSpecial.Labs;

const isDesignBlog = (format: ArticleFormat): boolean =>
	format.design === ArticleDesign.LiveBlog ||
	format.design === ArticleDesign.DeadBlog;

const immersiveStyles = (
	{ kicker }: ThemeStyles,
	isLabs: boolean,
): SerializedStyles => css`
	padding: ${remSpace[1]} ${remSpace[3]};
	background-color: ${isLabs ? palette.labs[300] : kicker};
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

const font = (isLabs: boolean): string =>
	isLabs
		? textSans.medium({ lineHeight: 'loose', fontWeight: 'bold' })
		: headline.xxxsmall({ lineHeight: 'loose', fontWeight: 'bold' });

const getLinkColour = (
	{ liveblogKicker, kicker }: ThemeStyles,
	isLabs: boolean,
	isBlog: boolean,
): string => {
	if (isLabs) {
		return palette.labs[300];
	}
	if (isBlog) {
		return liveblogKicker;
	}
	return kicker;
};

const linkStyles = (
	themeStyles: ThemeStyles,
	isLabs: boolean,
	isBlog: boolean,
): SerializedStyles =>
	css`
		${font(isLabs)}
		color: ${getLinkColour(themeStyles, isLabs, isBlog)};
		text-decoration: none;

		${darkModeCss`
			color: ${isBlog ? themeStyles.liveblogKicker : themeStyles.inverted};
		`}
	`;

const immersiveLinkStyles = (isLabs: boolean): SerializedStyles => css`
	color: ${neutral[100]};
	text-decoration: none;
	white-space: nowrap;
	${font(isLabs)}
`;

const getLinkStyles = (format: ArticleFormat): SerializedStyles => {
	const isLabs = isDisplayLabs(format);
	const isBlog = isDesignBlog(format);

	if (format.display === ArticleDisplay.Immersive) {
		return immersiveLinkStyles(isLabs);
	}
	const themeStyles = getThemeStyles(format.theme);

	return linkStyles(themeStyles, isLabs, isBlog);
};

const getStyles = (format: ArticleFormat): SerializedStyles => {
	const isLabs = isDisplayLabs(format);

	if (format.display === ArticleDisplay.Immersive) {
		return immersiveStyles(getThemeStyles(format.theme), isLabs);
	}

	return articleWidthStyles;
};

const seriesStyles: SerializedStyles = css`
	padding-top: ${remSpace[1]};
`;

const Series: FC<Props> = ({ item }: Props) =>
	pipe(
		item.series,
		map((series) => (
			<nav css={[getStyles(item), seriesStyles]}>
				<a css={getLinkStyles(item)} href={series.webUrl}>
					{series.webTitle}
				</a>
			</nav>
		)),
		withDefault<ReactElement | null>(null),
	);

// ----- Exports ----- //

export default Series;
