// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/core';
import { css } from '@emotion/core';
import { border, neutral, remSpace } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { titlepiece } from '@guardian/src-foundations/typography';
import { Design } from '@guardian/types';
import type { Item } from 'item';
import { getFormat } from 'item';
import { maybeRender } from 'lib';
import type { FC } from 'react';
import { getThemeStyles } from 'themeStyles';
import { kickerPicker } from './kickerPicker';
import { articleWidthStyles } from './styles';

// ----- Component ----- //

const styles = (kicker: string): SerializedStyles => css`
	box-sizing: border-box;
	${titlepiece.small()}
	color: ${kicker};
	font-size: 1.0625rem;
	padding: ${remSpace[1]} 0 ${remSpace[2]};
	border-top: 1px solid ${border.secondary};
	box-sizing: border-box;

	${articleWidthStyles}

	${from.tablet} {
		padding-bottom: ${remSpace[3]};
	}
`;
const interviewStyles = (kicker: string): SerializedStyles => css`
	position: absolute;
	left: 0;
	bottom: 0;
	border: 0;
	color: ${neutral[100]};
	background-color: ${kicker};
	padding: ${remSpace[2]} ${remSpace[3]};
	${from.tablet} {
		width: auto;
	}

	${from.wide} {
		width: auto;
	}
`;

interface Props {
	item: Item;
}

const getStyles = (item: Item): SerializedStyles => {
	const format = getFormat(item);
	const { kicker } = getThemeStyles(format.theme);
	if (item.design === Design.Interview) {
		return css(styles(kicker), interviewStyles(kicker));
	}
	return styles(kicker);
};

const Series: FC<Props> = ({ item }) =>
	maybeRender(kickerPicker(item), (kicker) => (
		<nav css={getStyles(item)}>{kicker}</nav>
	));

// ----- Exports ----- //

export default Series;
