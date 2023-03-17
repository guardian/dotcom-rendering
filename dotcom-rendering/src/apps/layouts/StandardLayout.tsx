import { css } from '@emotion/react';
import { ArticleDesign, ArticleSpecial } from '@guardian/libs';
import type { ArticleFormat } from '@guardian/libs';
import {
	border,
	brandAltBackground,
	brandBackground,
	brandBorder,
	brandLine,
	from,
	labs,
	neutral,
	space,
	until,
} from '@guardian/source-foundations';
import { StraightLines } from '@guardian/source-react-components-development-kitchen';
import { MainMedia } from '../../amp/components/MainMedia';
import { buildAdTargeting } from '../../lib/ad-targeting';
import { parse } from '../../lib/slot-machine-flags';
import type { NavType } from '../../model/extract-nav';
import type { FEArticleType } from '../../types/frontend';
import { ArticleHeadline } from '../../web/components/ArticleHeadline';
import { ArticleTitle } from '../../web/components/ArticleTitle';
import { Border } from '../../web/components/Border';
import { GetMatchNav } from '../../web/components/GetMatchNav.importable';
import { GetMatchTabs } from '../../web/components/GetMatchTabs.importable';
import { GridItem } from '../../web/components/GridItem';
import { Island } from '../../web/components/Island';
import { Section } from '../../web/components/Section';
import { decidePalette } from '../../web/lib/decidePalette';
import { getCurrentPillar } from '../../web/lib/layoutHelpers';

