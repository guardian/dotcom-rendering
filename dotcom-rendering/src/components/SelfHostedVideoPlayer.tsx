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

const subtitleFontStyles = (subtitleSize: SubtitleSize | undefined) => css`
	::cue {
		color: ${palette('--video-subtitle-text')};
		${subtitleSize === 'small' && textSans15};
		${subtitleSize === 'medium' && textSans17};
		${subtitleSize === 'large' && textSans20};
	}
`;

const hideNativeSubtitlesStyles = css`
	::cue {
		/* Hide the cue as we prefer custom overlay */
		visibility: hidden;
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
	bottom: ${useLongFormProgressBar ? '46px' : `${space[3]}px`};
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
	handlePause: (event: SyntheticEvent) => void;
	handleFullscreenClick?: (event: SyntheticEvent) => void;
	updateCurrentTime: (time: number) => void;
	onError: (event: SyntheticEvent<HTMLVideoElement>) => void;
	posterImage?: string;
	preloadPartialData: boolean;
	showProgressBar: boolean;
	useLongFormProgressBar: boolean;
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
	isWebKitFullscreen: boolean;
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
			handlePause,
			handleFullscreenClick,
			updateCurrentTime,
			onError,
			preloadPartialData,
			showProgressBar: canShowProgressBar,
			useLongFormProgressBar,
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
			isWebKitFullscreen,
		}: Props,
		ref: React.ForwardedRef<HTMLVideoElement>,
	) => {
		const videoId = `video-${uniqueId}`;

		const currentRefExists = ref && 'current' in ref && !!ref.current;

		const showSubtitles = canShowSubtitles && !!subtitleSource;
		const showCustomSubtitles = showSubtitles && !isWebKitFullscreen;
		const showProgressBar = canShowProgressBar && currentRefExists;
		const showIcons = canShowIcons && currentRefExists;

		return (
			<>
				<video
					id={videoId}
					css={[
						videoStyles(aspectRatio),
						isInteractive && interactiveStyles,
						showSubtitles && subtitleFontStyles(subtitleSize),
						showCustomSubtitles && hideNativeSubtitlesStyles,
					]}
					crossOrigin="anonymous"
					ref={ref}
					tabIndex={0}
					data-testid="self-hosted-video-player"
					height={height}
					width={width}
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
							/**
							 * On iOS/WebKit, `default` forces native subtitle rendering.
							 * Disable it when custom subtitles are enabled.
							 */
							default={!showCustomSubtitles}
							kind="subtitles"
							src={subtitleSource}
							srcLang="en"
						/>
					)}
					{FallbackImageComponent}
				</video>
				{showCustomSubtitles && !!activeCue?.text && (
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
					{showIcons && (showFullscreenIcon || hasAudio) && (
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
			</>
		);
	},
);
