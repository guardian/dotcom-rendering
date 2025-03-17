import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import { textSans14 } from '@guardian/source/foundations';
import { palette } from '../palette';

const tableStyles = css`
	width: 100%;
	background: ${palette('--table-block-background')};
	border-top: 0.0625rem solid ${palette('--football-top-border')};
	color: ${palette('--table-block-text')};
	border-collapse: inherit;
`;

const headStyles = css`
	tr {
		font-weight: 800;
		text-align: left;
	}
`;

const rowStyles = css`
	${textSans14};
	:nth-child(odd) > td {
		background-color: ${palette('--table-block-stripe')};
	}

	td,
	th {
		padding: 0.5rem;
	}
`;

const dividerStyle = css`
	td {
		border-top: 0.0625rem dashed ${palette('--football-table-divider')};
	}
`;

const headingAbbreviations: Record<string, string | undefined> = {
	P: 'Position',
	Team: undefined,
	GP: 'Games played',
	W: 'Won',
	D: 'Drawn',
	L: 'Lost',
	F: 'Goals for',
	A: 'Goals against',
	GD: 'Goal difference',
	Pts: 'Points',
};

type Props = {
	competition: {
		url: string;
		name: string;
	};
	dividers: number[];
	data: {
		position: number;
		team: string;
		gamesPlayed: number;
		won: number;
		drawn: number;
		lost: number;
		goalsFor: number;
		goalsAgainst: number;
		goalDifference: number;
		points: number;
	}[];
	linkToFullTable: boolean;
};

export const FootballTable = ({
	competition,
	data,
	dividers,
	linkToFullTable,
}: Props) => {
	return (
		<table css={tableStyles}>
			<thead css={headStyles}>
				<tr css={rowStyles}>
					{Object.entries(headingAbbreviations).map(
						([key, value]) => (
							<th key={key}>
								{isUndefined(value) ? (
									<>{key}</>
								) : (
									<abbr title={value}>{key}</abbr>
								)}
							</th>
						),
					)}
				</tr>
			</thead>
			<tbody>
				{data.map((row) => (
					<tr
						key={row.position}
						css={[
							rowStyles,
							dividers.includes(row.position - 1) && dividerStyle,
						]}
					>
						<td>{row.position}</td>
						<td>{row.team}</td>
						<td>{row.gamesPlayed}</td>
						<td>{row.won}</td>
						<td>{row.drawn}</td>
						<td>{row.lost}</td>
						<td>{row.goalsFor}</td>
						<td>{row.goalsAgainst}</td>
						<td>{row.goalDifference}</td>
						<td>
							<b
								css={css`
									font-weight: 800;
								`}
							>
								{row.points}
							</b>
						</td>
					</tr>
				))}
			</tbody>
			{linkToFullTable && (
				<tfoot>
					<tr css={rowStyles}>
						<td colSpan={11}>
							<a
								href={competition.url}
								css={css`
									text-decoration: none;
									color: ${palette(
										'--football-competition-text',
									)};
									:hover {
										text-decoration: underline;
									}
								`}
							>
								View full {competition.name} table
							</a>
						</td>
					</tr>
				</tfoot>
			)}
		</table>
	);
};
