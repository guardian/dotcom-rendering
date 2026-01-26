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
	match: FootballMatchStats;
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

export const FootballMatchInfo = ({ match, table }: Props) => {
	const showStats =
		teamHasStats(match.homeTeam) && teamHasStats(match.awayTeam);
	const showLineups =
		match.homeTeam.players.length > 0 && match.awayTeam.players.length > 0;
	return (
		<section aria-label={'match-info'} css={layoutCss}>
			{showStats && (
				<>
					<FootballMatchStat
						label="Possession"
						homeTeam={{
							name: match.homeTeam.name,
							colour: match.homeTeam.statsColour,
						}}
						awayTeam={{
							name: match.awayTeam.name,
							colour: match.awayTeam.statsColour,
						}}
						homeValue={match.homeTeam.possession}
						awayValue={match.awayTeam.possession}
						isPercentage={true}
					/>
					<FootballMatchGoalAttempts
						homeTeam={{
							name: match.homeTeam.name,
							colour: match.homeTeam.statsColour,
						}}
						awayTeam={{
							name: match.awayTeam.name,
							colour: match.awayTeam.statsColour,
						}}
						homeValues={{
							onTarget: match.homeTeam.shotsOnTarget,
							offTarget: match.homeTeam.shotsOffTarget,
						}}
						awayValues={{
							onTarget: match.awayTeam.shotsOnTarget,
							offTarget: match.awayTeam.shotsOffTarget,
						}}
					/>
					<FootballMatchStat
						label="Corners"
						homeTeam={{
							name: match.homeTeam.name,
							colour: match.homeTeam.statsColour,
						}}
						awayTeam={{
							name: match.awayTeam.name,
							colour: match.awayTeam.statsColour,
						}}
						homeValue={match.homeTeam.corners}
						awayValue={match.awayTeam.corners}
					/>
					<FootballMatchStat
						label="Fouls"
						homeTeam={{
							name: match.homeTeam.name,
							colour: match.homeTeam.statsColour,
						}}
						awayTeam={{
							name: match.awayTeam.name,
							colour: match.awayTeam.statsColour,
						}}
						homeValue={match.homeTeam.fouls}
						awayValue={match.awayTeam.fouls}
					/>
				</>
			)}
			{showLineups && <Lineups matchStats={match} />}
			{table && <LeagueTable table={table} />}
		</section>
	);
};
