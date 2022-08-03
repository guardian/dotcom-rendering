import { css } from '@emotion/react';
import { border, space, textSans } from '@guardian/source-foundations';
import { Link } from '@guardian/source-react-components';
import type { TreatType } from '../../types/front';

export const Treats = ({
	treats,
	borderColour,
}: {
	treats: TreatType[];
	borderColour?: string;
}) => {
	if (treats.length === 0) return null;
	return (
		<ul
			css={css`
				display: flex;
				flex-direction: column;
			`}
		>
			{treats.map((treat) => {
				return (
					<li
						css={css`
							margin-top: ${space[3]}px;
							border-left: 1px solid
								${borderColour ?? border.secondary};
							border-top: 1px solid
								${borderColour ?? border.secondary};
							padding-top: ${space[1]}px;
							padding-left: ${space[2]}px;
						`}
					>
						<Link
							priority="secondary"
							subdued={true}
							cssOverrides={css`
								${textSans.xsmall()}
							`}
							href={treat.linkTo}
						>
							{treat.text}
						</Link>
					</li>
				);
			})}
		</ul>
	);
};
