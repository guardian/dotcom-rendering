// ----- Imports ----- //

import { css } from '@emotion/core';
import { remSpace, text } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { body } from '@guardian/src-foundations/typography';
import type { Item } from 'item';
import { maybeRender } from 'lib';
import type { FC } from 'react';
import { renderStandfirstText } from 'renderer';
import { articleWidthStyles } from './styles';

// ----- Component ----- //

const styles = css`
	${body.medium({ lineHeight: 'tight' })}
	font-size: 1.125rem;

	${from.mobileMedium} {
		font-size: 1.25rem;
	}
	
	padding-bottom: ${remSpace[6]};
	color: ${text.primary};

	${articleWidthStyles}

	p,
	ul {
		padding-top: ${remSpace[2]};
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
