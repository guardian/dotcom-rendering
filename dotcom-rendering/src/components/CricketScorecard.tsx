import { css } from '@emotion/react';
import {
	from,
	headlineBold17,
	space,
	textEgyptian15,
	textEgyptianBold15,
	textSans14,
	textSansBold14,
	until,
} from '@guardian/source/foundations';
import { Stack } from '@guardian/source/react-components';
import type { ReactNode } from 'react';
import { palette } from '../palette';

const tableStyles = css`
	width: 100%;
	background: ${palette('--table-block-background')};
	border-top: 0.0625rem solid ${palette('--football-match-list-top-border')};
	color: ${palette('--table-block-text')};
	border-collapse: inherit;
	${textSans14};

	caption {
		background: ${palette('--table-block-background')};
		${textSansBold14}
	}

	strong,
	thead > tr > th {
		${textSansBold14}
	}

	caption,
	th,
	td {
		padding: ${space[3]}px ${space[3]}px ${space[2]}px ${space[3]}px;
		text-align: left;
	}

	td {
		border-top: 0.0625rem solid ${palette('--football-match-list-border')};
	}
`;

const hideUntilTabletStyle = css`
	${until.tablet} {
		display: none;
	}
`;

const hideFromTabletStyle = css`
	${from.tablet} {
		display: none;
	}
`;

const cricketScorecardGridStyles = css`
	display: grid;
	grid-template-columns: [centre-column-start] repeat(4, 1fr) [centre-column-end];
	column-gap: 10px;
	${from.mobileLandscape} {
		column-gap: 20px;
	}

	${from.tablet} {
		grid-template-columns: [centre-column-start] repeat(12, 40px) [centre-column-end];
	}

	${from.desktop} {
		grid-template-columns: [centre-column-start] repeat(8, 60px) [centre-column-end];
	}

	${from.leftCol} {
		grid-template-columns:
			[left-column-start] repeat(2, 60px)
			[left-column-end centre-column-start] repeat(8, 60px)
			[centre-column-end];
	}

	${from.wide} {
		grid-template-columns:
			[left-column-start] repeat(3, 60px)
			[left-column-end centre-column-start] repeat(8, 60px)
			[centre-column-end];
	}
`;

const getExtrasDescription = ({
	byes,
	legByes,
	wides,
	noBalls,
	penalties,
}: Extras): ReactNode => (
	// Return HTML because we might be able to give these more accessible descriptions
	<>
		{byes > 0 && `${byes}b `}
		{legByes > 0 && `${legByes}lb `}
		{wides > 0 && `${wides}w `}
		{noBalls > 0 && `${noBalls}nb `}
		{penalties > 0 && `${penalties}p`}
	</>
);

type BowlerData = {
	name: string;
	overs: number;
	maidens: number;
	runs: number;
	wickets: number;
	balls: number;
};

type BatterData = {
	name: string;
	ballsFaced: number;
	runs: number;
	fours: number;
	sixes: number;
	howOut: string;
};

type Extras = {
	byes: number;
	legByes: number;
	noBalls: number;
	penalties: number;
	wides: number;
};

type InningsTotals = {
	runs: number;
	overs: string;
	wickets: number;
	extras: number;
};

type FallOfWicketData = {
	order: number;
	name: string;
	runs: number;
};

type CricketTeam = {
	name: string;
	lineup: string[];
};

type InningsData = {
	description: string;
	bowlers: BowlerData[];
	batters: BatterData[];
	extras: Extras;
	inningsTotals: InningsTotals;
	fallOfWickets: FallOfWicketData[];
};

const Bowling = ({ bowlers }: { bowlers: BowlerData[] }) => (
	<table css={tableStyles}>
		<thead>
			<tr>
				<th>Bowler</th>
				<th>O</th>
				<th>M</th>
				<th>R</th>
				<th>W</th>
			</tr>
		</thead>
		<tbody>
			{bowlers.map((bowler) => (
				<tr key={bowler.name}>
					<th scope="row">{bowler.name}</th>
					<td>
						{bowler.overs}.{bowler.balls % 6}
					</td>
					<td>{bowler.maidens}</td>
					<td>{bowler.runs}</td>
					<td>{bowler.wickets}</td>
				</tr>
			))}
		</tbody>
	</table>
);

