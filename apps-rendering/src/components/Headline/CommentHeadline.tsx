import { css } from '@emotion/react';
import {
	from,
	headlineLight28,
	headlineLight34,
	remSpace,
} from '@guardian/source-foundations';
import type { Item } from 'item';
import { DefaultHeadline, defaultStyles } from './Headline.defaults';

const commentStyles = css`
	${headlineLight28}
	padding-top: ${remSpace[1]};
	padding-bottom: ${remSpace[1]};

	${from.tablet} {
		${headlineLight34}
	}
`;

interface Props {
	item: Item;
}

const CommentHeadline: React.FC<Props> = ({ item }) => (
	<DefaultHeadline
		item={item}
		styles={css(defaultStyles(item), commentStyles)}
	/>
);

export default CommentHeadline;
