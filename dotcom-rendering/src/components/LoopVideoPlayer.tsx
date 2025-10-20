import { css } from '@emotion/react';
import {
	space,
	textSans15,
	textSans17,
	textSans20,
} from '@guardian/source/foundations';
import type { IconProps } from '@guardian/source/react-components';
import type {
	Dispatch,
	ReactElement,
	SetStateAction,
	SyntheticEvent,
} from 'react';
import { forwardRef } from 'react';
import type { Source } from '../lib/video';
import { palette } from '../palette';
import { narrowPlayIconWidth, PlayIcon } from './Card/components/PlayIcon';
import { LoopVideoProgressBar } from './LoopVideoProgressBar';

export type SubtitleSize = 'small' | 'medium' | 'large';

const videoStyles = (
	width: number,
	height: number,
	subtitleSize: SubtitleSize,
) => css`
	position: relative;
	display: block;
	height: auto;
	width: 100%;
	cursor: pointer;
	/* Prevents CLS by letting the browser know the space the video will take up. */
	aspect-ratio: ${width} / ${height};
	object-fit: cover;

	::cue {
		background-color: ${palette('--loop-video-subtitle-background')};
		color: ${palette('--loop-video-subtitle-text')};

		${subtitleSize === 'small' && textSans15};
		${subtitleSize === 'medium' && textSans17};
		${subtitleSize === 'large' && textSans20};
	}
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
	/**
	 * The video is paused when the user scrolls away.
	 */
	'PAUSED_BY_INTERSECTION_OBSERVER',
	/**
	 * The browser may elect to suspend playback under certain circumstances.
	 * For example, iOS devices in low power mode will suspend playback on autoplaying videos.
	 */
	'PAUSED_BY_BROWSER',
] as const;

export type PlayerStates = (typeof PLAYER_STATES)[number];

type Props = {
	sources: Source[];
	atomId: string;
	uniqueId: string;
	width: number;
	height: number;
	FallbackImageComponent: ReactElement;
	isPlayable: boolean;
	playerState: PlayerStates;
	currentTime: number;
	setCurrentTime: Dispatch<SetStateAction<number>>;
	isMuted: boolean;
	handleLoadedMetadata: (event: SyntheticEvent) => void;
	handleLoadedData: (event: SyntheticEvent) => void;
	handleCanPlay: (event: SyntheticEvent) => void;
	handlePlayPauseClick: (event: SyntheticEvent) => void;
	handleAudioClick: (event: SyntheticEvent) => void;
	handleKeyDown: (event: React.KeyboardEvent<HTMLVideoElement>) => void;
	handlePause: (event: SyntheticEvent) => void;
	onError: (event: SyntheticEvent<HTMLVideoElement>) => void;
	AudioIcon: ((iconProps: IconProps) => JSX.Element) | null;
	posterImage?: string;
	preloadPartialData: boolean;
	showPlayIcon: boolean;
	subtitleSource?: string;
	subtitleSize: SubtitleSize;
};

/**
 * Note that in React 19, forwardRef is no longer necessary:
 * https://react.dev/reference/react/forwardRef
 */
export const LoopVideoPlayer = forwardRef(
	(
		{
			sources,
			atomId,
			uniqueId,
			width,
			height,
			FallbackImageComponent,
			posterImage,
			isPlayable,
			playerState,
			currentTime,
			setCurrentTime,
			isMuted,
			handleLoadedMetadata,
			handleLoadedData,
			handleCanPlay,
			handlePlayPauseClick,
			handleAudioClick,
			handleKeyDown,
			handlePause,
			onError,
			AudioIcon,
			preloadPartialData,
			showPlayIcon,
			subtitleSource,
			subtitleSize,
		}: Props,
		ref: React.ForwardedRef<HTMLVideoElement>,
	) => {
		const loopVideoId = `loop-video-${uniqueId}`;

		return (
			<>
				{/* eslint-disable-next-line jsx-a11y/media-has-caption -- Captions will be considered later. */}
				<video
					id={loopVideoId}
					css={videoStyles(width, height, subtitleSize)}
					ref={ref}
					tabIndex={0}
					data-testid="loop-video"
					height={height}
					width={width}
					data-link-name={`gu-video-loop-${
						showPlayIcon ? 'play' : 'pause'
					}-${atomId}`}
					data-chromatic="ignore"
					preload={preloadPartialData ? 'metadata' : 'none'}
					loop={true}
					muted={isMuted}
					playsInline={true}
					poster={posterImage}
					onLoadedMetadata={handleLoadedMetadata}
					onLoadedData={handleLoadedData}
					onCanPlay={handleCanPlay}
					onCanPlayThrough={handleCanPlay}
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
					onPause={handlePause}
					onClick={handlePlayPauseClick}
					onKeyDown={handleKeyDown}
					onError={onError}
				>
					{sources.map((source) => (
						<source
							key={source.mimeType}
							/* The start time is set to 1ms so that Safari will autoplay the video */
							src={`${source.src}#t=0.001`}
							type={source.mimeType}
						/>
					))}
					{subtitleSource !== undefined && (
						<track
							default={true}
							kind="subtitles"
							src={subtitleSource}
						/>
					)}
					{FallbackImageComponent}
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
								data-testid="play-icon"
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
						{AudioIcon && (
							<button
								type="button"
								onClick={handleAudioClick}
								css={audioButtonStyles}
								data-link-name={`gu-video-loop-${
									isMuted ? 'unmute' : 'mute'
								}-${atomId}`}
							>
								<div
									css={audioIconContainerStyles}
									data-testid={`${
										isMuted ? 'unmute' : 'mute'
									}-icon`}
								>
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
						)}
					</>
				)}
			</>
		);
	},
);
