// ----- Imports ----- //

import { css } from '@emotion/core';
import type { SerializedStyles } from '@emotion/core';
import { remSpace } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { border } from '@guardian/src-foundations/palette';
import { headline } from '@guardian/src-foundations/typography';
import type { Format } from '@guardian/types';
import { Design, Display } from '@guardian/types';
import { headlineTextColour } from 'editorialStyles';
import type { Item } from 'item';
import type { FC } from 'react';
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

const heavyFontStyles = css`
	${headline.xsmall({ lineHeight: 'tight', fontWeight: 'bold' })}

	${from.mobileMedium} {
		${headline.small({ lineHeight: 'tight', fontWeight: 'bold' })}
	}

	${from.tablet} {
		${headline.medium({ lineHeight: 'tight', fontWeight: 'bold' })}
	}
`;

const standardFontStyles = css`
	${headline.xsmall({ lineHeight: 'tight' })}

	${from.mobileMedium} {
		${headline.small({ lineHeight: 'tight' })}
	}

	${from.tablet} {
		${headline.medium({ lineHeight: 'tight' })}
	}
`;
const interviewStyles = css`
	margin-left: 0.75rem;
	border: 0;
`;

const interviewFontStyles = css`
${articleWidthStyles}

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
	background-color: #000000;
	color: white;
	white-space: pre-wrap;
	padding-bottom: 0.3125rem;
	box-shadow: -0.75rem 0 0 black, 0.75rem 0 0 black;
	display: inline;
`;

const getStyles = (format: Format): SerializedStyles => {
	if (format.design === Design.Interview) {
		return css(styles(format), interviewStyles);
	}
	if (
		format.design === Design.Review ||
		format.display === Display.Showcase ||
		format.display === Display.Immersive ||
		format.design === Design.PhotoEssay
	)
		return css(styles(format), heavyFontStyles);

	return css(styles(format), standardFontStyles);
};

const Headline: FC<Props> = ({ item }) => {
	return (
		<h1 css={getStyles(item)}>
			<span css={interviewFontStyles}>{item.headline}</span>
		</h1>
	);
};

// ----- Exports ----- //

export default Headline;
