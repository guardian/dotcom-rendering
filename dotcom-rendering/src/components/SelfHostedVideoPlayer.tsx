// DEV NOTE: by this point, captions text should be settled - this component doesn't care about it

import { css } from '@emotion/react';
import {
	space,
	textSans15,
	textSans17,
	textSans20,
} from '@guardian/source/foundations';
import type { IconProps } from '@guardian/source/react-components';
import type { ReactElement, SyntheticEvent } from 'react';
import { forwardRef } from 'react';
import type { ActiveCue } from '../lib/useSubtitles';
import type { Source } from '../lib/video';
import { palette } from '../palette';
import type { VideoPlayerFormat } from '../types/mainMedia';
import { narrowPlayIconDiameter, PlayIcon } from './Card/components/PlayIcon';
import {
	AudioIcon as AudioIconComponent,
	FullscreenIcon,
} from './SelfHostedVideoPlayerIcons';
import type { SubtitlesPosition } from './SubtitleOverlay';
import { SubtitleOverlay } from './SubtitleOverlay';
import { VideoProgressBar } from './VideoProgressBar';
import { VideoProgressBarInteractive } from './VideoProgressBarInteractive';

export type SubtitleSize = 'small' | 'medium' | 'large';
export type ControlsPosition = 'top' | 'bottom';

const videoStyles = (aspectRatio: number) => css`
	position: relative;
	display: block;
	height: auto;
	width: 100%;
	-webkit-tap-highlight-color: transparent;

	/* Prevents CLS by letting the browser know the space the video will take up. */
	aspect-ratio: ${aspectRatio};
`;

const interactiveStyles = css`
	cursor: pointer;
`;

const subtitleStyles = (subtitleSize: SubtitleSize | undefined) => css`
	::cue {
		/* Hide the cue by default as we prefer custom overlay */
		visibility: hidden;

		color: ${palette('--video-subtitle-text')};
		${subtitleSize === 'small' && textSans15};
		${subtitleSize === 'medium' && textSans17};
		${subtitleSize === 'large' && textSans20};
	}
`;

const playIconStyles = css`
	position: absolute;
	/* Center the icon */
	top: calc(50% - ${narrowPlayIconDiameter / 2}px);
	left: calc(50% - ${narrowPlayIconDiameter / 2}px);
	cursor: pointer;
	border: none;
	background: none;
	padding: 0;
`;

const iconsContainerStyles = css`
	position: absolute;
	display: flex;
	flex-direction: column;
	gap: ${space[2]}px;
	right: ${space[2]}px;
`;

const smallIconsPositionStyles = (position: ControlsPosition) => css`
	${position === 'bottom' && `bottom: ${space[3]}px;`}
	${position === 'top' && `top: ${space[2]}px;`}
`;

const largeIconsPositionStyles = (position: ControlsPosition) => css`
	${position === 'bottom' && `bottom: ${space[12]}px;`}
	${position === 'top' && `top: ${space[2]}px;`}
`;

