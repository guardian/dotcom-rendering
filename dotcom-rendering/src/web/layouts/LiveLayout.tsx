import { css } from '@emotion/react';

import {
	neutral,
	brandAltBackground,
	brandBackground,
	brandLine,
	brandBorder,
} from '@guardian/src-foundations/palette';
import { from, until } from '@guardian/src-foundations/mq';
import type { ArticleFormat } from '@guardian/libs';
import { Lines } from '@guardian/source-react-components-development-kitchen';

import { StarRating } from '@root/src/web/components/StarRating/StarRating';
import { ArticleBody } from '@root/src/web/components/ArticleBody';
import { RightColumn } from '@root/src/web/components/RightColumn';
import { ArticleTitle } from '@root/src/web/components/ArticleTitle';
import { ArticleContainer } from '@root/src/web/components/ArticleContainer';
import { ArticleMeta } from '@root/src/web/components/ArticleMeta';
import { SubMeta } from '@root/src/web/components/SubMeta';
import { MainMedia } from '@root/src/web/components/MainMedia';
import { ArticleHeadline } from '@root/src/web/components/ArticleHeadline';
import { ArticleHeadlinePadding } from '@root/src/web/components/ArticleHeadlinePadding';
import { Standfirst } from '@root/src/web/components/Standfirst';
import { Header } from '@root/src/web/components/Header';
import { Footer } from '@root/src/web/components/Footer';
import { SubNav } from '@root/src/web/components/SubNav/SubNav';
import { ElementContainer } from '@root/src/web/components/ElementContainer';
import { Nav } from '@root/src/web/components/Nav/Nav';
import { HeaderAdSlot } from '@root/src/web/components/HeaderAdSlot';
import { MobileStickyContainer, AdSlot } from '@root/src/web/components/AdSlot';
import { GridItem } from '@root/src/web/components/GridItem';
import { AgeWarning } from '@root/src/web/components/AgeWarning';
import { Discussion } from '@frontend/web/components/Discussion';
import { Pagination } from '@frontend/web/components/Pagination';

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
import { space } from '@guardian/src-foundations';
import { ContainerLayout } from '../components/ContainerLayout';

const LiveGrid = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			/* IE Fallback */
			display: flex;
			flex-direction: column;
			${until.desktop} {
				margin-left: 0px;
			}
			${from.desktop} {
				margin-left: 320px;
			}

			@supports (display: grid) {
				display: grid;
				width: 100%;
				margin-left: 0;

				grid-column-gap: 10px;

				/*
					Explanation of each unit of grid-template-columns

					Main content
					Empty border for spacing
					Right Column
				*/
				${from.desktop} {
					grid-template-columns: 309px 1px 1fr;
					grid-template-areas:
						'lines border media'
						'meta  border media'
						'meta  border body'
						'.     border .';
				}

				${from.wide} {
					grid-template-columns: 309px 1px 1fr 340px;
					grid-template-areas:
						'lines border media right-column'
						'meta  border media right-column'
						'meta  border body  right-column'
						'.     border .     right-column';
				}

				${until.desktop} {
					grid-template-columns: 1fr; /* Main content */
					grid-template-areas:
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

export const LiveLayout = ({ CAPI, NAV, format, palette }: Props) => {
	const {
		config: { isPaidContent, host },
	} = CAPI;

	const adTargeting: AdTargeting = buildAdTargeting(CAPI);

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
			<div data-print-layout="hide">
				<Stuck>
					<ElementContainer
						showTopBorder={false}
						showSideBorders={false}
						padded={false}
						shouldCenter={false}
						element="aside"
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
							isAnniversary={
								CAPI.config.switches.anniversaryHeaderSvg &&
								CAPI.config.abTests.anniversaryAtomVariant ===
									'variant'
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
							borderColour={palette.border.article}
							element="aside"
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
						borderColour={palette.border.article}
					>
						<Lines count={4} effect="straight" />
					</ElementContainer>
				</SendToBack>
			</div>

			<main>
				<article>
					<ContainerLayout
						showTopBorder={false}
						backgroundColour={palette.background.header}
						borderColour={palette.border.headline}
						sideBorders={true}
						leftColSize="wide"
						leftContent={
							// eslint-disable-next-line react/jsx-wrap-multilines
							<ArticleTitle
								format={format}
								palette={palette}
								tags={CAPI.tags}
								sectionLabel={CAPI.sectionLabel}
								sectionUrl={CAPI.sectionUrl}
								guardianBaseURL={CAPI.guardianBaseURL}
								badge={CAPI.badge}
							/>
						}
					>
						<div css={maxWidth}>
							<ArticleHeadlinePadding design={format.design}>
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
					</ContainerLayout>
					<ContainerLayout
						showTopBorder={false}
						backgroundColour={palette.background.standfirst}
						borderColour={palette.border.standfirst}
						sideBorders={true}
						leftColSize="wide"
						verticalMargins={false}
					>
						<Standfirst
							format={format}
							standfirst={CAPI.standfirst}
						/>
					</ContainerLayout>

					<ElementContainer
						showTopBorder={false}
						borderColour={palette.border.article}
						backgroundColour={palette.background.article}
					>
						<div
							css={css`
								height: ${space[4]}px;
							`}
						/>
					</ElementContainer>

					<ElementContainer
						showTopBorder={false}
						backgroundColour={palette.background.article}
						borderColour={palette.border.article}
					>
						<LiveGrid>
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
							<GridItem area="border">
								<></>
							</GridItem>
							<GridItem area="lines">
								<div css={maxWidth}>
									<div css={stretchLines}>
										<Lines
											count={decideLineCount(
												format.design,
											)}
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
									/>
								</div>
							</GridItem>
							<GridItem area="body">
								<ArticleContainer>
									{CAPI.pagination &&
										CAPI.pagination.currentPage !== 1 && (
											<Pagination
												currentPage={
													CAPI.pagination
														?.currentPage || 1
												}
												totalPages={
													CAPI.pagination
														?.totalPages || 1
												}
												newest={CAPI.pagination?.newest}
												oldest={CAPI.pagination?.oldest}
												newer={CAPI.pagination?.newer}
												older={CAPI.pagination?.older}
											/>
										)}
									<ArticleBody
										format={format}
										palette={palette}
										blocks={CAPI.blocks}
										adTargeting={adTargeting}
										host={host}
										pageId={CAPI.pageId}
										webTitle={CAPI.webTitle}
									/>
									{CAPI.pagination &&
										CAPI.pagination.totalPages > 1 && (
											<Pagination
												currentPage={
													CAPI.pagination
														?.currentPage || 1
												}
												totalPages={
													CAPI.pagination
														?.totalPages || 1
												}
												newest={CAPI.pagination?.newest}
												oldest={CAPI.pagination?.oldest}
												newer={CAPI.pagination?.newer}
												older={CAPI.pagination?.older}
											/>
										)}
									{showBodyEndSlot && (
										<div id="slot-body-end" />
									)}
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
									</RightColumn>
								</div>
							</GridItem>
						</LiveGrid>
					</ElementContainer>
				</article>

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
				<aside
					data-print-layout="hide"
					id="onwards-upper-whensignedout"
				/>
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
						element="section"
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
				<aside
					data-print-layout="hide"
					id="onwards-upper-whensignedin"
				/>
				{showOnwardsLower && (
					<ElementContainer
						data-print-layout="hide"
						sectionId="onwards-lower-whensignedin"
						element="aside"
					/>
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
