import React from 'react';
import { css, cx } from 'emotion';

import {
	neutral,
	brandBackground,
	brandBorder,
} from '@guardian/src-foundations/palette';
import { from, until } from '@guardian/src-foundations/mq';
import { space } from '@guardian/src-foundations';

import { ArticleBody } from '@root/src/web/components/ArticleBody';
import { RightColumn } from '@root/src/web/components/RightColumn';
import { ArticleContainer } from '@root/src/web/components/ArticleContainer';
import { ArticleMeta } from '@root/src/web/components/ArticleMeta';
import { GuardianLines } from '@root/src/web/components/GuardianLines';
import { SubMeta } from '@root/src/web/components/SubMeta';
import { MainMedia } from '@root/src/web/components/MainMedia';
import { ArticleTitle } from '@root/src/web/components/ArticleTitle';
import { ArticleHeadline } from '@root/src/web/components/ArticleHeadline';
import { ArticleStandfirst } from '@root/src/web/components/ArticleStandfirst';
import { Footer } from '@root/src/web/components/Footer';
import { SubNav } from '@root/src/web/components/SubNav/SubNav';
import { Section } from '@root/src/web/components/Section';
import { Nav } from '@root/src/web/components/Nav/Nav';
import { MobileStickyContainer, AdSlot } from '@root/src/web/components/AdSlot';
import { Border } from '@root/src/web/components/Border';
import { GridItem } from '@root/src/web/components/GridItem';
import { Caption } from '@root/src/web/components/Caption';
import { HeadlineByline } from '@root/src/web/components/HeadlineByline';
import { ContainerLayout } from '@root/src/web/components/ContainerLayout';
import { Discussion } from '@frontend/web/components/Discussion';
import { Hide } from '@root/src/web/components/Hide';

import { buildAdTargeting } from '@root/src/lib/ad-targeting';
import { getZIndex } from '@frontend/web/lib/getZIndex';
import { parse } from '@frontend/lib/slot-machine-flags';

import {
	decideLineCount,
	decideLineEffect,
	getCurrentPillar,
} from '@root/src/web/lib/layoutHelpers';
import { Display, Design } from '@guardian/types';
import { BannerWrapper } from '@root/src/web/layouts/lib/stickiness';

