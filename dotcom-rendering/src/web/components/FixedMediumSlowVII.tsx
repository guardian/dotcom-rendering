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
	const primary = trails[0];
	const firstSlice = trails.slice(1, 3);
	const secondSlice = trails.slice(3, 7);

	return (
		<>
			<UL direction="row" padBottom={true}>
				<LI
					key={primary.url}
					padSides={true}
					showDivider={false}
					padBottomOnMobile={true}
					percentage="50%"
				>
					<FrontCard
						trail={primary}
						format={primary.format}
						containerPalette={containerPalette}
						showAge={showAge}
						headlineSize="large"
						imagePositionOnMobile="top"
						imageSize="large"
						supportingContent={primary.supportingContent}
					/>
				</LI>
				{firstSlice.map((trail, index) => {
					return (
						<LI
							key={trail.url}
							padSides={true}
							showDivider={true}
							padBottomOnMobile={index !== 1}
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
					);
				})}
			</UL>
			<UL direction="row" padBottom={true}>
				{secondSlice.map((trail, index) => {
					return (
						<LI
							key={trail.url}
							padSides={true}
							showDivider={index > 0}
							padBottomOnMobile={true}
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
					);
				})}
			</UL>
		</>
	);
};
