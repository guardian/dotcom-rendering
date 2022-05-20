import { css } from '@emotion/react';
import { from, headline, remSpace } from '@guardian/source-foundations';
import type { Item } from 'item';
import {
	DefaultHeadline,
	defaultStyles,
	fontSizeRestriction,
} from './Headline.defaults';

const commentStyles = css`
	${headline.small({ fontWeight: 'light' })}
	padding-bottom: ${remSpace[1]};

	${from.tablet} {
		${headline.medium({ fontWeight: 'light' })}
	}
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
