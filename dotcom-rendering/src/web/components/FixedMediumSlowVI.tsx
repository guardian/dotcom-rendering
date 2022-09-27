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

export const FixedMediumSlowVI = ({
	trails,
	containerPalette,
	showAge,
}: Props) => {
	const topTrails = trails.slice(0, 2);
	const bottomTrails = trails.slice(2, 6);

	return (
		<>
			<UL direction="row" padBottom={true}>
				{topTrails.map((trail, index) => {
					return (
						<LI
							key={trail.url}
							padSides={true}
							showDivider={index > 0}
							percentage={index === 0 ? '75%' : '25%'}
						>
							<FrontCard
								trail={trail}
								containerPalette={containerPalette}
								showAge={showAge}
								headlineSize={index === 0 ? 'large' : 'medium'}
								imagePosition={index === 0 ? 'right' : 'top'}
								imagePositionOnMobile={
									index === 0 ? 'top' : 'left'
								}
								imageSize={index === 0 ? 'large' : 'medium'}
								trailText={
									index === 0 ? trail.trailText : undefined
								}
							/>
						</LI>
					);
				})}
			</UL>
			<UL direction="row">
				{bottomTrails.map((trail, index) => {
					return (
						<LI
							key={trail.url}
							padSides={true}
							showDivider={index > 0}
						>
							<FrontCard
								trail={trail}
								containerPalette={containerPalette}
								showAge={showAge}
								headlineSize="small"
							/>
						</LI>
					);
				})}
			</UL>
		</>
	);
};
