// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { neutral, remSpace } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { headline } from '@guardian/src-foundations/typography';
import { Design, Display } from '@guardian/types';
import type { Item } from 'item';
import { getFormat } from 'item';
import { maybeRender } from 'lib';
import type { FC } from 'react';
import { getThemeStyles } from 'themeStyles';
import { kickerPicker } from '../kickerPicker';
import { articleMarginStyles } from '../styles';

// ----- Component ----- //

const styles = (kicker: string): SerializedStyles => css`
	box-sizing: border-box;
	${headline.xxxsmall({ fontWeight: 'bold' })}
	color: ${kicker};
	padding: ${remSpace[1]} 0 ${remSpace[3]};
	box-sizing: border-box;

	${from.tablet} {
		padding-bottom: ${remSpace[3]};
	}
`;

const interviewStyles = css`
	bottom: 0;
`;

const immersiveStyles = css`
	bottom: 52px;

	${from.tablet} {
		bottom: 74px;
	}
`;

const sharedFullwidthStyles = (kicker: string): SerializedStyles => css`
	position: absolute;
	left: 0;
	border: 0;
	color: ${neutral[100]};
	background-color: ${kicker};
	padding: ${remSpace[3]} ${remSpace[3]};
	${articleMarginStyles}
	z-index: 2;
`;

interface Props {
	item: Item;
}

const getStyles = (item: Item): SerializedStyles => {
	const format = getFormat(item);
	const { kicker } = getThemeStyles(format.theme);

	if (item.design === Design.Interview) {
		return css(
			styles(kicker),
			sharedFullwidthStyles(kicker),
			interviewStyles,
		);
	}
	if (item.display === Display.Immersive) {
		return css(
			styles(kicker),
			sharedFullwidthStyles(kicker),
			immersiveStyles,
		);
	}
	return styles(kicker);
};

const Series: FC<Props> = ({ item }) =>
	maybeRender(kickerPicker(item), (kicker) => (
		<nav css={getStyles(item)}>{kicker}</nav>
	));

// ----- Exports ----- //

export default Series;
