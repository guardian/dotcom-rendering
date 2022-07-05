import { ArticleDesign } from '@guardian/libs';
import { Card } from './Card/Card';
import { LI } from './Card/components/LI';
import { UL } from './Card/components/UL';

type Props = {
	trails: TrailType[];
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
};

export const DynamicPackage = ({
	trails,
	containerPalette,
	showAge,
}: Props) => {
	const primary = trails[0];
	const remaining = trails.slice(1, 4);

	return (
		<>
			<UL direction="row">
				<LI padSides={true} percentage="75%">
					<Card
						containerPalette={containerPalette}
						containerType="dynamic/package"
						showAge={showAge}
						linkTo={primary.url}
						format={primary.format}
						headlineText={primary.headline}
						headlineSize="huge"
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
						imagePosition="bottom"
						imagePositionOnMobile="bottom"
						imageSize="large"
						mediaType={primary.mediaType}
						mediaDuration={primary.mediaDuration}
						starRating={primary.starRating}
						branding={primary.branding}
						supportingContent={primary.supportingContent}
						dataLinkName={primary.dataLinkName}
						snapData={primary.snapData}
						discussionId={primary.discussionId}
						transparent={true}
					/>
				</LI>
				<LI
					showDivider={true}
					showTopMarginWhenStacked={true}
					percentage="25%"
				>
					<UL direction="column">
						{remaining.map((card, cardIndex) => {
							return (
								<LI
									key={card.url}
									padSides={true}
									showTopMarginWhenStacked={false}
									padBottom={
										// No bottom margin on the last card
										cardIndex < remaining.length - 1
									}
									padBottomOnMobile={false}
								>
									<Card
										containerPalette={containerPalette}
										containerType="dynamic/package"
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
										imageUrl={
											// Always show the image on the first card and only
											// on the second if there are two items in two
											cardIndex === 0 ||
											remaining.length === 2
												? card.image
												: undefined
										}
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
