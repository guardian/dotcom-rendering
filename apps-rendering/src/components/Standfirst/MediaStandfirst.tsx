import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { ArticleFormat } from '../../articleFormat';
import { headlineBold17 } from '@guardian/source/foundations';
import type { Item } from 'item';
import { getFormat } from 'item';
import { text } from 'palette';
import DefaultStandfirst from './Standfirst.defaults';

const mediaStyles = (format: ArticleFormat): SerializedStyles => css`
	color: ${text.standfirst(format)};
	p,
	ul,
	li {
		${headlineBold17}
	}
`;

interface Props {
	item: Item;
}

const MediaStandfirst = ({ item }: Props) => (
	<DefaultStandfirst item={item} css={mediaStyles(getFormat(item))} />
);

export default MediaStandfirst;
