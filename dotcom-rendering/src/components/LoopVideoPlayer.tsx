import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import type { IconProps } from '@guardian/source/react-components';
import type { Dispatch, SetStateAction, SyntheticEvent } from 'react';
import { forwardRef } from 'react';
import { submitClickComponentEvent } from '../client/ophan/ophan';
import { palette } from '../palette';
import { narrowPlayIconWidth, PlayIcon } from './Card/components/PlayIcon';
import { useConfig } from './ConfigContext';
import { LoopVideoProgressBar } from './LoopVideoProgressBar';

const videoStyles = (width: number, height: number) => css`
	position: relative;
	display: block;
	height: auto;
	width: 100%;
	cursor: pointer;
	/* Prevents CLS by letting the browser know the space the video will take up. */
	aspect-ratio: ${width} / ${height};
	object-fit: cover;
`;

const playIconStyles = css`
	position: absolute;
	/* Center the icon */
	top: calc(50% - ${narrowPlayIconWidth / 2}px);
	left: calc(50% - ${narrowPlayIconWidth / 2}px);
	cursor: pointer;
	border: none;
	background: none;
	padding: 0;
`;

const audioButtonStyles = css`
	border: none;
	background: none;
	padding: 0;
	position: absolute;
	/* Take into account the progress bar height */
	bottom: ${space[3]}px;
	right: ${space[2]}px;
	cursor: pointer;
`;

const audioIconContainerStyles = css`
	width: ${space[8]}px;
	height: ${space[8]}px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${palette('--loop-video-audio-icon-background')};
	border-radius: 50%;
	border: 1px solid ${palette('--loop-video-audio-icon-border')};
`;

export const PLAYER_STATES = [
	'NOT_STARTED',
	'PLAYING',
	'PAUSED_BY_USER',
	'PAUSED_BY_INTERSECTION_OBSERVER',
] as const;

type Props = {
	src: string;
	atomId: string;
	uniqueId: string;
	width: number;
	height: number;
	fallbackImageComponent: JSX.Element;
	isPlayable: boolean;
	setIsPlayable: Dispatch<SetStateAction<boolean>>;
	playerState: (typeof PLAYER_STATES)[number];
	currentTime: number;
	setCurrentTime: Dispatch<SetStateAction<number>>;
	isMuted: boolean;
	handlePlayPauseClick: (event: SyntheticEvent) => void;
	handleAudioClick: (event: SyntheticEvent) => void;
	handleKeyDown: (event: React.KeyboardEvent<HTMLVideoElement>) => void;
	onError: (event: SyntheticEvent<HTMLVideoElement>) => void;
	AudioIcon: (iconProps: IconProps) => JSX.Element;
	posterImage?: string;
	preloadPartialData: boolean;
	showPlayIcon: boolean;
};

/**
 * Note that in React 19, forwardRef is no longer necessary:
 * https://react.dev/reference/react/forwardRef
 */
export const LoopVideoPlayer = forwardRef(
	(
		{
			src,
			atomId,
			uniqueId,
			width,
			height,
			fallbackImageComponent,
			posterImage,
			isPlayable,
			setIsPlayable,
			playerState,
			currentTime,
			setCurrentTime,
			isMuted,
			handlePlayPauseClick,
			handleAudioClick,
			handleKeyDown,
			onError,
			AudioIcon,
			preloadPartialData,
			showPlayIcon,
		}: Props,
		ref: React.ForwardedRef<HTMLVideoElement>,
	) => {
		const loopVideoId = `loop-video-${uniqueId}`;
		const { renderingTarget } = useConfig();

		return (
			<>
				{/* eslint-disable-next-line jsx-a11y/media-has-caption -- Captions will be considered later. */}
				<video
					id={loopVideoId}
					ref={ref}
					preload={preloadPartialData ? 'metadata' : 'none'}
					loop={true}
					muted={isMuted}
					playsInline={true}
					height={height}
					width={width}
					poster={posterImage}
					onCanPlay={() => {
						setIsPlayable(true);
					}}
					onTimeUpdate={() => {
						if (
							ref &&
							'current' in ref &&
							ref.current &&
							playerState === 'PLAYING'
						) {
							setCurrentTime(ref.current.currentTime);
						}
					}}
					onClick={handlePlayPauseClick}
					onKeyDown={handleKeyDown}
					role="button"
					tabIndex={0}
					onError={onError}
					css={videoStyles(width, height)}
					data-link-name={`gu-video-loop-${
						showPlayIcon ? 'play' : 'pause'
					}-${atomId}`}
				>
					{/* Only mp4 is currently supported. Assumes the video file type is mp4. */}
					{/* The start time is set to 1ms so that Safari will autoplay the video */}
					<source src={`${src}#t=0.001`} type="video/mp4" />
					{fallbackImageComponent}
				</video>
				{ref && 'current' in ref && ref.current && isPlayable && (
					<>
						{/* Play icon */}
						{showPlayIcon && (
							<button
								type="button"
								onClick={handlePlayPauseClick}
								css={playIconStyles}
								data-link-name={`gu-video-loop-play-${atomId}`}
							>
								<PlayIcon iconWidth="narrow" />
							</button>
						)}
						{/* Progress bar */}
						<LoopVideoProgressBar
							videoId={loopVideoId}
							currentTime={currentTime}
							duration={ref.current.duration}
						/>
						{/* Audio icon */}
						<button
							type="button"
							onClick={(event) => {
								void submitClickComponentEvent(
									event.currentTarget,
									renderingTarget,
								);
								event.stopPropagation(); // Don't pause the video
								handleAudioClick(event);
							}}
							css={audioButtonStyles}
							data-link-name={`gu-video-loop-${
								isMuted ? 'unmute' : 'mute'
							}-${atomId}`}
						>
							<div css={audioIconContainerStyles}>
								<AudioIcon
									size="xsmall"
									theme={{
										fill: palette(
											'--loop-video-audio-icon',
										),
									}}
								/>
							</div>
						</button>
					</>
				)}
			</>
		);
	},
);
