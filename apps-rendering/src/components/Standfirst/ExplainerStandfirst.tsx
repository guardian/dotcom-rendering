import { css } from '@emotion/react';
import { headlineLight17 } from '@guardian/source/foundations';
import type { Item } from 'item';
import { getFormat } from 'item';
import DefaultStandfirst, { defaultStyles } from './Standfirst.defaults';

const styles = css`
	${headlineLight17}
`;

interface Props {
	item: Item;
}

const ExplainerStandfirst = ({ item }: Props) => (
	<DefaultStandfirst
		item={item}
		css={css(defaultStyles(getFormat(item)), styles)}
	/>
);

export default ExplainerStandfirst;
