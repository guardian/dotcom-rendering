import { css } from '@emotion/react';
import { palette as sourcePalette, space } from '@guardian/source/foundations';
import {
	SvgArrowExpand,
	SvgMediaControlsPause,
} from '@guardian/source/react-components';
import { palette } from '../palette';
import { narrowPlayIconDiameter, PlayIcon } from './Card/components/PlayIcon';
import type { Props as SelfHostedVideoPlayerProps } from './SelfHostedVideoPlayer';

const buttonStyles = css`
	border: none;
	background: none;
	padding: 0;
	cursor: pointer;
`;

const iconContainerStyles = css`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const smallIconContainerStyles = css`
	width: ${space[8]}px;
	height: ${space[8]}px;
	background-color: ${palette('--video-icon-small-background')};
	border-radius: 50%;
	border: 1px solid ${palette('--video-icon-border')};
`;

const largeIconContainerStyles = css`
	width: 44px;
	height: 44px;
	background-color: ${palette('--video-icon-large-background')};
	border-radius: ${space[5]}px;
`;

type AudioIconProps = {
	Icon: Exclude<SelfHostedVideoPlayerProps['AudioIcon'], null>;
	atomId: SelfHostedVideoPlayerProps['atomId'];
	size: 'small' | 'large';
	isMuted: SelfHostedVideoPlayerProps['isMuted'];
	handleClick: SelfHostedVideoPlayerProps['handleAudioClick'];
};

export const AudioIcon = ({
	Icon,
	atomId,
	size,
	isMuted,
	handleClick,
}: AudioIconProps) => (
	<button
		type="button"
		onClick={handleClick}
		css={buttonStyles}
		data-link-name={`gu-video-loop-${
			isMuted ? 'unmute' : 'mute'
		}-${atomId}`}
	>
		<div
			css={[
				iconContainerStyles,
				size === 'small' && smallIconContainerStyles,
				size === 'large' && largeIconContainerStyles,
			]}
			data-testid={`${isMuted ? 'unmute' : 'mute'}-icon`}
		>
			<Icon
				size="xsmall"
				theme={{
					fill: palette('--video-icon'),
				}}
			/>
		</div>
	</button>
);

type FullscreenIconProps = {
	atomId: SelfHostedVideoPlayerProps['atomId'];
	size: 'small' | 'large';
	handleClick: SelfHostedVideoPlayerProps['handleFullscreenClick'];
};

export const FullscreenIcon = ({
	atomId,
	size,
	handleClick,
}: FullscreenIconProps) => (
	<button
		type="button"
		onClick={handleClick}
		css={buttonStyles}
		data-link-name={`gu-video-loop-fullscreen-${atomId}`}
	>
		<div
			css={[
				iconContainerStyles,
				size === 'small' && smallIconContainerStyles,
				size === 'large' && largeIconContainerStyles,
			]}
			data-testid="fullscreen-icon"
		>
			<SvgArrowExpand
				size="xsmall"
				theme={{
					fill: palette('--video-icon'),
				}}
			/>
		</div>
	</button>
);

const playPauseButtonStyles = css`
	position: absolute;
	/* Center the icon */
	top: calc(50% - ${narrowPlayIconDiameter / 2}px);
	left: calc(50% - ${narrowPlayIconDiameter / 2}px);
	cursor: pointer;
	border: none;
	background: none;
	padding: 0;
`;

const playPauseIconStyles = css`
	width: 56px;
	height: 56px;
	background-color: ${palette('--narrow-play-icon-background')};
	border-radius: 50%;
	border: 1px solid ${palette('--narrow-play-icon-border')};
	fill: ${palette('--narrow-play-icon-fill')};
`;

type PlayPauseIconProps = {
	type: 'play' | 'pause';
	atomId: SelfHostedVideoPlayerProps['atomId'];
	handleClick: SelfHostedVideoPlayerProps['handlePlayPauseClick'];
};

export const PlayPauseIcon = ({
	type,
	atomId,
	handleClick,
}: PlayPauseIconProps) => (
	<button
		type="button"
		onClick={handleClick}
		css={playPauseButtonStyles}
		data-link-name={`gu-video-loop-pause-${atomId}`}
		data-testid={`${type}-icon`}
	>
		<div css={[iconContainerStyles, playPauseIconStyles]}>
			{type === 'play' ? (
				<PlayIcon iconWidth="narrow" />
			) : (
				<SvgMediaControlsPause
					theme={{ fill: sourcePalette.neutral[100] }}
				/>
			)}
		</div>
	</button>
);
