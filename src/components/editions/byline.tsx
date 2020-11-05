// ----- Imports ----- //

import { css } from '@emotion/core';
import { news } from '@guardian/src-foundations/palette';
import { body } from '@guardian/src-foundations/typography';
import type { Item } from 'item';
import { maybeRender } from 'lib';
import React from 'react';
import type { FC } from 'react';

// ----- Component ----- //

const styles = css`
	${body.medium({ fontStyle: 'normal', fontWeight: 'bold' })}
	color: ${news[400]};
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