export const PLAYER_STATES = [
	'NOT_STARTED',
	'PLAYING',
	/**
	 * A user action pauses the video.
	 */
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

export type Props = {
	sources: Source[];
	atomId: string;
	uniqueId: string;
	height?: number;
	width?: number;
	aspectRatio: number;
	videoStyle: VideoPlayerFormat;
	FallbackImageComponent: ReactElement;
	currentTime: number;
	isMuted: boolean;
	handleLoadedMetadata: (event: SyntheticEvent) => void;
	handleLoadedData: (event: SyntheticEvent) => void;
	handleCanPlay: (event: SyntheticEvent) => void;
	handlePlaying: (event: SyntheticEvent) => void;
	handlePlayPauseClick: (event: SyntheticEvent) => void;
	handleAudioClick: (event: SyntheticEvent) => void;
	handleKeyDown: (event: React.KeyboardEvent<HTMLElement>) => void;
	handleTimeUpdate: (event: SyntheticEvent<HTMLVideoElement>) => void;
	useLongFormProgressBar: boolean;
	handlePause: (event: SyntheticEvent) => void;
	handleFullscreenClick?: (event: SyntheticEvent) => void;
	updateCurrentTime: (time: number) => void;
	onError: (event: SyntheticEvent<HTMLVideoElement>) => void;
	AudioIcon: ((iconProps: IconProps) => JSX.Element) | null;
	iconSize: 'small' | 'large';
	posterImage?: string;
	preloadPartialData: boolean;
	showProgressBar: boolean;
	showPlayIcon: boolean;
	showIcons: boolean;
	showFullscreenIcon: boolean;
	showSubtitles: boolean;
	subtitleSource?: string;
	subtitleSize: SubtitleSize;
	/* used in custom subtitle overlays */
	activeCue?: ActiveCue | null;
	shouldLoop: boolean;
	isInteractive: boolean;
	iconsPosition: ControlsPosition;
	subtitlesPosition: SubtitlesPosition;
};

/**
 * Note that in React 19, forwardRef is no longer necessary:
 * https://react.dev/reference/react/forwardRef
 *
 * NB: When DEVELOPING LOCALLY, use `https://r.thegulocal.com/` instead of `localhost`.
 * This is required because CORS restrictions prevent accessing the subtitles and video file from localhost.
 * Alternatively, you can remove `crossOrigin="anonymous"` from the video element, which will not enable
 * CORS. You can then develop using localhost, but note that subtitles will not work in this scenario.
 */
export const SelfHostedVideoPlayer = forwardRef(
	(
		{
			sources,
			atomId,
			uniqueId,
			height,
			width,
			aspectRatio,
			videoStyle,
			FallbackImageComponent,
			posterImage,
			currentTime,
			isMuted,
			handleLoadedMetadata,
			handleLoadedData,
			handleCanPlay,
			handlePlaying,
			handlePlayPauseClick,
			handleAudioClick,
			handleKeyDown,
			handleTimeUpdate,
			useLongFormProgressBar,
			handlePause,
			handleFullscreenClick,
			updateCurrentTime,
			onError,
			AudioIcon,
			iconSize,
			preloadPartialData,
			showProgressBar: canShowProgressBar,
			showPlayIcon,
			showIcons: canShowIcons,
			showFullscreenIcon,
			showSubtitles: canShowSubtitles,
			subtitleSource,
			subtitleSize,
			activeCue,
			shouldLoop,
			isInteractive,
			iconsPosition,
			subtitlesPosition,
		}: Props,
		ref: React.ForwardedRef<HTMLVideoElement>,
	) => {
		const videoId = `video-${uniqueId}`;

		const currentRefExists = ref && 'current' in ref && !!ref.current;

		const showSubtitles = canShowSubtitles && !!subtitleSource;
		const showProgressBar = canShowProgressBar && currentRefExists;
		const showIcons = canShowIcons && currentRefExists;

		const dataLinkName = `gu-video-${videoStyle.toLowerCase()}-${
			showPlayIcon ? 'play' : 'pause'
		}-${atomId}`;

		return (
			<>
				{/* eslint-disable-next-line jsx-a11y/media-has-caption -- Not all videos require captions. */}
				<video
					id={videoId}
					css={[
						videoStyles(aspectRatio),
						isInteractive && interactiveStyles,
						showSubtitles && subtitleStyles(subtitleSize),
					]}
					crossOrigin="anonymous"
					ref={ref}
					tabIndex={0}
					data-testid="self-hosted-video-player"
					height={height}
					width={width}
					data-link-name={dataLinkName}
					data-chromatic="ignore"
					preload={preloadPartialData ? 'metadata' : 'none'}
					loop={shouldLoop}
					muted={isMuted}
					playsInline={true}
					poster={posterImage}
					onLoadedMetadata={handleLoadedMetadata}
					onLoadedData={handleLoadedData}
					onCanPlay={handleCanPlay}
					onCanPlayThrough={handleCanPlay}
					onPlaying={handlePlaying}
					onTimeUpdate={handleTimeUpdate}
					onPause={handlePause}
					onClick={handlePlayPauseClick}
					onKeyDown={handleKeyDown}
					onError={onError}
				>
					{sources.map(({ src, mimeType }) => (
						<source
							key={mimeType}
							/* The start time is set to 1ms so that Safari will autoplay the video */
							src={`${src}#t=0.001`}
							type={mimeType}
						/>
					))}
					{showSubtitles && (
						<track
							// Don't use default - it forces native rendering on iOS
							default={false}
							kind="subtitles"
							src={subtitleSource}
							srcLang="en"
						/>
					)}
					{FallbackImageComponent}
				</video>
				{showSubtitles && !!activeCue?.text && (
					<SubtitleOverlay
						text={activeCue.text}
						size={subtitleSize}
						position={subtitlesPosition}
					/>
				)}
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
				{showProgressBar &&
					(useLongFormProgressBar ? (
						<VideoProgressBarInteractive
							videoId={videoId}
							currentTime={currentTime}
							updateCurrentTime={updateCurrentTime}
							duration={ref.current!.duration}
							handleKeyDown={handleKeyDown}
						/>
					) : (
						<VideoProgressBar
							videoId={videoId}
							currentTime={currentTime}
							duration={ref.current!.duration}
						/>
					))}
				{showIcons && (
					<div
						css={[
							iconsContainerStyles,
							iconSize === 'large' &&
								largeIconsPositionStyles(iconsPosition),
							iconSize === 'small' &&
								smallIconsPositionStyles(iconsPosition),
						]}
					>
						{showFullscreenIcon && (
							<FullscreenIcon
								handleClick={handleFullscreenClick}
								atomId={atomId}
								size={iconSize}
							/>
						)}
						{AudioIcon && (
							<AudioIconComponent
								Icon={AudioIcon}
								handleClick={handleAudioClick}
								isMuted={isMuted}
								atomId={atomId}
								size={iconSize}
							/>
						)}
					</div>
				)}
			</>
		);
	},
);
