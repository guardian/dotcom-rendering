import { css } from '@emotion/react';
import { log } from '@guardian/libs';
import {
	from,
	palette as sourcePalette,
	space,
	until,
} from '@guardian/source/foundations';
import { Hide } from '@guardian/source/react-components';
import { StraightLines } from '@guardian/source-development-kitchen/react-components';
import { AdPortals } from '../components/AdPortals.island';
import { AdSlot, MobileStickyContainer } from '../components/AdSlot.web';
import { AffiliateDisclaimer } from '../components/AffiliateDisclaimer';
import { AppsEpic } from '../components/AppsEpic.island';
import { AppsFooter } from '../components/AppsFooter.island';
import { ArticleBody } from '../components/ArticleBody';
import { ArticleContainer } from '../components/ArticleContainer';
import { ArticleHeadline } from '../components/ArticleHeadline';
import { ArticleMetaApps } from '../components/ArticleMeta.apps';
import { ArticleMeta } from '../components/ArticleMeta.web';
import { ArticleTitle } from '../components/ArticleTitle';
import { Carousel } from '../components/Carousel.island';
import { DecideLines } from '../components/DecideLines';
import { DirectoryPageNavIsland } from '../components/DirectoryPageNavIsland';
import { DiscussionLayout } from '../components/DiscussionLayout';
import { FootballMatchHeaderWrapper } from '../components/FootballMatchHeaderWrapper.island';
import { FootballMatchInfoWrapper } from '../components/FootballMatchInfoWrapper.island';
import { Footer } from '../components/Footer';
import { GuardianLabsLines } from '../components/GuardianLabsLines';
import { HeaderAdSlot } from '../components/HeaderAdSlot';
import { Island } from '../components/Island';
import { LabsHeader } from '../components/LabsHeader';
import { ListenToArticle } from '../components/ListenToArticle.island';
import { MainMedia } from '../components/MainMedia';
import { Masthead } from '../components/Masthead/Masthead';
import { MostViewedFooterData } from '../components/MostViewedFooterData.island';
import { MostViewedFooterLayout } from '../components/MostViewedFooterLayout';
import { MostViewedRightWithAd } from '../components/MostViewedRightWithAd.island';
import { OnwardsUpper } from '../components/OnwardsUpper.island';
import { Section } from '../components/Section';
import { SlotBodyEnd } from '../components/SlotBodyEnd.island';
import { Standfirst } from '../components/Standfirst';
import { StickyBottomBanner } from '../components/StickyBottomBanner.island';
import { SubMeta } from '../components/SubMeta';
import { SubNav } from '../components/SubNav.island';
import { grid } from '../grid';
import { getAgeWarning } from '../lib/age-warning';
import {
	ArticleDesign,
	ArticleDisplay,
	type ArticleFormat,
	ArticleSpecial,
} from '../lib/articleFormat';
import { canRenderAds } from '../lib/canRenderAds';
import { getContributionsServiceUrl } from '../lib/contributions';
import { decideStoryPackageTrails } from '../lib/decideTrail';
import type { EditionId } from '../lib/edition';
import { safeParseURL } from '../lib/parse';
import { parse } from '../lib/slot-machine-flags';
import { worldCupTagId } from '../lib/worldCup2026';
import type { NavType } from '../model/extract-nav';
import { palette as themePalette } from '../palette';
import type { ArticleDeprecated } from '../types/article';
import type { RenderingTarget } from '../types/renderingTarget';
import {
	type Area,
	getLayoutType,
	gridItemCss,
	type LayoutType,
} from './lib/articleArrangements';
import { BannerWrapper, Stuck } from './lib/stickiness';

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

interface GridItemProps {
	area: Area;
	layoutType: LayoutType;
	element?: 'div' | 'aside';
	className?: string;
	children: React.ReactNode;
}

const GridItem = ({
	area,
	layoutType,
	element: Element = 'div',
	className,
	children,
}: GridItemProps) => (
	<Element
		data-gu-name={area}
		css={gridItemCss(area, layoutType)}
		className={className}
	>
		{children}
	</Element>
);

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

/**
 * Works out the orientation of an image from its Guardian media URL, which
 * encodes the crop dimensions in the path (e.g. `/1000_600_800_480/`).
 * Falls back to 'landscape' if the URL doesn't match the expected pattern.
 */
const getImageOrientation = (
	url: string,
): 'portrait' | 'landscape' | 'square' => {
	const match = url.match(/\/\d+_\d+_(\d+)_(\d+)\/\d+\.\w+$/);
	if (!match) return 'landscape';
	const [, width, height] = match.map(Number);
	if (width == null || height == null) return 'landscape';
	if (height > width) return 'portrait';
	if (width > height) return 'landscape';
	return 'square';
};

