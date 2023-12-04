import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign, ArticleDisplay, ArticleSpecial } from '@guardian/libs';
import {
	from,
	palette as sourcePalette,
	until,
} from '@guardian/source-foundations';
import { StraightLines } from '@guardian/source-react-components-development-kitchen';
import { AdPortals } from '../components/AdPortals.importable';
import { AdSlot, MobileStickyContainer } from '../components/AdSlot.web';
import { AppsFooter } from '../components/AppsFooter.importable';
import { AppsLightboxImageStore } from '../components/AppsLightboxImageStore.importable';
import { ArticleBody } from '../components/ArticleBody';
import { ArticleContainer } from '../components/ArticleContainer';
import { ArticleHeadline } from '../components/ArticleHeadline';
import { ArticleMeta } from '../components/ArticleMeta';
import { ArticleTitle } from '../components/ArticleTitle';
import { Border } from '../components/Border';
import { Carousel } from '../components/Carousel.importable';
import { ContributorAvatar } from '../components/ContributorAvatar';
import { DiscussionLayout } from '../components/DiscussionLayout';
import { Footer } from '../components/Footer';
import { GridItem } from '../components/GridItem';
import { Header } from '../components/Header';
import { HeaderAdSlot } from '../components/HeaderAdSlot';
import { Hide } from '../components/Hide';
import { Island } from '../components/Island';
import { MainMedia } from '../components/MainMedia';
import { MostViewedFooterData } from '../components/MostViewedFooterData.importable';
import { MostViewedFooterLayout } from '../components/MostViewedFooterLayout';
import { MostViewedRightWithAd } from '../components/MostViewedRightWithAd';
import { Nav } from '../components/Nav/Nav';
import { OnwardsUpper } from '../components/OnwardsUpper.importable';
import { RightColumn } from '../components/RightColumn';
import { Section } from '../components/Section';
import { SlotBodyEnd } from '../components/SlotBodyEnd.importable';
import { Standfirst } from '../components/Standfirst';
import { StickyBottomBanner } from '../components/StickyBottomBanner.importable';
import { SubMeta } from '../components/SubMeta';
import { SubNav } from '../components/SubNav.importable';
import { getSoleContributor } from '../lib/byline';
import { canRenderAds } from '../lib/canRenderAds';
import { getContributionsServiceUrl } from '../lib/contributions';
import { decideTrail } from '../lib/decideTrail';
import { parse } from '../lib/slot-machine-flags';
import type { NavType } from '../model/extract-nav';
import { palette as themePalette } from '../palette';
import type { DCRArticle } from '../types/frontend';
import type { RenderingTarget } from '../types/renderingTarget';
import { BannerWrapper, SendToBack, Stuck } from './lib/stickiness';

