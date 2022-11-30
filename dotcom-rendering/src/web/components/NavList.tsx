import { css } from '@emotion/react';
import {
	between,
	body,
	border,
	from,
	palette,
	space,
	until,
} from '@guardian/source-foundations';
import { Link } from '@guardian/source-react-components';
import type { DCRContainerPalette } from 'src/types/front';
import type { ContainerOverrides } from 'src/types/palette';
import type { TrailType } from '../../types/trails';
import { decideContainerOverrides } from '../lib/decideContainerOverrides';

type Props = {
	trails: TrailType[];
	containerPalette?: DCRContainerPalette;
};

const ulStyles = (containerOverrides?: ContainerOverrides) => css`
	${until.tablet} {
		column-count: 1;
	}
	${between.tablet.and.desktop} {
		column-count: 3;
	}
	column-count: 4;

	column-rule: 1px solid
		${containerOverrides
			? containerOverrides.border.container
			: border.secondary};
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
		<ul css={ulStyles(containerOverrides)}>
			{trails.map((trail) => (
				<li css={liStyles(containerOverrides)} key={trail.url}>
					<Link
						href={trail.url}
						priority="secondary"
						subdued={true}
						data-link-name={trail.dataLinkName}
						cssOverrides={css`
							${body.medium()}
							font-weight: bold;
							line-height: ${space[6]}px;
							${containerOverrides &&
							`color: ${containerOverrides.text.cardHeadline}`}
						`}
					>
						{trail.headline}
					</Link>
				</li>
			))}
		</ul>
	);
};
