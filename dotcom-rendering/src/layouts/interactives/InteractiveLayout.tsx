import { palette as sourcePalette } from '@guardian/source/foundations';
import { AdSlot, MobileStickyContainer } from '../../components/AdSlot.web';
import { AppsFooter } from '../../components/AppsFooter.island';
import { Carousel } from '../../components/Carousel.island';
import { DirectoryPageNavIsland } from '../../components/DirectoryPageNavIsland';
import { DiscussionLayout } from '../../components/DiscussionLayout';
import { Footer } from '../../components/Footer';
import { HeaderAdSlot } from '../../components/HeaderAdSlot';
import { InteractivesDisableArticleSwipe } from '../../components/InteractivesDisableArticleSwipe.island';
import { InteractivesNativePlatformWrapper } from '../../components/InteractivesNativePlatformWrapper.island';
import { Island } from '../../components/Island';
import { LabsHeader } from '../../components/LabsHeader';
import { Masthead } from '../../components/Masthead/Masthead';
import { MostViewedFooterData } from '../../components/MostViewedFooterData.island';
import { MostViewedFooterLayout } from '../../components/MostViewedFooterLayout';
import { OnwardsUpper } from '../../components/OnwardsUpper.island';
import { Section } from '../../components/Section';
import { StickyBottomBanner } from '../../components/StickyBottomBanner.island';
import { SubNav } from '../../components/SubNav.island';
import { type ArticleFormat, ArticleSpecial } from '../../lib/articleFormat';
import { canRenderAds } from '../../lib/canRenderAds';
import { getContributionsServiceUrl } from '../../lib/contributions';
import { decideStoryPackageTrails } from '../../lib/decideTrail';
import type { NavType } from '../../model/extract-nav';
import { palette as themePalette } from '../../palette';
import type { ArticleDeprecated } from '../../types/article';
import type { RenderingTarget } from '../../types/renderingTarget';
import { BannerWrapper, Stuck } from '../lib/stickiness';
import { InteractiveGridV1 } from './InteractiveGridV1';
import { InteractiveGridV2 } from './InteractiveGridV2';

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

export const InteractiveLayout = (props: WebProps | AppProps) => {
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

	const showComments = article.isCommentable && !isPaidContent;

	const contributionsServiceUrl = getContributionsServiceUrl(article);

	const renderAds = canRenderAds(article);

	const interactiveLayoutSwitchoverDate = new Date('2024-06-01T00:00:00Z');
	const publicationDate = new Date(article.webPublicationDate);
	const isLegacyInteractive =
		publicationDate < interactiveLayoutSwitchoverDate;

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
				</>
			)}
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
						showSubNav={true}
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

			{isWeb && renderAds && hasSurveyAd && (
				<AdSlot position="survey" display={format.display} />
			)}

			<main data-layout="InteractiveLayout">
				<DirectoryPageNavIsland
					pageId={article.pageId}
					pageTags={article.tags}
				/>

				{isLegacyInteractive ? (
					<InteractiveGridV1 {...props} />
				) : (
					<InteractiveGridV2 {...props} />
				)}

				{isWeb && renderAds && (
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

				{isWeb && renderAds && (
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
					<MobileStickyContainer
						data-print-layout="hide"
						contentType={article.contentType}
						pageId={article.pageId}
					/>
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
