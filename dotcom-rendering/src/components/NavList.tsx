import { css } from '@emotion/react';
import { from, palette, space } from '@guardian/source-foundations';
import { decideContainerOverrides } from '../lib/decideContainerOverrides';
import type { DCRContainerPalette } from '../types/front';
import type { ContainerOverrides } from '../types/palette';
import type { TrailType } from '../types/trails';
import { MiniCard } from './MiniCard';

type Props = {
	trails: TrailType[];
	containerPalette?: DCRContainerPalette;
	showImage: boolean;
};

const columnRuleColour = (containerOverrides?: ContainerOverrides) => css`
	column-rule: 1px solid
		${containerOverrides?.border.container ?? palette.neutral[86]};
`;

const topBorderColour = (containerOverrides?: ContainerOverrides) => css`
	border-top: 1px solid
		${containerOverrides?.topBar?.card ?? palette.neutral[93]};
`;

const ulStyles = css`
	column-gap: 10px;
`;

const liStyles = css`
	padding-top: ${space[1]}px;
	padding-bottom: ${space[3]}px;

	${from.tablet} {
		margin-left: 10px;
		margin-right: 10px;
	}
`;

const textColumns = css`
	column-count: 1;
	${from.tablet} {
		column-count: 3;
	}
	${from.desktop} {
		column-count: 4;
	}
`;

const mediaColumns = css`
	column-count: 1;
	${from.tablet} {
		column-count: 3;
	}
`;

export const NavList = ({ trails, containerPalette, showImage }: Props) => {
	const containerOverrides =
		containerPalette && decideContainerOverrides(containerPalette);

	return (
		<ul
			css={[
				ulStyles,
				columnRuleColour(containerOverrides),
				showImage ? mediaColumns : textColumns,
			]}
		>
			{trails.map((trail) => (
				<li
					key={trail.url}
					css={[liStyles, topBorderColour(containerOverrides)]}
				>
					<MiniCard
						trail={trail}
						showImage={showImage}
						containerPalette={containerPalette}
					/>
				</li>
			))}
		</ul>
	);
};
