import { CardDefault } from '../lib/cardWrappers';
import { Card50_Card25_Card25 } from '../lib/dynamicSlices';
import type { DCRContainerPalette, DCRFrontCard } from '../types/front';
import { LI } from './Card/components/LI';
import { UL } from './Card/components/UL';
import type { Loading } from './CardPicture';

type Props = {
	trails: DCRFrontCard[];
	imageLoading: Loading;
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
	imageLoading,
}: Props) => {
	const firstSlice = trails.slice(0, 3);
	const remaining = trails.slice(3, 11);
	return (
		<>
			<Card50_Card25_Card25
				cards={firstSlice}
				containerPalette={containerPalette}
				showAge={showAge}
				imageLoading={imageLoading}
			/>
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
