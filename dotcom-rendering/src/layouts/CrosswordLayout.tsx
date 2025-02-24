import { css } from '@emotion/react';
import {
	from,
	remSpace,
	palette as sourcePalette,
	until,
} from '@guardian/source/foundations';
import { Hide } from '@guardian/source/react-components';
import { StraightLines } from '@guardian/source-development-kitchen/react-components';
import React from 'react';
import { AdSlot, MobileStickyContainer } from '../components/AdSlot.web';
import { ArticleBody } from '../components/ArticleBody';
import { ArticleContainer } from '../components/ArticleContainer';
import { ArticleHeadline } from '../components/ArticleHeadline';
import { ArticleMeta } from '../components/ArticleMeta.web';
import { ArticleTitle } from '../components/ArticleTitle';
import { CrosswordInstructions } from '../components/CrosswordInstructions';
import { CrosswordLinks } from '../components/CrosswordLinks';
import { DecideLines } from '../components/DecideLines';
import { DiscussionLayout } from '../components/DiscussionLayout';
import { Footer } from '../components/Footer';
import { GridItem } from '../components/GridItem';
import { HeaderAdSlot } from '../components/HeaderAdSlot';
import { Island } from '../components/Island';
import { Masthead } from '../components/Masthead/Masthead';
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
import type { NavType } from '../model/extract-nav';
import { palette as themePalette } from '../palette';
import type { ArticleDeprecated } from '../types/article';
import { BannerWrapper, Stuck } from './lib/stickiness';

const CrosswordGrid = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			display: grid;
			width: 100%;
			margin-left: 0;
			grid-column-gap: 0px;
			grid-template-columns: minmax(0, 1fr);
			grid-template-areas:
				'title'
				'headline'
				'standfirst'
				'meta'
				'instructions'
				'body';

			${from.leftCol} {
				grid-column-gap: 20px;
				grid-template-columns: 140px 1fr;
				grid-template-areas:
					'title  headline    '
					'meta   standfirst  '
					'meta   instructions'
					'body   body        ';
			}

			${from.wide} {
				grid-template-columns: 220px 1fr 300px;
				grid-template-areas:
					'title  headline      .'
					'meta   standfirst    .'
					'meta   instructions  .'
					'body   body          right-column';
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

interface Props {
	article: ArticleDeprecated;
	format: ArticleFormat;
	NAV: NavType;
}

export const CrosswordLayout = (props: Props) => {
	const { article, format } = props;
	const {
		config: { isPaidContent, host, hasSurveyAd },
	} = article;

	const showComments = article.isCommentable && !isPaidContent;

	const { branding } = article.commercialProperties[article.editionId];

	const contributionsServiceUrl = getContributionsServiceUrl(article);

	/**
	 * This property currently only applies to the header and merchandising slots
	 */
	const renderAds = canRenderAds(article);
	return (
		<>
			<div data-print-layout="hide">
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
										!!article.config.shouldHideReaderRevenue
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

			<main data-layout="InteractiveLayout">
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
								<div data-print-layout="hide">
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
							<GridItem area="standfirst">
								<div data-print-layout="hide">
									<Hide until="leftCol">
										<DecideLines
											format={format}
											color={themePalette(
												'--article-meta-lines',
											)}
										/>
									</Hide>
									<Hide from="desktop">
										<Standfirst
											format={format}
											standfirst={
												'<a href="https://app.adjust.com/16xt6hai" data-link-name="crossword-mobile-link">Download the Guardian app</a> for a better puzzles experience'
											}
										/>
									</Hide>
									{article.crossword && (
										<CrosswordLinks
											crossword={article.crossword}
										/>
									)}
								</div>
							</GridItem>
							<GridItem area="meta" element="aside">
								<div css={maxWidth}>
									<div
										data-print-layout="hide"
										css={stretchLines}
									>
										<DecideLines
											format={format}
											color={themePalette(
												'--article-meta-lines',
											)}
										/>
									</div>
									<ArticleMeta
										branding={branding}
										format={format}
										pageId={article.pageId}
										webTitle={article.webTitle}
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
										crossword={article.crossword}
									/>
								</div>
							</GridItem>
							{!!article.crossword?.instructions && (
								<GridItem area="instructions">
									<CrosswordInstructions
										instructions={
											article.crossword.instructions
										}
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
								<RightColumn showFrom="wide">
									<div
										css={css`
											margin-top: ${remSpace[3]};
										`}
									>
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
									</div>
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
							article.showBottomSocialButtons
						}
					/>
				</Section>
				{renderAds && (
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

			{props.NAV.subNavSections && (
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
	);
};
