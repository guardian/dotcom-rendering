import { css } from '@emotion/react';

import {
	neutral,
	brandBackground,
	brandBorder,
	labs,
	border,
} from '@guardian/src-foundations/palette';
import { from, until } from '@guardian/src-foundations/mq';
import { space } from '@guardian/src-foundations';
import { Design, Special } from '@guardian/types';
import type { Format } from '@guardian/types';

import { ArticleBody } from '@root/src/web/components/ArticleBody';
import { RightColumn } from '@root/src/web/components/RightColumn';
import { ArticleContainer } from '@root/src/web/components/ArticleContainer';
import { ArticleMeta } from '@root/src/web/components/ArticleMeta';
import { SubMeta } from '@root/src/web/components/SubMeta';
import { MainMedia } from '@root/src/web/components/MainMedia';
import { ArticleTitle } from '@root/src/web/components/ArticleTitle';
import { ArticleHeadline } from '@root/src/web/components/ArticleHeadline';
import { Standfirst } from '@root/src/web/components/Standfirst';
import { Footer } from '@root/src/web/components/Footer';
import { SubNav } from '@root/src/web/components/SubNav/SubNav';
import { ElementContainer } from '@root/src/web/components/ElementContainer';
import { Nav } from '@root/src/web/components/Nav/Nav';
import { MobileStickyContainer, AdSlot } from '@root/src/web/components/AdSlot';
import { Border } from '@root/src/web/components/Border';
import { GridItem } from '@root/src/web/components/GridItem';
import { Caption } from '@root/src/web/components/Caption';
import { HeadlineByline } from '@root/src/web/components/HeadlineByline';
import { ContainerLayout } from '@root/src/web/components/ContainerLayout';
import { Discussion } from '@frontend/web/components/Discussion';
import { Hide } from '@root/src/web/components/Hide';
import { LabsHeader } from '@frontend/web/components/LabsHeader';
import { GuardianLabsLines } from '@frontend/web/components/GuardianLabsLines';

import { buildAdTargeting } from '@root/src/lib/ad-targeting';
import { getZIndex } from '@frontend/web/lib/getZIndex';
import { parse } from '@frontend/lib/slot-machine-flags';

import { Stuck, BannerWrapper } from '@root/src/web/layouts/lib/stickiness';
import {
	decideLineCount,
	decideLineEffect,
	getCurrentPillar,
} from '@root/src/web/lib/layoutHelpers';
import { Lines } from '@guardian/src-ed-lines';

