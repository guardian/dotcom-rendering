import { css } from '@emotion/react';
import { headline } from '@guardian/source-foundations';
import type { Item } from 'item';
import { getFormat } from 'item';
import DefaultStandfirst, { defaultStyles } from './Standfirst.defaults';

const reviewStyles = css`
	${headline.xxsmall({ fontWeight: 'light' })}
`;

interface Props {
	item: Item;
}

const ReviewStandfirst: React.FC<Props> = ({ item }) => (
	<DefaultStandfirst
		item={item}
		css={css(defaultStyles(getFormat(item)), reviewStyles)}
	/>
);

export default ReviewStandfirst;
