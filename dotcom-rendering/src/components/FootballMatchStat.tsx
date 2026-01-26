import { css } from '@emotion/react';
import {
	from,
	palette as sourcePalette,
	space,
	textSans14,
	textSans15,
	textSansBold14,
	textSansBold15,
	textSansBold20,
	textSansBold28,
	visuallyHidden,
} from '@guardian/source/foundations';
import { isLight } from '../lib/isLight';
import { transparentColour } from '../lib/transparentColour';
import { palette } from '../palette';

const containerCss = css`
	position: relative;
	display: grid;
	grid-template-columns: auto 1fr auto;
	grid-template-areas:
		'home-stat heading away-stat'
		'graph     graph   graph';
	padding: 5px 10px 10px;
	color: ${palette('--football-match-stat-text')};
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

const headingSeparateRowCss = css`
	${from.desktop} {
		grid-template-areas:
			'heading   heading heading'
			'home-stat .       away-stat'
			'graph     graph   graph';
	}
`;

const headingCss = css`
	${textSansBold14};
	grid-area: heading;
	justify-self: center;
	${from.desktop} {
		${textSansBold15};
	}
`;

const statCss = css`
	${textSansBold20};
	grid-area: home-stat;
`;

const largeStatCss = css`
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
	border: 1px solid ${palette('--football-match-stat-border')};
	border-radius: 8px;
`;

type Team = {
	name: string;
	colour: string;
};

type MatchStatProps = {
	heading: string;
	homeTeam: Team;
	awayTeam: Team;
	homeValue: number;
	awayValue: number;
	isPercentage?: boolean;
	layout?: 'regular' | 'compact';
	headingLevel?: 2 | 3 | 4;
};

const formatValue = (value: number, showPercentage: boolean) =>
	`${value}${showPercentage ? '%' : ''}`;

export const FootballMatchStat = ({
	heading,
	homeTeam,
	awayTeam,
	homeValue,
	awayValue,
	isPercentage = false,
	layout,
	headingLevel = 3,
}: MatchStatProps) => {
	const Heading: React.ElementType = `h${headingLevel}`;
	const compactLayout = layout === 'compact';
	const homePercentage = (homeValue / (homeValue + awayValue)) * 100;
	const awayPercentage = (awayValue / (homeValue + awayValue)) * 100;

	return (
		<div
			css={[
				containerCss,
				compactLayout && headingSeparateRowCss,
				!compactLayout && desktopPaddingCss,
			]}
		>
			<Heading css={headingCss}>{heading}</Heading>
			<span css={[statCss, !compactLayout && largeStatCss]}>
				<span
					css={css`
						${visuallyHidden}
					`}
				>
					{homeTeam.name}
				</span>
				{formatValue(homeValue, isPercentage)}
			</span>
			<span css={[statCss, awayStatCss, !compactLayout && largeStatCss]}>
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
		'heading       heading'
		'home-attempts away-attempts';
	column-gap: 10px;
	${from.desktop} {
		column-gap: ${space[5]}px;
	}
`;

const offTargetCss = (colour: string) => css`
	${textSans14};
	grid-area: home-attempts;
	margin-top: 5px;
	padding: ${space[1]}px 0 0 6px;
	background-color: ${transparentColour(colour, 0.1)};
	border: 1px solid ${palette('--football-match-stat-border')};
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
`;

const onTargetCss = (colour: string) => css`
	padding: ${space[1]}px 0 0 6px;
	color: ${isLight(colour)
		? sourcePalette.neutral[7]
		: sourcePalette.neutral[100]};
	background-color: ${colour};
	border-top: 1px solid ${palette('--football-match-stat-border')};
	border-left: 1px solid ${palette('--football-match-stat-border')};
	border-radius: 4px;
	width: 80%;
	min-height: 62px;
	justify-self: end;
	${from.desktop} {
		margin-top: -${space[3]}px;
	}
`;

const onTargetAwayCss = css`
	padding-left: 0;
	padding-right: 6px;
	justify-self: start;
	border-left: none;
	border-right: 1px solid ${palette('--football-match-stat-border')};
`;

const attemptCountCss = css`
	display: block;
	${textSansBold20};
	margin-top: -3px;
	${from.desktop} {
		${textSansBold28};
	}
`;

type GoalAttempt = {
	offTarget: number;
	onTarget: number;
};

type GoalAttemptProps = {
	homeTeam: Team;
	awayTeam: Team;
	homeValues: GoalAttempt;
	awayValues: GoalAttempt;
	headingLevel?: 2 | 3 | 4;
};

export const FootballMatchGoalAttempts = ({
	homeTeam,
	awayTeam,
	homeValues,
	awayValues,
	headingLevel = 3,
}: GoalAttemptProps) => {
	const Heading: React.ElementType = `h${headingLevel}`;

	return (
		<div css={[containerCss, desktopPaddingCss, goalAttemptsLayoutCss]}>
			<Heading css={headingCss}>Goal attempts</Heading>
			<span
				css={css`
					${visuallyHidden}
				`}
			>
				{homeTeam.name}
			</span>
			<div css={offTargetCss(homeTeam.colour)}>
				Off target
				<span css={attemptCountCss}>{homeValues.offTarget}</span>
				<div css={onTargetCss(homeTeam.colour)}>
					On target
					<span css={attemptCountCss}>{homeValues.onTarget}</span>
				</div>
			</div>
			<span
				css={css`
					${visuallyHidden}
				`}
			>
				{awayTeam.name}
			</span>
			<div css={[offTargetCss(awayTeam.colour), offTargetAwayCss]}>
				Off target
				<span css={attemptCountCss}>{awayValues.offTarget}</span>
				<div css={[onTargetCss(awayTeam.colour), onTargetAwayCss]}>
					On target
					<span css={attemptCountCss}>{awayValues.onTarget}</span>
				</div>
			</div>
		</div>
	);
};
