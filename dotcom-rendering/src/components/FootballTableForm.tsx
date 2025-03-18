import { css } from '@emotion/react';
import { visuallyHidden } from '@guardian/source/foundations';
import type { TeamScore } from '../footballMatches';

export type TeamResult = {
	self: TeamScore;
	foe: TeamScore;
};

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
	background-color: #3db540;
	margin-top: -0.375rem;
`;

const drawStyles = css`
	background-color: #707070;
	height: 0.25rem;
`;
const loseStyles = css`
	background-color: #c70000;
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
			{teamResults.map(({ self, foe }) => {
				let title = '';
				const wdlStyles = [];
				if (self.score < foe.score) {
					wdlStyles.push(loseStyles);
					title = `Lost ${self.score}-${foe.score} to ${foe.name}`;
				} else if (self.score === foe.score) {
					wdlStyles.push(drawStyles);
					title = `Drew ${self.score}-${foe.score} with ${foe.name}`;
				} else if (self.score > foe.score) {
					wdlStyles.push(winStyles);
					title = `Won ${self.score}-${foe.score} against ${foe.name}`;
				}
				return (
					<span
						css={[formBlockStyles, ...wdlStyles]}
						key={`${self.name}-${foe.name}`}
						data-foe={foe.name}
						data-score={self.score}
						data-score-foe={foe.score}
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
