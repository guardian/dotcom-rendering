import { Card100Media75 } from '../lib/cardWrappers.tsx';
import type { DCRContainerPalette, DCRFrontCard } from '../types/front.ts';
import { LI } from './Card/components/LI.tsx';
import { UL } from './Card/components/UL.tsx';

type Props = {
	trails: DCRFrontCard[];
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
};

export const FixedSmallSlowI = ({
	trails,
	containerPalette,
	showAge,
}: Props) => {
	const firstSlice100 = trails.slice(0, 1);

	return (
		<UL>
			{firstSlice100.map((card) => (
				<LI padSides={true} key={card.url}>
					<Card100Media75
						trail={card}
						containerPalette={containerPalette}
						showAge={showAge}
					/>
				</LI>
			))}
		</UL>
	);
};
