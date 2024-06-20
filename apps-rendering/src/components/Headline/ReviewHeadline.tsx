import { css } from '@emotion/react';
import {
	from,
	headlineBold28,
	headlineBold34,
} from '@guardian/source/foundations';
import type { Item } from 'item';
import { defaultStyles } from './Headline.defaults';

const reviewStyles = css`
	${headlineBold28}

	${from.tablet} {
		${headlineBold34}
	}
`;

interface Props {
	item: Item;
}

const ReviewHeadline = ({ item }: Props) => (
	<h1 css={css(defaultStyles(item), reviewStyles)}>
		<span>{item.headline}</span>
	</h1>
);

export default ReviewHeadline;
