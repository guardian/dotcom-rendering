import { css } from '@emotion/react';
import { from } from '@guardian/source/foundations';
import type { FootballMatch } from '../footballMatch';
import { grid } from '../grid';
import { palette } from '../palette';
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
	match: FootballMatch;
};

export const FootballMatchSummary = ({ match }: Props) => (
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
				homeTeam={match.homeTeam}
				awayTeam={match.awayTeam}
				comments={match.comments}
			/>
		</div>
		<div
			css={css`
				${grid.column.centre}
			`}
		>
			<MatchStats
				home={match.homeTeam}
				away={match.awayTeam}
				usage="MatchSummary"
			/>
		</div>
	</main>
);
