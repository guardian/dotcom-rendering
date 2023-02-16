import type { DCRContainerPalette, DCRFrontCard } from '../../types/front';
import {
	Card25Media25,
	Card25Media25SmallHeadline,
	Card75Media50Right,
	CardDefault,
} from '../lib/cardWrappers';
import { shouldPadWrappableRows } from '../lib/dynamicSlices';
import { LI } from './Card/components/LI';
import { UL } from './Card/components/UL';

type Props = {
	trails: DCRFrontCard[];
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
};

export const FixedLargeSlowXIV = ({
	trails,
	containerPalette,
	showAge,
}: Props) => {
	const firstSlice75 = trails.slice(0, 1);
	const firstSlice25 = trails.slice(1, 2);
	const secondSlice25 = trails.slice(2, 6);
	const thirdSlice25 = trails.slice(6, 14);

	return (
		<>
			<UL direction="row" padBottom={true}>
				{firstSlice75.map((card) => {
					return (
						<LI padSides={true} percentage="75%" key={card.url}>
							<Card75Media50Right
								trail={card}
								showAge={showAge}
								containerPalette={containerPalette}
							/>
						</LI>
					);
				})}
				{firstSlice25.map((card) => {
					return (
						<LI
							padSides={true}
							showDivider={true}
							containerPalette={containerPalette}
							percentage="25%"
							key={card.url}
						>
							<Card25Media25
								trail={card}
								showAge={showAge}
								containerPalette={containerPalette}
							/>
						</LI>
					);
				})}
			</UL>
			<UL direction="row" padBottom={true}>
				{secondSlice25.map((card, cardIndex) => {
					return (
						<LI
							padSides={true}
							percentage="25%"
							showDivider={cardIndex > 0}
							containerPalette={containerPalette}
							key={card.url}
						>
							<Card25Media25SmallHeadline
								trail={card}
								containerPalette={containerPalette}
								showAge={showAge}
							/>
						</LI>
					);
				})}
			</UL>
			<UL direction="row" wrapCards={true}>
				{thirdSlice25.map((card, cardIndex, { length }) => {
					const columns = 4;
					return (
						<LI
							padSides={true}
							percentage="25%"
							showDivider={cardIndex % columns !== 0}
							containerPalette={containerPalette}
							offsetBottomPaddingOnDivider={shouldPadWrappableRows(
								cardIndex,
								length,
								columns,
							)}
							key={card.url}
						>
							<CardDefault
								trail={card}
								showAge={showAge}
								containerPalette={containerPalette}
							/>
						</LI>
					);
				})}
			</UL>
		</>
	);
};
