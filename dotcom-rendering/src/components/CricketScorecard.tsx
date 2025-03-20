import { css } from '@emotion/react';
import {
	space,
	textSans14,
	textSansBold14,
} from '@guardian/source/foundations';
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

const Batting = ({ batters }: { batters: BatterData[] }) => (
	<table css={tableStyles}>
		<thead>
			<tr>
				<th colSpan={2}>Batter</th>
				<th>Runs</th>
				<th>Balls</th>
				<th>4s</th>
				<th>6s</th>
			</tr>
		</thead>
		<tbody>
			{batters.map((batter) => (
				<tr key={batter.name}>
					<td>{batter.name}</td>
					<td>{batter.howOut}</td>
					<td>{batter.runs}</td>
					<td>{batter.ballsFaced}</td>
					<td>{batter.fours}</td>
					<td>{batter.sixes}</td>
				</tr>
			))}
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
	fallOfWickets: FallOfWicketData[];
};

export const CricketScorecard = ({
	bowlers,
	batters,
	fallOfWickets,
}: Props) => (
	<>
		<Batting batters={batters} />
		<Bowling bowlers={bowlers} />
		<FallOfWickets fallOfWickets={fallOfWickets} />
	</>
);
