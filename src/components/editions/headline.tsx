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
import { editionsArticleWidth } from './styles';

// ----- Component ----- //

const styles = css`
	border-top: 1px solid ${border.secondary};
	${headline.small({ fontWeight: 'medium' })}
	margin: 0;
	padding-bottom: ${remSpace[4]};
	padding-right: ${remSpace[1]};
	box-sizing: border-box;

	${from.wide} {
		margin: 0 auto;
	}

	${from.phablet} {
		border-right: 1px solid ${border.secondary};
		width: ${editionsArticleWidth}rem;
	}
`;

const reviewStyles = css`
	${headline.small({ fontWeight: 'bold' })}

	${from.tablet} {
		${headline.large({ fontWeight: 'bold' })}
	}
`;
const getStyles = ({ design, display }: Format): SerializedStyles => {
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
