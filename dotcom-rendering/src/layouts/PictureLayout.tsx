import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import {
	from,
	palette as sourcePalette,
	until,
} from '@guardian/source/foundations';
import { Hide } from '@guardian/source/react-components';
import { StraightLines } from '@guardian/source-development-kitchen/react-components';
import { AdPortals } from '../components/AdPortals.importable';
import { AdSlot, MobileStickyContainer } from '../components/AdSlot.web';
import { AppsFooter } from '../components/AppsFooter.importable';
import { ArticleContainer } from '../components/ArticleContainer';
import { ArticleHeadline } from '../components/ArticleHeadline';
import { ArticleMetaApps } from '../components/ArticleMeta.apps';
import { ArticleMeta } from '../components/ArticleMeta.web';
import { ArticleTitle } from '../components/ArticleTitle';
import { Border } from '../components/Border';
import { Carousel } from '../components/Carousel.importable';
import { ContributorAvatar } from '../components/ContributorAvatar';
import { DecideLines } from '../components/DecideLines';
import { DiscussionLayout } from '../components/DiscussionLayout';
import { Footer } from '../components/Footer';
import { GridItem } from '../components/GridItem';
import { HeaderAdSlot } from '../components/HeaderAdSlot';
import { Island } from '../components/Island';
import { MainMedia } from '../components/MainMedia';
import { Masthead } from '../components/Masthead/Masthead';
import { MostViewedFooterData } from '../components/MostViewedFooterData.importable';
import { MostViewedFooterLayout } from '../components/MostViewedFooterLayout';
import { OnwardsUpper } from '../components/OnwardsUpper.importable';
import { Section } from '../components/Section';
import { Standfirst } from '../components/Standfirst';
import { StickyBottomBanner } from '../components/StickyBottomBanner.importable';
import { SubMeta } from '../components/SubMeta';
import { SubNav } from '../components/SubNav.importable';
import { ArticleDesign, type ArticleFormat } from '../lib/articleFormat';
import { getSoleContributor } from '../lib/byline';
import { canRenderAds } from '../lib/canRenderAds';
import { getContributionsServiceUrl } from '../lib/contributions';
import { decideTrail } from '../lib/decideTrail';
import { decideLanguage, decideLanguageDirection } from '../lib/lang';
import type { NavType } from '../model/extract-nav';
import { palette as themePalette } from '../palette';
import type { ArticleDeprecated } from '../types/article';
import type { RenderingTarget } from '../types/renderingTarget';
import { BannerWrapper, Stuck } from './lib/stickiness';

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

					Duplicate lines are required to ensure the left column does not have extra vertical space.
				*/
				${from.wide} {
					grid-template-columns: 219px 1px 1020px;
					grid-template-areas:
						'title  border  headline'
						'.      border  standfirst'
						'meta   border  media'
						'meta   border  submeta';
				}

				${until.wide} {
					grid-template-columns: 140px 1px 620px 0 300px;
					grid-template-areas:
						'title  border  headline    headline   headline'
						'.      border  standfirst  standfirst standfirst'
						'meta   border  media       media      media'
						'meta   border  submeta     submeta    submeta';
				}

				/*
					Explanation of each unit of grid-template-columns

					Main content
					Right Column
				*/
				${until.leftCol} {
					grid-column-gap: 0px;
					grid-template-columns: 100%; /* Main content */
					grid-template-areas:
						'title     '
						'headline  '
						'meta      '
						'standfirst'
						'media     '
						'submeta   '
						'.         ';
				}

				${until.desktop} {
					grid-column-gap: 0px;
					grid-template-columns: 100%; /* Main content */
					grid-template-areas:
						'title'
						'headline'
						'meta'
						'standfirst'
						'media'
						'submeta';
				}

				${until.tablet} {
					grid-column-gap: 0px;
					grid-template-columns: 100%; /* Main content */
					grid-template-areas:
						'title'
						'headline'
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
	pointer-events: none;
	${from.desktop} {
		margin-top: -50px;
	}
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
	article: ArticleDeprecated;
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
		config: { isPaidContent, host, hasSurveyAd },
	} = article;

	const isWeb = renderingTarget === 'Web';
	const isApps = renderingTarget === 'Apps';

	// TODO:
	// 1) Read 'forceEpic' value from URL parameter and use it to force the slot to render
	// 2) Otherwise, ensure slot only renders if `article.config.shouldHideReaderRevenue` equals false.

	const showComments = article.isCommentable && !isPaidContent;

	const { branding } = article.commercialProperties[article.editionId];

	const contributionsServiceUrl = getContributionsServiceUrl(article);

	const renderAds = canRenderAds(article);

	const avatarUrl = getSoleContributor(article.tags, article.byline)
		?.bylineLargeImageUrl;

	const displayAvatarUrl = avatarUrl ? true : false;

	const { absoluteServerTimes = false } = article.config.switches;

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
								<HeaderAdSlot
									abTests={article.config.abTests}
								/>
							</Section>
						</Stuck>
					)}
					<Masthead
						nav={props.NAV}
						editionId={article.editionId}
						idUrl={article.config.idUrl}
						mmaUrl={article.config.mmaUrl}
						discussionApiUrl={article.config.discussionApiUrl}
						idApiUrl={article.config.idApiUrl}
						contributionsServiceUrl={contributionsServiceUrl}
						showSubNav={true}
						showSlimNav={false}
						hasPageSkin={false}
						hasPageSkinContentSelfConstrain={false}
						pageId={article.pageId}
					/>
				</div>
			)}

			{isWeb && renderAds && hasSurveyAd && (
				<AdSlot position="survey" display={format.display} />
			)}

			<main
				data-layout="PictureLayout"
				id="maincontent"
				lang={decideLanguage(article.lang)}
				dir={decideLanguageDirection(article.isRightToLeftLang)}
			>
				{isApps && renderAds && (
					<Island priority="critical">
						<AdPortals />
					</Island>
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
							/>
						</GridItem>
						<GridItem area="border">
							<Border />
						</GridItem>

						{displayAvatarUrl ? (
							<GridItem area="headline">
								<div css={avatarHeadlineWrapper}>
									<div css={maxWidth}>
										<ArticleHeadline
											format={format}
											headlineString={article.headline}
											tags={article.tags}
											byline={article.byline}
											webPublicationDateDeprecated={
												article.webPublicationDateDeprecated
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
										!isUndefined(article.starRating)
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
									shouldHideAds={article.shouldHideAds}
								/>
							</div>
						</GridItem>
						<GridItem area="meta" element="aside">
							<div
								css={[
									LeftColLines(displayAvatarUrl),
									isApps && stretchLines,
								]}
							>
								<StraightLines
									count={displayAvatarUrl ? 8 : 4}
									cssOverrides={css`
										display: block;
									`}
									color={themePalette('--straight-lines')}
								/>
							</div>
							<div>
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
												pageId={article.config.pageId}
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
								/>
							</ArticleContainer>
						</GridItem>
					</PictureGrid>
				</Section>

				{isWeb && renderAds && (
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
						backgroundColour={themePalette(
							'--article-section-background',
						)}
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
								renderingTarget={renderingTarget}
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
							absoluteServerTimes={absoluteServerTimes}
							renderingTarget={renderingTarget}
						/>
					</Island>
				)}
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
						data-link-name="most-popular"
						data-component="most-popular"
						backgroundColour={themePalette(
							'--article-section-background',
						)}
						borderColour={themePalette('--article-border')}
						fontColour={themePalette('--article-section-title')}
					>
						<MostViewedFooterLayout renderAds={isWeb && renderAds}>
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

				{isWeb && renderAds && (
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
