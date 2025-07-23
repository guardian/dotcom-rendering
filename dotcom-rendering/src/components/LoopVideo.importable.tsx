import { css } from '@emotion/react';
import { log, storage } from '@guardian/libs';
import { SvgAudio, SvgAudioMute } from '@guardian/source/react-components';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
	submitClickComponentEvent,
	submitComponentEvent,
} from '../client/ophan/ophan';
import { getZIndex } from '../lib/getZIndex';
import { useIsInView } from '../lib/useIsInView';
import { useShouldAdapt } from '../lib/useShouldAdapt';
import type { CustomPlayEventDetail } from '../lib/video';
import {
	customLoopPlayAudioEventName,
	customYoutubePlayEventName,
} from '../lib/video';
import { CardPicture, type Props as CardPictureProps } from './CardPicture';
import { useConfig } from './ConfigContext';
import type { PLAYER_STATES, PlayerStates } from './LoopVideoPlayer';
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

type Props = {
	src: string;
	atomId: string;
	uniqueId: string;
	width: number;
	height: number;
	image: string;
	fallbackImage: CardPictureProps['mainImage'];
	fallbackImageSize: CardPictureProps['imageSize'];
	fallbackImageLoading: CardPictureProps['loading'];
	fallbackImageAlt: CardPictureProps['alt'];
	fallbackImageAspectRatio: CardPictureProps['aspectRatio'];
};

export const LoopVideo = ({
	src,
	atomId,
	uniqueId,
	width,
	height,
	image,
	fallbackImage,
	fallbackImageSize,
	fallbackImageLoading,
	fallbackImageAlt,
	fallbackImageAspectRatio,
}: Props) => {
	const adapted = useShouldAdapt();
	const { renderingTarget } = useConfig();
	const vidRef = useRef<HTMLVideoElement>(null);
	const [isPlayable, setIsPlayable] = useState(false);
	const [isMuted, setIsMuted] = useState(true);
	const [showPlayIcon, setShowPlayIcon] = useState(false);
	const [preloadPartialData, setPreloadPartialData] = useState(false);
	const [posterImage, setPosterImage] = useState<string | undefined>(
		undefined,
	);
	const [currentTime, setCurrentTime] = useState(0);
	const [playerState, setPlayerState] =
		useState<(typeof PLAYER_STATES)[number]>('NOT_STARTED');

	const [isAutoplayAllowed, setIsAutoplayAllowed] = useState<boolean | null>(
		null,
	);

	/**
	 * Keep a track of whether the video has been in view. We only
	 * want to pause the video if it has been in view.
	 */
	const [hasBeenInView, setHasBeenInView] = useState(false);

	const [isInView, setNode] = useIsInView({
		repeat: true,
		threshold: 0.5,
	});

	const playVideo = useCallback(async () => {
		if (!vidRef.current) return;

		/** https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay#example_handling_play_failures */
		const startPlayPromise = vidRef.current.play();

		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- In earlier versions of the HTML specification, play() didn't return a value
		if (startPlayPromise !== undefined) {
			await startPlayPromise
				.then(() => {
					// Autoplay succeeded
					setPlayerState('PLAYING');
				})
				.catch((error: Error) => {
					// Autoplay failed
					logAndReportError(src, error);
					setPosterImage(image);
					setPlayerState('PAUSED_BY_BROWSER');
				});
		}
	}, [src, image]);

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

	/**
	 * Setup.
	 *
	 * 1. Register the user's motion preferences.
	 * 2. Creates event listeners to control playback when there are multiple videos.
	 */
	useEffect(() => {
		/**
		 * The user indicates a preference for reduced motion: https://web.dev/articles/prefers-reduced-motion
		 */
		const userPrefersReducedMotion = window.matchMedia(
			'(prefers-reduced-motion: reduce)',
		).matches;

		const autoplayPreference = storage.local.get(
			'gu.prefs.accessibility.autoplay-video',
		);
		/**
		 * `autoplayPreference` is explicitly `false`
		 *  when the user has said they don't want autoplay video.
		 */
		setIsAutoplayAllowed(
			!userPrefersReducedMotion && autoplayPreference !== false,
		);

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

		document.addEventListener(
			customLoopPlayAudioEventName,
			handleCustomPlayAudioEvent,
		);
		document.addEventListener(
			customYoutubePlayEventName,
			handleCustomPlayYoutubeEvent,
		);

		return () => {
			document.removeEventListener(
				customLoopPlayAudioEventName,
				handleCustomPlayAudioEvent,
			);
			document.removeEventListener(
				customYoutubePlayEventName,
				handleCustomPlayYoutubeEvent,
			);
		};
	}, [uniqueId]);

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
					},
					action: 'VIEW',
				},
				'Web',
			);

			setHasBeenInView(true);
		}
	}, [isInView, hasBeenInView, atomId]);

	/**
	 * Autoplay the video when it comes into view.
	 */
	useEffect(() => {
		if (!vidRef.current || isAutoplayAllowed === false) {
			return;
		}

		if (
			isInView &&
			isPlayable &&
			(playerState === 'NOT_STARTED' ||
				playerState === 'PAUSED_BY_INTERSECTION_OBSERVER')
		) {
			/**
			 * Check if the video has not been in view before tracking the play.
			 * This is so we only track the first play.
			 */
			if (!hasBeenInView) {
				ophanTrackerWeb(atomId, 'loop')('play');
			}

			void playVideo();
		}
	}, [
		isAutoplayAllowed,
		isInView,
		isPlayable,
		playerState,
		playVideo,
		hasBeenInView,
		atomId,
	]);

	/**
	 * Stops playback when the video is scrolled out of view.
	 * Resumes playback when the video is back in the viewport.
	 */
	useEffect(() => {
		if (!vidRef.current || !hasBeenInView) return;

		const isNoLongerInView =
			playerState === 'PLAYING' && isInView === false;
		if (isNoLongerInView) {
			pauseVideo('PAUSED_BY_INTERSECTION_OBSERVER');
		}

		/**
		 * If a user action paused the video, they have indicated
		 * that they don't want to watch the video. Therefore, don't
		 * resume the video when it comes back in view.
		 */
		const isBackInView =
			playerState === 'PAUSED_BY_INTERSECTION_OBSERVER' && isInView;
		if (isBackInView) {
			void playVideo();
		}
	}, [isInView, hasBeenInView, playerState, playVideo]);

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
			setPosterImage(image);
		}
	}, [isAutoplayAllowed, isInView, hasBeenInView, image]);

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
		const message = `Loop video could not be played. source: ${src}`;

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

	return (
		<figure
			ref={setNode}
			css={videoContainerStyles}
			className="loop-video-container"
			data-component="gu-video-loop"
		>
			<LoopVideoPlayer
				src={src}
				atomId={atomId}
				uniqueId={uniqueId}
				width={width}
				height={height}
				posterImage={posterImage}
				FallbackImageComponent={FallbackImageComponent}
				currentTime={currentTime}
				setCurrentTime={setCurrentTime}
				ref={vidRef}
				isPlayable={isPlayable}
				playerState={playerState}
				isMuted={isMuted}
				handleCanPlay={handleCanPlay}
				handlePlayPauseClick={handlePlayPauseClick}
				handleAudioClick={handleAudioClick}
				handleKeyDown={handleKeyDown}
				handlePause={handlePause}
				onError={onError}
				AudioIcon={AudioIcon}
				preloadPartialData={preloadPartialData}
				showPlayIcon={showPlayIcon}
			/>
		</figure>
	);
};
