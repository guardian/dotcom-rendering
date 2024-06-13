import { css } from '@emotion/react';
import { remSpace } from '@guardian/source/foundations';
import type { Item } from 'item';
import { getFormat } from 'item';

import DefaultStandfirst, { defaultStyles } from './Standfirst.defaults';

const styles = css`
	padding: ${remSpace[4]} 0 0;
`;

interface Props {
	item: Item;
}

const InterviewStandfirst = ({ item }: Props) => (
	<DefaultStandfirst
		item={item}
		css={css(defaultStyles(getFormat(item)), styles)}
	/>
);

export default InterviewStandfirst;
