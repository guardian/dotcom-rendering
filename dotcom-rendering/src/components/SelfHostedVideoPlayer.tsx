import { css } from '@emotion/react';
import {
	space,
	textSans15,
	textSans17,
	textSans20,
} from '@guardian/source/foundations';
import type { ReactElement, SyntheticEvent } from 'react';
import { forwardRef } from 'react';
import type { ActiveCue } from '../lib/useSubtitles';
import type { Source } from '../lib/video';
import { palette } from '../palette';
import type { VideoPlayerFormat } from '../types/mainMedia';
import {
	AudioIcon as AudioIconComponent,
	FullscreenIcon,
	PlayPauseIcon,
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

const playerContainerStyles = css`
	&:fullscreen {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: ${palette('--video-fullscreen-background')};
		width: 100vw;
		height: 100vh;

		/* Override the fixed aspect-ratio + width:100% on the video so it
		   fits within the screen while preserving its aspect ratio. */
		video {
			width: 100%;
			height: 100%;
			max-width: 100vw;
			max-height: 100vh;
			aspect-ratio: auto;
			object-fit: contain;
		}
	}
`;

const videoControlsStyles = css`
	height: 100%;
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	pointer-events: none;
	& > * {
		pointer-events: auto;
	}
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

const iconsContainerStyles = css`
	position: absolute;
	display: flex;
	flex-direction: column;
	gap: ${space[2]}px;
	right: ${space[2]}px;
`;

const iconsBottomPositionStyles = (useLongFormProgressBar: boolean) => css`
	bottom: ${useLongFormProgressBar ? space[12] : space[3]}px;
`;

const iconsTopPositionStyles = css`
	top: ${space[2]}px;
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
	hasAudio: boolean;
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
	posterImage?: string;
	preloadPartialData: boolean;
	showProgressBar: boolean;
	showPlayPauseIcon: 'play' | 'pause' | null;
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
	playerContainerRef: React.RefObject<HTMLDivElement>;
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
			hasAudio,
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
			preloadPartialData,
			showProgressBar: canShowProgressBar,
			showPlayPauseIcon,
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
			playerContainerRef,
		}: Props,
		ref: React.ForwardedRef<HTMLVideoElement>,
	) => {
		const videoId = `video-${uniqueId}`;

		const currentRefExists = ref && 'current' in ref && !!ref.current;

		const showSubtitles = canShowSubtitles && !!subtitleSource;
		const showProgressBar = canShowProgressBar && currentRefExists;
		const showIcons = canShowIcons && currentRefExists;

		const dataLinkName = `gu-video-${videoStyle.toLowerCase()}-${
			showPlayPauseIcon === 'play' ? 'play' : 'pause'
		}-${atomId}`;

		return (
			<div ref={playerContainerRef} css={playerContainerStyles}>
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
					disablePictureInPicture={true}
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
				<div className="controls-container" css={videoControlsStyles}>
					{showPlayPauseIcon !== null && (
						<PlayPauseIcon
							type={showPlayPauseIcon}
							atomId={atomId}
							handleClick={handlePlayPauseClick}
						/>
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
								iconsPosition === 'bottom' &&
									iconsBottomPositionStyles(
										useLongFormProgressBar,
									),
								iconsPosition === 'top' &&
									iconsTopPositionStyles,
							]}
						>
							{showFullscreenIcon && (
								<FullscreenIcon
									handleClick={handleFullscreenClick}
									atomId={atomId}
								/>
							)}
							{hasAudio && (
								<AudioIconComponent
									handleClick={handleAudioClick}
									isMuted={isMuted}
								/>
							)}
						</div>
					)}
				</div>
			</div>
		);
	},
);
