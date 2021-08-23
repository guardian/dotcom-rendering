// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { palette, remSpace } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { neutral } from '@guardian/src-foundations/palette';
import { headline, textSans } from '@guardian/src-foundations/typography';
import type { Format } from '@guardian/types';
import { Display, map, Special, withDefault } from '@guardian/types';
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

const linkStyles = (
	{ kicker, inverted }: ThemeStyles,
	isLabs: boolean,
): SerializedStyles => css`
	${font(isLabs)}
	color: ${isLabs ? palette.labs[300] : kicker};
	text-decoration: none;

	${darkModeCss`
        color: ${inverted};
    `}
`;

const immersiveLinkStyles = (isLabs: boolean): SerializedStyles => css`
	color: ${neutral[100]};
	text-decoration: none;
	white-space: nowrap;
	${font(isLabs)}
`;

const getLinkStyles = ({
	display,
	theme,
	design,
}: Format): SerializedStyles => {
	const isLabs = theme === Special.Labs;

	if (display === Display.Immersive) {
		return immersiveLinkStyles(isLabs);
	}

	return linkStyles(getThemeStyles(theme), isLabs);
};

const getStyles = ({ display, theme, design }: Format): SerializedStyles => {
	if (display === Display.Immersive) {
		const isLabs = theme === Special.Labs;
		return immersiveStyles(getThemeStyles(theme), isLabs);
	}

	return articleWidthStyles;
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
