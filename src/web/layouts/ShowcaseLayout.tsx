import React from 'react';
import { css } from 'emotion';

import {
	neutral,
	background,
	brandBackground,
	brandLine,
	brandBorder,
} from '@guardian/src-foundations/palette';
import { from, until } from '@guardian/src-foundations/mq';
import { GuardianLines } from '@root/src/web/components/GuardianLines';
import { Design, Format } from '@guardian/types';

import { ArticleBody } from '@root/src/web/components/ArticleBody';
import { RightColumn } from '@root/src/web/components/RightColumn';
import { ArticleTitle } from '@root/src/web/components/ArticleTitle';
import { ArticleContainer } from '@root/src/web/components/ArticleContainer';
import { ArticleMeta } from '@root/src/web/components/ArticleMeta';
import { MostViewedRightIsland } from '@root/src/web/components/MostViewedRightIsland';
import { SubMeta } from '@root/src/web/components/SubMeta';
import { MainMedia } from '@root/src/web/components/MainMedia';
import { ArticleHeadline } from '@root/src/web/components/ArticleHeadline';
import { ArticleStandfirst } from '@root/src/web/components/ArticleStandfirst';
import { Header } from '@root/src/web/components/Header';
import { Footer } from '@root/src/web/components/Footer';
import { SubNav } from '@root/src/web/components/SubNav/SubNav';
import { Section } from '@root/src/web/components/Section';
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
import {
	decideLineCount,
	decideLineEffect,
	getCurrentPillar,
} from '@root/src/web/lib/layoutHelpers';
import {
	Stuck,
	SendToBack,
	BannerWrapper,
} from '@root/src/web/layouts/lib/stickiness';

