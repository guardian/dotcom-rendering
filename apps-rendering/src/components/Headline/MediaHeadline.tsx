import { css } from '@emotion/react';
import { from, headline } from '@guardian/source-foundations';
import type { Item } from 'item';
import { DefaultHeadline, defaultStyles } from './Headline.defaults';

const mediaStyles = css`
	${headline.small({ fontWeight: 'medium' })}
	${from.tablet} {
		${headline.medium({ fontWeight: 'medium' })}
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
