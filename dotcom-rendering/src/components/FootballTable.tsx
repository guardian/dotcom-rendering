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
};

export const FootballTable = ({ data }: Props) => {
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
					<tr key={row.position} css={rowStyles}>
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
		</table>
	);
};
