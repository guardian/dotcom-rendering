// ----- Imports ----- //

import { css } from '@emotion/core';
import { remSpace } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { border } from '@guardian/src-foundations/palette';
import { headline } from '@guardian/src-foundations/typography';
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

	${articleWidthStyles}

	${from.phablet} {
		border-right: 1px solid ${border.secondary};
	}
`;

interface Props {
	item: Item;
}

const Headline: FC<Props> = ({ item }) => <h1 css={styles}>{item.headline}</h1>;

// ----- Exports ----- //

export default Headline;
