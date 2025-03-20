import { css } from '@emotion/react';
import {
	from,
	space,
	textSans14,
	textSansBold14,
	until,
} from '@guardian/source/foundations';
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
	}

	strong,
	th {
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
					<td>{bowler.name}</td>
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
	<table css={tableStyles}>
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
					<td>
						<strong>{batter.name}</strong>
						<div css={hideFromTabletStyle}>{batter.howOut}</div>
					</td>
					<td css={hideUntilTabletStyle}>{batter.howOut}</td>
					<td>{batter.runs}</td>
					<td>{batter.ballsFaced}</td>
					<td css={hideUntilTabletStyle}>{batter.fours}</td>
					<td css={hideUntilTabletStyle}>{batter.sixes}</td>
				</tr>
			))}
			<tr
				css={css`
					td {
						border-top: 0.0625rem dashed
							${palette('--cricket-scorecard-divider')};
					}
				`}
			>
				<td>
					<strong>Extras</strong>
				</td>
				<td css={hideUntilTabletStyle}>
					{getExtrasDescription(extras)}
				</td>
				<td colSpan={4}>{inningsTotals.extras}</td>
			</tr>
			<tr>
				<td>
					<strong>Total</strong>
				</td>
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
					<td>{fallOfWicket.name}</td>
					<td>{fallOfWicket.runs}</td>
				</tr>
			))}
		</tbody>
	</table>
);

type Props = {
	bowlers: BowlerData[];
	batters: BatterData[];
	extras: Extras;
	inningsTotals: InningsTotals;
	fallOfWickets: FallOfWicketData[];
};

export const CricketScorecard = ({
	bowlers,
	batters,
	extras,
	inningsTotals,
	fallOfWickets,
}: Props) => (
	<>
		<Batting
			batters={batters}
			extras={extras}
			inningsTotals={inningsTotals}
		/>
		<Bowling bowlers={bowlers} />
		<FallOfWickets fallOfWickets={fallOfWickets} />
	</>
);
