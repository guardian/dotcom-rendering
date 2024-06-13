import { css } from '@emotion/react';
import { headlineMedium17 } from '@guardian/source/foundations';
import type { Item } from 'item';
import { getFormat } from 'item';
import DefaultStandfirst, { defaultStyles } from './Standfirst.defaults';

interface Props {
	item: Item;
}

const styles = css`
	${headlineMedium17}
	p:first-child {
		padding-top: 0;
	}
`;
const AnalysisStandfirst = ({ item }: Props) => (
	<DefaultStandfirst
		item={item}
		css={css(defaultStyles(getFormat(item)), styles)}
	/>
);

export default AnalysisStandfirst;
