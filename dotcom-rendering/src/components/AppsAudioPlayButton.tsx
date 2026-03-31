import { css } from '@emotion/react';
import { height, space } from '@guardian/source/foundations';
import type { ThemeIcon } from '@guardian/source/react-components';
import {
	Button,
	SvgMediaControlsPlay,
} from '@guardian/source/react-components';
import { palette } from '../palette';
import { waveFormContainerCss } from './ListenToArticleButton';
import type { WaveFormTheme } from './WaveForm';
import { WaveForm } from './WaveForm';

const buttonCss = (audioDuration: string | undefined) => css`
	display: flex;
	align-items: center;
	background-color: ${palette('--listen-to-article-button-fill')};
	color: ${palette('--listen-to-article-button-background')};
	&:active,
	&:focus,
	&:hover {
		background-color: ${palette('--listen-to-article-button-fill')};
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

const themeIcon: ThemeIcon = {
	fill: palette('--follow-icon-background'),
};

const waveTheme: WaveFormTheme = {
	wave: palette('--listen-to-article-waveform'),
};

const dividerCss = css`
	width: 0.5px;
	height: 100%;
	opacity: 0.5;
	border-left: 1px solid ${palette('--follow-icon-background')};
	margin-left: ${space[2]}px;
`;

type Props = {
	onClickHandler: () => void;
	audioDuration?: string;
};

export const AppsAudioPlayButton = ({
	onClickHandler,
	audioDuration,
}: Props) => {
	return (
		<div css={waveFormContainerCss}>
			<WaveForm
				seed="apps-audio-play"
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
				<span>Listen to this podcast</span>
				{audioDuration !== undefined && audioDuration !== '' && (
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
