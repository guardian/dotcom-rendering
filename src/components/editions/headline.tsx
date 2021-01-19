// ----- Imports ----- //

import { css } from '@emotion/core';
import type { SerializedStyles } from '@emotion/core';
import { remSpace } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { border } from '@guardian/src-foundations/palette';
import { headline } from '@guardian/src-foundations/typography';
import type { Format } from '@guardian/types';
import { Design } from '@guardian/types';
import type { Item } from 'item';
import type { FC } from 'react';
import { articleWidthStyles } from './styles';

// ----- Component ----- //

const styles = css`
	box-sizing: border-box;
	border-top: 1px solid ${border.secondary};
	${headline.small({ fontWeight: 'medium' })}
	margin: 0;
	padding-bottom: ${remSpace[4]};
	padding-right: ${remSpace[1]};
	box-sizing: border-box;

	${articleWidthStyles}

	${from.phablet} {
		border-right: 1px solid ${border.secondary};
	}
`;

const reviewStyles = css`
	${headline.xsmall({ lineHeight: 'tight', fontWeight: 'bold' })}
	
	${from.mobileMedium} {
		${headline.small({ lineHeight: 'tight', fontWeight: 'bold' })}
	}
	
	${from.tablet} {
		${headline.medium({ lineHeight: 'tight', fontWeight: 'bold' })}
	}
`;

const getStyles = ({ design }: Format): SerializedStyles => {
	if (design === Design.Review) return css(styles, reviewStyles);
	return styles;
};

interface Props {
	item: Item;
}

const Headline: FC<Props> = ({ item }) => {
	return <h1 css={getStyles(item)}>{item.headline}</h1>;
};

// ----- Exports ----- //

export default Headline;
