import { css } from '@emotion/react';
import {
	from,
	space,
	textSans14,
	textSans15,
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
		height: calc(100% - 25px);
		background-color: ${palette('--football-match-stat-border')};
	}
	${from.desktop} {
		&::before {
			height: calc(100% - 27px);
		}
	}
`;

const desktopPaddingCss = css`
	${from.desktop} {
		padding-bottom: 14px;
	}
`;

const labelSeparateRowCss = css`
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

type Team = {
	name: string;
	colour: string;
};

type MatchStatProps = {
	label: string;
	homeTeam: Team;
	awayTeam: Team;
	homeValue: number;
	awayValue: number;
	layout?: 'regular' | 'compact';
	isPercentage?: boolean;
};

const formatValue = (value: number, showPercentage: boolean) =>
	`${value}${showPercentage ? '%' : ''}`;

export const FootballMatchStat = ({
	label,
	homeTeam,
	awayTeam,
	homeValue,
	awayValue,
	layout,
	isPercentage = false,
}: MatchStatProps) => {
	const compactLayout = layout === 'compact';
	const homePercentage = (homeValue / (homeValue + awayValue)) * 100;
	const awayPercentage = (awayValue / (homeValue + awayValue)) * 100;

	return (
		<div
			css={[
				containerCss,
				compactLayout && labelSeparateRowCss,
				!compactLayout && desktopPaddingCss,
			]}
		>
			<span css={labelCss}>{label}</span>
			<span
				css={[numberCss, !compactLayout && largeNumberCss]}
				style={{ '--match-stat-team-colour': homeTeam.colour }}
			>
				<span
					css={css`
						${visuallyHidden}
					`}
				>
					{homeTeam.name}
				</span>
				{formatValue(homeValue, isPercentage)}
			</span>
			<span
				css={[numberCss, awayStatCss, !compactLayout && largeNumberCss]}
				style={{ '--match-stat-team-colour': awayTeam.colour }}
			>
				<span
					css={css`
						${visuallyHidden}
					`}
				>
					{awayTeam.name}
				</span>
				{formatValue(awayValue, isPercentage)}
			</span>
			<div aria-hidden="true" css={graphCss}>
				<div
					css={barCss}
					style={{
						'--match-stat-percentage': `${homePercentage}%`,
						'--match-stat-team-colour': homeTeam.colour,
					}}
				></div>
				<div
					css={barCss}
					style={{
						'--match-stat-percentage': `${awayPercentage}%`,
						'--match-stat-team-colour': awayTeam.colour,
					}}
				></div>
			</div>
		</div>
	);
};

const goalAttemptsLayoutCss = css`
	grid-template-columns: 1fr 1fr;
	grid-template-areas:
		'label         label'
		'home-attempts away-attempts';
	column-gap: 10px;
	${from.desktop} {
		column-gap: 20px;
	}
`;

const offTargetCss = css`
	${textSans14};
	grid-area: home-attempts;
	margin-top: 5px;
	padding: ${space[2]}px 0 0 6px;
	background-color: rgba(218, 2, 14, 0.1);
	border-radius: 4px;
	${from.desktop} {
		${textSans15};
	}
`;

const offTargetAwayCss = css`
	grid-area: away-attempts;
	text-align: right;
	padding-left: 0;
	padding-right: 6px;
	background-color: rgba(2, 52, 116, 0.1);
`;

const onTargetCss = css`
	padding: ${space[2]}px 0 0 6px;
	color: #fff;
	background-color: rgba(218, 2, 14, 1);
	border-radius: 4px;
	width: 80%;
	justify-self: end;
`;

const onTargetAwayCss = css`
	padding-left: 0;
	padding-right: 6px;
	background-color: rgba(2, 52, 116, 1);
	justify-self: start;
`;

const attemptCountCss = css`
	display: block;
	${textSansBold20};
	${from.desktop} {
		${textSansBold28};
	}
`;

type GoalAttemptProps = {
	homeTeam: Team;
	awayTeam: Team;
};

export const FootballMatchGoalAttempts = ({
	homeTeam,
	awayTeam,
}: GoalAttemptProps) => {
	return (
		<div css={[containerCss, desktopPaddingCss, goalAttemptsLayoutCss]}>
			<div css={labelCss}>Goal attempts</div>
			<div css={offTargetCss}>
				Off target
				<span css={attemptCountCss}>6</span>
				<div css={onTargetCss}>
					On target
					<span css={attemptCountCss}>5</span>
				</div>
			</div>
			<div css={[offTargetCss, offTargetAwayCss]}>
				Off target
				<span css={attemptCountCss}>6</span>
				<div css={[onTargetCss, onTargetAwayCss]}>
					On target
					<span css={attemptCountCss}>2</span>
				</div>
			</div>
		</div>
	);
};
