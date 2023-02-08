import { css } from '@emotion/react';
import { headline } from '@guardian/source-foundations';
import StarRating from 'components/StarRating';
import type { Item } from 'item';
import { getFormat } from 'item';
import DefaultStandfirst, { defaultStyles } from './Standfirst.defaults';

const reviewStyles = css`
	${headline.xxsmall({ fontWeight: 'light' })}
	p:first-of-type {
		padding-top: 0;
	}
`;

interface Props {
	item: Item;
}

const ReviewStandfirst: React.FC<Props> = ({ item }) => (
	<>
		<StarRating item={item} />
		<DefaultStandfirst
			item={item}
			css={css(defaultStyles(getFormat(item)), reviewStyles)}
		/>
	</>
);

export default ReviewStandfirst;
