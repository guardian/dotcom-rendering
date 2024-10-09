import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleSpecial } from '@guardian/libs';
import {
	from,
	palette as sourcePalette,
	until,
} from '@guardian/source/foundations';
import { Hide } from '@guardian/source/react-components';
import { StraightLines } from '@guardian/source-development-kitchen/react-components';
import React from 'react';
import { AdPortals } from '../components/AdPortals.importable';
import { AdSlot, MobileStickyContainer } from '../components/AdSlot.web';
import { AppsFooter } from '../components/AppsFooter.importable';
import { ArticleBody } from '../components/ArticleBody';
import { ArticleContainer } from '../components/ArticleContainer';
import { ArticleHeadline } from '../components/ArticleHeadline';
import { ArticleMetaApps } from '../components/ArticleMeta.apps';
import { ArticleMeta } from '../components/ArticleMeta.web';
import { ArticleTitle } from '../components/ArticleTitle';
import { Carousel } from '../components/Carousel.importable';
import { CrosswordInstructions } from '../components/CrosswordInstructions';
import { CrosswordLinks } from '../components/CrosswordLinks';
import { DecideLines } from '../components/DecideLines';
import { DiscussionLayout } from '../components/DiscussionLayout';
import { Footer } from '../components/Footer';
import { GridItem } from '../components/GridItem';
import { HeaderAdSlot } from '../components/HeaderAdSlot';
import { Island } from '../components/Island';
import { Masthead } from '../components/Masthead/Masthead';
import { MostViewedFooterData } from '../components/MostViewedFooterData.importable';
import { MostViewedFooterLayout } from '../components/MostViewedFooterLayout';
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
import type { NavType } from '../model/extract-nav';
import { palette as themePalette } from '../palette';
import type { ArticleDeprecated } from '../types/article';
import type { RenderingTarget } from '../types/renderingTarget';
import { BannerWrapper, Stuck } from './lib/stickiness';

