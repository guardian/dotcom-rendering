import { css } from '@emotion/react';

import {
	neutral,
	brandAltBackground,
	brandBackground,
	brandBorder,
	brandLine,
	labs,
	border,
	from,
	until,
} from '@guardian/source-foundations';
import { ArticleDesign, ArticleSpecial } from '@guardian/libs';
import type { ArticleFormat } from '@guardian/libs';

import { Lines } from '@guardian/source-react-components-development-kitchen';
import { StarRating } from '../components/StarRating/StarRating';
import { ArticleBody } from '../components/ArticleBody';
import { RightColumn } from '../components/RightColumn';
import { ArticleTitle } from '../components/ArticleTitle';
import { ArticleContainer } from '../components/ArticleContainer';
import { ArticleMeta } from '../components/ArticleMeta';
import { SubMeta } from '../components/SubMeta';
import { MainMedia } from '../components/MainMedia';
import { ArticleHeadline } from '../components/ArticleHeadline';
import { ArticleHeadlinePadding } from '../components/ArticleHeadlinePadding';
import { Standfirst } from '../components/Standfirst';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SubNav } from '../components/SubNav.importable';
import { ElementContainer } from '../components/ElementContainer';
import { HeaderAdSlot } from '../components/HeaderAdSlot';
import { MobileStickyContainer, AdSlot } from '../components/AdSlot';
import { Border } from '../components/Border';
import { GridItem } from '../components/GridItem';
import { AgeWarning } from '../components/AgeWarning';
import { DiscussionContainer } from '../components/DiscussionContainer.importable';
import { Placeholder } from '../components/Placeholder';
import { Nav } from '../components/Nav/Nav';
import { LabsHeader } from '../components/LabsHeader';
import { GuardianLabsLines } from '../components/GuardianLabsLines';

import { buildAdTargeting } from '../../lib/ad-targeting';
import { parse } from '../../lib/slot-machine-flags';
import { getAgeWarning } from '../../lib/age-warning';
import {
	decideLineCount,
	decideLineEffect,
	getCurrentPillar,
} from '../lib/layoutHelpers';
import { Stuck, BannerWrapper } from './lib/stickiness';
import { Island } from '../components/Island';
import { MostViewedRightWrapper } from '../components/MostViewedRightWrapper.importable';
import { GetMatchStats } from '../components/GetMatchStats.importable';
import { OnwardsLower } from '../components/OnwardsLower.importable';
import { OnwardsUpper } from '../components/OnwardsUpper.importable';

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

					grid-template-columns: 1fr; /* Main content */
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

const ageWarningMargins = css`
	margin-top: 12px;
	margin-left: -10px;
	margin-bottom: 6px;

	${from.tablet} {
		margin-left: -20px;
	}

	${from.leftCol} {
		margin-left: -10px;
		margin-top: 0;
	}
`;

interface Props {
	CAPI: CAPIType;
	NAV: NavType;
	format: ArticleFormat;
	palette: Palette;
}

