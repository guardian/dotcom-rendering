import { css } from '@emotion/react';
import { isUndefined, log, storage } from '@guardian/libs';
import { from, space, until } from '@guardian/source/foundations';
import { SvgAudio, SvgAudioMute } from '@guardian/source/react-components';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
	getOphan,
	submitClickComponentEvent,
	submitComponentEvent,
} from '../client/ophan/ophan';
import type { ArticleFormat } from '../lib/articleFormat';
import { getZIndex } from '../lib/getZIndex';
import { generateImageURL } from '../lib/image';
import { useIsInView } from '../lib/useIsInView';
import { useOnce } from '../lib/useOnce';
import { useShouldAdapt } from '../lib/useShouldAdapt';
import { useSubtitles } from '../lib/useSubtitles';
import type { CustomPlayEventDetail, Source } from '../lib/video';
import {
	customSelfHostedVideoPlayAudioEventName,
	customYoutubePlayEventName,
} from '../lib/video';
import { palette } from '../palette';
import type { RoleType } from '../types/content';
import type { VideoPlayerFormat } from '../types/mainMedia';
import { Caption } from './Caption';
import { CardPicture, type Props as CardPictureProps } from './CardPicture';
import { useConfig } from './ConfigContext';
import type {
	PLAYER_STATES,
	PlayerStates,
	SubtitleSize,
} from './SelfHostedVideoPlayer';
import { SelfHostedVideoPlayer } from './SelfHostedVideoPlayer';
import { ophanTrackerWeb } from './YoutubeAtom/eventEmitters';

const VISIBILITY_THRESHOLD = 0.5;

const videoContainerStyles = (
	isCinemagraph: boolean,
	aspectRatioOfVisibleVideo: number,
	containerAspectRatioMobile?: number,
	containerAspectRatioDesktop?: number,
) => css`
	position: relative;
	display: flex;
	background-color: ${palette('--video-background')};
	align-items: center;
	justify-content: space-around;
	${!isCinemagraph && `z-index: ${getZIndex('video-container')}`};

	/**
	 * Use the aspect ratio of the video, unless the aspect-ratio of the container is fixed
	 */
	aspect-ratio: ${aspectRatioOfVisibleVideo};
	${until.tablet} {
		${!isUndefined(containerAspectRatioMobile) &&
		`aspect-ratio: ${containerAspectRatioMobile};`}
	}
	${from.tablet} {
		${!isUndefined(containerAspectRatioDesktop) &&
		`aspect-ratio: ${containerAspectRatioDesktop};`}
	}
`;

const figureStyles = (
	aspectRatio: number,
	aspectRatioOfVisibleVideo: number,
	greyBarsAtSidesOnDesktop: boolean,
	greyBarsAtTopAndBottomOnDesktop: boolean,
	isVideoCroppedAtTopBottom: boolean,
	isVideoCroppedAtLeftRight: boolean,
	containerAspectRatioDesktop?: number,
) => css`
	position: relative;
	aspect-ratio: ${aspectRatioOfVisibleVideo};
	max-width: 100%;
	height: 100%;

	/**
	 * The grey bars fall outside of the figure element. The figure is the full height of the container.
	 * We need to work out how wide the video needs to be so that the height of the video matches
	 * the height of the container AND the video can maintain its aspect ratio.
	 */
	${greyBarsAtSidesOnDesktop &&
	css`
		${from.tablet} {
			${!isUndefined(containerAspectRatioDesktop) &&
			`max-width: ${
				aspectRatioOfVisibleVideo *
				(1 / containerAspectRatioDesktop) *
				100
			}%;`}
		}
	`}

	${greyBarsAtTopAndBottomOnDesktop &&
	css`
		${from.tablet} {
			height: fit-content;
		}
	`}

	${isVideoCroppedAtTopBottom &&
	css`
		overflow: hidden;
		display: flex;
		flex-direction: column;
		justify-content: center;
	`}

	${isVideoCroppedAtLeftRight &&
	css`
		overflow: hidden;
		display: flex;
		flex-direction: row;
		justify-content: center;

		video {
			width: ${(aspectRatio / aspectRatioOfVisibleVideo) * 100}%;
		}
	`}
`;

/**
 * Dispatches a custom play audio event so that other videos listening
 * for this event will be muted.
 */
