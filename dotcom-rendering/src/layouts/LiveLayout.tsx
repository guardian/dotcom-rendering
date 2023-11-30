import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign } from '@guardian/libs';
import {
	from,
	palette as sourcePalette,
	space,
	until,
} from '@guardian/source-foundations';
import { Hide } from '@guardian/source-react-components';
import { StraightLines } from '@guardian/source-react-components-development-kitchen';
import { Accordion } from '../components/Accordion';
import { RightAdsPlaceholder } from '../components/AdPlaceholder.apps';
import { AdPortals } from '../components/AdPortals.importable';
import { AdSlot, MobileStickyContainer } from '../components/AdSlot.web';
import { AppsFooter } from '../components/AppsFooter.importable';
import { AppsLightboxImageStore } from '../components/AppsLightboxImageStore.importable';
import { ArticleBody } from '../components/ArticleBody';
import { ArticleContainer } from '../components/ArticleContainer';
import { ArticleHeadline } from '../components/ArticleHeadline';
import { ArticleLastUpdated } from '../components/ArticleLastUpdated';
import { ArticleMeta } from '../components/ArticleMeta';
import { ArticleTitle } from '../components/ArticleTitle';
import { Carousel } from '../components/Carousel.importable';
import { DecideLines } from '../components/DecideLines';
import { DiscussionLayout } from '../components/DiscussionLayout';
import { FilterKeyEventsToggle } from '../components/FilterKeyEventsToggle.importable';
import { Footer } from '../components/Footer';
import { GetCricketScoreboard } from '../components/GetCricketScoreboard.importable';
import { GetMatchNav } from '../components/GetMatchNav.importable';
import { GetMatchStats } from '../components/GetMatchStats.importable';
import { GetMatchTabs } from '../components/GetMatchTabs.importable';
import { GridItem } from '../components/GridItem';
import { Header } from '../components/Header';
import { HeaderAdSlot } from '../components/HeaderAdSlot';
import { Island } from '../components/Island';
import { KeyEventsCarousel } from '../components/KeyEventsCarousel.importable';
import { Liveness } from '../components/Liveness.importable';
import { MainMedia } from '../components/MainMedia';
import { MostViewedFooterData } from '../components/MostViewedFooterData.importable';
import { MostViewedFooterLayout } from '../components/MostViewedFooterLayout';
import { Nav } from '../components/Nav/Nav';
import { OnwardsUpper } from '../components/OnwardsUpper.importable';
import { Pagination } from '../components/Pagination';
import { RightColumn } from '../components/RightColumn';
import { Section } from '../components/Section';
import { Standfirst } from '../components/Standfirst';
import { StarRating } from '../components/StarRating/StarRating';
import { StickyBottomBanner } from '../components/StickyBottomBanner.importable';
import { SubMeta } from '../components/SubMeta';
import { SubNav } from '../components/SubNav.importable';
import {
	hasRelevantTopics,
	TopicFilterBank,
} from '../components/TopicFilterBank';
import { canRenderAds } from '../lib/canRenderAds';
import { getContributionsServiceUrl } from '../lib/contributions';
import { decideTrail } from '../lib/decideTrail';
import { getZIndex } from '../lib/getZIndex';
import type { NavType } from '../model/extract-nav';
import { palette as themePalette } from '../palette';
import type { DCRArticle } from '../types/frontend';
import type { RenderingTarget } from '../types/renderingTarget';
import { BannerWrapper, SendToBack, Stuck } from './lib/stickiness';

const HeadlineGrid = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			/* IE Fallback */
			display: flex;
			flex-direction: column;
			${until.desktop} {
				margin-left: 0px;
			}
			${from.desktop} {
				margin-left: 240px;
			}
			@supports (display: grid) {
				display: grid;
				width: 100%;
				margin-left: 0;
				grid-column-gap: 20px;
				/*
					Explanation of each unit of grid-template-columns
					Main content
					Right Column
				*/
				${from.desktop} {
					grid-template-columns: 220px 1fr;
					grid-template-areas: 'title	headline';
				}
				${until.desktop} {
					grid-template-columns: 1fr; /* Main content */
					grid-template-areas:
						'title'
						'headline';
				}
				${until.tablet} {
					grid-column-gap: 0px;
				}
			}
		`}
	>
		{children}
	</div>
);

const StandFirstGrid = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			/* IE Fallback */
			display: flex;
			flex-direction: column;
			${until.desktop} {
				margin-left: 0px;
			}
			${from.desktop} {
				margin-left: 240px;
			}
			@supports (display: grid) {
				display: grid;
				width: 100%;
				margin-left: 0;
				grid-column-gap: 20px;
				${until.desktop} {
					grid-template-columns: 1fr; /* Main content */
					grid-template-areas:
						'standfirst'
						'lines'
						'meta';
					grid-column-gap: 0px;
				}
				${from.desktop} {
					grid-template-columns: 220px 1fr;
					grid-template-areas: 'lastupdated standfirst';
				}
			}
		`}
	>
		{children}
	</div>
);

