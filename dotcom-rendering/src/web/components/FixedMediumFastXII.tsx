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

export const FixedMediumFastXII = ({
	trails,
	containerPalette,
	showAge,
}: Props) => {
	const firstSlice25 = trails.slice(0, 4);
	const secondSlice25 = trails.slice(4, 8);
	const thirdSlice25 = trails.slice(8, 12);

	return (
		<>
			<UL direction="row" padBottom={true}>
				{firstSlice25.map((trail) => {
					return (
						<LI key={trail.url} padSides={true} percentage="25%">
							<FrontCard
								trail={trail}
								containerPalette={containerPalette}
								showAge={showAge}
							/>
						</LI>
					);
				})}
			</UL>
			<UL direction="row" padBottom={true}>
				{secondSlice25.map((trail) => {
					return (
						<LI key={trail.url} padSides={true} percentage="25%">
							<FrontCard
								trail={trail}
								containerPalette={containerPalette}
								showAge={showAge}
								imageUrl={undefined}
							/>
						</LI>
					);
				})}
			</UL>
			<UL direction="row" padBottom={true}>
				{thirdSlice25.map((trail) => {
					return (
						<LI key={trail.url} padSides={true} percentage="25%">
							<FrontCard
								trail={trail}
								containerPalette={containerPalette}
								showAge={showAge}
								imageUrl={undefined}
							/>
						</LI>
					);
				})}
			</UL>
		</>
	);
};
