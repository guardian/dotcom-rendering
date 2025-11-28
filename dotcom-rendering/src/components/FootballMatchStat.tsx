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
	homeValue: string;
	awayValue: string;
};

export const FootballMatchStat = ({
	label,
	homeColour,
	awayColour,
	homeValue,
	awayValue,
}: Props) => (
	<div css={containerCss}>
		<div css={headerCss}>
			<span css={statCss} style={{ '--match-stat-colour': homeColour }}>
				{homeValue}
			</span>
			<span css={labelCss}>{label}</span>
			<span css={statCss} style={{ '--match-stat-colour': awayColour }}>
				{awayValue}
			</span>
		</div>
		<div css={chartCss}>
			<div
				css={barCss}
				style={{
					'--match-stat-bar-width': homeValue,
					'--match-stat-bar-colour': homeColour,
				}}
			></div>
			<div
				css={barCss}
				style={{
					'--match-stat-bar-width': awayValue,
					'--match-stat-bar-colour': awayColour,
				}}
			></div>
		</div>
	</div>
);
