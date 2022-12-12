import { css } from '@emotion/react';
import { from, headline, remSpace } from '@guardian/source-foundations';
import type { Item } from 'item';
import { DefaultHeadline, defaultStyles } from './Headline.defaults';

const commentStyles = css`
	${headline.small({ fontWeight: 'light' })}
	padding-top: ${remSpace[1]};
	padding-bottom: ${remSpace[1]};

	${from.tablet} {
		${headline.medium({ fontWeight: 'light' })}
	}
`;

interface Props {
	item: Item;
}

const CommentHeadline: React.FC<Props> = ({ item }) => {
	return (
		<DefaultHeadline
			item={item}
			styles={css(defaultStyles(item), commentStyles)}
		/>
	);
};

export default CommentHeadline;
