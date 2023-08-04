import { Card25Media25 } from '../lib/cardWrappers.tsx';
import type { DCRContainerPalette, DCRFrontCard } from '../types/front.ts';
import { LI } from './Card/components/LI.tsx';
import { UL } from './Card/components/UL.tsx';

type Props = {
	trails: DCRFrontCard[];
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
};

export const FixedSmallSlowIV = ({
	trails,
	containerPalette,
	showAge,
}: Props) => {
	const firstSlice25 = trails.slice(0, 4);

	return (
		<UL direction="row">
			{firstSlice25.map((trail, index) => {
				return (
					<LI
						key={trail.url}
						padSides={true}
						showDivider={index > 0}
						containerPalette={containerPalette}
					>
						<Card25Media25
							trail={trail}
							containerPalette={containerPalette}
							showAge={showAge}
						/>
					</LI>
				);
			})}
		</UL>
	);
};
