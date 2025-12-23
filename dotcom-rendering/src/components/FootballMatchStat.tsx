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
import { getBrightness } from '../lib/colour';
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
	color: ${palette('--football-match-stat-text')};
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

const barAddContrastLightCss = css`
	@media (prefers-color-scheme: light) {
		border: 1px solid ${palette('--football-match-stat-border')};
	}
	[data-color-scheme='light'] & {
		border: 1px solid ${palette('--football-match-stat-border')};
	}
`;

const barAddContrastDarkCss = css`
	@media (prefers-color-scheme: dark) {
		border: 1px solid ${palette('--football-match-stat-border')};
	}
	[data-color-scheme='dark'] & {
		border: 1px solid ${palette('--football-match-stat-border')};
	}
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

	const homeColourBrightness = getBrightness(home.teamColour);
	const awayColourBrightness = getBrightness(away.teamColour);
	const awayNeedsContrastWhenLight = awayColourBrightness > 205;
	const homeNeedsContrastWhenLight = homeColourBrightness > 205;
	const awayNeedsContrastWhenDark = awayColourBrightness < 50;
	const homeNeedsContrastWhenDark = homeColourBrightness < 50;

	return (
		<div css={containerCss}>
			<div css={[headerCss, raiseLabelOnDesktop && raiseLabelCss]}>
				<span css={labelCss}>{label}</span>
				<span
					css={[numberCss, largeNumbersOnDesktop && largeNumberCss]}
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
					css={[
						barCss,
						homeNeedsContrastWhenLight && barAddContrastLightCss,
						homeNeedsContrastWhenDark && barAddContrastDarkCss,
					]}
					style={{
						'--match-stat-percentage': `${homePercentage}%`,
						'--match-stat-team-colour': home.teamColour,
					}}
				></div>
				<div
					css={[
						barCss,
						awayNeedsContrastWhenLight && barAddContrastLightCss,
						awayNeedsContrastWhenDark && barAddContrastDarkCss,
					]}
					style={{
						'--match-stat-percentage': `${awayPercentage}%`,
						'--match-stat-team-colour': away.teamColour,
					}}
				></div>
			</div>
		</div>
	);
};
