// ----- Imports ----- //

import { css } from '@emotion/core';
import { remSpace } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { border } from '@guardian/src-foundations/palette';
import { headline } from '@guardian/src-foundations/typography';
import { Item } from 'item';
import type { FC } from 'react';
import { editionsArticleWidth } from './styles';
import type { SerializedStyles } from '@emotion/core';
import { Design, Format } from '@guardian/types';

// ----- Component ----- //

const styles = css`
	border-top: 1px solid ${border.secondary};
	${headline.small({ fontWeight: 'medium' })}
	margin: 0;
	padding-bottom: ${remSpace[4]};

	${from.wide} {
		margin: 0 auto;
	}

	${from.phablet} {
		border-right: 1px solid ${border.secondary};
		width: ${editionsArticleWidth}rem;
	}
`;

const reviewStyles = css`
	${headline.large({ fontWeight: 'bold' })}

`
const getStyles = ({ design }: Format): SerializedStyles => {
	if (design === Design.Review) return css(styles, reviewStyles);
	return styles;
};

interface Props {
	item: Item;
	format: Format;
}

const Headline: FC<Props> = ({ item, format }) => <h1 css={getStyles(format)}>{item.headline}</h1>;;

// ----- Exports ----- //

export default Headline;
