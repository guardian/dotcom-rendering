import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign } from '@guardian/libs';
import { from, headline, remSpace } from '@guardian/source-foundations';
import StarRating from 'components/StarRating';
import { headlineBackgroundColour, headlineTextColour } from 'editorialStyles';
import type { Item } from 'item';
import { articleWidthStyles } from 'styles';

export const defaultStyles = (format: ArticleFormat): SerializedStyles => {
	const baseStyles = css`
		${headline.small()}
		${headlineTextColour(format)}
		margin: 0;
		${from.tablet} {
			${headline.medium()}
		}
	`;

	switch (format.design) {
		case ArticleDesign.Interview:
			return css`
				${baseStyles}
				padding-bottom: ${remSpace[1]};
			`;
		default:
			return css`
				${baseStyles}
				${articleWidthStyles}
				${headlineBackgroundColour(format)}
				padding-bottom: ${remSpace[6]};
			`;
	}
};
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
