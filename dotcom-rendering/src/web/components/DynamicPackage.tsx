import type { DCRContainerPalette, DCRGroupedTrails } from '../../types/front';
import { LI } from './Card/components/LI';
import { UL } from './Card/components/UL';
import { FrontCard } from './FrontCard';

type Props = {
	groupedTrails: DCRGroupedTrails;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
};

const Snap100 = ({
	snap,
	containerPalette,
	showAge,
}: {
	snap: TrailType;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
}) => {
	return (
		<UL direction="row">
			<LI padSides={true} padBottom={true}>
				<FrontCard
					trail={snap}
					starRating={snap.starRating}
					containerPalette={containerPalette}
					containerType="dynamic/package"
					showAge={showAge}
					headlineSize="large"
					headlineSizeOnMobile="medium"
					imagePosition="right"
					imagePositionOnMobile="left"
					imageSize="medium"
					trailText={snap.trailText}
				/>
			</LI>
		</UL>
	);
};

export const DynamicPackage = ({
	groupedTrails,
	containerPalette,
	showAge,
}: Props) => {
	// Take the first 'snap' - all others are treated as standards
	const snap = groupedTrails.snap.shift();
	const [primary, ...remaining] = [
		...groupedTrails.snap,
		...groupedTrails.standard,
	];

	// TODO: Different layouts are required when there are 4+ 'remaining' cards
	// dynamic/package will display up to 8 'remaining' cards before moving to 'show more'
	if (primary.isBoosted) {
		return (
			<>
				{!!snap && (
					<Snap100
						snap={snap}
						containerPalette={containerPalette}
						showAge={showAge}
					/>
				)}
				<UL direction="row">
					<LI padSides={true}>
						<FrontCard
							trail={primary}
							starRating={primary.starRating}
							containerPalette={containerPalette}
							containerType="dynamic/package"
							showAge={showAge}
							headlineSize="ginormous"
							imagePosition="bottom"
							imagePositionOnMobile="bottom"
							imageSize="large"
							isDynamo={true}
							supportingContent={primary.supportingContent}
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
								<FrontCard
									trail={card}
									starRating={card.starRating}
									containerPalette={containerPalette}
									containerType="dynamic/package"
									showAge={showAge}
									supportingContent={card.supportingContent}
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
			{!!snap && (
				<Snap100
					snap={snap}
					containerPalette={containerPalette}
					showAge={showAge}
				/>
			)}
			<UL direction="row">
				<LI padSides={true} percentage="75%">
					<FrontCard
						trail={primary}
						starRating={primary.starRating}
						containerPalette={containerPalette}
						containerType="dynamic/package"
						showAge={showAge}
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
										starRating={card.starRating}
										containerPalette={containerPalette}
										containerType="dynamic/package"
										showAge={showAge}
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
