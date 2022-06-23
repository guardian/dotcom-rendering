import { ArticleDesign } from '@guardian/libs';
import { Card } from './Card/Card';
import { LI } from './Card/components/LI';
import { UL } from './Card/components/UL';

type Props = {
	trails: TrailType[];
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
};

export const FixedLargeSlowXIV = ({
	trails,
	containerPalette,
	showAge,
}: Props) => {
	const primary = trails[0];
	const secondary = trails[1];
	const secondSlice = trails.slice(2, 6);
	const thirdSlice = trails.slice(6, 14);

	return (
		<>
			<UL direction="row" padBottom={true}>
				<LI padSides={true} percentage="75%" padBottomOnMobile={true}>
					<Card
						containerPalette={containerPalette}
						showAge={showAge}
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
						starRating={primary.starRating}
						branding={primary.branding}
						snapData={primary.snapData}
						discussionId={primary.discussionId}
					/>
				</LI>
				<LI padSides={true} showDivider={true} percentage="25%">
					<Card
						containerPalette={containerPalette}
						showAge={showAge}
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
						starRating={secondary.starRating}
						branding={secondary.branding}
						snapData={secondary.snapData}
						discussionId={secondary.discussionId}
					/>
				</LI>
			</UL>
			<UL direction="row" padBottom={true}>
				{secondSlice.map((card, cardIndex) => {
					return (
						<LI
							padSides={true}
							percentage="25%"
							showDivider={cardIndex !== 0}
							key={card.url}
							padBottomOnMobile={cardIndex != 3}
						>
							<Card
								containerPalette={containerPalette}
								showAge={showAge}
								linkTo={card.url}
								format={card.format}
								headlineText={card.headline}
								headlineSize="small"
								imageUrl={card.image}
								imagePosition="top"
								byline={card.byline}
								showByline={card.showByline}
								showQuotes={
									card.format.design ===
										ArticleDesign.Comment ||
									card.format.design === ArticleDesign.Letter
								}
								webPublicationDate={card.webPublicationDate}
								kickerText={card.kickerText}
								showPulsingDot={
									card.format.design ===
									ArticleDesign.LiveBlog
								}
								showSlash={true}
								showClock={false}
								mediaType={card.mediaType}
								mediaDuration={card.mediaDuration}
								starRating={card.starRating}
								branding={card.branding}
								discussionId={card.discussionId}
								dataLinkName={card.dataLinkName}
								snapData={card.snapData}
							/>
						</LI>
					);
				})}
			</UL>
			<UL direction="row" padBottom={true} wrapCards={true}>
				{thirdSlice.map((card, cardIndex) => {
					return (
						<LI
							padSides={true}
							percentage="25%"
							showDivider={cardIndex !== 4 && cardIndex !== 8}
							padBottom={cardIndex < 4}
							padBottomOnMobile={cardIndex !== thirdSlice.length - 1}
							key={card.url}
						>
							<Card
								containerPalette={containerPalette}
								showAge={showAge}
								linkTo={card.url}
								format={card.format}
								headlineText={card.headline}
								headlineSize="small"
								imageUrl={undefined}
								imagePosition="top"
								byline={card.byline}
								showByline={card.showByline}
								showQuotes={
									card.format.design ===
										ArticleDesign.Comment ||
									card.format.design === ArticleDesign.Letter
								}
								webPublicationDate={card.webPublicationDate}
								kickerText={card.kickerText}
								showPulsingDot={
									card.format.design ===
									ArticleDesign.LiveBlog
								}
								showSlash={true}
								showClock={false}
								mediaType={card.mediaType}
								mediaDuration={card.mediaDuration}
								starRating={card.starRating}
								branding={card.branding}
								discussionId={card.discussionId}
								dataLinkName={card.dataLinkName}
								snapData={card.snapData}
							/>
						</LI>
					);
				})}
			</UL>
		</>
	);
};
