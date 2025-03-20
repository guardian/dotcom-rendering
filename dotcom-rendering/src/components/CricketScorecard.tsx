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

type Props = {
	bowlers: BowlerData[];
};

export const CricketScorecard = ({ bowlers }: Props) => (
	<>
		<Bowling bowlers={bowlers} />
	</>
);
