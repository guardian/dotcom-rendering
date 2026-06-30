import { palette as sourcePalette } from '@guardian/source/foundations';
import { AdPortals } from '../components/AdPortals.island';
import { AdSlot, MobileStickyContainer } from '../components/AdSlot.web';
import { AppsFooter } from '../components/AppsFooter.island';
import { Carousel } from '../components/Carousel.island';
import { CricketMatchHeaderWrapper } from '../components/CricketMatchHeaderWrapper.island';
import { DirectoryPageNavIsland } from '../components/DirectoryPageNavIsland';
import { DiscussionLayout } from '../components/DiscussionLayout';
import { FootballMatchHeaderWrapper } from '../components/FootballMatchHeaderWrapper.island';
import { Footer } from '../components/Footer';
import { HeaderAdSlot } from '../components/HeaderAdSlot';
import { Island } from '../components/Island';
import { LabsHeader } from '../components/LabsHeader';
import { Masthead } from '../components/Masthead/Masthead';
import { MatchHeaderFallback } from '../components/MatchHeaderFallback';
import { MostViewedFooterData } from '../components/MostViewedFooterData.island';
import { MostViewedFooterLayout } from '../components/MostViewedFooterLayout';
import { OnwardsUpper } from '../components/OnwardsUpper.island';
import { Section } from '../components/Section';
import { StickyBottomBanner } from '../components/StickyBottomBanner.island';
import { SubNav } from '../components/SubNav.island';
import {
	ArticleDesign,
	ArticleDisplay,
	type ArticleFormat,
	ArticleSpecial,
} from '../lib/articleFormat';
import { canRenderAds } from '../lib/canRenderAds';
import { getContributionsServiceUrl } from '../lib/contributions';
import { decideStoryPackageTrails } from '../lib/decideTrail';
import { useAB } from '../lib/useAB';
import { worldCupTagId } from '../lib/worldCup2026';
import type { NavType } from '../model/extract-nav';
import { palette as themePalette } from '../palette';
import type { ArticleDeprecated } from '../types/article';
import type { RenderingTarget } from '../types/renderingTarget';
import { BannerWrapper, Stuck } from './lib/stickiness';
import { StandardLayoutArticleGrid } from './StandardLayoutArticleGrid';

interface Props {
	article: ArticleDeprecated;
	format: ArticleFormat;
	renderingTarget: RenderingTarget;
	serverTime?: number;
}

export interface WebProps extends Props {
	NAV: NavType;
	renderingTarget: 'Web';
}

export interface AppProps extends Props {
	renderingTarget: 'Apps';
}

