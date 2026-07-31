import { css } from '@emotion/react';
import { from, until } from '@guardian/source/foundations';
import { Hide } from '@guardian/source/react-components';
import { ArticleBody } from '../../components/ArticleBody';
import { ArticleContainer } from '../../components/ArticleContainer';
import { ArticleHeadline } from '../../components/ArticleHeadline';
import { ArticleMetaApps } from '../../components/ArticleMeta.apps';
import { ArticleMeta } from '../../components/ArticleMeta.web';
import { ArticleTitle } from '../../components/ArticleTitle';
import { Border } from '../../components/Border';
import { DecideLines } from '../../components/DecideLines';
import { GridItem } from '../../components/GridItem';
import { MainMedia } from '../../components/MainMedia';
import { Section } from '../../components/Section';
import { Standfirst } from '../../components/Standfirst';
import { type ArticleFormat, ArticleSpecial } from '../../lib/articleFormat';
import { getContributionsServiceUrl } from '../../lib/contributions';
import type { NavType } from '../../model/extract-nav';
import { palette as themePalette } from '../../palette';
import type { ArticleDeprecated } from '../../types/article';
import type { RenderingTarget } from '../../types/renderingTarget';
import { interactiveLegacyClasses } from '../lib/interactiveLegacyStyling';

const InteractiveGrid = ({ children }: { children: React.ReactNode }) => (
	<div
		className={interactiveLegacyClasses.contentInteractiveGrid}
		css={css`
			/* IE Fallback */
			display: flex;
			flex-direction: column;
			${until.leftCol} {
				margin-left: 0px;
			}
			${from.leftCol} {
				margin-left: 151px;
			}
			${from.wide} {
				margin-left: 230px;
			}

			@supports (display: grid) {
				display: grid;
				width: 100%;
				margin-left: 0;

				grid-column-gap: 10px;

				/*
					Explanation of each unit of grid-template-columns

					Left Column (220 - 1px border)
					Vertical grey border
					Main content
				*/
				${from.wide} {
					grid-template-columns: 219px 1px 1020px;

					grid-template-areas:
						'title  border  headline'
						'.      border  standfirst'
						'.      border  media'
						'.      border  media'
						'.      border  lines'
						'.      border  meta'
						'body   body    body'
						'.      .       .';
				}

				/*
					Explanation of each unit of grid-template-columns

					Left Column (220 - 1px border)
					Vertical grey border
					Main content
				*/
				${until.wide} {
					grid-template-columns: 140px 1px 940px;

					grid-template-areas:
						'title  border  headline'
						'.      border  standfirst'
						'.      border  media'
						'.      border  media'
						'.      border  lines'
						'.      border  meta'
						'body   body    body'
						'.      .       .';
				}

				${until.leftCol} {
					grid-template-columns: 100%; /* Main content */
					grid-template-areas:
						'title'
						'headline'
						'standfirst'
						'media'
						'lines'
						'meta'
						'body'
						'.';
				}

				${until.desktop} {
					grid-template-columns: 100%; /* Main content */
					grid-template-areas:
						'title'
						'headline'
						'standfirst'
						'media'
						'lines'
						'meta'
						'body';
				}

				${until.tablet} {
					grid-column-gap: 0px;
					grid-template-columns: 100%; /* Main content */
					grid-template-areas:
						'media'
						'title'
						'headline'
						'standfirst'
						'lines'
						'meta'
						'body';
				}
			}
		`}
	>
		{children}
	</div>
);

const maxWidth = css`
	${from.desktop} {
		max-width: 620px;
	}
`;

const stretchLines = css`
	${until.phablet} {
		margin-left: -20px;
		margin-right: -20px;
	}
	${until.mobileLandscape} {
		margin-left: -10px;
		margin-right: -10px;
	}
`;

interface Props {
	article: ArticleDeprecated;
	format: ArticleFormat;
	renderingTarget: RenderingTarget;
	serverTime?: number;
}

interface WebProps extends Props {
	NAV: NavType;
	renderingTarget: 'Web';
}

interface AppProps extends Props {
	renderingTarget: 'Apps';
}

export const temporaryBodyCopyColourOverride = css`
	.content__main-column--interactive p {
		/* stylelint-disable-next-line declaration-no-important */
		color: ${themePalette('--article-text')} !important;
	}
`;

