import { css, Global, type SerializedStyles } from '@emotion/react';
import {
	from,
	palette as sourcePalette,
	space,
	until,
} from '@guardian/source/foundations';
import { Hide } from '@guardian/source/react-components';
import { StraightLines } from '@guardian/source-development-kitchen/react-components';
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
import { Border } from '../components/Border';
import { Carousel } from '../components/Carousel.island';
import { DecideLines } from '../components/DecideLines';
import { DirectoryPageNavIsland } from '../components/DirectoryPageNavIsland';
import { DiscussionLayout } from '../components/DiscussionLayout';
import { Footer } from '../components/Footer';
import { GridItem as DeprecatedGridItem } from '../components/GridItem';
import { GuardianLabsLines } from '../components/GuardianLabsLines';
import { HeaderAdSlot } from '../components/HeaderAdSlot';
import { InteractivesDisableArticleSwipe } from '../components/InteractivesDisableArticleSwipe.island';
import { InteractivesNativePlatformWrapper } from '../components/InteractivesNativePlatformWrapper.island';
import { InteractivesScrollbarWidth } from '../components/InteractivesScrollbarWidth.island';
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
import {
	ArticleDesign,
	type ArticleFormat,
	ArticleSpecial,
} from '../lib/articleFormat';
import { canRenderAds } from '../lib/canRenderAds';
import { getContributionsServiceUrl } from '../lib/contributions';
import { decideStoryPackageTrails } from '../lib/decideTrail';
import { parse } from '../lib/slot-machine-flags';
import type { NavType } from '../model/extract-nav';
import { palette as themePalette } from '../palette';
import type { ArticleDeprecated } from '../types/article';
import type { RoleType } from '../types/content';
import type { RenderingTarget } from '../types/renderingTarget';
import {
	interactiveGlobalStyles,
	interactiveLegacyClasses,
} from './lib/interactiveLegacyStyling';
import {
	type Area,
	gridItemCss,
	type LayoutType,
} from './lib/furnitureArrangements';
import { BannerWrapper, Stuck } from './lib/stickiness';
import { Branding } from '../types/branding';

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

// ---------------------------------------------------------------------------
// New grid (post-switchover articles)
// ---------------------------------------------------------------------------

interface GridItemProps {
	area: Area;
	layoutType: LayoutType;
	element?: 'div' | 'aside';
	customCss?: SerializedStyles;
	children: React.ReactNode;
}

const GridItem = ({
	area,
	layoutType,
	element: Element = 'div',
	customCss,
	children,
}: GridItemProps) => (
	<Element
		data-gu-name={area}
		css={[gridItemCss(area, layoutType), customCss]}
	>
		{children}
	</Element>
);

interface NewArticleGridProps {
	article: ArticleDeprecated;
	format: ArticleFormat;
	branding: Branding | undefined;
	contributionsServiceUrl: string;
	isApps: boolean;
	isWeb: boolean;
	renderAds: boolean;
	showBodyEndSlot: boolean;
	host: string | undefined;
}

