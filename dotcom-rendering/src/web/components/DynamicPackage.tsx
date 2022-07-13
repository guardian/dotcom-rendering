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
	const primary = trails[0];
	const remaining = trails.slice(1, 4);

	return (
		<>
			<UL direction="row">
				<LI padSides={true} percentage="75%">
					<FrontCard
						trail={primary}
						containerPalette={containerPalette}
						showAge={showAge}
						//Overrides
						headlineSize="huge"
						imagePosition="bottom"
						imagePositionOnMobile="bottom"
						imageSize="large"
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
										//Overrides
										containerType="dynamic/package"
										imageUrl={
											// Always show the image on the first card and only
											// on the second if there are two items in two
											cardIndex === 0 ||
											remaining.length === 2
												? card.image
												: undefined
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
