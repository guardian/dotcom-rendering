import { css } from '@emotion/react';
import type { DCRContainerPalette } from '../../types/front';
import type { TrailType } from '../../types/trails';
import { getTemplateAreas } from './Card/components/Grid';
import { FrontCard } from './FrontCard';
import { GridItem } from './GridItem';

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

	const templateAreas = getTemplateAreas([
		['50%', '25%', '25%'],
		['25%', '25%', '25%', '25%'],
	]);

	return (
		<div
			css={css`
				display: grid;
				gap: 12px;
				grid-template-columns: repeat(4, 1fr);
				grid-template-areas:
					'${templateAreas[0]}'
					'${templateAreas[1]}';
			`}
		>
			<GridItem area="card-1">
				<FrontCard
					trail={primary}
					format={primary.format}
					containerPalette={containerPalette}
					showAge={showAge}
					headlineSize="large"
					imagePositionOnMobile="top"
					imageSize="large"
					supportingContent={primary.supportingContent}
					// TODO: size="50%"
				/>
			</GridItem>
			{firstSlice.map((trail, index) => {
				return (
					<GridItem area={'card-' + (index + 2).toString()}>
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
							// TODO: size="25%"
						/>
					</GridItem>
				);
			})}
			{secondSlice.map((trail, index) => {
				return (
					<GridItem area={'card-' + (index + 4).toString()}>
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
							// TODO: size="25%"
						/>
					</GridItem>
				);
			})}
		</div>
	);
};