const ArticleGrid = ({
	article,
	format,
	branding,
	contributionsServiceUrl,
	isApps,
	isWeb,
	renderAds,
	showBodyEndSlot,
	host,
}: NewArticleGridProps) => (
	/* GridItem order matters — mobile layout relies on DOM order for grid placement.
	   See furnitureArrangements.ts if reordering. */
	<article
		css={[
			css`
				background-color: ${themePalette('--article-background')};
			`,
			grid.container,
			grid.verticalRules({ centre: true }),
		]}
	>
		<GridItem area="main-media" layoutType="standard">
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
				hideCaption={false}
				shouldHideAds={article.shouldHideAds}
				contentType={article.contentType}
				contentLayout="InteractiveLayout"
			/>
		</GridItem>
		<GridItem area="title" layoutType="standard" element="aside">
			<ArticleTitle
				format={format}
				tags={article.tags}
				sectionLabel={article.sectionLabel}
				sectionUrl={article.sectionUrl}
				guardianBaseURL={article.guardianBaseURL}
				isMatch={false}
			/>
		</GridItem>
		<GridItem area="headline" layoutType="standard">
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
		<GridItem area="standfirst" layoutType="standard">
			<Standfirst format={format} standfirst={article.standfirst} />
		</GridItem>
		<GridItem area="meta" layoutType="standard" element="aside">
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
			{isApps ? (
				<>
					<Hide from="leftCol">
						<ArticleMetaApps
							branding={branding}
							format={format}
							byline={article.byline}
							tags={article.tags}
							primaryDateline={article.webPublicationDateDisplay}
							secondaryDateline={
								article.webPublicationSecondaryDateDisplay
							}
							isCommentable={article.isCommentable}
							discussionApiUrl={article.config.discussionApiUrl}
							shortUrlId={article.config.shortUrlId}
							pageId={article.config.pageId}
						/>
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
							primaryDateline={article.webPublicationDateDisplay}
							secondaryDateline={
								article.webPublicationSecondaryDateDisplay
							}
							isCommentable={article.isCommentable}
							discussionApiUrl={article.config.discussionApiUrl}
							shortUrlId={article.config.shortUrlId}
							mainMediaElements={article.mainMediaElements}
						/>
						{!!article.affiliateLinksDisclaimer && (
							<AffiliateDisclaimer />
						)}
					</Hide>
				</>
			) : (
				<ArticleMeta
					branding={branding}
					format={format}
					pageId={article.pageId}
					webTitle={article.webTitle}
					byline={article.byline}
					source={article.config.source}
					tags={article.tags}
					primaryDateline={article.webPublicationDateDisplay}
					secondaryDateline={
						article.webPublicationSecondaryDateDisplay
					}
					isCommentable={article.isCommentable}
					discussionApiUrl={article.config.discussionApiUrl}
					shortUrlId={article.config.shortUrlId}
					mainMediaElements={article.mainMediaElements}
				/>
			)}
		</GridItem>
		<GridItem area="body" layoutType="standard">
			{/* Only show Listen to Article button on App landscape views */}
			{isApps && (
				<Hide until="leftCol">
					<div
						css={css`
							margin-top: ${space[2]}px;
						`}
					>
						<Island priority="feature" defer={{ until: 'visible' }}>
							<ListenToArticle articleId={article.pageId} />
						</Island>
					</div>
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
					shouldHideReaderRevenue={article.shouldHideReaderRevenue}
					tags={article.tags}
					isPaidContent={!!article.config.isPaidContent}
					contributionsServiceUrl={contributionsServiceUrl}
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

				{isApps && (
					<Island priority="critical" defer={{ until: 'visible' }}>
						<AppsEpic />
					</Island>
				)}

				{showBodyEndSlot && (
					<Island priority="feature" defer={{ until: 'visible' }}>
						<SlotBodyEnd
							contentType={article.contentType}
							contributionsServiceUrl={contributionsServiceUrl}
							idApiUrl={article.config.idApiUrl}
							isMinuteArticle={article.pageType.isMinuteArticle}
							isPaidContent={article.pageType.isPaidContent}
							pageId={article.pageId}
							sectionId={article.config.section}
							shouldHideReaderRevenue={
								article.shouldHideReaderRevenue
							}
							tags={article.tags}
							renderAds={renderAds}
							isLabs={false}
							articleEndSlot={
								!!article.config.switches.articleEndSlot
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
					subMetaKeywordLinks={article.subMetaKeywordLinks}
					subMetaSectionLinks={article.subMetaSectionLinks}
					pageId={article.pageId}
					webUrl={article.webURL}
					webTitle={article.webTitle}
					showBottomSocialButtons={
						article.showBottomSocialButtons && isWeb
					}
				/>
			</ArticleContainer>
		</GridItem>
		<GridItem
			area="right-column"
			layoutType="standard"
			customCss={css`
				padding-top: 6px;
				padding-bottom: 0px;
			`}
		>
			<Hide until="desktop">
				<Island
					priority="feature"
					defer={{
						until: 'visible',
						rootMargin: '700px 100px',
					}}
				>
					<MostViewedRightWithAd
						format={format}
						isPaidContent={article.pageType.isPaidContent}
						renderAds={isWeb && renderAds}
						shouldHideReaderRevenue={
							!!article.config.shouldHideReaderRevenue
						}
					/>
				</Island>
			</Hide>
		</GridItem>
	</article>
);

// ---------------------------------------------------------------------------
// Main layout
// ---------------------------------------------------------------------------

interface CommonProps {
	article: ArticleDeprecated;
	format: ArticleFormat;
	renderingTarget: RenderingTarget;
	serverTime?: number;
	useDeprecatedGrid?: boolean;
}

interface WebProps extends CommonProps {
	NAV: NavType;
	renderingTarget: 'Web';
}

interface AppsProps extends CommonProps {
	renderingTarget: 'Apps';
}

export const InteractiveLayout = (props: WebProps | AppsProps) => {
	const { article, format, renderingTarget, serverTime, useDeprecatedGrid } =
		props;
	const {
		config: { isPaidContent, host, hasSurveyAd },
		editionId,
	} = article;

	const isApps = renderingTarget === 'Apps';
	const isWeb = renderingTarget === 'Web';

	const showBodyEndSlot =
		isWeb &&
		((parse(article.slotMachineFlags ?? '').showBodyEnd ||
			article.config.switches.slotBodyEnd) ??
			false);

	const showComments = article.isCommentable && !isPaidContent;

	const { branding } = article.commercialProperties[article.editionId];

	const contributionsServiceUrl = getContributionsServiceUrl(article);

	const renderAds = canRenderAds(article);

	const includesFullWidthElement = article.blocks.some((block) =>
		block.elements.some((element) => {
			const role =
				'role' in element
					? (element.role as RoleType | 'fullWidth' | undefined)
					: undefined;
			return role === 'fullWidth';
		}),
	);

	return (
		<>
			{includesFullWidthElement && (
				<Island priority="critical">
					<InteractivesScrollbarWidth />
				</Island>
			)}
			{isApps && (
				<>
					<Island priority="critical">
						<InteractivesNativePlatformWrapper />
					</Island>
					<Island priority="critical">
						<InteractivesDisableArticleSwipe />
					</Island>
					{useDeprecatedGrid && (
						<Global styles={temporaryBodyCopyColourOverride} />
					)}
				</>
			)}
			{useDeprecatedGrid && article.isLegacyInteractive && (
				<Global styles={interactiveGlobalStyles} />
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
						showSubNav={!useDeprecatedGrid}
						showSlimNav={useDeprecatedGrid}
						hasPageSkin={useDeprecatedGrid ? false : undefined}
						hasPageSkinContentSelfConstrain={!useDeprecatedGrid}
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
						element={useDeprecatedGrid ? undefined : 'aside'}
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

				{useDeprecatedGrid ? (
					<DeprecatedArticleGrid
						article={article}
						format={format}
						branding={branding}
						contributionsServiceUrl={contributionsServiceUrl}
						isApps={isApps}
						host={host}
					/>
				) : (
					<ArticleGrid
						article={article}
						format={format}
						branding={branding}
						contributionsServiceUrl={contributionsServiceUrl}
						isApps={isApps}
						isWeb={isWeb}
						renderAds={renderAds}
						showBodyEndSlot={showBodyEndSlot}
						host={host}
					/>
				)}

				{/* SlotBodyEnd is handled inside NewArticleGrid for the new layout.
				    For the deprecated layout it lives here, matching the original structure. */}
				{useDeprecatedGrid && (
					<Section
						stretchRight={false}
						showTopBorder={false}
						backgroundColour={themePalette('--article-background')}
						borderColour={themePalette('--article-border')}
						fontColour={themePalette('--article-section-title')}
						padContent={false}
						verticalMargins={false}
					>
						<div
							css={css`
								max-width: 620px;
							`}
						>
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
									renderAds={isWeb && renderAds}
									isLabs={false}
									articleEndSlot={
										!!article.config.switches.articleEndSlot
									}
									isSensitive={article.config.isSensitive}
								/>
							</Island>
						</div>
					</Section>
				)}

				{useDeprecatedGrid && (
					<>
						<Section
							fullWidth={true}
							showTopBorder={false}
							padSides={false}
							backgroundColour={themePalette(
								'--article-background',
							)}
						>
							<StraightLines
								count={4}
								data-print-layout="hide"
								color={themePalette('--straight-lines')}
								cssOverrides={css`
									display: block;
								`}
							/>
						</Section>
						<Section
							fullWidth={true}
							showTopBorder={false}
							backgroundColour={themePalette(
								'--article-background',
							)}
						>
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
									article.showBottomSocialButtons && isWeb
								}
							/>
						</Section>
					</>
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
						showTopBorder={false}
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
						fontColour={
							useDeprecatedGrid
								? themePalette('--article-section-title')
								: undefined
						}
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
								host={useDeprecatedGrid ? undefined : host}
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
				<Section
					fullWidth={true}
					backgroundColour={
						useDeprecatedGrid
							? themePalette('--apps-footer-background')
							: themePalette('--ad-background')
					}
					borderColour={themePalette('--article-border')}
					padSides={false}
					showSideBorders={false}
					element="footer"
				>
					<Island priority="critical">
						<AppsFooter />
					</Island>
				</Section>
			)}
		</>
	);
};

// Temporary override until deprecated interactive articles are migrated to the
// new grid. Can be removed once useDeprecatedGrid is no longer needed.
export const temporaryBodyCopyColourOverride = css`
	.content__main-column--interactive p {
		/* stylelint-disable-next-line declaration-no-important */
		color: ${themePalette('--article-text')} !important;
	}
`;

// ---------------------------------------------------------------------------
// Deprecated grid (pre-switchover articles)
// ---------------------------------------------------------------------------

const deprecatedMaxWidth = css`
	${from.desktop} {
		max-width: 620px;
	}
`;

const DeprecatedInteractiveGridWrapper = ({
	children,
}: {
	children: React.ReactNode;
}) => (
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
					grid-template-columns: 100%;
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
					grid-template-columns: 100%;
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
					grid-template-columns: 100%;
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

interface DeprecatedArticleGridProps {
	article: ArticleDeprecated;
	format: ArticleFormat;
	branding: Branding | undefined;
	contributionsServiceUrl: string;
	isApps: boolean;
	host: string | undefined;
}

const DeprecatedArticleGrid = ({
	article,
	format,
	branding,
	contributionsServiceUrl,
	isApps,
	host,
}: DeprecatedArticleGridProps) => (
	<Section
		fullWidth={true}
		showTopBorder={false}
		backgroundColour={themePalette('--article-background')}
		borderColour={themePalette('--article-border')}
		element="article"
		className={interactiveLegacyClasses.contentInteractive}
	>
		<div className={interactiveLegacyClasses.contentInteractive}>
			<DeprecatedInteractiveGridWrapper>
				<DeprecatedGridItem area="media">
					<div css={deprecatedMaxWidth}>
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
				</DeprecatedGridItem>
				<DeprecatedGridItem area="title" element="aside">
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
				</DeprecatedGridItem>
				<DeprecatedGridItem area="border">
					{format.theme === ArticleSpecial.Labs ? <></> : <Border />}
				</DeprecatedGridItem>
				<DeprecatedGridItem area="headline">
					<div css={deprecatedMaxWidth}>
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
				</DeprecatedGridItem>
				<DeprecatedGridItem area="standfirst">
					<Standfirst
						format={format}
						standfirst={article.standfirst}
					/>
				</DeprecatedGridItem>
				<DeprecatedGridItem area="lines">
					<div css={deprecatedMaxWidth}>
						<div css={stretchLines}>
							<DecideLines
								format={format}
								color={themePalette('--article-meta-lines')}
							/>
						</div>
					</div>
				</DeprecatedGridItem>
				<DeprecatedGridItem area="meta" element="aside">
					<div css={deprecatedMaxWidth}>
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
									/>
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
										isCommentable={article.isCommentable}
										discussionApiUrl={
											article.config.discussionApiUrl
										}
										shortUrlId={article.config.shortUrlId}
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
				</DeprecatedGridItem>
				<DeprecatedGridItem area="body" element="article">
					<ArticleContainer format={format}>
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
							contributionsServiceUrl={contributionsServiceUrl}
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
					</ArticleContainer>
				</DeprecatedGridItem>
			</DeprecatedInteractiveGridWrapper>
		</div>
	</Section>
);
