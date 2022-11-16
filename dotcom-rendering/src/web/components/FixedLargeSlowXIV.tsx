import type { DCRContainerPalette } from '../../types/front';
import type { TrailType } from '../../types/trails';
import { shouldPadWrappableRows } from '../lib/dynamicSlices';
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
	const primary = trails.slice(0, 1);
	const secondary = trails.slice(1, 2);
	const secondSlice = trails.slice(2, 6);
	const thirdSlice = trails.slice(6, 14);

	return (
		<>
			<UL direction="row" padBottom={true}>
				{primary.map((card) => (
					<LI padSides={true} percentage="75%">
						<FrontCard
							trail={card}
							starRating={card.starRating}
							containerPalette={containerPalette}
							showAge={showAge}
							headlineSize="large"
							imagePosition="right"
							imagePositionOnMobile="top"
							imageSize="large"
							trailText={card.trailText}
						/>
					</LI>
				))}

				{secondary.map((card) => (
					<LI padSides={true} showDivider={true} percentage="25%">
						<FrontCard
							trail={card}
							starRating={card.starRating}
							containerPalette={containerPalette}
							showAge={showAge}
						/>
					</LI>
				))}
			</UL>
			<UL direction="row" padBottom={true}>
				{secondSlice.map((card, cardIndex) => {
					return (
						<LI
							padSides={true}
							percentage="25%"
							showDivider={cardIndex > 0}
							key={card.url}
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
			<UL direction="row" wrapCards={true}>
				{thirdSlice.map((card, cardIndex, { length }) => {
					const columns = 4;
					return (
						<LI
							padSides={true}
							percentage="25%"
							showDivider={cardIndex % columns !== 0}
							offsetBottomPaddingOnDivider={shouldPadWrappableRows(
								cardIndex,
								length,
								columns,
							)}
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
