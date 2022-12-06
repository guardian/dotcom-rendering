import { css } from '@emotion/react';
import { border, from, palette, space } from '@guardian/source-foundations';
import { DCRContainerPalette } from '../../types/front';
import { ContainerOverrides } from '../../types/palette';
import { TrailType } from '../../types/trails';
import { decideContainerOverrides } from '../lib/decideContainerOverrides';
import { MiniCard } from './MiniCard';

type Props = {
	trails: TrailType[];
	containerPalette?: DCRContainerPalette;
	showImage: boolean;
};

const columnRuleColour = (containerOverrides?: ContainerOverrides) => css`
	column-rule: 1px solid
		${containerOverrides
			? containerOverrides.border.container
			: border.secondary};
`;

const topBorderColour = (containerOverrides?: ContainerOverrides) => css`
	border-top: 1px solid
		${containerOverrides
			? containerOverrides.topBar.card
			: palette.neutral[93]};
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
				<li css={[liStyles, topBorderColour(containerOverrides)]}>
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
