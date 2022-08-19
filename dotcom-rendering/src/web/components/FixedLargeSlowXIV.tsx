import type { DCRContainerPalette } from '../../types/front';
import type { TrailType } from '../../types/trails';
import { LI } from './Card/components/LI';
import { UL } from './Card/components/UL';
import { FrontCard } from './FrontCard';

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
					<FrontCard
						trail={primary}
						starRating={primary.starRating}
						containerPalette={containerPalette}
						showAge={showAge}
						headlineSize="large"
						imagePosition="right"
						imagePositionOnMobile="top"
						imageSize="large"
						trailText={primary.trailText}
					/>
				</LI>
				<LI padSides={true} showDivider={true} percentage="25%">
					<FrontCard
						trail={secondary}
						starRating={secondary.starRating}
						containerPalette={containerPalette}
						showAge={showAge}
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
							<FrontCard
								trail={card}
								starRating={card.starRating}
								containerPalette={containerPalette}
								showAge={showAge}
								headlineSize="small"
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
							showDivider={
								cardIndex !== 0 &&
								cardIndex !== 4 &&
								cardIndex !== 8
							}
							padBottom={cardIndex < 4}
							padBottomOnMobile={
								cardIndex !== thirdSlice.length - 1
							}
							key={card.url}
						>
							<FrontCard
								trail={card}
								starRating={card.starRating}
								containerPalette={containerPalette}
								showAge={showAge}
								headlineSize="small"
								imageUrl={undefined}
							/>
						</LI>
					);
				})}
			</UL>
		</>
	);
};
