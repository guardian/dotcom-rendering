import { css, Global } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign, ArticleSpecial } from '@guardian/libs';
import {
	brandBackground,
	brandBorder,
	from,
	neutral,
	until,
} from '@guardian/source-foundations';
import React from 'react';
import {
	adCollapseStyles,
	labelStyles as adLabelStyles,
	AdSlot,
	MobileStickyContainer,
} from '../components/AdSlot';
import { ArticleHeadline } from '../components/ArticleHeadline';
import { ArticleMeta } from '../components/ArticleMeta';
import { ArticleTitle } from '../components/ArticleTitle';
import { Border } from '../components/Border';
import { Caption } from '../components/Caption';
import { ContainerLayout } from '../components/ContainerLayout';
import { DecideLines } from '../components/DecideLines';
import { Footer } from '../components/Footer';
import { GridItem } from '../components/GridItem';
import { GuardianLabsLines } from '../components/GuardianLabsLines';
import { HeadlineByline } from '../components/HeadlineByline';
import { Hide } from '../components/Hide';
import { Island } from '../components/Island';
import { Standfirst } from '../components/Standfirst';
import { StickyBottomBanner } from '../components/StickyBottomBanner.importable';
import { SubNav } from '../components/SubNav.importable';
import { renderElement } from '../lib/renderElement';
import { ImmersiveHeader } from './headers/ImmersiveHeader';
import { interactiveGlobalStyles } from './lib/interactiveLegacyStyling';
import { BannerWrapper } from './lib/stickiness';

