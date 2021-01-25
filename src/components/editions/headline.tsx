// ----- Imports ----- //

import { css } from '@emotion/core';
import type { SerializedStyles } from '@emotion/core';
import { remSpace } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { border, neutral } from '@guardian/src-foundations/palette';
import { headline } from '@guardian/src-foundations/typography';
import type {
	FontWeight,
	LineHeight,
} from '@guardian/src-foundations/typography/types';
import type { Format } from '@guardian/types';
import { Design, Display } from '@guardian/types';
import { headlineTextColour } from 'editorialStyles';
import type { Item } from 'item';
import { getFormat } from 'item';
import type { FC } from 'react';
import { getThemeStyles } from 'themeStyles';
import { articleWidthStyles } from './styles';

// ----- Component ----- //

interface Props {
	item: Item;
}

const styles = (format: Format): SerializedStyles => css`
	${headlineTextColour(format)}
	box-sizing: border-box;
	border-top: 1px solid ${border.secondary};
	padding-bottom: ${remSpace[4]};
	margin: 0;

	${articleWidthStyles}
`;

const underline = (kickerColor: string): SerializedStyles => css`
	text-decoration: underline;
	text-decoration-thickness: from-font;
	text-decoration-color: ${kickerColor};
	padding-bottom: 0;
`;

const fontStyles = (
	lineHeight: LineHeight,
	fontWeight: FontWeight,
): SerializedStyles => css`
	${headline.xsmall({ lineHeight, fontWeight })}

	${from.mobileMedium} {
		${headline.small({ lineHeight, fontWeight })}
	}

	${from.tablet} {
		${headline.medium({ lineHeight, fontWeight })}
	}
`;

const interviewStyles = css`
	margin-left: ${remSpace[3]};
	border: 0;
`;

const interviewFontStyles = css`
	${headline.xsmall({ lineHeight: 'regular' })}
	font-weight: 400;

	${from.mobileMedium} {
		${headline.small({ lineHeight: 'regular' })}
		font-weight: 400;
	}

	${from.tablet} {
		${headline.medium({ lineHeight: 'regular' })}
		font-weight: 400;
	}

	background-color: ${neutral[0]};
	color: ${neutral[100]};
	white-space: pre-wrap;
	padding-bottom: ${remSpace[1]};
	box-shadow: -${remSpace[3]} 0 0 ${neutral[0]},
		${remSpace[3]} 0 0 ${neutral[0]};
	display: inline;
`;

const getStyles = (format: Format, kickerColor: string): SerializedStyles => {
	if (format.design === Design.Interview) {
		return css(styles(format), interviewStyles);
	}

	if (
		format.design === Design.Review ||
		format.display === Display.Showcase ||
		format.display === Display.Immersive
	)
		return css(styles(format), fontStyles('tight', 'bold'));

	if (format.design === Design.Analysis)
		return css(
			styles(format),
			fontStyles('regular', 'light'),
			underline(kickerColor),
		);

	return css(styles(format), fontStyles('tight', 'medium'));
};

const getHeadlineText = (item: Item): JSX.Element | string => {
	if (item.design === Design.Interview) {
		return <span css={interviewFontStyles}>{item.headline}</span>;
	}
	return item.headline;
};

const Headline: FC<Props> = ({ item }) => {
	const format = getFormat(item);
	const { kicker: kickerColor } = getThemeStyles(format.theme);

	return (
		<h1 css={getStyles(format, kickerColor)}>{getHeadlineText(item)}</h1>
	);
};

// ----- Exports ----- //

export default Headline;