const LiveGrid = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			/* IE Fallback */
			display: flex;
			flex-direction: column;
			${until.desktop} {
				margin-left: 0px;
			}
			${from.desktop} {
				margin-left: 320px;
			}
			@supports (display: grid) {
				display: grid;
				width: 100%;
				margin-left: 0;
				grid-column-gap: 0px;

				/*
					Explanation of each unit of grid-template-columns
					Main content
					Right Column
				*/
				/* from desktop define fixed body width */
				${from.desktop} {
					grid-column-gap: 20px;
					grid-template-columns: 240px 700px;
					grid-template-areas:
						'info		media'
						'info		body';
				}
				/* from wide define fixed body width */
				${from.wide} {
					grid-column-gap: 20px;
					grid-template-columns: 240px 700px 300px;
					grid-template-areas:
						'info		media		right-column'
						'info		body		right-column';
				}
				/* until desktop define fixed body width */
				${until.desktop} {
					grid-template-columns: minmax(0, 1fr); /* Main content */
					grid-template-areas:
						'media'
						'info'
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
		max-width: 700px;
	}
`;

const sidePaddingDesktop = css`
	${from.desktop} {
		padding-left: ${space[5]}px;
	}
`;

const bodyWrapper = css`
	margin-bottom: ${space[3]}px;
	${from.desktop} {
		margin-bottom: 0;
	}
`;

const starWrapper = css`
	margin-bottom: 18px;
	margin-top: 6px;
	background-color: ${themePalette('--star-rating-background')};
	color: ${themePalette('--star-rating-fill')};
	display: inline-block;
	${until.phablet} {
		padding-left: 20px;
		margin-left: -20px;
	}
	${until.leftCol} {
		padding-left: 0px;
		margin-left: -0px;
	}
	padding-left: 10px;
	margin-left: -10px;
`;

const paddingBody = css`
	padding: ${space[3]}px;
	${from.mobileLandscape} {
		padding: ${space[3]}px ${space[5]}px;
	}
	${from.desktop} {
		padding: 0;
	}
`;

interface BaseProps {
	article: DCRArticle;
	format: ArticleFormat;
	renderingTarget: RenderingTarget;
}

interface AppsProps extends BaseProps {
	renderingTarget: 'Apps';
}

interface WebProps extends BaseProps {
	NAV: NavType;
	renderingTarget: 'Web';
}

export const LiveLayout = (props: WebProps | AppsProps) => {
	const { article, format, renderingTarget } = props;
	const {
		config: { isPaidContent, host },
	} = article;

	// TODO:
	// 1) Read 'forceEpic' value from URL parameter and use it to force the slot to render
	// 2) Otherwise, ensure slot only renders if `article.config.shouldHideReaderRevenue` equals false.

	// Set a default pagination if it is missing from CAPI
	const pagination: Pagination = article.pagination ?? {
		currentPage: 1,
		totalPages: 1,
	};

	const contributionsServiceUrl = getContributionsServiceUrl(article);

	const { branding } = article.commercialProperties[article.editionId];

	const footballMatchUrl =
		article.matchType === 'FootballMatchType'
			? article.matchUrl
			: undefined;

	const cricketMatchUrl =
		article.matchType === 'CricketMatchType' ? article.matchUrl : undefined;

	const showTopicFilterBank =
		!!article.config.switches.automaticFilters &&
		hasRelevantTopics(article.availableTopics);

	const hasKeyEvents = !!article.keyEvents.length;
	const showKeyEventsToggle = !showTopicFilterBank && hasKeyEvents;

	const renderAds = canRenderAds(article, renderingTarget);

	const isWeb = renderingTarget === 'Web';
	const isApps = renderingTarget === 'Apps';

	/** Mobile articles with comments should be filtered in MAPI but we leave this in for clarity **/
	const showComments = isWeb && article.isCommentable && !isPaidContent;

	const isInLiveblogAdSlotTest =
		article.config.abTests.serverSideLiveblogInlineAdsVariant === 'variant';

	return (
		<>
			{isWeb && (
				<div data-print-layout="hide">
					{renderAds && (
						<Stuck>
							<Section
								fullWidth={true}
								showTopBorder={false}
								showSideBorders={false}
								padSides={false}
								shouldCenter={false}
								element="aside"
							>
								<HeaderAdSlot />
							</Section>
						</Stuck>
					)}
					<SendToBack>
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
								borderColour={themePalette('--article-border')}
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
							borderColour={themePalette('--article-border')}
						>
							<StraightLines
								count={4}
								cssOverrides={css`
									display: block;
								`}
							/>
						</Section>
					</SendToBack>
				</div>
			)}
			<main data-layout="LiveLayout">
				{isApps && (
					<>
						<Island priority="critical">
							<AdPortals rightAlignFrom="wide" />
						</Island>
						<Island priority="feature" defer={{ until: 'idle' }}>
							<AppsLightboxImageStore
								images={article.imagesForAppsLightbox}
							/>
						</Island>
					</>
				)}
				{footballMatchUrl ? (
					<Section
						showTopBorder={false}
						backgroundColour={themePalette(
							'--match-nav-background',
						)}
						borderColour={themePalette('--headline-border')}
						leftContent={
							<ArticleTitle
								format={format}
								tags={article.tags}
								sectionLabel={article.sectionLabel}
								sectionUrl={article.sectionUrl}
								guardianBaseURL={article.guardianBaseURL}
								badge={article.badge?.enhanced}
								isMatch={true}
							/>
						}
						leftColSize="wide"
						padContent={false}
						verticalMargins={false}
					>
						<Hide above="leftCol">
							<ArticleTitle
								format={format}
								tags={article.tags}
								sectionLabel={article.sectionLabel}
								sectionUrl={article.sectionUrl}
								guardianBaseURL={article.guardianBaseURL}
								badge={article.badge?.enhanced}
								isMatch={true}
							/>
						</Hide>

						<Island priority="feature" defer={{ until: 'visible' }}>
							<GetMatchNav
								matchUrl={footballMatchUrl}
								format={format}
								headlineString={article.headline}
								tags={article.tags}
								webPublicationDateDeprecated={
									article.webPublicationDateDeprecated
								}
							/>
						</Island>
					</Section>
				) : (
					<Section
						fullWidth={true}
						showTopBorder={false}
						backgroundColour={themePalette(
							'--headline-blog-background',
						)}
						borderColour={themePalette('--headline-border')}
					>
						<HeadlineGrid>
							<GridItem area="title">
								<ArticleTitle
									format={format}
									tags={article.tags}
									sectionLabel={article.sectionLabel}
									sectionUrl={article.sectionUrl}
									guardianBaseURL={article.guardianBaseURL}
									badge={article.badge?.enhanced}
								/>
							</GridItem>
							<GridItem area="headline">
								<div css={maxWidth}>
									{!footballMatchUrl && (
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
										/>
									)}
								</div>
								{article.starRating !== undefined ? (
									<div css={starWrapper}>
										<StarRating
											rating={article.starRating}
											size="large"
										/>
									</div>
								) : (
									<></>
								)}
							</GridItem>
						</HeadlineGrid>
					</Section>
				)}

				<Section
					fullWidth={true}
					showTopBorder={false}
					backgroundColour={themePalette('--standfirst-background')}
					borderColour={themePalette('--standfirst-border')}
				>
					<StandFirstGrid>
						<GridItem area="standfirst">
							<Standfirst
								format={format}
								standfirst={article.standfirst}
							/>
						</GridItem>
						<GridItem area="lastupdated">
							<Hide until="desktop">
								{article.blocks[0]?.blockLastUpdated !==
									undefined && (
									<ArticleLastUpdated
										format={format}
										lastUpdated={
											article.blocks[0].blockLastUpdated
										}
									/>
								)}
							</Hide>
						</GridItem>
						<GridItem area="lines">
							<Hide from="desktop">
								<div css={sidePaddingDesktop}>
									<DecideLines
										format={format}
										color={
											format.design ===
											ArticleDesign.LiveBlog
												? 'rgba(255, 255, 255, 0.4)'
												: undefined
										}
									/>
								</div>
							</Hide>
						</GridItem>
						<GridItem area="meta">
							<Hide from="desktop">
								<div css={sidePaddingDesktop}>
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
										messageUs={article.messageUs}
									/>
								</div>
							</Hide>
						</GridItem>
					</StandFirstGrid>
				</Section>
				{hasKeyEvents ? (
					<Section
						fullWidth={true}
						showTopBorder={false}
						backgroundColour={themePalette(
							'--key-event-background-desktop',
						)}
						borderColour={themePalette('--article-border')}
					>
						<Hide until={'desktop'}>
							<Island
								priority="feature"
								defer={{ until: 'visible' }}
							>
								<KeyEventsCarousel
									keyEvents={article.keyEvents}
									filterKeyEvents={article.filterKeyEvents}
									id={'key-events-carousel-desktop'}
								/>
							</Island>
						</Hide>
					</Section>
				) : null}
				<Section
					fullWidth={true}
					showTopBorder={false}
					borderColour={themePalette('--article-border')}
					backgroundColour={themePalette('--article-background')}
				>
					<Hide until="desktop">
						<div
							css={css`
								height: ${space[4]}px;
							`}
						/>
					</Hide>
				</Section>

				{/* This div is used to contain the Toast */}
				<div>
					{format.design === ArticleDesign.LiveBlog && (
						<>
							{/* The Toast component is inserted into this div using a Portal */}
							<div
								id="toast-root"
								css={css`
									position: sticky;
									top: 0;
									${getZIndex('toast')};
									display: flex;
									justify-content: center;
								`}
							/>
							<Island
								priority="feature"
								defer={{ until: 'idle' }}
							>
								<Liveness
									pageId={article.pageId}
									webTitle={article.webTitle}
									ajaxUrl={article.config.ajaxUrl}
									filterKeyEvents={article.filterKeyEvents}
									format={format}
									enhanceTweetsSwitch={
										!!article.config.switches.enhanceTweets
									}
									onFirstPage={pagination.currentPage === 1}
									webURL={article.webURL}
									// We default to string here because the property is optional but we
									// know it will exist for all blogs
									mostRecentBlockId={
										article.mostRecentBlockId ?? ''
									}
									hasPinnedPost={!!article.pinnedPost}
									selectedTopics={article.selectedTopics}
								/>
							</Island>
						</>
					)}

					<Section
						fullWidth={true}
						showTopBorder={false}
						backgroundColour={themePalette('--article-background')}
						borderColour={themePalette('--article-border')}
						padSides={false}
					>
						<LiveGrid>
							<GridItem area="media">
								<div css={maxWidth}>
									{!!footballMatchUrl && (
										<Island
											priority="critical"
											defer={{ until: 'visible' }}
										>
											<GetMatchTabs
												matchUrl={footballMatchUrl}
												format={format}
											/>
										</Island>
									)}
									{!!cricketMatchUrl && (
										<Island
											priority="critical"
											defer={{ until: 'visible' }}
										>
											<GetCricketScoreboard
												matchUrl={cricketMatchUrl}
												format={format}
											/>
										</Island>
									)}
									<MainMedia
										format={format}
										elements={article.mainMediaElements}
										host={host}
										pageId={article.pageId}
										webTitle={article.webTitle}
										ajaxUrl={article.config.ajaxUrl}
										switches={article.config.switches}
										isSensitive={article.config.isSensitive}
										isAdFreeUser={article.isAdFreeUser}
										imagesForAppsLightbox={
											article.imagesForAppsLightbox
										}
									/>
								</div>
							</GridItem>
							<GridItem area="info" element="aside">
								{/* Lines */}
								<Hide until="desktop">
									<div css={[maxWidth, sidePaddingDesktop]}>
										<DecideLines format={format} />
									</div>
								</Hide>
								{/* Meta */}
								<Hide until="desktop">
									<div css={[maxWidth, sidePaddingDesktop]}>
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
											shortUrlId={
												article.config.shortUrlId
											}
											ajaxUrl={article.config.ajaxUrl}
											messageUs={article.messageUs}
										/>
									</div>
								</Hide>

								{showTopicFilterBank && (
									<Hide until="desktop">
										<div css={sidePaddingDesktop}>
											<TopicFilterBank
												availableTopics={
													article.availableTopics
												}
												selectedTopics={
													article.selectedTopics
												}
												format={format}
												keyEvents={article.keyEvents}
												filterKeyEvents={
													article.filterKeyEvents
												}
												id={
													'key-events-carousel-desktop'
												}
											/>
										</div>
									</Hide>
								)}
								{/* Match stats */}
								{!!footballMatchUrl && (
									<Island
										priority="feature"
										defer={{ until: 'visible' }}
									>
										<GetMatchStats
											matchUrl={footballMatchUrl}
											format={format}
										/>
									</Island>
								)}
							</GridItem>
							<GridItem area="body">
								<div id="maincontent" css={bodyWrapper}>
									{showKeyEventsToggle ? (
										<Hide below="desktop">
											<Island
												priority="feature"
												defer={{ until: 'visible' }}
											>
												<FilterKeyEventsToggle
													filterKeyEvents={
														article.filterKeyEvents
													}
													id="filter-toggle-desktop"
												/>
											</Island>
										</Hide>
									) : (
										<></>
									)}
									{showTopicFilterBank ? (
										<div css={paddingBody}>
											<ArticleContainer format={format}>
												{pagination.currentPage !==
													1 && (
													<Pagination
														currentPage={
															pagination.currentPage
														}
														totalPages={
															pagination.totalPages
														}
														newest={
															pagination.newest
														}
														oldest={
															pagination.oldest
														}
														newer={pagination.newer}
														older={pagination.older}
														format={format}
													/>
												)}
												<ArticleBody
													format={format}
													blocks={article.blocks}
													pinnedPost={
														article.pinnedPost
													}
													host={host}
													pageId={article.pageId}
													webTitle={article.webTitle}
													ajaxUrl={
														article.config.ajaxUrl
													}
													sectionId={
														article.config.section
													}
													switches={
														article.config.switches
													}
													isSensitive={
														article.config
															.isSensitive
													}
													isAdFreeUser={
														article.isAdFreeUser
													}
													shouldHideReaderRevenue={
														article.shouldHideReaderRevenue
													}
													tags={article.tags}
													isPaidContent={
														!!article.config
															.isPaidContent
													}
													contributionsServiceUrl={
														contributionsServiceUrl
													}
													contentType={
														article.contentType
													}
													isPreview={
														article.config.isPreview
													}
													idUrl={
														article.config.idUrl ??
														''
													}
													isDev={
														!!article.config.isDev
													}
													onFirstPage={
														pagination.currentPage ===
														1
													}
													keyEvents={
														article.keyEvents
													}
													filterKeyEvents={
														article.filterKeyEvents
													}
													availableTopics={
														article.availableTopics
													}
													selectedTopics={
														article.selectedTopics
													}
													keywordIds={
														article.config
															.keywordIds
													}
													isInLiveblogAdSlotTest={
														isInLiveblogAdSlotTest
													}
													imagesForAppsLightbox={
														article.imagesForAppsLightbox
													}
												/>
												{pagination.totalPages > 1 && (
													<Pagination
														currentPage={
															pagination.currentPage
														}
														totalPages={
															pagination.totalPages
														}
														newest={
															pagination.newest
														}
														oldest={
															pagination.oldest
														}
														newer={pagination.newer}
														older={pagination.older}
														format={format}
													/>
												)}
												<StraightLines
													data-print-layout="hide"
													count={4}
													cssOverrides={css`
														display: block;
													`}
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
														renderingTarget ===
															'Web'
													}
													badge={
														article.badge?.enhanced
													}
												/>
											</ArticleContainer>
										</div>
									) : (
										<Accordion
											accordionTitle="Live feed"
											context="liveFeed"
										>
											<ArticleContainer format={format}>
												{pagination.currentPage !==
													1 && (
													<Pagination
														currentPage={
															pagination.currentPage
														}
														totalPages={
															pagination.totalPages
														}
														newest={
															pagination.newest
														}
														oldest={
															pagination.oldest
														}
														newer={pagination.newer}
														older={pagination.older}
														format={format}
													/>
												)}
												<ArticleBody
													format={format}
													blocks={article.blocks}
													pinnedPost={
														article.pinnedPost
													}
													host={host}
													pageId={article.pageId}
													webTitle={article.webTitle}
													ajaxUrl={
														article.config.ajaxUrl
													}
													sectionId={
														article.config.section
													}
													switches={
														article.config.switches
													}
													isSensitive={
														article.config
															.isSensitive
													}
													isAdFreeUser={
														article.isAdFreeUser
													}
													shouldHideReaderRevenue={
														article.shouldHideReaderRevenue
													}
													tags={article.tags}
													isPaidContent={
														!!article.config
															.isPaidContent
													}
													contributionsServiceUrl={
														contributionsServiceUrl
													}
													contentType={
														article.contentType
													}
													isPreview={
														article.config.isPreview
													}
													idUrl={
														article.config.idUrl ??
														''
													}
													isDev={
														!!article.config.isDev
													}
													onFirstPage={
														pagination.currentPage ===
														1
													}
													keyEvents={
														article.keyEvents
													}
													filterKeyEvents={
														article.filterKeyEvents
													}
													availableTopics={
														article.availableTopics
													}
													selectedTopics={
														article.selectedTopics
													}
													keywordIds={
														article.config
															.keywordIds
													}
													isInLiveblogAdSlotTest={
														isInLiveblogAdSlotTest
													}
													lang={article.lang}
													isRightToLeftLang={
														article.isRightToLeftLang
													}
													imagesForAppsLightbox={[]}
												/>
												{pagination.totalPages > 1 && (
													<Pagination
														currentPage={
															pagination.currentPage
														}
														totalPages={
															pagination.totalPages
														}
														newest={
															pagination.newest
														}
														oldest={
															pagination.oldest
														}
														newer={pagination.newer}
														older={pagination.older}
														format={format}
													/>
												)}
												<StraightLines
													data-print-layout="hide"
													count={4}
													cssOverrides={css`
														display: block;
													`}
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
														renderingTarget ===
															'Web'
													}
													badge={
														article.badge?.enhanced
													}
												/>
											</ArticleContainer>
										</Accordion>
									)}
								</div>
							</GridItem>
							<GridItem area="right-column">
								<div
									css={css`
										height: 100%;
										${from.desktop} {
											/* above 980 */
											margin-left: 20px;
											margin-right: -20px;
											display: none;
										}
										${from.leftCol} {
											/* above 1140 */
											margin-left: 0px;
											margin-right: 0px;
										}
										${from.wide} {
											display: block;
										}
									`}
								>
									<RightColumn showFrom="wide">
										{renderAds && (
											<AdSlot
												position="right"
												display={format.display}
												isPaidContent={isPaidContent}
											/>
										)}

										{isApps && <RightAdsPlaceholder />}
									</RightColumn>
								</div>
							</GridItem>
						</LiveGrid>
					</Section>

					{renderAds && (
						<Section
							fullWidth={true}
							data-print-layout="hide"
							padSides={false}
							showTopBorder={false}
							showSideBorders={false}
							backgroundColour={sourcePalette.neutral[93]}
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
						<Section fullWidth={true}>
							<Island
								priority="feature"
								defer={{ until: 'visible' }}
							>
								<Carousel
									heading={article.storyPackage.heading}
									trails={article.storyPackage.trails.map(
										decideTrail,
									)}
									onwardsSource="more-on-this-story"
									format={format}
									leftColSize={'wide'}
									discussionApiUrl={
										article.config.discussionApiUrl
									}
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

					{showComments && (
						<Section
							fullWidth={true}
							showTopBorder={false}
							sectionId="comments"
							data-print-layout="hide"
							element="section"
						>
							<DiscussionLayout
								discussionApiUrl={
									article.config.discussionApiUrl
								}
								shortUrlId={article.config.shortUrlId}
								format={format}
								discussionD2Uid={article.config.discussionD2Uid}
								discussionApiClientHeader={
									article.config.discussionApiClientHeader
								}
								enableDiscussionSwitch={
									!!article.config.switches
										.enableDiscussionSwitch
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
							leftColSize="wide"
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
							data-print-layout="hide"
							padSides={false}
							showTopBorder={false}
							showSideBorders={false}
							backgroundColour={sourcePalette.neutral[93]}
							element="aside"
						>
							<AdSlot
								position="merchandising"
								display={format.display}
							/>
						</Section>
					)}
				</div>
			</main>

			{isWeb && (
				<>
					{props.NAV.subNavSections && (
						<Section
							fullWidth={true}
							data-print-layout="hide"
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
						data-print-layout="hide"
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
					<MobileStickyContainer data-print-layout="hide" />
				</>
			)}

			{isApps && (
				<Section
					fullWidth={true}
					data-print-layout="hide"
					backgroundColour={themePalette('--apps-footer-background')}
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
