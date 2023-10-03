import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign, ArticleDisplay, ArticleSpecial } from '@guardian/libs';
import {
	border,
	brandBackground,
	brandBorder,
	brandLine,
	from,
	labs,
	neutral,
	until,
} from '@guardian/source-foundations';
import { StraightLines } from '@guardian/source-react-components-development-kitchen';
import { AdSlot, MobileStickyContainer } from '../components/AdSlot.web';
import { ArticleBody } from '../components/ArticleBody';
import { ArticleContainer } from '../components/ArticleContainer';
import { ArticleHeadline } from '../components/ArticleHeadline';
import { ArticleMeta } from '../components/ArticleMeta';
import { ArticleTitle } from '../components/ArticleTitle';
import { Border } from '../components/Border';
import { Carousel } from '../components/Carousel.importable';
import { useConfig } from '../components/ConfigContext';
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
import { canRenderAds } from '../lib/canRenderAds';
import { getContributionsServiceUrl } from '../lib/contributions';
import { decidePalette } from '../lib/decidePalette';
import { decideTrail } from '../lib/decideTrail';
import { decideLanguage, decideLanguageDirection } from '../lib/lang';
import { parse } from '../lib/slot-machine-flags';
import type { NavType } from '../model/extract-nav';
import type { DCRArticle } from '../types/frontend';
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
					grid-template-columns: 219px 1px 1fr 300px;
					grid-template-areas:
						'title  border  headline    headline'
						'lines  border  media       media'
						'meta   border  media       media'
						'meta   border  standfirst  right-column'
						'.      border  body        right-column'
						'.      border  .           right-column';
				}

				${until.wide} {
					grid-template-columns: 140px 1px 1fr 300px;
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
					grid-template-columns: 1fr 300px;
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
					grid-template-columns: 1fr; /* Main content */
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
					grid-template-columns: 1fr; /* Main content */
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

interface Props {
	article: DCRArticle;
	NAV: NavType;
	format: ArticleFormat;
}

export const ShowcaseLayout = ({ article, NAV, format }: Props) => {
	const {
		config: { isPaidContent, host },
	} = article;

	const showBodyEndSlot =
		parse(article.slotMachineFlags ?? '').showBodyEnd ||
		article.config.switches.slotBodyEnd;

	// TODO:
	// 1) Read 'forceEpic' value from URL parameter and use it to force the slot to render
	// 2) Otherwise, ensure slot only renders if `article.config.shouldHideReaderRevenue` equals false.

	const showComments = article.isCommentable;

	const { branding } = article.commercialProperties[article.editionId];

	const palette = decidePalette(format);

	const contributionsServiceUrl = getContributionsServiceUrl(article);

	const renderAds = canRenderAds(article);

	const isLabs = format.theme === ArticleSpecial.Labs;

	const { renderingTarget } = useConfig();

	return (
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
								backgroundColour={brandBackground.primary}
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
								borderColour={brandLine.primary}
								showTopBorder={false}
								padSides={false}
								backgroundColour={brandBackground.primary}
								element="nav"
								format={format}
							>
								<Nav
									nav={NAV}
									isImmersive={
										format.display ===
										ArticleDisplay.Immersive
									}
									displayRoundel={
										format.display ===
											ArticleDisplay.Immersive ||
										format.theme === ArticleSpecial.Labs
									}
									selectedPillar={NAV.selectedPillar}
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

							{NAV.subNavSections && (
								<Section
									fullWidth={true}
									backgroundColour={
										palette.background.article
									}
									padSides={false}
									element="aside"
									format={format}
								>
									<Island
										priority="enhancement"
										defer={{ until: 'idle' }}
									>
										<SubNav
											subNavSections={NAV.subNavSections}
											currentNavLink={NAV.currentNavLink}
											linkHoverColour={
												palette.text.articleLinkHover
											}
											borderColour={palette.border.subNav}
											subNavLinkColour={
												palette.text.subNavLink
											}
										/>
									</Island>
								</Section>
							)}

							<Section
								fullWidth={true}
								backgroundColour={palette.background.article}
								padSides={false}
								showTopBorder={false}
								borderColour={palette.border.secondary}
							>
								<StraightLines
									count={4}
									color={palette.border.secondary}
									cssOverrides={css`
										display: block;
									`}
								/>
							</Section>
						</SendToBack>
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
									<HeaderAdSlot />
								</Section>
							</Stuck>
						)}
						<Stuck zIndex="stickyAdWrapperNav">
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
									isImmersive={
										format.display ===
										ArticleDisplay.Immersive
									}
									displayRoundel={
										format.display ===
											ArticleDisplay.Immersive ||
										format.theme === ArticleSpecial.Labs
									}
									selectedPillar={NAV.selectedPillar}
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
						</Stuck>
					</div>
					<Stuck zIndex="stickyAdWrapperLabsHeader">
						<Section
							fullWidth={true}
							showTopBorder={false}
							backgroundColour={labs[400]}
							borderColour={border.primary}
							sectionId="labs-header"
						>
							<LabsHeader />
						</Section>
					</Stuck>
				</>
			)}

			<main
				data-layout="ShowcaseLayout"
				id="maincontent"
				lang={decideLanguage(article.lang)}
				dir={decideLanguageDirection(article.isRightToLeftLang)}
			>
				<Section
					fullWidth={true}
					showTopBorder={false}
					backgroundColour={palette.background.article}
					element="article"
					borderColour={palette.border.secondary}
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
									switches={article.config.switches}
									isAdFreeUser={article.isAdFreeUser}
									isSensitive={article.config.isSensitive}
									imagesForAppsLightbox={[]}
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
							<Border format={format} />
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
									hasStarRating={
										article.starRating !== undefined
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
										color={palette.border.secondary}
									/>
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
									imagesForAppsLightbox={[]}
								/>
								{showBodyEndSlot && (
									<Island
										priority="critical"
										clientOnly={true}
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
											keywordIds={
												article.config.keywordIds
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
										/>
									</Island>
								)}
								<StraightLines
									count={4}
									color={palette.border.secondary}
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
										renderingTarget === 'Web'
									}
									badge={article.badge?.enhanced}
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
					</ShowcaseGrid>
				</Section>

				{renderAds && !isLabs && (
					<Section
						fullWidth={true}
						padSides={false}
						showTopBorder={false}
						showSideBorders={false}
						backgroundColour={neutral[93]}
						element="aside"
					>
						<AdSlot
							position="merchandising-high"
							display={format.display}
						/>
					</Section>
				)}

				{article.storyPackage && (
					<Section fullWidth={true}>
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
								clientOnly={true}
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

				{renderAds && !isLabs && (
					<Section
						fullWidth={true}
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
			</main>

			{NAV.subNavSections && (
				<Section fullWidth={true} padSides={false} element="aside">
					<Island priority="enhancement" defer={{ until: 'visible' }}>
						<SubNav
							subNavSections={NAV.subNavSections}
							currentNavLink={NAV.currentNavLink}
							linkHoverColour={palette.text.articleLinkHover}
							borderColour={palette.border.subNav}
						/>
					</Island>
				</Section>
			)}

			<Section
				fullWidth={true}
				padSides={false}
				backgroundColour={brandBackground.primary}
				borderColour={brandBorder.primary}
				showSideBorders={false}
				element="footer"
			>
				<Footer
					pageFooter={article.pageFooter}
					selectedPillar={NAV.selectedPillar}
					pillars={NAV.pillars}
					urls={article.nav.readerRevenueLinks.header}
					editionId={article.editionId}
					contributionsServiceUrl={article.contributionsServiceUrl}
				/>
			</Section>

			<BannerWrapper>
				<Island
					priority="feature"
					defer={{ until: 'idle' }}
					clientOnly={true}
				>
					<StickyBottomBanner
						contentType={article.contentType}
						contributionsServiceUrl={contributionsServiceUrl}
						idApiUrl={article.config.idApiUrl}
						isMinuteArticle={article.pageType.isMinuteArticle}
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
	);
};
