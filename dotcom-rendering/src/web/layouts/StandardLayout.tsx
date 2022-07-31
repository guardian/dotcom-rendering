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
	until,
} from '@guardian/source-foundations';
import { StraightLines } from '@guardian/source-react-components-development-kitchen';
import { buildAdTargeting } from '../../lib/ad-targeting';
import { parse } from '../../lib/slot-machine-flags';
import { AdSlot, MobileStickyContainer } from '../components/AdSlot';
import { ArticleBody } from '../components/ArticleBody';
import { ArticleContainer } from '../components/ArticleContainer';
import { ArticleHeadline } from '../components/ArticleHeadline';
import { ArticleMeta } from '../components/ArticleMeta';
import { ArticleTitle } from '../components/ArticleTitle';
import { Border } from '../components/Border';
import { DecideLines } from '../components/DecideLines';
import { DiscussionLayout } from '../components/DiscussionLayout';
import { ElementContainer } from '../components/ElementContainer';
import { Footer } from '../components/Footer';
import { GetMatchNav } from '../components/GetMatchNav.importable';
import { GetMatchStats } from '../components/GetMatchStats.importable';
import { GetMatchTabs } from '../components/GetMatchTabs.importable';
import { GridItem } from '../components/GridItem';
import { GuardianLabsLines } from '../components/GuardianLabsLines';
import { Header } from '../components/Header';
import { HeaderAdSlot } from '../components/HeaderAdSlot';
import { Island } from '../components/Island';
import { LabsHeader } from '../components/LabsHeader.importable';
import { MainMedia } from '../components/MainMedia';
import { MostViewedFooterLayout } from '../components/MostViewedFooterLayout';
import { MostViewedRightWrapper } from '../components/MostViewedRightWrapper.importable';
import { Nav } from '../components/Nav/Nav';
import { Onwards } from '../components/Onwards';
import { RightColumn } from '../components/RightColumn';
import { SlotBodyEnd } from '../components/SlotBodyEnd.importable';
import { Standfirst } from '../components/Standfirst';
import { StarRating } from '../components/StarRating/StarRating';
import { StickyBottomBanner } from '../components/StickyBottomBanner.importable';
import { SubMeta } from '../components/SubMeta';
import { SubNav } from '../components/SubNav.importable';
import { getContributionsServiceUrl } from '../lib/contributions';
import { decidePalette } from '../lib/decidePalette';
import { getCurrentPillar } from '../lib/layoutHelpers';
import { BannerWrapper, Stuck } from './lib/stickiness';

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
	margin-bottom: 18px;
	margin-top: 6px;
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

	padding-left: 10px;
	margin-left: -10px;
