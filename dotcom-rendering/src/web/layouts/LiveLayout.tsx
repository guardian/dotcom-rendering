import { css } from '@emotion/react';
// eslint-disable-next-line import/no-extraneous-dependencies -- it’s a yarn workspace
import Accordion from '@guardian/common-rendering/src/components/accordion';
// eslint-disable-next-line import/no-extraneous-dependencies -- it’s a yarn workspace
import { Pagination } from '@guardian/common-rendering/src/components/Pagination';
import { ArticleDesign } from '@guardian/libs';
import type { ArticleFormat } from '@guardian/libs';
import {
	brandAltBackground,
	brandBackground,
	brandBorder,
	brandLine,
	from,
	neutral,
	space,
	until,
} from '@guardian/source-foundations';
import { Hide } from '@guardian/source-react-components';
import { StraightLines } from '@guardian/source-react-components-development-kitchen';
import { buildAdTargeting } from '../../lib/ad-targeting';
import type { NavType } from '../../model/extract-nav';
import type { CAPIArticleType } from '../../types/frontend';
import { AdSlot, MobileStickyContainer } from '../components/AdSlot';
import { ArticleBody } from '../components/ArticleBody';
import { ArticleContainer } from '../components/ArticleContainer';
import { ArticleHeadline } from '../components/ArticleHeadline';
import { ArticleLastUpdated } from '../components/ArticleLastUpdated';
import { ArticleMeta } from '../components/ArticleMeta';
import { ArticleTitle } from '../components/ArticleTitle';
import { Carousel } from '../components/Carousel.importable';
import { DecideLines } from '../components/DecideLines';
import { DecideOnwards } from '../components/DecideOnwards';
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
} from '../components/TopicFilterBank.importable';
import { getContributionsServiceUrl } from '../lib/contributions';
import { decidePalette } from '../lib/decidePalette';
import { decideTrail } from '../lib/decideTrail';
import { getZIndex } from '../lib/getZIndex';
import { getCurrentPillar } from '../lib/layoutHelpers';
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
					grid-template-columns: 240px 700px 1fr;
					grid-template-areas:
						'info  		 media     right-column'
						'info		 body      right-column';
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
	background-color: ${brandAltBackground.primary};
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

interface Props {
	CAPIArticle: CAPIArticleType;
	NAV: NavType;
	format: ArticleFormat;
}

const paddingBody = css`
	padding: ${space[3]}px;
	${from.mobileLandscape} {
		padding: ${space[3]}px ${space[5]}px;
	}
	${from.desktop} {
		padding: 0;
	}
`;

