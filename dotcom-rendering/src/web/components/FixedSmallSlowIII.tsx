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
					<FrontCard
						trail={trail}
						starRating={trail.starRating}
						containerPalette={containerPalette}
						showAge={showAge}
						headlineSize={'large'}
						imagePositionOnMobile={'top'}
						trailText={undefined}
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
					<FrontCard
						trail={trail}
						starRating={trail.starRating}
						containerPalette={containerPalette}
						showAge={showAge}
						headlineSize={'medium'}
						imagePositionOnMobile={'left'}
						trailText={trail.trailText}
					/>
				</LI>
			))}
		</UL>
	);
};
