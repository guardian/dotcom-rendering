// ----- Imports ----- //

import { css } from '@emotion/core';
import { remSpace } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { border, news } from '@guardian/src-foundations/palette';
import { body } from '@guardian/src-foundations/typography';
import type { Item } from 'item';
import { maybeRender } from 'lib';
import type { FC } from 'react';
import { editionsArticleWidth } from './styles';

// ----- Component ----- //

const styles = css`
	${body.medium({ fontStyle: 'normal', fontWeight: 'bold' })}
	color: ${news[400]};
	padding-bottom: ${remSpace[4]};
	margin: 0 ${remSpace[1]} 0 0;

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

const Byline: FC<Props> = ({ item }) =>
	maybeRender(item.bylineHtml, (byline) => (
		<address css={styles}>{byline.textContent}</address>
	));

// ----- Exports ----- //

export default Byline;
