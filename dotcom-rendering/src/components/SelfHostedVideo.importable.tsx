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
import { getZIndex } from '../lib/getZIndex';
import { generateImageURL } from '../lib/image';
import { useIsInView } from '../lib/useIsInView';
import { useShouldAdapt } from '../lib/useShouldAdapt';
import { useSubtitles } from '../lib/useSubtitles';
import type { CustomPlayEventDetail, Source } from '../lib/video';
import {
	customSelfHostedVideoPlayAudioEventName,
	customYoutubePlayEventName,
} from '../lib/video';
import { palette } from '../palette';
import type { VideoPlayerFormat } from '../types/mainMedia';
import { CardPicture, type Props as CardPictureProps } from './CardPicture';
import { useConfig } from './ConfigContext';
import type {
	PLAYER_STATES,
	PlayerStates,
	SubtitleSize,
} from './SelfHostedVideoPlayer';
import { SelfHostedVideoPlayer } from './SelfHostedVideoPlayer';
import { ophanTrackerWeb } from './YoutubeAtom/eventEmitters';

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
}: Props) => {
	const adapted = useShouldAdapt();
	const { renderingTarget } = useConfig();
	const vidRef = useRef<HTMLVideoElement>(null);
	const [isPlayable, setIsPlayable] = useState(false);
	const [isMuted, setIsMuted] = useState(true);
	const [hasAudio, setHasAudio] = useState(true);
	const [showPlayIcon, setShowPlayIcon] = useState(false);
	const [showPosterImage, setShowPosterImage] = useState<boolean>(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [playerState, setPlayerState] =
		useState<(typeof PLAYER_STATES)[number]>('NOT_STARTED');
	const [isAutoplayAllowed, setIsAutoplayAllowed] = useState<boolean | null>(
		null,
	);
	const [hasPageBecomeActive, setHasPageBecomeActive] = useState(false);
	/**
	 * Keeps track of whether the video has been in view.
	 * For example, we only want to try to pause the video if it has been in view.
	 */
	const [hasBeenInView, setHasBeenInView] = useState(false);
	const [hasBeenPlayed, setHasBeenPlayed] = useState(false);
	const [hasTrackedPlay, setHasTrackedPlay] = useState(false);
	/**
	 * The actual video is a better source of truth of its dimensions.
	 * The width and height from props are useful to prevent CLS.
	 */
	const [width, setWidth] = useState(expectedWidth);
	const [height, setHeight] = useState(expectedHeight);

	const VISIBILITY_THRESHOLD = 0.5;

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
					setHasBeenPlayed(true);
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
		reason: Extract<
			PlayerStates,
			| 'PAUSED_BY_USER'
			| 'PAUSED_BY_INTERSECTION_OBSERVER'
			| 'PAUSED_BY_BROWSER'
		>,
	) => {
		if (!vidRef.current) return;

		if (reason === 'PAUSED_BY_INTERSECTION_OBSERVER') {
			setIsMuted(true);
		}

		setPlayerState(reason);
		dispatchOphanAttentionEvent('videoPause');
		void vidRef.current.pause();
	};

	const playPauseVideo = () => {
		if (playerState === 'PLAYING') {
			if (isInView) {
				pauseVideo('PAUSED_BY_USER');
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
	 * 2. Creates event listeners to control playback when there are multiple videos.
	 */
	useEffect(() => {
		setIsAutoplayAllowed(doesUserPermitAutoplay());

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
	}, [uniqueId]);

	/**
	 * Initiates attention tracking for ophan
	 */
	useEffect(() => {
		const video = vidRef.current;
		if (!video) return;
		const trackAttention = async () => {
			try {
				const ophan = await getOphan('Web');
				ophan.trackComponentAttention(
					`gu-video-loop-${atomId}`,
					video,
					VISIBILITY_THRESHOLD,
					true,
				);
			} catch (error) {
				log('dotcom', 'Failed to track video attention:', error);
			}
		};

		void trackAttention();
	}, [atomId]);

	/**
	 * Keeps track of whether the video has been in view or not.
	 */
	useEffect(() => {
		if (isInView && !hasBeenInView) {
			/**
			 * Track the first time the video comes into view.
			 */
			void submitComponentEvent(
				{
					component: {
						componentType: 'LOOP_VIDEO',
						id: `gu-video-loop-${atomId}`,
						labels: [linkTo],
					},
					action: 'VIEW',
				},
				'Web',
			);

			setHasBeenInView(true);
		}
	}, [isInView, hasBeenInView, atomId, linkTo]);

	/**
	 * Track the first successful video play in Ophan.
	 *
	 * This effect runs only after the video has actually started playing
	 * for the first time. This is to ensure we don't double-report the event.
	 */
	useEffect(() => {
		if (!hasBeenPlayed || hasTrackedPlay) return;

		ophanTrackerWeb(atomId, 'loop')('play');
		setHasTrackedPlay(true);
	}, [atomId, hasBeenPlayed, hasTrackedPlay]);

	/**
	 * Handle play/pause, when instigated by the browser.
	 */
	useEffect(() => {
		if (!vidRef.current || !isPlayable) {
			return;
		}

		/**
		 * Stops playback when the video is scrolled out of view.
		 */
		const isNoLongerInView =
			playerState === 'PLAYING' && hasBeenInView && isInView === false;
		if (isNoLongerInView) {
			pauseVideo('PAUSED_BY_INTERSECTION_OBSERVER');
			return;
		}

		/**
		 * Autoplay/resume playback when the player comes into view or when
		 * the page has been restored from the BFCache.
		 */
		if (
			isAutoplayAllowed &&
			isInView &&
			(playerState === 'NOT_STARTED' ||
				playerState === 'PAUSED_BY_INTERSECTION_OBSERVER' ||
				(hasPageBecomeActive && playerState === 'PAUSED_BY_BROWSER'))
		) {
			setHasPageBecomeActive(false);
			void playVideo();
		}
	}, [
		isAutoplayAllowed,
		isInView,
		isPlayable,
		playerState,
		playVideo,
		hasBeenInView,
		hasPageBecomeActive,
		atomId,
	]);

	/**
	 * Show the play icon when the video is not playing, except for when it is scrolled
	 * out of view. In this case, the intersection observer will resume playback and
	 * having a play icon would falsely indicate a user action is required to resume playback.
	 */
	useEffect(() => {
		const shouldShowPlayIcon =
			playerState === 'PAUSED_BY_USER' ||
			playerState === 'PAUSED_BY_BROWSER' ||
			(playerState === 'NOT_STARTED' && !isAutoplayAllowed);
		setShowPlayIcon(shouldShowPlayIcon);
	}, [playerState, isAutoplayAllowed]);

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
			(isInView === false && !hasBeenInView)
		) {
			setShowPosterImage(true);
		}
	}, [isAutoplayAllowed, isInView, hasBeenInView]);

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
		<div
			css={[
				videoContainerStyles(
					isCinemagraph,
					aspectRatioOfVisibleVideo,
					containerAspectRatioMobile,
					containerAspectRatioDesktop,
				),
			]}
		>
			<figure
				ref={setNode}
				css={figureStyles(
					aspectRatio,
					aspectRatioOfVisibleVideo,
					isGreyBarsAtSidesOnDesktop,
					isGreyBarsAtTopAndBottomOnDesktop,
					isVideoCroppedAtTopBottom,
					isVideoCroppedAtLeftRight,
					containerAspectRatioDesktop,
				)}
				className={`video-container ${videoStyle.toLocaleLowerCase()}`}
				data-component="gu-video-loop"
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
			</figure>
		</div>
	);
};
