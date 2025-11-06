import { css } from '@emotion/react';
import { log, storage } from '@guardian/libs';
import { space } from '@guardian/source/foundations';
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
	customLoopPlayAudioEventName,
	customYoutubePlayEventName,
} from '../lib/video';
import { CardPicture, type Props as CardPictureProps } from './CardPicture';
import { useConfig } from './ConfigContext';
import type {
	PLAYER_STATES,
	PlayerStates,
	SubtitleSize,
} from './LoopVideoPlayer';
import { LoopVideoPlayer } from './LoopVideoPlayer';
import { ophanTrackerWeb } from './YoutubeAtom/eventEmitters';

const videoContainerStyles = css`
	z-index: ${getZIndex('loop-video-container')};
	position: relative;
`;

/**
 * Dispatches a custom play audio event so that other videos listening
 * for this event will be muted.
 */
export const dispatchCustomPlayAudioEvent = (uniqueId: string) => {
	document.dispatchEvent(
		new CustomEvent(customLoopPlayAudioEventName, {
			detail: { uniqueId },
		}),
	);
};

const logAndReportError = (src: string, error: Error) => {
	const message = `Autoplay failure for loop video. Source: ${src} could not be played. Error: ${String(
		error,
	)}`;

	if (error instanceof Error) {
		window.guardian.modules.sentry.reportError(
			new Error(message),
			'loop-video',
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
		imageWidth: 940, // The widest a looping video can be: Flexible special, giga-boosted
		resolution,
		aspectRatio: '5:4',
	});
};

/**
 * Runs a series of browser-specific checks to determine if the video has audio.
 */
const doesVideoHaveAudio = (video: HTMLVideoElement): boolean => {
	// If there exists a browser that does not support any of these properties, we are
	// unable to detect whether the video has audio. Therefore, we assume it has audio,
	// so that the unmute/mute icon is displayed.
	if (
		!('mozHasAudio' in video) &&
		!('webkitAudioDecodedByteCount' in video) &&
		!('audioTracks' in video)
	) {
		// Gather data on what browsers do not support these properties.
		window.guardian.modules.sentry.reportError(
			new Error(
				'Could not determine if video has audio. This is likely due to the browser not supporting the necessary properties.',
			),
			'loop-video',
		);

		return true;
	}

	return (
		('mozHasAudio' in video && Boolean(video.mozHasAudio)) ||
		('webkitAudioDecodedByteCount' in video &&
			Boolean(video.webkitAudioDecodedByteCount)) ||
		('audioTracks' in video &&
			Boolean((video.audioTracks as { length: number }).length))
	);
};

type Props = {
	sources: Source[];
	atomId: string;
	uniqueId: string;
	height: number;
	width: number;
	posterImage: string;
	fallbackImage: CardPictureProps['mainImage'];
	fallbackImageSize: CardPictureProps['imageSize'];
	fallbackImageLoading: CardPictureProps['loading'];
	fallbackImageAlt: CardPictureProps['alt'];
	fallbackImageAspectRatio: CardPictureProps['aspectRatio'];
	linkTo: string;
	subtitleSource?: string;
	subtitleSize: SubtitleSize;
	/** Feature flag for the enabling CORS loading on looping video */
	enableLoopVideoCORS?: boolean;
};

export const LoopVideo = ({
	sources,
	atomId,
	uniqueId,
	height,
	width,
	posterImage,
	fallbackImage,
	fallbackImageSize,
	fallbackImageLoading,
	fallbackImageAlt,
	fallbackImageAspectRatio,
	linkTo,
	subtitleSource,
	subtitleSize,
	enableLoopVideoCORS = false,
}: Props) => {
	const adapted = useShouldAdapt();
	const { renderingTarget } = useConfig();
	const vidRef = useRef<HTMLVideoElement>(null);
	const [isPlayable, setIsPlayable] = useState(false);
	const [isMuted, setIsMuted] = useState(true);
	const [hasAudio, setHasAudio] = useState(true);
	const [showPlayIcon, setShowPlayIcon] = useState(false);
	const [preloadPartialData, setPreloadPartialData] = useState(false);
	const [showPosterImage, setShowPosterImage] = useState<boolean>(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [playerState, setPlayerState] =
		useState<(typeof PLAYER_STATES)[number]>('NOT_STARTED');
	const [isAutoplayAllowed, setIsAutoplayAllowed] = useState<boolean | null>(
		null,
	);
	const [hasPageBecomeActive, setHasPageBecomeActive] = useState(false);

	/**
	 * Keep a track of whether the video has been in view. We only
	 * want to pause the video if it has been in view.
	 */
	const [hasBeenInView, setHasBeenInView] = useState(false);
	const [hasBeenPlayed, setHasBeenPlayed] = useState(false);
	const [hasTrackedPlay, setHasTrackedPlay] = useState(false);

	const VISIBILITY_THRESHOLD = 0.5;

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
			customLoopPlayAudioEventName,
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
				customLoopPlayAudioEventName,
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

	/**
	 * We almost always want to preload some of the video data. If a user has prefers-reduced-motion
	 * enabled, then the video will only be partially preloaded (metadata + small amount of video)
	 * when it comes into view.
	 */
	useEffect(() => {
		setPreloadPartialData(isAutoplayAllowed === false || !!isInView);
	}, [isAutoplayAllowed, isInView]);

	if (renderingTarget !== 'Web') return null;

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
		if (vidRef.current) {
			setHasAudio(doesVideoHaveAudio(vidRef.current));
		}
	};

	const handleCanPlay = () => {
		if (!isPlayable) {
			setIsPlayable(true);
		}
	};

	const handlePlayPauseClick = (event: React.SyntheticEvent) => {
		event.preventDefault();
		playPauseVideo();
	};

	const handleAudioClick = (event: React.SyntheticEvent) => {
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
		const message = `Loop video could not be played. source: ${
			vidRef.current?.currentSrc ?? 'unknown'
		}`;

		window.guardian.modules.sentry.reportError(
			new Error(message),
			'loop-video',
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

	const AudioIcon = isMuted ? SvgAudioMute : SvgAudio;

	const optimisedPosterImage = showPosterImage
		? getOptimisedPosterImage(posterImage)
		: undefined;

	return (
		<figure
			ref={setNode}
			css={videoContainerStyles}
			className="loop-video-container"
			data-component="gu-video-loop"
		>
			<LoopVideoPlayer
				sources={sources}
				atomId={atomId}
				uniqueId={uniqueId}
				width={width}
				height={height}
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
				subtitleSource={subtitleSource}
				subtitleSize={subtitleSize}
				activeCue={activeCue}
				enableLoopVideoCORS={enableLoopVideoCORS}
			/>
		</figure>
	);
};
