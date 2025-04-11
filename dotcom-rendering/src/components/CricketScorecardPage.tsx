import { css } from '@emotion/react';
import { from, headlineBold20, space } from '@guardian/source/foundations';
import type { CricketMatch } from '../cricketMatch';
import { grid } from '../grid';
import { palette } from '../palette';
import { CricketScorecard } from './CricketScorecard';

type Props = {
	match: CricketMatch;
	guardianBaseUrl: string;
};

export const CricketScorecardPage = ({ match, guardianBaseUrl }: Props) => (
	<main
		id="maincontent"
		data-layout="CricketMatchPageLayout"
		css={css`
			${grid.paddedContainer}
			position: relative;
			${from.tablet} {
				&::before,
				&::after {
					content: '';
					position: absolute;
					border-left: 1px solid ${palette('--article-border')};
					top: 0;
					bottom: 0;
				}

				&::after {
					right: 0;
				}
			}

			padding-bottom: ${space[9]}px;
		`}
	>
		<h1
			css={css`
				${headlineBold20}
				padding: ${space[2]}px 0 ${space[3]}px;
				${grid.column.centre}
				grid-row: 1;
				${from.leftCol} {
					${grid.between('left-column-start', 'centre-column-end')}
				}
				color: ${palette('--sport-competition-text')};
			`}
		>
			<a
				href={`${guardianBaseUrl}/sport/cricket`}
				css={css`
					text-decoration: none;
					color: inherit;
					:hover {
						text-decoration: underline;
					}
				`}
			>
				Cricket
			</a>
		</h1>
		<div
			css={css`
				${grid.column.centre}
				grid-row: 3;
				${from.leftCol} {
					${grid.between('left-column-start', 'centre-column-end')}
				}
				position: relative;
			`}
		>
			<CricketScorecard
				allInnings={match.innings}
				officials={match.officials}
				homeTeam={match.homeTeam}
				awayTeam={match.awayTeam}
			/>
		</div>
	</main>
);
