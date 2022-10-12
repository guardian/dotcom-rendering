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
import type { TrailType } from '../../types/trails';
import { decideContainerOverrides } from '../lib/decideContainerOverrides';

type Props = {
	trails: TrailType[];
	containerPalette?: DCRContainerPalette;
};

const ulStyles = css`
	${until.tablet} {
		column-count: 1;
	}
	${between.tablet.and.desktop} {
		column-count: 3;
	}
	column-count: 4;

	column-rule: 0.0625rem solid ${border.secondary};
	column-gap: 0.625rem;
`;

const divStyles = css`
	color: ${palette.neutral[7]};
	border-top: 0.0625rem solid ${palette.neutral[93]};
	padding-top: ${space[1]}px;
	padding-bottom: ${space[3]}px;

	${from.tablet} {
		margin-left: 0.625rem;
		margin-right: 0.625rem;
	}
`;

export const NavList = ({ trails, containerPalette }: Props) => {
	const containerOverrides =
		containerPalette && decideContainerOverrides(containerPalette);

	return (
		<ul css={ulStyles}>
			{trails.map((trail) => (
				<li>
					<div css={divStyles}>
						<Link
							href={trail.url}
							priority="secondary"
							subdued={true}
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
					</div>
				</li>
			))}
		</ul>
	);
};
