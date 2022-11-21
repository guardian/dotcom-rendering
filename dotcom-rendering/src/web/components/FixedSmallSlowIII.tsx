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
	const primary = trails.slice(0, 3);

	return (
		<UL direction="row">
			{primary.map((trail, index) => {
				return (
					<LI
						padSides={true}
						showDivider={index > 0}
						percentage={index === 0 ? '50%' : '25%'}
						key={trail.url}
					>
						<FrontCard
							trail={trail}
							starRating={trail.starRating}
							containerPalette={containerPalette}
							showAge={showAge}
							headlineSize={index === 0 ? 'large' : 'medium'}
							imagePositionOnMobile={index === 0 ? 'top' : 'left'}
							trailText={
								index === 0 ? undefined : trail.trailText
							}
						/>
					</LI>
				);
			})}
		</UL>
	);
};
