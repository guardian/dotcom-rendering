import { css, Global } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDisplay, ArticleSpecial } from '@guardian/libs';
import {
	from,
	palette as sourcePalette,
	until,
} from '@guardian/source-foundations';
import { StraightLines } from '@guardian/source-react-components-development-kitchen';
import React from 'react';
import { AdPortals } from '../components/AdPortals.importable';
import { AdSlot, MobileStickyContainer } from '../components/AdSlot.web';
import { AppsFooter } from '../components/AppsFooter.importable';
import { ArticleBody } from '../components/ArticleBody';
import { ArticleContainer } from '../components/ArticleContainer';
import { ArticleHeadline } from '../components/ArticleHeadline';
import { ArticleMeta } from '../components/ArticleMeta';
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
import { MostViewedFooterData } from '../components/MostViewedFooterData.importable';
import { MostViewedFooterLayout } from '../components/MostViewedFooterLayout';
import { Nav } from '../components/Nav/Nav';
import { OnwardsUpper } from '../components/OnwardsUpper.importable';
import { Section } from '../components/Section';
import { SlotBodyEnd } from '../components/SlotBodyEnd.importable';
import { Standfirst } from '../components/Standfirst';
import { StarRating } from '../components/StarRating/StarRating';
import { StickyBottomBanner } from '../components/StickyBottomBanner.importable';
import { SubMeta } from '../components/SubMeta';
import { SubNav } from '../components/SubNav.importable';
import { canRenderAds } from '../lib/canRenderAds';
import { getContributionsServiceUrl } from '../lib/contributions';
import { decidePalette } from '../lib/decidePalette';
import { decideTrail } from '../lib/decideTrail';
import type { NavType } from '../model/extract-nav';
import { palette as themePalette } from '../palette';
import type { DCRArticle } from '../types/frontend';
import type { RenderingTarget } from '../types/renderingTarget';
import {
	interactiveGlobalStyles,
	interactiveLegacyClasses,
} from './lib/interactiveLegacyStyling';
import { BannerWrapper, Stuck } from './lib/stickiness';

