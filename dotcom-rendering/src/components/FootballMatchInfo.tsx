import { css } from '@emotion/react';
import type {
	FootballMatchStats,
	FootballMatchTeamWithStats,
} from '../footballMatchStats';
import type { FootballTable as FootballTableData } from '../footballTables';
import { grid } from '../grid';
import { FootballMatchStat } from './FootballMatchStat';
import { LeagueTable } from './LeagueTable';
import { Lineups } from './Lineups';

type Props = {
	match: FootballMatchStats;
	table?: FootballTableData;
};

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
		<section aria-label={'match-info'}>
			{showStats && (
				<>
					<StatsContainer
						label="Possession"
						match={match}
						homeValue={match.homeTeam.possession}
						awayValue={match.awayTeam.possession}
					/>
					{/* Add Goal Attempts here */}
					<StatsContainer
						label="Corrners"
						match={match}
						homeValue={match.homeTeam.corners}
						awayValue={match.awayTeam.corners}
					/>
					<StatsContainer
						label="Fouls"
						match={match}
						homeValue={match.homeTeam.fouls}
						awayValue={match.awayTeam.fouls}
					/>
				</>
			)}

			{showLineups && (
				<div
					css={css`
						padding-bottom: 10px;
					`}
				>
					<Lineups matchStats={match} />
				</div>
			)}
			{table && (
				<div
					css={css`
						padding-bottom: 10px;
					`}
				>
					<LeagueTable table={table} />
				</div>
			)}
		</section>
	);
};

const StatsContainer = ({
	label,
	match,
	homeValue,
	awayValue,
}: {
	label: string;
	match: FootballMatchStats;
	homeValue: number;
	awayValue: number;
}) => (
	<div
		css={css`
			${grid.column.centre}
			padding-bottom: 10px;
		`}
	>
		<FootballMatchStat
			label={label}
			home={{
				teamName: match.homeTeam.name,
				teamColour: match.homeTeam.statsColour,
				value: homeValue,
			}}
			away={{
				teamName: match.awayTeam.name,
				teamColour: match.awayTeam.statsColour,
				value: awayValue,
			}}
		/>
	</div>
);
