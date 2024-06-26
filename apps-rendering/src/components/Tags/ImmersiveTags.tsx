// ----- Imports ----- //

import { css } from '@emotion/react';
import { from } from '@guardian/source/foundations';
import { grid } from 'grid/grid';
import type { Item } from 'item';
import { getFormat } from 'item';
import { defaultStyles, DefaultTags } from './Tags.defaults';

// ----- Component ----- //

const styles = css`
	${grid.column.centre}

	${from.leftCol} {
		grid-row: 6;
	}
`;

type Props = {
	item: Item;
};

const ImmersiveTags = ({ item }: Props) => (
	<section css={styles}>
		<DefaultTags item={item} css={defaultStyles(getFormat(item))} />
	</section>
);

// ----- Exports ----- //

export default ImmersiveTags;