const ImmersiveGrid = ({ children }: { children: React.ReactNode }) => (
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

				${from.wide} {
					grid-column-gap: 10px;
					grid-template-columns:
						219px /* Left Column (220 - 1px border) */
						1px /* Vertical grey border */
						1fr /* Main content */
						300px; /* Right Column */
					grid-template-areas:
						'caption    border      title       right-column'
						'.          border      headline    right-column'
						'.          border      standfirst  right-column'
						'.          border      byline      right-column'
						'lines      border      body        right-column'
						'meta       border      body        right-column'
						'meta       border      body        right-column'
						'.          border      body        right-column'
						'.          border      .           right-column';
				}

				${until.wide} {
					grid-column-gap: 10px;
					grid-template-columns:
						140px /* Left Column (220 - 1px border) */
						1px /* Vertical grey border */
						1fr /* Main content */
						300px; /* Right Column */
					grid-template-areas:
						'.          border      title       right-column'
						'.          border      headline    right-column'
						'.          border      standfirst  right-column'
						'.          border      byline      right-column'
						'lines      border      body        right-column'
						'meta       border      body        right-column'
						'meta       border      body        right-column'
						'.          border      body        right-column'
						'.          border      .           right-column';
				}

				${until.leftCol} {
					grid-column-gap: 20px;
					grid-template-columns:
						1fr /* Main content */
						300px; /* Right Column */
					grid-template-areas:
						'title       right-column'
						'headline    right-column'
						'standfirst  right-column'
						'byline      right-column'
						'caption     right-column'
						'lines       right-column'
						'meta        right-column'
						'body        right-column';
				}

				${until.desktop} {
					grid-column-gap: 0px;
					grid-template-columns: 1fr; /* Main content */
					grid-template-areas:
						'title'
						'headline'
						'standfirst'
						'byline'
						'caption'
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

const hasMainMediaStyles = css`
	height: 100vh;
	/**
    100vw is normally enough but don't let the content shrink vertically too
    much just in case
    */
	min-height: 25rem;
	${from.desktop} {
		min-height: 31.25rem;
	}
	${from.wide} {
		min-height: 50rem;
	}
`;

interface Props {
	CAPI: CAPIType;
	NAV: NavType;
	display: Display;
	design: Design;
	pillar: Theme;
}

const decideCaption = (mainMedia: ImageBlockElement): string => {
	const caption = [];
	if (mainMedia && mainMedia.data && mainMedia.data.caption)
		caption.push(mainMedia.data.caption);
	if (
		mainMedia &&
		mainMedia.displayCredit &&
		mainMedia.data &&
		mainMedia.data.credit
	)
		caption.push(mainMedia.data.credit);
	return caption.join(' ');
};

export const ImmersiveLayout = ({
	CAPI,
	NAV,
	display,
	design,
	pillar,
}: Props) => {
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

	const mainMedia = CAPI.mainMediaElements[0] as ImageBlockElement;
	const captionText = decideCaption(mainMedia);
	const { branding } = CAPI.commercialProperties[CAPI.editionId];

	const HEADLINE_OFFSET = mainMedia ? 120 : 0;

	const LeftColCaption = () => (
		<div
			className={css`
				margin-top: ${HEADLINE_OFFSET}px;
				position: absolute;
				margin-left: 20px;
			`}
		>
			<Caption
				display={display}
				design={design}
				captionText={captionText}
				pillar={pillar}
				shouldLimitWidth={true}
			/>
		</div>
	);

	const BlackBox = ({ children }: { children: React.ReactNode }) => (
		<div
			className={css`
				/*
                    This pseudo css shows a black box to the right of the headline
                    so that the black background of the inverted text stretches
                    all the way right. But only from mobileLandscape because below
                    that we want to show a gap. To work properly it needs to wrap
                    the healine so it inherits the correct height based on the length
                    of the headline text
                */
				${from.mobileLandscape} {
					position: relative;
					:after {
						content: '';
						display: block;
						position: absolute;
						width: 50%;
						right: 0;
						background-color: ${neutral[0]};
						${getZIndex('immersiveBlackBox')}
						top: 0;
						bottom: 0;
					}
				}
			`}
		>
			{children}
		</div>
	);

	return (
		<>
			<div
				className={cx(
					mainMedia && hasMainMediaStyles,
					css`
						display: flex;
						flex-direction: column;
					`,
				)}
			>
				<header
					className={css`
						${getZIndex('headerWrapper')}
						order: 0;
					`}
				>
					<Section
						showSideBorders={false}
						showTopBorder={false}
						padded={false}
						backgroundColour={brandBackground.primary}
					>
						<Nav
							pillar={getCurrentPillar(CAPI)}
							nav={NAV}
							display={display}
							subscribeUrl={
								CAPI.nav.readerRevenueLinks.header.subscribe
							}
							edition={CAPI.editionId}
						/>
					</Section>
				</header>

				<MainMedia
					display={display}
					design={design}
					elements={CAPI.mainMediaElements}
					pillar={pillar}
					adTargeting={adTargeting}
					starRating={
						design === Design.Review && CAPI.starRating
							? CAPI.starRating
							: undefined
					}
					host={host}
					hideCaption={true}
				/>
			</div>
			{mainMedia && (
				<>
					<div
						className={css`
							margin-top: -${HEADLINE_OFFSET}px;
							/*
                        This z-index is what ensures the headline title text shows above main media. For
                        the actual headline we set the z-index deeper in ArticleHeadline itself so that
                        the text appears above the pseudo BlackBox element
                    */
							position: relative;
							${getZIndex('articleHeadline')}
						`}
					>
						<ContainerLayout
							verticalMargins={false}
							padContent={false}
							padSides={false}
							leftContent={<LeftColCaption />}
						>
							<ArticleTitle
								display={display}
								design={design}
								tags={CAPI.tags}
								sectionLabel={CAPI.sectionLabel}
								sectionUrl={CAPI.sectionUrl}
								guardianBaseURL={CAPI.guardianBaseURL}
								pillar={pillar}
								badge={CAPI.badge}
							/>
						</ContainerLayout>
						<BlackBox>
							<ContainerLayout
								verticalMargins={false}
								padContent={false}
								padSides={false}
							>
								<ArticleHeadline
									display={display}
									headlineString={CAPI.headline}
									design={design}
									pillar={pillar}
									tags={CAPI.tags}
									byline={CAPI.author.byline}
								/>
							</ContainerLayout>
						</BlackBox>
					</div>
				</>
			)}
			<Section showTopBorder={false} showSideBorders={false}>
				<ImmersiveGrid>
					{/* Above leftCol, the Caption is controled by ContainerLayout ^^ */}
					<GridItem area="caption">
						<Hide when="above" breakpoint="leftCol">
							<Caption
								display={display}
								design={design}
								captionText={captionText}
								pillar={pillar}
								shouldLimitWidth={false}
							/>
						</Hide>
					</GridItem>
					<GridItem area="border">
						{design === Design.PhotoEssay ? <></> : <Border />}
					</GridItem>
					<GridItem area="title">
						<>
							{!mainMedia && (
								<div
									className={css`
										margin-top: -8px;
										margin-left: -4px;
										margin-bottom: 12px;

										${until.tablet} {
											margin-left: -20px;
										}
									`}
								>
									<ArticleTitle
										display={display}
										design={design}
										tags={CAPI.tags}
										sectionLabel={CAPI.sectionLabel}
										sectionUrl={CAPI.sectionUrl}
										guardianBaseURL={CAPI.guardianBaseURL}
										pillar={pillar}
										badge={CAPI.badge}
										noMainMedia={true}
									/>
								</div>
							)}
						</>
					</GridItem>
					<GridItem area="headline">
						<>
							{!mainMedia && (
								<div className={maxWidth}>
									<ArticleHeadline
										display={display}
										headlineString={CAPI.headline}
										design={design}
										pillar={pillar}
										tags={CAPI.tags}
										byline={CAPI.author.byline}
										noMainMedia={true}
									/>
								</div>
							)}
						</>
					</GridItem>
					<GridItem area="standfirst">
						<ArticleStandfirst
							display={display}
							design={design}
							pillar={pillar}
							standfirst={CAPI.standfirst}
						/>
					</GridItem>
					<GridItem area="byline">
						<HeadlineByline
							display={display}
							design={design}
							pillar={pillar}
							tags={CAPI.tags}
							byline={
								CAPI.author.byline ? CAPI.author.byline : ''
							}
						/>
					</GridItem>
					<GridItem area="lines">
						{design === Design.PhotoEssay ? (
							<></>
						) : (
							<div className={maxWidth}>
								<div className={stretchLines}>
									<GuardianLines
										pillar={pillar}
										effect={decideLineEffect(
											Design.Article,
											pillar,
										)}
										count={decideLineCount(Design.Article)}
									/>
								</div>
							</div>
						)}
					</GridItem>
					<GridItem area="meta">
						<div className={maxWidth}>
							<ArticleMeta
								branding={branding}
								display={display}
								design={design}
								pillar={pillar}
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
									display={display}
									pillar={pillar}
									blocks={CAPI.blocks}
									design={design}
									adTargeting={adTargeting}
									host={host}
								/>
								{showBodyEndSlot && <div id="slot-body-end" />}
								<GuardianLines count={4} pillar={pillar} />
								<SubMeta
									pillar={pillar}
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
								<>
									{mainMedia && (
										<div
											className={css`
												margin-top: ${space[4]}px;
											`}
										>
											<AdSlot
												position="right"
												display={display}
											/>
										</div>
									)}
								</>
							</RightColumn>
						</div>
					</GridItem>
				</ImmersiveGrid>
			</Section>

			<Section
				padded={false}
				showTopBorder={false}
				showSideBorders={false}
				backgroundColour={neutral[93]}
			>
				<AdSlot position="merchandising-high" display={display} />
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
								pillar={pillar}
								discussionD2Uid={CAPI.config.discussionD2Uid}
								discussionApiClientHeader={
									CAPI.config.discussionApiClientHeader
								}
								enableDiscussionSwitch={false}
								isAdFreeUser={CAPI.isAdFreeUser}
								shouldHideAds={CAPI.shouldHideAds}
								beingHydrated={false}
								display={display}
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
				<AdSlot position="merchandising" display={display} />
			</Section>

			{NAV.subNavSections && (
				<Section padded={false} sectionId="sub-nav-root">
					<SubNav
						subNavSections={NAV.subNavSections}
						currentNavLink={NAV.currentNavLink}
						pillar={pillar}
					/>
					<GuardianLines count={4} pillar={pillar} />
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
					pillar={pillar}
					pillars={NAV.pillars}
				/>
			</Section>

			<BannerWrapper />
			<MobileStickyContainer />
		</>
	);
};
