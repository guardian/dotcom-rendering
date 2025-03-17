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
		team: { name: string; id: string; url: string };
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

function getFootballCrestImageUrl(teamId: string) {
	// todo: use fastly resizer
	return `https://sport.guim.co.uk/football/crests/60/${teamId}.png`;
}

const FootballCrest = ({ teamId }: { teamId: string }) => (
	<div
		css={css`
			width: 1.25rem;
			height: 1.25rem;
			flex-shrink: 0;
			display: flex;
			justify-content: center;
		`}
	>
		<img
			css={css`
				max-width: 100%;
				max-height: 100%;
				object-fit: contain;
			`}
			src={getFootballCrestImageUrl(teamId)}
			alt=""
		/>
	</div>
);

const TeamWithCrest = ({
	team,
	id,
	url,
}: {
	team: string;
	id: string;
	url: string;
}) => (
	<div
		css={css`
			display: flex;
			align-items: center;
			gap: 0.325rem;
		`}
	>
		<FootballCrest teamId={id} />
		<a
			css={css`
				color: inherit;
				text-decoration: none;
			`}
			href={url}
		>
			{team}
		</a>
	</div>
);

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
						<td>
							<TeamWithCrest
								team={row.team.name}
								id={row.team.id}
								url={row.team.url}
							/>
						</td>
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
