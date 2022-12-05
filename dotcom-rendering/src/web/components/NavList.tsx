import { css } from '@emotion/react';
import {
	between,
	border,
	from,
	palette,
	space,
	until,
} from '@guardian/source-foundations';
import { DCRContainerPalette } from '../../types/front';
import { ContainerOverrides } from '../../types/palette';
import { TrailType } from '../../types/trails';
import { decideContainerOverrides } from '../lib/decideContainerOverrides';
import { MiniCard } from './MiniCard';

type Props = {
	trails: TrailType[];
	containerPalette?: DCRContainerPalette;
};

const columnRuleColour = (containerOverrides?: ContainerOverrides) => css`
	column-rule: 1px solid
		${containerOverrides
			? containerOverrides.border.container
			: border.secondary};
`;

const ulStyles = css`
	${until.tablet} {
		column-count: 1;
	}
	${between.tablet.and.desktop} {
		column-count: 3;
	}
	column-count: 4;

	column-gap: 10px;
`;

const liStyles = (containerOverrides?: ContainerOverrides) => css`
	border-top: 1px solid
		${containerOverrides
			? containerOverrides.topBar.card
			: palette.neutral[93]};
	padding-top: ${space[1]}px;
	padding-bottom: ${space[3]}px;

	${from.tablet} {
		margin-left: 10px;
		margin-right: 10px;
	}
`;

export const NavList = ({ trails, containerPalette }: Props) => {
	const containerOverrides =
		containerPalette && decideContainerOverrides(containerPalette);

	return (
		<ul css={[ulStyles, columnRuleColour(containerOverrides)]}>
			{trails.map((trail) => (
				<li css={liStyles(containerOverrides)}>
					<MiniCard
						trail={trail}
						showImage={false}
						containerPalette={containerPalette}
					/>
				</li>
			))}
		</ul>
	);
};
