import { css, Global } from '@emotion/react';
import { from, palette as sourcePalette } from '@guardian/source/foundations';
import { AdSlot } from '../components/AdSlot.web';
import { ArticleBody } from '../components/ArticleBody';
import { ArticleHeadline } from '../components/ArticleHeadline';
import { ArticleMetaApps } from '../components/ArticleMeta.apps';
import { ArticleMeta } from '../components/ArticleMeta.web';
import { ArticleTitle } from '../components/ArticleTitle';
import { DecideLines } from '../components/DecideLines';
import { HeaderAdSlot } from '../components/HeaderAdSlot';
import { InteractivesDisableArticleSwipe } from '../components/InteractivesDisableArticleSwipe.importable';
import { InteractivesNativePlatformWrapper } from '../components/InteractivesNativePlatformWrapper.importable';
import { Island } from '../components/Island';
import { LabsHeader } from '../components/LabsHeader';
import { MainMedia } from '../components/MainMedia';
import { Masthead } from '../components/Masthead/Masthead';
import { Section } from '../components/Section';
import { Standfirst } from '../components/Standfirst';
import { grid } from '../grid';
import { type ArticleFormat, ArticleSpecial } from '../lib/articleFormat';
import { canRenderAds } from '../lib/canRenderAds';
import { getContributionsServiceUrl } from '../lib/contributions';
import type { EditionId } from '../lib/edition';
import type { NavType } from '../model/extract-nav';
import { palette as themePalette } from '../palette';
import type { ArticleDeprecated } from '../types/article';
import type { Branding } from '../types/branding';
import type { ConfigType } from '../types/config';
import type { RenderingTarget } from '../types/renderingTarget';
import { temporaryBodyCopyColourOverride } from './InteractiveLayoutDeprecated';
import { Stuck } from './lib/stickiness';

interface CommonProps {
	article: ArticleDeprecated;
	format: ArticleFormat;
	renderingTarget: RenderingTarget;
	serverTime?: number;
}

interface WebProps extends CommonProps {
	NAV: NavType;
	renderingTarget: 'Web';
}

interface AppsProps extends CommonProps {
	renderingTarget: 'Apps';
}

export const InteractiveLayout = (props: WebProps | AppsProps) => {
	const { article, format, renderingTarget } = props;
	const {
		config: { host, hasSurveyAd },
		editionId,
	} = article;

	const isApps = renderingTarget === 'Apps';
	const isWeb = renderingTarget === 'Web';

	// const showComments = article.isCommentable && !isPaidContent;

	const { branding } = article.commercialProperties[article.editionId];

	const contributionsServiceUrl = getContributionsServiceUrl(article);

	const renderAds = canRenderAds(article);

	return (
		<>
			{isApps && (
				<>
					<Island priority="critical">
						<InteractivesNativePlatformWrapper />
					</Island>
					<Island priority="critical">
						<InteractivesDisableArticleSwipe />
					</Island>
					<Global styles={temporaryBodyCopyColourOverride} />
				</>
			)}
			{isWeb && (
				<>
					<BannerAndMasthead
						renderAds={renderAds}
						nav={props.NAV}
						editionId={editionId}
						config={article.config}
						contributionsServiceUrl={contributionsServiceUrl}
						pageId={article.pageId}
					/>

					{format.theme === ArticleSpecial.Labs && (
						<Stuck zIndex="subNavBanner">
							<Section
								fullWidth={true}
								showTopBorder={false}
								backgroundColour={sourcePalette.labs[400]}
								borderColour={sourcePalette.neutral[60]}
								sectionId="labs-header"
							>
								<LabsHeader editionId={editionId} />
							</Section>
						</Stuck>
					)}

					{renderAds && hasSurveyAd && (
						<AdSlot position="survey" display={format.display} />
					)}

					<article css={css(grid.container)}>
						{article.mainMediaElements.length > 0 && (
							<div css={css(grid.column.centre)}>
								<MainMedia
									format={format}
									elements={article.mainMediaElements}
									host={host}
									pageId={article.pageId}
									webTitle={article.webTitle}
									ajaxUrl={article.config.ajaxUrl}
									abTests={article.config.abTests}
									switches={article.config.switches}
									isAdFreeUser={article.isAdFreeUser}
									isSensitive={article.config.isSensitive}
									editionId={article.editionId}
									shouldHideAds={article.shouldHideAds}
								/>
							</div>
						)}
						<div
							css={{
								'&': css(grid.column.centre),
								[from.tablet]: {
									'&': css(grid.column.left),
								},
							}}
						>
							<ArticleTitle
								format={format}
								tags={article.tags}
								sectionLabel={article.sectionLabel}
								sectionUrl={article.sectionUrl}
								guardianBaseURL={article.guardianBaseURL}
							/>
						</div>
						<div css={css(grid.column.centre)}>
							<ArticleHeadline
								format={format}
								headlineString={article.headline}
								tags={article.tags}
								byline={article.byline}
								webPublicationDateDeprecated={
									article.webPublicationDateDeprecated
								}
							/>
							<Standfirst
								format={format}
								standfirst={article.standfirst}
							/>
							<DecideLines
								format={format}
								color={themePalette('--article-meta-lines')}
							/>
							<Meta
								renderingTarget={renderingTarget}
								format={format}
								article={article}
								branding={branding}
							/>
							<ArticleBody
								format={format}
								blocks={article.blocks}
								host={host}
								pageId={article.pageId}
								webTitle={article.webTitle}
								ajaxUrl={article.config.ajaxUrl}
								abTests={article.config.abTests}
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
							/>
						</div>
					</article>
				</>
			)}
		</>
	);
};

