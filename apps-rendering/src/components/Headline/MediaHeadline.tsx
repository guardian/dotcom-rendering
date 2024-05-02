import { css } from '@emotion/react';
import {
	from,
	headlineMedium28,
	headlineMedium34,
} from '@guardian/source-foundations';
import type { Item } from 'item';
import { DefaultHeadline, defaultStyles } from './Headline.defaults';

const mediaStyles = css`
	${headlineMedium28}
	${from.tablet} {
		${headlineMedium34}
	}
`;

interface Props {
	item: Item;
}

const MediaHeadline: React.FC<Props> = ({ item }) => (
	<DefaultHeadline
		item={item}
		styles={css(defaultStyles(item), mediaStyles)}
	/>
);

export default MediaHeadline;
