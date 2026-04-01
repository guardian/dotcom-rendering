import { css } from '@emotion/react';
import {
	from,
	neutral,
	space,
	textSans14,
	textSans15,
	textSansBold14,
	textSansBold15,
} from '@guardian/source/foundations';
import { Fragment, type ReactNode } from 'react';
import type {
	Batter,
	Bowler,
	CricketTeam,
	Extras,
	FallOfWicket,
	Innings,
	InningsTotals,
} from '../cricketMatch';
import { palette } from '../palette';

const responsiveTextSans = css`
	${textSans14}
	${from.desktop} {
		${textSans15}
	}
`;

const responsiveTextSansBold = css`
	${textSansBold14}
	${from.desktop} {
		${textSansBold15}
	}
`;

const cardStyles = css`
	border: 1px solid ${palette('--football-match-stat-border')};
	border-radius: 6px;
	overflow: hidden;
	color: ${palette('--football-match-stat-text')};
	background-color: ${palette('--football-match-info-background')};
`;

const cardSectionStyles = css`
	padding: 0 ${space[3]}px ${space[3]}px;
`;

const sectionHeadingStyles = css`
	border-bottom: 1px solid ${palette('--football-match-stat-border')};
	color: ${palette('--football-match-stat-text')};
	padding: ${space[2]}px 0 ${space[1]}px;
	${responsiveTextSansBold}
`;

const inningsHeadingStyles = css`
	display: flex;
	padding: 6px ${space[3]}px 0;
	flex-direction: column;
	align-items: flex-start;
	gap: ${space[1]}px;
	background: ${palette('--cricket-scorecard-innings-heading-background')};
	color: ${neutral[100]};
	${responsiveTextSansBold}
`;

const tableStyles = css`
	width: 100%;
	border-collapse: collapse;
	${responsiveTextSans}

	thead tr {
		display: flex;
		gap: ${space[3]}px;
		align-items: center;
	}
`;

const cellBaseStyles = css`
	padding: ${space[2]}px ${space[1]}px ${space[1]}px 0;
	text-align: left;
`;

const tableHeadCellStyles = css`
	${cellBaseStyles}
	${responsiveTextSansBold}
	color: ${palette('--football-match-stat-text')};

	&:first-of-type {
		flex: 1;
	}
`;

const tableCellStyles = css`
	${cellBaseStyles}
	${responsiveTextSans}
`;

const tableRowHeaderStyles = css`
	${cellBaseStyles}
	flex: 1;
	${responsiveTextSans}
`;

const rowBaseStyles = css`
	display: flex;
	padding-top: 2px;
	align-items: center;
	gap: ${space[3]}px;
	align-self: stretch;
`;

const tableRowStyles = css`
	${rowBaseStyles}
	border-top: 1px solid ${palette('--football-match-stat-border')};
`;

const numericCellStyles = css`
	white-space: nowrap;
	text-align: left;
`;

const dimmedCellStyles = css`
	opacity: 0.7;
`;

const footerRowStyles = css`
	${rowBaseStyles}
	border-top: 1px solid ${palette('--football-match-stat-border')};
	td,
	th {
		${responsiveTextSansBold}
	}
`;

const hideUntilTabletStyle = css`
	display: none;
	${from.tablet} {
		display: table-cell;
	}
`;

const hideFromTabletStyle = css`
	${from.tablet} {
		display: none;
	}
`;

const extrasDashedRowStyles = css`
	${rowBaseStyles}
	border-top: 1px dashed ${palette('--football-match-stat-border')};
`;

const fowOrderCellStyles = css`
	width: ${space[5]}px;
	text-align: right;
`;

const fowNameStyles = css`
	min-width: 169px;
`;

const howOutStyles = css`
	color: ${palette('--football-match-info-team-number')};
`;

const fixedColStyles = css`
	flex-shrink: 0;
`;

const batColWidthStyles = css`
	${fixedColStyles}
	width: 42px;
`;

const bowlOColStyles = css`
	${fixedColStyles}
	width: 34px;
`;

const bowlStatColStyles = css`
	${fixedColStyles}
	width: 28px;
`;

const noFirstRowBorderStyles = css`
	tbody tr:first-of-type {
		border-top: none;
	}
`;

const overallContainerStyles = css`
	display: flex;
	flex-direction: column;
	gap: ${space[3]}px;
`;

const lineupsHeadingStyles = css`
	${sectionHeadingStyles}
	margin: 0 ${space[3]}px;
`;

const lineupsGridStyles = css`
	${cardSectionStyles}
	display: grid;
	grid-template-columns: 1fr 1fr;
	column-gap: ${space[5]}px;
`;