const CrosswordGrid = ({ children }: { children: React.ReactNode }) => (
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

					Left Column
					Main content
					Right Column
				*/
				${from.wide} {
					grid-template-columns: 220px 1fr 300px;

					grid-template-areas:
						'title  headline                right-column'
						'.      crossword-links         right-column'
						'lines  standfirst              right-column'
						'meta   crossword-instructions  right-column'
						'body   body                    right-column';
				}

				/*
					Explanation of each unit of grid-template-columns

					Left Column
					Main content
					Right Column
				*/
				${until.wide} {
					grid-template-columns: 140px 1fr 300px;

					grid-template-areas:
						'title  headline                right-column'
						'lines  crossword-links         right-column'
						'meta   standfirst              right-column'
						'meta   crossword-instructions  right-column'
						'body   body                    right-column';
				}

				${until.leftCol} {
					grid-template-columns: minmax(0, 1fr); /* Main content */
					grid-template-areas:
						'title'
						'headline'
						'crossword-links'
						'standfirst'
						'lines'
						'meta'
						'crossword-instructions'
						'body';
				}

				${until.desktop} {
					grid-template-columns: minmax(0, 1fr); /* Main content */
					grid-template-areas:
						'title'
						'headline'
						'crossword-links'
						'standfirst'
						'lines'
						'meta'
						'crossword-instructions'
						'body';
				}

				${until.tablet} {
					grid-column-gap: 0px;
					grid-template-columns: minmax(0, 1fr); /* Main content */
					grid-template-areas:
						'title'
						'headline'
						'crossword-links'
						'standfirst'
						'lines'
						'meta'
						'crossword-instructions'
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

export const CrosswordLayout = (props: WebProps | AppsProps) => {
	const { article, format, renderingTarget } = props;
	const {
		config: { isPaidContent, host, hasSurveyAd },
	} = article;

	const isApps = renderingTarget === 'Apps';
	const isWeb = renderingTarget === 'Web';

	const showComments = article.isCommentable && !isPaidContent;

	const { branding } = article.commercialProperties[article.editionId];

	const contributionsServiceUrl = getContributionsServiceUrl(article);

	const { absoluteServerTimes = false } = article.config.switches;

	/**
	 * This property currently only applies to the header and merchandising slots
	 */
	const renderAds = isWeb && canRenderAds(article);
	return (
		<>
			{isWeb && (
				<>
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
										<HeaderAdSlot
											isPaidContent={
												!!article.config.isPaidContent
											}
											shouldHideReaderRevenue={
												!!article.config
													.shouldHideReaderRevenue
											}
										/>
									</Section>
								</div>
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
							showSubNav={format.theme !== ArticleSpecial.Labs}
							showSlimNav={false}
							hasPageSkin={false}
							hasPageSkinContentSelfConstrain={false}
							pageId={article.pageId}
						/>
					</div>


					{renderAds && hasSurveyAd && (
						<AdSlot position="survey" display={format.display} />
					)}
				</>
			)}
			<main data-layout="InteractiveLayout">
				{isApps && (
					<>
						<Island priority="critical">
							<AdPortals />
						</Island>
					</>
				)}
				<Section
					fullWidth={true}
					data-print-layout="hide"
					showTopBorder={false}
					backgroundColour={themePalette('--article-background')}
					borderColour={themePalette('--article-border')}
					element="article"
				>
					<div>
						<CrosswordGrid>
							<GridItem area="title" element="aside">
								<div>
									<ArticleTitle
										format={format}
										tags={article.tags}
										sectionLabel={article.sectionLabel}
										sectionUrl={article.sectionUrl}
										guardianBaseURL={
											article.guardianBaseURL
										}
									/>
								</div>
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
							{article.crossword && (
								<GridItem area="crossword-links">
									<CrosswordLinks
										css={maxWidth}
										crossword={article.crossword}
									/>
								</GridItem>
							)}
							<GridItem area="standfirst">
								<Standfirst
									format={format}
									standfirst={
										'Download the Guardian app for a puzzles experience'
									}
								/>
							</GridItem>

							<GridItem area="lines">
								<div css={maxWidth}>
									<div css={stretchLines}>
										<DecideLines
											format={format}
											color={themePalette(
												'--article-meta-lines',
											)}
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
													pageId={article.pageId}
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
														article.config
															.shortUrlId
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
														article.config
															.shortUrlId
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
									)}
								</div>
							</GridItem>
							{!!article.crossword?.instructions && (
								<GridItem area="crossword-instructions">
									<CrosswordInstructions
										instructions={
											article.crossword.instructions
										}
										css={maxWidth}
									/>
								</GridItem>
							)}
							<GridItem area="body" element="article">
								<ArticleContainer format={format}>
									<ArticleBody
										format={format}
										blocks={article.blocks}
										host={host}
										pageId={article.pageId}
										webTitle={article.webTitle}
										ajaxUrl={article.config.ajaxUrl}
										abTests={article.config.abTests}
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
										editionId={article.editionId}
									/>
								</ArticleContainer>
							</GridItem>
							<GridItem area="right-column">
								<RightColumn>
									{renderAds ? (
										<AdSlot
											position="right"
											display={format.display}
											isPaidContent={isPaidContent}
											shouldHideReaderRevenue={
												article.shouldHideReaderRevenue
											}
										/>
									) : null}
								</RightColumn>
							</GridItem>
						</CrosswordGrid>
					</div>
				</Section>

				<Section
					stretchRight={false}
					showTopBorder={false}
					backgroundColour={themePalette('--article-background')}
					borderColour={themePalette('--article-border')}
					fontColour={themePalette('--article-section-title')}
					padContent={false}
					verticalMargins={false}
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
								pageId={article.pageId}
								sectionId={article.config.section}
								shouldHideReaderRevenue={
									article.shouldHideReaderRevenue
								}
								stage={article.config.stage}
								tags={article.tags}
								renderAds={renderAds}
								isLabs={false}
								articleEndSlot={
									!!article.config.switches.articleEndSlot
								}
							/>
						</Island>
					</div>
				</Section>

				<Section
					fullWidth={true}
					showTopBorder={false}
					padSides={false}
					backgroundColour={themePalette('--article-background')}
				>
					<StraightLines
						count={4}
						data-print-layout="hide"
						color={themePalette('--straight-lines')}
						cssOverrides={css`
							display: block;
						`}
					/>
				</Section>

				<Section
					fullWidth={true}
					showTopBorder={false}
					backgroundColour={themePalette('--article-background')}
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
					/>
				</Section>
				{renderAds && (
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
						showTopBorder={false}
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

				{renderAds && (
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
							position="footer"
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
