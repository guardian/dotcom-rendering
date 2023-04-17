import { css, Global } from '@emotion/react';
import { ArticleDesign } from '@guardian/libs';
import { brandAlt, focusHalo, neutral } from '@guardian/source-foundations';
import { StrictMode } from 'react';
import type { FEArticleType } from '../../types/frontend';
import { AnimatePulsingDots } from '../../web/components/AnimatePulsingDots.importable';
import { FetchCommentCounts } from '../../web/components/FetchCommentCounts.importable';
import { FocusStyles } from '../../web/components/FocusStyles.importable';
import { Island } from '../../web/components/Island';
import { SkipTo } from '../../web/components/SkipTo';
import { DecideLayout } from '../layouts/DecideLayout';

type Props = {
	article: FEArticleType;
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
export const ArticlePage = ({ article, format }: Props) => {
	return (
		<StrictMode>
			<Global
				styles={css`
					/* Crude but effective mechanism. Specific components may need to improve on this behaviour. */
					/* The not(.src...) selector is to work with Source's FocusStyleManager. */
					*:focus {
						${focusHalo}
					}
					::selection {
						background: ${brandAlt[400]};
						color: ${neutral[7]};
					}
				`}
			/>
			<SkipTo id="maincontent" label="Skip to main content" />
			<SkipTo id="navigation" label="Skip to navigation" />
			{(format.design === ArticleDesign.LiveBlog ||
				format.design === ArticleDesign.DeadBlog) && (
				<SkipTo id={'key-events-carousel'} label="Skip to key events" />
			)}
			<Island clientOnly={true} deferUntil="idle">
				<FocusStyles />
			</Island>
			<Island clientOnly={true} deferUntil="idle">
				<FetchCommentCounts repeat={true} />
			</Island>
			{format.design === ArticleDesign.LiveBlog && (
				<Island clientOnly={true} deferUntil="idle">
					<AnimatePulsingDots />
				</Island>
			)}
			<DecideLayout article={article} format={format} />
		</StrictMode>
	);
};
