import { Card100Media75 } from '../lib/cardWrappers';
import type { DCRContainerPalette, DCRFrontCard } from '../types/front';
import { LI } from './Card/components/LI';
import { UL } from './Card/components/UL';
import type { Loading } from './CardPicture';

type Props = {
	trails: DCRFrontCard[];
	imageLoading: Loading;
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	serverTime?: number;
};

export const FixedSmallSlowI = ({
	trails,
	containerPalette,
	showAge,
	serverTime,
	imageLoading,
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
						serverTime={serverTime}
						imageLoading={imageLoading}
					/>
				</LI>
			))}
		</UL>
	);
};
