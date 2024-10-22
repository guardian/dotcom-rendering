import { css } from '@emotion/react';
import {
	from,
	palette as sourcePalette,
	space,
	until,
} from '@guardian/source/foundations';
import { Hide } from '@guardian/source/react-components';
import { StraightLines } from '@guardian/source-development-kitchen/react-components';
import { AdSlot, MobileStickyContainer } from '../components/AdSlot.web';
import { AffiliateDisclaimer } from '../components/AffiliateDisclaimer';
import { ArticleBody } from '../components/ArticleBody';
import { ArticleContainer } from '../components/ArticleContainer';
import { ArticleHeadline } from '../components/ArticleHeadline';
import { ArticleMeta } from '../components/ArticleMeta.web';
import { ArticleTitle } from '../components/ArticleTitle';
import { AudioPlayer } from '../components/AudioPlayer/AudioPlayer';
import { Border } from '../components/Border';
import { Carousel } from '../components/Carousel.importable';
import { DecideLines } from '../components/DecideLines';
import { DiscussionLayout } from '../components/DiscussionLayout';
import { ExpandableMarketingCardWrapper } from '../components/ExpandableMarketingCardWrapper.importable';
import { Footer } from '../components/Footer';
import { GridItem } from '../components/GridItem';
import { HeaderAdSlot } from '../components/HeaderAdSlot';
import { Island } from '../components/Island';
import { LabsHeader } from '../components/LabsHeader';
import { Masthead } from '../components/Masthead/Masthead';
import { MostViewedFooterData } from '../components/MostViewedFooterData.importable';
import { MostViewedFooterLayout } from '../components/MostViewedFooterLayout';
import { MostViewedRightWithAd } from '../components/MostViewedRightWithAd.importable';
import { OnwardsUpper } from '../components/OnwardsUpper.importable';
import { Picture } from '../components/Picture';
import { RightColumn } from '../components/RightColumn';
import { Section } from '../components/Section';
import { SlotBodyEnd } from '../components/SlotBodyEnd.importable';
import { Standfirst } from '../components/Standfirst';
import { StickyBottomBanner } from '../components/StickyBottomBanner.importable';
import { SubMeta } from '../components/SubMeta';
import { SubNav } from '../components/SubNav.importable';
import { type ArticleFormat, ArticleSpecial } from '../lib/articleFormat';
import { canRenderAds } from '../lib/canRenderAds';
import { getContributionsServiceUrl } from '../lib/contributions';
import { decideTrail } from '../lib/decideTrail';
import { getZIndex } from '../lib/getZIndex';
import { parse } from '../lib/slot-machine-flags';
import type { NavType } from '../model/extract-nav';
import { palette as themePalette } from '../palette';
import type { ArticleDeprecated } from '../types/article';
import type { FEElement } from '../types/content';
import { BannerWrapper, Stuck } from './lib/stickiness';