const ImmersiveGrid = ({ children }: { children: React.ReactNode }) => (
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

				/*
					Explanation of each unit of grid-template-columns

					Left Column (220 - 1px border)
					Vertical grey border
					Main content
					Right Column
				*/
				${from.wide} {
					grid-column-gap: 10px;
					grid-template-columns: 219px 1px 1fr 300px;
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

				/*
					Explanation of each unit of grid-template-columns

					Left Column (220 - 1px border)
					Vertical grey border
					Main content
					Right Column
				*/
				${until.wide} {
					grid-column-gap: 10px;
					grid-template-columns: 140px 1px 1fr 300px;
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

				/*
					Explanation of each unit of grid-template-columns

					Main content
					Right Column
				*/
				${until.leftCol} {
					grid-template-columns: 1fr 300px;
					grid-column-gap: 20px;
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
	format: Format;
	palette: Palette;
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

const Box = ({
	palette,
	children,
}: {
	palette: Palette;
	children: React.ReactNode;
}) => (
	<div
		css={css`
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
					background-color: ${palette.background.headline};
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

export const ImmersiveLayout = ({
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

	const mainMedia = CAPI.mainMediaElements[0] as ImageBlockElement;
	const captionText = decideCaption(mainMedia);
	const { branding } = CAPI.commercialProperties[CAPI.editionId];

	const HEADLINE_OFFSET = mainMedia ? 120 : 0;

	const LeftColCaption = () => (
		<div
			css={css`
				margin-top: ${HEADLINE_OFFSET}px;
				position: absolute;
				margin-left: 20px;
			`}
		>
			<Caption
				palette={palette}
				captionText={captionText}
				format={format}
				shouldLimitWidth={true}
				isLeftCol={true}
			/>
		</div>
	);

	return (
		<>
			<div
				css={css`
					background-color: ${palette.background.article};
				`}
			>
				<div
					css={[
						mainMedia && hasMainMediaStyles,
						css`
							display: flex;
							flex-direction: column;
						`,
					]}
				>
					<header
						css={css`
							${getZIndex('headerWrapper')}
							order: 0;
						`}
					>
						<ElementContainer
							showSideBorders={false}
							showTopBorder={false}
							padded={false}
							backgroundColour={brandBackground.primary}
						>
							<Nav
								format={{
									...format,
									theme: getCurrentPillar(CAPI),
								}}
								nav={NAV}
								subscribeUrl={
									CAPI.nav.readerRevenueLinks.header.subscribe
								}
								edition={CAPI.editionId}
							/>
						</ElementContainer>
					</header>

					{format.theme === Special.Labs && (
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

					<MainMedia
						format={format}
						palette={palette}
						elements={CAPI.mainMediaElements}
						adTargeting={adTargeting}
						starRating={
							format.design === Design.Review && CAPI.starRating
								? CAPI.starRating
								: undefined
						}
						host={host}
						hideCaption={true}
						pageId={CAPI.pageId}
						webTitle={CAPI.webTitle}
					/>
				</div>
				{mainMedia && (
					<>
						<div
							css={css`
								margin-top: -${HEADLINE_OFFSET}px;
								/*
                        This z-index is what ensures the headline title text shows above main media. For
                        the actual headline we set the z-index deeper in ArticleHeadline itself so that
                        the text appears above the pseudo Box element
                    */
								position: relative;
								${getZIndex('articleHeadline')};
							`}
						>
							<ContainerLayout
								verticalMargins={false}
								padContent={false}
								padSides={false}
								leftContent={<LeftColCaption />}
							>
								<ArticleTitle
									format={format}
									palette={palette}
									tags={CAPI.tags}
									sectionLabel={CAPI.sectionLabel}
									sectionUrl={CAPI.sectionUrl}
									guardianBaseURL={CAPI.guardianBaseURL}
									badge={CAPI.badge}
								/>
							</ContainerLayout>
							<Box palette={palette}>
								<ContainerLayout
									verticalMargins={false}
									padContent={false}
									padSides={false}
								>
									<ArticleHeadline
										format={format}
										headlineString={CAPI.headline}
										palette={palette}
										tags={CAPI.tags}
										byline={CAPI.author.byline}
									/>
								</ContainerLayout>
							</Box>
						</div>
					</>
				)}
			</div>
			<ElementContainer
				showTopBorder={false}
				showSideBorders={false}
				backgroundColour={palette.background.article}
				element="article"
			>
				<ImmersiveGrid>
					{/* Above leftCol, the Caption is controled by ContainerLayout ^^ */}
					<GridItem area="caption">
						<Hide when="above" breakpoint="leftCol">
							<Caption
								palette={palette}
								captionText={captionText}
								format={format}
								shouldLimitWidth={false}
							/>
						</Hide>
					</GridItem>
					<GridItem area="border">
						{format.design === Design.PhotoEssay ? (
							<></>
						) : (
							<Border palette={palette} />
						)}
					</GridItem>
					<GridItem area="title">
						<>
							{!mainMedia && (
								<div
									css={css`
										margin-top: -8px;
										margin-left: -4px;
										margin-bottom: 12px;

										${until.tablet} {
											margin-left: -20px;
										}
									`}
								>
									<ArticleTitle
										format={format}
										palette={palette}
										tags={CAPI.tags}
										sectionLabel={CAPI.sectionLabel}
										sectionUrl={CAPI.sectionUrl}
										guardianBaseURL={CAPI.guardianBaseURL}
										badge={CAPI.badge}
									/>
								</div>
							)}
						</>
					</GridItem>
					<GridItem area="headline">
						<>
							{!mainMedia && (
								<div css={maxWidth}>
									<ArticleHeadline
										format={format}
										headlineString={CAPI.headline}
										palette={palette}
										tags={CAPI.tags}
										byline={CAPI.author.byline}
									/>
								</div>
							)}
						</>
					</GridItem>
					<GridItem area="standfirst">
						<Standfirst
							format={format}
							standfirst={CAPI.standfirst}
						/>
					</GridItem>
					<GridItem area="byline">
						<HeadlineByline
							format={format}
							tags={CAPI.tags}
							byline={
								CAPI.author.byline ? CAPI.author.byline : ''
							}
						/>
					</GridItem>
					<GridItem area="lines">
						{format.design === Design.PhotoEssay &&
						format.theme !== Special.Labs ? (
							<></>
						) : (
							<div css={maxWidth}>
								<div css={stretchLines}>
									{format.theme === Special.Labs ? (
										<GuardianLabsLines />
									) : (
										<Lines
											effect={decideLineEffect(
												Design.Article,
												format.theme,
											)}
											count={decideLineCount(
												Design.Article,
											)}
										/>
									)}
								</div>
							</div>
						)}
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
								<>
									{mainMedia && (
										<div
											css={css`
												margin-top: ${space[4]}px;
											`}
										>
											<AdSlot
												position="right"
												display={format.display}
											/>
										</div>
									)}
								</>
							</RightColumn>
						</div>
					</GridItem>
				</ImmersiveGrid>
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
			<aside id="onwards-upper-whensignedout" />
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
