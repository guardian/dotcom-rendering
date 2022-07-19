import type { DCRContainerPalette } from '../../types/front';
import { LI } from './Card/components/LI';
import { UL } from './Card/components/UL';
import { FrontCard } from './FrontCard';

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
					<FrontCard
						trail={primary}
						containerPalette={containerPalette}
						showAge={showAge}
						//Overrides
						headlineSize="large"
						imagePosition="right"
						imagePositionOnMobile="top"
						imageSize="large"
						supportingContent={primary.supportingContent}
						trailText={primary.trailText}
					/>
				</LI>
				<LI
					padSides={true}
					showDivider={true}
					showTopMarginWhenStacked={true}
					percentage="25%"
				>
					<FrontCard
						trail={secondary}
						containerPalette={containerPalette}
						showAge={showAge}
						// Overrides
						supportingContent={secondary.supportingContent}
					/>
				</LI>
			</UL>
			<UL direction="row" padBottom={true}>
				{bigCards.map((card, cardIndex) => {
					return (
						<LI
							key={card.url}
							percentage="25%"
							padSides={true}
							padBottom={false}
							showTopMarginWhenStacked={cardIndex > 0}
							showDivider={cardIndex > 0}
						>
							<FrontCard
								trail={card}
								containerPalette={containerPalette}
								showAge={showAge}
								// Overrides
								supportingContent={card.supportingContent}
							/>
						</LI>
					);
				})}
				<LI percentage="50%" showTopMarginWhenStacked={true}>
					<UL direction="row" wrapCards={true}>
						{smallCards.map((card, cardIndex) => {
							return (
								<LI
									key={card.url}
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
									<FrontCard
										trail={card}
										containerPalette={containerPalette}
										showAge={showAge}
										//Overrides
										headlineSize="small"
										imageUrl={undefined}
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
