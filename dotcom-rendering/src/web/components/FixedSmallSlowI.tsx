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
	const trail = trails[0];
	if (!trail) return null;

	return (
		<UL>
			<LI padSides={true}>
				<FrontCard
					trail={trail}
					containerPalette={containerPalette}
					showAge={showAge}
					imagePosition="right"
					imagePositionOnMobile="top"
					imageSize="jumbo"
					headlineSize="huge"
					headlineSizeOnMobile="large"
					trailText={trail.trailText}
				/>
			</LI>
		</UL>
	);
};