const ShowcaseGrid = ({ children }: { children: React.ReactNode }) => (
	<div
		className={css`
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

				${from.wide} {
					grid-template-columns:
						219px /* Left Column (220 - 1px border) */
						1px /* Vertical grey border */
						1fr /* Main content */
						300px; /* Right Column */
					grid-template-areas:
						'title  border  headline    headline'
						'lines  border  media       media'
						'meta   border  media       media'
						'meta   border  standfirst  right-column'
						'.      border  body        right-column'
						'.      border  .           right-column';
				}

				${until.wide} {
					grid-template-columns:
						140px /* Left Column (220 - 1px border) */
						1px /* Vertical grey border */
						1fr /* Main content */
						300px; /* Right Column */
					grid-template-areas:
						'title  border  headline    headline'
						'lines  border  media       media'
						'meta   border  media       media'
						'meta   border  standfirst  right-column'
						'.      border  body        right-column'
						'.      border  .           right-column';
				}

				${until.leftCol} {
					grid-template-columns:
						1fr /* Main content */
						300px; /* Right Column */
					grid-template-areas:
						'title      right-column'
						'headline   right-column'
						'standfirst right-column'
						'media      right-column'
						'lines      right-column'
						'meta       right-column'
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
						'media'
						'lines'
						'meta'
						'body';
				}

				${until.tablet} {
					grid-column-gap: 0px;
					grid-template-columns: 1fr; /* Main content */
					grid-template-areas:
						'media'
						'title'
						'headline'
						'standfirst'
						'lines'
						'meta'
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

const mainMediaWrapper = css`
	position: relative;
`;

const PositionHeadline = ({
	design,
	children,
}: {
	design: Design;
	children: React.ReactNode;
}) => {
	switch (design) {
		case Design.Interview:
			return (
				<div
					className={css`
						${from.leftCol} {
							margin-bottom: -100px;
						}
					`}
				>
					<div className={maxWidth}>{children}</div>
				</div>
			);
		default:
			return <div className={maxWidth}>{children}</div>;
	}
};

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

export const ShowcaseLayout = ({ CAPI, NAV, format, palette }: Props) => {
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

	const age = getAgeWarning(CAPI.tags, CAPI.webPublicationDate);

	const { branding } = CAPI.commercialProperties[CAPI.editionId];

	return (
		<>
			<div>
				<Stuck>
					<Section
						showTopBorder={false}
						showSideBorders={false}
						padded={false}
					>
						<HeaderAdSlot
							isAdFreeUser={CAPI.isAdFreeUser}
							shouldHideAds={CAPI.shouldHideAds}
							display={format.display}
						/>
					</Section>
				</Stuck>
				<SendToBack>
					<Section
						showTopBorder={false}
						showSideBorders={false}
						padded={false}
						backgroundColour={brandBackground.primary}
					>
						<Header
							edition={CAPI.editionId}
							idUrl={CAPI.config.idUrl}
							mmaUrl={CAPI.config.mmaUrl}
						/>
					</Section>

					<Section
						showSideBorders={true}
						borderColour={brandLine.primary}
						showTopBorder={false}
						padded={false}
						backgroundColour={brandBackground.primary}
					>
						<Nav
							pillar={getCurrentPillar(CAPI)}
							nav={NAV}
							display={format.display}
							subscribeUrl={
								CAPI.nav.readerRevenueLinks.header.subscribe
							}
							edition={CAPI.editionId}
						/>
					</Section>

					{NAV.subNavSections && (
						<Section
							backgroundColour={background.primary}
							padded={false}
							sectionId="sub-nav-root"
						>
							<SubNav
								subNavSections={NAV.subNavSections}
								currentNavLink={NAV.currentNavLink}
								format={format}
							/>
						</Section>
					)}

					<Section
						backgroundColour={background.primary}
						padded={false}
						showTopBorder={false}
					>
						<GuardianLines count={4} pillar={format.theme} />
					</Section>
				</SendToBack>
			</div>

			<Section showTopBorder={false}>
				<ShowcaseGrid>
					<GridItem area="title">
						<ArticleTitle
							display={format.display}
							design={format.design}
							tags={CAPI.tags}
							sectionLabel={CAPI.sectionLabel}
							sectionUrl={CAPI.sectionUrl}
							guardianBaseURL={CAPI.guardianBaseURL}
							pillar={format.theme}
							badge={CAPI.badge}
						/>
					</GridItem>
					<GridItem area="border">
						<Border />
					</GridItem>
					<GridItem area="headline">
						<PositionHeadline design={format.design}>
							<div
								className={css`
									padding-bottom: 24px;
								`}
							>
								{age && (
									<div className={ageWarningMargins}>
										<AgeWarning age={age} />
									</div>
								)}
								<ArticleHeadline
									display={format.display}
									headlineString={CAPI.headline}
									palette={palette}
									design={format.design}
									pillar={format.theme}
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
						</PositionHeadline>
					</GridItem>
					<GridItem area="media">
						<div className={mainMediaWrapper}>
							<MainMedia
								display={format.display}
								design={format.design}
								elements={CAPI.mainMediaElements}
								pillar={format.theme}
								adTargeting={adTargeting}
								starRating={
									format.design === Design.Review &&
									CAPI.starRating
										? CAPI.starRating
										: undefined
								}
								host={host}
							/>
						</div>
					</GridItem>
					<GridItem area="standfirst">
						<ArticleStandfirst
							display={format.display}
							design={format.design}
							pillar={format.theme}
							standfirst={CAPI.standfirst}
						/>
					</GridItem>
					<GridItem area="lines">
						<div className={maxWidth}>
							<div className={stretchLines}>
								<GuardianLines
									count={decideLineCount(format.design)}
									pillar={format.theme}
									effect={decideLineEffect(
										format.design,
										format.theme,
									)}
								/>
							</div>
						</div>
					</GridItem>
					<GridItem area="meta">
						<div className={maxWidth}>
							<ArticleMeta
								branding={branding}
								format={format}
								pageId={CAPI.pageId}
								webTitle={CAPI.webTitle}
								author={CAPI.author}
								tags={CAPI.tags}
								primaryDateline={CAPI.webPublicationDateDisplay}
								secondaryDateline={
									CAPI.blocks[0].secondaryDateLine
								}
							/>
						</div>
					</GridItem>
					<GridItem area="body">
						<ArticleContainer>
							<main className={maxWidth}>
								<ArticleBody
									format={format}
									blocks={CAPI.blocks}
									adTargeting={adTargeting}
									host={host}
								/>
								{showBodyEndSlot && <div id="slot-body-end" />}
								<GuardianLines
									count={4}
									pillar={format.theme}
								/>
								<SubMeta
									pillar={format.theme}
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
							className={css`
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
				</ShowcaseGrid>
			</Section>

			<Section
				padded={false}
				showTopBorder={false}
				showSideBorders={false}
				backgroundColour={neutral[93]}
			>
				<AdSlot
					position="merchandising-high"
					display={format.display}
				/>
			</Section>

			{!isPaidContent && (
				<>
					{/* Onwards (when signed OUT) */}
					<div id="onwards-upper-whensignedout" />
					{showOnwardsLower && (
						<Section sectionId="onwards-lower-whensignedout" />
					)}

					{showComments && (
						<Section sectionId="comments">
							<Discussion
								discussionApiUrl={CAPI.config.discussionApiUrl}
								shortUrlId={CAPI.config.shortUrlId}
								isCommentable={CAPI.isCommentable}
								pillar={format.theme}
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
						</Section>
					)}

					{/* Onwards (when signed IN) */}
					<div id="onwards-upper-whensignedin" />
					{showOnwardsLower && (
						<Section sectionId="onwards-lower-whensignedin" />
					)}

					<Section sectionId="most-viewed-footer" />
				</>
			)}

			<Section
				padded={false}
				showTopBorder={false}
				showSideBorders={false}
				backgroundColour={neutral[93]}
			>
				<AdSlot position="merchandising" display={format.display} />
			</Section>

			{NAV.subNavSections && (
				<Section padded={false} sectionId="sub-nav-root">
					<SubNav
						subNavSections={NAV.subNavSections}
						currentNavLink={NAV.currentNavLink}
						format={format}
					/>
					<GuardianLines count={4} pillar={format.theme} />
				</Section>
			)}

			<Section
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
			</Section>

			<BannerWrapper />
			<MobileStickyContainer />
		</>
	);
};
