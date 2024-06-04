import { css } from '@emotion/react';
import { headlineLight17 } from '@guardian/source/foundations';
import type { Item } from 'item';
import { getFormat } from 'item';
import type { FC } from 'react';
import DefaultStandfirst, { defaultStyles } from './Standfirst.defaults';

const styles = css`
	${headlineLight17}
`;

interface Props {
	item: Item;
}

const ExplainerStandfirst: FC<Props> = ({ item }) => (
	<DefaultStandfirst
		item={item}
		css={css(defaultStyles(getFormat(item)), styles)}
	/>
);

export default ExplainerStandfirst;
