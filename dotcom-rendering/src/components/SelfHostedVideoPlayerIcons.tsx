import { css } from '@emotion/react';
import { palette as sourcePalette, space } from '@guardian/source/foundations';
import {
	SvgArrowExpand,
	SvgAudio,
	SvgAudioMute,
	SvgMediaControlsPause,
	SvgMediaControlsPlay,
} from '@guardian/source/react-components';
import { palette } from '../palette';
import type { Props as SelfHostedVideoPlayerProps } from './SelfHostedVideoPlayer';

const buttonStyles = css`
	border: none;
	background: none;
	padding: 0;
	cursor: pointer;
	-webkit-tap-highlight-color: transparent;
`;

const iconContainerStyles = css`
	display: flex;
	justify-content: center;
	align-items: center;
	width: ${space[8]}px;
	height: ${space[8]}px;
	background-color: ${palette('--video-icon-background')};
	border-radius: 50%;
`;

type AudioIconProps = {
	isMuted: SelfHostedVideoPlayerProps['isMuted'];
	handleClick: SelfHostedVideoPlayerProps['handleAudioClick'];
};

export const AudioIcon = ({ isMuted, handleClick }: AudioIconProps) => {
	const IconComponent = isMuted ? SvgAudioMute : SvgAudio;

	return (
		<button
			type="button"
			onClick={handleClick}
			css={[buttonStyles, iconContainerStyles]}
			data-testid={`${isMuted ? 'unmute' : 'mute'}-icon`}
		>
			<IconComponent
				size="xsmall"
				theme={{
					fill: palette('--video-icon'),
				}}
			/>
		</button>
	);
};

type FullscreenIconProps = {
	handleClick: SelfHostedVideoPlayerProps['handleFullscreenClick'];
};

export const FullscreenIcon = ({ handleClick }: FullscreenIconProps) => (
	<button
		type="button"
		onClick={handleClick}
		css={[buttonStyles, iconContainerStyles]}
		data-testid="fullscreen-icon"
	>
		<SvgArrowExpand
			size="xsmall"
			theme={{
				fill: palette('--video-icon'),
			}}
		/>
	</button>
);

const buttonSize = 56;
const playPauseButtonStyles = css`
	position: absolute;
	/* Center the icon */
	top: calc(50% - ${buttonSize / 2}px);
	left: calc(50% - ${buttonSize / 2}px);
	width: ${buttonSize}px;
	height: ${buttonSize}px;
	background-color: ${palette('--video-icon-background')};
	border-radius: 50%;
	fill: ${palette('--video-icon')};
`;

type PlayPauseIconProps = {
	type: 'play' | 'pause';
	atomId: SelfHostedVideoPlayerProps['atomId'];
	handleClick: SelfHostedVideoPlayerProps['handlePlayPauseClick'];
	isLoopClickThroughTest: boolean;
};

export const PlayPauseIcon = ({
	type,
	atomId,
	handleClick,
	isLoopClickThroughTest,
}: PlayPauseIconProps) => {
	const IconComponent =
		type === 'play' ? SvgMediaControlsPlay : SvgMediaControlsPause;

	return (
		<button
			type="button"
			onClick={handleClick}
			css={[
				buttonStyles,
				isLoopClickThroughTest
					? iconContainerStyles
					: playPauseButtonStyles,
			]}
			data-link-name={`gu-video-loop-${type}-${atomId}`}
			data-testid={`${type}-icon`}
		>
			<IconComponent theme={{ fill: sourcePalette.neutral[100] }} />
		</button>
	);
};