const teamContainerStyles = css`
	display: flex;
	padding: ${space[2]}px 0 2px 0;
	flex-direction: column;
	align-items: flex-start;
	gap: ${space[2]}px;
	flex: 1 0 0;
`;

const awayTeamDividerStyles = css`
	position: relative;
	padding-left: ${space[5]}px;
	&::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: 1px;
		background-color: ${palette('--football-match-stat-border')};
	}
`;

const teamNameStyles = css`
	${responsiveTextSansBold}
	color: ${palette('--football-match-stat-text')};
	margin: 0;
`;

const playerListStyles = css`
	list-style: none;
	margin: 0;
	padding: 0;
	display: flex;
	flex-direction: column;
	gap: ${space[1]}px;
`;

const playerItemStyles = css`
	${responsiveTextSans}
	color: ${palette('--football-match-stat-text')};
`;

const officialsListStyles = css`
	list-style: none;
	margin: 0;
	padding: ${space[2]}px 0 2px 0;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: ${space[2]}px;
`;

const getExtrasDescription = ({
	byes,
	legByes,
	wides,
	noBalls,
	penalties,
}: Extras): ReactNode => (
	<>
		{byes > 0 && `${byes}b `}
		{legByes > 0 && `${legByes}lb `}
		{wides > 0 && `${wides}w `}
		{noBalls > 0 && `${noBalls}nb `}
		{penalties > 0 && `${penalties}p`}
	</>
);

const SectionHeading = ({ children }: { children: ReactNode }) => (
	<h3 css={sectionHeadingStyles}>{children}</h3>
);

const Batting = ({
	batters,
	extras,
	inningsTotals,
}: {
	batters: Batter[];
	extras: Extras;
	inningsTotals: InningsTotals;
}) => (
	<div css={cardSectionStyles}>
		<table css={tableStyles}>
			<thead>
				<tr>
					<th css={tableHeadCellStyles}>Batter</th>
					<th css={[tableHeadCellStyles, hideUntilTabletStyle]}></th>
					<th
						css={[
							tableHeadCellStyles,
							numericCellStyles,
							batColWidthStyles,
						]}
					>
						Runs
					</th>
					<th
						css={[
							tableHeadCellStyles,
							numericCellStyles,
							batColWidthStyles,
						]}
					>
						Balls
					</th>
					<th
						css={[
							tableHeadCellStyles,
							numericCellStyles,
							hideUntilTabletStyle,
						]}
					>
						4s
					</th>
					<th
						css={[
							tableHeadCellStyles,
							numericCellStyles,
							hideUntilTabletStyle,
						]}
					>
						6s
					</th>
				</tr>
			</thead>
			<tbody>
				{batters.map((batter) => (
					<tr key={batter.name} css={tableRowStyles}>
						<th scope="row" css={tableRowHeaderStyles}>
							{batter.name}
							<div css={[howOutStyles, hideFromTabletStyle]}>
								{batter.howOut}
							</div>
						</th>
						<td
							css={[
								tableCellStyles,
								howOutStyles,
								hideUntilTabletStyle,
							]}
						>
							{batter.howOut}
						</td>
						<td
							css={[
								tableCellStyles,
								numericCellStyles,
								batColWidthStyles,
							]}
						>
							{batter.runs}
						</td>
						<td
							css={[
								tableCellStyles,
								numericCellStyles,
								batColWidthStyles,
							]}
						>
							{batter.ballsFaced}
						</td>
						<td
							css={[
								tableCellStyles,
								numericCellStyles,
								hideUntilTabletStyle,
							]}
						>
							{batter.fours}
						</td>
						<td
							css={[
								tableCellStyles,
								numericCellStyles,
								hideUntilTabletStyle,
							]}
						>
							{batter.sixes}
						</td>
					</tr>
				))}
				<tr css={extrasDashedRowStyles}>
					<th scope="row" css={tableRowHeaderStyles}>
						Extras
					</th>
					<td
						css={[
							tableCellStyles,
							dimmedCellStyles,
							hideUntilTabletStyle,
						]}
					>
						{getExtrasDescription(extras)}
					</td>
					<td css={[tableCellStyles, batColWidthStyles]}>
						{inningsTotals.extras}
					</td>
					<td css={[batColWidthStyles, hideFromTabletStyle]}></td>
				</tr>
			</tbody>
			<tfoot>
				<tr css={footerRowStyles}>
					<th scope="row" css={[tableRowHeaderStyles]}>
						Total
					</th>
					<td
						css={[
							tableCellStyles,
							dimmedCellStyles,
							hideUntilTabletStyle,
						]}
					>
						for {inningsTotals.wickets}
					</td>
					<td css={[tableCellStyles, batColWidthStyles]}>
						{inningsTotals.runs}
					</td>
					<td css={[batColWidthStyles, hideFromTabletStyle]}></td>
					<td
						css={[
							tableCellStyles,
							dimmedCellStyles,
							hideUntilTabletStyle,
						]}
					>
						{inningsTotals.overs} overs
					</td>
				</tr>
			</tfoot>
		</table>
	</div>
);

