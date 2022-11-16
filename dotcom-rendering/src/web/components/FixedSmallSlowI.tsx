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
	const trail = trails.slice(0, 1);

	return (
		<UL>
			{trail.map((card) => (
				<LI padSides={true}>
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