const StandardGrid = ({
	children,
	isMatchReport,
}: {
	children: React.ReactNode;
	isMatchReport: boolean;
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
					grid-template-columns: 219px 1px 1fr 300px;

					${isMatchReport
						? css`
								grid-template-areas:
									'title  border  matchNav     right-column'
									'title  border  matchtabs    right-column'
									'.      border  headline     right-column'
									'.      border  standfirst   right-column'
									'lines  border  media        right-column'
									'meta   border  media        right-column'
									'meta   border  body         right-column'
									'.      border  .            right-column';
						  `
						: css`
								grid-template-areas:
									'title  border  headline     right-column'
									'.      border  standfirst   right-column'
									'lines  border  media        right-column'
									'meta   border  media        right-column'
									'meta   border  body         right-column'
									'.      border  .            right-column';
						  `}
				}

				/*
					Explanation of each unit of grid-template-columns

					Left Column
					Vertical grey border
					Main content
					Right Column
				*/
				${until.wide} {
					grid-template-columns: 140px 1px 1fr 300px;

					${isMatchReport
						? css`
								grid-template-areas:
									'title  border  matchNav     right-column'
									'title  border  matchtabs    right-column'
									'.      border  headline     right-column'
									'.      border  standfirst   right-column'
									'lines  border  media        right-column'
									'meta   border  media        right-column'
									'meta   border  body         right-column'
									'.      border  .            right-column';
						  `
						: css`
								grid-template-areas:
									'title  border  headline     right-column'
									'.      border  standfirst   right-column'
									'lines  border  media        right-column'
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
					grid-template-columns: 1fr 300px;
					${isMatchReport
						? css`
								grid-template-areas:
									'matchNav      right-column'
									'matchtabs	   right-column'
									'title         right-column'
									'headline      right-column'
									'standfirst    right-column'
									'media         right-column'
									'lines         right-column'
									'meta          right-column'
									'body          right-column'
									'.             right-column';
						  `
						: css`
								grid-template-areas:
									'title         right-column'
									'headline      right-column'
									'standfirst    right-column'
									'media         right-column'
									'lines         right-column'
									'meta          right-column'
									'body          right-column'
									'.             right-column';
						  `}
				}

				${until.desktop} {
					grid-template-columns: 1fr; /* Main content */
					${isMatchReport
						? css`
								grid-template-areas:
									'matchNav'
									'matchtabs'
									'title'
									'headline'
									'standfirst'
									'media'
									'lines'
									'meta'
									'body';
						  `
						: css`
								grid-template-areas:
									'title'
									'headline'
									'standfirst'
									'media'
									'lines'
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
									'lines'
									'meta'
									'body';
						  `
						: css`
								grid-template-areas:
									'media'
									'title'
									'headline'
									'standfirst'
									'lines'
									'meta'
									'body';
						  `}
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
	margin-top: ${space[4]}px;
	background-color: ${brandAltBackground.primary};
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
	article: FEArticleType;
	format: ArticleFormat;
}

export const StandardLayout = ({ article, format }: Props) => {
	const {
		config: { isPaidContent, host },
	} = article;

	const isInEuropeTest =
		article.config.abTests.europeNetworkFrontVariant === 'variant';

	const adTargeting: AdTargeting = buildAdTargeting({
		isAdFreeUser: article.isAdFreeUser,
		isSensitive: article.config.isSensitive,
		videoDuration: article.config.videoDuration,
		edition: article.config.edition,
		section: article.config.section,
		sharedAdTargeting: article.config.sharedAdTargeting,
		adUnit: article.config.adUnit,
	});

	const showBodyEndSlot =
		parse(article.slotMachineFlags ?? '').showBodyEnd ||
		article.config.switches.slotBodyEnd;

	// TODO:
	// 1) Read 'forceEpic' value from URL parameter and use it to force the slot to render
	// 2) Otherwise, ensure slot only renders if `article.config.shouldHideReaderRevenue` equals false.

	const footballMatchUrl =
		article.matchType === 'FootballMatchType'
			? article.matchUrl
			: undefined;

	const isMatchReport =
		format.design === ArticleDesign.MatchReport && !!footballMatchUrl;

	const showComments = article.isCommentable;

	const { branding } = article.commercialProperties[article.editionId];

	const palette = decidePalette(format);

	const formatForNav =
		format.theme === ArticleSpecial.Labs
			? format
			: {
					...format,
					theme: getCurrentPillar(article),
			  };

	const renderAds = !article.isAdFreeUser && !article.shouldHideAds;

	const isLabs = format.theme === ArticleSpecial.Labs;

	return (
		<main data-layout="StandardLayout">
			<Section
				fullWidth={true}
				data-print-layout="hide"
				showTopBorder={false}
				backgroundColour={palette.background.article}
				borderColour={palette.border.article}
				element="article"
			>
				<StandardGrid isMatchReport={isMatchReport}>
					<GridItem area="matchNav" element="aside">
						<div css={maxWidth}>
							{isMatchReport && (
								<Island
									deferUntil="visible"
									clientOnly={true}
									placeholderHeight={230}
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
									clientOnly={true}
									placeholderHeight={40}
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
						<div css={maxWidth}>
							<MainMedia
								format={format}
								elements={article.mainMediaElements}
								adTargeting={adTargeting}
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
					<GridItem area="title" element="aside">
						<ArticleTitle
							format={format}
							tags={article.tags}
							sectionLabel={article.sectionLabel}
							sectionUrl={article.sectionUrl}
							guardianBaseURL={article.guardianBaseURL}
							badge={article.badge}
							isMatch={!!footballMatchUrl}
						/>
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
									typeof article.starRating === 'number'
								}
							/>
						</div>
					</GridItem>
					<GridItem area="standfirst">
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
						<Standfirst
							format={format}
							standfirst={article.standfirst}
						/>
					</GridItem>
					<GridItem area="lines">
						<div css={maxWidth}>
							<div css={stretchLines}>
								{format.theme === ArticleSpecial.Labs ? (
									<GuardianLabsLines />
								) : (
									<DecideLines
										format={format}
										color={palette.border.article}
									/>
								)}
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
								showShareCount={
									!!article.config.switches.serverShareCounts
								}
							/>
						</div>
					</GridItem>
					<GridItem area="body">
						<ArticleContainer format={format}>
							<ArticleBody
								format={format}
								blocks={article.blocks}
								pinnedPost={article.pinnedPost}
								adTargeting={adTargeting}
								host={host}
								pageId={article.pageId}
								webTitle={article.webTitle}
								ajaxUrl={article.config.ajaxUrl}
								switches={article.config.switches}
								isSensitive={article.config.isSensitive}
								isAdFreeUser={article.isAdFreeUser}
								section={article.config.section}
								shouldHideReaderRevenue={
									article.shouldHideReaderRevenue
								}
								tags={article.tags}
								isPaidContent={!!article.config.isPaidContent}
								contributionsServiceUrl={
									contributionsServiceUrl
								}
								contentType={article.contentType}
								sectionName={article.sectionName ?? ''}
								isPreview={article.config.isPreview}
								idUrl={article.config.idUrl ?? ''}
								isDev={!!article.config.isDev}
								keywordIds={article.config.keywordIds}
								abTests={article.config.abTests}
								tableOfContents={article.tableOfContents}
								lang={article.lang}
								isRightToLeftLang={article.isRightToLeftLang}
							/>
							{format.design === ArticleDesign.MatchReport &&
								!!footballMatchUrl && (
									<Island
										deferUntil="visible"
										clientOnly={true}
										placeholderHeight={800}
									>
										<GetMatchStats
											matchUrl={footballMatchUrl}
											format={format}
										/>
									</Island>
								)}

							{showBodyEndSlot && (
								<Island clientOnly={true}>
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
										keywordIds={article.config.keywordIds}
										pageId={article.pageId}
										sectionId={article.config.section}
										sectionName={article.sectionName}
										shouldHideReaderRevenue={
											article.shouldHideReaderRevenue
										}
										stage={article.config.stage}
										tags={article.tags}
									/>
								</Island>
							)}
							<StraightLines
								data-print-layout="hide"
								count={4}
								cssOverrides={css`
									display: block;
								`}
								color={palette.border.secondary}
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
								badge={article.badge}
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
								{renderAds && (
									<AdSlot
										position="right"
										display={format.display}
										shouldHideReaderRevenue={
											article.shouldHideReaderRevenue
										}
										isPaidContent={
											article.pageType.isPaidContent
										}
									/>
								)}
								{!isPaidContent ? (
									<Island
										clientOnly={true}
										deferUntil="visible"
									>
										<MostViewedRightWrapper
											isAdFreeUser={article.isAdFreeUser}
										/>
									</Island>
								) : (
									<></>
								)}
							</RightColumn>
						</div>
					</GridItem>
				</StandardGrid>
			</Section>

			{renderAds && !isLabs && (
				<Section
					fullWidth={true}
					data-print-layout="hide"
					padSides={false}
					showTopBorder={false}
					showSideBorders={false}
					backgroundColour={neutral[93]}
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
				<Section fullWidth={true}>
					<Island deferUntil="visible">
						<Carousel
							heading={article.storyPackage.heading}
							trails={article.storyPackage.trails.map(
								decideTrail,
							)}
							onwardsSource="more-on-this-story"
							format={format}
						/>
					</Island>
				</Section>
			)}

			<Island
				clientOnly={true}
				deferUntil="visible"
				placeholderHeight={600}
			>
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
					<MostViewedFooterLayout>
						<Island clientOnly={true} deferUntil="visible">
							<MostViewedFooterData
								sectionName={article.sectionName}
								format={format}
								ajaxUrl={article.config.ajaxUrl}
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
					backgroundColour={neutral[93]}
					element="aside"
				>
					<AdSlot position="merchandising" display={format.display} />
				</Section>
			)}
		</main>
	);
};
