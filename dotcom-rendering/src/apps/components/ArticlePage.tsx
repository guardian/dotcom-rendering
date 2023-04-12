import { css, Global } from '@emotion/react';
import { brandAlt, focusHalo, neutral } from '@guardian/source-foundations';
import { StrictMode } from 'react';
import type { FEArticleType } from '../../types/frontend';
import type { NavType } from '../../model/extract-nav';
import { DecideLayout } from '../layouts/DecideLayout';

type Props = {
	article: FEArticleType;
	NAV: NavType;
	format: ArticleFormat;
};

/**
 * @description
 * Article is a high level wrapper for article pages on Dotcom. Sets strict mode and some globals
 *
 * @param {Props} props
 * @param {FEArticleType} props.article - The article JSON data
 * @param {ArticleFormat} props.format - The format model for the article
 * */
export const ArticlePage = ({ article, NAV, format }: Props) => {
	return (
		<StrictMode>
			<Global
				styles={css`
					/* Crude but effective mechanism. Specific components may need to improve on this behaviour. */
					*:focus {
						${focusHalo}
					}
					::selection {
						background: ${brandAlt[400]};
						color: ${neutral[7]};
					}
				`}
			/>
			<DecideLayout article={article} NAV={NAV} format={format} />
		</StrictMode>
	);
};
