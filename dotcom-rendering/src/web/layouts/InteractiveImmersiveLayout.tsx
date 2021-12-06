import React from 'react';
import { css, Global } from '@emotion/react';

import {
	neutral,
	brandBackground,
	brandBorder,
	from,
	until,
} from '@guardian/source-foundations';
import { ArticleFormat, ArticleSpecial, ArticleDesign } from '@guardian/libs';

import { Footer } from '@root/src/web/components/Footer';
import { SubNav } from '@root/src/web/components/SubNav/SubNav';
import { ElementContainer } from '@root/src/web/components/ElementContainer';
import {
	MobileStickyContainer,
	AdSlot,
	labelStyles as adLabelStyles,
	adCollapseStyles,
} from '@root/src/web/components/AdSlot';
import { BannerWrapper } from '@root/src/web/layouts/lib/stickiness';
import { Lines } from '@guardian/source-react-components-development-kitchen';
import { interactiveGlobalStyles } from './lib/interactiveLegacyStyling';
import { ImmersiveHeader } from './headers/ImmersiveHeader';
import { renderElement } from '../lib/renderElement';
import { GridItem } from '../components/GridItem';
import { Hide } from '../components/Hide';
import { Border } from '../components/Border';
import { ArticleTitle } from '../components/ArticleTitle';
import { ArticleHeadline } from '../components/ArticleHeadline';
import { ArticleMeta } from '../components/ArticleMeta';
import { GuardianLabsLines } from '../components/GuardianLabsLines';
import { HeadlineByline } from '../components/HeadlineByline';
import { decideLineEffect, decideLineCount } from '../lib/layoutHelpers';
import { Standfirst } from '../components/Standfirst';
import { Caption } from '../components/Caption';

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
	palette: Palette;
	elements: CAPIElement[];
	host?: string;
	pageId: string;
	webTitle: string;
}> = ({ format, palette, elements, host, pageId, webTitle }) => {
	// const cleanedElements = elements.map(element =>
	//     'html' in element ? { ...element, html: clean(element.html) } : element,
	// );
	// ^^ Until we decide where to do the "isomorphism split" in this this code is not safe here.
	//    But should be soon.
	const output = elements.map((element, index) => {
		const [ok, el] = renderElement({
			format,
			palette,
			element,
			adTargeting: undefined,
			host,
			index,
			isMainMedia: false,
			pageId,
			webTitle,
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
	CAPI: CAPIType;
	NAV: NavType;
	format: ArticleFormat;
	palette: Palette;
}

export const InteractiveImmersiveLayout = ({
	CAPI,
	NAV,
	format,
	palette,
}: Props) => {
	const {
		config: { host },
	} = CAPI;

	const mainMedia = CAPI.mainMediaElements[0] as ImageBlockElement;
	const captionText = decideCaption(mainMedia);
	const { branding } = CAPI.commercialProperties[CAPI.editionId];

	return (
		<>
			{CAPI.isLegacyInteractive && (
				<Global styles={interactiveGlobalStyles} />
			)}
			{CAPI.config.switches.surveys && (
				<AdSlot position="survey" display={format.display} />
			)}

			<ImmersiveHeader
				CAPI={CAPI}
				NAV={NAV}
				format={format}
				palette={palette}
			/>
			<main>
				<ElementContainer
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
									palette={palette}
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
								<Border palette={palette} />
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
											palette={palette}
											tags={CAPI.tags}
											sectionLabel={CAPI.sectionLabel}
											sectionUrl={CAPI.sectionUrl}
											guardianBaseURL={
												CAPI.guardianBaseURL
											}
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
											<Lines
												effect={decideLineEffect(
													ArticleDesign.Standard,
													format.theme,
												)}
												count={decideLineCount(
													ArticleDesign.Standard,
												)}
											/>
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
					</InteractiveImmersiveGrid>
				</ElementContainer>
				<ElementContainer
					showTopBorder={false}
					showSideBorders={false}
					shouldCenter={false}
					padded={false}
					backgroundColour={palette.background.article}
					element="main"
				>
					<article>
						<Renderer
							format={format}
							palette={palette}
							elements={
								CAPI.blocks[0] ? CAPI.blocks[0].elements : []
							}
							host={host}
							pageId={CAPI.pageId}
							webTitle={CAPI.webTitle}
						/>
					</article>
				</ElementContainer>
			</main>

			{NAV.subNavSections && (
				<ElementContainer
					padded={false}
					sectionId="sub-nav-root"
					backgroundColour={neutral[100]}
					element="nav"
				>
					<SubNav
						subNavSections={NAV.subNavSections}
						currentNavLink={NAV.currentNavLink}
						format={format}
					/>
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
