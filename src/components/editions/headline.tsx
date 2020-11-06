// ----- Imports ----- //

import { css } from '@emotion/core';
import { border } from '@guardian/src-foundations/palette';
import { headline } from '@guardian/src-foundations/typography';
import type { Item } from 'item';
import React from 'react';
import type { FC } from 'react';

// ----- Component ----- //

const styles = css`
	border-top: 1px solid ${border.secondary};
	${headline.small({ fontWeight: 'medium' })}
	margin: 0;
`;

interface Props {
	item: Item;
}

const Headline: FC<Props> = ({ item }) => <h1 css={styles}>{item.headline}</h1>;

// ----- Exports ----- //

export default Headline;
