import { css } from '@emotion/react';
import { height, neutral, space } from '@guardian/source/foundations';
import type { ThemeIcon } from '@guardian/source/react-components';
import {
	Button,
	SvgMediaControlsPlay,
} from '@guardian/source/react-components';
import { palette } from '../palette';

const buttonCss = (audioDuration: string | undefined) => css`
	display: flex;
	align-items: center;
	background-color: ${palette('--follow-icon-fill')};
	color: ${palette('--follow-icon-background')};
	&:active,
	&:focus,
	&:hover {
		background-color: ${palette('--follow-icon-fill')};
	}
	margin-bottom: ${space[4]}px;
	margin-left: ${space[2]}px;
	padding-left: ${space[3]}px;
	padding-right: ${audioDuration === undefined ? space[4] : space[3]}px;
	padding-bottom: 0px;
	font-size: 15px;
	height: ${height.ctaXsmall}px;
	min-height: ${height.ctaXsmall}px;

	.src-button-space {
		width: 0px;
	}
`;

const dividerCss = css`
	width: 0.5px;
	height: 100%;
	opacity: 0.5;
	border-left: 1px solid ${palette('--follow-icon-background')};
	margin-left: ${space[2]}px;
`;

const themeIcon: ThemeIcon = {
	fill: palette('--follow-icon-background'),
};

const waveFormContainerCss = css`
	height: ${space[12]}px;
	border-top: 1px solid ${neutral[86]};
`;

const generateWaveformGradients = (barCount: number): string => {
	const barWidth = 2;
	const spacing = 1;
	const gradients: string[] = [];
	let lastBarHeight = Math.floor(Math.random() * 60) + 25; // Initial random height

	for (let i = 0; i < barCount; i++) {
		const variation = lastBarHeight * 0.5; // 50% of last bar height
		const minHeight = Math.max(50, lastBarHeight - variation);
		const maxHeight = Math.min(70, lastBarHeight + variation);
		const barHeight =
			Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
		lastBarHeight = barHeight;
		const position = i * (barWidth + spacing);
		gradients.push(
			`linear-gradient(to top, ${neutral[86]} 0 ${barHeight}%, transparent ${barHeight}%) ${position}px 100% / ${barWidth}px 100%`,
		);
	}

	return gradients.join(',\n\t\t');
};

const waveFormCss = css`
	background: ${generateWaveformGradients(250)};
	background-repeat: no-repeat;
	height: inherit;
	display: block;
	width: 100%;
	padding-top: ${space[2]}px;
`;

type ButtonProps = {
	onClickHandler: () => void;
	audioDuration?: string;
};
export const ListenToArticleButton = ({
	onClickHandler,
	audioDuration,
}: ButtonProps) => (
	<div css={waveFormContainerCss}>
		<div css={waveFormCss}>
			<Button
				onClick={onClickHandler}
				size="default"
				cssOverrides={buttonCss(audioDuration)}
			>
				<span>Listen to this article</span>
				{audioDuration === undefined || audioDuration === '' ? null : (
					<>
						<span css={dividerCss}></span>
						<SvgMediaControlsPlay size="small" theme={themeIcon} />
						<span>{audioDuration}</span>
					</>
				)}
			</Button>
		</div>
	</div>
);
