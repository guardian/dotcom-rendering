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
import { ArticleContainer } from '../components/ArticleContainer';
import { ArticleHeadline } from '../components/ArticleHeadline';
import { ArticleMeta } from '../components/ArticleMeta';
import { ArticleMetaApps } from '../components/ArticleMeta.apps';
import { ArticleTitle } from '../components/ArticleTitle';
import { Border } from '../components/Border';
import { Carousel } from '../components/Carousel.importable';
import { ContributorAvatar } from '../components/ContributorAvatar';
import { DecideLines } from '../components/DecideLines';
import { DiscussionLayout } from '../components/DiscussionLayout';
import { Footer } from '../components/Footer';
import { GridItem } from '../components/GridItem';
import { Header } from '../components/Header';
import { HeaderAdSlot } from '../components/HeaderAdSlot';
import { Island } from '../components/Island';
import { MainMedia } from '../components/MainMedia';
import { MostViewedFooterData } from '../components/MostViewedFooterData.importable';
import { MostViewedFooterLayout } from '../components/MostViewedFooterLayout';
import { Nav } from '../components/Nav/Nav';
import { OnwardsUpper } from '../components/OnwardsUpper.importable';
import { Section } from '../components/Section';
import { Standfirst } from '../components/Standfirst';
import { StickyBottomBanner } from '../components/StickyBottomBanner.importable';
import { SubMeta } from '../components/SubMeta';
import { SubNav } from '../components/SubNav.importable';
import { getSoleContributor } from '../lib/byline';
import { canRenderAds } from '../lib/canRenderAds';
import { getContributionsServiceUrl } from '../lib/contributions';
import { decideTrail } from '../lib/decideTrail';
import { decideLanguage, decideLanguageDirection } from '../lib/lang';
import type { NavType } from '../model/extract-nav';
import { palette as themePalette } from '../palette';
import type { DCRArticle } from '../types/frontend';
import type { RenderingTarget } from '../types/renderingTarget';
import { BannerWrapper, SendToBack, Stuck } from './lib/stickiness';

const PictureGrid = ({ children }: { children: React.ReactNode }) => (
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
					grid-template-columns: 219px 1px 1fr;
					grid-template-areas:
						'title  border  headline'
						'.      border  standfirst'
						'lines  border  media'
						'meta   border  media'
						'meta   border  submeta';
				}

				${until.wide} {
					grid-template-columns: 140px 1px 1fr 300px;
					grid-template-areas:
						'title  border  headline    headline'
						'.      border  standfirst  standfirst'
						'lines  border  media       media'
						'meta   border  media       media'
						'meta   border  submeta     submeta';
				}

				/*
					Explanation of each unit of grid-template-columns

					Main content
					Right Column
				*/
				${until.leftCol} {
					grid-column-gap: 0px;
					grid-template-columns: 1fr; /* Main content */
					grid-template-areas:
						'title     '
						'headline  '
						'lines     '
						'meta      '
						'standfirst'
						'media     '
						'submeta   '
						'.         ';
				}

				${until.desktop} {
					grid-column-gap: 0px;
					grid-template-columns: 1fr; /* Main content */
					grid-template-areas:
						'title'
						'headline'
						'lines'
						'meta'
						'standfirst'
						'media'
						'submeta';
				}

				${until.tablet} {
					grid-column-gap: 0px;
					grid-template-columns: 1fr; /* Main content */
					grid-template-areas:
						'title'
						'headline'
						'lines'
						'meta'
						'standfirst'
						'media'
						'submeta';
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

const mainMediaWrapper = (displayAvatarUrl: boolean) => css`
	position: relative;
	${until.phablet} {
		margin-left: 20px;
		margin-right: 20px;
	}
	${until.mobileLandscape} {
		margin-left: 10px;
		margin-right: 10px;
	}
	${displayAvatarUrl
		? css`
				margin-top: 8px;
		  `
		: ``}
`;

const avatarHeadlineWrapper = css`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

// This styling taken from the similar approach in CommentLayout.tsx
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

const LeftColLines = (displayAvatarUrl: boolean) => css`
	margin-bottom: 4px;
	${displayAvatarUrl
		? css`
				margin-top: -29px;
		  `
		: ''}
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

export const PictureLayout = (props: WebProps | AppsProps) => {
	const { article, format, renderingTarget } = props;
	const {
		config: { isPaidContent, host },
	} = article;

	const isWeb = renderingTarget === 'Web';
	const isApps = renderingTarget === 'Apps';

	// TODO:
	// 1) Read 'forceEpic' value from URL parameter and use it to force the slot to render
	// 2) Otherwise, ensure slot only renders if `article.config.shouldHideReaderRevenue` equals false.

	/** Mobile articles with comments should be filtered in MAPI but we leave this in for clarity **/
	const showComments = isWeb && article.isCommentable && !isPaidContent;

	const { branding } = article.commercialProperties[article.editionId];

	const contributionsServiceUrl = getContributionsServiceUrl(article);

	const renderAds = isWeb && canRenderAds(article);

	const showSubNavTopBorder = false;

	const avatarUrl = getSoleContributor(article.tags, article.byline)
		?.bylineLargeImageUrl;

	const displayAvatarUrl = avatarUrl ? true : false;

	return (
		<>
			{isWeb && (
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
							format={format}
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
								format={format}
								showTopBorder={showSubNavTopBorder}
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
										subNavLinkColour={themePalette(
											'--sub-nav-link',
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
								color={themePalette('--straight-lines')}
								cssOverrides={css`
									display: block;
								`}
							/>
						</Section>
					</SendToBack>
				</div>
			)}

			<main
				data-layout="PictureLayout"
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
					borderColour={themePalette('--straight-lines')}
				>
					<PictureGrid>
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

						{displayAvatarUrl ? (
							<GridItem area="headline">
								<div css={[avatarHeadlineWrapper, avatarUrl]}>
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
											hasAvatar={displayAvatarUrl}
										/>
									</div>

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
							</GridItem>
						) : (
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
											article.starRating !== undefined
										}
									/>
								</div>
							</GridItem>
						)}
						<GridItem area="standfirst">
							<Standfirst
								format={format}
								standfirst={article.standfirst}
							/>
						</GridItem>
						<GridItem area="media">
							<div css={mainMediaWrapper(displayAvatarUrl)}>
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
						<GridItem area="lines">
							<div css={LeftColLines(displayAvatarUrl)}>
								<StraightLines
									count={displayAvatarUrl ? 8 : 4}
									cssOverrides={css`
										display: block;
									`}
									color={themePalette('--straight-lines')}
								/>
							</div>
						</GridItem>
						<GridItem area="meta" element="aside">
							<div>
								{isApps ? (
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
										isCommentable={article.isCommentable}
										discussionApiUrl={
											article.config.discussionApiUrl
										}
										shortUrlId={article.config.shortUrlId}
										ajaxUrl={article.config.ajaxUrl}
									></ArticleMetaApps>
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
						<GridItem area="submeta">
							<ArticleContainer format={format}>
								<DecideLines
									color={themePalette('--straight-lines')}
									format={format}
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
					</PictureGrid>
				</Section>

				{renderAds && (
					<Section
						fullWidth={true}
						padSides={false}
						showTopBorder={false}
						showSideBorders={false}
						backgroundColour={sourcePalette.neutral[93]}
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
