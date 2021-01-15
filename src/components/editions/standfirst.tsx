// ----- Imports ----- //

import { css } from '@emotion/core';
import { border, remSpace, text } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { body } from '@guardian/src-foundations/typography';
import type { Item } from 'item';
import { maybeRender } from 'lib';
import type { FC } from 'react';
import { renderStandfirstText } from 'renderer';
import { editionsArticleWidth } from './styles';

// ----- Component ----- //

const styles = css`
	${body.medium({ lineHeight: 'tight' })}
	padding-bottom: ${remSpace[6]};
	color: ${text.primary};

	${from.wide} {
		margin: 0 auto;
	}

	${from.phablet} {
		border-right: 1px solid ${border.secondary};
		width: ${editionsArticleWidth}rem;
	}

	p,
	ul {
		padding: ${remSpace[2]} ${remSpace[1]} 0 0;
		margin: 0;
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
