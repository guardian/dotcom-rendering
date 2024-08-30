import { css } from '@emotion/react';
import { type ArticleFormat } from '@guardian/libs';
import { from } from '@guardian/source/foundations';
import { ArticleHeadline } from '../components/ArticleHeadline';
import { ArticleMeta } from '../components/ArticleMeta.web';
import { GalleryImage } from '../components/GalleryImage';
import { LabsHeaderFull } from '../components/LabsHeaderFull';
import { MainMedia } from '../components/MainMedia';
import { NavNarrow } from '../components/Nav/NavNarrow';
import { Standfirst } from '../components/Standfirst';
import { grid } from '../grid';
import type { NavType } from '../model/extract-nav';
import { palette } from '../palette';
import type { DCRArticle } from '../types/frontend';
import type { RenderingTarget } from '../types/renderingTarget';

type Props = {
	article: DCRArticle;
	format: ArticleFormat;
	renderingTarget: RenderingTarget;
};

interface WebProps extends Props {
	NAV: NavType;
	renderingTarget: 'Web';
}

interface AppProps extends Props {
	renderingTarget: 'Apps';
}

const articleStyles = css`
	background-color: ${palette('--article-background')};
`;

const headerStyles = css`
	${grid.container};
	grid-auto-flow: row dense;
	background-color: ${palette('--article-inner-background')};
	border-bottom: 1px solid ${palette('--article-border')};

	${from.tablet} {
		&::before {
			${grid.between('viewport-start', 'centre-column-start')}
			grid-row: span 3;
			content: '';
			border-right: 1px solid ${palette('--article-border')};
		}
	}
`;

const bodyStyles = css`
	${grid.container};
`;

export const GalleryLayout = ({
	article,
	format,
	...props
}: WebProps | AppProps) => (
	<>
		{props.renderingTarget === 'Web' ? (
			<NavNarrow NAV={props.NAV} article={article} />
		) : null}
		<main>
			<article css={articleStyles}>
				<header css={headerStyles}>
					<LabsHeaderFull
						editionId={article.editionId}
						format={format}
					/>
					<MainMedia
						abTests={article.config.abTests}
						ajaxUrl={article.config.ajaxUrl}
						editionId={article.editionId}
						elements={article.mainMediaElements}
						format={format}
						isAdFreeUser={article.isAdFreeUser}
						isSensitive={article.config.isSensitive}
						pageId={article.pageId}
						switches={article.config.switches}
						webTitle={article.webTitle}
					/>
					<ArticleHeadline
						format={format}
						headlineString={article.headline}
						webPublicationDateDeprecated={
							article.webPublicationDateDeprecated
						}
						tags={article.tags}
					/>
					<Standfirst
						format={format}
						standfirst={article.standfirst}
					/>
					<ArticleMeta
						branding={
							article.commercialProperties[article.editionId]
								.branding
						}
						format={format}
						pageId={article.pageId}
						webTitle={article.webTitle}
						byline={article.byline}
						tags={article.tags}
						primaryDateline={article.webPublicationDateDisplay}
						secondaryDateline={
							article.webPublicationSecondaryDateDisplay
						}
						isCommentable={article.isCommentable}
						discussionApiUrl={article.config.discussionApiUrl}
						shortUrlId={article.config.shortUrlId}
					/>
				</header>
				<div css={bodyStyles}>
					{article.blocks
						.flatMap((block) => block.elements)
						.filter(
							(element) =>
								element._type ===
								'model.dotcomrendering.pageElements.ImageBlockElement',
						)
						.map((element, idx) => (
							<GalleryImage
								image={element}
								format={format}
								pageId={article.pageId}
								webTitle={article.webTitle}
								key={idx}
							/>
						))}
				</div>
			</article>
		</main>
	</>
);