export const dispatchCustomPlayAudioEvent = (uniqueId: string) => {
	document.dispatchEvent(
		new CustomEvent(customSelfHostedVideoPlayAudioEventName, {
			detail: { uniqueId },
		}),
	);
};

const logAndReportError = (src: string, error: Error) => {
	const message = `Autoplay failure for self-hosted video. Source: ${src} could not be played. Error: ${String(
		error,
	)}`;

	if (error instanceof Error) {
		window.guardian.modules.sentry.reportError(
			new Error(message),
			'self-hosted-video',
		);
	}

	log('dotcom', message);
};

/**
 * Initiates attention tracking for ophan
 */
const trackAttention = async (
	videoElement: HTMLVideoElement,
	atomId: string,
) => {
	try {
		const ophan = await getOphan('Web');
		ophan.trackComponentAttention(
			`gu-video-loop-${atomId}`,
			videoElement,
			VISIBILITY_THRESHOLD,
			true,
		);
	} catch (error) {
		log('dotcom', 'Failed to track video attention:', error);
	}
};

const dispatchOphanAttentionEvent = (
	eventType: 'videoPlaying' | 'videoPause',
) => {
	const event = new Event(eventType, { bubbles: true });
	document.dispatchEvent(event);
};

const getOptimisedPosterImage = (mainImage: string): string => {
	const resolution = window.devicePixelRatio >= 2 ? 'high' : 'low';

	return generateImageURL({
		mainImage,
		imageWidth: 940, // The widest a video can be: flexible special container, giga-boosted slot
		resolution,
		aspectRatio: '5:4',
	});
};

/**
 * Runs a series of browser-specific checks to determine if the video has audio.
 * We have run a test to check that all supported browsers are covered by these checks.
 */
const doesVideoHaveAudio = (video: HTMLVideoElement): boolean =>
	('mozHasAudio' in video && Boolean(video.mozHasAudio)) ||
	('webkitAudioDecodedByteCount' in video &&
		Boolean(video.webkitAudioDecodedByteCount)) ||
	('audioTracks' in video &&
		Boolean((video.audioTracks as { length: number }).length));

/**
 * Ensure the aspect ratio of the video is within the boundary, if specified.
 * For example, we may not want to render a square video inside a 4:5 feature card.
 */
const getAspectRatioOfVisibleVideo = (
	aspectRatio: number,
	minAspectRatio?: number,
	maxAspectRatio?: number,
): number => {
	if (minAspectRatio !== undefined && aspectRatio < minAspectRatio) {
		return minAspectRatio;
	}
	if (maxAspectRatio !== undefined && aspectRatio > maxAspectRatio) {
		return maxAspectRatio;
	}

	return aspectRatio;
};

type Props = {
	sources: Source[];
	atomId: string;
	uniqueId: string;
	height: number;
	width: number;
	videoStyle: VideoPlayerFormat;
	posterImage: string;
	fallbackImage: CardPictureProps['mainImage'];
	fallbackImageSize: CardPictureProps['imageSize'];
	fallbackImageLoading: CardPictureProps['loading'];
	fallbackImageAlt: CardPictureProps['alt'];
	fallbackImageAspectRatio: CardPictureProps['aspectRatio'];
	linkTo: string;
	showProgressBar?: boolean;
	subtitleSource?: string;
	subtitleSize: SubtitleSize;
	/** The position of subtitles and the audio icon. Usually at the bottom, with the exception of Feature Cards. */
	controlsPosition?: 'top' | 'bottom';
	/**
	 * The minimum/maximum aspect ratio the video will have. The video will be cropped if this
	 * value is defined and the video aspect ratio is less/greater than this value.
	 */
	minAspectRatio?: number;
	maxAspectRatio?: number;
	/**
	 * Specify this value to enforce the size of the video container on mobile/desktop.
	 * Grey bars will appear if this value is defined and differs from the video aspect ratio.
	 */
	containerAspectRatioMobile?: number;
	containerAspectRatioDesktop?: number;
	caption?: string;
	format?: ArticleFormat;
	isMainMedia?: boolean;
	role?: RoleType;
};

