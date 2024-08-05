import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign, ArticleDisplay, ArticleSpecial } from '@guardian/libs';
import {
	from,
	palette as sourcePalette,
	until,
} from '@guardian/source/foundations';
import { Hide } from '@guardian/source/react-components';
import { StraightLines } from '@guardian/source-development-kitchen/react-components';
import { AdPortals } from '../components/AdPortals.importable';
import { AdSlot, MobileStickyContainer } from '../components/AdSlot.web';
import { AffiliateDisclaimer } from '../components/AffiliateDisclaimer';
import { AppsFooter } from '../components/AppsFooter.importable';
import { AppsLightboxImageStore } from '../components/AppsLightboxImageStore.importable';
import { ArticleBody } from '../components/ArticleBody';
import { ArticleContainer } from '../components/ArticleContainer';
import { ArticleHeadline } from '../components/ArticleHeadline';
import { ArticleMetaApps } from '../components/ArticleMeta.apps';
import { ArticleMeta } from '../components/ArticleMeta.web';
import { ArticleTitle } from '../components/ArticleTitle';
import { Border } from '../components/Border';
import { Carousel } from '../components/Carousel.importable';
import { DecideLines } from '../components/DecideLines';
import { DiscussionLayout } from '../components/DiscussionLayout';
import { Footer } from '../components/Footer';
import { GridItem } from '../components/GridItem';
import { Header } from '../components/Header';
import { HeaderAdSlot } from '../components/HeaderAdSlot';
import { Island } from '../components/Island';
import { LabsHeader } from '../components/LabsHeader';
import { MainMedia } from '../components/MainMedia';
import { Masthead } from '../components/Masthead/Masthead';
import { MostViewedFooterData } from '../components/MostViewedFooterData.importable';
import { MostViewedFooterLayout } from '../components/MostViewedFooterLayout';
import { MostViewedRightWithAd } from '../components/MostViewedRightWithAd.importable';
import { Nav } from '../components/Nav/Nav';
import { OnwardsUpper } from '../components/OnwardsUpper.importable';
import { RightColumn } from '../components/RightColumn';
import { Section } from '../components/Section';
import { SlotBodyEnd } from '../components/SlotBodyEnd.importable';
import { Standfirst } from '../components/Standfirst';
import { StickyBottomBanner } from '../components/StickyBottomBanner.importable';
import { SubMeta } from '../components/SubMeta';
import { SubNav } from '../components/SubNav.importable';
import { canRenderAds } from '../lib/canRenderAds';
import { getContributionsServiceUrl } from '../lib/contributions';
import { decideTrail } from '../lib/decideTrail';
import { decideLanguage, decideLanguageDirection } from '../lib/lang';
import { parse } from '../lib/slot-machine-flags';
import type { NavType } from '../model/extract-nav';
import { palette as themePalette } from '../palette';
import type { DCRArticle } from '../types/frontend';
import type { RenderingTarget } from '../types/renderingTarget';
import { BannerWrapper, SendToBack, Stuck } from './lib/stickiness';

