import { css } from '@emotion/react';
import { from, textSans14, until } from '@guardian/source/foundations';
import type { FootballTableData } from '../footballTables';
import { palette } from '../palette';
import { FootballTableForm } from './FootballTableForm';

const tableStyles = css`
	width: 100%;
	background: ${palette('--table-block-background')};
	${until.leftCol} {
		border-top: 0.0625rem solid ${palette('--table-block-stripe')};
	}
	${from.leftCol} {
		border-top: 0.0625rem solid ${palette('--football-top-border')};
	}
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
	:nth-child(odd) > td,
	:nth-child(odd) > th {
		background-color: ${palette('--table-block-stripe')};
	}

	td,
	th {
		vertical-align: middle;
		padding: 0.5rem;
	}
`;

const dividerStyle = css`
	td,
	th {
		border-top: 0.0625rem dashed ${palette('--football-table-divider')};
	}
`;

const hideUntilTabletStyle = css`
	${until.tablet} {
		display: none;
	}
`;

const linkStyles = css`
	text-decoration: none;
	color: ${palette('--football-competition-text')};
	:hover {
		text-decoration: underline;
	}
`;

type Props = {
	competitionName: string;
	competitionUrl: string;
	table: FootballTableData;
	dividers: number[];
	hasLinkToFullTable: boolean;
	guardianBaseUrl: string;
};

function getFootballCrestImageUrl(teamId: string) {
	// todo: use fastly resizer
	return `https://sport.guim.co.uk/football/crests/60/${teamId}.png`;
}

const FullTableLink = ({
	competitionName,
	competitionUrl,
	guardianBaseUrl,
}: {
	competitionName: string;
	competitionUrl: string;
	guardianBaseUrl: string;
}) => (
	<a href={`${guardianBaseUrl}${competitionUrl}/table`} css={linkStyles}>
		View full {competitionName} table
	</a>
);

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
	competitionName,
	competitionUrl,
	table,
	dividers,
	hasLinkToFullTable,
	guardianBaseUrl,
}: Props) => (
	<table css={tableStyles}>
		<thead css={headStyles}>
			<tr css={rowStyles}>
				<th
					css={css`
						color: ${palette('--football-sub-text')};
					`}
				>
					<abbr title="Position">P</abbr>
				</th>
				<th>Team</th>
				<th>
					<abbr title="Games played">GP</abbr>
				</th>
				<th css={hideUntilTabletStyle}>
					<abbr title="Won">W</abbr>
				</th>
				<th css={hideUntilTabletStyle}>
					<abbr title="Drawn">D</abbr>
				</th>
				<th css={hideUntilTabletStyle}>
					<abbr title="Lost">L</abbr>
				</th>
				<th css={hideUntilTabletStyle}>
					<abbr title="Goals for">F</abbr>
				</th>
				<th css={hideUntilTabletStyle}>
					<abbr title="Goals against">A</abbr>
				</th>
				<th>
					<abbr title="Goal difference">GD</abbr>
				</th>
				<th>
					<abbr title="Points">Pts</abbr>
				</th>
				<th>
					<abbr title="Results of previous games">Form</abbr>
				</th>
			</tr>
		</thead>
		<tbody>
			{table.entries.map((row) => (
				<tr
					key={row.position}
					css={[
						rowStyles,
						dividers.includes(row.position - 1) && dividerStyle,
					]}
				>
					<td
						css={css`
							color: ${palette('--football-sub-text')};
						`}
					>
						{row.position}
					</td>
					<th scope="row">
						<TeamWithCrest
							team={row.team.name}
							id={row.team.id}
							url={row.team.url}
						/>
					</th>
					<td>{row.gamesPlayed}</td>
					<td css={hideUntilTabletStyle}>{row.won}</td>
					<td css={hideUntilTabletStyle}>{row.drawn}</td>
					<td css={hideUntilTabletStyle}>{row.lost}</td>
					<td css={hideUntilTabletStyle}>{row.goalsFor}</td>
					<td css={hideUntilTabletStyle}>{row.goalsAgainst}</td>
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
					<td>
						<FootballTableForm teamResults={row.results} />
					</td>
				</tr>
			))}
		</tbody>
		{hasLinkToFullTable && (
			<tfoot>
				<tr css={rowStyles}>
					<td colSpan={11} css={hideUntilTabletStyle}>
						<FullTableLink
							competitionName={competitionName}
							competitionUrl={competitionUrl}
							guardianBaseUrl={guardianBaseUrl}
						/>
					</td>
					<td
						colSpan={6}
						css={css`
							${from.tablet} {
								display: none;
							}
						`}
					>
						<FullTableLink
							competitionName={competitionName}
							competitionUrl={competitionUrl}
							guardianBaseUrl={guardianBaseUrl}
						/>
					</td>
				</tr>
			</tfoot>
		)}
	</table>
);
