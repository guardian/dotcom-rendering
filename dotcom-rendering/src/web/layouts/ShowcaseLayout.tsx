import { css } from '@emotion/react';

import {
	neutral,
	brandBackground,
	brandLine,
	brandBorder,
	labs,
	border,
	from,
	until,
} from '@guardian/source-foundations';
import { ArticleDesign, ArticleSpecial } from '@guardian/libs';
import type { ArticleFormat } from '@guardian/libs';

import { Lines } from '@guardian/source-react-components-development-kitchen';
import { ArticleBody } from '../components/ArticleBody';
import { RightColumn } from '../components/RightColumn';
import { ArticleTitle } from '../components/ArticleTitle';
import { ArticleContainer } from '../components/ArticleContainer';
import { ArticleMeta } from '../components/ArticleMeta';
import { SubMeta } from '../components/SubMeta';
import { MainMedia } from '../components/MainMedia';
import { ArticleHeadline } from '../components/ArticleHeadline';
import { Standfirst } from '../components/Standfirst';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SubNav } from '../components/SubNav.importable';
import { ElementContainer } from '../components/ElementContainer';
import { Nav } from '../components/Nav/Nav';
import { HeaderAdSlot } from '../components/HeaderAdSlot';
import { MobileStickyContainer, AdSlot } from '../components/AdSlot';
import { Border } from '../components/Border';
import { GridItem } from '../components/GridItem';
import { AgeWarning } from '../components/AgeWarning';
import { DiscussionContainer } from '../components/DiscussionContainer.importable';
import { LabsHeader } from '../components/LabsHeader';

import { buildAdTargeting } from '../../lib/ad-targeting';
import { parse } from '../../lib/slot-machine-flags';
import { getAgeWarning } from '../../lib/age-warning';
import {
	decideLineCount,
	decideLineEffect,
	getCurrentPillar,
} from '../lib/layoutHelpers';
import { Stuck, SendToBack, BannerWrapper } from './lib/stickiness';
import { Island } from '../components/Island';
import { MostViewedRightWrapper } from '../components/MostViewedRightWrapper.importable';
import { OnwardsLower } from '../components/OnwardsLower.importable';
import { OnwardsUpper } from '../components/OnwardsUpper.importable';

const ShowcaseGrid = ({ children }: { children: React.ReactNode }) => (
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
					grid-template-areas:
						'title  border  headline    headline'
						'lines  border  media       media'
						'meta   border  media       media'
						'meta   border  standfirst  right-column'
						'.      border  body        right-column'
						'.      border  .           right-column';
				}

				${until.wide} {
					grid-template-columns: 140px 1px 1fr 300px;
					grid-template-areas:
						'title  border  headline    headline'
						'lines  border  media       media'
						'meta   border  media       media'
						'meta   border  standfirst  right-column'
						'.      border  body        right-column'
						'.      border  .           right-column';
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
	design: ArticleDesign;
	children: React.ReactNode;
}) => {
	switch (design) {
		case ArticleDesign.Interview:
			return (
				<div
					css={css`
						${from.leftCol} {
							margin-bottom: -100px;
						}
					`}
				>
					<div css={maxWidth}>{children}</div>
				</div>
			);
		default:
			return <div css={maxWidth}>{children}</div>;
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
	format: ArticleFormat;
	palette: Palette;
}

export const ShowcaseLayout = ({
	CAPI,
	NAV,
	format,
	palette,
}: Props): JSX.Element => {
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

	const showComments = CAPI.isCommentable;

	const age = getAgeWarning(CAPI.tags, CAPI.webPublicationDateDeprecated);

	const { branding } = CAPI.commercialProperties[CAPI.editionId];

	return (
		<>
			{format.theme !== ArticleSpecial.Labs ? (
				<>
					<div>
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
						<SendToBack>
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
										CAPI.nav.readerRevenueLinks.header
											.supporter
									}
									discussionApiUrl={
										CAPI.config.discussionApiUrl
									}
									isAnniversary={
										CAPI.config.switches
											.anniversaryHeaderSvg
									}
								/>
							</ElementContainer>
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
									format={{
										...format,
										theme: getCurrentPillar(CAPI),
									}}
									subscribeUrl={
										CAPI.nav.readerRevenueLinks.header
											.subscribe
									}
									edition={CAPI.editionId}
								/>
							</ElementContainer>

							{NAV.subNavSections && (
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
				</>
			) : (
				// Else, this is a labs article so just show Nav and the Labs header
				<>
					<div>
						<Stuck zIndex="stickyAdWrapper">
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
						<Stuck zIndex="stickyAdWrapperNav">
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
									format={{
										...format,
										theme: getCurrentPillar(CAPI),
									}}
									subscribeUrl={
										CAPI.nav.readerRevenueLinks.header
											.subscribe
									}
									edition={CAPI.editionId}
								/>
							</ElementContainer>
						</Stuck>
					</div>
					<Stuck zIndex="stickyAdWrapperLabsHeader">
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
				</>
			)}

			<main>
				<ElementContainer
					showTopBorder={false}
					backgroundColour={palette.background.article}
					element="article"
				>
					<ShowcaseGrid>
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
							<Border palette={palette} />
						</GridItem>
						<GridItem area="headline">
							<PositionHeadline design={format.design}>
								<div
									css={css`
										padding-bottom: 24px;
									`}
								>
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
							</PositionHeadline>
						</GridItem>
						<GridItem area="media">
							<div css={mainMediaWrapper}>
								<MainMedia
									format={format}
									palette={palette}
									elements={CAPI.mainMediaElements}
									adTargeting={adTargeting}
									starRating={
										format.design ===
											ArticleDesign.Review &&
										CAPI.starRating
											? CAPI.starRating
											: undefined
									}
									host={host}
									pageId={CAPI.pageId}
									webTitle={CAPI.webTitle}
									ajaxUrl={CAPI.config.ajaxUrl}
								/>
							</div>
						</GridItem>
						<GridItem area="standfirst">
							<Standfirst
								format={format}
								standfirst={CAPI.standfirst}
							/>
						</GridItem>
						<GridItem area="lines">
							<div css={maxWidth}>
								<div css={stretchLines}>
									<Lines
										count={decideLineCount(format.design)}
										effect={decideLineEffect(
											format.design,
											format.theme,
										)}
									/>
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
					</ShowcaseGrid>
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
					<ElementContainer sectionId="comments" element="section">
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
			</main>

			{NAV.subNavSections && (
				<ElementContainer padded={false} element="aside">
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

			<BannerWrapper />
			<MobileStickyContainer />
		</>
	);
};