const StandardGrid = ({
	children,
	display,
}: {
	children: React.ReactNode;
	display: ArticleDisplay;
}) => (
	<div
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
					Right Column
				*/
				${from.wide} {
					grid-template-columns: 219px 1px 1fr 300px;

					${display === ArticleDisplay.Showcase
						? css`
								grid-template-areas:
									'title      border  headline    headline'
									'lines      border  headline    headline'
									'meta       border  standfirst  standfirst'
									'meta       border  media       media'
									'.          border  body        right-column'
									'.          border  .           right-column';
						  `
						: css`
								grid-template-areas:
									'title      border  headline    right-column'
									'lines      border  headline    right-column'
									'meta       border  standfirst  right-column'
									'meta       border  media       right-column'
									'.          border  body        right-column'
									'.          border  .           right-column';
						  `}
				}

				/*
					Explanation of each unit of grid-template-columns

					Left Column (220 - 1px border)
					Vertical grey border
					Main content
					Right Column
				*/
				${until.wide} {
					grid-template-columns: 140px 1px 1fr 300px;

					${display === ArticleDisplay.Showcase
						? css`
								grid-template-areas:
									'title      border  headline    headline'
									'lines      border  headline    headline'
									'meta       border  standfirst  standfirst'
									'meta       border  media       media'
									'.          border  body        right-column'
									'.          border  .           right-column';
						  `
						: css`
								grid-template-areas:
									'title      border  headline    right-column'
									'lines      border  headline    right-column'
									'meta       border  standfirst  right-column'
									'meta       border  media       right-column'
									'.          border  body        right-column'
									'.          border  .           right-column';
						  `}
				}

				/*
					Explanation of each unit of grid-template-columns

					Main content
					Right Column
				*/
				${until.leftCol} {
					grid-template-columns: 1fr 300px;
					grid-template-areas:
						'title      right-column'
						'headline   right-column'
						'standfirst right-column'
						'meta       right-column'
						'media      right-column'
						'body       right-column'
						'.          right-column';
				}

				${until.desktop} {
					grid-column-gap: 0px;
					grid-template-columns: 1fr; /* Main content */
					grid-template-areas:
						'title'
						'headline'
						'standfirst'
						'meta'
						'media'
						'body';
				}

				${until.tablet} {
					grid-column-gap: 0px;

					grid-template-columns: 1fr; /* Main content */
					grid-template-areas:
						'title'
						'headline'
						'standfirst'
						'meta'
						'media'
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

const avatarHeadlineWrapper = css`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const minHeightWithAvatar = css`
	min-height: 259px;
`;

// If in mobile increase the margin top and margin right deficit
const avatarPositionStyles = css`
	display: flex;
	justify-content: flex-end;
	position: relative;
	margin-bottom: -29px;
	margin-top: -50px;
	pointer-events: none;
	${until.tablet} {
		overflow: hidden;
	}

	/*  Why target img element?

        Because only in this context, where we have overflow: hidden
        and the margin-bottom and margin-top of avatarPositionStyles
        do we also want to apply our margin-right. These styles
        are tightly coupled in this context, and so it does not
        make sense to move them to the avatar component.

        It's imperfect from the perspective of DCR, the alternative is to bust
        the combined elements into a separate component (with the
        relevant stories) and couple them that way, which might be what
        you want to do if you find yourself adding more styles
        to this section. For now, this works without making me 🤢.
    */

	${from.mobile} {
		img {
			margin-right: -1.85rem;
		}
	}
	${from.mobileLandscape} {
		img {
			margin-right: -1.25rem;
		}
	}
`;

const pushToBottom = css`
	display: flex;
	height: 100%;
	flex-direction: column;
	justify-content: flex-end;
`;

const mainMediaWrapper = css`
	position: relative;
`;

interface CommonProps {
	article: DCRArticle;
	format: ArticleFormat;
	renderingTarget: RenderingTarget;
}

interface WebProps extends CommonProps {
	NAV: NavType;
	renderingTarget: 'Web';
}

interface AppsProps extends CommonProps {
	renderingTarget: 'Apps';
}

export const CommentLayout = (props: WebProps | AppsProps) => {
	const { article, format, renderingTarget } = props;
	const isWeb = renderingTarget === 'Web';
	const isApps = renderingTarget === 'Apps';
	const {
		config: { isPaidContent, host },
	} = article;

	const showBodyEndSlot =
		isWeb &&
		(parse(article.slotMachineFlags ?? '').showBodyEnd ||
			article.config.switches.slotBodyEnd);

	// TODO:
	// 1) Read 'forceEpic' value from URL parameter and use it to force the slot to render
	// 2) Otherwise, ensure slot only renders if `article.config.shouldHideReaderRevenue` equals false.

	/** Mobile articles with comments should be filtered in MAPI but we leave this in for clarity **/
	const showComments = isWeb && article.isCommentable && !isPaidContent;

	const avatarUrl = getSoleContributor(article.tags, article.byline)
		?.bylineLargeImageUrl;

	const { branding } = article.commercialProperties[article.editionId];

	const contributionsServiceUrl = getContributionsServiceUrl(article);

	const renderAds = isWeb && canRenderAds(article);

	return (
		<>
			{isWeb && (
				<div id="bannerandheader">
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

					<SendToBack>
						{format.theme !== ArticleSpecial.Labs && (
							<Section
								fullWidth={true}
								shouldCenter={false}
								showTopBorder={false}
								showSideBorders={false}
								padSides={false}
								backgroundColour={sourcePalette.brand[400]}
								element="header"
							>
								<Header
									editionId={article.editionId}
									idUrl={article.config.idUrl}
									mmaUrl={article.config.mmaUrl}
									discussionApiUrl={
										article.config.discussionApiUrl
									}
									urls={article.nav.readerRevenueLinks.header}
									remoteHeader={
										!!article.config.switches.remoteHeader
									}
									contributionsServiceUrl={
										contributionsServiceUrl
									}
									idApiUrl={article.config.idApiUrl}
									headerTopBarSearchCapiSwitch={
										!!article.config.switches
											.headerTopBarSearchCapi
									}
								/>
							</Section>
						)}

						<Section
							fullWidth={true}
							borderColour={sourcePalette.brand[600]}
							showTopBorder={false}
							padSides={false}
							backgroundColour={sourcePalette.brand[400]}
							element="nav"
						>
							<Nav
								nav={props.NAV}
								isImmersive={
									format.display === ArticleDisplay.Immersive
								}
								displayRoundel={
									format.display ===
										ArticleDisplay.Immersive ||
									format.theme === ArticleSpecial.Labs
								}
								selectedPillar={props.NAV.selectedPillar}
								subscribeUrl={
									article.nav.readerRevenueLinks.header
										.subscribe
								}
								editionId={article.editionId}
								headerTopBarSwitch={
									!!article.config.switches.headerTopNav
								}
							/>
						</Section>

						{props.NAV.subNavSections && (
							<Section
								fullWidth={true}
								backgroundColour={themePalette(
									'--article-background',
								)}
								padSides={false}
								element="aside"
							>
								<Island
									priority="enhancement"
									defer={{ until: 'idle' }}
								>
									<SubNav
										subNavSections={
											props.NAV.subNavSections
										}
										currentNavLink={
											props.NAV.currentNavLink
										}
										linkHoverColour={themePalette(
											'--article-link-text-hover',
										)}
										borderColour={themePalette(
											'--sub-nav-border',
										)}
									/>
								</Island>
							</Section>
						)}

						<Section
							fullWidth={true}
							backgroundColour={themePalette(
								'--article-background',
							)}
							padSides={false}
							showTopBorder={false}
						>
							<StraightLines
								count={4}
								cssOverrides={css`
									display: block;
								`}
								color={themePalette('--straight-lines')}
							/>
						</Section>
					</SendToBack>
				</div>
			)}

			<main data-layout="CommentLayout">
				{isApps && (
					<>
						<Island priority="critical">
							<AdPortals />
						</Island>
						<Island priority="feature" defer={{ until: 'idle' }}>
							<AppsLightboxImageStore
								images={article.imagesForAppsLightbox}
							/>
						</Island>
					</>
				)}
				<Section
					fullWidth={true}
					showTopBorder={false}
					backgroundColour={themePalette('--article-background')}
					element="article"
				>
					<StandardGrid display={format.display}>
						<GridItem area="media">
							<div
								css={
									format.display === ArticleDisplay.Showcase
										? mainMediaWrapper
										: maxWidth
								}
							>
								<MainMedia
									format={format}
									elements={article.mainMediaElements}
									starRating={
										format.design ===
											ArticleDesign.Review &&
										article.starRating !== undefined
											? article.starRating
											: undefined
									}
									host={host}
									pageId={article.pageId}
									webTitle={article.webTitle}
									ajaxUrl={article.config.ajaxUrl}
									switches={article.config.switches}
									isAdFreeUser={article.isAdFreeUser}
									isSensitive={article.config.isSensitive}
								/>
							</div>
						</GridItem>
						<GridItem area="title" element="aside">
							<ArticleTitle
								format={format}
								tags={article.tags}
								sectionLabel={article.sectionLabel}
								sectionUrl={article.sectionUrl}
								guardianBaseURL={article.guardianBaseURL}
								badge={article.badge?.enhanced}
							/>
						</GridItem>
						<GridItem area="border">
							<Border />
						</GridItem>
						<GridItem area="headline">
							<div css={maxWidth}>
								<div
									css={[
										avatarHeadlineWrapper,
										avatarUrl && minHeightWithAvatar,
									]}
								>
									{/* TOP - we position content in groups here using flex */}
									<ArticleHeadline
										format={format}
										headlineString={article.headline}
										tags={article.tags}
										byline={article.byline}
										webPublicationDateDeprecated={
											article.webPublicationDateDeprecated
										}
										hasStarRating={
											typeof article.starRating ===
											'number'
										}
										hasAvatar={!!avatarUrl}
									/>
									{/* BOTTOM */}
									<div>
										{!!avatarUrl && (
											<div css={avatarPositionStyles}>
												<ContributorAvatar
													imageSrc={avatarUrl}
													imageAlt={
														article.byline ?? ''
													}
												/>
											</div>
										)}
										<StraightLines
											count={8}
											cssOverrides={css`
												display: block;
											`}
											color={themePalette(
												'--straight-lines',
											)}
										/>
									</div>
								</div>
							</div>
						</GridItem>
						<GridItem area="lines">
							<div css={pushToBottom}>
								<Hide when="below" breakpoint="desktop">
									<StraightLines
										count={8}
										cssOverrides={css`
											display: block;
										`}
										color={themePalette('--straight-lines')}
									/>
								</Hide>
							</div>
						</GridItem>
						<GridItem area="standfirst">
							<Standfirst
								format={format}
								standfirst={article.standfirst}
							/>
						</GridItem>
						<GridItem area="meta" element="aside">
							<div css={maxWidth}>
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
									isCommentable={showComments}
									discussionApiUrl={
										article.config.discussionApiUrl
									}
									shortUrlId={article.config.shortUrlId}
									ajaxUrl={article.config.ajaxUrl}
								/>
							</div>
						</GridItem>
						<GridItem area="body">
							<ArticleContainer format={format}>
								<div css={maxWidth}>
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
										isPaidContent={
											!!article.config.isPaidContent
										}
										contributionsServiceUrl={
											contributionsServiceUrl
										}
										contentType={article.contentType}
										isPreview={article.config.isPreview}
										idUrl={article.config.idUrl ?? ''}
										isDev={!!article.config.isDev}
										keywordIds={article.config.keywordIds}
										abTests={article.config.abTests}
										tableOfContents={
											article.tableOfContents
										}
										lang={article.lang}
										isRightToLeftLang={
											article.isRightToLeftLang
										}
									/>
									{showBodyEndSlot && (
										<Island
											priority="feature"
											defer={{ until: 'visible' }}
										>
											<SlotBodyEnd
												contentType={
													article.contentType
												}
												contributionsServiceUrl={
													contributionsServiceUrl
												}
												idApiUrl={
													article.config.idApiUrl
												}
												isMinuteArticle={
													article.pageType
														.isMinuteArticle
												}
												isPaidContent={
													article.pageType
														.isPaidContent
												}
												keywordIds={
													article.config.keywordIds
												}
												pageId={article.pageId}
												sectionId={
													article.config.section
												}
												shouldHideReaderRevenue={
													article.shouldHideReaderRevenue
												}
												stage={article.config.stage}
												tags={article.tags}
												renderAds={renderAds}
												isLabs={false}
												articleEndSlot={
													!!article.config.switches
														.articleEndSlot
												}
											/>
										</Island>
									)}
									<StraightLines
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
											isWeb
										}
										badge={article.badge?.enhanced}
									/>
								</div>
							</ArticleContainer>
						</GridItem>
						<GridItem area="right-column">
							<div
								css={css`
									padding-top: 6px;
									height: 100%;
									${from.desktop} {
										/* above 980 */
										margin-left: 20px;
										margin-right: -20px;
									}
									${from.leftCol} {
										/* above 1140 */
										margin-left: 0px;
										margin-right: 0px;
									}
								`}
							>
								<RightColumn>
									<MostViewedRightWithAd
										display={format.display}
										isPaidContent={
											article.pageType.isPaidContent
										}
										renderAds={renderAds}
									/>
								</RightColumn>
							</div>
						</GridItem>
					</StandardGrid>
				</Section>

				{renderAds && (
					<Section
						fullWidth={true}
						padSides={false}
						showTopBorder={false}
						showSideBorders={false}
						backgroundColour={sourcePalette.neutral[97]}
						element="aside"
					>
						<AdSlot
							position="merchandising-high"
							display={format.display}
						/>
					</Section>
				)}

				{article.storyPackage && (
					<Section
						fullWidth={true}
						backgroundColour={themePalette('--article-background')}
						borderColour={themePalette('--article-border')}
					>
						<Island priority="feature" defer={{ until: 'visible' }}>
							<Carousel
								heading={article.storyPackage.heading}
								trails={article.storyPackage.trails.map(
									decideTrail,
								)}
								onwardsSource="more-on-this-story"
								format={format}
								leftColSize={'compact'}
								discussionApiUrl={
									article.config.discussionApiUrl
								}
							/>
						</Island>
					</Section>
				)}

				{isWeb && (
					<Island priority="feature" defer={{ until: 'visible' }}>
						<OnwardsUpper
							ajaxUrl={article.config.ajaxUrl}
							hasRelated={article.hasRelated}
							hasStoryPackage={article.hasStoryPackage}
							isAdFreeUser={article.isAdFreeUser}
							pageId={article.pageId}
							isPaidContent={!!article.config.isPaidContent}
							showRelatedContent={
								article.config.showRelatedContent
							}
							keywordIds={article.config.keywordIds}
							contentType={article.contentType}
							tags={article.tags}
							format={format}
							pillar={format.theme}
							editionId={article.editionId}
							shortUrlId={article.config.shortUrlId}
							discussionApiUrl={article.config.discussionApiUrl}
						/>
					</Island>
				)}

				{showComments && (
					<Section
						fullWidth={true}
						sectionId="comments"
						element="aside"
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
						data-print-layout="hide"
						data-link-name="most-popular"
						data-component="most-popular"
						backgroundColour={themePalette(
							'--article-section-background',
						)}
						borderColour={themePalette('--article-border')}
						fontColour={themePalette('--article-section-title')}
					>
						<MostViewedFooterLayout renderAds={renderAds}>
							<Island
								priority="feature"
								defer={{ until: 'visible' }}
							>
								<MostViewedFooterData
									sectionId={article.config.section}
									format={format}
									ajaxUrl={article.config.ajaxUrl}
									edition={article.editionId}
								/>
							</Island>
						</MostViewedFooterLayout>
					</Section>
				)}

				{renderAds && (
					<Section
						fullWidth={true}
						padSides={false}
						showTopBorder={false}
						showSideBorders={false}
						backgroundColour={sourcePalette.neutral[97]}
						element="aside"
					>
						<AdSlot
							position="merchandising"
							display={format.display}
						/>
					</Section>
				)}
			</main>

			{isWeb && props.NAV.subNavSections && (
				<Section fullWidth={true} padSides={false} element="aside">
					<Island priority="enhancement" defer={{ until: 'visible' }}>
						<SubNav
							subNavSections={props.NAV.subNavSections}
							currentNavLink={props.NAV.currentNavLink}
							linkHoverColour={themePalette(
								'--article-link-text-hover',
							)}
							borderColour={themePalette('--sub-nav-border')}
						/>
					</Island>
				</Section>
			)}
			{isWeb && !isPaidContent && (
				<>
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
							urls={article.nav.readerRevenueLinks.header}
							editionId={article.editionId}
							contributionsServiceUrl={
								article.contributionsServiceUrl
							}
						/>
					</Section>

					<BannerWrapper>
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
								keywordIds={article.config.keywordIds}
								pageId={article.pageId}
								sectionId={article.config.section}
								shouldHideReaderRevenue={
									article.shouldHideReaderRevenue
								}
								remoteBannerSwitch={
									!!article.config.switches.remoteBanner
								}
								puzzleBannerSwitch={
									!!article.config.switches.puzzlesBanner
								}
								tags={article.tags}
							/>
						</Island>
					</BannerWrapper>
					<MobileStickyContainer />
				</>
			)}
			{isApps && (
				<Section
					fullWidth={true}
					data-print-layout="hide"
					backgroundColour={themePalette('--apps-footer-background')}
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
