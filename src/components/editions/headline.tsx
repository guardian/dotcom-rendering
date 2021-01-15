// ----- Imports ----- //

import { css } from '@emotion/core';
import { remSpace } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { border } from '@guardian/src-foundations/palette';
import { headline } from '@guardian/src-foundations/typography';
import type { Item } from 'item';
import type { FC } from 'react';
import { editionsArticleWidth } from './styles';

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

interface Props {
	item: Item;
}

const Headline: FC<Props> = ({ item }) => <h1 css={styles}>{item.headline}</h1>;

// ----- Exports ----- //

export default Headline;
