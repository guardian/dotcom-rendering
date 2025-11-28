import { css } from '@emotion/react';
import {
	palette,
	textSansBold14,
	textSansBold20,
} from '@guardian/source/foundations';

const colourHome = '#da020e';
const colourAway = '#023474';

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
	color: var(--stat-colour);
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
	width: var(--bar-width);
	background-color: var(--bar-colour);
	border-radius: 8px;
`;

export const FootballMatchStat = () => (
	<div css={containerCss}>
		<div css={headerCss}>
			<span css={statCss} style={{ '--stat-colour': colourHome }}>
				39%
			</span>
			<span css={labelCss}>Possession</span>
			<span css={statCss} style={{ '--stat-colour': colourAway }}>
				61%
			</span>
		</div>
		<div css={chartCss}>
			<div
				css={barCss}
				style={{ '--bar-width': '39%', '--bar-colour': colourHome }}
			></div>
			<div
				css={barCss}
				style={{ '--bar-width': '61%', '--bar-colour': colourAway }}
			></div>
		</div>
	</div>
);
