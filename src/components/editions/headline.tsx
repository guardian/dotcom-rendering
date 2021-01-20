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

const heavyStyles = css`
	${headline.xsmall({ lineHeight: 'tight', fontWeight: 'bold' })}

	${from.mobileMedium} {
		${headline.small({ lineHeight: 'tight', fontWeight: 'bold' })}
	}

	${from.tablet} {
		${headline.medium({ lineHeight: 'tight', fontWeight: 'bold' })}
	}
`;

const getStyles = (format: Format): SerializedStyles => {
	if (format.design === Design.Review)
		return css(styles(format), heavyStyles);
	if (format.display === Display.Showcase)
		return css(styles(format), heavyStyles);
	return styles(format);
};

const Headline: FC<Props> = ({ item }) => {
	return <h1 css={getStyles(item)}>{item.headline}</h1>;
};

// ----- Exports ----- //

export default Headline;
