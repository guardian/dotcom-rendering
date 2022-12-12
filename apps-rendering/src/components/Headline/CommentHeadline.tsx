import { css } from '@emotion/react';
import { from, headline, remSpace } from '@guardian/source-foundations';
import DesignTag from 'components/DesignTag';
import type { Item } from 'item';
import { getFormat } from 'item';
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
	const format = getFormat(item);
	return (
		<>
			<DesignTag format={format} />
			<DefaultHeadline
				item={item}
				styles={css(defaultStyles(item), commentStyles)}
			/>
		</>
	);
};

export default CommentHeadline;
