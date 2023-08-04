import {
	Card25Media25Tall,
	Card25Media25TallSmallHeadline,
	Card50Media50,
} from '../lib/cardWrappers.tsx';
import type { DCRContainerPalette, DCRFrontCard } from '../types/front.ts';
import { LI } from './Card/components/LI.tsx';
import { UL } from './Card/components/UL.tsx';

type Props = {
	trails: DCRFrontCard[];
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
};

export const FixedMediumSlowVII = ({
	trails,
	containerPalette,
	showAge,
}: Props) => {
	const firstSlice50 = trails.slice(0, 1);
	const firstSlice25 = trails.slice(1, 3);
	const secondSlice25 = trails.slice(3, 7);

	return (
		<>
			<UL direction="row" padBottom={true}>
				{firstSlice50.map((trail) => (
					<LI
						key={trail.url}
						padSides={true}
						showDivider={false}
						percentage="50%"
					>
						<Card50Media50
							trail={trail}
							containerPalette={containerPalette}
							showAge={showAge}
						/>
					</LI>
				))}

				{firstSlice25.map((trail) => (
					<LI
						key={trail.url}
						padSides={true}
						showDivider={true}
						containerPalette={containerPalette}
						percentage="25%"
					>
						<Card25Media25Tall
							trail={trail}
							containerPalette={containerPalette}
							showAge={showAge}
						/>
					</LI>
				))}
			</UL>
			<UL direction="row">
				{secondSlice25.map((trail, index) => (
					<LI
						key={trail.url}
						padSides={true}
						showDivider={index > 0}
						containerPalette={containerPalette}
					>
						<Card25Media25TallSmallHeadline
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
