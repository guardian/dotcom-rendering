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

	const primaryBoostedIndex = primaries.findIndex((card) => !!card.isBoosted);

	// Put together all the bigs - only those not chosen as 'primaries' will be left over
	const bigs = groupedTrails.huge.concat(
		groupedTrails.veryBig,
		groupedTrails.big,
	);

	const firstBigBoosted = !!bigs[0]?.isBoosted;

	let maxStandards = 12;
	let columns = 3;
	let standardsColumnWidth: CardPercentageType = '25%';

	if (firstBigBoosted) {
		standardsColumnWidth = '50%';
		columns = 2;
	} else if (bigs.length === 1) {
		maxStandards = 9;
		standardsColumnWidth = '33.333%';
		columns = 3;
	} else if (bigs.length === 2) {
		maxStandards = 6;
		standardsColumnWidth = '50%';
		columns = 2;
	} else if (bigs.length === 3) {
		maxStandards = 3;
		standardsColumnWidth = '100%';
		columns = 1;
	} else if (bigs.length === 4) {
		maxStandards = 0;
		columns = 0;
	}

	let standards: DCRFrontCard[] = [];
	if (firstBigBoosted && bigs.length > 1) {
		// When the first big is boosted, we always allow max 8 standards
		standards = [
			// Take all but the first 2 bigs
			...bigs.splice(2, bigs.length - 1),
			...groupedTrails.standard,
		].slice(0, 8);
	} else if (maxStandards > 0) {
		standards = groupedTrails.standard.splice(0, maxStandards);
	}

	return (
		<>
			{!!primaries.length && (
				<UL direction="row" padBottom={true}>
					{primaries.map((card, index) => {
						// Boosted Layout
						if (
							primaries.length > 1 &&
							primaryBoostedIndex !== -1
						) {
							return (
								<LI
									key={card.url}
									padSides={true}
									percentage={
										index === primaryBoostedIndex
											? '75%'
											: '25%'
									}
									showDivider={index > 0}
									showTopMarginWhenStacked={index > 0}
								>
									<Card
										containerPalette={containerPalette}
										showAge={showAge}
										linkTo={card.url}
										format={card.format}
										headlineText={card.headline}
										headlineSize={
											index === primaryBoostedIndex
												? 'large'
												: 'medium'
										}
										trailText={
											index === primaryBoostedIndex
												? card.trailText
												: undefined
										}
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
										imagePosition={
											index === primaryBoostedIndex
												? 'right'
												: 'top'
										}
										imagePositionOnMobile={
											index === primaryBoostedIndex
												? 'top'
												: 'left'
										}
										imageSize={
											index === primaryBoostedIndex
												? 'large'
												: 'small'
										}
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
						}

						// Unboosted Layout
						return (
							<LI
								key={card.url}
								padSides={true}
								percentage={
									primaries.length === 1 ? '50%' : '100%'
								}
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
				</UL>
			)}
			<UL direction="row" padBottom={true}>
				{/* Leftover huges, very bigs & all bigs */}
				{bigs.map((card, cardIndex) => {
					if (firstBigBoosted) {
						// We only render the first card here if it's boosted
						if (cardIndex > 0) return undefined;

						return (
							<LI
								key={card.url}
								percentage={`50%`}
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
									trailText={card.trailText}
									headlineSize="large"
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
					}

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
					percentage={
						firstBigBoosted ? '50%' : `${100 - bigs.length * 25}%`
					}
					showTopMarginWhenStacked={true}
				>
					<UL direction="row" wrapCards={true}>
						{/* If the first big is boosted & we have a second big,
							it should be at the start of the standards but have an image  */}
						{firstBigBoosted && bigs[1] && (
							<LI
								key={bigs[1].url}
								percentage={standardsColumnWidth}
								stretch={true}
								showDivider={true}
								padSides={true}
								padBottom={standards.length > 1}
								padBottomOnMobile={standards.length > 0}
							>
								<Card
									containerPalette={containerPalette}
									showAge={showAge}
									linkTo={bigs[1].url}
									format={bigs[1].format}
									headlineText={bigs[1].headline}
									headlineSize="small"
									byline={bigs[1].byline}
									showByline={bigs[1].showByline}
									showQuotes={
										bigs[1].format.design ===
											ArticleDesign.Comment ||
										bigs[1].format.design ===
											ArticleDesign.Letter
									}
									webPublicationDate={
										bigs[1].webPublicationDate
									}
									kickerText={bigs[1].kickerText}
									showPulsingDot={
										bigs[1].format.design ===
										ArticleDesign.LiveBlog
									}
									showSlash={true}
									showClock={false}
									imageUrl={bigs[1].image}
									imagePosition="top"
									imagePositionOnMobile="none"
									// mediaType={card.mediaType}
									// mediaDuration={card.mediaDuration}
									// starRating={card.starRating}
									// branding={card.branding}
									// supportingContent={
									// 	card.supportingContent
									// }
									dataLinkName={bigs[1].dataLinkName}
									snapData={bigs[1].snapData}
									discussionId={bigs[1].discussionId}
								/>
							</LI>
						)}
						{/* Standards */}
						{standards.map((card, cardIndex) => {
							return (
								<LI
									key={card.url}
									percentage={standardsColumnWidth}
									stretch={true}
									showDivider={true}
									padSides={true}
									padBottom={
										// Never give bottom margin to the last card
										// cardIndex !== standards.length - 1 &&
										// Any cards not on the bottom row!
										cardIndex <
										standards.length -
											// Get leftover (modulo), if none fall back to columns as the whole bottom row
											// won't want to be padded
											(standards.length % columns ||
												columns)
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
