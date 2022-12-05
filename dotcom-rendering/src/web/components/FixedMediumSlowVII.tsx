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

export const FixedMediumSlowVII = ({
	trails,
	containerPalette,
	showAge,
}: Props) => {
	const firstSlice50 = trails.slice(0, 1);
	const firstSlice25 = trails.slice(1, 3);
	const secondSlice25 = trails.slice(3, 7);

	return (
		<>
			<UL direction="row" padBottom={true}>
				{firstSlice50.map((trail) => (
					<LI
						key={trail.url}
						padSides={true}
						showDivider={false}
						percentage="50%"
					>
						<FrontCard
							trail={trail}
							format={trail.format}
							containerPalette={containerPalette}
							showAge={showAge}
							headlineSize="large"
							imagePositionOnMobile="top"
							imageSize="large"
							supportingContent={trail.supportingContent}
						/>
					</LI>
				))}

				{firstSlice25.map((trail) => (
					<LI
						key={trail.url}
						padSides={true}
						showDivider={true}
						containerPalette={containerPalette}
						percentage="25%"
					>
						<FrontCard
							trail={trail}
							format={trail.format}
							containerPalette={containerPalette}
							showAge={showAge}
							headlineSize="medium"
							imagePositionOnMobile="left"
							imageSize="medium"
							trailText={
								trail.supportingContent &&
								trail.supportingContent.length > 0
									? undefined
									: trail.trailText
							}
							supportingContent={
								trail.supportingContent &&
								trail.supportingContent.length > 2
									? trail.supportingContent.slice(0, 2)
									: trail.supportingContent
							}
						/>
					</LI>
				))}
			</UL>
			<UL direction="row">
				{secondSlice25.map((trail, index) => (
					<LI
						key={trail.url}
						padSides={true}
						showDivider={index > 0}
						containerPalette={containerPalette}
					>
						<FrontCard
							trail={trail}
							format={trail.format}
							containerPalette={containerPalette}
							showAge={showAge}
							headlineSize="small"
							supportingContent={
								trail.supportingContent &&
								trail.supportingContent.length > 2
									? trail.supportingContent.slice(0, 2)
									: trail.supportingContent
							}
						/>
					</LI>
				))}
			</UL>
		</>
	);
};