export const StandardLayout = (props: WebProps | AppProps) => {
	const { article, format, renderingTarget, serverTime } = props;
	const {
		config: { isPaidContent, host, hasSurveyAd },
		editionId,
	} = article;

	const isWeb = renderingTarget === 'Web';
	const isApps = renderingTarget === 'Apps';

	// TODO:
	// 1) Read 'forceEpic' value from URL parameter and use it to force the slot to render
	// 2) Otherwise, ensure slot only renders if `article.config.shouldHideReaderRevenue` equals false.

	const footballMatchUrl =
		article.matchType === 'FootballMatchType'
			? article.matchUrl
			: undefined;

	const isFootballMatchReport =
		format.design === ArticleDesign.MatchReport && !!footballMatchUrl;

	const cricketMatchUrl =
		article.matchType == 'CricketMatchType' ? article.matchUrl : undefined;

	const isCricketMatchReport =
		format.design === ArticleDesign.MatchReport && !!cricketMatchUrl;

	const showComments = article.isCommentable && !isPaidContent;

	const contributionsServiceUrl = getContributionsServiceUrl(article);

	const isLabs = format.theme === ArticleSpecial.Labs;

	const isWorldCup2026 = article.tags.some((tag) => tag.id === worldCupTagId);

	const renderAds = canRenderAds(article);

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
								<HeaderAdSlot />
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
						showSubNav={!isLabs && !isWorldCup2026}
						showSlimNav={false}
						hasPageSkinContentSelfConstrain={true}
						pageId={article.pageId}
						tagIds={article.tags.map((tag) => tag.id)}
						sectionId={article.config.section}
						contentType={article.contentType}
					/>
				</div>
			)}

			{format.theme === ArticleSpecial.Labs && (
				<Stuck zIndex="subNavBanner">
					<Section
						fullWidth={true}
						showTopBorder={false}
						backgroundColour={sourcePalette.labs[400]}
						borderColour={sourcePalette.neutral[60]}
						sectionId="labs-header"
						element="aside"
					>
						<LabsHeader editionId={editionId} />
					</Section>
				</Stuck>
			)}
			<DirectoryPageNavIsland
				pageId={article.pageId}
				pageTags={article.tags}
			/>

			<MatchHeaderContainer
				isFootballMatchReport={isFootballMatchReport}
				isCricketMatchReport={isCricketMatchReport}
				renderingTarget={renderingTarget}
				article={article}
				format={format}
			/>

			{isWeb && renderAds && hasSurveyAd && (
				<AdSlot position="survey" display={format.display} />
			)}

			<main data-layout={`${ArticleDisplay[format.display]}Layout`}>
				{isApps && renderAds && (
					<Island priority="critical">
						<AdPortals />
					</Island>
				)}

				{/* This element is used to replace the article with the scorecard when the scorecard tab is clicked */}
				<div id="article">
					<StandardLayoutArticleGrid
						article={article}
						format={format}
						renderingTarget={renderingTarget}
					/>
				</div>
				{isWeb && renderAds && !isLabs && (
					<Section
						fullWidth={true}
						padSides={false}
						showTopBorder={false}
						showSideBorders={false}
						backgroundColour={themePalette('--ad-background')}
						element="aside"
					>
						<AdSlot
							data-print-layout="hide"
							position="merchandising-high"
							display={format.display}
						/>
					</Section>
				)}

				{article.storyPackage && (
					<Section
						fullWidth={true}
						backgroundColour={themePalette(
							'--article-section-background',
						)}
						borderColour={themePalette('--article-border')}
					>
						<Island priority="feature" defer={{ until: 'visible' }}>
							<Carousel
								heading={article.storyPackage.heading}
								trails={decideStoryPackageTrails(
									article.storyPackage.trails,
									article.webURL,
								)}
								onwardsSource="more-on-this-story"
								format={format}
								leftColSize={'compact'}
								discussionApiUrl={
									article.config.discussionApiUrl
								}
								serverTime={serverTime}
								renderingTarget={renderingTarget}
							/>
						</Island>
					</Section>
				)}

				<Island priority="feature" defer={{ until: 'visible' }}>
					<OnwardsUpper
						ajaxUrl={article.config.ajaxUrl}
						hasRelated={article.hasRelated}
						hasStoryPackage={article.hasStoryPackage}
						isAdFreeUser={article.isAdFreeUser}
						pageId={article.pageId}
						isPaidContent={!!article.config.isPaidContent}
						showRelatedContent={article.config.showRelatedContent}
						keywordIds={article.config.keywordIds}
						contentType={article.contentType}
						tags={article.tags}
						format={format}
						pillar={format.theme}
						editionId={article.editionId}
						shortUrlId={article.config.shortUrlId}
						discussionApiUrl={article.config.discussionApiUrl}
						serverTime={serverTime}
						renderingTarget={renderingTarget}
						webURL={article.webURL}
					/>
				</Island>
				{showComments && (
					<Section
						fullWidth={true}
						sectionId="comments"
						element="section"
						backgroundColour={themePalette(
							'--discussion-section-background',
						)}
						borderColour={themePalette('--article-border')}
						fontColour={themePalette('--discussion-text')}
					>
						<DiscussionLayout
							discussionApiUrl={article.config.discussionApiUrl}
							shortUrlId={article.config.shortUrlId}
							format={format}
							discussionD2Uid={article.config.discussionD2Uid}
							discussionApiClientHeader={
								article.config.discussionApiClientHeader
							}
							enableDiscussionSwitch={
								!!article.config.switches.enableDiscussionSwitch
							}
							isAdFreeUser={article.isAdFreeUser}
							shouldHideAds={article.shouldHideAds}
							idApiUrl={article.config.idApiUrl}
						/>
					</Section>
				)}

				{!isPaidContent && (
					<Section
						title="Most viewed"
						padContent={false}
						verticalMargins={false}
						element="aside"
						data-link-name="most-popular"
						data-component="most-popular"
						backgroundColour={themePalette(
							'--article-section-background',
						)}
						borderColour={themePalette('--article-border')}
					>
						<MostViewedFooterLayout renderAds={isWeb && renderAds}>
							<Island
								priority="feature"
								defer={{ until: 'visible' }}
							>
								<MostViewedFooterData
									sectionId={article.config.section}
									ajaxUrl={article.config.ajaxUrl}
									edition={article.editionId}
								/>
							</Island>
						</MostViewedFooterLayout>
					</Section>
				)}

				{isWeb && renderAds && !isLabs && (
					<Section
						fullWidth={true}
						padSides={false}
						showTopBorder={false}
						showSideBorders={false}
						backgroundColour={themePalette('--ad-background')}
						element="aside"
					>
						<AdSlot
							position="merchandising"
							display={format.display}
						/>
					</Section>
				)}
			</main>
			{isWeb && (
				<>
					{props.NAV.subNavSections && (
						<Section
							fullWidth={true}
							padSides={false}
							element="aside"
						>
							<Island
								priority="enhancement"
								defer={{ until: 'visible' }}
							>
								<SubNav
									subNavSections={props.NAV.subNavSections}
									currentNavLink={props.NAV.currentNavLink}
									position="footer"
								/>
							</Island>
						</Section>
					)}
					<Section
						fullWidth={true}
						padSides={false}
						backgroundColour={sourcePalette.brand[400]}
						borderColour={sourcePalette.brand[600]}
						showSideBorders={false}
						element="footer"
					>
						<Footer
							pageFooter={article.pageFooter}
							selectedPillar={props.NAV.selectedPillar}
							pillars={props.NAV.pillars}
							urls={article.nav.readerRevenueLinks.footer}
							editionId={article.editionId}
						/>
					</Section>
					<BannerWrapper data-print-layout="hide">
						<Island priority="feature" defer={{ until: 'idle' }}>
							<StickyBottomBanner
								contentType={article.contentType}
								contributionsServiceUrl={
									contributionsServiceUrl
								}
								idApiUrl={article.config.idApiUrl}
								isMinuteArticle={
									article.pageType.isMinuteArticle
								}
								isPaidContent={article.pageType.isPaidContent}
								isPreview={!!article.config.isPreview}
								isSensitive={article.config.isSensitive}
								pageId={article.pageId}
								sectionId={article.config.section}
								shouldHideReaderRevenue={
									article.shouldHideReaderRevenue
								}
								remoteBannerSwitch={
									!!article.config.switches.remoteBanner
								}
								tags={article.tags}
								host={host}
							/>
						</Island>
					</BannerWrapper>
					{renderAds && (
						<MobileStickyContainer data-print-layout="hide" />
					)}
				</>
			)}

			{isApps && (
				<>
					<Section
						fullWidth={true}
						backgroundColour={themePalette('--ad-background')}
						borderColour={themePalette('--article-border')}
						padSides={false}
						showSideBorders={false}
						element="footer"
					>
						<Island priority="critical">
							<AppsFooter />
						</Island>
					</Section>
				</>
			)}
		</>
	);
};

