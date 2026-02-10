import { css } from '@emotion/react';
import type {
	FootballMatchStats,
	FootballMatchTeamWithStats,
} from '../footballMatchStats';
import type { FootballTableSummary } from '../footballTables';
import {
	FootballMatchGoalAttempts,
	FootballMatchStat,
} from './FootballMatchStat';
import { LeagueTable } from './LeagueTable';
import { Lineups } from './Lineups';

type Props = {
	matchStats: FootballMatchStats;
	table?: FootballTableSummary;
};

const layoutCss = css`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

function teamHasStats({
	shotsOffTarget,
	shotsOnTarget,
	fouls,
	corners,
}: FootballMatchTeamWithStats) {
	return !(
		shotsOffTarget === 0 &&
		shotsOnTarget === 0 &&
		fouls === 0 &&
		corners === 0
	);
}

export const FootballMatchInfo = ({ matchStats, table }: Props) => {
	const showStats =
		teamHasStats(matchStats.homeTeam) && teamHasStats(matchStats.awayTeam);
	return (
		<section aria-label={'match-info'} css={layoutCss}>
			{showStats && (
				<>
					<FootballMatchStat
						heading="Possession"
						homeTeam={{
							name: matchStats.homeTeam.name,
							colour: matchStats.homeTeam.statsColour,
						}}
						awayTeam={{
							name: matchStats.awayTeam.name,
							colour: matchStats.awayTeam.statsColour,
						}}
						homeValue={matchStats.homeTeam.possession}
						awayValue={matchStats.awayTeam.possession}
						isPercentage={true}
					/>
					<FootballMatchGoalAttempts
						homeTeam={{
							name: matchStats.homeTeam.name,
							colour: matchStats.homeTeam.statsColour,
						}}
						awayTeam={{
							name: matchStats.awayTeam.name,
							colour: matchStats.awayTeam.statsColour,
						}}
						homeValues={{
							onTarget: matchStats.homeTeam.shotsOnTarget,
							offTarget: matchStats.homeTeam.shotsOffTarget,
						}}
						awayValues={{
							onTarget: matchStats.awayTeam.shotsOnTarget,
							offTarget: matchStats.awayTeam.shotsOffTarget,
						}}
					/>
					<FootballMatchStat
						heading="Corners"
						homeTeam={{
							name: matchStats.homeTeam.name,
							colour: matchStats.homeTeam.statsColour,
						}}
						awayTeam={{
							name: matchStats.awayTeam.name,
							colour: matchStats.awayTeam.statsColour,
						}}
						homeValue={matchStats.homeTeam.corners}
						awayValue={matchStats.awayTeam.corners}
					/>
					<FootballMatchStat
						heading="Fouls"
						homeTeam={{
							name: matchStats.homeTeam.name,
							colour: matchStats.homeTeam.statsColour,
						}}
						awayTeam={{
							name: matchStats.awayTeam.name,
							colour: matchStats.awayTeam.statsColour,
						}}
						homeValue={matchStats.homeTeam.fouls}
						awayValue={matchStats.awayTeam.fouls}
					/>
				</>
			)}
			<Lineups matchStats={matchStats} />
			{table && <LeagueTable table={table} />}
		</section>
	);
};
