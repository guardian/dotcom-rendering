import { css } from '@emotion/react';
import {
	from,
	space,
	textSans14,
	textSans15,
	textSansBold14,
	textSansBold15,
} from '@guardian/source/foundations';
import type { EntrySummary, FootballTableSummary } from '../footballTables';
import { palette } from '../palette';

type Props = {
	table: FootballTableSummary;
};

export const LeagueTable = ({ table }: Props) => {
	return (
		<section css={leagueTableSection} aria-label={'league-table'}>
			<Title text="League table" aria-hidden="true" />
			<Table table={table} />
		</section>
	);
};

const Title = ({ text }: { text: string }) => (
	<h3
		css={css`
			${textSansBold14}
			border-bottom: 1px solid ${palette('--football-match-stat-border')};
			color: ${palette('--football-match-stat-text')};
			padding-bottom: ${space[1]}px;
			${from.phablet} {
				${textSansBold15}
				padding-bottom: ${space[2]}px;
			}
		`}
	>
		{text}
	</h3>
);

const Table = ({ table }: { table: FootballTableSummary }) => {
	return (
		<table
			css={css`
				width: 100%;
			`}
		>
			<thead>
				<tr css={[gridContainer, tableHeaders]}>
					<th css={between('pos', 'team')} scope="col">
						Pos
					</th>
					<th css={between('team', 'games-played')} scope="col">
						Team
					</th>
					<th css={between('games-played', 'gd')} scope="col">
						P
					</th>
					<th css={between('gd', 'points')} scope="col">
						GD
					</th>
					<th css={between('points', 'end')} scope="col">
						Pts
					</th>
				</tr>
			</thead>
			<tbody>
				{table.entries.map((teamData) => (
					<TableRow key={teamData.position} entry={teamData} />
				))}
			</tbody>
		</table>
	);
};

const TableRow = ({ entry }: { entry: EntrySummary }) => {
	return (
		<tr css={[gridContainer, tableRowStyles]}>
			<th scope="row" css={[between('pos', 'team'), position]}>
				{entry.position}
			</th>

			<td css={between('team', 'games-played')}>{entry.team.name}</td>

			<td css={between('games-played', 'gd')}>{entry.gamesPlayed}</td>
			<td css={between('gd', 'points')}>{entry.goalDifference}</td>

			<td css={[between('points', 'end'), pointsText]}>
				<strong>{entry.points}</strong>
			</td>
		</tr>
	);
};

const leagueTableSection = css`
	border: 1px solid ${palette('--football-match-stat-border')};
	border-radius: 6px;
	background-color: ${palette('--football-match-info-background')};
	padding: 5px 10px 9px 10px;
`;

const tableRowStyles = css`
	${textSans14}
	${from.phablet} {
		${textSans15}
	}

	&:last-child {
		padding-bottom: 0px;
		border-bottom: none;
	}
`;

const gridContainer = css`
	display: grid;
	grid-template-columns: [pos] 1fr [team] 7.041fr [games-played] 1.166fr [gd] 1.166fr [points] 1.583fr [end];
	width: 100%;
	column-gap: 12px;
	border-bottom: 1px solid ${palette('--football-match-stat-border')};

	padding-top: 1px;
	padding-bottom: ${space[2]}px;

	color: ${palette('--football-match-stat-text')};

	${from.phablet} {
		grid-template-columns: [pos] 1fr [team] 16.76fr [games-played] 1.12fr [gd] 1.12fr [points] 2.88fr [end];
	}
`;

const tableHeaders = css`
	${textSansBold14}
	th {
		text-align: left;
	}
	${from.phablet} {
		${textSansBold15}
	}
`;

const position = css`
	color: ${palette('--football-match-info-team-number')};
	text-align: left;
`;

const pointsText = css`
	${textSansBold14}
	${from.phablet} {
		${textSansBold15}
	}
`;

type GridCol = 'pos' | 'team' | 'games-played' | 'gd' | 'points' | 'end';
const between = (start: GridCol, end: GridCol) => css`
	grid-column: ${start} / ${end};
`;
