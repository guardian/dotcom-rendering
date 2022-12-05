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
	const firstSlice75 = trails.slice(0, 1);
	const firstSlice25 = trails.slice(1, 2);
	const secondSlice25 = trails.slice(2, 6);

	return (
		<>
			<UL direction="row" padBottom={true}>
				{firstSlice75.map((trail) => (
					<LI key={trail.url} padSides={true} percentage={'75%'}>
						<FrontCard
							trail={trail}
							containerPalette={containerPalette}
							showAge={showAge}
							headlineSize={'large'}
							imagePosition={'right'}
							imagePositionOnMobile={'top'}
							imageSize={'large'}
							trailText={trail.trailText}
						/>
					</LI>
				))}
				{firstSlice25.map((trail, index) => (
					<LI
						key={trail.url}
						padSides={true}
						showDivider={index > 0}
						percentage={'25%'}
					>
						<FrontCard
							trail={trail}
							containerPalette={containerPalette}
							showAge={showAge}
							headlineSize={'medium'}
							imagePosition={'top'}
							imagePositionOnMobile={'left'}
							imageSize={'medium'}
							trailText={undefined}
						/>
					</LI>
				))}
			</UL>
			<UL direction="row">
				{secondSlice25.map((trail, index) => (
					<LI key={trail.url} padSides={true} showDivider={index > 0}>
						<FrontCard
							trail={trail}
							containerPalette={containerPalette}
							showAge={showAge}
							headlineSize="small"
						/>
					</LI>
				))}
			</UL>
		</>
	);
};