const ShowcaseGrid = ({ children }: { children: React.ReactNode }) => (
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
					grid-template-columns: 219px 1px 620px 60px 320px;
					grid-template-areas:
						'title  border  headline   headline headline'
						'lines  border  media      media    media'
						'meta   border  media      media    media'
						'meta   border  standfirst .        right-column'
						'.      border  body       .        right-column'
						'.      border  .          .        right-column';
				}

				${until.wide} {
					grid-template-columns: 140px 1px 620px 300px;
					grid-template-areas:
						'title  border  headline    headline'
						'lines  border  media       media'
						'meta   border  media       media'
						'meta   border  standfirst  right-column'
						'.      border  body        right-column'
						'.      border  .           right-column';
				}

				/*
					Explanation of each unit of grid-template-columns

					Main content
					Right Column
				*/
				${until.leftCol} {
					grid-template-columns: 620px 300px;
					grid-template-areas:
						'title      right-column'
						'headline   right-column'
						'standfirst right-column'
						'media      right-column'
						'lines      right-column'
						'meta       right-column'
						'body       right-column'
						'.          right-column';
				}

				${until.desktop} {
					grid-column-gap: 0px;
					grid-template-columns: 100%; /* Main content */
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
					grid-template-columns: 100%; /* Main content */
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

const maxWidth = css`
	${from.desktop} {
		max-width: 620px;
	}
`;

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
const mainMediaWrapper = css`
	position: relative;
`;

const PositionHeadline = ({
	design,
	children,
}: {
	design: ArticleDesign;
	children: React.ReactNode;
}) => {
	switch (design) {
		case ArticleDesign.Interview:
			return (
				<div
					css={css`
						${from.leftCol} {
							margin-bottom: -100px;
						}
					`}
				>
					<div css={maxWidth}>{children}</div>
				</div>
			);
		default:
			return <div css={maxWidth}>{children}</div>;
	}
};

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

export const ShowcaseLayout = (props: WebProps | AppsProps) => {
	const { article, format, renderingTarget } = props;
	const {
		config: { isPaidContent, host },
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

	const showComments = article.isCommentable && !isPaidContent;

	const { branding } = article.commercialProperties[article.editionId];

	const contributionsServiceUrl = getContributionsServiceUrl(article);

	const inUpdatedHeaderABTest =
		article.config.abTests.updatedHeaderDesignVariant === 'variant';

	const renderAds = isWeb && canRenderAds(article);

	const isLabs = format.theme === ArticleSpecial.Labs;

	const shouldShowTagLink =
		isWeb &&
		!!article.config.switches.tagLinkDesign &&
		article.config.abTests.tagLinkDesignControl !== 'control' &&
		article.tags.some(({ id }) => id === 'sport/olympic-games-2024');

	const { absoluteServerTimes = false } = article.config.switches;

	return (
		<>
			{isWeb && (
				<>
					{!isLabs ? (
						<>
							<div>
								{renderAds && (
									<Stuck>
										<Section
											fullWidth={true}
											showTopBorder={false}
											showSideBorders={false}
											padSides={false}
											shouldCenter={false}
										>
											<HeaderAdSlot
												isPaidContent={
													!!article.config
														.isPaidContent
												}
												shouldHideReaderRevenue={
													!!article.config
														.shouldHideReaderRevenue
												}
											/>
										</Section>
									</Stuck>
								)}

								{inUpdatedHeaderABTest ? (
									<Masthead
										nav={props.NAV}
										editionId={article.editionId}
										idUrl={article.config.idUrl}
										mmaUrl={article.config.mmaUrl}
										discussionApiUrl={
											article.config.discussionApiUrl
										}
										idApiUrl={article.config.idApiUrl}
										contributionsServiceUrl={
											contributionsServiceUrl
										}
										showSubNav={true}
										isImmersive={false}
										hasPageSkin={false}
										hasPageSkinContentSelfConstrain={false}
									/>
								) : (
									<>
										<SendToBack>
											<Section
												fullWidth={true}
												shouldCenter={false}
												showTopBorder={false}
												showSideBorders={false}
												padSides={false}
												backgroundColour={
													sourcePalette.brand[400]
												}
												element="header"
											>
												<Header
													editionId={
														article.editionId
													}
													idUrl={article.config.idUrl}
													mmaUrl={
														article.config.mmaUrl
													}
													discussionApiUrl={
														article.config
															.discussionApiUrl
													}
													urls={
														article.nav
															.readerRevenueLinks
															.header
													}
													remoteHeader={
														!!article.config
															.switches
															.remoteHeader
													}
													contributionsServiceUrl={
														contributionsServiceUrl
													}
													idApiUrl={
														article.config.idApiUrl
													}
													headerTopBarSearchCapiSwitch={
														!!article.config
															.switches
															.headerTopBarSearchCapi
													}
												/>
											</Section>
											<Section
												fullWidth={true}
												borderColour={
													sourcePalette.brand[600]
												}
												showTopBorder={false}
												padSides={false}
												backgroundColour={
													sourcePalette.brand[400]
												}
												element="nav"
												format={format}
											>
												<Nav
													nav={props.NAV}
													isImmersive={
														format.display ===
														ArticleDisplay.Immersive
													}
													displayRoundel={
														format.display ===
															ArticleDisplay.Immersive ||
														format.theme ===
															ArticleSpecial.Labs
													}
													selectedPillar={
														props.NAV.selectedPillar
													}
													subscribeUrl={
														article.nav
															.readerRevenueLinks
															.header.subscribe
													}
													editionId={
														article.editionId
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
													format={format}
												>
													<Island
														priority="enhancement"
														defer={{
															until: 'idle',
														}}
													>
														<SubNav
															subNavSections={
																props.NAV
																	.subNavSections
															}
															currentNavLink={
																props.NAV
																	.currentNavLink
															}
															position="header"
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
												borderColour={themePalette(
													'--article-border',
												)}
											>
												<StraightLines
													count={4}
													color={themePalette(
														'--straight-lines',
													)}
													cssOverrides={css`
														display: block;
													`}
												/>
											</Section>
										</SendToBack>
									</>
								)}
							</div>
						</>
					) : (
						// Else, this is a labs article so just show Nav and the Labs header
						<>
							<div>
								{renderAds && (
									<Stuck zIndex="stickyAdWrapper">
										<Section
											fullWidth={true}
											showTopBorder={false}
											showSideBorders={false}
											padSides={false}
										>
											<HeaderAdSlot
												isPaidContent={
													!!article.config
														.isPaidContent
												}
												shouldHideReaderRevenue={
													!!article.config
														.shouldHideReaderRevenue
												}
											/>
										</Section>
									</Stuck>
								)}
								<Stuck zIndex="stickyAdWrapperNav">
									<Section
										fullWidth={true}
										borderColour={sourcePalette.brand[600]}
										showTopBorder={false}
										padSides={false}
										backgroundColour={
											sourcePalette.brand[400]
										}
										element="nav"
									>
										<Nav
											nav={props.NAV}
											isImmersive={
												format.display ===
												ArticleDisplay.Immersive
											}
											displayRoundel={
												format.display ===
													ArticleDisplay.Immersive ||
												format.theme ===
													ArticleSpecial.Labs
											}
											selectedPillar={
												props.NAV.selectedPillar
											}
											subscribeUrl={
												article.nav.readerRevenueLinks
													.header.subscribe
											}
											editionId={article.editionId}
										/>
									</Section>
								</Stuck>
							</div>
							<Stuck zIndex="stickyAdWrapperLabsHeader">
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
						</>
					)}
				</>
			)}
			<main
				data-layout="ShowcaseLayout"
				className={shouldShowTagLink ? 'sticky-tag-link-test' : ''}
				id="maincontent"
				lang={decideLanguage(article.lang)}
				dir={decideLanguageDirection(article.isRightToLeftLang)}
			>
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
					borderColour={themePalette('--article-border')}
				>
					<ShowcaseGrid>
						<GridItem area="media">
							<div css={mainMediaWrapper}>
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
									abTests={article.config.abTests}
									switches={article.config.switches}
									isAdFreeUser={article.isAdFreeUser}
									isSensitive={article.config.isSensitive}
									editionId={article.editionId}
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
								shouldShowTagLink={shouldShowTagLink}
							/>
						</GridItem>
						<GridItem area="border">
							<Border />
						</GridItem>
						<GridItem area="headline">
							<PositionHeadline design={format.design}>
								<ArticleHeadline
									format={format}
									headlineString={article.headline}
									tags={article.tags}
									byline={article.byline}
									webPublicationDateDeprecated={
										article.webPublicationDateDeprecated
									}
								/>
							</PositionHeadline>
						</GridItem>
						<GridItem area="standfirst">
							<Standfirst
								format={format}
								standfirst={article.standfirst}
							/>
						</GridItem>
						<GridItem area="lines">
							<div css={maxWidth}>
								<div css={stretchLines}>
									<DecideLines
										format={format}
										color={themePalette('--straight-lines')}
									/>
								</div>
							</div>
						</GridItem>
						<GridItem area="meta" element="aside">
							<div css={maxWidth}>
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
												isCommentable={
													article.isCommentable
												}
												discussionApiUrl={
													article.config
														.discussionApiUrl
												}
												shortUrlId={
													article.config.shortUrlId
												}
											></ArticleMetaApps>
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
												isCommentable={
													article.isCommentable
												}
												discussionApiUrl={
													article.config
														.discussionApiUrl
												}
												shortUrlId={
													article.config.shortUrlId
												}
											/>
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
											tags={article.tags}
											primaryDateline={
												article.webPublicationDateDisplay
											}
											secondaryDateline={
												article.webPublicationSecondaryDateDisplay
											}
											isCommentable={
												article.isCommentable
											}
											discussionApiUrl={
												article.config.discussionApiUrl
											}
											shortUrlId={
												article.config.shortUrlId
											}
										/>
										{!!article.affiliateLinksDisclaimer && (
											<AffiliateDisclaimer />
										)}
									</>
								)}
							</div>
						</GridItem>
						<GridItem area="body">
							<ArticleContainer format={format}>
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
									tableOfContents={article.tableOfContents}
									lang={article.lang}
									isRightToLeftLang={
										article.isRightToLeftLang
									}
									editionId={article.editionId}
								/>
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
											stage={article.config.stage}
											tags={article.tags}
											renderAds={renderAds}
											isLabs={isLabs}
											articleEndSlot={
												!!article.config.switches
													.articleEndSlot
											}
										/>
									</Island>
								)}
								<StraightLines
									count={4}
									color={themePalette('--straight-lines')}
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
										article.showBottomSocialButtons && isWeb
									}
								/>
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
											renderAds={renderAds}
											shouldHideReaderRevenue={
												!!article.config
													.shouldHideReaderRevenue
											}
										/>
									</Island>
								</RightColumn>
							</div>
						</GridItem>
					</ShowcaseGrid>
				</Section>

				{renderAds && !isLabs && (
					<Section
						fullWidth={true}
						padSides={false}
						showTopBorder={false}
						showSideBorders={false}
						backgroundColour={themePalette('--ad-background')}
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
								absoluteServerTimes={absoluteServerTimes}
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
						absoluteServerTimes={absoluteServerTimes}
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
									ajaxUrl={article.config.ajaxUrl}
									edition={article.editionId}
								/>
							</Island>
						</MostViewedFooterLayout>
					</Section>
				)}

				{renderAds && !isLabs && (
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
			{isWeb && props.NAV.subNavSections && (
				<Section fullWidth={true} padSides={false} element="aside">
					<Island priority="enhancement" defer={{ until: 'visible' }}>
						<SubNav
							subNavSections={props.NAV.subNavSections}
							currentNavLink={props.NAV.currentNavLink}
							position="footer"
						/>
					</Island>
				</Section>
			)}
			{isWeb && (
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
							urls={article.nav.readerRevenueLinks.footer}
							editionId={article.editionId}
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
								pageId={article.pageId}
								sectionId={article.config.section}
								shouldHideReaderRevenue={
									article.shouldHideReaderRevenue
								}
								remoteBannerSwitch={
									!!article.config.switches.remoteBanner
								}
								tags={article.tags}
							/>
						</Island>
					</BannerWrapper>
					<MobileStickyContainer
						contentType={article.contentType}
						pageId={article.pageId}
					/>
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