const Batting = ({
	batters,
	extras,
	inningsTotals,
}: {
	batters: BatterData[];
	extras: Extras;
	inningsTotals: InningsTotals;
}) => (
	<table
		css={[
			tableStyles,
			css`
				${until.leftCol} {
					border-top: 0.0625rem solid
						${palette('--football-match-list-border')};
				}
			`,
		]}
	>
		<thead>
			<tr>
				<th>Batter</th>
				<th css={hideUntilTabletStyle}></th>
				<th>Runs</th>
				<th>Balls</th>
				<th css={hideUntilTabletStyle}>4s</th>
				<th css={hideUntilTabletStyle}>6s</th>
			</tr>
		</thead>
		<tbody>
			{batters.map((batter) => (
				<tr key={batter.name}>
					<th scope="row">
						<strong>{batter.name}</strong>
						<div css={hideFromTabletStyle}>{batter.howOut}</div>
					</th>
					<td css={hideUntilTabletStyle}>{batter.howOut}</td>
					<td>{batter.runs}</td>
					<td>{batter.ballsFaced}</td>
					<td css={hideUntilTabletStyle}>{batter.fours}</td>
					<td css={hideUntilTabletStyle}>{batter.sixes}</td>
				</tr>
			))}
			<tr
				css={css`
					th,
					td {
						border-top: 0.0625rem dashed
							${palette('--cricket-scorecard-divider')};
					}
				`}
			>
				<th scope="row">
					<strong>Extras</strong>
				</th>
				<td css={hideUntilTabletStyle}>
					{getExtrasDescription(extras)}
				</td>
				<td css={hideUntilTabletStyle} colSpan={4}>
					{inningsTotals.extras}
				</td>
				<td css={hideFromTabletStyle} colSpan={2}>
					{inningsTotals.extras}
				</td>
			</tr>
			<tr>
				<th scope="row">
					<strong>Total</strong>
				</th>
				<td css={hideUntilTabletStyle}>
					<strong>for {inningsTotals.wickets}</strong>
				</td>
				<td>
					<strong>{inningsTotals.runs}</strong>
				</td>
				<td colSpan={3} css={hideUntilTabletStyle}>
					<strong>{inningsTotals.overs} overs</strong>
				</td>
				<td css={hideFromTabletStyle}></td>
			</tr>
		</tbody>
	</table>
);

const FallOfWickets = ({
	fallOfWickets,
}: {
	fallOfWickets: FallOfWicketData[];
}) => (
	<table css={tableStyles}>
		<thead>
			<tr>
				<th colSpan={3}>Fall of wickets</th>
			</tr>
		</thead>
		<tbody>
			{fallOfWickets.map((fallOfWicket) => (
				<tr key={fallOfWicket.order}>
					<td>{fallOfWicket.order}</td>
					<th scope="row">{fallOfWicket.name}</th>
					<td>{fallOfWicket.runs}</td>
				</tr>
			))}
		</tbody>
	</table>
);

type Props = {
	allInnings: InningsData[];
	officials: string[];
	homeTeam: CricketTeam;
	awayTeam: CricketTeam;
};

export const CricketScorecard = ({
	allInnings,
	officials,
	homeTeam,
	awayTeam,
}: Props) => (
	<Stack space={9}>
		{allInnings.map((innings) => (
			<div css={cricketScorecardGridStyles} key={innings.description}>
				<h2
					css={css`
						${textSansBold14}
						grid-column: centre-column-start / centre-column-end;
						border-top: 1px solid
							${palette('--football-match-list-top-border')};
						padding: ${space[2]}px;
						background-color: ${palette(
							'--football-match-list-background',
						)};

						${from.leftCol} {
							border-top-color: ${palette(
								'--football-match-list-border',
							)};
							background-color: transparent;
							margin-top: 0;
							padding: ${space[1]}px 0 0;
							grid-column: left-column-start / left-column-end;
							${headlineBold17}
						}
					`}
				>
					{innings.description}
				</h2>
				<Stack
					space={9}
					cssOverrides={css`
						grid-column: centre-column-start / centre-column-end;
					`}
				>
					<Batting
						batters={innings.batters}
						extras={innings.extras}
						inningsTotals={innings.inningsTotals}
					/>
					<Bowling bowlers={innings.bowlers} />
					<FallOfWickets fallOfWickets={innings.fallOfWickets} />{' '}
				</Stack>
			</div>
		))}
		<div css={cricketScorecardGridStyles}>
			<dl
				css={css`
					grid-column: centre-column-start / centre-column-end;

					dt {
						${textEgyptianBold15}
						line-height: 1.5;
					}

					dd {
						${textEgyptian15}
						margin-inline-start: ${space[10]}px;
						line-height: 1.5;
					}
				`}
			>
				<dt>Umpires</dt>
				<dd>{officials.join(', ')}</dd>

				<dt>{homeTeam.name}</dt>
				<dd>{homeTeam.lineup.join(', ')}</dd>

				<dt>{awayTeam.name}</dt>
				<dd>{awayTeam.lineup.join(', ')}</dd>
			</dl>
		</div>
	</Stack>
);
