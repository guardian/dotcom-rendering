import { css } from '@emotion/react';
import {
	from,
	neutral,
	space,
	textSans14,
	textSans15,
	textSansBold14,
	textSansBold15,
	visuallyHidden,
} from '@guardian/source/foundations';
import { type ReactNode } from 'react';
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

const visuallyHiddenStyles = css`
	${visuallyHidden}
`;

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
	padding: 6px ${space[3]}px;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	gap: ${space[1]}px;
	background: ${palette('--cricket-scorecard-first-team-color')};
	color: ${neutral[100]};
	${responsiveTextSansBold}
`;

const secondTeamInningsHeadingStyles = css`
	background: ${palette('--cricket-scorecard-second-team-color')};
`;

const batIconWrapperStyles = css`
	display: flex;
	width: 24px;
	justify-content: center;
	align-items: center;
	align-self: flex-start;
	padding-top: 2px;
	flex-shrink: 0;
`;

const batIconSvgStyles = css`
	width: 28px;
	height: 28px;
	transform: rotate(-15deg);
	flex-shrink: 0;
`;

const firstTeamBatFillStyles = css`
	fill: ${palette('--cricket-scorecard-first-team-color')};
`;

const secondTeamBatFillStyles = css`
	fill: ${palette('--cricket-scorecard-second-team-color')};
`;

const tableStyles = css`
	width: 100%;
	border-collapse: collapse;
	${responsiveTextSans}
`;

const cellBaseStyles = css`
	padding: ${space[2]}px ${space[3]}px ${space[1]}px 0;
	text-align: left;
	vertical-align: middle;
`;

const tableHeadCellStyles = css`
	${cellBaseStyles}
	${responsiveTextSansBold}
	color: ${palette('--football-match-stat-text')};
`;

const tableCellStyles = css`
	${cellBaseStyles}
	${responsiveTextSans}
`;

const tableRowHeaderStyles = css`
	${cellBaseStyles}
	display: flex;
	align-items: center;
	${responsiveTextSans}
`;

const batterNameTextStyles = css`
	display: flex;
	flex-direction: column;
`;

const rowBaseStyles = css``;

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

const inningsContainerStyles = css`
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
	margin: 0;
`;

const homeTeamNameStyles = css`
	color: ${palette('--cricket-scorecard-first-team-color')};
`;

const awayTeamNameStyles = css`
	color: ${palette('--cricket-scorecard-second-team-color')};
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

const BatIcon = ({ isHomeTeam }: { isHomeTeam: boolean }) => (
	<div css={batIconWrapperStyles}>
		<svg
			css={[
				batIconSvgStyles,
				isHomeTeam ? firstTeamBatFillStyles : secondTeamBatFillStyles,
			]}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 23 33"
			aria-hidden="true"
		>
			<path d="M19.495 0.693989C19.878 0.0306164 20.7267 -0.196713 21.39 0.186208C22.0535 0.56923 22.2808 1.41786 21.8978 2.08127L16.6861 11.1068L18.0007 14.466C18.2217 15.0318 18.1727 15.6676 17.8692 16.1937L8.84804 31.8188C8.29575 32.7753 7.07192 33.1033 6.11534 32.551L16.1373 15.1938L14.7607 11.6713L14.4876 11.7121L6.61506 25.3491C6.45714 25.6225 6.10745 25.7162 5.83402 25.5584C5.56074 25.4005 5.46698 25.0507 5.62474 24.7773L13.0401 11.9321L11.0216 12.2394L1.99977 27.8657L7.11523 30.8191L6.11534 32.551L0.999874 29.5976C0.0433324 29.0453 -0.28428 27.8224 0.267901 26.8658L9.28878 11.2398C9.5546 10.7796 9.99141 10.4473 10.4985 10.3101L10.7204 10.2627L14.2842 9.71931L19.495 0.693989Z" />
		</svg>
	</div>
);

const Batting = ({
	batters,
	extras,
	inningsTotals,
	isHomeTeam,
	showBatIcons,
}: {
	batters: Batter[];
	extras: Extras;
	inningsTotals: InningsTotals;
	isHomeTeam: boolean;
	showBatIcons: boolean;
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
				{batters.map((batter) => {
					const isAtCrease = showBatIcons && !batter.out;
					return (
						<tr key={batter.name} css={tableRowStyles}>
							<th scope="row" css={tableRowHeaderStyles}>
								{isAtCrease && (
									<>
										<BatIcon isHomeTeam={isHomeTeam} />
										<span css={visuallyHiddenStyles}>
											{batter.onStrike
												? '(on strike)'
												: '(at crease)'}
										</span>
									</>
								)}
								<div css={batterNameTextStyles}>
									{batter.name}
									<div
										css={[
											howOutStyles,
											hideFromTabletStyle,
										]}
									>
										{batter.howOut}
									</div>
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
					);
				})}
				<tr css={extrasDashedRowStyles}>
					<th scope="row" css={tableRowHeaderStyles}>
						<div css={batterNameTextStyles}>
							Extras
							<div css={[howOutStyles, hideFromTabletStyle]}>
								{getExtrasDescription(extras)}
							</div>
						</div>
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
						<div css={batterNameTextStyles}>
							Total
							<div css={[howOutStyles, hideFromTabletStyle]}>
								for {inningsTotals.wickets}
							</div>
						</div>
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
	matchResult: string;
};

export const CricketScorecardNew = ({
	allInnings,
	officials,
	homeTeam,
	awayTeam,
	matchResult,
}: Props) => (
	<div css={overallContainerStyles}>
		{allInnings.map((innings, index) => {
			const isHomeTeam = innings.battingTeam === homeTeam.name;
			const isCurrentInnings =
				matchResult !== 'result' && index === allInnings.length - 1;
			return (
				<section key={innings.description} css={inningsContainerStyles}>
					<div css={cardStyles}>
						<h2
							css={[
								inningsHeadingStyles,
								!isHomeTeam && secondTeamInningsHeadingStyles,
							]}
						>
							{innings.description}
						</h2>
					</div>
					<div css={cardStyles}>
						<Batting
							batters={innings.batters}
							extras={innings.extras}
							inningsTotals={innings.inningsTotals}
							isHomeTeam={isHomeTeam}
							showBatIcons={isCurrentInnings}
						/>
					</div>
					<div css={cardStyles}>
						<Bowling bowlers={innings.bowlers} />
					</div>
					<div css={cardStyles}>
						<FallOfWickets fallOfWickets={innings.fallOfWickets} />
					</div>
				</section>
			);
		})}

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
						<h3
							css={[
								teamNameStyles,
								i === 0
									? homeTeamNameStyles
									: awayTeamNameStyles,
							]}
						>
							{team.name}
						</h3>
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
