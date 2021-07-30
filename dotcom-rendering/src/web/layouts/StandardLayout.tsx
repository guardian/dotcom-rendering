import { css } from '@emotion/react';

import {
	neutral,
	brandAltBackground,
	brandBackground,
	brandBorder,
	brandLine,
	labs,
	border,
} from '@guardian/src-foundations/palette';
import { from, until } from '@guardian/src-foundations/mq';
import { Design, Special } from '@guardian/types';
import type { Format } from '@guardian/types';

import { StarRating } from '@root/src/web/components/StarRating/StarRating';
import { ArticleBody } from '@root/src/web/components/ArticleBody';
import { RightColumn } from '@root/src/web/components/RightColumn';
import { ArticleTitle } from '@root/src/web/components/ArticleTitle';
import { ArticleContainer } from '@root/src/web/components/ArticleContainer';
import { ArticleMeta } from '@root/src/web/components/ArticleMeta';
import { MostViewedRightIsland } from '@root/src/web/components/MostViewedRightIsland';
import { SubMeta } from '@root/src/web/components/SubMeta';
import { MainMedia } from '@root/src/web/components/MainMedia';
import { ArticleHeadline } from '@root/src/web/components/ArticleHeadline';
import { ArticleHeadlinePadding } from '@root/src/web/components/ArticleHeadlinePadding';
import { Standfirst } from '@root/src/web/components/Standfirst';
import { Header } from '@root/src/web/components/Header';
import { Footer } from '@root/src/web/components/Footer';
import { SubNav } from '@root/src/web/components/SubNav/SubNav';
import { ElementContainer } from '@root/src/web/components/ElementContainer';
import { HeaderAdSlot } from '@root/src/web/components/HeaderAdSlot';
import { MobileStickyContainer, AdSlot } from '@root/src/web/components/AdSlot';
import { Border } from '@root/src/web/components/Border';
import { GridItem } from '@root/src/web/components/GridItem';
import { AgeWarning } from '@root/src/web/components/AgeWarning';
import { Discussion } from '@frontend/web/components/Discussion';
import { Placeholder } from '@frontend/web/components/Placeholder';
import { Nav } from '@frontend/web/components/Nav/Nav';
import { LabsHeader } from '@frontend/web/components/LabsHeader';
import { GuardianLabsLines } from '@frontend/web/components/GuardianLabsLines';

import { buildAdTargeting } from '@root/src/lib/ad-targeting';
import { parse } from '@frontend/lib/slot-machine-flags';
import { getAgeWarning } from '@root/src/lib/age-warning';
import {
	decideLineCount,
	decideLineEffect,
	getCurrentPillar,
} from '@root/src/web/lib/layoutHelpers';
import { Stuck, BannerWrapper } from '@root/src/web/layouts/lib/stickiness';
import { Lines } from '@guardian/src-ed-lines';

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
									'.      border  headline     right-column'
									'.      border  standfirst    right-column'
									'lines  border  media        right-column'
									'meta   border  media        right-column'
									'meta   border  body         right-column'
									'.      border  .            right-column';
						  `
						: css`
								grid-template-areas:
									'title  border  headline     right-column'
									'.      border  standfirst    right-column'
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
									'.      border  standfirst    right-column'
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

