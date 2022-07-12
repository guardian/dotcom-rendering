import { ArticleDesign } from '@guardian/libs';
import { Card } from './Card/Card';
import { LI } from './Card/components/LI';
import { UL } from './Card/components/UL';

type Props = {
	trails: TrailType[];
	groupedTrails: DCRGroupedCards;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
};

export const DynamicFast = ({
	groupedTrails,
	containerPalette,
	showAge,
}: Props) => {
	// 'Default' Container layout is
	// veryBig1     -   	veryBig2
	// big - big - standard - standard
	//  ^  -  ^  - standard - standard

	// 'primaries' should hold up to 2 cards, selecting that which are given
	// the 'largest' group.
	let primaries: DCRFrontCard[] = [];
	if (groupedTrails.huge.length > 0) {
		// Where a huge is set, we only take 1 primary, leaving any
		// 'veryBigs' to be displayed as 'bigs'
		primaries = groupedTrails.huge.splice(0, 1);
	} else if (groupedTrails.veryBig.length === 1) {
		// This would display the same as 1 'huge'.
		primaries = groupedTrails.veryBig.splice(0, 1);
	} else if (groupedTrails.veryBig.length > 1) {
		// We take a maximum of 2, remaining very bigs will be treated as 'big'
		primaries = groupedTrails.veryBig.splice(0, 2);
	}

	// Put together all the bigs - only those not chosen as 'primaries' will be left over
	const bigs = groupedTrails.huge.concat(
		groupedTrails.veryBig,
		groupedTrails.big,
	);

	let maxStandards = 12;
	let standardWidth: CardPercentageType = '25%';
	if (bigs.length === 1) {
		maxStandards = 9;
		standardWidth = '34%';
	}
	if (bigs.length === 2) {
		maxStandards = 6;
		standardWidth = '50%';
	}
	if (bigs.length === 3) {
		maxStandards = 3;
		standardWidth = '100%';
	}
	if (bigs.length === 4) {
		maxStandards = 0;
	}

	const standards =
		maxStandards > 1 ? groupedTrails.standard.splice(0, maxStandards) : [];

	return (
		<>
			{!!primaries.length && (
				<UL direction="row" padBottom={true}>
					{primaries.map((card, index) => (
						<LI
							key={card.url}
							padSides={true}
							percentage={primaries.length === 1 ? '100%' : '50%'}
							showDivider={index > 0}
							showTopMarginWhenStacked={index > 0}
						>
							<Card
								containerPalette={containerPalette}
								showAge={showAge}
								linkTo={card.url}
								format={card.format}
								headlineText={card.headline}
								trailText={card.trailText}
								headlineSize="large"
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
								// mediaType={card.mediaType}
								// mediaDuration={card.mediaDuration}
								// starRating={card.starRating}
								// branding={card.branding}
								// supportingContent={card.supportingContent}
								dataLinkName={card.dataLinkName}
								snapData={card.snapData}
								discussionId={card.discussionId}
							/>
						</LI>
					))}
				</UL>
			)}
			<UL direction="row" padBottom={true}>
				{/* Very bigs */}
				{bigs.map((card, cardIndex) => {
					return (
						<LI
							key={card.url}
							percentage={`25%`}
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
								// mediaType={card.mediaType}
								// mediaDuration={card.mediaDuration}
								// starRating={card.starRating}
								// branding={card.branding}
								// supportingContent={card.supportingContent}
								dataLinkName={card.dataLinkName}
								snapData={card.snapData}
								discussionId={card.discussionId}
							/>
						</LI>
					);
				})}
				<LI
					percentage={`${100 - bigs.length * 25}%`}
					showTopMarginWhenStacked={true}
				>
					<UL direction="row" wrapCards={true}>
						{/* Standards */}
						{standards.map((card, cardIndex) => {
							return (
								<LI
									key={card.url}
									percentage={standardWidth}
									showDivider={true}
									padSides={true}
									padBottom={
										// No bottom margin on the last two cards
										cardIndex < standards.length - 2
									}
									padBottomOnMobile={
										cardIndex < standards.length - 1
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
										// mediaType={card.mediaType}
										// mediaDuration={card.mediaDuration}
										// starRating={card.starRating}
										// branding={card.branding}
										// supportingContent={
										// 	card.supportingContent
										// }
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
