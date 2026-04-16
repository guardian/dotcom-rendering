import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import { SvgArrowExpand } from '@guardian/source/react-components';
import { palette } from '../palette';
import type { Props as SelfHostedVideoPlayerProps } from './SelfHostedVideoPlayer';

export type SubtitleSize = 'small' | 'medium' | 'large';
export type ControlsPosition = 'top' | 'bottom';

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