const Bowling = ({ bowlers }: { bowlers: Bowler[] }) => (
	<div css={cardSectionStyles}>
		<table css={tableStyles}>
			<thead>
				<tr>
					<th css={tableHeadCellStyles}>Bowler</th>
					<th
						css={[
							tableHeadCellStyles,
							numericCellStyles,
							bowlOColStyles,
						]}
					>
						O
					</th>
					<th
						css={[
							tableHeadCellStyles,
							numericCellStyles,
							bowlStatColStyles,
						]}
					>
						M
					</th>
					<th
						css={[
							tableHeadCellStyles,
							numericCellStyles,
							bowlStatColStyles,
						]}
					>
						R
					</th>
					<th
						css={[
							tableHeadCellStyles,
							numericCellStyles,
							bowlStatColStyles,
						]}
					>
						W
					</th>
				</tr>
			</thead>
			<tbody>
				{bowlers.map((bowler) => (
					<tr key={bowler.name} css={tableRowStyles}>
						<th scope="row" css={tableRowHeaderStyles}>
							{bowler.name}
						</th>
						<td
							css={[
								tableCellStyles,
								numericCellStyles,
								bowlOColStyles,
							]}
						>
							{bowler.overs}.{bowler.balls % 6}
						</td>
						<td
							css={[
								tableCellStyles,
								numericCellStyles,
								bowlStatColStyles,
							]}
						>
							{bowler.maidens}
						</td>
						<td
							css={[
								tableCellStyles,
								numericCellStyles,
								bowlStatColStyles,
							]}
						>
							{bowler.runs}
						</td>
						<td
							css={[
								tableCellStyles,
								numericCellStyles,
								bowlStatColStyles,
							]}
						>
							{bowler.wickets}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	</div>
);

const FallOfWickets = ({
	fallOfWickets,
}: {
	fallOfWickets: FallOfWicket[];
}) => (
	<div css={cardSectionStyles}>
		<SectionHeading>Fall of wickets</SectionHeading>
		<table css={[tableStyles, noFirstRowBorderStyles]}>
			<tbody>
				{fallOfWickets.map((fow) => (
					<tr key={fow.order} css={tableRowStyles}>
						<td
							css={[
								tableCellStyles,
								dimmedCellStyles,
								fowOrderCellStyles,
							]}
						>
							{fow.order}
						</td>
						<th scope="row" css={[tableCellStyles, fowNameStyles]}>
							{fow.name}
						</th>
						<td css={tableCellStyles}>{fow.runs}</td>
					</tr>
				))}
			</tbody>
		</table>
	</div>
);

type Props = {
	allInnings: Innings[];
	officials: string[];
	homeTeam: CricketTeam;
	awayTeam: CricketTeam;
};

export const CricketScorecardNew = ({
	allInnings,
	officials,
	homeTeam,
	awayTeam,
}: Props) => (
	<div css={overallContainerStyles}>
		{allInnings.map((innings) => (
			<Fragment key={innings.description}>
				<section css={cardStyles}>
					<h2 css={inningsHeadingStyles}>{innings.description}</h2>
				</section>
				<section css={cardStyles}>
					<Batting
						batters={innings.batters}
						extras={innings.extras}
						inningsTotals={innings.inningsTotals}
					/>
				</section>
				<section css={cardStyles}>
					<Bowling bowlers={innings.bowlers} />
				</section>
				<section css={cardStyles}>
					<FallOfWickets fallOfWickets={innings.fallOfWickets} />
				</section>
			</Fragment>
		))}

		<section css={cardStyles}>
			<h2 css={lineupsHeadingStyles}>Lineups</h2>

			<div css={lineupsGridStyles}>
				{[homeTeam, awayTeam].map((team, i) => (
					<div
						key={team.name}
						css={[
							teamContainerStyles,
							i === 1 ? awayTeamDividerStyles : undefined,
						]}
					>
						<h3 css={teamNameStyles}>{team.name}</h3>
						<ul css={playerListStyles}>
							{team.lineup.map((player) => (
								<li key={player} css={playerItemStyles}>
									{player}
								</li>
							))}
						</ul>
					</div>
				))}
			</div>

			<div css={cardSectionStyles}>
				<SectionHeading>Umpires</SectionHeading>
				<ul css={officialsListStyles}>
					{officials.map((official) => (
						<li key={official} css={playerItemStyles}>
							{official}
						</li>
					))}
				</ul>
			</div>
		</section>
	</div>
);
