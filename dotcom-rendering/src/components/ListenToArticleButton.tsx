import { css } from '@emotion/react';
import { height, space } from '@guardian/source/foundations';
import type { ThemeIcon } from '@guardian/source/react-components';
import {
	Button,
	SvgMediaControlsPlay,
} from '@guardian/source/react-components';
import { palette } from '../palette';
import type { WaveFormTheme } from './WaveForm';
import { WaveForm } from './WaveForm';

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
	border-top: 1px solid ${palette('--article-meta-lines')};
	position: relative;
	padding-top: ${space[2]}px;
	overflow: hidden;

	> svg {
		position: absolute;
		top: ${space[2]}px;
		left: 0;
		width: 746px; /* Fixed width - adjust as needed */
		height: 100%;
		z-index: 0;
	}

	> button {
		position: relative;
		z-index: 1;
	}
`;

type ButtonProps = {
	onClickHandler: () => void;
	audioDuration?: string;
	waveFormSeed?: string;
};

const waveTheme: WaveFormTheme = {
	wave: palette('--listen-to-article-waveform'),
};

export const ListenToArticleButton = ({
	onClickHandler,
	audioDuration,
	waveFormSeed,
}: ButtonProps) => {
	return (
		<div css={waveFormContainerCss}>
			<WaveForm
				seed={waveFormSeed ?? 'listen to this article'}
				height={space[10]}
				bars={250}
				theme={waveTheme}
				gap={1}
				barWidth={2}
			/>
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
	);
};
