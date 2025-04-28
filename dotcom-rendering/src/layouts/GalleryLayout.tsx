import { css } from '@emotion/react';
import { ArticleHeadline } from '../components/ArticleHeadline';
import { ArticleMeta } from '../components/ArticleMeta.web';
import { GalleryImage } from '../components/GalleryImage';
import { HeaderAdSlot } from '../components/HeaderAdSlot';
import { MainMedia } from '../components/MainMedia';
import { Masthead } from '../components/Masthead/Masthead';
import { Section } from '../components/Section';
import { Standfirst } from '../components/Standfirst';
import { grid } from '../grid';
import { type ArticleFormat } from '../lib/articleFormat';
import { canRenderAds } from '../lib/canRenderAds';
import { getContributionsServiceUrl } from '../lib/contributions';
import type { NavType } from '../model/extract-nav';
import { palette } from '../palette';
import type { ArticleDeprecated } from '../types/article';
import { Stuck } from './lib/stickiness';

interface CommonProps {
	article: ArticleDeprecated;
	format: ArticleFormat;
}

interface WebProps extends CommonProps {
	NAV: NavType;
	renderingTarget: 'Web';
}

interface AppProps extends CommonProps {
	renderingTarget: 'Apps';
}

const articleStyles = css`
	background-color: ${palette('--article-background')};
`;

const headerStyles = css`
	${grid.container};
`;

const bodyStyles = css`
	${grid.container};
`;

export const GalleryLayout = (props: WebProps | AppProps) => {
	const { article, format, renderingTarget } = props;

	const isWeb = renderingTarget === 'Web';

	const renderAds = isWeb && canRenderAds(article);

	const contributionsServiceUrl = getContributionsServiceUrl(article);

	return (
		<>
			{isWeb && (
				<div data-print-layout="hide" id="bannerandheader">
					{renderAds && (
						<Stuck>
							<Section
								fullWidth={true}
								showTopBorder={false}
								showSideBorders={false}
								padSides={false}
								shouldCenter={false}
							>
								<HeaderAdSlot
									isPaidContent={
										!!article.config.isPaidContent
									}
									shouldHideReaderRevenue={
										!!article.config.shouldHideReaderRevenue
									}
								/>
							</Section>
						</Stuck>
					)}
					<Masthead
						nav={props.NAV}
						editionId={article.editionId}
						idUrl={article.config.idUrl}
						mmaUrl={article.config.mmaUrl}
						discussionApiUrl={article.config.discussionApiUrl}
						idApiUrl={article.config.idApiUrl}
						contributionsServiceUrl={contributionsServiceUrl}
						showSubNav={false}
						showSlimNav={true}
						hasPageSkin={false}
						hasPageSkinContentSelfConstrain={true}
						pageId={article.pageId}
					/>
				</div>
			)}
			<main>
				<article css={articleStyles}>
					<header css={headerStyles}>
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
};
