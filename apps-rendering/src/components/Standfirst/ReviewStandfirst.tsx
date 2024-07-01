import { css } from '@emotion/react';
import { headlineLight20 } from '@guardian/source/foundations';
import StarRating from 'components/StarRating';
import type { Item } from 'item';
import { getFormat } from 'item';
import DefaultStandfirst, { defaultStyles } from './Standfirst.defaults';

const reviewStyles = css`
	${headlineLight20}
	p:first-of-type {
		padding-top: 0;
	}
`;

interface Props {
	item: Item;
}

const ReviewStandfirst = ({ item }: Props) => (
	<>
		<StarRating item={item} />
		<DefaultStandfirst
			item={item}
			css={css(defaultStyles(getFormat(item)), reviewStyles)}
		/>
	</>
);

export default ReviewStandfirst;
