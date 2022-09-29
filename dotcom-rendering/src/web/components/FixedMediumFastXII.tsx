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
	const firstSlice = trails.slice(0, 4);
	const secondSlice = trails.slice(4, 8);
	const thirdSlice = trails.slice(8, 12);

	return (
		<>
			<UL direction="row" padBottom={true}>
				{firstSlice.map((trail) => {
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
				{secondSlice.map((trail) => {
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
				{thirdSlice.map((trail) => {
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
