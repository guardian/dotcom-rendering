import { css } from '@emotion/react';

import {
	neutral,
	brandBorder,
	brandBackground,
	brandLine,
} from '@guardian/src-foundations/palette';
import { from, until } from '@guardian/src-foundations/mq';
import { Display, Design, Special } from '@guardian/types';
import type { Format } from '@guardian/types';

import { Lines } from '@guardian/src-ed-lines';

import { ArticleBody } from '@root/src/web/components/ArticleBody';
import { RightColumn } from '@root/src/web/components/RightColumn';
import { ArticleTitle } from '@root/src/web/components/ArticleTitle';
import { ArticleContainer } from '@root/src/web/components/ArticleContainer';
import { ArticleMeta } from '@root/src/web/components/ArticleMeta';
import { MostViewedRightIsland } from '@root/src/web/components/MostViewedRightIsland';
import { SubMeta } from '@root/src/web/components/SubMeta';
import { MainMedia } from '@root/src/web/components/MainMedia';
import { ArticleHeadline } from '@root/src/web/components/ArticleHeadline';
import { ContributorAvatar } from '@root/src/web/components/ContributorAvatar';
import { Standfirst } from '@root/src/web/components/Standfirst';
import { Header } from '@root/src/web/components/Header';
import { Footer } from '@root/src/web/components/Footer';
import { SubNav } from '@root/src/web/components/SubNav/SubNav';
import { ElementContainer } from '@root/src/web/components/ElementContainer';
import { Nav } from '@root/src/web/components/Nav/Nav';
import { HeaderAdSlot } from '@root/src/web/components/HeaderAdSlot';
import { MobileStickyContainer, AdSlot } from '@root/src/web/components/AdSlot';
import { Border } from '@root/src/web/components/Border';
import { GridItem } from '@root/src/web/components/GridItem';
import { AgeWarning } from '@root/src/web/components/AgeWarning';
import { Discussion } from '@frontend/web/components/Discussion';

import { buildAdTargeting } from '@root/src/lib/ad-targeting';
import { parse } from '@frontend/lib/slot-machine-flags';
import { getAgeWarning } from '@root/src/lib/age-warning';
import { getCurrentPillar } from '@root/src/web/lib/layoutHelpers';
import {
	Stuck,
	SendToBack,
	BannerWrapper,
} from '@root/src/web/layouts/lib/stickiness';