const BannerAndMasthead = (props: {
	renderAds: boolean;
	nav: NavType;
	editionId: EditionId;
	config: ConfigType;
	contributionsServiceUrl: string;
	pageId: string | undefined;
}) => (
	<div data-print-layout="hide" id="bannerandheader">
		{props.renderAds ? (
			<Stuck>
				<Section
					fullWidth={true}
					showTopBorder={false}
					showSideBorders={false}
					padSides={false}
					shouldCenter={false}
				>
					<HeaderAdSlot />
				</Section>
			</Stuck>
		) : null}
		<Masthead
			nav={props.nav}
			editionId={props.editionId}
			idUrl={props.config.idUrl}
			mmaUrl={props.config.mmaUrl}
			discussionApiUrl={props.config.discussionApiUrl}
			idApiUrl={props.config.idApiUrl}
			contributionsServiceUrl={props.contributionsServiceUrl}
			showSubNav={false}
			showSlimNav={true}
			hasPageSkin={false}
			hasPageSkinContentSelfConstrain={false}
			pageId={props.pageId}
		/>
	</div>
);

const Meta = ({
	renderingTarget,
	format,
	article,
	branding,
}: {
	renderingTarget: RenderingTarget;
	format: ArticleFormat;
	article: ArticleDeprecated;
	branding?: Branding;
}) => {
	if (renderingTarget === 'Apps') {
		return (
			<ArticleMetaApps
				branding={branding}
				format={format}
				byline={article.byline}
				tags={article.tags}
				primaryDateline={article.webPublicationDateDisplay}
				secondaryDateline={article.webPublicationSecondaryDateDisplay}
				isCommentable={article.isCommentable}
				discussionApiUrl={article.config.discussionApiUrl}
				shortUrlId={article.config.shortUrlId}
				pageId={article.config.pageId}
			></ArticleMetaApps>
		);
	} else {
		return (
			<ArticleMeta
				branding={branding}
				format={format}
				pageId={article.pageId}
				webTitle={article.webTitle}
				byline={article.byline}
				tags={article.tags}
				primaryDateline={article.webPublicationDateDisplay}
				secondaryDateline={article.webPublicationSecondaryDateDisplay}
				isCommentable={article.isCommentable}
				discussionApiUrl={article.config.discussionApiUrl}
				shortUrlId={article.config.shortUrlId}
			/>
		);
	}
};
