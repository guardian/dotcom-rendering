import { css } from '@emotion/react';
import { remSpace } from '@guardian/source/foundations';
import type { Item } from 'item';
import { DefaultHeadline, defaultStyles } from './Headline.defaults';

const liveblogStyles = css`
	padding: 0 0 ${remSpace[5]};
`;

interface Props {
	item: Item;
}

const BlogHeadline = ({ item }: Props) => (
	<DefaultHeadline
		item={item}
		styles={css(defaultStyles(item), liveblogStyles)}
	/>
);

export default BlogHeadline;
