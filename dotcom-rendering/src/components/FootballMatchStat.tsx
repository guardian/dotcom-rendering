import { css } from '@emotion/react';
import {
	palette,
	textSansBold14,
	textSansBold20,
	visuallyHidden,
} from '@guardian/source/foundations';

const containerCss = css`
	position: relative;
	padding: 5px 10px 10px;
	border: 1px solid ${palette.neutral[86]};
	border-radius: 6px;
	&::before {
		position: absolute;
		content: '';
		left: 50%;
		bottom: 0;
		width: 1px;
		height: 24px;
		background-color: ${palette.neutral[86]};
	}
`;

const headerCss = css`
	display: flex;
	justify-content: space-between;
`;

const statCss = css`
	${textSansBold20};
	color: var(--match-stat-team-colour);
`;

const labelCss = css`
	${textSansBold14};
	color: ${palette.neutral[7]};
`;

const chartCss = css`
	position: relative;
	display: flex;
	gap: 10px;
`;

const barCss = css`
	height: 8px;
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
};

const formatValue = (value: number, showPercentage: boolean) =>
	`${value}${showPercentage ? '%' : ''}`;

export const FootballMatchStat = ({
	label,
	home,
	away,
	showPercentage = false,
}: Props) => {
	const homePercentage = (home.value / (home.value + away.value)) * 100;
	const awayPercentage = (away.value / (home.value + away.value)) * 100;

	return (
		<div css={containerCss}>
			<div css={headerCss}>
				<span
					css={statCss}
					style={{ '--match-stat-team-colour': home.teamColour }}
				>
					<span
						css={css`
							${visuallyHidden}
						`}
					>
						{away.teamName}
					</span>
					{formatValue(home.value, showPercentage)}
				</span>
				<span css={labelCss}>{label}</span>
				<span
					css={statCss}
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
			<div css={chartCss}>
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
