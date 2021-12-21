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

import { StarRating } from '@root/src/web/components/StarRating/StarRating';
import { ArticleBody } from '@root/src/web/components/ArticleBody';
import { RightColumn } from '@root/src/web/components/RightColumn';
import { ArticleTitle } from '@root/src/web/components/ArticleTitle';
import { ArticleContainer } from '@root/src/web/components/ArticleContainer';
import { ArticleMeta } from '@root/src/web/components/ArticleMeta';
import { SubMeta } from '@root/src/web/components/SubMeta';
import { MainMedia } from '@root/src/web/components/MainMedia';
import { ArticleHeadline } from '@root/src/web/components/ArticleHeadline';
import { ArticleHeadlinePadding } from '@root/src/web/components/ArticleHeadlinePadding';
import { Standfirst } from '@root/src/web/components/Standfirst';
import { Header } from '@root/src/web/components/Header';
import { Footer } from '@root/src/web/components/Footer';
import { SubNav } from '@root/src/web/components/SubNav.importable';
import { ElementContainer } from '@root/src/web/components/ElementContainer';
import { Nav } from '@root/src/web/components/Nav/Nav';
import { HeaderAdSlot } from '@root/src/web/components/HeaderAdSlot';
import { MobileStickyContainer, AdSlot } from '@root/src/web/components/AdSlot';
import { GridItem } from '@root/src/web/components/GridItem';
import { AgeWarning } from '@root/src/web/components/AgeWarning';
import { Discussion } from '@frontend/web/components/Discussion';
import { Pagination } from '@frontend/web/components/Pagination';
import { KeyEventsContainer } from '@frontend/web/components/KeyEventsContainer';

import { buildAdTargeting } from '@root/src/lib/ad-targeting';
import { parse } from '@frontend/lib/slot-machine-flags';
import { getAgeWarning } from '@root/src/lib/age-warning';
import {
	decideLineCount,
	decideLineEffect,
	getCurrentPillar,
} from '@root/src/web/lib/layoutHelpers';
import {
	Stuck,
	SendToBack,
	BannerWrapper,
} from '@root/src/web/layouts/lib/stickiness';
import Accordion from '@guardian/common-rendering/src/components/accordion';
import { Hide } from '@guardian/source-react-components';
import { Placeholder } from '../components/Placeholder';
import { ContainerLayout } from '../components/ContainerLayout';
import { Hydrate } from '../components/Hydrate';

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
						'lines		 media'
						'meta		 media'
						'keyevents	 media'
						'keyevents	 body'
						'keyevents	 body'
						'. 			 .';
				}
				/* from wide define fixed body width */
				${from.wide} {
					grid-column-gap: 20px;
					grid-template-columns: 240px 700px 1fr;
					grid-template-areas:
						'lines 		 media	   right-column'
						'meta  		 media     right-column'
						'keyevents   media 	   right-column'
						'keyevents   body      right-column'
						'keyevents   body      right-column'
						'.			 .         right-column';
				}
				/* until desktop define fixed body width */
				${until.desktop} {
					grid-template-columns: 1fr; /* Main content */
					grid-template-areas:
						'media'
						'lines'
						'meta'
						'keyevents'
						'body';
				}
			}
		`}
	>
		{children}
	</div>
);

const LiveGridSport = ({ children }: { children: React.ReactNode }) => (
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
					grid-template-columns: 220px 700px;
					grid-template-areas:
						'lines		 matchtabs'
						'meta		 media'
						'meta		 media'
						'keyevents	 media'
						'keyevents	 body'
						'keyevents	 body'
						'. 			 .';
				}
				/* from wide define fixed body width */
				${from.wide} {
					grid-column-gap: 20px;
					grid-template-columns: 220px 700px 1fr;
					grid-template-areas:
						'lines 		 matchtabs right-column'
						'meta  		 media     right-column'
						'keyevents   media 	   right-column'
						'keyevents   body      right-column'
						'keyevents   body      right-column'
						'.			 .         right-column';
				}
				/* until desktop define fixed body width */
				${until.desktop} {
					grid-template-columns: 700px; /* Main content */
					grid-template-areas:
						'matchtabs'
						'media'
						'lines'
						'meta'
						'keyevents'
						'body';
				}
				/* fluid until tablet */
				${until.tablet} {
					grid-template-columns: 1fr; /* Main content */
					grid-template-areas:
						'matchtabs'
						'media'
						'lines'
						'meta'
						'keyevents'
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

const keyEventsTopMargin = css`
	${from.desktop} {
		margin-top: ${space[1]}px;
	}