const InteractiveImmersiveGrid = ({
	children,
}: {
	children: React.ReactNode;
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
						'.          border      lines        right-column'
						'.          border      meta        right-column'
						'.	        border      body        right-column'
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
						'.          border      lines       right-column'
						'.          border      meta        right-column'
						'.	        border      body        right-column'
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

const Renderer: React.FC<{
	format: ArticleFormat;
	elements: CAPIElement[];
	host?: string;
	pageId: string;
	webTitle: string;
	ajaxUrl: string;
	isAdFreeUser: boolean;
	isSensitive: boolean;
	switches: { [key: string]: boolean };
}> = ({
	format,
	elements,
	host,
	pageId,
	webTitle,
	ajaxUrl,
	isAdFreeUser,
	isSensitive,
	switches,
}) => {
	// const cleanedElements = elements.map(element =>
	//     'html' in element ? { ...element, html: clean(element.html) } : element,
	// );
	// ^^ Until we decide where to do the "isomorphism split" in this this code is not safe here.
	//    But should be soon.
	const output = elements.map((element, index) => {
		const [ok, el] = renderElement({
			format,
			element,
			adTargeting: undefined,
			host,
			index,
			isMainMedia: false,
			pageId,
			webTitle,
			ajaxUrl,
			isAdFreeUser,
			isSensitive,
			switches,
		});

		if (ok) {
			switch (element._type) {
				// Here we think it makes sense not to wrap every `p` inside a `figure`
				case 'model.dotcomrendering.pageElements.InteractiveBlockElement':
				case 'model.dotcomrendering.pageElements.TextBlockElement':
					return el;

				default:
					return (
						<figure
							id={
								'elementId' in element
									? element.elementId
									: undefined
							}
							key={index}
						>
							{el}
						</figure>
					);
			}
		}

		return null;
	});

	const adStyles = css`
		${adLabelStyles}
		${adCollapseStyles}

		${from.tablet} {
			.mobile-only .ad-slot {
				display: none;
			}
		}
		${until.tablet} {
			.hide-until-tablet .ad-slot {
				display: none;
			}
		}
	`;

	return <div css={adStyles}>{output}</div>;
};

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

interface Props {
	CAPIArticle: CAPIArticleType;
	NAV: NavType;
	format: ArticleFormat;
	palette: Palette;
}

export const InteractiveImmersiveLayout = ({
	CAPIArticle,
	NAV,
	format,
	palette,
}: Props) => {
	const {
		config: { host },
	} = CAPIArticle;

	const mainMedia = CAPIArticle.mainMediaElements[0] as ImageBlockElement;
	const captionText = decideCaption(mainMedia);
	const { branding } =
		CAPIArticle.commercialProperties[CAPIArticle.editionId];

	return (
		<>
			{CAPIArticle.isLegacyInteractive && (
				<Global styles={interactiveGlobalStyles} />
			)}
			{CAPIArticle.config.switches.surveys && (
				<AdSlot position="survey" display={format.display} />
			)}

			<ImmersiveHeader
				CAPIArticle={CAPIArticle}
				NAV={NAV}
				format={format}
			/>
			<main data-layout="InteractiveImmersiveLayout">
				<ContainerLayout
					fullWidth={true}
					showTopBorder={false}
					showSideBorders={false}
					backgroundColour={palette.background.article}
					element="article"
				>
					<InteractiveImmersiveGrid>
						{/* Above leftCol, the Caption is controled by ContainerLayout ^^ */}
						<GridItem area="caption">
							<Hide when="above" breakpoint="leftCol">
								<Caption
									captionText={captionText}
									format={format}
									shouldLimitWidth={false}
								/>
							</Hide>
						</GridItem>
						<GridItem area="border">
							{format.design === ArticleDesign.PhotoEssay ? (
								<></>
							) : (
								<Border format={format} />
							)}
						</GridItem>
						<GridItem area="title" element="aside">
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
											tags={CAPIArticle.tags}
											sectionLabel={
												CAPIArticle.sectionLabel
											}
											sectionUrl={CAPIArticle.sectionUrl}
											guardianBaseURL={
												CAPIArticle.guardianBaseURL
											}
											badge={CAPIArticle.badge}
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
											headlineString={
												CAPIArticle.headline
											}
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
								)}
							</>
						</GridItem>
						<GridItem area="standfirst">
							<Standfirst
								format={format}
								standfirst={CAPIArticle.standfirst}
							/>
						</GridItem>
						<GridItem area="byline">
							{!!CAPIArticle.byline && (
								<HeadlineByline
									format={format}
									tags={CAPIArticle.tags}
									byline={CAPIArticle.byline}
								/>
							)}
						</GridItem>
						<GridItem area="lines">
							{format.design === ArticleDesign.PhotoEssay &&
							format.theme !== ArticleSpecial.Labs ? (
								<></>
							) : (
								<div css={maxWidth}>
									<div css={stretchLines}>
										{format.theme ===
										ArticleSpecial.Labs ? (
											<GuardianLabsLines />
										) : (
											<DecideLines format={format} />
										)}
									</div>
								</div>
							)}
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
					</InteractiveImmersiveGrid>
				</ContainerLayout>
				<ContainerLayout
					fullWidth={true}
					showTopBorder={false}
					showSideBorders={false}
					shouldCenter={false}
					padSides={false}
					backgroundColour={palette.background.article}
					element="main"
				>
					<article>
						<Renderer
							format={format}
							elements={
								CAPIArticle.blocks[0]
									? CAPIArticle.blocks[0].elements
									: []
							}
							host={host}
							pageId={CAPIArticle.pageId}
							webTitle={CAPIArticle.webTitle}
							ajaxUrl={CAPIArticle.config.ajaxUrl}
							switches={CAPIArticle.config.switches}
							isAdFreeUser={CAPIArticle.isAdFreeUser}
							isSensitive={CAPIArticle.config.isSensitive}
						/>
					</article>
				</ContainerLayout>
			</main>

			{NAV.subNavSections && (
				<ContainerLayout
					fullWidth={true}
					padSides={false}
					backgroundColour={neutral[100]}
					element="aside"
				>
					<Island deferUntil="visible">
						<SubNav
							subNavSections={NAV.subNavSections}
							currentNavLink={NAV.currentNavLink}
							format={format}
						/>
					</Island>
				</ContainerLayout>
			)}

			<ContainerLayout
				fullWidth={true}
				padSides={false}
				backgroundColour={brandBackground.primary}
				borderColour={brandBorder.primary}
				showSideBorders={false}
				showTopBorder={false}
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
			</ContainerLayout>

			<BannerWrapper>
				<Island deferUntil="idle" clientOnly={true}>
					<StickyBottomBanner
						contentType={CAPIArticle.contentType}
						contributionsServiceUrl={
							CAPIArticle.contributionsServiceUrl
						}
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
			<MobileStickyContainer />
		</>
	);
};
