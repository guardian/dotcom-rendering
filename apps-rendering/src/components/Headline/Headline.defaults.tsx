import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { from, headline, remSpace } from '@guardian/source-foundations';
import StarRating from 'components/starRating';
import { headlineBackgroundColour, headlineTextColour } from 'editorialStyles';
import type { Item } from 'item';
import { articleWidthStyles } from 'styles';

export const defaultStyles = (format: ArticleFormat): SerializedStyles => css`
	${headline.medium()}
	${headlineTextColour(format)}
    ${headlineBackgroundColour(format)}
    padding-bottom: ${remSpace[6]};
	margin: 0;

	${articleWidthStyles}
`;

// stop headlines from growing in size with font resizer
export const fontSizeRestriction = css`
	font-size: 28px;
	${from.tablet} {
		font-size: 34px;
	}
`;

interface DefaultProps {
	item: Item;
	styles: SerializedStyles;
}

export const DefaultHeadline: React.FC<DefaultProps> = ({ item, styles }) => (
	<h1 css={styles}>
		<span>{item.headline}</span>
		<StarRating item={item} />
	</h1>
);