`;

interface Props {
	CAPIArticle: CAPIArticleType;
	NAV: NavType;
	format: ArticleFormat;
}

export const StandardLayout = ({ CAPIArticle, NAV, format }: Props) => {
	const {
		config: { isPaidContent, host },
	} = CAPIArticle;

	const adTargeting: AdTargeting = buildAdTargeting({
		isAdFreeUser: CAPIArticle.isAdFreeUser,
		isSensitive: CAPIArticle.config.isSensitive,
		videoDuration: CAPIArticle.config.videoDuration,
		edition: CAPIArticle.config.edition,
		section: CAPIArticle.config.section,
		sharedAdTargeting: CAPIArticle.config.sharedAdTargeting,
		adUnit: CAPIArticle.config.adUnit,
	});

	const showBodyEndSlot =
		parse(CAPIArticle.slotMachineFlags || '').showBodyEnd ||
		CAPIArticle.config.switches.slotBodyEnd;

	// TODO:
	// 1) Read 'forceEpic' value from URL parameter and use it to force the slot to render
	// 2) Otherwise, ensure slot only renders if `CAPIArticle.config.shouldHideReaderRevenue` equals false.

	const footballMatchUrl =
		CAPIArticle.matchType === 'FootballMatchType' && CAPIArticle.matchUrl;

	const isMatchReport =
		format.design === ArticleDesign.MatchReport && !!footballMatchUrl;

	const showComments = CAPIArticle.isCommentable;

	const { branding } =
		CAPIArticle.commercialProperties[CAPIArticle.editionId];

	const palette = decidePalette(format);

	const formatForNav =
		format.theme === ArticleSpecial.Labs
			? format
			: {
					...format,
					theme: getCurrentPillar(CAPIArticle),
			  };

	const contributionsServiceUrl = getContributionsServiceUrl(CAPIArticle);

	return (
		<>
			<div data-print-layout="hide" id="bannerandheader">
				<>
					<Stuck>
						<ElementContainer
							showTopBorder={false}
							showSideBorders={false}
							padded={false}
							shouldCenter={false}
						>
							<HeaderAdSlot
								isAdFreeUser={CAPIArticle.isAdFreeUser}
								shouldHideAds={CAPIArticle.shouldHideAds}
								display={format.display}
							/>
						</ElementContainer>
					</Stuck>
					{format.theme !== ArticleSpecial.Labs && (
						<ElementContainer
							showTopBorder={false}
							showSideBorders={false}
							padded={false}
							backgroundColour={brandBackground.primary}
							element="header"
						>
							<Header
								editionId={CAPIArticle.editionId}
								idUrl={CAPIArticle.config.idUrl}
								mmaUrl={CAPIArticle.config.mmaUrl}
								supporterCTA={
									CAPIArticle.nav.readerRevenueLinks.header
										.supporter
								}
								discussionApiUrl={
									CAPIArticle.config.discussionApiUrl
								}
								urls={CAPIArticle.nav.readerRevenueLinks.header}
								remoteHeader={
									CAPIArticle.config.switches.remoteHeader
								}
								contributionsServiceUrl={
									contributionsServiceUrl
								}
								idApiUrl={CAPIArticle.config.idApiUrl}
							/>
						</ElementContainer>
					)}
					<ElementContainer
						showSideBorders={true}
						borderColour={brandLine.primary}
						showTopBorder={false}
						padded={false}
						backgroundColour={brandBackground.primary}
						element="nav"
					>
						<Nav
							nav={NAV}
							format={formatForNav}
							subscribeUrl={
								CAPIArticle.nav.readerRevenueLinks.header
									.subscribe
							}
							editionId={CAPIArticle.editionId}
						/>
					</ElementContainer>
					{NAV.subNavSections &&
						format.theme !== ArticleSpecial.Labs && (
							<>
								<ElementContainer
									backgroundColour={
										palette.background.article
									}
									padded={false}
									element="aside"
								>
									<Island deferUntil="idle">
										<SubNav
											subNavSections={NAV.subNavSections}
											currentNavLink={NAV.currentNavLink}
											format={format}
										/>
									</Island>
								</ElementContainer>
								<ElementContainer
									backgroundColour={
										palette.background.article
									}
									padded={false}
									showTopBorder={false}
								>
									<StraightLines
										count={4}
										cssOverrides={css`
											display: block;
										`}
									/>
								</ElementContainer>
							</>
						)}
				</>
			</div>

			{format.theme === ArticleSpecial.Labs && (
				<Stuck>
					<ElementContainer
						showSideBorders={true}
						showTopBorder={false}
						backgroundColour={labs[400]}
						borderColour={border.primary}
						sectionId="labs-header"
						element="aside"
					>
						<Island deferUntil="idle">
							<LabsHeader />
						</Island>
					</ElementContainer>
				</Stuck>
			)}

			{CAPIArticle.config.switches.surveys && (
				<AdSlot position="survey" display={format.display} />
			)}

			<main>
				<ElementContainer
					data-print-layout="hide"
					showTopBorder={false}
					backgroundColour={palette.background.article}
					borderColour={palette.border.article}
					element="article"
				>
					<StandardGrid isMatchReport={isMatchReport}>
						<GridItem area="title" element="aside">
							<ArticleTitle
								format={format}
								tags={CAPIArticle.tags}
								sectionLabel={CAPIArticle.sectionLabel}
								sectionUrl={CAPIArticle.sectionUrl}
								guardianBaseURL={CAPIArticle.guardianBaseURL}
								badge={CAPIArticle.badge}
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
											headlineString={
												CAPIArticle.headline
											}
											tags={CAPIArticle.tags}
											webPublicationDateDeprecated={
												CAPIArticle.webPublicationDateDeprecated
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
						<GridItem area="headline">
							<div css={maxWidth}>
								<ArticleHeadline
									format={format}
									headlineString={CAPIArticle.headline}
									tags={CAPIArticle.tags}
									byline={CAPIArticle.byline}
									webPublicationDateDeprecated={
										CAPIArticle.webPublicationDateDeprecated
									}
									hasStarRating={
										!!CAPIArticle.starRating ||
										CAPIArticle.starRating === 0
									}
								/>
							</div>
							{CAPIArticle.starRating ||
							CAPIArticle.starRating === 0 ? (
								<div css={starWrapper}>
									<StarRating
										rating={CAPIArticle.starRating}
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
								standfirst={CAPIArticle.standfirst}
							/>
						</GridItem>
						<GridItem area="media">
							<div css={maxWidth}>
								<MainMedia
									format={format}
									elements={CAPIArticle.mainMediaElements}
									adTargeting={adTargeting}
									host={host}
									pageId={CAPIArticle.pageId}
									webTitle={CAPIArticle.webTitle}
									ajaxUrl={CAPIArticle.config.ajaxUrl}
									switches={CAPIArticle.config.switches}
									isAdFreeUser={CAPIArticle.isAdFreeUser}
									isSensitive={CAPIArticle.config.isSensitive}
								/>
							</div>
						</GridItem>
						<GridItem area="lines">
							<div css={maxWidth}>
								<div css={stretchLines}>
									{format.theme === ArticleSpecial.Labs ? (
										<GuardianLabsLines />
									) : (
										<DecideLines format={format} />
									)}
								</div>
							</div>
						</GridItem>
						<GridItem area="meta" element="aside">
							<div css={maxWidth}>
								<ArticleMeta
									branding={branding}
									format={format}
									pageId={CAPIArticle.pageId}
									webTitle={CAPIArticle.webTitle}
									byline={CAPIArticle.byline}
									tags={CAPIArticle.tags}
									primaryDateline={
										CAPIArticle.webPublicationDateDisplay
									}
									secondaryDateline={
										CAPIArticle.webPublicationSecondaryDateDisplay
									}
									isCommentable={CAPIArticle.isCommentable}
									discussionApiUrl={
										CAPIArticle.config.discussionApiUrl
									}
									shortUrlId={CAPIArticle.config.shortUrlId}
									ajaxUrl={CAPIArticle.config.ajaxUrl}
									showShareCount={
										CAPIArticle.config.switches
											.serverShareCounts
									}
								/>
							</div>
						</GridItem>
						<GridItem area="body">
							<ArticleContainer format={format}>
								<ArticleBody
									format={format}
									blocks={CAPIArticle.blocks}
									pinnedPost={CAPIArticle.pinnedPost}
									adTargeting={adTargeting}
									host={host}
									pageId={CAPIArticle.pageId}
									webTitle={CAPIArticle.webTitle}
									ajaxUrl={CAPIArticle.config.ajaxUrl}
									switches={CAPIArticle.config.switches}
									isSensitive={CAPIArticle.config.isSensitive}
									isAdFreeUser={CAPIArticle.isAdFreeUser}
									section={CAPIArticle.config.section}
									shouldHideReaderRevenue={
										CAPIArticle.shouldHideReaderRevenue
									}
									tags={CAPIArticle.tags}
									isPaidContent={
										!!CAPIArticle.config.isPaidContent
									}
									contributionsServiceUrl={
										contributionsServiceUrl
									}
									contentType={CAPIArticle.contentType}
									sectionName={CAPIArticle.sectionName || ''}
									isPreview={CAPIArticle.config.isPreview}
									idUrl={CAPIArticle.config.idUrl || ''}
									isDev={!!CAPIArticle.config.isDev}
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
											contentType={
												CAPIArticle.contentType
											}
											contributionsServiceUrl={
												contributionsServiceUrl
											}
											idApiUrl={
												CAPIArticle.config.idApiUrl
											}
											isMinuteArticle={
												CAPIArticle.pageType
													.isMinuteArticle
											}
											isPaidContent={
												CAPIArticle.pageType
													.isPaidContent
											}
											keywordsId={
												CAPIArticle.config.keywordIds
											}
											pageId={CAPIArticle.pageId}
											sectionId={
												CAPIArticle.config.section
											}
											sectionName={
												CAPIArticle.sectionName
											}
											shouldHideReaderRevenue={
												CAPIArticle.shouldHideReaderRevenue
											}
											stage={CAPIArticle.config.stage}
											tags={CAPIArticle.tags}
										/>
									</Island>
								)}
								<StraightLines
									data-print-layout="hide"
									count={4}
									cssOverrides={css`
										display: block;
									`}
								/>
								<SubMeta
									format={format}
									subMetaKeywordLinks={
										CAPIArticle.subMetaKeywordLinks
									}
									subMetaSectionLinks={
										CAPIArticle.subMetaSectionLinks
									}
									pageId={CAPIArticle.pageId}
									webUrl={CAPIArticle.webURL}
									webTitle={CAPIArticle.webTitle}
									showBottomSocialButtons={
										CAPIArticle.showBottomSocialButtons
									}
									badge={CAPIArticle.badge}
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
									<AdSlot
										position="right"
										display={format.display}
										shouldHideReaderRevenue={
											CAPIArticle.shouldHideReaderRevenue
										}
										isPaidContent={
											CAPIArticle.pageType.isPaidContent
										}
									/>
									{!isPaidContent ? (
										<Island
											clientOnly={true}
											deferUntil="visible"
										>
											<MostViewedRightWrapper
												isAdFreeUser={
													CAPIArticle.isAdFreeUser
												}
											/>
										</Island>
									) : (
										<></>
									)}
								</RightColumn>
							</div>
						</GridItem>
					</StandardGrid>
				</ElementContainer>
				<ElementContainer
					data-print-layout="hide"
					padded={false}
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
				</ElementContainer>

				{CAPIArticle.onwards && (
					<Onwards onwards={CAPIArticle.onwards} format={format} />
				)}

				{!isPaidContent && showComments && (
					<ElementContainer
						sectionId="comments"
						data-print-layout="hide"
						element="section"
					>
						<DiscussionLayout
							discussionApiUrl={
								CAPIArticle.config.discussionApiUrl
							}
							shortUrlId={CAPIArticle.config.shortUrlId}
							format={format}
							discussionD2Uid={CAPIArticle.config.discussionD2Uid}
							discussionApiClientHeader={
								CAPIArticle.config.discussionApiClientHeader
							}
							enableDiscussionSwitch={
								CAPIArticle.config.switches
									.enableDiscussionSwitch
							}
							isAdFreeUser={CAPIArticle.isAdFreeUser}
							shouldHideAds={CAPIArticle.shouldHideAds}
						/>
					</ElementContainer>
				)}
				{!isPaidContent && (
					<ElementContainer data-print-layout="hide" element="aside">
						<MostViewedFooterLayout
							format={format}
							sectionName={CAPIArticle.sectionName}
							ajaxUrl={CAPIArticle.config.ajaxUrl}
						/>
					</ElementContainer>
				)}
				<ElementContainer
					data-print-layout="hide"
					padded={false}
					showTopBorder={false}
					showSideBorders={false}
					backgroundColour={neutral[93]}
					element="aside"
				>
					<AdSlot position="merchandising" display={format.display} />
				</ElementContainer>
			</main>

			{NAV.subNavSections && (
				<ElementContainer
					data-print-layout="hide"
					padded={false}
					element="aside"
				>
					<Island deferUntil="visible">
						<SubNav
							subNavSections={NAV.subNavSections}
							currentNavLink={NAV.currentNavLink}
							format={format}
						/>
					</Island>
				</ElementContainer>
			)}

			<ElementContainer
				data-print-layout="hide"
				padded={false}
				backgroundColour={brandBackground.primary}
				borderColour={brandBorder.primary}
				showSideBorders={false}
				element="footer"
			>
				<Footer
					pageFooter={CAPIArticle.pageFooter}
					pillar={format.theme}
					pillars={NAV.pillars}
					urls={CAPIArticle.nav.readerRevenueLinks.header}
					editionId={CAPIArticle.editionId}
					contributionsServiceUrl={
						CAPIArticle.contributionsServiceUrl
					}
				/>
			</ElementContainer>

			<BannerWrapper data-print-layout="hide">
				<Island deferUntil="idle" clientOnly={true}>
					<StickyBottomBanner
						contentType={CAPIArticle.contentType}
						contributionsServiceUrl={contributionsServiceUrl}
						idApiUrl={CAPIArticle.config.idApiUrl}
						isMinuteArticle={CAPIArticle.pageType.isMinuteArticle}
						isPaidContent={CAPIArticle.pageType.isPaidContent}
						isPreview={!!CAPIArticle.config.isPreview}
						isSensitive={CAPIArticle.config.isSensitive}
						keywordsId={CAPIArticle.config.keywordIds}
						pageId={CAPIArticle.pageId}
						section={CAPIArticle.config.section}
						sectionName={CAPIArticle.sectionName}
						shouldHideReaderRevenue={
							CAPIArticle.shouldHideReaderRevenue
						}
						remoteBannerSwitch={
							CAPIArticle.config.switches.remoteBanner
						}
						puzzleBannerSwitch={
							CAPIArticle.config.switches.puzzlesBanner
						}
						tags={CAPIArticle.tags}
					/>
				</Island>
			</BannerWrapper>
			<MobileStickyContainer data-print-layout="hide" />
		</>
	);
};
