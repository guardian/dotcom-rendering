import { Card25Media25Tall, Card50Media50 } from '../lib/cardWrappers.tsx';
import type { DCRContainerPalette, DCRFrontCard } from '../types/front.ts';
import { LI } from './Card/components/LI.tsx';
import { UL } from './Card/components/UL.tsx';

type Props = {
	trails: DCRFrontCard[];
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
};

export const FixedSmallSlowIII = ({
	trails,
	containerPalette,
	showAge,
}: Props) => {
	const firstSlice50 = trails.slice(0, 1);
	const firstSlice25 = trails.slice(1, 3);

	return (
		<UL direction="row">
			{firstSlice50.map((trail) => (
				<LI padSides={true} percentage={'50%'} key={trail.url}>
					<Card50Media50
						trail={trail}
						containerPalette={containerPalette}
						showAge={showAge}
					/>
				</LI>
			))}
			{firstSlice25.map((trail) => (
				<LI
					padSides={true}
					showDivider={true}
					containerPalette={containerPalette}
					percentage={'25%'}
					key={trail.url}
				>
					<Card25Media25Tall
						trail={trail}
						containerPalette={containerPalette}
						showAge={showAge}
					/>
				</LI>
			))}
		</UL>
	);
};
