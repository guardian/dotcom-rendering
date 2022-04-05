import { css } from '@emotion/react';

import {
	neutral,
	brandAltBackground,
	brandBackground,
	brandLine,
	brandBorder,
	from,
	until,
	space,
} from '@guardian/source-foundations';
import { ArticleDesign, ArticleFormat } from '@guardian/libs';
import { Lines } from '@guardian/source-react-components-development-kitchen';
import { Pagination } from '@guardian/common-rendering/src/components/Pagination';
import Accordion from '@guardian/common-rendering/src/components/accordion';
import { Hide } from '@guardian/source-react-components';
import { StarRating } from '../components/StarRating/StarRating';
import { ArticleBody } from '../components/ArticleBody';
import { RightColumn } from '../components/RightColumn';
import { ArticleTitle } from '../components/ArticleTitle';
import { ArticleContainer } from '../components/ArticleContainer';
import { ArticleMeta } from '../components/ArticleMeta';
import { SubMeta } from '../components/SubMeta';
import { MainMedia } from '../components/MainMedia';
import { ArticleHeadline } from '../components/ArticleHeadline';
import { Standfirst } from '../components/Standfirst';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SubNav } from '../components/SubNav.importable';
import { ElementContainer } from '../components/ElementContainer';
import { Nav } from '../components/Nav/Nav';
import { HeaderAdSlot } from '../components/HeaderAdSlot';
import { MobileStickyContainer, AdSlot } from '../components/AdSlot';
import { GridItem } from '../components/GridItem';
import { DiscussionLayout } from '../components/DiscussionLayout';

import { KeyEventsContainer } from '../components/KeyEventsContainer';

import { buildAdTargeting } from '../../lib/ad-targeting';
import { parse } from '../../lib/slot-machine-flags';
import {
	decideLineCount,
	decideLineEffect,
	getCurrentPillar,
} from '../lib/layoutHelpers';
import { Stuck, SendToBack, BannerWrapper } from './lib/stickiness';
import { FilterKeyEventsToggle } from '../components/FilterKeyEventsToggle.importable';
import { ContainerLayout } from '../components/ContainerLayout';
import { Island } from '../components/Island';
import { Liveness } from '../components/Liveness.importable';
import { GetMatchStats } from '../components/GetMatchStats.importable';
import { OnwardsLower } from '../components/OnwardsLower.importable';
import { OnwardsUpper } from '../components/OnwardsUpper.importable';
import { MostViewedFooterLayout } from '../components/MostViewedFooterLayout';
import { GetMatchNav } from '../components/GetMatchNav.importable';
import { ArticleLastUpdated } from '../components/ArticleLastUpdated';
import { GetMatchTabs } from '../components/GetMatchTabs.importable';
import { SlotBodyEnd } from '../components/SlotBodyEnd.importable';
import { StickyBottomBanner } from '../components/StickyBottomBanner.importable';
import { getContributionsServiceUrl } from '../lib/contributions';
import { decidePalette } from '../lib/decidePalette';
import { getZIndex } from '../lib/getZIndex';
import { AutomaticFilter } from '../components/AutomaticFilter.importable';

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
					grid-template-columns: 1fr; /* Main content */
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

const sticky = css`
	${from.desktop} {
		position: sticky;
		top: 10px;
	}
`;

