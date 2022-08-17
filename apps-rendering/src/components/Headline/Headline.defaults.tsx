import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import {
	background,
	text,
} from '@guardian/common-rendering/src/editorialPalette';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign } from '@guardian/libs';
import { from, headline, remSpace } from '@guardian/source-foundations';
import type { Item } from 'item';
import { articleWidthStyles, darkModeCss } from 'styles';

export const defaultStyles = (format: ArticleFormat): SerializedStyles => {
	const baseStyles = css`
		${headline.small()}
		color: ${text.headline(format)};
		margin: 0;

		${from.tablet} {
			${headline.medium()}
		}

		${darkModeCss`
			color: ${text.headlineDark(format)};
		`}
	`;

	switch (format.design) {
		case ArticleDesign.Interview:
			return css`
				${baseStyles}
				padding-bottom: ${remSpace[1]};
			`;
		case ArticleDesign.Analysis:
			return css`
				${baseStyles}
				${articleWidthStyles}
				background-color: ${background.headline(format)};
				${darkModeCss`
					background-color: ${background.headlineDark(format)};
				`}
			`;
		default:
			return css`
				${baseStyles}
				${articleWidthStyles}
				background-color: ${background.headline(format)};
				padding-bottom: ${remSpace[6]};

				${darkModeCss`
					background-color: ${background.headlineDark(format)};
				`}
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
	</h1>
);