const InteractiveGrid = ({ children }: { children: React.ReactNode }) => (
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
				*/
				${from.wide} {
					grid-template-columns: 219px 1px 1fr;

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

				/*
					Explanation of each unit of grid-template-columns

					Left Column (220 - 1px border)
					Vertical grey border
					Main content
				*/
				${until.wide} {
					grid-template-columns: 140px 1px 1fr;

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
					grid-template-columns: minmax(0, 1fr); /* Main content */
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
					grid-template-columns: minmax(0, 1fr); /* Main content */
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
					grid-template-columns: minmax(0, 1fr); /* Main content */
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

export const InteractiveLayout = (props: WebProps | AppsProps) => {
	const { article, format, renderingTarget } = props;
	const {
		config: { isPaidContent, host },
	} = article;

	const showComments = article.isCommentable;

	const { branding } = article.commercialProperties[article.editionId];

	const palette = decidePalette(format);

	const contributionsServiceUrl = getContributionsServiceUrl(article);

	const isApps = renderingTarget === 'Apps';
	const isWeb = renderingTarget === 'Web';
	/**
	 * This property currently only applies to the header and merchandising slots
	 */
	const renderAds = isWeb && canRenderAds(article);
	return (
		<>
			{isWeb && (
				<>
					{article.isLegacyInteractive && (
						<Global styles={interactiveGlobalStyles} />
					)}

					<div>
						{renderAds && (
							<Stuck>
								<div data-print-layout="hide">
									<Section
										fullWidth={true}
										showTopBorder={false}
										showSideBorders={false}
										padSides={false}
										shouldCenter={false}
									>
										<HeaderAdSlot />
									</Section>
								</div>
							</Stuck>
						)}

						{format.theme !== ArticleSpecial.Labs && (
							<div data-print-layout="hide">
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
										urls={
											article.nav.readerRevenueLinks
												.header
										}
										remoteHeader={
											!!article.config.switches
												.remoteHeader
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
							</div>
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

						{props.NAV.subNavSections &&
							format.theme !== ArticleSpecial.Labs && (
								<Section
									fullWidth={true}
									backgroundColour={
										palette.background.article
									}
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
											linkHoverColour={
												palette.text.articleLinkHover
											}
											borderColour={palette.border.subNav}
										/>
									</Island>
								</Section>
							)}

						{format.theme !== ArticleSpecial.Labs && (
							<Section
								fullWidth={true}
								backgroundColour={palette.background.article}
								padSides={false}
								showTopBorder={false}
							>
								<StraightLines
									cssOverrides={css`
										display: block;
									`}
									count={4}
								/>
							</Section>
						)}
					</div>

					{format.theme === ArticleSpecial.Labs && (
						<Stuck>
							<Section
								fullWidth={true}
								showTopBorder={false}
								backgroundColour={sourcePalette.labs[400]}
								borderColour={sourcePalette.neutral[60]}
								sectionId="labs-header"
							>
								<LabsHeader />
							</Section>
						</Stuck>
					)}

					{renderAds && article.config.switches.surveys && (
						<AdSlot position="survey" display={format.display} />
					)}
				</>
			)}
			<main data-layout="InteractiveLayout">
				{isApps && (
					<Island priority="critical">
						<AdPortals />
					</Island>
				)}
				<Section
					fullWidth={true}
					data-print-layout="hide"
					showTopBorder={false}
					backgroundColour={palette.background.article}
					borderColour={palette.border.article}
					element="article"
					className={interactiveLegacyClasses.contentInteractive}
				>
					<div
						className={interactiveLegacyClasses.contentInteractive}
					>
						<InteractiveGrid>
							<GridItem area="media">
								<div css={maxWidth}>
									<MainMedia
										format={format}
										elements={article.mainMediaElements}
										host={host}
										pageId={article.pageId}
										webTitle={article.webTitle}
										ajaxUrl={article.config.ajaxUrl}
										switches={article.config.switches}
										isAdFreeUser={article.isAdFreeUser}
										isSensitive={article.config.isSensitive}
										imagesForAppsLightbox={[]}
									/>
								</div>
							</GridItem>
							<GridItem area="title" element="aside">
								<div
									className={`${interactiveLegacyClasses.contentLabels} ${interactiveLegacyClasses.contentLabelsNotImmersive}`}
								>
									<ArticleTitle
										format={format}
										tags={article.tags}
										sectionLabel={article.sectionLabel}
										sectionUrl={article.sectionUrl}
										guardianBaseURL={
											article.guardianBaseURL
										}
										badge={article.badge?.enhanced}
									/>
								</div>
							</GridItem>
							<GridItem area="border">
								{format.theme === ArticleSpecial.Labs ? (
									<></>
								) : (
									<Border format={format} />
								)}
							</GridItem>
							<GridItem area="headline">
								<div css={maxWidth}>
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
							<GridItem area="standfirst">
								<Standfirst
									format={format}
									standfirst={article.standfirst}
								/>
							</GridItem>

							<GridItem area="lines">
								<div css={maxWidth}>
									<div css={stretchLines}>
										<DecideLines format={format} />
									</div>
								</div>
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
										isCommentable={article.isCommentable}
										discussionApiUrl={
											article.config.discussionApiUrl
										}
										shortUrlId={article.config.shortUrlId}
										ajaxUrl={article.config.ajaxUrl}
									/>
								</div>
							</GridItem>
							<GridItem area="body" element="article">
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
										tableOfContents={
											article.tableOfContents
										}
										lang={article.lang}
										isRightToLeftLang={
											article.isRightToLeftLang
										}
										imagesForAppsLightbox={[]}
									/>
								</ArticleContainer>
							</GridItem>
						</InteractiveGrid>
					</div>
				</Section>

				<Section
					stretchRight={false}
					showTopBorder={false}
					backgroundColour={palette.background.article}
					borderColour={palette.border.article}
					padContent={false}
				>
					<div
						css={css`
							max-width: 620px;
						`}
					>
						<Island priority="feature" defer={{ until: 'visible' }}>
							<SlotBodyEnd
								contentType={article.contentType}
								contributionsServiceUrl={
									contributionsServiceUrl
								}
								idApiUrl={article.config.idApiUrl}
								isMinuteArticle={
									article.pageType.isMinuteArticle
								}
								isPaidContent={article.pageType.isPaidContent}
								keywordIds={article.config.keywordIds}
								pageId={article.pageId}
								sectionId={article.config.section}
								shouldHideReaderRevenue={
									article.shouldHideReaderRevenue
								}
								stage={article.config.stage}
								tags={article.tags}
								renderAds={renderAds}
								isLabs={false}
							/>
						</Island>
					</div>
				</Section>

				<Section
					fullWidth={true}
					showTopBorder={false}
					padSides={false}
					backgroundColour={palette.background.article}
				>
					<StraightLines
						count={4}
						data-print-layout="hide"
						cssOverrides={css`
							display: block;
						`}
					/>
				</Section>

				<Section
					fullWidth={true}
					showTopBorder={false}
					backgroundColour={palette.background.article}
				>
					<SubMeta
						format={format}
						subMetaKeywordLinks={article.subMetaKeywordLinks}
						subMetaSectionLinks={article.subMetaSectionLinks}
						pageId={article.pageId}
						webUrl={article.webURL}
						webTitle={article.webTitle}
						showBottomSocialButtons={
							article.showBottomSocialButtons &&
							renderingTarget === 'Web'
						}
						badge={article.badge?.enhanced}
					/>
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
					<Section fullWidth={true} showTopBorder={false}>
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
					/>
				</Island>

				{!isPaidContent && showComments && (
					<Section
						fullWidth={true}
						sectionId="comments"
						data-print-layout="hide"
						element="section"
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
			</main>

			{isWeb && props.NAV.subNavSections && (
				<Section
					fullWidth={true}
					data-print-layout="hide"
					padSides={false}
					element="aside"
				>
					<Island priority="enhancement" defer={{ until: 'visible' }}>
						<SubNav
							subNavSections={props.NAV.subNavSections}
							currentNavLink={props.NAV.currentNavLink}
							linkHoverColour={palette.text.articleLinkHover}
							borderColour={palette.border.subNav}
						/>
					</Island>
				</Section>
			)}

			{isWeb && (
				<>
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