export const LiveLayout = ({ CAPIArticle, NAV, format }: Props) => {
	const {
		config: { isPaidContent, host },
	} = CAPIArticle;

	const adTargeting: AdTargeting = buildAdTargeting({
		isAdFreeUser: CAPIArticle.isAdFreeUser,
		isSensitive: CAPIArticle.config.isSensitive,
		videoDuration: CAPIArticle.config.videoDuration,
		edition: CAPIArticle.config.edition,
		section: CAPIArticle.config.section,
		sharedAdTargeting: CAPIArticle.config.sharedAdTargeting,
		adUnit: CAPIArticle.config.adUnit,
	});

	// TODO:
	// 1) Read 'forceEpic' value from URL parameter and use it to force the slot to render
	// 2) Otherwise, ensure slot only renders if `CAPIArticle.config.shouldHideReaderRevenue` equals false.

	// Set a default pagination if it is missing from CAPI
	const pagination: Pagination = CAPIArticle.pagination ?? {
		currentPage: 1,
		totalPages: 1,
	};

	const contributionsServiceUrl = getContributionsServiceUrl(CAPIArticle);

	const { branding } =
		CAPIArticle.commercialProperties[CAPIArticle.editionId];

	const palette = decidePalette(format);

	const footballMatchUrl =
		CAPIArticle.matchType === 'FootballMatchType' && CAPIArticle.matchUrl;

	const cricketMatchUrl =
		CAPIArticle.matchType === 'CricketMatchType' && CAPIArticle.matchUrl;

	const showTopicFilterBank =
		!!CAPIArticle.config.switches.automaticFilters &&
		hasRelevantTopics(CAPIArticle.availableTopics);

	const hasKeyEvents = !!CAPIArticle.keyEvents.length;
	const showKeyEventsToggle = !showTopicFilterBank && hasKeyEvents;

	/**
	 * This property currently only applies to the header and merchandising slots
	 */
	const renderAds = !CAPIArticle.isAdFreeUser && !CAPIArticle.shouldHideAds;

	return (
		<>
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
							<HeaderAdSlot display={format.display} />
						</Section>
					</Stuck>
				)}
				<SendToBack>
					<Section
						fullWidth={true}
						showTopBorder={false}
						showSideBorders={false}
						padSides={false}
						backgroundColour={brandBackground.primary}
						element="header"
					>
						<Header
							editionId={CAPIArticle.editionId}
							idUrl={CAPIArticle.config.idUrl}
							mmaUrl={CAPIArticle.config.mmaUrl}
							supporterCTA={
								CAPIArticle.nav.readerRevenueLinks.header
									.supporter
							}
							discussionApiUrl={
								CAPIArticle.config.discussionApiUrl
							}
							urls={CAPIArticle.nav.readerRevenueLinks.header}
							remoteHeader={
								!!CAPIArticle.config.switches.remoteHeader
							}
							contributionsServiceUrl={contributionsServiceUrl}
							idApiUrl={CAPIArticle.config.idApiUrl}
						/>
					</Section>

					<Section
						fullWidth={true}
						borderColour={brandLine.primary}
						showTopBorder={false}
						padSides={false}
						backgroundColour={brandBackground.primary}
						element="nav"
					>
						<Nav
							nav={NAV}
							format={{
								...format,
								theme: getCurrentPillar(CAPIArticle),
							}}
							subscribeUrl={
								CAPIArticle.nav.readerRevenueLinks.header
									.subscribe
							}
							editionId={CAPIArticle.editionId}
						/>
					</Section>

					{NAV.subNavSections && (
						<Section
							fullWidth={true}
							backgroundColour={palette.background.article}
							padSides={false}
							borderColour={palette.border.article}
							element="aside"
						>
							<Island deferUntil="idle">
								<SubNav
									subNavSections={NAV.subNavSections}
									currentNavLink={NAV.currentNavLink}
									format={format}
								/>
							</Island>
						</Section>
					)}

					<Section
						fullWidth={true}
						backgroundColour={palette.background.article}
						padSides={false}
						showTopBorder={false}
						borderColour={palette.border.article}
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

			<main data-layout="LiveLayout">
				{footballMatchUrl ? (
					<Section
						showTopBorder={false}
						backgroundColour={palette.background.matchNav}
						borderColour={palette.border.headline}
						leftContent={
							<ArticleTitle
								format={format}
								tags={CAPIArticle.tags}
								sectionLabel={CAPIArticle.sectionLabel}
								sectionUrl={CAPIArticle.sectionUrl}
								guardianBaseURL={CAPIArticle.guardianBaseURL}
								badge={CAPIArticle.badge}
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
								tags={CAPIArticle.tags}
								sectionLabel={CAPIArticle.sectionLabel}
								sectionUrl={CAPIArticle.sectionUrl}
								guardianBaseURL={CAPIArticle.guardianBaseURL}
								badge={CAPIArticle.badge}
								isMatch={true}
							/>
						</Hide>

						<Island
							deferUntil="visible"
							clientOnly={true}
							placeholderHeight={230}
						>
							<GetMatchNav
								matchUrl={footballMatchUrl}
								format={format}
								headlineString={CAPIArticle.headline}
								tags={CAPIArticle.tags}
								webPublicationDateDeprecated={
									CAPIArticle.webPublicationDateDeprecated
								}
							/>
						</Island>
					</Section>
				) : (
					<Section
						fullWidth={true}
						showTopBorder={false}
						backgroundColour={palette.background.header}
						borderColour={palette.border.headline}
					>
						<HeadlineGrid>
							<GridItem area="title">
								<ArticleTitle
									format={format}
									tags={CAPIArticle.tags}
									sectionLabel={CAPIArticle.sectionLabel}
									sectionUrl={CAPIArticle.sectionUrl}
									guardianBaseURL={
										CAPIArticle.guardianBaseURL
									}
									badge={CAPIArticle.badge}
								/>
							</GridItem>
							<GridItem area="headline">
								<div css={maxWidth}>
									{!footballMatchUrl && (
										<ArticleHeadline
											format={format}
											headlineString={
												CAPIArticle.headline
											}
											tags={CAPIArticle.tags}
											byline={CAPIArticle.byline}
											webPublicationDateDeprecated={
												CAPIArticle.webPublicationDateDeprecated
											}
											hasStarRating={
												!!CAPIArticle.starRating ||
												CAPIArticle.starRating === 0
											}
										/>
									)}
								</div>
								{CAPIArticle.starRating ||
								CAPIArticle.starRating === 0 ? (
									<div css={starWrapper}>
										<StarRating
											rating={CAPIArticle.starRating}
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
					backgroundColour={palette.background.standfirst}
					borderColour={palette.border.standfirst}
				>
					<StandFirstGrid>
						<GridItem area="standfirst">
							<Standfirst
								format={format}
								standfirst={CAPIArticle.standfirst}
							/>
						</GridItem>
						<GridItem area="lastupdated">
							<Hide until="desktop">
								{!!CAPIArticle.blocks[0]?.blockLastUpdated && (
									<ArticleLastUpdated
										format={format}
										lastUpdated={
											CAPIArticle.blocks[0]
												.blockLastUpdated
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
										pageId={CAPIArticle.pageId}
										webTitle={CAPIArticle.webTitle}
										byline={CAPIArticle.byline}
										tags={CAPIArticle.tags}
										primaryDateline={
											CAPIArticle.webPublicationDateDisplay
										}
										secondaryDateline={
											CAPIArticle.webPublicationSecondaryDateDisplay
										}
										isCommentable={
											CAPIArticle.isCommentable
										}
										discussionApiUrl={
											CAPIArticle.config.discussionApiUrl
										}
										shortUrlId={
											CAPIArticle.config.shortUrlId
										}
										ajaxUrl={CAPIArticle.config.ajaxUrl}
										showShareCount={
											!!CAPIArticle.config.switches
												.serverShareCounts
										}
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
						backgroundColour={
							palette.background.keyEventFromDesktop
						}
						borderColour={palette.border.article}
					>
						<Hide until={'desktop'}>
							<Island>
								<KeyEventsCarousel
									keyEvents={CAPIArticle.keyEvents}
									filterKeyEvents={
										CAPIArticle.filterKeyEvents
									}
									format={format}
									id={'key-events-carousel-desktop'}
								/>
							</Island>
						</Hide>
					</Section>
				) : null}
				<Section
					fullWidth={true}
					showTopBorder={false}
					borderColour={palette.border.article}
					backgroundColour={palette.background.article}
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
							<Island clientOnly={true} deferUntil="idle">
								<Liveness
									pageId={CAPIArticle.pageId}
									webTitle={CAPIArticle.webTitle}
									ajaxUrl={CAPIArticle.config.ajaxUrl}
									filterKeyEvents={
										CAPIArticle.filterKeyEvents
									}
									format={format}
									enhanceTweetsSwitch={
										!!CAPIArticle.config.switches
											.enhanceTweets
									}
									onFirstPage={pagination.currentPage === 1}
									webURL={CAPIArticle.webURL}
									// We default to string here because the property is optional but we
									// know it will exist for all blogs
									mostRecentBlockId={
										CAPIArticle.mostRecentBlockId || ''
									}
									hasPinnedPost={!!CAPIArticle.pinnedPost}
									selectedTopics={CAPIArticle.selectedTopics}
								/>
							</Island>
						</>
					)}

					<Section
						fullWidth={true}
						showTopBorder={false}
						backgroundColour={palette.background.article}
						borderColour={palette.border.article}
						padSides={false}
					>
						<LiveGrid>
							<GridItem area="media">
								<div css={maxWidth}>
									{!!footballMatchUrl && (
										<Island
											clientOnly={true}
											placeholderHeight={40}
										>
											<GetMatchTabs
												matchUrl={footballMatchUrl}
												format={format}
											/>
										</Island>
									)}
									{!!cricketMatchUrl && (
										<Island
											clientOnly={true}
											placeholderHeight={172}
										>
											<GetCricketScoreboard
												matchUrl={cricketMatchUrl}
												format={format}
											/>
										</Island>
									)}
									<MainMedia
										format={format}
										elements={CAPIArticle.mainMediaElements}
										adTargeting={adTargeting}
										host={host}
										pageId={CAPIArticle.pageId}
										webTitle={CAPIArticle.webTitle}
										ajaxUrl={CAPIArticle.config.ajaxUrl}
										switches={CAPIArticle.config.switches}
										isSensitive={
											CAPIArticle.config.isSensitive
										}
										isAdFreeUser={CAPIArticle.isAdFreeUser}
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
											pageId={CAPIArticle.pageId}
											webTitle={CAPIArticle.webTitle}
											byline={CAPIArticle.byline}
											tags={CAPIArticle.tags}
											primaryDateline={
												CAPIArticle.webPublicationDateDisplay
											}
											secondaryDateline={
												CAPIArticle.webPublicationSecondaryDateDisplay
											}
											isCommentable={
												CAPIArticle.isCommentable
											}
											discussionApiUrl={
												CAPIArticle.config
													.discussionApiUrl
											}
											shortUrlId={
												CAPIArticle.config.shortUrlId
											}
											ajaxUrl={CAPIArticle.config.ajaxUrl}
											showShareCount={
												!!CAPIArticle.config.switches
													.serverShareCounts
											}
										/>
									</div>
								</Hide>

								{showTopicFilterBank && (
									<Hide until="desktop">
										<div css={sidePaddingDesktop}>
											<Island>
												<TopicFilterBank
													availableTopics={
														CAPIArticle.availableTopics
													}
													selectedTopics={
														CAPIArticle.selectedTopics
													}
													format={format}
													keyEvents={
														CAPIArticle.keyEvents
													}
													filterKeyEvents={
														CAPIArticle.filterKeyEvents
													}
													id={
														'key-events-carousel-desktop'
													}
												/>
											</Island>
										</div>
									</Hide>
								)}
								{/* Match stats */}
								{!!footballMatchUrl && (
									<Island
										deferUntil="visible"
										clientOnly={true}
										placeholderHeight={800}
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
											<Island deferUntil="visible">
												<FilterKeyEventsToggle
													filterKeyEvents={
														CAPIArticle.filterKeyEvents
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
														supportsDarkMode={false}
													/>
												)}
												<ArticleBody
													format={format}
													blocks={CAPIArticle.blocks}
													pinnedPost={
														CAPIArticle.pinnedPost
													}
													adTargeting={adTargeting}
													host={host}
													pageId={CAPIArticle.pageId}
													webTitle={
														CAPIArticle.webTitle
													}
													ajaxUrl={
														CAPIArticle.config
															.ajaxUrl
													}
													section={
														CAPIArticle.config
															.section
													}
													switches={
														CAPIArticle.config
															.switches
													}
													isSensitive={
														CAPIArticle.config
															.isSensitive
													}
													isAdFreeUser={
														CAPIArticle.isAdFreeUser
													}
													shouldHideReaderRevenue={
														CAPIArticle.shouldHideReaderRevenue
													}
													tags={CAPIArticle.tags}
													isPaidContent={
														!!CAPIArticle.config
															.isPaidContent
													}
													contributionsServiceUrl={
														contributionsServiceUrl
													}
													contentType={
														CAPIArticle.contentType
													}
													sectionName={
														CAPIArticle.sectionName ||
														''
													}
													isPreview={
														CAPIArticle.config
															.isPreview
													}
													idUrl={
														CAPIArticle.config
															.idUrl || ''
													}
													isDev={
														!!CAPIArticle.config
															.isDev
													}
													onFirstPage={
														pagination.currentPage ===
														1
													}
													keyEvents={
														CAPIArticle.keyEvents
													}
													filterKeyEvents={
														CAPIArticle.filterKeyEvents
													}
													availableTopics={
														CAPIArticle.availableTopics
													}
													selectedTopics={
														CAPIArticle.selectedTopics
													}
													keywordIds={
														CAPIArticle.config
															.keywordIds
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
														supportsDarkMode={false}
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
														CAPIArticle.subMetaKeywordLinks
													}
													subMetaSectionLinks={
														CAPIArticle.subMetaSectionLinks
													}
													pageId={CAPIArticle.pageId}
													webUrl={CAPIArticle.webURL}
													webTitle={
														CAPIArticle.webTitle
													}
													showBottomSocialButtons={
														CAPIArticle.showBottomSocialButtons
													}
													badge={CAPIArticle.badge}
												/>
											</ArticleContainer>
										</div>
									) : (
										<Accordion
											supportsDarkMode={false}
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
														supportsDarkMode={false}
													/>
												)}
												<ArticleBody
													format={format}
													blocks={CAPIArticle.blocks}
													pinnedPost={
														CAPIArticle.pinnedPost
													}
													adTargeting={adTargeting}
													host={host}
													pageId={CAPIArticle.pageId}
													webTitle={
														CAPIArticle.webTitle
													}
													ajaxUrl={
														CAPIArticle.config
															.ajaxUrl
													}
													section={
														CAPIArticle.config
															.section
													}
													switches={
														CAPIArticle.config
															.switches
													}
													isSensitive={
														CAPIArticle.config
															.isSensitive
													}
													isAdFreeUser={
														CAPIArticle.isAdFreeUser
													}
													shouldHideReaderRevenue={
														CAPIArticle.shouldHideReaderRevenue
													}
													tags={CAPIArticle.tags}
													isPaidContent={
														!!CAPIArticle.config
															.isPaidContent
													}
													contributionsServiceUrl={
														contributionsServiceUrl
													}
													contentType={
														CAPIArticle.contentType
													}
													sectionName={
														CAPIArticle.sectionName ||
														''
													}
													isPreview={
														CAPIArticle.config
															.isPreview
													}
													idUrl={
														CAPIArticle.config
															.idUrl || ''
													}
													isDev={
														!!CAPIArticle.config
															.isDev
													}
													onFirstPage={
														pagination.currentPage ===
														1
													}
													keyEvents={
														CAPIArticle.keyEvents
													}
													filterKeyEvents={
														CAPIArticle.filterKeyEvents
													}
													availableTopics={
														CAPIArticle.availableTopics
													}
													selectedTopics={
														CAPIArticle.selectedTopics
													}
													keywordIds={
														CAPIArticle.config
															.keywordIds
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
														supportsDarkMode={false}
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
														CAPIArticle.subMetaKeywordLinks
													}
													subMetaSectionLinks={
														CAPIArticle.subMetaSectionLinks
													}
													pageId={CAPIArticle.pageId}
													webUrl={CAPIArticle.webURL}
													webTitle={
														CAPIArticle.webTitle
													}
													showBottomSocialButtons={
														CAPIArticle.showBottomSocialButtons
													}
													badge={CAPIArticle.badge}
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
									<RightColumn>
										{!CAPIArticle.shouldHideAds && (
											<AdSlot
												position="right"
												display={format.display}
												shouldHideReaderRevenue={
													CAPIArticle.shouldHideReaderRevenue
												}
												isPaidContent={
													CAPIArticle.pageType
														.isPaidContent
												}
											/>
										)}
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
							backgroundColour={neutral[93]}
							element="aside"
						>
							<AdSlot
								data-print-layout="hide"
								position="merchandising-high"
								display={format.display}
							/>
						</Section>
					)}

					{CAPIArticle.onwards ? (
						<DecideOnwards
							onwards={CAPIArticle.onwards}
							format={format}
						/>
					) : (
						<>
							{CAPIArticle.storyPackage && (
								<Section fullWidth={true}>
									<Island deferUntil="visible">
										<Carousel
											heading={
												CAPIArticle.storyPackage.heading
											}
											trails={CAPIArticle.storyPackage.trails.map(
												decideTrail,
											)}
											onwardsSource="more-on-this-story"
											format={format}
										/>
									</Island>
								</Section>
							)}

							<Island
								clientOnly={true}
								deferUntil="visible"
								placeholderHeight={600}
							>
								<OnwardsUpper
									ajaxUrl={CAPIArticle.config.ajaxUrl}
									hasRelated={CAPIArticle.hasRelated}
									hasStoryPackage={
										CAPIArticle.hasStoryPackage
									}
									isAdFreeUser={CAPIArticle.isAdFreeUser}
									pageId={CAPIArticle.pageId}
									isPaidContent={
										CAPIArticle.config.isPaidContent ||
										false
									}
									showRelatedContent={
										CAPIArticle.config.showRelatedContent
									}
									keywordIds={CAPIArticle.config.keywordIds}
									contentType={CAPIArticle.contentType}
									tags={CAPIArticle.tags}
									format={format}
									pillar={format.theme}
									editionId={CAPIArticle.editionId}
									shortUrlId={CAPIArticle.config.shortUrlId}
								/>
							</Island>
						</>
					)}

					{!isPaidContent && CAPIArticle.isCommentable && (
						<Section
							fullWidth={true}
							showTopBorder={false}
							sectionId="comments"
							data-print-layout="hide"
							element="section"
						>
							<DiscussionLayout
								discussionApiUrl={
									CAPIArticle.config.discussionApiUrl
								}
								shortUrlId={CAPIArticle.config.shortUrlId}
								format={format}
								discussionD2Uid={
									CAPIArticle.config.discussionD2Uid
								}
								discussionApiClientHeader={
									CAPIArticle.config.discussionApiClientHeader
								}
								enableDiscussionSwitch={
									!!CAPIArticle.config.switches
										.enableDiscussionSwitch
								}
								isAdFreeUser={CAPIArticle.isAdFreeUser}
								shouldHideAds={CAPIArticle.shouldHideAds}
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
							<MostViewedFooterLayout>
								<Island clientOnly={true} deferUntil="visible">
									<MostViewedFooterData
										sectionName={CAPIArticle.sectionName}
										format={format}
										ajaxUrl={CAPIArticle.config.ajaxUrl}
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
							backgroundColour={neutral[93]}
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

			{NAV.subNavSections && (
				<Section
					fullWidth={true}
					data-print-layout="hide"
					padSides={false}
					element="aside"
				>
					<Island deferUntil="visible">
						<SubNav
							subNavSections={NAV.subNavSections}
							currentNavLink={NAV.currentNavLink}
							format={format}
						/>
					</Island>
				</Section>
			)}

			<Section
				fullWidth={true}
				data-print-layout="hide"
				padSides={false}
				backgroundColour={brandBackground.primary}
				borderColour={brandBorder.primary}
				showSideBorders={false}
				element="footer"
			>
				<Footer
					pageFooter={CAPIArticle.pageFooter}
					pillar={format.theme}
					pillars={NAV.pillars}
					urls={CAPIArticle.nav.readerRevenueLinks.header}
					editionId={CAPIArticle.editionId}
					contributionsServiceUrl={
						CAPIArticle.contributionsServiceUrl
					}
				/>
			</Section>

			<BannerWrapper data-print-layout="hide">
				<Island deferUntil="idle" clientOnly={true}>
					<StickyBottomBanner
						contentType={CAPIArticle.contentType}
						contributionsServiceUrl={contributionsServiceUrl}
						idApiUrl={CAPIArticle.config.idApiUrl}
						isMinuteArticle={CAPIArticle.pageType.isMinuteArticle}
						isPaidContent={CAPIArticle.pageType.isPaidContent}
						isPreview={!!CAPIArticle.config.isPreview}
						isSensitive={CAPIArticle.config.isSensitive}
						keywordIds={CAPIArticle.config.keywordIds}
						pageId={CAPIArticle.pageId}
						section={CAPIArticle.config.section}
						sectionName={CAPIArticle.sectionName}
						shouldHideReaderRevenue={
							CAPIArticle.shouldHideReaderRevenue
						}
						remoteBannerSwitch={
							!!CAPIArticle.config.switches.remoteBanner
						}
						puzzleBannerSwitch={
							!!CAPIArticle.config.switches.puzzlesBanner
						}
						tags={CAPIArticle.tags}
					/>
				</Island>
			</BannerWrapper>
			<MobileStickyContainer data-print-layout="hide" />
		</>
	);
};