const StandardGrid = ({
	children,
	display,
}: {
	children: React.ReactNode;
	display: Display;
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

					${display === Display.Showcase
						? css`
								grid-template-areas:
									'title      border  headline    headline'
									'lines      border  headline    headline'
									'meta       border  standfirst  standfirst'
									'meta       border  media       media'
									'.          border  body        right-column'
									'.          border  .           right-column';
						  `
						: css`
								grid-template-areas:
									'title      border  headline    right-column'
									'lines      border  headline    right-column'
									'meta       border  standfirst  right-column'
									'meta       border  media       right-column'
									'.          border  body        right-column'
									'.          border  .           right-column';
						  `}
				}

				/*
					Explanation of each unit of grid-template-columns

					Left Column (220 - 1px border)
					Vertical grey border
					Main content
					Right Column
				*/
				${until.wide} {
					grid-template-columns: 140px 1px 1fr 300px;

					${display === Display.Showcase
						? css`
								grid-template-areas:
									'title      border  headline    headline'
									'lines      border  headline    headline'
									'meta       border  standfirst  standfirst'
									'meta       border  media       media'
									'.          border  body        right-column'
									'.          border  .           right-column';
						  `
						: css`
								grid-template-areas:
									'title      border  headline    right-column'
									'lines      border  headline    right-column'
									'meta       border  standfirst  right-column'
									'meta       border  media       right-column'
									'.          border  body        right-column'
									'.          border  .           right-column';
						  `}
				}

				/*
					Explanation of each unit of grid-template-columns

					Main content
					Right Column
				*/
				${until.leftCol} {
					grid-template-columns: 1fr 300px;
					grid-template-areas:
						'title      right-column'
						'headline   right-column'
						'standfirst right-column'
						'meta       right-column'
						'media      right-column'
						'body       right-column'
						'.          right-column';
				}

				${until.desktop} {
					grid-column-gap: 0px;
					grid-template-columns: 1fr; /* Main content */
					grid-template-areas:
						'title'
						'headline'
						'standfirst'
						'meta'
						'media'
						'body';
				}

				${until.tablet} {
					grid-column-gap: 0px;

					grid-template-columns: 1fr; /* Main content */
					grid-template-areas:
						'title'
						'headline'
						'standfirst'
						'meta'
						'media'
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

const avatarHeadlineWrapper = css`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const minHeightWithAvatar = css`
	min-height: 259px;
`;

// If in mobile increase the margin top and margin right deficit
const avatarPositionStyles = css`
	display: flex;
	justify-content: flex-end;
	overflow: hidden;
	margin-bottom: -29px;
	margin-top: -50px;
	pointer-events: none;

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

const pushToBottom = css`
	display: flex;
	height: 100%;
	flex-direction: column;
	justify-content: flex-end;
`;

const headlinePadding = css`
	padding-bottom: 43px;
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

const mainMediaWrapper = css`
	position: relative;
`;

interface Props {
	CAPI: CAPIType;
	NAV: NavType;
	format: Format;
	palette: Palette;
}

export const CommentLayout = ({
	CAPI,
	NAV,
	format,
	palette,
}: Props): JSX.Element => {
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

	const showComments = CAPI.isCommentable;

	const contributorTag = CAPI.tags.find((tag) => tag.type === 'Contributor');
	const avatarUrl = contributorTag && contributorTag.bylineImageUrl;
	const onlyOneContributor: boolean =
		CAPI.tags.filter((tag) => tag.type === 'Contributor').length === 1;

	const showAvatar = avatarUrl && onlyOneContributor;

	const age = getAgeWarning(CAPI.tags, CAPI.webPublicationDate);

	const { branding } = CAPI.commercialProperties[CAPI.editionId];

	return (
		<>
			<div>
				<Stuck>
					<ElementContainer
						showTopBorder={false}
						showSideBorders={false}
						padded={false}
					>
						<HeaderAdSlot
							isAdFreeUser={CAPI.isAdFreeUser}
							shouldHideAds={CAPI.shouldHideAds}
							display={format.display}
						/>
					</ElementContainer>
				</Stuck>
				<SendToBack>
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

					<ElementContainer
						showSideBorders={true}
						borderColour={brandLine.primary}
						showTopBorder={false}
						padded={false}
						backgroundColour={brandBackground.primary}
					>
						<Nav
							nav={NAV}
							format={{
								...format,
								theme: getCurrentPillar(CAPI),
							}}
							subscribeUrl={
								CAPI.nav.readerRevenueLinks.header.subscribe
							}
							edition={CAPI.editionId}
						/>
					</ElementContainer>

					{NAV.subNavSections && (
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

					<ElementContainer
						backgroundColour={palette.background.article}
						padded={false}
						showTopBorder={false}
					>
						<Lines count={4} effect="straight" />
					</ElementContainer>
				</SendToBack>
			</div>

			<ElementContainer
				showTopBorder={false}
				backgroundColour={palette.background.article}
				element="article"
			>
				<StandardGrid display={format.display}>
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
						<Border palette={palette} />
					</GridItem>
					<GridItem area="headline">
						<div css={maxWidth}>
							<div
								css={[
									avatarHeadlineWrapper,
									showAvatar && minHeightWithAvatar,
								]}
							>
								{/* TOP - we use divs here to position content in groups using flex */}
								<div css={!showAvatar && headlinePadding}>
									{age && (
										<div css={ageWarningMargins}>
											<AgeWarning age={age} />
										</div>
									)}
									<ArticleHeadline
										format={format}
										headlineString={CAPI.headline}
										palette={palette}
										tags={CAPI.tags}
										byline={CAPI.author.byline}
									/>
									{age && (
										<AgeWarning
											age={age}
											isScreenReader={true}
										/>
									)}
								</div>
								{/* BOTTOM */}
								<div>
									{showAvatar && avatarUrl && (
										<div css={avatarPositionStyles}>
											<ContributorAvatar
												imageSrc={avatarUrl}
												imageAlt={
													CAPI.author.byline || ''
												}
											/>
										</div>
									)}
									<Lines count={8} effect="straight" />
								</div>
							</div>
						</div>
					</GridItem>
					<GridItem area="lines">
						<div css={pushToBottom}>
							<Lines count={8} effect="straight" />
						</div>
					</GridItem>
					<GridItem area="standfirst">
						<Standfirst
							format={format}
							standfirst={CAPI.standfirst}
						/>
					</GridItem>
					<GridItem area="media">
						<div
							css={
								format.display === Display.Showcase
									? mainMediaWrapper
									: maxWidth
							}
						>
							<MainMedia
								format={format}
								palette={palette}
								elements={CAPI.mainMediaElements}
								adTargeting={adTargeting}
								starRating={
									format.design === Design.Review &&
									CAPI.starRating
										? CAPI.starRating
										: undefined
								}
								host={host}
								pageId={CAPI.pageId}
								webTitle={CAPI.webTitle}
							/>
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
							<main css={maxWidth}>
								<ArticleBody
									format={format}
									palette={palette}
									blocks={CAPI.blocks}
									adTargeting={adTargeting}
									host={host}
									pageId={CAPI.pageId}
									webTitle={CAPI.webTitle}
								/>
								{showBodyEndSlot && <div id="slot-body-end" />}
								<Lines count={4} effect="straight" />
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
				padded={false}
				showTopBorder={false}
				showSideBorders={false}
				backgroundColour={neutral[93]}
				element="aside"
			>
				<AdSlot
					position="merchandising-high"
					display={format.display}
				/>
			</ElementContainer>

			{/* Onwards (when signed OUT) */}
			<div id="onwards-upper-whensignedout" />
			{showOnwardsLower && (
				<ElementContainer
					sectionId="onwards-lower-whensignedout"
					element="aside"
				/>
			)}

			{!isPaidContent && showComments && (
				<ElementContainer sectionId="comments" element="aside">
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
			<aside id="onwards-upper-whensignedin" />
			{showOnwardsLower && (
				<ElementContainer
					sectionId="onwards-lower-whensignedin"
					element="aside"
				/>
			)}

			{!isPaidContent && (
				<ElementContainer
					sectionId="most-viewed-footer"
					element="aside"
				/>
			)}

			<ElementContainer
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

			<BannerWrapper />
			<MobileStickyContainer />
		</>
	);
};
