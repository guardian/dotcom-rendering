import {
	Card25Media25TallNoTrail,
	Card25Media25TallSmallHeadline,
	Card75Media50Right,
} from '../lib/cardWrappers.tsx';
import type { DCRContainerPalette, DCRFrontCard } from '../types/front.ts';
import { LI } from './Card/components/LI.tsx';
import { UL } from './Card/components/UL.tsx';

type Props = {
	trails: DCRFrontCard[];
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
};

export const FixedMediumSlowVI = ({
	trails,
	containerPalette,
	showAge,
}: Props) => {
	const firstSlice75 = trails.slice(0, 1);
	const firstSlice25 = trails.slice(1, 2);
	const secondSlice25 = trails.slice(2, 6);

	return (
		<>
			<UL direction="row" padBottom={true}>
				{firstSlice75.map((trail) => (
					<LI key={trail.url} padSides={true} percentage={'75%'}>
						<Card75Media50Right
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
						percentage={'25%'}
					>
						<Card25Media25TallNoTrail
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
