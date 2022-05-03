import { ArticleDesign } from '@guardian/libs';

import { Card } from './Card/Card';
import { UL } from './Card/components/UL';
import { LI } from './Card/components/LI';
import { decideFrontPalette } from '../lib/decideFrontPalette';

type Props = {
	trails: TrailType[];
	containerPalette?: DCRContainerPalette;
};

/**
 * A `Card` container for up to 8 trails.
 *
 * @see {@link https://www.figma.com/file/sx2vMFHbL7SsUo0LcpsKNe/%E2%AC%A3--Front-container?node-id=123%3A137122 Figma designs}
 */
export const DynamicSlow = ({ trails, containerPalette }: Props) => {
	const primary = trails[0];
	const secondary = trails[1];
	const bigCards = trails.slice(2, 4);
	const smallCards = trails.slice(4, 8);

	return (
		<>
			<UL direction="row" padBottom={true}>
				<LI padSides={true} percentage="75%">
					<Card
						frontPalette={
							containerPalette &&
							decideFrontPalette(containerPalette)
						}
						linkTo={primary.url}
						format={primary.format}
						headlineText={primary.headline}
						trailText={primary.trailText}
						headlineSize="large"
						byline={primary.byline}
						showByline={primary.showByline}
						showQuotes={
							primary.format.design === ArticleDesign.Comment ||
							primary.format.design === ArticleDesign.Letter
						}
						webPublicationDate={primary.webPublicationDate}
						kickerText={primary.kickerText}
						showPulsingDot={
							primary.format.design === ArticleDesign.LiveBlog
						}
						showSlash={true}
						showClock={false}
						imageUrl={primary.image}
						imagePosition="right"
						imagePositionOnMobile="top"
						imageSize="large"
						mediaType={primary.mediaType}
						mediaDuration={primary.mediaDuration}
						commentCount={primary.commentCount}
						starRating={primary.starRating}
						branding={primary.branding}
						supportingContent={primary.supportingContent}
					/>
				</LI>
				<LI
					padSides={true}
					showDivider={true}
					showTopMarginWhenStacked={true}
					percentage="25%"
				>
					<Card
						frontPalette={
							containerPalette &&
							decideFrontPalette(containerPalette)
						}
						linkTo={secondary.url}
						format={secondary.format}
						headlineText={secondary.headline}
						headlineSize="medium"
						byline={secondary.byline}
						showByline={secondary.showByline}
						showQuotes={
							secondary.format.design === ArticleDesign.Comment ||
							secondary.format.design === ArticleDesign.Letter
						}
						webPublicationDate={secondary.webPublicationDate}
						kickerText={secondary.kickerText}
						showPulsingDot={
							secondary.format.design === ArticleDesign.LiveBlog
						}
						showSlash={true}
						showClock={false}
						imageUrl={secondary.image}
						mediaType={secondary.mediaType}
						mediaDuration={secondary.mediaDuration}
						commentCount={secondary.commentCount}
						starRating={secondary.starRating}
						branding={secondary.branding}
						supportingContent={secondary.supportingContent}
					/>
				</LI>
			</UL>
			<UL direction="row-reverse" padBottom={true}>
				<LI percentage="50%" showTopMarginWhenStacked={true}>
					<UL direction="row" wrapCards={true} showDivider={true}>
						{bigCards.map((card, cardIndex) => {
							return (
								<LI
									percentage="50%"
									showDivider={cardIndex !== 0}
									padSides={true}
									padBottom={false}
									padBottomOnMobile={
										cardIndex < bigCards.length
									}
								>
									<Card
										frontPalette={
											containerPalette &&
											decideFrontPalette(containerPalette)
										}
										linkTo={card.url}
										format={card.format}
										trailText={card.trailText}
										headlineText={card.headline}
										headlineSize="medium"
										byline={card.byline}
										showByline={card.showByline}
										showQuotes={
											card.format.design ===
												ArticleDesign.Comment ||
											card.format.design ===
												ArticleDesign.Letter
										}
										webPublicationDate={
											card.webPublicationDate
										}
										kickerText={card.kickerText}
										showPulsingDot={
											card.format.design ===
											ArticleDesign.LiveBlog
										}
										showSlash={true}
										showClock={false}
										imageUrl={card.image}
										mediaType={card.mediaType}
										mediaDuration={card.mediaDuration}
										commentCount={card.commentCount}
										starRating={card.starRating}
										branding={card.branding}
										supportingContent={
											card.supportingContent
										}
										imagePositionOnMobile="none"
									/>
								</LI>
							);
						})}
					</UL>
				</LI>
				<LI percentage="50%" showTopMarginWhenStacked={false}>
					<UL direction="column" wrapCards={true}>
						{smallCards.map((card, cardIndex) => {
							return (
								<LI
									padSides={true}
									showTopMarginWhenStacked={false}
									padBottom={
										// No bottom margin on the last card
										cardIndex < smallCards.length - 1
									}
									padBottomOnMobile={false}
								>
									<Card
										frontPalette={
											containerPalette &&
											decideFrontPalette(containerPalette)
										}
										linkTo={card.url}
										format={card.format}
										headlineText={card.headline}
										imageUrl={card.image}
										imagePosition="left"
										imageSize="small"
										headlineSize="small"
										byline={card.byline}
										showByline={card.showByline}
										showQuotes={
											card.format.design ===
												ArticleDesign.Comment ||
											card.format.design ===
												ArticleDesign.Letter
										}
										webPublicationDate={
											card.webPublicationDate
										}
										kickerText={card.kickerText}
										showPulsingDot={
											card.format.design ===
											ArticleDesign.LiveBlog
										}
										showSlash={true}
										showClock={false}
										mediaType={card.mediaType}
										mediaDuration={card.mediaDuration}
										commentCount={card.commentCount}
										starRating={card.starRating}
										branding={card.branding}
									/>
								</LI>
							);
						})}
					</UL>
				</LI>
			</UL>
		</>
	);
};
