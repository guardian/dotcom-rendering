import { css } from '@emotion/react';
import {
	palette,
	textSansBold14,
	textSansBold20,
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
	color: var(--match-stat-colour);
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
	width: var(--match-stat-bar-width);
	background-color: var(--match-stat-bar-colour);
	border-radius: 8px;
`;

type Props = {
	label: string;
	homeColour: string;
	awayColour: string;
	homeValue: number;
	awayValue: number;
	showPercentage?: boolean;
};

const formatValue = (value: number, showPercentage: boolean) =>
	`${value}${showPercentage ? '%' : ''}`;

export const FootballMatchStat = ({
	label,
	homeColour,
	awayColour,
	homeValue,
	awayValue,
	showPercentage = false,
}: Props) => {
	const homePercentage = (homeValue / (homeValue + awayValue)) * 100;
	const awayPercentage = (awayValue / (homeValue + awayValue)) * 100;

	return (
		<div css={containerCss}>
			<div css={headerCss}>
				<span
					css={statCss}
					style={{ '--match-stat-colour': homeColour }}
				>
					{formatValue(homeValue, showPercentage)}
				</span>
				<span css={labelCss}>{label}</span>
				<span
					css={statCss}
					style={{ '--match-stat-colour': awayColour }}
				>
					{formatValue(awayValue, showPercentage)}
				</span>
			</div>
			<div css={chartCss}>
				<div
					css={barCss}
					style={{
						'--match-stat-bar-width': `${homePercentage}%`,
						'--match-stat-bar-colour': homeColour,
					}}
				></div>
				<div
					css={barCss}
					style={{
						'--match-stat-bar-width': `${awayPercentage}%`,
						'--match-stat-bar-colour': awayColour,
					}}
				></div>
			</div>
		</div>
	);
};
