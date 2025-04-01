import { css } from '@emotion/react';
import { from } from '@guardian/source/foundations';
import { grid } from '../grid';
import { palette } from '../palette';
import type { TeamType } from '../types/sport';
import { MatchNav } from './MatchNav';
import { MatchStats } from './MatchStats';

const gridStyles = css`
	${grid.paddedContainer}
	position: relative;
	${from.tablet} {
		&::before,
		&::after {
			content: '';
			position: absolute;
			border-left: 1px solid ${palette('--article-border')};
			z-index: 1;
			top: 0;
			bottom: 0;
		}

		&::after {
			right: 0;
		}
	}
`;

type Props = {
	homeTeam: TeamType;
	awayTeam: TeamType;
	comments?: string;
	competition: string;
};

export const FootballMatchSummary = ({
	homeTeam,
	awayTeam,
	comments,
	competition,
}: Props) => (
	<main id="maincontent" css={gridStyles}>
		<div
			css={css`
				${grid.column.centre};
				position: relative;

				${from.tablet} {
					::before {
						content: '';
						position: absolute;
						top: 0;
						bottom: 10px;
						width: 100vw;
						left: -100vw;
						background-color: ${palette('--match-nav-background')};
					}
				}
			`}
		>
			<MatchNav
				homeTeam={homeTeam}
				awayTeam={awayTeam}
				comments={comments}
			/>
		</div>
		<div
			css={css`
				${grid.column.centre}
			`}
		>
			<MatchStats
				home={homeTeam}
				away={awayTeam}
				competition={competition}
				usage="MatchSummary"
			/>
		</div>
	</main>
);
