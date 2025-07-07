import { css } from '@emotion/react';
import { log } from '@guardian/libs';
import { SvgAudio, SvgAudioMute } from '@guardian/source/react-components';
import { useEffect, useRef, useState } from 'react';
import { getZIndex } from '../lib/getZIndex';
import { useIsInView } from '../lib/useIsInView';
import { useShouldAdapt } from '../lib/useShouldAdapt';
import type { CustomPlayEventDetail } from '../lib/video';
import {
	customLoopPlayAudioEventName,
	customYoutubePlayEventName,
} from '../lib/video';
import { useConfig } from './ConfigContext';
import type { PLAYER_STATES } from './LoopVideoPlayer';
import { LoopVideoPlayer } from './LoopVideoPlayer';

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

type Props = {
	src: string;
	uniqueId: string;
	width: number;
	height: number;
	thumbnailImage: string;
	fallbackImageComponent: JSX.Element;
};

export const LoopVideo = ({
	src,
	uniqueId,
	width,
	height,
	thumbnailImage,
	fallbackImageComponent,
}: Props) => {
	const adapted = useShouldAdapt();
	const { renderingTarget } = useConfig();
	const vidRef = useRef<HTMLVideoElement>(null);
	const [isPlayable, setIsPlayable] = useState(false);
	const [isMuted, setIsMuted] = useState(true);
	const [currentTime, setCurrentTime] = useState(0);
	const [playerState, setPlayerState] =
		useState<(typeof PLAYER_STATES)[number]>('NOT_STARTED');

	// The user indicates a preference for reduced motion: https://web.dev/articles/prefers-reduced-motion
	const [prefersReducedMotion, setPrefersReducedMotion] = useState<
		boolean | null
	>(null);

	/**
	 * Keep a track of whether the video has been in view. We only want to
	 * pause the video if it has been in view.
	 */
	const [hasBeenInView, setHasBeenInView] = useState(false);

	const [isInView, setNode] = useIsInView({
		repeat: true,
		threshold: 0.5,
	});

	/**
	 * Setup.
	 *
	 * Register the users motion preferences.
	 * Creates an event listener to ensure we don't play audio from multiple loops
	 */
	useEffect(() => {
		const userPrefersReducedMotion = window.matchMedia(
			'(prefers-reduced-motion: reduce)',
		).matches;
		setPrefersReducedMotion(userPrefersReducedMotion);

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
		 * Mute the current video when a Youtube video is played
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
	 * Autoplay the video when it comes into view.
	 */
	useEffect(() => {
		if (!vidRef.current || prefersReducedMotion !== false) {
			return;
		}

		if (
			isInView &&
			isPlayable &&
			(playerState === 'NOT_STARTED' ||
				playerState === 'PAUSED_BY_INTERSECTION_OBSERVER')
		) {
			setPlayerState('PLAYING');
			setHasBeenInView(true);

			void vidRef.current.play();
		}
	}, [isInView, isPlayable, playerState, prefersReducedMotion]);

	/**
	 * Stops playback when the video is scrolled out of view, resumes playbacks
	 * when the video is back in the viewport.
	 */
	useEffect(() => {
		if (!vidRef.current || !hasBeenInView) return;

		const isNoLongerInView = playerState === 'PLAYING' && !isInView;
		if (isNoLongerInView) {
			setPlayerState('PAUSED_BY_INTERSECTION_OBSERVER');
			void vidRef.current.pause();
			setIsMuted(true);
		}

		/**
		 * If a user action paused the video, they have indicated
		 * that they don't want to watch the video. Therefore, don't
		 * resume the video when it comes back in view
		 */
		const isBackInView =
			playerState === 'PAUSED_BY_INTERSECTION_OBSERVER' && isInView;
		if (isBackInView) {
			setPlayerState('PLAYING');

			void vidRef.current.play();
		}
	}, [isInView, hasBeenInView, playerState]);

	if (renderingTarget !== 'Web') return null;

	if (adapted) return fallbackImageComponent;

	const playVideo = () => {
		if (!vidRef.current) return;

		setPlayerState('PLAYING');
		setHasBeenInView(true);
		void vidRef.current.play();
	};

	const pauseVideo = () => {
		if (!vidRef.current) return;

		setPlayerState('PAUSED_BY_USER');
		void vidRef.current.pause();
	};

	const playPauseVideo = () => {
		if (playerState === 'PLAYING') {
			if (isInView) {
				pauseVideo();
			}
		} else {
			playVideo();
		}
	};

	const handlePlayPauseClick = (event: React.SyntheticEvent) => {
		event.preventDefault();
		playPauseVideo();
	};

	const handleAudioClick = (event: React.SyntheticEvent) => {
		event.stopPropagation(); // Don't pause the video

		if (isMuted) {
			// Emit video play audio event so other components are aware when a video is played with sound
			dispatchCustomPlayAudioEvent(uniqueId);
			setIsMuted(false);
		} else {
			setIsMuted(true);
		}
	};

	const onError = () => {
		window.guardian.modules.sentry.reportError(
			new Error(`Loop video could not be played. source: ${src}`),
			'loop-video',
		);
		log('dotcom', `Loop video could not be played. source: ${src}`);
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
				pauseVideo();
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

	// We only show a poster image when the user has indicated that they do
	// not want videos to play automatically, e.g. prefers reduced motion. Otherwise,
	// we do not need to download the image as the video will be autoplayed.
	const posterImage =
		!!prefersReducedMotion || isInView === false
			? thumbnailImage
			: undefined;

	const showPlayIcon =
		playerState === 'PAUSED_BY_USER' ||
		(!!prefersReducedMotion && playerState === 'NOT_STARTED');

	const shouldPreloadData = !!isInView || prefersReducedMotion === false;

	return (
		<div
			ref={setNode}
			css={videoContainerStyles}
			className="loop-video-container"
		>
			<LoopVideoPlayer
				src={src}
				uniqueId={uniqueId}
				width={width}
				height={height}
				posterImage={posterImage}
				fallbackImageComponent={fallbackImageComponent}
				currentTime={currentTime}
				setCurrentTime={setCurrentTime}
				ref={vidRef}
				isPlayable={isPlayable}
				setIsPlayable={setIsPlayable}
				playerState={playerState}
				isMuted={isMuted}
				handlePlayPauseClick={handlePlayPauseClick}
				handleAudioClick={handleAudioClick}
				handleKeyDown={handleKeyDown}
				onError={onError}
				AudioIcon={AudioIcon}
				shouldPreload={shouldPreloadData}
				showPlayIcon={showPlayIcon}
			/>
		</div>
	);
};