const articleWidth = css`
	${from.desktop} {
		width: 620px;
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
	format: Format;
	palette: Palette;
}

export const StandardLayout = ({ CAPI, NAV, format, palette }: Props) => {
	const {
		config: { isPaidContent, host },
	} = CAPI;

	const adTargeting: AdTargeting = buildAdTargeting(CAPI.config);

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
		format.design === Design.MatchReport && !!CAPI.matchUrl;

	const showComments = CAPI.isCommentable;

	const age = getAgeWarning(CAPI.tags, CAPI.webPublicationDate);

	const { branding } = CAPI.commercialProperties[CAPI.editionId];

	const formatForNav =
		format.theme === Special.Labs
			? format
			: {
					...format,
					theme: getCurrentPillar(CAPI),
			  };

	return (
		<>
			<div data-print-layout="hide">
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
					{format.theme !== Special.Labs && (
						<ElementContainer
							showTopBorder={false}
							showSideBorders={false}
							padded={false}
							backgroundColour={brandBackground.primary}
						>
							<Header
								edition={CAPI.editionId}
								idUrl={CAPI.config.idUrl}
								mmaUrl={CAPI.config.mmaUrl}
								isAnniversary={
									CAPI.config.switches.anniversaryHeaderSvg
								}
							/>
						</ElementContainer>
					)}
				</>
			</div>

			<ElementContainer
				showSideBorders={true}
				borderColour={brandLine.primary}
				showTopBorder={false}
				padded={false}
				backgroundColour={brandBackground.primary}
			>
				<Nav
					nav={NAV}
					format={formatForNav}
					subscribeUrl={CAPI.nav.readerRevenueLinks.header.subscribe}
					edition={CAPI.editionId}
				/>
			</ElementContainer>

			{NAV.subNavSections && format.theme !== Special.Labs && (
				<ElementContainer
					backgroundColour={palette.background.article}
					padded={false}
					sectionId="sub-nav-root"
				>
					<SubNav
						subNavSections={NAV.subNavSections}
						currentNavLink={NAV.currentNavLink}
						palette={palette}
						format={format}
					/>
				</ElementContainer>
			)}

			{format.theme !== Special.Labs ? (
				<ElementContainer
					backgroundColour={palette.background.article}
					padded={false}
					showTopBorder={false}
				>
					<Lines count={4} effect="straight" />
				</ElementContainer>
			) : (
				<Stuck>
					<ElementContainer
						showSideBorders={true}
						showTopBorder={false}
						backgroundColour={labs[400]}
						borderColour={border.primary}
						sectionId="labs-header"
					>
						<LabsHeader />
					</ElementContainer>
				</Stuck>
			)}

			{CAPI.config.switches.surveys && (
				<AdSlot position="survey" display={format.display} />
			)}

			<ElementContainer
				data-print-layout="hide"
				showTopBorder={false}
				backgroundColour={palette.background.article}
				borderColour={palette.border.article}
				element="article"
			>
				<StandardGrid isMatchReport={isMatchReport}>
					<GridItem area="title">
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
						{format.theme === Special.Labs ? (
							<></>
						) : (
							<Border palette={palette} />
						)}
					</GridItem>
					<GridItem area="matchNav">
						<div css={maxWidth}>
							{format.design === Design.MatchReport &&
								CAPI.matchUrl && (
									<Placeholder
										rootId="match-nav"
										height={230}
									/>
								)}
						</div>
					</GridItem>
					<GridItem area="headline">
						<div css={maxWidth}>
							<ArticleHeadlinePadding
								design={format.design}
								starRating={
									!!CAPI.starRating || CAPI.starRating === 0
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
							/>
						</div>
					</GridItem>
					<GridItem area="lines">
						<div css={maxWidth}>
							<div css={stretchLines}>
								{format.theme === Special.Labs ? (
									<GuardianLabsLines />
								) : (
									<Lines
										count={decideLineCount(format.design)}
										effect={decideLineEffect(
											format.design,
											format.theme,
										)}
									/>
								)}
							</div>
						</div>
					</GridItem>
					<GridItem area="meta">
						<div css={maxWidth}>
							<ArticleMeta
								branding={branding}
								format={format}
								palette={palette}
								pageId={CAPI.pageId}
								webTitle={CAPI.webTitle}
								author={CAPI.author}
								tags={CAPI.tags}
								primaryDateline={CAPI.webPublicationDateDisplay}
								secondaryDateline={
									CAPI.webPublicationSecondaryDateDisplay
								}
							/>
						</div>
					</GridItem>
					<GridItem area="body">
						<ArticleContainer>
							<main css={articleWidth}>
								<ArticleBody
									format={format}
									palette={palette}
									blocks={CAPI.blocks}
									adTargeting={adTargeting}
									host={host}
									pageId={CAPI.pageId}
									webTitle={CAPI.webTitle}
								/>
								{isMatchReport && <div id="match-stats" />}

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
							</main>
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
									<MostViewedRightIsland />
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

			{/* Onwards (when signed OUT) */}
			<aside data-print-layout="hide" id="onwards-upper-whensignedout" />
			{showOnwardsLower && (
				<ElementContainer
					data-print-layout="hide"
					sectionId="onwards-lower-whensignedout"
					element="aside"
				/>
			)}

			{!isPaidContent && showComments && (
				<ElementContainer
					data-print-layout="hide"
					sectionId="comments"
					element="aside"
				>
					<Discussion
						discussionApiUrl={CAPI.config.discussionApiUrl}
						shortUrlId={CAPI.config.shortUrlId}
						isCommentable={CAPI.isCommentable}
						pillar={format.theme}
						palette={palette}
						discussionD2Uid={CAPI.config.discussionD2Uid}
						discussionApiClientHeader={
							CAPI.config.discussionApiClientHeader
						}
						enableDiscussionSwitch={false}
						isAdFreeUser={CAPI.isAdFreeUser}
						shouldHideAds={CAPI.shouldHideAds}
						beingHydrated={false}
						display={format.display}
					/>
				</ElementContainer>
			)}

			{/* Onwards (when signed IN) */}
			<aside data-print-layout="hide" id="onwards-upper-whensignedin" />
			{showOnwardsLower && (
				<ElementContainer
					data-print-layout="hide"
					sectionId="onwards-lower-whensignedin"
				/>
			)}

			{!isPaidContent && (
				<ElementContainer
					data-print-layout="hide"
					sectionId="most-viewed-footer"
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

			{NAV.subNavSections && (
				<ElementContainer
					data-print-layout="hide"
					padded={false}
					sectionId="sub-nav-root"
					element="nav"
				>
					<SubNav
						subNavSections={NAV.subNavSections}
						currentNavLink={NAV.currentNavLink}
						palette={palette}
						format={format}
					/>
				</ElementContainer>
			)}

			<ElementContainer
				data-print-layout="hide"
				padded={false}
				backgroundColour={brandBackground.primary}
				borderColour={brandBorder.primary}
				showSideBorders={false}
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
