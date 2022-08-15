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
	return (
		<ul
			css={css`
				display: flex;
				flex-direction: column;
				/*
				   The legacy javascript executed by the culture-treat adds
				   css to show a line below the li element, presumably because
				   on Frontend this was needed. This css removes this line
				   because we don't need it on DCR
				*/
				.treat-separator:before {
					display: none;
				}
			`}
			// The legacy javascript executed by the culture-treat depends
			// on this class existing
			className="treats__container"
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
							/*
								Why are we using !important below, isn't that bad?

								We need to use the !important override to fight against the
								css being set by the culture-treat. The javascript in that
								thrasher sets padding-top to be 12px but our designs call for
								4px.

								See: https://github.com/guardian/thrashers/blob/master/embeds/culture-nugget/style.scss#L29

								Yes, I know, this is not a great solution. But it's pragmatic.
								We're keen to move the migration forward and the alternative
								here would be to rework this thrasher, which would be time
								consuming. We should look at revisiting all thrashers at
								a later date after we've migrated, but for now a little bit
								of evil is a good thing.
							*/
							padding-top: ${space[1]}px !important;
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
