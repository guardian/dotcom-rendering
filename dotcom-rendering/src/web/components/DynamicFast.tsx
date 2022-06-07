import { ArticleDesign } from '@guardian/libs';
import { Card } from './Card/Card';
import { LI } from './Card/components/LI';
import { UL } from './Card/components/UL';

type Props = {
	trails: TrailType[];
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
};

export const DynamicFast = ({ trails, containerPalette, showAge }: Props) => {
	const primary = trails[0];
	const secondary = trails[1];
	const bigCards = trails.slice(2, 4);
	const smallCards = trails.slice(4, 10);

	return (
		<>
			<UL direction="row" padBottom={true}>
				<LI padSides={true} percentage="75%">
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
						supportingContent={primary.supportingContent}
						dataLinkName={primary.dataLinkName}
						snapData={primary.snapData}
						discussionId={primary.discussionId}
					/>
				</LI>
				<LI
					padSides={true}
					showDivider={true}
					showTopMarginWhenStacked={true}
					percentage="25%"
				>
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
						supportingContent={secondary.supportingContent}
						dataLinkName={secondary.dataLinkName}
						snapData={secondary.snapData}
						discussionId={secondary.discussionId}
					/>
				</LI>
			</UL>
			<UL direction="row" padBottom={true}>
				{bigCards.map((card, cardIndex) => {
					return (
						<LI
							percentage="25%"
							padSides={true}
							padBottom={false}
							showTopMarginWhenStacked={cardIndex > 0}
							showDivider={cardIndex > 0}
						>
							<Card
								containerPalette={containerPalette}
								showAge={showAge}
								linkTo={card.url}
								format={card.format}
								headlineText={card.headline}
								headlineSize="medium"
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
								imageUrl={card.image}
								mediaType={card.mediaType}
								mediaDuration={card.mediaDuration}
								starRating={card.starRating}
								branding={card.branding}
								supportingContent={card.supportingContent}
								dataLinkName={card.dataLinkName}
								snapData={card.snapData}
								discussionId={card.discussionId}
							/>
						</LI>
					);
				})}
				<LI percentage="50%" showTopMarginWhenStacked={true}>
					<UL direction="row" wrapCards={true}>
						{smallCards.map((card, cardIndex) => {
							return (
								<LI
									percentage="50%"
									showDivider={true}
									padSides={true}
									padBottom={
										// No bottom margin on the last two cards
										cardIndex < smallCards.length - 2
									}
									padBottomOnMobile={
										cardIndex < smallCards.length - 1
									}
								>
									<Card
										containerPalette={containerPalette}
										showAge={showAge}
										linkTo={card.url}
										format={card.format}
										headlineText={card.headline}
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
										starRating={card.starRating}
										branding={card.branding}
										supportingContent={
											card.supportingContent
										}
										dataLinkName={card.dataLinkName}
										snapData={card.snapData}
										discussionId={card.discussionId}
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
