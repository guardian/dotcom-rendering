import type { DCRContainerPalette } from '../../types/front';
import type { TrailType } from '../../types/trails';
import { LI } from './Card/components/LI';
import { UL } from './Card/components/UL';
import { FrontCard } from './FrontCard';

type Props = {
	trails: TrailType[];
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
					<FrontCard
						trail={card}
						containerPalette={containerPalette}
						showAge={showAge}
						imagePosition="right"
						imagePositionOnMobile="top"
						imageSize="jumbo"
						headlineSize="huge"
						headlineSizeOnMobile="large"
						trailText={card.trailText}
					/>
				</LI>
			))}
		</UL>
	);
};
