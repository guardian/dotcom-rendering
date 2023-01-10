import { css } from '@emotion/react';
import { from, headline } from '@guardian/source-foundations';
import type { Item } from 'item';
import { defaultStyles } from './Headline.defaults';

const reviewStyles = css`
	${headline.small({ fontWeight: 'bold' })}

	${from.tablet} {
		${headline.medium({ fontWeight: 'bold' })}
	}
`;

interface Props {
	item: Item;
}

const ReviewHeadline: React.FC<Props> = ({ item }) => (
	<h1 css={css(defaultStyles(item), reviewStyles)}>
		<span>{item.headline}</span>
	</h1>
);

export default ReviewHeadline;
