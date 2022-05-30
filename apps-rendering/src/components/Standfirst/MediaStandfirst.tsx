import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { text } from '@guardian/common-rendering/src/editorialPalette';
import type { ArticleFormat } from '@guardian/libs';
import { headline } from '@guardian/source-foundations';
import type { Item } from 'item';
import { getFormat } from 'item';
import DefaultStandfirst from './Standfirst.defaults';

const mediaStyles = (format: ArticleFormat): SerializedStyles => css`
	color: ${text.standfirst(format)};
	p,
	ul,
	li {
		${headline.xxxsmall({ fontWeight: 'bold' })}
	}
`;

interface Props {
	item: Item;
}

const MediaStandfirst: React.FC<Props> = ({ item }) => (
	<DefaultStandfirst item={item} css={mediaStyles(getFormat(item))} />
);

export default MediaStandfirst;
