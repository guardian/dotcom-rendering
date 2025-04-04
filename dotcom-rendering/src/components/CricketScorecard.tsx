import { css } from '@emotion/react';
import {
	article15,
	articleBold15,
	from,
	headlineBold17,
	space,
	textSans14,
	textSansBold14,
	until,
} from '@guardian/source/foundations';
import { Stack } from '@guardian/source/react-components';
import type { ReactNode } from 'react';
import type {
	BatterData,
	BowlerData,
	CricketTeam,
	Extras,
	FallOfWicketData,
	InningsData,
	InningsTotals,
} from '../cricketMatch';
import { palette } from '../palette';

const borderStyle = css`
	border-top: 0.0625rem solid ${palette('--sport-list-border')};
`;

const tableStyles = css`
	width: 100%;
	background: ${palette('--table-block-background')};
	border-top: 0.0625rem solid ${palette('--sport-top-border')};
	color: ${palette('--table-block-text')};
	border-collapse: inherit;
	${textSans14};

	caption {
		background: ${palette('--table-block-background')};
		${textSansBold14}
	}

	tfoot,
	thead > tr > th {
		${textSansBold14}
	}

	caption,
	th,
	td {
		padding: ${space[3]}px ${space[3]}px ${space[2]}px ${space[3]}px;
		text-align: left;
	}

	tfoot > tr > *,
	td {
		${borderStyle}
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
					<th scope="row" css={borderStyle}>
						{bowler.name}
					</th>
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
					${borderStyle}
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
					<th scope="row" css={borderStyle}>
						<span
							css={css`
								${textSansBold14}
							`}
						>
							{batter.name}
						</span>
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
				<th
					scope="row"
					css={css`
						${textSansBold14}
					`}
				>
					Extras
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
		</tbody>
		<tfoot>
			<tr>
				<th scope="row">Total</th>
				<td css={hideUntilTabletStyle}>for {inningsTotals.wickets}</td>
				<td>{inningsTotals.runs}</td>
				<td colSpan={3} css={hideUntilTabletStyle}>
					{inningsTotals.overs} overs
				</td>
				<td css={hideFromTabletStyle}></td>
			</tr>
		</tfoot>
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
					<th css={borderStyle} scope="row">
						{fallOfWicket.name}
					</th>
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
			<section css={cricketScorecardGridStyles} key={innings.description}>
				<h2
					css={css`
						${textSansBold14}
						grid-column: centre-column-start / centre-column-end;
						border-top: 1px solid ${palette('--sport-top-border')};
						padding: ${space[2]}px;
						background-color: ${palette('--sport-list-background')};

						${from.leftCol} {
							border-top-color: ${palette('--sport-list-border')};
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
			</section>
		))}
		<div css={cricketScorecardGridStyles}>
			<dl
				css={css`
					grid-column: centre-column-start / centre-column-end;

					dt {
						${articleBold15}
					}

					dd {
						${article15}
						margin-inline-start: ${space[10]}px;
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
