import { LI } from './Card/components/LI';
import { UL } from './Card/components/UL';
import { FrontCard } from './FrontCard';

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
	const [primary, ...remaining] = trails;

	if (primary.isBoosted) {
		return (
			<>
				<UL direction="row">
					<LI padSides={true}>
						<Card
							containerPalette={containerPalette}
							containerType="dynamic/package"
							showAge={showAge}
							linkTo={primary.url}
							format={primary.format}
							headlineText={primary.headline}
							headlineSize="ginormous"
							byline={primary.byline}
							showByline={primary.showByline}
							showQuotes={
								primary.format.design ===
									ArticleDesign.Comment ||
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
							isDynamo={true}
						/>
					</LI>
				</UL>
				<UL direction="row">
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
				</UL>
			</>
		);
	}
	return (
		<>
			<UL direction="row">
				<LI padSides={true} percentage="75%">
					<FrontCard
						trail={primary}
						containerPalette={containerPalette}
						showAge={showAge}
						containerType="dynamic/package"
						headlineSize="huge"
						imagePosition="bottom"
						imagePositionOnMobile="bottom"
						imageSize="large"
						supportingContent={primary.supportingContent}
						isDynamo={true}
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
									<FrontCard
										trail={card}
										containerPalette={containerPalette}
										showAge={showAge}
										containerType="dynamic/package"
										imageUrl={
											// Always show the image on the first card and only
											// on the second if there are two items in two
											cardIndex === 0 ||
											remaining.length === 2
												? card.image
												: undefined
										}
										supportingContent={
											card.supportingContent
										}
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