export const InteractiveArticleGridDeprecated = (
	props: WebProps | AppProps,
) => {
	const { article, format, renderingTarget } = props;
	const {
		config: { host },
	} = article;
	const isApps = renderingTarget === 'Apps';

	const contributionsServiceUrl = getContributionsServiceUrl(article);

	const { branding } = article.commercialProperties[article.editionId];

	return (
		<Section
			fullWidth={true}
			showTopBorder={false}
			backgroundColour={themePalette('--article-background')}
			borderColour={themePalette('--article-border')}
			element="article"
			className={interactiveLegacyClasses.contentInteractive}
		>
			<div className={interactiveLegacyClasses.contentInteractive}>
				<InteractiveGrid>
					<GridItem area="media">
						<div css={maxWidth}>
							<MainMedia
								format={format}
								elements={article.mainMediaElements}
								host={host}
								pageId={article.pageId}
								webTitle={article.webTitle}
								ajaxUrl={article.config.ajaxUrl}
								switches={article.config.switches}
								isAdFreeUser={article.isAdFreeUser}
								isSensitive={article.config.isSensitive}
								editionId={article.editionId}
								shouldHideAds={article.shouldHideAds}
							/>
						</div>
					</GridItem>
					<GridItem area="title" element="aside">
						<div
							className={`${interactiveLegacyClasses.contentLabels} ${interactiveLegacyClasses.contentLabelsNotImmersive}`}
						>
							<ArticleTitle
								format={format}
								tags={article.tags}
								sectionLabel={article.sectionLabel}
								sectionUrl={article.sectionUrl}
								guardianBaseURL={article.guardianBaseURL}
							/>
						</div>
					</GridItem>
					<GridItem area="border">
						{format.theme === ArticleSpecial.Labs ? (
							<></>
						) : (
							<Border />
						)}
					</GridItem>
					<GridItem area="headline">
						<div css={maxWidth}>
							<ArticleHeadline
								format={format}
								headlineString={article.headline}
								tags={article.tags}
								byline={article.byline}
								webPublicationDateDeprecated={
									article.webPublicationDateDeprecated
								}
								starRating={article.starRating}
							/>
						</div>
					</GridItem>
					<GridItem area="standfirst">
						<Standfirst
							format={format}
							standfirst={article.standfirst}
						/>
					</GridItem>
					<GridItem area="lines">
						<div css={maxWidth}>
							<div css={stretchLines}>
								<DecideLines
									format={format}
									color={themePalette('--article-meta-lines')}
								/>
							</div>
						</div>
					</GridItem>
					<GridItem area="meta" element="aside">
						<div css={maxWidth}>
							{isApps ? (
								<>
									<Hide from="leftCol">
										<ArticleMetaApps
											branding={branding}
											format={format}
											byline={article.byline}
											tags={article.tags}
											primaryDateline={
												article.webPublicationDateDisplay
											}
											secondaryDateline={
												article.webPublicationSecondaryDateDisplay
											}
											isCommentable={
												article.isCommentable
											}
											discussionApiUrl={
												article.config.discussionApiUrl
											}
											shortUrlId={
												article.config.shortUrlId
											}
											pageId={article.config.pageId}
										></ArticleMetaApps>
									</Hide>
									<Hide until="leftCol">
										<ArticleMeta
											branding={branding}
											format={format}
											pageId={article.pageId}
											webTitle={article.webTitle}
											byline={article.byline}
											tags={article.tags}
											primaryDateline={
												article.webPublicationDateDisplay
											}
											secondaryDateline={
												article.webPublicationSecondaryDateDisplay
											}
											isCommentable={
												article.isCommentable
											}
											discussionApiUrl={
												article.config.discussionApiUrl
											}
											shortUrlId={
												article.config.shortUrlId
											}
										/>
									</Hide>
								</>
							) : (
								<ArticleMeta
									branding={branding}
									format={format}
									pageId={article.pageId}
									webTitle={article.webTitle}
									byline={article.byline}
									tags={article.tags}
									primaryDateline={
										article.webPublicationDateDisplay
									}
									secondaryDateline={
										article.webPublicationSecondaryDateDisplay
									}
									isCommentable={article.isCommentable}
									discussionApiUrl={
										article.config.discussionApiUrl
									}
									shortUrlId={article.config.shortUrlId}
								/>
							)}
						</div>
					</GridItem>
					<GridItem area="body" element="article">
						<ArticleContainer format={format}>
							<ArticleBody
								format={format}
								blocks={article.blocks}
								host={host}
								pageId={article.pageId}
								webTitle={article.webTitle}
								ajaxUrl={article.config.ajaxUrl}
								switches={article.config.switches}
								isSensitive={article.config.isSensitive}
								isAdFreeUser={article.isAdFreeUser}
								sectionId={article.config.section}
								shouldHideReaderRevenue={
									article.shouldHideReaderRevenue
								}
								tags={article.tags}
								isPaidContent={!!article.config.isPaidContent}
								contributionsServiceUrl={
									contributionsServiceUrl
								}
								contentType={article.contentType}
								isPreview={article.config.isPreview}
								idUrl={article.config.idUrl ?? ''}
								isDev={!!article.config.isDev}
								keywordIds={article.config.keywordIds}
								tableOfContents={article.tableOfContents}
								lang={article.lang}
								isRightToLeftLang={article.isRightToLeftLang}
								editionId={article.editionId}
								shouldHideAds={article.shouldHideAds}
								idApiUrl={article.config.idApiUrl}
								isOldInteractive={true}
							/>
						</ArticleContainer>
					</GridItem>
				</InteractiveGrid>
			</div>
		</Section>
	);
};
