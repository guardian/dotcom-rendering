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
import { getContrast } from '../lib/colour';
import { palette } from '../palette';

const containerCss = css`
	position: relative;
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

const headerCss = css`
	display: grid;
	grid-template-columns: auto 1fr auto;
	grid-template-areas: 'home-stat label away-stat';
`;

const raiseLabelCss = css`
	${from.desktop} {
		grid-template-areas:
			'label     label label'
			'home-stat .     away-stat';
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

const numberFixContrastCss = css`
	color: ${palette('--football-match-stat-text')};
`;

const awayStatCss = css`
	grid-area: away-stat;
	justify-self: end;
`;

const chartCss = css`
	position: relative;
	display: flex;
	gap: 10px;
`;

const barCss = css`
	height: ${space[2]}px;
	width: var(--match-stat-percentage);
	background-color: var(--match-stat-team-colour);
	border-radius: 8px;
`;

const barFixContrastCss = css`
	border: 1px solid ${palette('--football-match-stat-text')};
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

	const minimumContrast = 3.1; // https://www.w3.org/TR/WCAG21/#contrast-minimum

	const backgroundColour = '#f6f6f6'; // TODO: fetch from palette

	const homeNeedsContrast =
		getContrast(home.teamColour, backgroundColour) < minimumContrast;
	const awayNeedsContrast =
		getContrast(away.teamColour, backgroundColour) < minimumContrast;

	/**
	 * If either team colour lacks sufficient contrast we adjust both numbers
	 * so we don't appear to be favouring one team over the other. For the chart
	 * we keep the team colour and apply a contrasting border colour.
	 */
	const numbersNeedContrast = homeNeedsContrast || awayNeedsContrast;

	return (
		<div css={containerCss}>
			<div css={[headerCss, raiseLabelOnDesktop && raiseLabelCss]}>
				<span css={labelCss}>{label}</span>
				<span
					css={[
						numberCss,
						largeNumbersOnDesktop && largeNumberCss,
						numbersNeedContrast && numberFixContrastCss,
					]}
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
						numbersNeedContrast && numberFixContrastCss,
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
			</div>
			<div aria-hidden="true" css={chartCss}>
				<div
					css={[barCss, homeNeedsContrast && barFixContrastCss]}
					style={{
						'--match-stat-percentage': `${homePercentage}%`,
						'--match-stat-team-colour': home.teamColour,
					}}
				></div>
				<div
					css={[barCss, awayNeedsContrast && barFixContrastCss]}
					style={{
						'--match-stat-percentage': `${awayPercentage}%`,
						'--match-stat-team-colour': away.teamColour,
					}}
				></div>
			</div>
		</div>
	);
};
