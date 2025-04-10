import { css } from '@emotion/react';
import { visuallyHidden } from '@guardian/source/foundations';
import type { TeamResult } from '../footballTables';
import { palette } from '../palette';

const formBlockStyles = css`
	display: inline-block;
	top: 0;
	vertical-align: middle;
	border-radius: 0.25rem;
	margin-left: 0.125rem;
	height: 0.75rem;
	width: 0.25rem;
	cursor: help;
	:first-child {
		margin-left: 0;
	}
`;

const winStyles = css`
	background-color: ${palette('--football-form-win')};
	margin-top: -0.375rem;
`;

const drawStyles = css`
	background-color: ${palette('--football-form-draw')};
	height: 0.25rem;
`;
const lossStyles = css`
	background-color: ${palette('--football-form-loss')};
	margin-top: 0.375rem;
`;

export const FootballTableForm = ({
	teamResults,
}: {
	teamResults: TeamResult[];
}) => {
	return (
		<div
			css={css`
				min-width: 1.875rem;
				font-size: 0;
				white-space: nowrap;
			`}
		>
			{teamResults.map(({ self, foe, matchId }) => {
				const isWin = self.score > foe.score;
				const isLoss = self.score < foe.score;
				const styles = isWin
					? winStyles
					: isLoss
					? lossStyles
					: drawStyles;
				const title = isWin
					? `Won ${self.score}-${foe.score} against ${foe.name}`
					: isLoss
					? `Lost ${self.score}-${foe.score} to ${foe.name}`
					: `Drew ${self.score}-${foe.score} with ${foe.name}`;

				return (
					<span
						css={[formBlockStyles, styles]}
						key={matchId}
						title={title}
					>
						<span
							css={css`
								${visuallyHidden}
							`}
						>
							{title}
						</span>
					</span>
				);
			})}
		</div>
	);
};
