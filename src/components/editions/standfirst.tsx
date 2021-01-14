// ----- Imports ----- //

import { css } from '@emotion/core';
import { remSpace, text } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { body } from '@guardian/src-foundations/typography';
import type { Item } from 'item';
import { maybeRender } from 'lib';
import type { FC } from 'react';
import { renderStandfirstText } from 'renderer';
import { wideContentWidth } from 'styles';

// ----- Component ----- //

const styles = css`
	${body.medium({ lineHeight: 'tight' })}
	margin-bottom: ${remSpace[6]};
	color: ${text.primary};

	${from.wide} {
		margin: 0 auto;
	}

	${from.phablet} {
		width: ${wideContentWidth}px;
	}

	p,
	ul {
		margin: ${remSpace[2]} 0;
	}

	address {
		font-style: normal;
	}
`;

interface Props {
	item: Item;
}

const Standfirst: FC<Props> = ({ item }) =>
	maybeRender(item.standfirst, (standfirst) => (
		<div css={styles}>{renderStandfirstText(standfirst, item)}</div>
	));

// ----- Exports ----- //

export default Standfirst;
