import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign, ArticleDisplay, ArticleSpecial } from '@guardian/libs';
import {
	from,
	palette as sourcePalette,
	space,
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
import { ArticleMetaApps } from '../components/ArticleMeta.apps';
import { ArticleTitle } from '../components/ArticleTitle';
import { Border } from '../components/Border';
import { Caption } from '../components/Caption';
import { Carousel } from '../components/Carousel.importable';
import { DecideLines } from '../components/DecideLines';
import { Disclaimer } from '../components/Disclaimer';
import { DiscussionLayout } from '../components/DiscussionLayout';
import { Footer } from '../components/Footer';
import { GridItem } from '../components/GridItem';
import { GuardianLabsLines } from '../components/GuardianLabsLines';
import { HeadlineByline } from '../components/HeadlineByline';
import { Hide } from '../components/Hide';
import { Island } from '../components/Island';
import { LabsHeader } from '../components/LabsHeader';
import { MainMedia } from '../components/MainMedia';
import { MostViewedFooterData } from '../components/MostViewedFooterData.importable';
import { MostViewedFooterLayout } from '../components/MostViewedFooterLayout';
import { minNavHeightPx, Nav } from '../components/Nav/Nav';
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
import { decideMainMediaCaption } from '../lib/decide-caption';
import { decideTrail } from '../lib/decideTrail';
import { getZIndex } from '../lib/getZIndex';
import { LABS_HEADER_HEIGHT } from '../lib/labs-constants';
import { parse } from '../lib/slot-machine-flags';
import type { NavType } from '../model/extract-nav';
import { palette as themePalette } from '../palette';
import type { DCRArticle } from '../types/frontend';
import { BannerWrapper, Stuck } from './lib/stickiness';

const ImmersiveGrid = ({ children }: { children: React.ReactNode }) => (
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

				/*
					Explanation of each unit of grid-template-columns

					Left Column (220 - 1px border)
					Vertical grey border
					Main content
					Right Column
				*/
				${from.wide} {
					grid-column-gap: 10px;
					grid-template-columns: 219px 1px 1fr 300px;
					grid-template-areas:
						'caption    border      title       right-column'
						'.          border      headline    right-column'
						'.          border      standfirst  right-column'
						'.          border      disclaimer  right-column'
						'.          border      byline      right-column'
						'lines      border      body        right-column'
						'meta       border      body        right-column'
						'meta       border      body        right-column'
						'.          border      body        right-column'
						'.          border      .           right-column';
				}

				/*
					Explanation of each unit of grid-template-columns

					Left Column (220 - 1px border)
					Vertical grey border
					Main content
					Right Column
				*/
				${until.wide} {
					grid-column-gap: 10px;
					grid-template-columns: 140px 1px 1fr 300px;
					grid-template-areas:
						'.          border      title       right-column'
						'.          border      headline    right-column'
						'.          border      standfirst  right-column'
						'.          border      disclaimer  right-column'
						'.          border      byline      right-column'
						'lines      border      body        right-column'
						'meta       border      body        right-column'
						'meta       border      body        right-column'
						'.          border      body        right-column'
						'.          border      .           right-column';
				}

				/*
					Explanation of each unit of grid-template-columns

					Main content
					Right Column
				*/
				${until.leftCol} {
					grid-template-columns: 1fr 300px;
					grid-column-gap: 20px;
					grid-template-areas:
						'title       right-column'
						'headline    right-column'
						'standfirst  right-column'
						'disclaimer  right-column'
						'byline      right-column'
						'caption     right-column'
						'lines       right-column'
						'meta        right-column'
						'body        right-column';
				}

				${until.desktop} {
					grid-column-gap: 0px;
					grid-template-columns: 1fr; /* Main content */
					grid-template-areas:
						'title'
						'headline'
						'standfirst'
						'disclaimer'
						'byline'
						'caption'
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

interface CommonProps {
	article: DCRArticle;
	format: ArticleFormat;
}

interface WebProps extends CommonProps {
	NAV: NavType;
	renderingTarget: 'Web';
}

interface AppProps extends CommonProps {
	renderingTarget: 'Apps';
}

const Box = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			/*
				This pseudo css shows a black box to the right of the headline
				so that the black background of the inverted text stretches
				all the way right. But only from mobileLandscape because below
				that we want to show a gap. To work properly it needs to wrap
				the headline so it inherits the correct height based on the length
				of the headline text
			*/
			${from.mobileLandscape} {
				position: relative;
				:after {
					content: '';
					display: block;
					position: absolute;
					width: 50%;
					right: 0;
					background-color: ${themePalette('--headline-background')};
					${getZIndex('immersiveBlackBox')}
					top: 0;
					bottom: 0;
				}
			}
		`}
	>
		{children}
	</div>
);

export const ImmersiveLayout = (props: WebProps | AppProps) => {
	const { article, format, renderingTarget } = props;

	const {
		config: { isPaidContent, host },
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

	/** Mobile articles with comments should be filtered in MAPI but we leave this in for clarity **/
	const showComments = isWeb && article.isCommentable && !isPaidContent;

	const mainMedia = article.mainMediaElements[0];

	const captionText = decideMainMediaCaption(mainMedia);

	const HEADLINE_OFFSET = mainMedia ? 120 : 0;

	const { branding } = article.commercialProperties[article.editionId];

	const contributionsServiceUrl = getContributionsServiceUrl(article);

	const isLabs = format.theme === ArticleSpecial.Labs;

	/**
	We need change the height values depending on whether the labs header is there or not to keep
	the headlines appearing at a consistent height between labs and non labs immersive articles.
	*/

	const labsHeaderHeight = LABS_HEADER_HEIGHT;
	const combinedHeight = (minNavHeightPx + labsHeaderHeight).toString();

	const navAndLabsHeaderHeight = isLabs
		? `${combinedHeight}px`
		: `${minNavHeightPx}px`;

	const hasAffiliateLinksDisclaimer = !!article.affiliateLinksDisclaimer;

	const hasMainMediaStyles = css`
		height: calc(80vh - ${navAndLabsHeaderHeight});
		/**
		80vh is normally enough but don't let the content shrink vertically too
		much just in case
		*/
		min-height: calc(25rem - ${navAndLabsHeaderHeight});
		${from.desktop} {
			height: calc(100vh - ${navAndLabsHeaderHeight});
			min-height: calc(31.25rem - ${navAndLabsHeaderHeight});
		}
		${from.wide} {
			min-height: calc(50rem - ${navAndLabsHeaderHeight});
		}
	`;

	const LeftColCaption = () => (
		<div
			css={css`
				margin-top: ${HEADLINE_OFFSET}px;
				position: absolute;
				margin-left: 20px;
			`}
		>
			<Caption
				captionText={captionText}
				format={format}
				shouldLimitWidth={true}
				isLeftCol={true}
			/>
		</div>
	);

	const renderAds = isWeb && canRenderAds(article);

	return (
		<>
			{isWeb && (
				<>
					<div
						css={css`
							${getZIndex('headerWrapper')}
							order: 0;
						`}
					>
						<Section
							fullWidth={true}
							showSideBorders={false}
							showTopBorder={false}
							padSides={false}
							backgroundColour={sourcePalette.brand[400]}
							element="nav"
						>
							<Nav
								isImmersive={
									format.display === ArticleDisplay.Immersive
								}
								displayRoundel={
									format.display ===
										ArticleDisplay.Immersive ||
									format.theme === ArticleSpecial.Labs
								}
								selectedPillar={props.NAV.selectedPillar}
								nav={props.NAV}
								subscribeUrl={
									article.nav.readerRevenueLinks.header
										.contribute
								}
								editionId={article.editionId}
								headerTopBarSwitch={
									!!article.config.switches.headerTopNav
								}
							/>
						</Section>
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
				</>
			)}

			<header
				css={css`
					background-color: ${themePalette('--article-background')};
				`}
			>
				<div
					css={[
						mainMedia && hasMainMediaStyles,
						css`
							display: flex;
							flex-direction: column;
						`,
					]}
				>
					<MainMedia
						format={format}
						elements={article.mainMediaElements}
						starRating={
							format.design === ArticleDesign.Review &&
							article.starRating !== undefined
								? article.starRating
								: undefined
						}
						host={host}
						hideCaption={true}
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
				{mainMedia && (
					<>
						<div
							css={css`
								margin-top: -${HEADLINE_OFFSET}px;
								/*
                        This z-index is what ensures the headline title text shows above main media. For
                        the actual headline we set the z-index deeper in ArticleHeadline itself so that
                        the text appears above the pseudo Box element
                    */
								position: relative;
								${getZIndex('articleHeadline')};
							`}
						>
							<Section
								verticalMargins={false}
								padContent={false}
								showTopBorder={false}
								padSides={false}
								showSideBorders={false}
								leftContent={<LeftColCaption />}
							>
								<ArticleTitle
									format={format}
									tags={article.tags}
									sectionLabel={article.sectionLabel}
									sectionUrl={article.sectionUrl}
									guardianBaseURL={article.guardianBaseURL}
									badge={article.badge?.enhanced}
								/>
							</Section>
							<Box>
								<Section
									verticalMargins={false}
									padContent={false}
									padSides={false}
									showTopBorder={false}
									showSideBorders={false}
								>
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
								</Section>
							</Box>
						</div>
					</>
				)}
			</header>

			<main data-layout="ImmersiveLayout">
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
					showSideBorders={false}
					backgroundColour={themePalette('--article-background')}
					element="article"
				>
					<ImmersiveGrid>
						{/* Above leftCol, the Caption is controlled by Section ^^ */}
						<GridItem area="caption">
							<Hide when="above" breakpoint="leftCol">
								<Caption
									captionText={captionText}
									format={format}
									shouldLimitWidth={false}
								/>
							</Hide>
						</GridItem>
						<GridItem area="border">
							{format.design === ArticleDesign.PhotoEssay ? (
								<></>
							) : (
								<Border />
							)}
						</GridItem>
						<GridItem area="title" element="aside">
							<>
								{!mainMedia && (
									<div
										css={css`
											margin-top: -8px;
											margin-left: -4px;
											margin-bottom: 12px;

											${until.tablet} {
												margin-left: -20px;
											}
										`}
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
								)}
							</>
						</GridItem>
						<GridItem area="headline">
							<>
								{!mainMedia && (
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
								)}
							</>
						</GridItem>
						<GridItem area="standfirst">
							<Standfirst
								format={format}
								standfirst={article.standfirst}
							/>
						</GridItem>
						<GridItem area="disclaimer">
							{hasAffiliateLinksDisclaimer && (
								<Disclaimer
									html={
										article.affiliateLinksDisclaimer ?? ''
									}
								></Disclaimer>
							)}
						</GridItem>
						<GridItem area="byline">
							{!!article.byline && (
								<HeadlineByline
									format={format}
									tags={article.tags}
									byline={article.byline}
								/>
							)}
						</GridItem>
						<GridItem area="lines">
							{format.design === ArticleDesign.PhotoEssay &&
							!isLabs ? (
								<></>
							) : (
								<div css={maxWidth}>
									<div css={stretchLines}>
										{format.theme ===
										ArticleSpecial.Labs ? (
											<GuardianLabsLines />
										) : (
											<DecideLines
												format={format}
												color={themePalette(
													'--article-border',
												)}
											/>
										)}
									</div>
								</div>
							)}
						</GridItem>
						<GridItem area="meta" element="aside">
							<div css={maxWidth}>
								{isApps ? (
									<>
										<Hide when="above" breakpoint="leftCol">
											<ArticleMetaApps
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
												ajaxUrl={article.config.ajaxUrl}
											></ArticleMetaApps>
										</Hide>
										<Hide when="below" breakpoint="leftCol">
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
												ajaxUrl={article.config.ajaxUrl}
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
										ajaxUrl={article.config.ajaxUrl}
									/>
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
									keywordIds={article.config.keywordIds}
									contributionsServiceUrl={
										contributionsServiceUrl
									}
									contentType={article.contentType}
									isPreview={article.config.isPreview}
									idUrl={article.config.idUrl ?? ''}
									isDev={!!article.config.isDev}
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
									<>
										{mainMedia && renderAds && (
											<div
												css={css`
													margin-top: ${space[4]}px;
												`}
											>
												{
													<AdSlot
														position="right"
														display={format.display}
														isPaidContent={
															article.pageType
																.isPaidContent
														}
													/>
												}
											</div>
										)}
									</>
								</RightColumn>
							</div>
						</GridItem>
					</ImmersiveGrid>
				</Section>
				{!isLabs && renderAds && (
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
						<Island
							priority="enhancement"
							defer={{ until: 'visible' }}
						>
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
						isPaidContent={article.config.isPaidContent ?? false}
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

				{showComments && (
					<Section
						fullWidth={true}
						sectionId="comments"
						element="aside"
						backgroundColour={themePalette('--article-background')}
						borderColour={themePalette('--article-border')}
						fontColour={themePalette('--article-section-title')}
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
				{!isLabs && renderAds && (
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
								tags={article.tags}
							/>
						</Island>
					</BannerWrapper>
					{renderAds && <MobileStickyContainer />}
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