const keyEventsMargins = css`
	margin-bottom: ${space[3]}px;
	${from.desktop} {
		margin-top: ${space[1]}px;
		margin-bottom: 0;
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
	CAPI: CAPIType;
	NAV: NavType;
	format: ArticleFormat;
}

export const LiveLayout = ({ CAPI, NAV, format }: Props) => {
	const {
		config: { isPaidContent, host },
	} = CAPI;

	const adTargeting: AdTargeting = buildAdTargeting({
		isAdFreeUser: CAPI.isAdFreeUser,
		isSensitive: CAPI.config.isSensitive,
		videoDuration: CAPI.config.videoDuration,
		edition: CAPI.config.edition,
		section: CAPI.config.section,
		sharedAdTargeting: CAPI.config.sharedAdTargeting,
		adUnit: CAPI.config.adUnit,
	});

	const showBodyEndSlot =
		parse(CAPI.slotMachineFlags || '').showBodyEnd ||
		CAPI.config.switches.slotBodyEnd;

	// TODO:
	// 1) Read 'forceEpic' value from URL parameter and use it to force the slot to render
	// 2) Otherwise, ensure slot only renders if `CAPI.config.shouldHideReaderRevenue` equals false.

	const seriesTag = CAPI.tags.find(
		(tag) => tag.type === 'Series' || tag.type === 'Blog',
	);

	const showOnwardsLower = seriesTag && CAPI.hasStoryPackage;

	// Set a default pagination if it is missing from CAPI
	const pagination: Pagination = CAPI.pagination ?? {
		currentPage: 1,
		totalPages: 1,
	};

	const contributionsServiceUrl = getContributionsServiceUrl(CAPI);

	const { branding } = CAPI.commercialProperties[CAPI.editionId];

	const palette = decidePalette(format);

	return (
		<>
			<div data-print-layout="hide">
				<Stuck>
					<ElementContainer
						showTopBorder={false}
						showSideBorders={false}
						padded={false}
						shouldCenter={false}
						element="aside"
					>
						<HeaderAdSlot
							isAdFreeUser={CAPI.isAdFreeUser}
							shouldHideAds={CAPI.shouldHideAds}
							display={format.display}
						/>
					</ElementContainer>
				</Stuck>
				<SendToBack>
					<ElementContainer
						showTopBorder={false}
						showSideBorders={false}
						padded={false}
						backgroundColour={brandBackground.primary}
						element="header"
					>
						<Header
							edition={CAPI.editionId}
							idUrl={CAPI.config.idUrl}
							mmaUrl={CAPI.config.mmaUrl}
							supporterCTA={
								CAPI.nav.readerRevenueLinks.header.supporter
							}
							discussionApiUrl={CAPI.config.discussionApiUrl}
							isAnniversary={
								CAPI.config.switches.anniversaryHeaderSvg
							}
							urls={CAPI.nav.readerRevenueLinks.header}
							remoteHeader={CAPI.config.switches.remoteHeader}
							contributionsServiceUrl={contributionsServiceUrl}
						/>
					</ElementContainer>

					<ElementContainer
						showSideBorders={true}
						borderColour={brandLine.primary}
						showTopBorder={false}
						padded={false}
						backgroundColour={brandBackground.primary}
						element="nav"
					>
						<Nav
							nav={NAV}
							format={{
								...format,
								theme: getCurrentPillar(CAPI),
							}}
							subscribeUrl={
								CAPI.nav.readerRevenueLinks.header.subscribe
							}
							edition={CAPI.editionId}
						/>
					</ElementContainer>

					{NAV.subNavSections && (
						<ElementContainer
							backgroundColour={palette.background.article}
							padded={false}
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
						</ElementContainer>
					)}

					<ElementContainer
						backgroundColour={palette.background.article}
						padded={false}
						showTopBorder={false}
						borderColour={palette.border.article}
					>
						<Lines count={4} effect="straight" />
					</ElementContainer>
				</SendToBack>
			</div>

			<main>
				<article>
					{CAPI.matchUrl ? (
						<ContainerLayout
							showTopBorder={false}
							backgroundColour={palette.background.matchNav}
							borderColour={palette.border.headline}
							leftContent={
								<ArticleTitle
									format={format}
									tags={CAPI.tags}
									sectionLabel={CAPI.sectionLabel}
									sectionUrl={CAPI.sectionUrl}
									guardianBaseURL={CAPI.guardianBaseURL}
									badge={CAPI.badge}
								/>
							}
							leftColSize="wide"
							sideBorders={true}
							padContent={false}
							verticalMargins={false}
						>
							<Hide above="leftCol">
								<ArticleTitle
									format={format}
									tags={CAPI.tags}
									sectionLabel={CAPI.sectionLabel}
									sectionUrl={CAPI.sectionUrl}
									guardianBaseURL={CAPI.guardianBaseURL}
									badge={CAPI.badge}
								/>
							</Hide>

							<Island
								deferUntil="visible"
								clientOnly={true}
								placeholderHeight={230}
							>
								<GetMatchNav
									matchUrl={CAPI.matchUrl}
									format={format}
									headlineString={CAPI.headline}
									tags={CAPI.tags}
									webPublicationDateDeprecated={
										CAPI.webPublicationDateDeprecated
									}
								/>
							</Island>
						</ContainerLayout>
					) : (
						<ElementContainer
							showTopBorder={false}
							backgroundColour={palette.background.header}
							borderColour={palette.border.headline}
						>
							<HeadlineGrid>
								<GridItem area="title">
									<ArticleTitle
										format={format}
										tags={CAPI.tags}
										sectionLabel={CAPI.sectionLabel}
										sectionUrl={CAPI.sectionUrl}
										guardianBaseURL={CAPI.guardianBaseURL}
										badge={CAPI.badge}
									/>
								</GridItem>
								<GridItem area="headline">
									<div css={maxWidth}>
										{!CAPI.matchUrl && (
											<ArticleHeadline
												format={format}
												headlineString={CAPI.headline}
												tags={CAPI.tags}
												byline={CAPI.author.byline}
												webPublicationDateDeprecated={
													CAPI.webPublicationDateDeprecated
												}
												hasStarRating={
													!!CAPI.starRating ||
													CAPI.starRating === 0
												}
											/>
										)}
									</div>
									{CAPI.starRating ||
									CAPI.starRating === 0 ? (
										<div css={starWrapper}>
											<StarRating
												rating={CAPI.starRating}
												size="large"
											/>
										</div>
									) : (
										<></>
									)}
								</GridItem>
							</HeadlineGrid>
						</ElementContainer>
					)}

					<ElementContainer
						showTopBorder={false}
						backgroundColour={palette.background.standfirst}
						borderColour={palette.border.standfirst}
					>
						<StandFirstGrid>
							<GridItem area="standfirst">
								<Standfirst
									format={format}
									standfirst={CAPI.standfirst}
								/>
							</GridItem>
							<GridItem area="lastupdated">
								<Hide until="desktop">
									{CAPI.blocks.length &&
										CAPI.blocks[0].blockLastUpdated && (
											<ArticleLastUpdated
												format={format}
												lastUpdated={
													CAPI.blocks[0]
														.blockLastUpdated
												}
											/>
										)}
								</Hide>
							</GridItem>
							<GridItem area="lines">
								<Hide from="desktop">
									<div css={sidePaddingDesktop}>
										<Lines
											count={decideLineCount(
												format.design,
											)}
											effect={decideLineEffect(
												format.design,
												format.theme,
											)}
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
											pageId={CAPI.pageId}
											webTitle={CAPI.webTitle}
											author={CAPI.author}
											tags={CAPI.tags}
											primaryDateline={
												CAPI.webPublicationDateDisplay
											}
											secondaryDateline={
												CAPI.webPublicationSecondaryDateDisplay
											}
											isCommentable={CAPI.isCommentable}
											discussionApiUrl={
												CAPI.config.discussionApiUrl
											}
											shortUrlId={CAPI.config.shortUrlId}
											ajaxUrl={CAPI.config.ajaxUrl}
											showShareCount={
												CAPI.config.switches
													.serverShareCounts
											}
										/>
									</div>
								</Hide>
							</GridItem>
						</StandFirstGrid>
					</ElementContainer>

					<ElementContainer
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
					</ElementContainer>

					<ElementContainer
						showTopBorder={false}
						backgroundColour={palette.background.article}
						borderColour={palette.border.article}
						padded={false}
					>
						<LiveGrid>
							<GridItem area="media">
								<div css={maxWidth}>
									{CAPI.matchUrl && (
										<Island
											clientOnly={true}
											placeholderHeight={40}
										>
											<GetMatchTabs
												matchUrl={CAPI.matchUrl}
												format={format}
											/>
										</Island>
									)}
									<MainMedia
										format={format}
										elements={CAPI.mainMediaElements}
										adTargeting={adTargeting}
										host={host}
										pageId={CAPI.pageId}
										webTitle={CAPI.webTitle}
										ajaxUrl={CAPI.config.ajaxUrl}
										switches={CAPI.config.switches}
										isSensitive={CAPI.config.isSensitive}
										isAdFreeUser={CAPI.isAdFreeUser}
									/>
								</div>
							</GridItem>
							<GridItem area="info" element="aside">
								{/* Lines */}
								<Hide until="desktop">
									<div css={[maxWidth, sidePaddingDesktop]}>
										<Lines
											count={decideLineCount(
												format.design,
											)}
											effect={decideLineEffect(
												format.design,
												format.theme,
											)}
										/>
									</div>
								</Hide>
								{/* Meta */}
								<Hide until="desktop">
									<div css={[maxWidth, sidePaddingDesktop]}>
										<ArticleMeta
											branding={branding}
											format={format}
											pageId={CAPI.pageId}
											webTitle={CAPI.webTitle}
											author={CAPI.author}
											tags={CAPI.tags}
											primaryDateline={
												CAPI.webPublicationDateDisplay
											}
											secondaryDateline={
												CAPI.webPublicationSecondaryDateDisplay
											}
											isCommentable={CAPI.isCommentable}
											discussionApiUrl={
												CAPI.config.discussionApiUrl
											}
											shortUrlId={CAPI.config.shortUrlId}
											ajaxUrl={CAPI.config.ajaxUrl}
											showShareCount={
												CAPI.config.switches
													.serverShareCounts
											}
										/>
									</div>
								</Hide>
								{/* Key events */}
								<div
									css={[
										!CAPI.matchUrl && sticky,
										keyEventsMargins,
										sidePaddingDesktop,
									]}
								>
									<KeyEventsContainer
										format={format}
										keyEvents={CAPI.keyEvents}
										filterKeyEvents={CAPI.filterKeyEvents}
									/>
								</div>
								{/* Match stats */}
								{CAPI.matchUrl && (
									<Island
										deferUntil="visible"
										clientOnly={true}
										placeholderHeight={800}
									>
										<GetMatchStats
											matchUrl={CAPI.matchUrl}
											format={format}
										/>
									</Island>
								)}
							</GridItem>
							<GridItem area="body">
								<div id="maincontent" css={bodyWrapper}>
									{format.design ===
										ArticleDesign.LiveBlog && (
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
												clientOnly={true}
												deferUntil="idle"
											>
												<Liveness
													pageId={CAPI.pageId}
													webTitle={CAPI.webTitle}
													ajaxUrl={
														CAPI.config.ajaxUrl
													}
													filterKeyEvents={
														CAPI.filterKeyEvents
													}
													format={format}
													switches={
														CAPI.config.switches
													}
													onFirstPage={
														pagination.currentPage ===
														1
													}
													webURL={CAPI.webURL}
													// We default to string here because the property is optional but we
													// know it will exist for all blogs
													mostRecentBlockId={
														CAPI.mostRecentBlockId ||
														''
													}
													hasPinnedPost={
														!!CAPI.pinnedPost
													}
												/>
											</Island>
										</>
									)}
									<Hide below="desktop">
										<Island deferUntil="visible">
											<FilterKeyEventsToggle
												filterKeyEvents={
													CAPI.filterKeyEvents
												}
											/>
										</Island>
									</Hide>
									<Accordion
										supportsDarkMode={false}
										accordionTitle="Live feed"
										context="liveFeed"
									>
										<Hide above="desktop">
											<Island deferUntil="visible">
												<FilterKeyEventsToggle
													filterKeyEvents={
														CAPI.filterKeyEvents
													}
												/>
											</Island>
										</Hide>
										<ArticleContainer format={format}>
											{pagination.currentPage !== 1 && (
												<Pagination
													currentPage={
														pagination.currentPage
													}
													totalPages={
														pagination.totalPages
													}
													newest={pagination.newest}
													oldest={pagination.oldest}
													newer={pagination.newer}
													older={pagination.older}
													format={format}
												/>
											)}
											<ArticleBody
												format={format}
												blocks={CAPI.blocks}
												pinnedPost={CAPI.pinnedPost}
												adTargeting={adTargeting}
												host={host}
												pageId={CAPI.pageId}
												webTitle={CAPI.webTitle}
												ajaxUrl={CAPI.config.ajaxUrl}
												section={CAPI.config.section}
												switches={CAPI.config.switches}
												isSensitive={
													CAPI.config.isSensitive
												}
												isAdFreeUser={CAPI.isAdFreeUser}
												shouldHideReaderRevenue={
													CAPI.shouldHideReaderRevenue
												}
												tags={CAPI.tags}
												isPaidContent={
													!!CAPI.config.isPaidContent
												}
												contributionsServiceUrl={
													contributionsServiceUrl
												}
												contentType={CAPI.contentType}
												sectionName={
													CAPI.sectionName || ''
												}
												isPreview={
													CAPI.config.isPreview
												}
												idUrl={CAPI.config.idUrl || ''}
												isDev={!!CAPI.config.isDev}
												onFirstPage={
													pagination.currentPage === 1
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
													newest={pagination.newest}
													oldest={pagination.oldest}
													newer={pagination.newer}
													older={pagination.older}
													format={format}
												/>
											)}
											{showBodyEndSlot && (
												<Island clientOnly={true}>
													<SlotBodyEnd
														contentType={
															CAPI.contentType
														}
														contributionsServiceUrl={
															contributionsServiceUrl
														}
														idApiUrl={
															CAPI.config.idApiUrl
														}
														isMinuteArticle={
															CAPI.pageType
																.isMinuteArticle
														}
														isPaidContent={
															CAPI.pageType
																.isPaidContent
														}
														keywordsId={
															CAPI.config
																.keywordIds
														}
														pageId={CAPI.pageId}
														sectionId={
															CAPI.config.section
														}
														sectionName={
															CAPI.sectionName
														}
														shouldHideReaderRevenue={
															CAPI.shouldHideReaderRevenue
														}
														stage={
															CAPI.config.stage
														}
														tags={CAPI.tags}
													/>
												</Island>
											)}
											<Lines
												data-print-layout="hide"
												count={4}
												effect="straight"
											/>
											<SubMeta
												format={format}
												subMetaKeywordLinks={
													CAPI.subMetaKeywordLinks
												}
												subMetaSectionLinks={
													CAPI.subMetaSectionLinks
												}
												pageId={CAPI.pageId}
												webUrl={CAPI.webURL}
												webTitle={CAPI.webTitle}
												showBottomSocialButtons={
													CAPI.showBottomSocialButtons
												}
												badge={CAPI.badge}
											/>
										</ArticleContainer>
									</Accordion>
								</div>
							</GridItem>
							<GridItem area="right-column">
								<Island>
									<AutomaticFilter pageId={CAPI.pageId} />
								</Island>
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
										<AdSlot
											position="right"
											display={format.display}
											shouldHideReaderRevenue={
												CAPI.shouldHideReaderRevenue
											}
											isPaidContent={
												CAPI.pageType.isPaidContent
											}
										/>
									</RightColumn>
								</div>
							</GridItem>
						</LiveGrid>
					</ElementContainer>
				</article>

				<ElementContainer
					data-print-layout="hide"
					padded={false}
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
				</ElementContainer>

				<Island clientOnly={true} deferUntil="visible">
					<OnwardsUpper
						ajaxUrl={CAPI.config.ajaxUrl}
						hasRelated={CAPI.hasRelated}
						hasStoryPackage={CAPI.hasStoryPackage}
						isAdFreeUser={CAPI.isAdFreeUser}
						pageId={CAPI.pageId}
						isPaidContent={CAPI.config.isPaidContent || false}
						showRelatedContent={CAPI.config.showRelatedContent}
						keywordIds={CAPI.config.keywordIds}
						contentType={CAPI.contentType}
						tags={CAPI.tags}
						format={format}
						pillar={format.theme}
						edition={CAPI.editionId}
						shortUrlId={CAPI.config.shortUrlId}
					/>
				</Island>

				{showOnwardsLower && (
					<ElementContainer
						sectionId="onwards-lower"
						element="section"
					>
						<Island clientOnly={true} deferUntil="visible">
							<OnwardsLower
								ajaxUrl={CAPI.config.ajaxUrl}
								hasStoryPackage={CAPI.hasStoryPackage}
								tags={CAPI.tags}
								format={format}
							/>
						</Island>
					</ElementContainer>
				)}

				{!isPaidContent && CAPI.isCommentable && (
					<ElementContainer
						sectionId="comments"
						data-print-layout="hide"
						element="section"
					>
						<DiscussionLayout
							discussionApiUrl={CAPI.config.discussionApiUrl}
							shortUrlId={CAPI.config.shortUrlId}
							format={format}
							discussionD2Uid={CAPI.config.discussionD2Uid}
							discussionApiClientHeader={
								CAPI.config.discussionApiClientHeader
							}
							enableDiscussionSwitch={
								CAPI.config.switches.enableDiscussionSwitch
							}
							isAdFreeUser={CAPI.isAdFreeUser}
							shouldHideAds={CAPI.shouldHideAds}
						/>
					</ElementContainer>
				)}

				{!isPaidContent && (
					<ElementContainer data-print-layout="hide" element="aside">
						<MostViewedFooterLayout
							format={format}
							sectionName={CAPI.sectionName}
							ajaxUrl={CAPI.config.ajaxUrl}
						/>
					</ElementContainer>
				)}

				<ElementContainer
					data-print-layout="hide"
					padded={false}
					showTopBorder={false}
					showSideBorders={false}
					backgroundColour={neutral[93]}
					element="aside"
				>
					<AdSlot position="merchandising" display={format.display} />
				</ElementContainer>
			</main>

			{NAV.subNavSections && (
				<ElementContainer
					data-print-layout="hide"
					padded={false}
					element="aside"
				>
					<Island deferUntil="visible">
						<SubNav
							subNavSections={NAV.subNavSections}
							currentNavLink={NAV.currentNavLink}
							format={format}
						/>
					</Island>
				</ElementContainer>
			)}

			<ElementContainer
				data-print-layout="hide"
				padded={false}
				backgroundColour={brandBackground.primary}
				borderColour={brandBorder.primary}
				showSideBorders={false}
				element="footer"
			>
				<Footer
					pageFooter={CAPI.pageFooter}
					pillar={format.theme}
					pillars={NAV.pillars}
					urls={CAPI.nav.readerRevenueLinks.header}
					edition={CAPI.editionId}
					contributionsServiceUrl={CAPI.contributionsServiceUrl}
				/>
			</ElementContainer>

			<BannerWrapper data-print-layout="hide">
				<Island deferUntil="idle" clientOnly={true}>
					<StickyBottomBanner
						contentType={CAPI.contentType}
						contributionsServiceUrl={contributionsServiceUrl}
						idApiUrl={CAPI.config.idApiUrl}
						isMinuteArticle={CAPI.pageType.isMinuteArticle}
						isPaidContent={CAPI.pageType.isPaidContent}
						isPreview={!!CAPI.config.isPreview}
						isSensitive={CAPI.config.isSensitive}
						keywordsId={CAPI.config.keywordIds}
						pageId={CAPI.pageId}
						section={CAPI.config.section}
						sectionName={CAPI.sectionName}
						shouldHideReaderRevenue={CAPI.shouldHideReaderRevenue}
						switches={CAPI.config.switches}
						tags={CAPI.tags}
					/>
				</Island>
			</BannerWrapper>
			<MobileStickyContainer data-print-layout="hide" />
		</>
	);
};
