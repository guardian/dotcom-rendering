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
	padding-right: ${remSpace[1]};
	box-sizing: border-box;

	${from.wide} {
		margin: 0 auto;
	}

	${from.phablet} {
		width: ${editionsArticleWidth}rem;
		border-right: 1px solid ${border.secondary};
	}

	p,
	ul {
		margin: 0;
	}

	address {
		font-style: normal;
	}
`;

interface Props {
	item: Item;
}

const noLinks = true;

const Standfirst: FC<Props> = ({ item }) =>
	maybeRender(item.standfirst, (standfirst) => (
		<div css={styles}>
			{renderStandfirstText(standfirst, item, noLinks)}
		</div>
	));

// ----- Exports ----- //

export default Standfirst;
