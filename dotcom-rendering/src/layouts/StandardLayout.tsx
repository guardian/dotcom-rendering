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
import { AffiliateDisclaimer } from '../components/AffiliateDisclaimer';
import { AppsEpic } from '../components/AppsEpic.importable';
import { AppsFooter } from '../components/AppsFooter.importable';
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
import { GetMatchNav } from '../components/GetMatchNav.importable';
import { GetMatchStats } from '../components/GetMatchStats.importable';
import { GetMatchTabs } from '../components/GetMatchTabs.importable';
import { GridItem } from '../components/GridItem';
import { GuardianLabsLines } from '../components/GuardianLabsLines';
import { HeaderAdSlot } from '../components/HeaderAdSlot';
import { Island } from '../components/Island';
import { LabsHeader } from '../components/LabsHeader';
import { MainMedia } from '../components/MainMedia';
import { Masthead } from '../components/Masthead/Masthead';
import { MostViewedFooterData } from '../components/MostViewedFooterData.importable';
import { MostViewedFooterLayout } from '../components/MostViewedFooterLayout';
import { MostViewedRightWithAd } from '../components/MostViewedRightWithAd.importable';
import { OnwardsUpper } from '../components/OnwardsUpper.importable';
import { RightColumn } from '../components/RightColumn';
import { Section } from '../components/Section';
import { SlotBodyEnd } from '../components/SlotBodyEnd.importable';
import { Standfirst } from '../components/Standfirst';
import { StarRating } from '../components/StarRating/StarRating';
import { StickyBottomBanner } from '../components/StickyBottomBanner.importable';
import { SubMeta } from '../components/SubMeta';
import { SubNav } from '../components/SubNav.importable';
import {
	ArticleDesign,
	type ArticleFormat,
	ArticleSpecial,
} from '../lib/articleFormat';
import { canRenderAds } from '../lib/canRenderAds';
import { getContributionsServiceUrl } from '../lib/contributions';
import { decideTrail } from '../lib/decideTrail';
import { parse } from '../lib/slot-machine-flags';
import type { NavType } from '../model/extract-nav';
import { palette as themePalette } from '../palette';
import type { ArticleDeprecated } from '../types/article';
import type { RenderingTarget } from '../types/renderingTarget';
import { BannerWrapper, Stuck } from './lib/stickiness';

