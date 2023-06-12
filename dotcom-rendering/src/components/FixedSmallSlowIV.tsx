import type { DCRContainerPalette, DCRFrontCard } from '../types/front';
import { Card25Media25 } from '../lib/cardWrappers';
import { LI } from './Card/components/LI';
import { UL } from './Card/components/UL';

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