`;

const sidePaddingDesktop = css`
	${from.desktop} {
		padding-left: ${space[5]}px;
	}
`;

const accordionBottomMargin = css`
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

const ageWarningMargins = css`
	margin-top: 12px;
	margin-left: -10px;
	margin-bottom: 6px;
	${from.tablet} {
		margin-left: -20px;
	}
	${from.leftCol} {
		margin-left: -10px;
		margin-top: 0;
	}
`;

interface Props {
	CAPI: CAPIType;
	NAV: NavType;
	format: ArticleFormat;
	palette: Palette;
}

export const LiveLayout = ({ CAPI, NAV, format, palette }: Props) => {
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

	const showComments = CAPI.isCommentable;

	const showMatchTabs = CAPI.matchUrl;

	const age = getAgeWarning(CAPI.tags, CAPI.webPublicationDateDeprecated);

	const { branding } = CAPI.commercialProperties[CAPI.editionId];
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
							isAnniversary={
								CAPI.config.switches.anniversaryHeaderSvg
							}
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
							<Hydrate when="idle">
								<SubNav
									subNavSections={NAV.subNavSections}
									currentNavLink={NAV.currentNavLink}
									format={format}
								/>
							</Hydrate>
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
									palette={palette}
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
									palette={palette}
									tags={CAPI.tags}
									sectionLabel={CAPI.sectionLabel}
									sectionUrl={CAPI.sectionUrl}
									guardianBaseURL={CAPI.guardianBaseURL}
									badge={CAPI.badge}
								/>
							</Hide>

							<Placeholder
								shouldShimmer={false}
								rootId="match-nav"
								height={230}
							/>
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
										palette={palette}
										tags={CAPI.tags}
										sectionLabel={CAPI.sectionLabel}
										sectionUrl={CAPI.sectionUrl}
										guardianBaseURL={CAPI.guardianBaseURL}
										badge={CAPI.badge}
									/>
								</GridItem>
								<GridItem area="headline">
									<div css={maxWidth}>
										<ArticleHeadlinePadding
											design={format.design}
										>
											{age && (
												<div css={ageWarningMargins}>
													<AgeWarning age={age} />
												</div>
											)}
											{!CAPI.matchUrl && (
												<ArticleHeadline
													format={format}
													headlineString={
														CAPI.headline
													}
													tags={CAPI.tags}
													byline={CAPI.author.byline}
													palette={palette}
												/>
											)}
											{age && (
												<AgeWarning
													age={age}
													isScreenReader={true}
												/>
											)}
										</ArticleHeadlinePadding>
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
								<></>
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
											palette={palette}
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
						<div
							css={css`
								height: ${space[4]}px;
							`}
						/>
					</ElementContainer>

					<ElementContainer
						showTopBorder={false}
						backgroundColour={palette.background.article}
						borderColour={palette.border.article}
						padded={false}
					>
						{CAPI.matchUrl ? (
							<LiveGridSport>
								<GridItem area="matchtabs" element="aside">
									<div css={maxWidth}>
										{CAPI.matchUrl && showMatchTabs && (
											<Placeholder
												rootId="match-tabs"
												height={40}
											/>
										)}
									</div>
								</GridItem>
								<GridItem area="media">
									<div css={maxWidth}>
										<MainMedia
											format={format}
											palette={palette}
											elements={CAPI.mainMediaElements}
											adTargeting={adTargeting}
											host={host}
											pageId={CAPI.pageId}
											webTitle={CAPI.webTitle}
										/>
									</div>
								</GridItem>
								<GridItem area="lines">
									<Hide until="desktop">
										<div
											css={[maxWidth, sidePaddingDesktop]}
										>
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
								</GridItem>
								<GridItem area="meta" element="aside">
									<Hide until="desktop">
										<div
											css={[maxWidth, sidePaddingDesktop]}
										>
											<ArticleMeta
												branding={branding}
												format={format}
												palette={palette}
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
											/>
										</div>
									</Hide>
								</GridItem>
								<GridItem area="keyevents">
									<div
										css={[
											sticky,
											keyEventsTopMargin,
											sidePaddingDesktop,
											accordionBottomMargin,
										]}
									>
										<KeyEventsContainer
											format={format}
											keyEvents={CAPI.keyEvents}
										/>
									</div>
								</GridItem>
								<GridItem area="body">
									<ArticleContainer format={format}>
										{CAPI.pagination &&
											CAPI.pagination.currentPage !==
												1 && (
												<Pagination
													currentPage={
														CAPI.pagination
															?.currentPage || 1
													}
													totalPages={
														CAPI.pagination
															?.totalPages || 1
													}
													newest={
														CAPI.pagination?.newest
													}
													oldest={
														CAPI.pagination?.oldest
													}
													newer={
														CAPI.pagination?.newer
													}
													older={
														CAPI.pagination?.older
													}
													format={format}
												/>
											)}
										<ArticleBody
											format={format}
											palette={palette}
											blocks={CAPI.blocks}
											adTargeting={adTargeting}
											host={host}
											pageId={CAPI.pageId}
											webTitle={CAPI.webTitle}
										/>
										{CAPI.pagination &&
											CAPI.pagination.totalPages > 1 && (
												<Pagination
													currentPage={
														CAPI.pagination
															?.currentPage || 1
													}
													totalPages={
														CAPI.pagination
															?.totalPages || 1
													}
													newest={
														CAPI.pagination?.newest
													}
													oldest={
														CAPI.pagination?.oldest
													}
													newer={
														CAPI.pagination?.newer
													}
													older={
														CAPI.pagination?.older
													}
													format={format}
												/>
											)}
										{showBodyEndSlot && (
											<div id="slot-body-end" />
										)}
										<Lines
											data-print-layout="hide"
											count={4}
											effect="straight"
										/>
										<SubMeta
											palette={palette}
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
											<AdSlot
												position="right"
												display={format.display}
											/>
										</RightColumn>
									</div>
								</GridItem>
							</LiveGridSport>
						) : (
							<LiveGrid>
								<GridItem area="media">
									<div css={maxWidth}>
										<MainMedia
											format={format}
											palette={palette}
											elements={CAPI.mainMediaElements}
											adTargeting={adTargeting}
											host={host}
											pageId={CAPI.pageId}
											webTitle={CAPI.webTitle}
										/>
									</div>
								</GridItem>
								<GridItem area="lines">
									<Hide until="desktop">
										<div
											css={[maxWidth, sidePaddingDesktop]}
										>
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
								</GridItem>
								<GridItem area="meta" element="aside">
									<Hide until="desktop">
										<div css={sidePaddingDesktop}>
											<ArticleMeta
												branding={branding}
												format={format}
												palette={palette}
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
											/>
										</div>
									</Hide>
								</GridItem>
								<GridItem area="keyevents">
									<div
										css={[
											sticky,
											keyEventsTopMargin,
											sidePaddingDesktop,
											accordionBottomMargin,
										]}
									>
										<KeyEventsContainer
											format={format}
											keyEvents={CAPI.keyEvents}
										/>
									</div>
								</GridItem>
								<GridItem area="body">
									<div css={accordionBottomMargin}>
										<Accordion
											supportsDarkMode={false}
											accordionTitle="Live feed"
											context="liveFeed"
										>
											<ArticleContainer format={format}>
												{CAPI.pagination &&
													CAPI.pagination
														.currentPage !== 1 && (
														<Pagination
															currentPage={
																CAPI.pagination
																	?.currentPage ||
																1
															}
															totalPages={
																CAPI.pagination
																	?.totalPages ||
																1
															}
															newest={
																CAPI.pagination
																	?.newest
															}
															oldest={
																CAPI.pagination
																	?.oldest
															}
															newer={
																CAPI.pagination
																	?.newer
															}
															older={
																CAPI.pagination
																	?.older
															}
															format={format}
														/>
													)}
												<ArticleBody
													format={format}
													palette={palette}
													blocks={CAPI.blocks}
													adTargeting={adTargeting}
													host={host}
													pageId={CAPI.pageId}
													webTitle={CAPI.webTitle}
												/>
												{CAPI.pagination &&
													CAPI.pagination.totalPages >
														1 && (
														<Pagination
															currentPage={
																CAPI.pagination
																	?.currentPage ||
																1
															}
															totalPages={
																CAPI.pagination
																	?.totalPages ||
																1
															}
															newest={
																CAPI.pagination
																	?.newest
															}
															oldest={
																CAPI.pagination
																	?.oldest
															}
															newer={
																CAPI.pagination
																	?.newer
															}
															older={
																CAPI.pagination
																	?.older
															}
															format={format}
														/>
													)}
												{showBodyEndSlot && (
													<div id="slot-body-end" />
												)}
												<Lines
													data-print-layout="hide"
													count={4}
													effect="straight"
												/>
												<SubMeta
													palette={palette}
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
											/>
										</RightColumn>
									</div>
								</GridItem>
							</LiveGrid>
						)}
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

				{/* Onwards (when signed OUT) */}
				<aside
					data-print-layout="hide"
					id="onwards-upper-whensignedout"
				/>
				{showOnwardsLower && (
					<ElementContainer
						data-print-layout="hide"
						sectionId="onwards-lower-whensignedout"
						element="aside"
					/>
				)}

				{!isPaidContent && showComments && (
					<ElementContainer
						data-print-layout="hide"
						sectionId="comments"
						element="section"
					>
						<Discussion
							discussionApiUrl={CAPI.config.discussionApiUrl}
							shortUrlId={CAPI.config.shortUrlId}
							isCommentable={CAPI.isCommentable}
							format={format}
							discussionD2Uid={CAPI.config.discussionD2Uid}
							discussionApiClientHeader={
								CAPI.config.discussionApiClientHeader
							}
							enableDiscussionSwitch={false}
							isAdFreeUser={CAPI.isAdFreeUser}
							shouldHideAds={CAPI.shouldHideAds}
							beingHydrated={false}
						/>
					</ElementContainer>
				)}

				{/* Onwards (when signed IN) */}
				<aside
					data-print-layout="hide"
					id="onwards-upper-whensignedin"
				/>
				{showOnwardsLower && (
					<ElementContainer
						data-print-layout="hide"
						sectionId="onwards-lower-whensignedin"
						element="aside"
					/>
				)}

				{!isPaidContent && (
					<ElementContainer
						data-print-layout="hide"
						sectionId="most-viewed-footer"
						element="aside"
					/>
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
					<Hydrate when="visible">
						<SubNav
							subNavSections={NAV.subNavSections}
							currentNavLink={NAV.currentNavLink}
							format={format}
						/>
					</Hydrate>
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
				/>
			</ElementContainer>

			<BannerWrapper data-print-layout="hide" />
			<MobileStickyContainer data-print-layout="hide" />
		</>
	);
};