const StandardGrid = ({
	children,
	isMatchReport,
	isMedia,
}: {
	children: React.ReactNode;
	isMatchReport: boolean;
	isMedia: boolean;
}) => (
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
					grid-template-columns: 219px 1px 620px 80px 300px;

					${isMatchReport
						? css`
								grid-template-areas:
									'title  border  matchNav   . right-column'
									'title  border  matchtabs  . right-column'
									'title  border  headline   . right-column'
									'.      border  standfirst . right-column'
									'meta   border  media      . right-column'
									'meta   border  body       . right-column'
									'.      border  .          . right-column';
						  `
						: isMedia
						? css`
								grid-template-areas:
									'title  border  headline   headline   .'
									'.      border  disclaimer disclaimer right-column'
									'meta   border  media      media      right-column'
									'meta   border  standfirst standfirst right-column'
									'.      border  body       body       right-column'
									'.      border  .          .          right-column';
						  `
						: css`
								grid-template-areas:
									'title  border  headline   . right-column'
									'.      border  standfirst . right-column'
									'meta   border  media      . right-column'
									'meta   border  body       . right-column'
									'.      border  .          . right-column';
						  `}
				}
			}

			/*
					Explanation of each unit of grid-template-columns

					Left Column
					Vertical grey border
					Main content
					Right Column
				*/
			${until.wide} {
				grid-template-columns: 140px 1px 620px 300px;

				${isMatchReport
					? css`
							grid-template-areas:
								'title  border  matchNav     right-column'
								'title  border  matchtabs    right-column'
								'title  border  headline     right-column'
								'.      border  standfirst   right-column'
								'meta   border  media        right-column'
								'meta   border  body         right-column'
								'.      border  .            right-column';
					  `
					: isMedia
					? css`
							grid-template-areas:
								'title  border  headline     .'
								'.      border  disclaimer   right-column'
								'meta   border  media        right-column'
								'meta   border  standfirst   right-column'
								'meta   border  body         right-column'
								'.      border  .            right-column';
					  `
					: css`
							grid-template-areas:
								'title  border  headline     right-column'
								'.      border  standfirst   right-column'
								'.      border  disclaimer   right-column'
								'meta   border  media        right-column'
								'meta   border  body         right-column'
								'.      border  .            right-column';
					  `}
			}

			/*
					Explanation of each unit of grid-template-columns

					Main content
					Right Column
				*/
			${until.leftCol} {
				grid-template-columns: 620px 300px;
				${isMatchReport
					? css`
							grid-template-areas:
								'matchNav      right-column'
								'matchtabs	   right-column'
								'title         right-column'
								'headline      right-column'
								'standfirst    right-column'
								'media         right-column'
								'meta          right-column'
								'body          right-column'
								'.             right-column';
					  `
					: isMedia
					? css`
							grid-template-areas:
								'title         .'
								'headline      .'
								'disclaimer    right-column'
								'media         right-column'
								'standfirst    right-column'
								'meta          right-column'
								'body          right-column'
								'.             right-column';
					  `
					: css`
							grid-template-areas:
								'title         right-column'
								'headline      right-column'
								'standfirst    right-column'
								'disclaimer    right-column'
								'media         right-column'
								'meta          right-column'
								'body          right-column'
								'.             right-column';
					  `}
			}

			${until.desktop} {
				grid-template-columns: 100%; /* Main content */
				${isMatchReport
					? css`
							grid-template-areas:
								'matchNav'
								'matchtabs'
								'title'
								'headline'
								'standfirst'
								'media'
								'meta'
								'body';
					  `
					: isMedia
					? css`
							grid-template-areas:
								'title'
								'headline'
								'disclaimer'
								'media'
								'standfirst'
								'meta'
								'body';
					  `
					: css`
							grid-template-areas:
								'title'
								'headline'
								'standfirst'
								'disclaimer'
								'media'
								'meta'
								'body';
					  `}
			}

			${until.tablet} {
				grid-column-gap: 0px;

				grid-template-columns: 100%; /* Main content */
				${isMatchReport
					? css`
							grid-template-areas:
								'matchNav'
								'matchtabs'
								'media'
								'title'
								'headline'
								'standfirst'
								'meta'
								'body';
					  `
					: isMedia
					? css`
							grid-template-areas:
								'title'
								'headline'
								'disclaimer'
								'media'
								'standfirst'
								'meta'
								'body';
					  `
					: css`
							grid-template-areas:
								'media'
								'title'
								'headline'
								'standfirst'
								'disclaimer'
								'meta'
								'body';
					  `}
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
`;

interface Props {
	article: ArticleDeprecated;
	format: ArticleFormat;
	renderingTarget: RenderingTarget;
}

interface WebProps extends Props {
	NAV: NavType;
	renderingTarget: 'Web';
}

interface AppProps extends Props {
	renderingTarget: 'Apps';
}

export const StandardLayout = (props: WebProps | AppProps) => {
	const { article, format, renderingTarget } = props;
	const {
		config: { isPaidContent, host, hasSurveyAd },
		editionId,
	} = article;

	const isWeb = renderingTarget === 'Web';
	const isApps = renderingTarget === 'Apps';

	const showBodyEndSlot =
		isWeb &&
		(parse(article.slotMachineFlags ?? '').showBodyEnd ||
			article.config.switches.slotBodyEnd);

	const { absoluteServerTimes = false } = article.config.switches;

	// TODO:
	// 1) Read 'forceEpic' value from URL parameter and use it to force the slot to render
	// 2) Otherwise, ensure slot only renders if `article.config.shouldHideReaderRevenue` equals false.

	const footballMatchUrl =
		article.matchType === 'FootballMatchType'
			? article.matchUrl
			: undefined;

	const isMatchReport =
		format.design === ArticleDesign.MatchReport && !!footballMatchUrl;

	const isMedia =
		format.design === ArticleDesign.Video ||
		format.design === ArticleDesign.Audio;

	const showComments = article.isCommentable && !isPaidContent;

	const { branding } = article.commercialProperties[article.editionId];

	const contributionsServiceUrl = getContributionsServiceUrl(article);

	const isLabs = format.theme === ArticleSpecial.Labs;

	const renderAds = canRenderAds(article);

	return (
		<>
			{isWeb && (
				<div data-print-layout="hide" id="bannerandheader">
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
						showSubNav={!isLabs}
						showSlimNav={false}
						hasPageSkinContentSelfConstrain={true}
						pageId={article.pageId}
					/>
				</div>
			)}

			{format.theme === ArticleSpecial.Labs && (
				<Stuck>
					<Section
						fullWidth={true}
						showTopBorder={false}
						backgroundColour={sourcePalette.labs[400]}
						borderColour={sourcePalette.neutral[60]}
						sectionId="labs-header"
						element="aside"
					>
						<LabsHeader editionId={editionId} />
					</Section>
				</Stuck>
			)}

			{isWeb && renderAds && hasSurveyAd && (
				<AdSlot position="survey" display={format.display} />
			)}

			<main data-layout="StandardLayout">
				{isApps && renderAds && (
					<Island priority="critical">
						<AdPortals />
					</Island>
				)}
				<Section
					fullWidth={true}
					showTopBorder={false}
					backgroundColour={themePalette('--article-background')}
					borderColour={themePalette('--article-border')}
					innerBackgroundColour={themePalette(
						'--article-inner-background',
					)}
					element="article"
				>
					<StandardGrid
						isMatchReport={isMatchReport}
						isMedia={isMedia}
					>
						<GridItem area="matchNav" element="aside">
							<div css={maxWidth}>
								{isMatchReport && (
									<Island
										priority="feature"
										defer={{ until: 'visible' }}
									>
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
								)}
							</div>
						</GridItem>
						<GridItem area="matchtabs" element="aside">
							<div css={maxWidth}>
								{isMatchReport && (
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
							</div>
						</GridItem>
						<GridItem area="media">
							<div css={!isMedia && maxWidth}>
								<MainMedia
									format={format}
									elements={article.mainMediaElements}
									host={host}
									pageId={article.pageId}
									webTitle={article.webTitle}
									ajaxUrl={article.config.ajaxUrl}
									abTests={article.config.abTests}
									switches={article.config.switches}
									isAdFreeUser={article.isAdFreeUser}
									isSensitive={article.config.isSensitive}
									editionId={article.editionId}
									hideCaption={isMedia}
									shouldHideAds={article.shouldHideAds}
									contentType={article.contentType}
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
								isMatch={!!footballMatchUrl}
							/>
						</GridItem>
						<GridItem area="border">
							{format.theme === ArticleSpecial.Labs ? (
								<></>
							) : (
								<Border />
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
								/>
							</div>
						</GridItem>
						<GridItem area="standfirst">
							{!isUndefined(article.starRating) ? (
								<div css={starWrapper}>
									<StarRating
										rating={article.starRating}
										size="large"
									/>
								</div>
							) : (
								<></>
							)}
							<Standfirst
								format={format}
								standfirst={article.standfirst}
							/>
						</GridItem>
						<GridItem area="meta" element="aside">
							<div css={maxWidth}>
								<div css={stretchLines}>
									{isWeb &&
									format.theme === ArticleSpecial.Labs &&
									format.design !== ArticleDesign.Video ? (
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
							{isApps ? (
								<>
									<Hide from="leftCol">
										<div css={maxWidth}>
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
										</div>
									</Hide>
									<Hide until="leftCol">
										<div css={maxWidth}>
											<ArticleMeta
												branding={branding}
												format={format}
												pageId={article.pageId}
												webTitle={article.webTitle}
												byline={article.byline}
												source={article.config.source}
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
												mainMediaElements={
													article.mainMediaElements
												}
											/>
										</div>
									</Hide>
								</>
							) : (
								<div css={maxWidth}>
									<ArticleMeta
										branding={branding}
										format={format}
										pageId={article.pageId}
										webTitle={article.webTitle}
										byline={article.byline}
										source={article.config.source}
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
										mainMediaElements={
											article.mainMediaElements
										}
									/>
									{!!article.affiliateLinksDisclaimer && (
										<AffiliateDisclaimer />
									)}
								</div>
							)}
						</GridItem>
						<GridItem area="body">
							<ArticleContainer format={format}>
								<ArticleBody
									format={format}
									blocks={article.blocks}
									pinnedPost={article.pinnedPost}
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
									shouldHideAds={article.shouldHideAds}
								/>
								{format.design === ArticleDesign.MatchReport &&
									!!footballMatchUrl && (
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

								{isApps && (
									<Island priority="critical">
										<AppsEpic />
									</Island>
								)}

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
									data-print-layout="hide"
									count={4}
									cssOverrides={css`
										display: block;
									`}
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
										article.showBottomSocialButtons &&
										renderingTarget === 'Web'
									}
								/>
							</ArticleContainer>
						</GridItem>
						<GridItem area="right-column">
							<div
								css={css`
									padding-top: ${isMedia ? 0 : 6}px;
									height: 100%;
									${from.desktop} {
										/* above 980 */
										margin-left: 20px;
										margin-right: -20px;
										padding-bottom: ${isMedia ? 41 : 0}px;
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
											renderAds={isWeb && renderAds}
											shouldHideReaderRevenue={
												!!article.config
													.shouldHideReaderRevenue
											}
										/>
									</Island>
								</RightColumn>
							</div>
						</GridItem>
					</StandardGrid>
				</Section>

				{isWeb && renderAds && !isLabs && (
					<Section
						fullWidth={true}
						padSides={false}
						showTopBorder={false}
						showSideBorders={false}
						backgroundColour={themePalette('--ad-background')}
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
						renderingTarget={renderingTarget}
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
						data-link-name="most-popular"
						data-component="most-popular"
						backgroundColour={themePalette(
							'--article-section-background',
						)}
						borderColour={themePalette('--article-border')}
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

				{isWeb && renderAds && !isLabs && (
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
			{isWeb && (
				<>
					{props.NAV.subNavSections && (
						<Section
							fullWidth={true}
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
									position="footer"
								/>
							</Island>
						</Section>
					)}
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
						data-print-layout="hide"
						contentType={article.contentType}
						pageId={article.pageId}
					/>
				</>
			)}

			{isApps && (
				<>
					<Section
						fullWidth={true}
						backgroundColour={themePalette('--ad-background')}
						borderColour={themePalette('--article-border')}
						padSides={false}
						showSideBorders={false}
						element="footer"
					>
						<Island priority="critical">
							<AppsFooter />
						</Island>
					</Section>
				</>
			)}
		</>
	);
};
