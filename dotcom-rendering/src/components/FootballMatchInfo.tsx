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
						isPercentage={true}
					/>
					{/* Add Goal Attempts here */}
					<StatsContainer
						label="Corners"
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
	isPercentage = false,
}: {
	label: string;
	match: FootballMatchStats;
	homeValue: number;
	awayValue: number;
	isPercentage?: boolean;
}) => (
	<div
		css={css`
			${grid.column.centre}
			padding-bottom: 10px;
		`}
	>
		<FootballMatchStat
			label={label}
			homeTeam={{
				name: match.homeTeam.name,
				colour: match.homeTeam.statsColour,
			}}
			awayTeam={{
				name: match.awayTeam.name,
				colour: match.awayTeam.statsColour,
			}}
			homeValue={homeValue}
			awayValue={awayValue}
			isPercentage={isPercentage}
		/>
	</div>
);
