// ----- Imports ----- //

import { css } from '@emotion/core';
import { remSpace } from '@guardian/src-foundations';
import { news } from '@guardian/src-foundations/palette';
import { titlepiece } from '@guardian/src-foundations/typography';
import type { Item } from 'item';
import { maybeRender } from 'lib';
import type { FC } from 'react';

// ----- Component ----- //

const styles = css`
	${titlepiece.small()}
	color: ${news[400]};
	font-size: 1.0625rem;
	padding: ${remSpace[1]} 0 ${remSpace[2]};
`;

interface Props {
	item: Item;
}

const Series: FC<Props> = ({ item }) =>
	maybeRender(item.series, (series) => (
		<nav css={styles}>{series.webTitle}</nav>
	));

// ----- Exports ----- //

export default Series;