export const StandardLayout = ({ CAPI, NAV, format, palette }: Props) => {
	const {
		config: { isPaidContent, host },
	} = CAPI;

	const adTargeting: AdTargeting = buildAdTargeting({
		isAdFreeUser: CAPI.isAdFreeUser,
		isSensitive: CAPI.config.isSensitive,
		videoDuration: CAPI.config.videoDuration,
		edition: CAPI.config.edition,
		section: CAPI.config.section,
		sharedAdTargeting: CAPI.config.sharedAdTargeting,
		adUnit: CAPI.config.adUnit,
	});

	const showBodyEndSlot =
		parse(CAPI.slotMachineFlags || '').showBodyEnd ||
		CAPI.config.switches.slotBodyEnd;

	// TODO:
	// 1) Read 'forceEpic' value from URL parameter and use it to force the slot to render
	// 2) Otherwise, ensure slot only renders if `CAPI.config.shouldHideReaderRevenue` equals false.

	const seriesTag = CAPI.tags.find(
		(tag) => tag.type === 'Series' || tag.type === 'Blog',
	);

	const showOnwardsLower = seriesTag && CAPI.hasStoryPackage;

	const isMatchReport =
		format.design === ArticleDesign.MatchReport && !!CAPI.matchUrl;

	const showComments = CAPI.isCommentable;

	const age = getAgeWarning(CAPI.tags, CAPI.webPublicationDateDeprecated);

	const { branding } = CAPI.commercialProperties[CAPI.editionId];

	const formatForNav =
		format.theme === ArticleSpecial.Labs
			? format
			: {
					...format,
					theme: getCurrentPillar(CAPI),
			  };

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
								isAdFreeUser={CAPI.isAdFreeUser}
								shouldHideAds={CAPI.shouldHideAds}
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
								edition={CAPI.editionId}
								idUrl={CAPI.config.idUrl}
								mmaUrl={CAPI.config.mmaUrl}
								supporterCTA={
									CAPI.nav.readerRevenueLinks.header.supporter
								}
								discussionApiUrl={CAPI.config.discussionApiUrl}
								isAnniversary={
									CAPI.config.switches.anniversaryHeaderSvg
								}
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
								CAPI.nav.readerRevenueLinks.header.subscribe
							}
							edition={CAPI.editionId}
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
									<Lines count={4} effect="straight" />
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
						<LabsHeader />
					</ElementContainer>
				</Stuck>
			)}

			{CAPI.config.switches.surveys && (
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
								palette={palette}
								tags={CAPI.tags}
								sectionLabel={CAPI.sectionLabel}
								sectionUrl={CAPI.sectionUrl}
								guardianBaseURL={CAPI.guardianBaseURL}
								badge={CAPI.badge}
							/>
						</GridItem>
						<GridItem area="border">
							{format.theme === ArticleSpecial.Labs ? (
								<></>
							) : (
								<Border palette={palette} />
							)}
						</GridItem>
						<GridItem area="matchNav" element="aside">
							<div css={maxWidth}>
								{format.design === ArticleDesign.MatchReport &&
									CAPI.matchUrl && (
										<Placeholder
											rootId="match-nav"
											height={230}
										/>
									)}
							</div>
						</GridItem>
						<GridItem area="matchtabs" element="aside">
							<div css={maxWidth}>
								{format.design === ArticleDesign.MatchReport &&
									CAPI.matchUrl && (
										<Placeholder
											rootId="match-tabs"
											height={40}
										/>
									)}
							</div>
						</GridItem>
						<GridItem area="headline">
							<div css={maxWidth}>
								<ArticleHeadlinePadding
									design={format.design}
									starRating={
										!!CAPI.starRating ||
										CAPI.starRating === 0
									}
								>
									{age && (
										<div css={ageWarningMargins}>
											<AgeWarning age={age} />
										</div>
									)}
									<ArticleHeadline
										format={format}
										headlineString={CAPI.headline}
										tags={CAPI.tags}
										byline={CAPI.author.byline}
										palette={palette}
									/>
									{age && (
										<AgeWarning
											age={age}
											isScreenReader={true}
										/>
									)}
								</ArticleHeadlinePadding>
							</div>
							{CAPI.starRating || CAPI.starRating === 0 ? (
								<div css={starWrapper}>
									<StarRating
										rating={CAPI.starRating}
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
								standfirst={CAPI.standfirst}
							/>
						</GridItem>
						<GridItem area="media">
							<div css={maxWidth}>
								<MainMedia
									format={format}
									palette={palette}
									elements={CAPI.mainMediaElements}
									adTargeting={adTargeting}
									host={host}
									pageId={CAPI.pageId}
									webTitle={CAPI.webTitle}
									ajaxUrl={CAPI.config.ajaxUrl}
								/>
							</div>
						</GridItem>
						<GridItem area="lines">
							<div css={maxWidth}>
								<div css={stretchLines}>
									{format.theme === ArticleSpecial.Labs ? (
										<GuardianLabsLines />
									) : (
										<Lines
											count={decideLineCount(
												format.design,
											)}
											effect={decideLineEffect(
												format.design,
												format.theme,
											)}
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
									palette={palette}
									pageId={CAPI.pageId}
									webTitle={CAPI.webTitle}
									author={CAPI.author}
									tags={CAPI.tags}
									primaryDateline={
										CAPI.webPublicationDateDisplay
									}
									secondaryDateline={
										CAPI.webPublicationSecondaryDateDisplay
									}
									isCommentable={CAPI.isCommentable}
									discussionApiUrl={
										CAPI.config.discussionApiUrl
									}
									shortUrlId={CAPI.config.shortUrlId}
								/>
							</div>
						</GridItem>
						<GridItem area="body">
							<ArticleContainer format={format}>
								<ArticleBody
									format={format}
									palette={palette}
									blocks={CAPI.blocks}
									adTargeting={adTargeting}
									host={host}
									pageId={CAPI.pageId}
									webTitle={CAPI.webTitle}
									ajaxUrl={CAPI.config.ajaxUrl}
								/>
								{format.design === ArticleDesign.MatchReport &&
									!!CAPI.matchUrl && (
										<Island
											deferUntil="visible"
											clientOnly={true}
											placeholderHeight={800}
										>
											<GetMatchStats
												matchUrl={CAPI.matchUrl}
												format={format}
											/>
										</Island>
									)}

								{showBodyEndSlot && <div id="slot-body-end" />}
								<Lines
									data-print-layout="hide"
									count={4}
									effect="straight"
								/>
								<SubMeta
									palette={palette}
									format={format}
									subMetaKeywordLinks={
										CAPI.subMetaKeywordLinks
									}
									subMetaSectionLinks={
										CAPI.subMetaSectionLinks
									}
									pageId={CAPI.pageId}
									webUrl={CAPI.webURL}
									webTitle={CAPI.webTitle}
									showBottomSocialButtons={
										CAPI.showBottomSocialButtons
									}
									badge={CAPI.badge}
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
									/>
									{!isPaidContent ? (
										<Island
											clientOnly={true}
											deferUntil="visible"
										>
											<MostViewedRightWrapper
												isAdFreeUser={CAPI.isAdFreeUser}
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

				<Island clientOnly={true} deferUntil="visible">
					<OnwardsUpper
						ajaxUrl={CAPI.config.ajaxUrl}
						hasRelated={CAPI.hasRelated}
						hasStoryPackage={CAPI.hasStoryPackage}
						isAdFreeUser={CAPI.isAdFreeUser}
						pageId={CAPI.pageId}
						isPaidContent={CAPI.config.isPaidContent || false}
						showRelatedContent={CAPI.config.showRelatedContent}
						keywordIds={CAPI.config.keywordIds}
						contentType={CAPI.contentType}
						tags={CAPI.tags}
						format={format}
						pillar={format.theme}
						edition={CAPI.editionId}
						shortUrlId={CAPI.config.shortUrlId}
					/>
				</Island>

				{showOnwardsLower && (
					<ElementContainer
						sectionId="onwards-lower"
						element="section"
					>
						<Island clientOnly={true} deferUntil="visible">
							<OnwardsLower
								ajaxUrl={CAPI.config.ajaxUrl}
								hasStoryPackage={CAPI.hasStoryPackage}
								tags={CAPI.tags}
								format={format}
							/>
						</Island>
					</ElementContainer>
				)}

				{!isPaidContent && showComments && (
					<ElementContainer
						sectionId="comments"
						data-print-layout="hide"
						element="section"
					>
						<Island clientOnly={true} deferUntil="visible">
							<DiscussionContainer
								discussionApiUrl={CAPI.config.discussionApiUrl}
								shortUrlId={CAPI.config.shortUrlId}
								format={format}
								discussionD2Uid={CAPI.config.discussionD2Uid}
								discussionApiClientHeader={
									CAPI.config.discussionApiClientHeader
								}
								enableDiscussionSwitch={
									CAPI.config.switches.enableDiscussionSwitch
								}
								isAdFreeUser={CAPI.isAdFreeUser}
								shouldHideAds={CAPI.shouldHideAds}
							/>
						</Island>
					</ElementContainer>
				)}

				{!isPaidContent && (
					<ElementContainer
						data-print-layout="hide"
						sectionId="most-viewed-footer"
						element="aside"
					/>
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
					pageFooter={CAPI.pageFooter}
					pillar={format.theme}
					pillars={NAV.pillars}
				/>
			</ElementContainer>

			<BannerWrapper data-print-layout="hide" />
			<MobileStickyContainer data-print-layout="hide" />
		</>
	);
};