const MatchHeaderContainer = ({
	isFootballMatchReport,
	isCricketMatchReport,
	renderingTarget,
	article,
	format,
}: {
	isFootballMatchReport: boolean;
	isCricketMatchReport: boolean;
	renderingTarget: RenderingTarget;
	article: ArticleDeprecated;
	format: ArticleFormat;
}) => {
	const footballMatchHeaderUrl =
		article.matchType === 'FootballMatchType'
			? article.matchHeaderUrl
			: undefined;

	const footballMatchLeagueName = article.sectionLabel;
	const footballMatchLeagueUrl = `${article.guardianBaseURL}/${article.sectionUrl}`;

	const cricketMatchHeaderUrl =
		article.matchType === 'CricketMatchType'
			? article.matchHeaderUrl
			: undefined;

	const ab = useAB();
	const isCricketRedesignEnabled = Boolean(
		ab?.isUserInTestGroup('webx-cricket-redesign', 'enable'),
	);

	const isApps = renderingTarget === 'Apps';

	if (isFootballMatchReport && footballMatchHeaderUrl) {
		return (
			<>
				<noscript>
					<MatchHeaderFallback format={format} article={article} />
				</noscript>
				<Island priority="feature" defer={{ until: 'visible' }}>
					<FootballMatchHeaderWrapper
						initialTab="report"
						leagueName={footballMatchLeagueName}
						leagueURL={footballMatchLeagueUrl}
						edition={article.editionId}
						matchHeaderURL={footballMatchHeaderUrl}
						renderingTarget={renderingTarget}
						article={article}
						format={format}
					/>
				</Island>
			</>
		);
	}

	if (
		!isApps &&
		cricketMatchHeaderUrl &&
		isCricketMatchReport &&
		isCricketRedesignEnabled
	) {
		return (
			<>
				<noscript>
					<MatchHeaderFallback format={format} article={article} />
				</noscript>
				<Island priority="feature" defer={{ until: 'visible' }}>
					<CricketMatchHeaderWrapper
						selectedTab={'report'}
						edition={article.editionId}
						matchHeaderURL={cricketMatchHeaderUrl}
						tabContentId={'article'}
						article={article}
						format={format}
					/>
				</Island>
			</>
		);
	}

	return null;
};
