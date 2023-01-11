import type { DCRContainerPalette } from '../../types/front';
import type { TrailType } from '../../types/trails';
import { LI } from './Card/components/LI';
import { UL } from './Card/components/UL';
import {
	Card25Media25Tall,
	Card50Media50,
	CardDefault,
} from '../lib/cardWrappers';

type Props = {
	trails: TrailType[];
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
};

const decideOffset = ({
	length,
	position,
}: {
	length: number;
	position: number;
}): boolean => {
	if (length <= 5) return false;
	switch (length) {
		case 6: {
			switch (position) {
				case 2:
					return true;
				default:
					return false;
			}
		}
		case 7:
			return false;
		case 8: {
			if (position <= 4) return true;
			else return false;
		}
	}
	return false;
};

export const FixedMediumFastXI = ({
	trails,
	containerPalette,
	showAge,
}: Props) => {
	const firstSlice50 = trails.slice(0, 1);
	const firstSlice25 = trails.slice(1, 3);
	const remaining = trails.slice(3, 11);
	return (
		<>
			<UL direction="row" padBottom={true}>
				{firstSlice50.map((trail) => {
					return (
						<LI key={trail.url} padSides={true} percentage="50%">
							<Card50Media50
								trail={trail}
								containerPalette={containerPalette}
								showAge={showAge}
							/>
						</LI>
					);
				})}
				{firstSlice25.map((trail) => {
					return (
						<LI
							key={trail.url}
							padSides={true}
							percentage="25%"
							showDivider={true}
						>
							<Card25Media25Tall
								trail={trail}
								containerPalette={containerPalette}
								showAge={showAge}
							/>
						</LI>
					);
				})}
			</UL>
			{/*
			 * This pattern of using wrapCards on the UL + percentage=25 and stretch=true
			 * on the LI creates a dynanic list of cards over two rows where the second row
			 * only appears when there are more than 4 cards
			 *
			 * E.g:
			 * ._____._____._____._____.
			 * |_____|_____|_____|_____|
			 * |___________|___________|
			 */}
			<UL direction="row" wrapCards={true}>
				{remaining.map((trail, trailIndex) => (
					<LI
						padSides={true}
						offsetBottomPaddingOnDivider={decideOffset({
							length: remaining.length,
							position: trailIndex,
						})}
						showDivider={trailIndex % 4 !== 0}
						containerPalette={containerPalette}
						percentage="25%"
						stretch={true}
						key={trail.url}
					>
						<CardDefault
							trail={trail}
							containerPalette={containerPalette}
							showAge={showAge}
						/>
					</LI>
				))}
			</UL>
		</>
	);
};