const AudioGrid = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			/* IE Fallback */
			display: flex;
			flex-direction: column;
			${until.leftCol} {
				margin-left: 0;
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
					grid-template-areas:
									'title  border  headline   headline   .'
									'image  border  disclaimer disclaimer right-column'
									'meta   border  media      media      right-column'
									'meta   border  standfirst standfirst right-column'
									'.      border  body       body       right-column'
									'.      border  .          .          right-column';
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
					grid-template-areas:
								'title  border  headline     .'
								'image  border  disclaimer   right-column'
								'meta   border  media        right-column'
								'meta   border  standfirst   right-column'
								'meta   border  body         right-column'
								'.      border  .            right-column';
				}

				/*
						Explanation of each unit of grid-template-columns

						Main content
						Right Column
					*/
				${until.leftCol} {
					grid-template-columns: 620px 300px;
					grid-template-areas:
								'title         .'
								'headline      .'
								'disclaimer    right-column'
								'media         right-column'
								'standfirst    right-column'
								'image         right-column'
								'meta          right-column'
								'body          right-column'
								'.             right-column';
				}

				${until.desktop} {
					grid-template-columns: 100%; /* Main content */
					grid-template-areas:
								'title'
								'headline'
								'disclaimer'
								'media'
								'standfirst'
								'image'
								'meta'
								'body';
				}

				${until.tablet} {
					grid-column-gap: 0;

					grid-template-columns: 100%; /* Main content */

					grid-template-areas:
								'title'
								'headline'
								'disclaimer'
								'media'
								'standfirst'
								'image'
								'meta'
								'body';
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

const usCardStyles = css`
	align-self: start;
	position: sticky;
	top: 0;
	${getZIndex('expandableMarketingCardOverlay')}

	${from.leftCol} {
		margin-top: ${space[6]}px;
		margin-bottom: ${space[9]}px;

		/* To align with rich links - if we move this feature to production, we should remove this and make rich link align with everything instead */
		margin-left: 1px;
		margin-right: -1px;
	}

	${from.wide} {
		margin-left: 0;
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

const podcastResponsiveCoverImage = css`
	img {
		width: 140px;
		height: 140px;
	}
	margin: 0.375rem 0 0.375rem 0;
	${from.wide} {
		img {
			width: 219px;
			height: 219px;
		}
	}
`;

interface Props {
	article: ArticleDeprecated;
	format: ArticleFormat;
}

interface WebProps extends Props {
	NAV: NavType;
}

export const getAudioData = (
	mainMediaElements: FEElement[] | undefined,
): { audioDownloadUrl: string; mediaId: string } | undefined => {
	const audioBlockElement = mainMediaElements?.find(
		(element) =>
			element._type ===
			'model.dotcomrendering.pageElements.AudioBlockElement',
	);
	if (audioBlockElement?.assets[0] && audioBlockElement.elementId) {
		return {
			audioDownloadUrl: audioBlockElement.assets[0].url,
			mediaId: audioBlockElement.elementId,
		};
	}
	return undefined;
};

export const AudioLayout = (props: WebProps) => {
	const { article, format } = props;
	const audioData = getAudioData(article.mainMediaElements);

	const {
		config: { isPaidContent, host, hasSurveyAd },
		editionId,
	} = article;

	const showBodyEndSlot = parse(article.slotMachineFlags ?? '').showBodyEnd;

	const { absoluteServerTimes = false } = article.config.switches;

	const showComments = article.isCommentable && !isPaidContent;

	const { branding } = article.commercialProperties[article.editionId];

	const contributionsServiceUrl = getContributionsServiceUrl(article);

	const isLabs = format.theme === ArticleSpecial.Labs;

	const renderAds = canRenderAds(article);

	const podcastSeries = article.tags.find((tag) => tag.type === 'Series');

	return (
		<>
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
								isPaidContent={!!article.config.isPaidContent}
								shouldHideReaderRevenue={
									!!article.config.shouldHideReaderRevenue
								}
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

			{renderAds && hasSurveyAd && (
				<AdSlot position="survey" display={format.display} />
			)}

			<main data-layout="AudioLayout">
				<Section
					fullWidth={true}
					data-print-layout="hide"
					showTopBorder={false}
					backgroundColour={themePalette('--article-background')}
					borderColour={themePalette('--article-border')}
					innerBackgroundColour={themePalette(
						'--article-inner-background',
					)}
					element="article"
				>
					<AudioGrid>
						<GridItem area="media">
							<div>
								{audioData && (
									<AudioPlayer
										src={audioData.audioDownloadUrl}
										mediaId={audioData.mediaId}
									/>
								)}
							</div>
						</GridItem>
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
							<Standfirst
								format={format}
								standfirst={article.standfirst}
							/>
						</GridItem>
						<GridItem area="meta" element="aside">
							<div css={maxWidth}>
								<div css={stretchLines}>
									<DecideLines
										format={format}
										color={themePalette('--article-border')}
									/>
								</div>
							</div>
							<>
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
								<div css={usCardStyles}>
									<Hide until="leftCol">
										<Island
											priority="enhancement"
											defer={{
												until: 'visible',
											}}
										>
											<ExpandableMarketingCardWrapper
												guardianBaseURL={
													article.guardianBaseURL
												}
											/>
										</Island>
									</Hide>
								</div>
							</>
						</GridItem>
						<GridItem area="image" element="aside">
							<div css={podcastResponsiveCoverImage}>
								<Picture
									role={'podcastCover'}
									format={format}
									master={podcastSeries?.podcast?.image ?? ''}
									alt={
										podcastSeries?.title ??
										'Podcast cover image'
									}
									height={1}
									width={1}
									loading="lazy"
								/>
							</div>
						</GridItem>
						<GridItem area="body">
							<Hide from="leftCol">
								<Island
									priority="enhancement"
									/**
									 * We display the card immediately if the viewport is below the top of
									 * the article body, so we must use "idle" instead of "visible".
									 */
									defer={{ until: 'idle' }}
								>
									<ExpandableMarketingCardWrapper
										guardianBaseURL={
											article.guardianBaseURL
										}
									/>
								</Island>
							</Hide>
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
										article.showBottomSocialButtons
									}
								/>
							</ArticleContainer>
						</GridItem>
						<GridItem area="right-column">
							<div
								css={css`
									padding-top: 0px;
									height: 100%;
									${from.desktop} {
										/* above 980 */
										margin-left: 20px;
										margin-right: -20px;
										padding-bottom: 41px;
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
					</AudioGrid>
				</Section>

				{renderAds && !isLabs && (
					<Section
						fullWidth={true}
						data-print-layout="hide"
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
						data-print-layout="hide"
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
						data-print-layout="hide"
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

			<>
				{props.NAV.subNavSections && (
					<Section
						fullWidth={true}
						data-print-layout="hide"
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
						urls={article.nav.readerRevenueLinks.footer}
						editionId={article.editionId}
					/>
				</Section>
				<BannerWrapper data-print-layout="hide">
					<Island priority="feature" defer={{ until: 'idle' }}>
						<StickyBottomBanner
							contentType={article.contentType}
							contributionsServiceUrl={contributionsServiceUrl}
							idApiUrl={article.config.idApiUrl}
							isMinuteArticle={article.pageType.isMinuteArticle}
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
		</>
	);
};
