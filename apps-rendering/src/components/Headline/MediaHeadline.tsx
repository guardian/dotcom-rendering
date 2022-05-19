import { css } from '@emotion/react';
import { headline } from '@guardian/source-foundations';
import type { Item } from 'item';
import {
	DefaultHeadline,
	defaultStyles,
	fontSizeRestriction,
} from './Headline.defaults';

const mediaStyles = css`
	${headline.medium({ fontWeight: 'medium' })}
`;

interface Props {
	item: Item;
}

const MediaHeadline: React.FC<Props> = ({ item }) => (
	<DefaultHeadline
		item={item}
		styles={css(defaultStyles(item), mediaStyles, fontSizeRestriction)}
	/>
);

export default MediaHeadline;