export const StandardLayout = (props: WebProps | AppProps) => {
	const { article, format, renderingTarget, serverTime } = props;
	const {
		config: { isPaidContent, host, hasSurveyAd },
		editionId,
	} = article;

	const isWeb = renderingTarget === 'Web';
	const isApps = renderingTarget === 'Apps';

	const showBodyEndSlot =
		isWeb &&
		(parse(article.slotMachineFlags ?? '').showBodyEnd ||
			article.config.switches.slotBodyEnd);

	// TODO:
	// 1) Read 'forceEpic' value from URL parameter and use it to force the slot to render
	// 2) Otherwise, ensure slot only renders if `article.config.shouldHideReaderRevenue` equals false.

	const footballMatchUrl =
		article.matchType === 'FootballMatchType'
			? article.matchUrl
			: undefined;

	const footballMatchStatsUrl =
		article.matchType === 'FootballMatchType'
			? article.matchStatsUrl
			: undefined;

	const footballMatchHeaderUrl =
		article.matchType === 'FootballMatchType'
			? article.matchHeaderUrl
			: undefined;

	const footballMatchLeagueName = article.sectionLabel;
	const footballMatchLeagueUrl = `${article.guardianBaseURL}/${article.sectionUrl}`;

	const isMatchReport =
		format.design === ArticleDesign.MatchReport && !!footballMatchUrl;

	const isMedia =
		format.design === ArticleDesign.Video ||
		format.design === ArticleDesign.Audio;
	const isShowcase = format.display === ArticleDisplay.Showcase;
	const isImmersive = format.display === ArticleDisplay.Immersive;
	const isFeature = format.design === ArticleDesign.Feature;

	const isVideo = format.design === ArticleDesign.Video;

	const showComments = article.isCommentable && !isPaidContent;

	const { branding } = article.commercialProperties[article.editionId];

	const contributionsServiceUrl = getContributionsServiceUrl(article);

	const isLabs = format.theme === ArticleSpecial.Labs;

	const isWorldCup2026 = article.tags.some((tag) => tag.id === worldCupTagId);

	const renderAds = canRenderAds(article);

	const firstMainMediaElement = article.mainMediaElements[0];
	const mainMediaUrl: string | undefined =
		firstMainMediaElement?._type ===
		'model.dotcomrendering.pageElements.ImageBlockElement'
			? firstMainMediaElement.media.allImages[0]?.url
			: undefined;

	const mainMediaOrientation =
		mainMediaUrl != null ? getImageOrientation(mainMediaUrl) : 'landscape';

	const layoutType = getLayoutType({
		isImmersive,
		isFeature,
		orientation: mainMediaOrientation,
		isVideo,
		isShowcase,
	});
	const contentLayoutName = `${ArticleDisplay[format.display]}Layout`;

	const isImmersivePortrait =
		layoutType === 'immersivePortraitDefault' ||
		layoutType === 'immersivePortraitFeature';
	const isImmersiveLandscape =
		layoutType === 'immersiveLandscapeDefault' ||
		layoutType === 'immersiveLandscapeFeature';

	const ageWarning = getAgeWarning(
		article.tags,
		article.webPublicationDateDeprecated,
	);

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
				isMatchReport={isMatchReport}
				footballMatchHeaderUrl={footballMatchHeaderUrl}
				leagueName={footballMatchLeagueName}
				leagueUrl={footballMatchLeagueUrl}
				editionId={editionId}
				renderingTarget={renderingTarget}
			/>

			{isWeb && renderAds && hasSurveyAd && (
				<AdSlot position="survey" display={format.display} />
			)}

			<main data-layout={contentLayoutName}>
				{isApps && renderAds && (
					<Island priority="critical">
						<AdPortals />
					</Island>
				)}

				{/* GridItem order matters — mobile layout relies on DOM order for grid placement.
    See furnitureArrangements.ts if reordering. */}
				<article
					css={[
						css`
							background-color: ${themePalette(
								'--article-background',
							)};
						`,
						grid.container,
						grid.outerRules(),
						!isLabs &&
							layoutType !== 'portrait' &&
							css`
								${from.leftCol} {
									${grid.centreRule(
										isImmersivePortrait
											? 4
											: isImmersiveLandscape
												? 3
												: 1,
									)}
								}
							`,
						isImmersivePortrait &&
							css`
								grid-template-rows: 0.25fr 1fr auto;
							`,
						isImmersiveLandscape &&
							css`
								${from.desktop} {
									grid-template-rows: auto auto ${ageWarning
											? '130px'
											: '90px'};
								}
							`,
						layoutType === 'portrait' &&
							css`
								grid-template-rows: 0.25fr 1fr auto;
							`,
					]}
				>
					<GridItem
						area="media"
						layoutType={layoutType}
						css={
							isImmersiveLandscape
								? css`
										${from.desktop} {
											margin-left: -20px;
											margin-right: -20px;
										}
									`
								: undefined
						}
					>
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
							hideCaption={isMedia}
							shouldHideAds={article.shouldHideAds}
							contentType={article.contentType}
							contentLayout={contentLayoutName}
							articleArrangement={layoutType}
						/>
					</GridItem>
					<GridItem
						area="title"
						layoutType={layoutType}
						element="aside"
						css={css`
							z-index: 100;
						`}
					>
						<ArticleTitle
							format={format}
							tags={article.tags}
							sectionLabel={article.sectionLabel}
							sectionUrl={article.sectionUrl}
							guardianBaseURL={article.guardianBaseURL}
							isMatch={!!footballMatchUrl}
						/>
					</GridItem>
					<GridItem
						area="headline"
						layoutType={layoutType}
						css={
							layoutType === 'immersivePortraitDefault'
								? css`
										${from.desktop} {
											border-bottom: 1px solid
												${themePalette(
													'--article-border',
												)};
											border-top: 1px solid
												${themePalette(
													'--article-border',
												)};
										}
									`
								: css`
										z-index: 20;
									`
						}
					>
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
					</GridItem>
					<GridItem area="standfirst" layoutType={layoutType}>
						<Standfirst
							format={format}
							standfirst={article.standfirst}
						/>
					</GridItem>
					<GridItem
						area="meta"
						layoutType={layoutType}
						element="aside"
						css={
							layoutType === 'immersivePortraitDefault'
								? css`
										${from.leftCol} {
											margin-right: -10px;
										}
									`
								: undefined
						}
					>
						{layoutType !== 'immersivePortraitDefault' && (
							<div css={stretchLines}>
								{isWeb &&
								format.theme === ArticleSpecial.Labs &&
								format.design !== ArticleDesign.Video ? (
									<GuardianLabsLines />
								) : (
									<DecideLines
										format={format}
										color={themePalette('--article-border')}
									/>
								)}
							</div>
						)}
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
										isCommentable={article.isCommentable}
										discussionApiUrl={
											article.config.discussionApiUrl
										}
										shortUrlId={article.config.shortUrlId}
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
										source={article.config.source}
										tags={article.tags}
										primaryDateline={
											article.webPublicationDateDisplay
										}
										secondaryDateline={
											article.webPublicationSecondaryDateDisplay
										}
										webPublicationDate={
											article.webPublicationDate
										}
										isCommentable={article.isCommentable}
										discussionApiUrl={
											article.config.discussionApiUrl
										}
										shortUrlId={article.config.shortUrlId}
										mainMediaElements={
											article.mainMediaElements
										}
									/>
									{!!article.affiliateLinksDisclaimer && (
										<AffiliateDisclaimer />
									)}
								</Hide>
							</>
						) : (
							<>
								<ArticleMeta
									branding={branding}
									format={format}
									pageId={article.pageId}
									webTitle={article.webTitle}
									byline={article.byline}
									source={article.config.source}
									tags={article.tags}
									primaryDateline={
										article.webPublicationDateDisplay
									}
									secondaryDateline={
										article.webPublicationSecondaryDateDisplay
									}
									webPublicationDate={
										article.webPublicationDate
									}
									isCommentable={article.isCommentable}
									discussionApiUrl={
										article.config.discussionApiUrl
									}
									shortUrlId={article.config.shortUrlId}
									mainMediaElements={
										article.mainMediaElements
									}
								/>
								{!!article.affiliateLinksDisclaimer && (
									<AffiliateDisclaimer />
								)}
							</>
						)}
					</GridItem>
					<GridItem area="body" layoutType={layoutType}>
						{/* Only show Listen to Article button on App landscape views */}
						{isApps && (
							<Hide until="leftCol">
								{!isVideo && (
									<div
										css={css`
											margin-top: ${space[2]}px;
										`}
									>
										<Island
											priority="feature"
											defer={{ until: 'visible' }}
										>
											<ListenToArticle
												articleId={article.pageId}
											/>
										</Island>
									</div>
								)}
							</Hide>
						)}
						<ArticleContainer format={format}>
							<ArticleBody
								format={format}
								blocks={article.blocks}
								pinnedPost={article.pinnedPost}
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
								abTests={article.config.abTests}
								tableOfContents={article.tableOfContents}
								lang={article.lang}
								isRightToLeftLang={article.isRightToLeftLang}
								editionId={article.editionId}
								shouldHideAds={article.shouldHideAds}
								idApiUrl={article.config.idApiUrl}
							/>
							<MatchInfoContainer
								isMatchReport={isMatchReport}
								footballMatchStatsUrl={footballMatchStatsUrl}
							/>

							{isApps && (
								<Island
									priority="critical"
									defer={{ until: 'visible' }}
								>
									<AppsEpic />
								</Island>
							)}

							{showBodyEndSlot && (
								<Island
									priority="feature"
									defer={{ until: 'visible' }}
								>
									<SlotBodyEnd
										contentType={article.contentType}
										contributionsServiceUrl={
											contributionsServiceUrl
										}
										idApiUrl={article.config.idApiUrl}
										isMinuteArticle={
											article.pageType.isMinuteArticle
										}
										isPaidContent={
											article.pageType.isPaidContent
										}
										pageId={article.pageId}
										sectionId={article.config.section}
										shouldHideReaderRevenue={
											article.shouldHideReaderRevenue
										}
										tags={article.tags}
										renderAds={renderAds}
										isLabs={isLabs}
										articleEndSlot={
											!!article.config.switches
												.articleEndSlot
										}
										isSensitive={article.config.isSensitive}
									/>
								</Island>
							)}
							<StraightLines
								data-print-layout="hide"
								count={4}
								cssOverrides={css`
									display: block;
								`}
								color={themePalette('--straight-lines')}
							/>
							<SubMeta
								format={format}
								subMetaKeywordLinks={
									article.subMetaKeywordLinks
								}
								subMetaSectionLinks={
									article.subMetaSectionLinks
								}
								pageId={article.pageId}
								webUrl={article.webURL}
								webTitle={article.webTitle}
								showBottomSocialButtons={
									article.showBottomSocialButtons &&
									renderingTarget === 'Web'
								}
							/>
						</ArticleContainer>
					</GridItem>
					<GridItem
						area="right-column"
						layoutType={layoutType}
						css={css`
							padding-top: ${isMedia ? 0 : 6}px;
							${from.desktop} {
								padding-bottom: ${isMedia ? 41 : 0}px;
							}
						`}
					>
						<Hide until="desktop">
							<Island
								priority="feature"
								defer={{
									until: 'visible',
									// Provide a much higher value for the top margin for the intersection observer
									// This is because the most viewed would otherwise only be lazy loaded when the
									// bottom of the container intersects with the viewport
									rootMargin: '700px 100px',
								}}
							>
								<MostViewedRightWithAd
									format={format}
									isPaidContent={
										article.pageType.isPaidContent
									}
									renderAds={isWeb && renderAds}
									shouldHideReaderRevenue={
										!!article.config.shouldHideReaderRevenue
									}
								/>
							</Island>
						</Hide>
					</GridItem>
				</article>

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
					<MobileStickyContainer data-print-layout="hide" />
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
	isMatchReport,
	footballMatchHeaderUrl,
	leagueName,
	leagueUrl,
	editionId,
	renderingTarget,
}: {
	isMatchReport: boolean;
	footballMatchHeaderUrl: string | undefined;
	leagueName: string;
	leagueUrl: string;
	editionId: EditionId;
	renderingTarget: RenderingTarget;
}) => {
	if (isMatchReport && !!footballMatchHeaderUrl) {
		const parsedUrl = safeParseURL(footballMatchHeaderUrl);
		if (!parsedUrl.ok) {
			log(
				'dotcom',
				new Error(
					`Failed to parse match header URL: ${footballMatchHeaderUrl}`,
				),
			);

			return null;
		}
		return (
			<Island priority="feature" defer={{ until: 'visible' }}>
				<FootballMatchHeaderWrapper
					initialTab="report"
					leagueName={leagueName}
					leagueURL={leagueUrl}
					edition={editionId}
					matchHeaderURL={footballMatchHeaderUrl}
					renderingTarget={renderingTarget}
				/>
			</Island>
		);
	}

	return null;
};

const MatchInfoContainer = ({
	isMatchReport,
	footballMatchStatsUrl,
}: {
	isMatchReport: boolean;
	footballMatchStatsUrl: string | undefined;
}) => {
	if (isMatchReport && !!footballMatchStatsUrl) {
		const parsedUrl = safeParseURL(footballMatchStatsUrl);
		if (!parsedUrl.ok) {
			log(
				'dotcom',
				new Error(
					`Failed to parse match stats URL: ${footballMatchStatsUrl}`,
				),
			);

			return null;
		}
		return (
			<Island priority="feature" defer={{ until: 'visible' }}>
				<FootballMatchInfoWrapper
					matchStatsUrl={footballMatchStatsUrl}
				/>
			</Island>
		);
	}

	return null;
};
