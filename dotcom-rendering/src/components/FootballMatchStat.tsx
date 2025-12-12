import { css } from '@emotion/react';
import {
	from,
	space,
	textSansBold14,
	textSansBold15,
	textSansBold20,
	textSansBold28,
	visuallyHidden,
} from '@guardian/source/foundations';
import { palette } from '../palette';

const containerCss = css`
	position: relative;
	display: grid;
	grid-template-columns: auto 1fr auto;
	grid-template-areas:
		'home-stat label away-stat'
		'graph     graph  graph';
	padding: 5px 10px 10px;
	border: 1px solid ${palette('--football-match-stat-border')};
	border-radius: 6px;
	&::before {
		position: absolute;
		content: '';
		left: 50%;
		bottom: 0;
		width: 1px;
		height: ${space[6]}px;
		background-color: ${palette('--football-match-stat-border')};
	}
`;

const raiseLabelCss = css`
	${from.desktop} {
		grid-template-areas:
			'label     label label'
			'home-stat .     away-stat'
			'graph     graph graph';
	}
`;

const labelCss = css`
	${textSansBold14};
	grid-area: label;
	justify-self: center;
	color: ${palette('--football-match-stat-text')};
	${from.desktop} {
		${textSansBold15};
	}
`;

const numberCss = css`
	${textSansBold20};
	grid-area: home-stat;
	color: var(--match-stat-team-colour);
`;

const largeNumberCss = css`
	${from.desktop} {
		${textSansBold28}
	}
`;

const awayStatCss = css`
	grid-area: away-stat;
	justify-self: end;
`;

const graphCss = css`
	position: relative;
	display: flex;
	gap: 10px;
	grid-area: graph;
`;

const barCss = css`
	height: ${space[2]}px;
	width: var(--match-stat-percentage);
	background-color: var(--match-stat-team-colour);
	border-radius: 8px;
`;

type MatchStatistic = {
	teamName: string;
	teamColour: string;
	value: number;
};

type Props = {
	label: string;
	home: MatchStatistic;
	away: MatchStatistic;
	showPercentage?: boolean;
	raiseLabelOnDesktop?: boolean;
	largeNumbersOnDesktop?: boolean;
};

const formatValue = (value: number, showPercentage: boolean) =>
	`${value}${showPercentage ? '%' : ''}`;

export const FootballMatchStat = ({
	label,
	home,
	away,
	showPercentage = false,
	raiseLabelOnDesktop = false,
	largeNumbersOnDesktop = false,
}: Props) => {
	const homePercentage = (home.value / (home.value + away.value)) * 100;
	const awayPercentage = (away.value / (home.value + away.value)) * 100;

	return (
		<div css={[containerCss, raiseLabelOnDesktop && raiseLabelCss]}>
			<span css={labelCss}>{label}</span>
			<span
				css={[numberCss, largeNumbersOnDesktop && largeNumberCss]}
				style={{ '--match-stat-team-colour': home.teamColour }}
			>
				<span
					css={css`
						${visuallyHidden}
					`}
				>
					{home.teamName}
				</span>
				{formatValue(home.value, showPercentage)}
			</span>
			<span
				css={[
					numberCss,
					awayStatCss,
					largeNumbersOnDesktop && largeNumberCss,
				]}
				style={{ '--match-stat-team-colour': away.teamColour }}
			>
				<span
					css={css`
						${visuallyHidden}
					`}
				>
					{away.teamName}
				</span>
				{formatValue(away.value, showPercentage)}
			</span>
			<div aria-hidden="true" css={graphCss}>
				<div
					css={barCss}
					style={{
						'--match-stat-percentage': `${homePercentage}%`,
						'--match-stat-team-colour': home.teamColour,
					}}
				></div>
				<div
					css={barCss}
					style={{
						'--match-stat-percentage': `${awayPercentage}%`,
						'--match-stat-team-colour': away.teamColour,
					}}
				></div>
			</div>
		</div>
	);
};
