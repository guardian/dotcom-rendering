import { css } from '@emotion/react';
import { headline, remSpace } from '@guardian/source-foundations';
import type { Item } from 'item';
import {
	DefaultHeadline,
	defaultStyles,
	fontSizeRestriction,
} from './Headline.defaults';

const commentStyles = css`
	${headline.medium({ fontWeight: 'light' })}
	padding-bottom: ${remSpace[1]};
`;

interface Props {
	item: Item;
}

const CommentHeadline: React.FC<Props> = ({ item }) => (
	<DefaultHeadline
		item={item}
		styles={css(defaultStyles(item), commentStyles, fontSizeRestriction)}
	/>
);

export default CommentHeadline;