export const SelfHostedVideo = ({
	sources,
	atomId,
	uniqueId,
	height: expectedHeight,
	width: expectedWidth,
	videoStyle,
	posterImage,
	fallbackImage,
	fallbackImageSize,
	fallbackImageLoading,
	fallbackImageAlt,
	fallbackImageAspectRatio,
	linkTo,
	showProgressBar = true,
	subtitleSource,
	subtitleSize,
	controlsPosition = 'bottom',
	minAspectRatio,
	maxAspectRatio,
	containerAspectRatioMobile,
	containerAspectRatioDesktop,
	caption,
	format,
	isMainMedia,
	role,
}: Props) => {
	const adapted = useShouldAdapt();
	const { renderingTarget } = useConfig();
	const vidRef = useRef<HTMLVideoElement>(null);
	const [isPlayable, setIsPlayable] = useState(false);
	const [isMuted, setIsMuted] = useState(true);
	const [hasAudio, setHasAudio] = useState(true);
	const [showPosterImage, setShowPosterImage] = useState<boolean>(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [playerState, setPlayerState] =
		useState<(typeof PLAYER_STATES)[number]>('NOT_STARTED');
	const [isAutoplayAllowed, setIsAutoplayAllowed] = useState<boolean | null>(
		null,
	);
	const [hasPageBecomeActive, setHasPageBecomeActive] = useState(false);
	const [hasTrackedPlay, setHasTrackedPlay] = useState(false);
	/**
	 * The actual video is a better source of truth of its dimensions.
	 * The width and height from props are useful to prevent CLS.
	 */
	const [width, setWidth] = useState(expectedWidth);
	const [height, setHeight] = useState(expectedHeight);

	/**
	 * All controls on the video are hidden: the video looks like a GIF.
	 * This includes but may not be limited to: audio icon, play/pause icon, subtitles, progress bar.
	 */
	const isCinemagraph = videoStyle === 'Cinemagraph';

	const [isInView, setNode] = useIsInView({
		repeat: true,
		threshold: VISIBILITY_THRESHOLD,
	});

	const activeCue = useSubtitles({
		video: vidRef.current,
		playerState,
		currentTime,
	});

	const playVideo = useCallback(async () => {
		const video = vidRef.current;
		if (!video) return;

		/** https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay#example_handling_play_failures */
		const startPlayPromise = video.play();

		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- In earlier versions of the HTML specification, play() didn't return a value
		if (startPlayPromise !== undefined) {
			await startPlayPromise
				.then(() => {
					// Autoplay succeeded
					dispatchOphanAttentionEvent('videoPlaying');
					setPlayerState('PLAYING');
				})
				.catch((error: Error) => {
					// Autoplay failed
					logAndReportError(video.src, error);
					setShowPosterImage(true);
					setPlayerState('PAUSED_BY_BROWSER');
				});
		}
	}, []);

	const pauseVideo = (
		pauseReason: Extract<
			PlayerStates,
			| 'PAUSED_BY_USER'
			| 'PAUSED_BY_INTERSECTION_OBSERVER'
			| 'PAUSED_BY_BROWSER'
		>,
	) => {
		const video = vidRef.current;
		if (!video) return;

		if (pauseReason === 'PAUSED_BY_INTERSECTION_OBSERVER') {
			setIsMuted(true);
		}

		setPlayerState(pauseReason);
		dispatchOphanAttentionEvent('videoPause');

		void video.pause();
	};

	const playPauseVideo = () => {
		if (playerState === 'PLAYING') {
			if (isInView) {
				void pauseVideo('PAUSED_BY_USER');
			}
		} else {
			void playVideo();
		}
	};

	const FallbackImageComponent = (
		<CardPicture
			mainImage={fallbackImage}
			imageSize={fallbackImageSize}
			loading={fallbackImageLoading}
			aspectRatio={fallbackImageAspectRatio}
			alt={fallbackImageAlt}
		/>
	);

	const doesUserPermitAutoplay = (): boolean => {
		/**
		 * The user indicates a preference for reduced motion: https://web.dev/articles/prefers-reduced-motion
		 */
		const userPrefersReducedMotion = window.matchMedia(
			'(prefers-reduced-motion: reduce)',
		).matches;

		/**
		 * The user can set this on their Accessibility Settings page.
		 * Explicitly `false` when the user has said they don't want autoplay video.
		 */
		const autoplayPreference = storage.local.get(
			'gu.prefs.accessibility.autoplay-video',
		);

		return !userPrefersReducedMotion && autoplayPreference !== false;
	};

	/**
	 * Setup.
	 *
	 * 1. Determine whether we can autoplay video.
	 * 2. Initialise Ophan attention tracking.
	 * 3. Creates event listeners to control playback when there are multiple videos.
	 */
	useEffect(() => {
		setIsAutoplayAllowed(doesUserPermitAutoplay());

		/**
		 * Initialise Ophan attention tracking
		 */
		if (vidRef.current) {
			void trackAttention(vidRef.current, atomId);
		}

		/**
		 * Mutes the current video when another video is unmuted
		 * Triggered by the CustomEvent sent by each player on unmuting
		 */
		const handleCustomPlayAudioEvent = (
			event: CustomEventInit<CustomPlayEventDetail>,
		) => {
			if (event.detail) {
				const playedVideoId = event.detail.uniqueId;
				const thisVideoId = uniqueId;

				if (playedVideoId !== thisVideoId) {
					setIsMuted(true);
				}
			}
		};

		/**
		 * Mute the current video when a YouTube video is played
		 * Triggered by the CustomEvent in YoutubeAtomPlayer.
		 */
		const handleCustomPlayYoutubeEvent = () => {
			setIsMuted(true);
		};

		/**
		 * When the page is restored from BFCache, we need to retrigger autoplay,
		 * as the video player state will be PAUSED_BY_BROWSER.
		 */
		const handleRestoreFromCache = (event: PageTransitionEvent) => {
			if (event.persisted) {
				setIsAutoplayAllowed(doesUserPermitAutoplay());
				setHasPageBecomeActive(true);
			} else {
				setHasPageBecomeActive(false);
			}
		};

		/**
		 * When a user navigates away from the page and the page is hidden, the video will be
		 * paused by the browser, as the video is not visible. (e.g. switched tab, minimised window).
		 * When the page becomes visible again, we need to retrigger autoplay.
		 */
		const handlePageBecomesVisible = () => {
			setHasPageBecomeActive(true);
		};

		document.addEventListener(
			customSelfHostedVideoPlayAudioEventName,
			handleCustomPlayAudioEvent,
		);
		document.addEventListener(
			customYoutubePlayEventName,
			handleCustomPlayYoutubeEvent,
		);
		window.addEventListener('pageshow', function (event) {
			handleRestoreFromCache(event);
		});
		document.addEventListener('visibilitychange', () => {
			if (document.visibilityState === 'visible') {
				handlePageBecomesVisible();
			}
		});

		return () => {
			document.removeEventListener(
				customSelfHostedVideoPlayAudioEventName,
				handleCustomPlayAudioEvent,
			);
			document.removeEventListener(
				customYoutubePlayEventName,
				handleCustomPlayYoutubeEvent,
			);
			window.removeEventListener('pageshow', function (event) {
				handleRestoreFromCache(event);
			});
			document.removeEventListener('visibilitychange', () => {
				handlePageBecomesVisible();
			});
		};
	}, [uniqueId, atomId]);

	/**
	 * Track the first time the video comes into view.
	 */
	useOnce(() => {
		const video = vidRef.current;
		const resolution =
			video === null
				? 'unknown'
				: `${video.offsetWidth}x${video.offsetHeight}`;

		void submitComponentEvent(
			{
				component: {
					componentType: 'LOOP_VIDEO',
					id: `gu-video-loop-${atomId}`,
					labels: [linkTo, resolution],
				},
				action: 'VIEW',
			},
			'Web',
		);
	}, [isInView ? true : undefined]);

	/**
	 * Show a poster image if a video does NOT play automatically. Otherwise, we do not need
	 * to download the image as the video will be autoplayed and the image will not be seen.
	 *
	 * If the video is partially in view (not enough to trigger autoplay) and hasn't yet been
	 * seen, we want to show the poster image to avoid showing a blank space.
	 */
	useEffect(() => {
		if (
			isAutoplayAllowed === false ||
			(isInView === false && playerState === 'NOT_STARTED')
		) {
			setShowPosterImage(true);
		}
	}, [isAutoplayAllowed, isInView, playerState]);

	if (adapted) {
		return FallbackImageComponent;
	}

	const handleLoadedMetadata = () => {
		const video = vidRef.current;
		if (!video) return;

		const track = video.textTracks[0];
		if (!track?.cues) return;
		const pxFromBottom = space[3];
		const videoHeight = video.getBoundingClientRect().height;
		const percentFromTop =
			((videoHeight - pxFromBottom) / videoHeight) * 100;

		for (const cue of Array.from(track.cues)) {
			if (cue instanceof VTTCue) {
				cue.snapToLines = false;
				cue.line = percentFromTop;
			}
		}
	};

	const handleLoadedData = () => {
		const video = vidRef.current;
		if (!video) return;

		setHasAudio(doesVideoHaveAudio(video));

		if (video.videoWidth > 0 && video.videoHeight > 0) {
			setWidth(video.videoWidth);
			setHeight(video.videoHeight);
		}
	};

	const handleCanPlay = () => {
		if (!isPlayable) {
			setIsPlayable(true);
		}
	};

	/**
	 * Track the first successful video play in Ophan.
	 */
	const handlePlaying = () => {
		if (hasTrackedPlay) return;

		ophanTrackerWeb(atomId, 'loop')('play');
		setHasTrackedPlay(true);
	};

	const handlePlayPauseClick = (event: React.SyntheticEvent) => {
		if (isCinemagraph) return;

		event.preventDefault();
		playPauseVideo();
	};

	const handleAudioClick = (event: React.SyntheticEvent) => {
		if (isCinemagraph) return;

		void submitClickComponentEvent(event.currentTarget, renderingTarget);

		event.stopPropagation(); // Don't pause the video

		if (isMuted) {
			// Emit video play audio event so other components are aware when a video is played with sound
			dispatchCustomPlayAudioEvent(uniqueId);
			setIsMuted(false);
		} else {
			setIsMuted(true);
		}
	};

	const handleFullscreenClick = async (event: React.SyntheticEvent) => {
		void submitClickComponentEvent(event.currentTarget, renderingTarget);
		event.stopPropagation(); // Don't pause the video
		const video = vidRef.current;

		if (!video) return;

		if (!document.fullscreenElement) {
			await video.requestFullscreen();
		} else {
			await document.exitFullscreen();
		}
	};

	/**
	 * If the video was paused and we know that it wasn't paused by the user
	 * or the intersection observer, we can deduce that it was paused by the
	 * browser. Therefore we need to apply the pause state to the video.
	 */
	const handlePause = () => {
		if (isCinemagraph) return;

		if (
			playerState === 'PAUSED_BY_USER' ||
			playerState === 'PAUSED_BY_INTERSECTION_OBSERVER'
		) {
			return;
		}

		pauseVideo('PAUSED_BY_BROWSER');
	};

	/**
	 * If the video could not be loaded due to an error, report to
	 * Sentry and log in the console.
	 */
	const onError = () => {
		const message = `Self-hosted video could not be played. source: ${
			vidRef.current?.currentSrc ?? 'unknown'
		}`;

		window.guardian.modules.sentry.reportError(
			new Error(message),
			'self-hosted-video',
		);

		log('dotcom', message);
	};

	const seekForward = () => {
		if (vidRef.current) {
			const newTime = Math.min(
				vidRef.current.currentTime + 1,
				vidRef.current.duration,
			);

			vidRef.current.currentTime = newTime;
			setCurrentTime(newTime);
		}
	};

	const seekBackward = () => {
		if (vidRef.current) {
			// Allow the user to cycle to the end of the video using the arrow keys
			const newTime =
				(((vidRef.current.currentTime - 1) % vidRef.current.duration) +
					vidRef.current.duration) %
				vidRef.current.duration;

			vidRef.current.currentTime = newTime;
			setCurrentTime(newTime);
		}
	};

	const handleKeyDown = (
		event: React.KeyboardEvent<HTMLVideoElement>,
	): void => {
		if (isCinemagraph) return;

		switch (event.key) {
			case 'Enter':
			case ' ':
				event.preventDefault();
				playPauseVideo();
				break;
			case 'Escape':
				pauseVideo('PAUSED_BY_USER');
				break;
			case 'ArrowRight':
				seekForward();
				break;
			case 'ArrowLeft':
				seekBackward();
				break;
			case 'm':
				setIsMuted(!isMuted);
				break;
		}
	};

	/**
	 * Autoplay/resume playback when the player comes into view or when
	 * the page has been restored from the BFCache.
	 *
	 * Stops playback when the video is scrolled out of view.
	 */
	if (vidRef.current && isPlayable) {
		if (
			isAutoplayAllowed &&
			isInView &&
			(playerState === 'NOT_STARTED' ||
				playerState === 'PAUSED_BY_INTERSECTION_OBSERVER' ||
				(hasPageBecomeActive && playerState === 'PAUSED_BY_BROWSER'))
		) {
			if (hasPageBecomeActive) {
				setHasPageBecomeActive(false);
			}
			void playVideo();
		} else if (playerState === 'PLAYING' && isInView === false) {
			void pauseVideo('PAUSED_BY_INTERSECTION_OBSERVER');
		}
	}

	/**
	 * Show the play icon when the video is not playing, except for when it is scrolled
	 * out of view. In this case, the intersection observer will resume playback and
	 * having a play icon would falsely indicate a user action is required to resume playback.
	 */
	const showPlayIcon =
		playerState === 'PAUSED_BY_USER' ||
		playerState === 'PAUSED_BY_BROWSER' ||
		(playerState === 'NOT_STARTED' && !isAutoplayAllowed);

	const aspectRatio = width / height;

	/** The aspect ratio of the video will be clamped within the specified range */
	const aspectRatioOfVisibleVideo = getAspectRatioOfVisibleVideo(
		aspectRatio,
		minAspectRatio,
		maxAspectRatio,
	);

	const isVideoCroppedAtTopBottom = aspectRatio < aspectRatioOfVisibleVideo;
	const isVideoCroppedAtLeftRight = aspectRatio > aspectRatioOfVisibleVideo;

	const isGreyBarsAtSidesOnDesktop =
		containerAspectRatioDesktop !== undefined &&
		containerAspectRatioDesktop > aspectRatioOfVisibleVideo;

	const isGreyBarsAtTopAndBottomOnDesktop =
		containerAspectRatioDesktop !== undefined &&
		containerAspectRatioDesktop < aspectRatioOfVisibleVideo;

	const AudioIcon = isMuted ? SvgAudioMute : SvgAudio;

	const optimisedPosterImage = showPosterImage
		? getOptimisedPosterImage(posterImage)
		: undefined;

	/**
	 * We almost always want to preload some of the video data. The exception
	 * is when autoplay is off and the video is only partially in view.
	 */
	const preloadPartialData = !!isAutoplayAllowed || !!isInView;

	return (
		<figure
			className={`video-container ${videoStyle.toLocaleLowerCase()} ${
				role === 'immersive' ? 'element-video-immersive' : ''
			}`}
			data-component="gu-video-loop"
		>
			<div
				ref={setNode}
				css={[
					videoContainerStyles(
						isCinemagraph,
						aspectRatioOfVisibleVideo,
						containerAspectRatioMobile,
						containerAspectRatioDesktop,
					),
				]}
			>
				<div
					css={figureStyles(
						aspectRatio,
						aspectRatioOfVisibleVideo,
						isGreyBarsAtSidesOnDesktop,
						isGreyBarsAtTopAndBottomOnDesktop,
						isVideoCroppedAtTopBottom,
						isVideoCroppedAtLeftRight,
						containerAspectRatioDesktop,
					)}
				>
					<SelfHostedVideoPlayer
						sources={sources}
						atomId={atomId}
						uniqueId={uniqueId}
						width={width}
						height={height}
						videoStyle={videoStyle}
						posterImage={optimisedPosterImage}
						FallbackImageComponent={FallbackImageComponent}
						currentTime={currentTime}
						setCurrentTime={setCurrentTime}
						ref={vidRef}
						isPlayable={isPlayable}
						playerState={playerState}
						isMuted={isMuted}
						handleLoadedMetadata={handleLoadedMetadata}
						handleLoadedData={handleLoadedData}
						handleCanPlay={handleCanPlay}
						handlePlaying={handlePlaying}
						handlePlayPauseClick={handlePlayPauseClick}
						handleAudioClick={handleAudioClick}
						handleKeyDown={handleKeyDown}
						handlePause={handlePause}
						onError={onError}
						AudioIcon={hasAudio ? AudioIcon : null}
						preloadPartialData={preloadPartialData}
						showPlayIcon={showPlayIcon}
						showProgressBar={showProgressBar}
						subtitleSource={subtitleSource}
						subtitleSize={subtitleSize}
						controlsPosition={controlsPosition}
						activeCue={activeCue}
					/>
				</div>
			</div>
			{!!caption && format && (
				<Caption
					captionText={caption}
					format={format}
					isMainMedia={isMainMedia}
					mediaType="SelfHostedVideo"
				/>
			)}
		</figure>
	);
};
