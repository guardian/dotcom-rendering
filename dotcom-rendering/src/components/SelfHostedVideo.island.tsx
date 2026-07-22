import { css, Global } from '@emotion/react';
import { isUndefined, log, storage } from '@guardian/libs';
import { from, space, until } from '@guardian/source/foundations';
import type { RefObject } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
	submitClickComponentEvent,
	submitComponentEvent,
} from '../client/ophan/ophan';
import { type ArticleFormat } from '../lib/articleFormat';
import { getVideoClient } from '../lib/bridgetApi';
import { getZIndex } from '../lib/getZIndex';
import { generateImageURL } from '../lib/image';
import { useAB } from '../lib/useAB';
import { useFadeableControls } from '../lib/useFadeableControls';
import { hasMinimumBridgetVersion } from '../lib/useIsBridgetCompatible';
import { useIsInView } from '../lib/useIsInView';
import { removeMediaRulePrefix, useMatchMedia } from '../lib/useMatchMedia';
import { useOnce } from '../lib/useOnce';
import { useShouldAdapt } from '../lib/useShouldAdapt';
import { useSubtitles } from '../lib/useSubtitles';
import { useVideoAttentionTracking } from '../lib/useVideoAttentionTracking';
import { useVideoFullscreen } from '../lib/useVideoFullscreen';
import { useVideoMilestoneTracking } from '../lib/useVideoMilestoneTracking';
import type { CustomPlayEventDetail, Source } from '../lib/video';
import {
	convertProgressPercentageToCurrentTime,
	customSelfHostedVideoPlayAudioEventName,
	customYoutubePlayEventName,
	findOptimisedSourcePerMimeType,
	roundAspectRatio,
} from '../lib/video';
import type { VideoStyleSettings } from '../lib/videoStyleSettings';
import { videoSettingsMap } from '../lib/videoStyleSettings';
import { palette } from '../palette';
import type { RoleType } from '../types/content';
import type { VideoPlayerFormat } from '../types/mainMedia';
import { Caption } from './Caption';
import { CardPicture, type Props as CardPictureProps } from './CardPicture';
import { useConfig } from './ConfigContext';
import type {
	ControlsPosition,
	PLAYER_STATES,
	PlayerStates,
	SubtitleSize,
} from './SelfHostedVideoPlayer';
import { SelfHostedVideoPlayer } from './SelfHostedVideoPlayer';
import type { SubtitlesPosition } from './SubtitleOverlay';
import type { OphanVideoStyle } from './YoutubeAtom/eventEmitters';
import { ophanTrackerApps, ophanTrackerWeb } from './YoutubeAtom/eventEmitters';
import type { VideoEventKey } from './YoutubeAtom/YoutubeAtom';

/**
 * The fraction of the video required to be visible in the viewport to be considered "in view".
 */
const VISIBILITY_THRESHOLD = 0.5;

const cardStyles = (
	isInteractive: boolean,
	aspectRatioOfVisibleVideo: number,
	containerAspectRatioMobile?: number,
	containerAspectRatioDesktop?: number,
) => css`
	position: relative;
	display: flex;
	background-color: ${palette('--video-background')};
	align-items: center;
	justify-content: space-around;
	${isInteractive && `z-index: ${getZIndex('video-container')}`};

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

/**
 * Constrain the video height so it never becomes excessively tall relative
 * to the viewport, which can happen for portrait or narrow aspect-ratio videos
 * rendered inside article layouts.
 *
 * The video height is capped to 80% of the small viewport height (`80svh`) on tablet and above.
 */
const maxHeightStyles = css`
	${from.tablet} {
		max-height: 80svh;
	}
`;
const videoViewportStyles = (
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
 * Dispatches a custom play audio event so that other videos listening for this event will be muted.
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

const MOBILE_VIDEO_WIDTH = 465;
/**
 * 940 represents the widest possible video slot.
 * This is a flexible general gigaboosted slot on desktop.
 */
const MAX_POSTER_WIDTH = 940;
const getOptimisedPosterImage = (
	mainImage: string,
	aspectRatio: string,
	isTabletOrAbove: boolean,
	measurementRef?: RefObject<HTMLElement>,
): string => {
	// This only runs on the client
	const resolution = window.devicePixelRatio >= 2 ? 'high' : 'low';

	/**
	 * Cards on mobile have variable widths. To avoid requesting many
	 * different image sizes, we use a single default width of 465px across
	 * all mobile devices.
	 */
	const imageWidth = !isTabletOrAbove
		? MOBILE_VIDEO_WIDTH
		: (measurementRef?.current?.offsetWidth ?? MAX_POSTER_WIDTH);

	return generateImageURL({
		mainImage,
		imageWidth,
		resolution,
		aspectRatio,
	});
};

/**
 * Ensures the aspect ratio falls between the minimum and maximum allowed aspect ratios, if specified.
 * For example, we may not want to render a square video inside a 4:5 feature card. In this case, the
 * minimum & maximum aspect ratio would be 4:5, so that the video fits the fixed-aspect ratio feature card
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

const doesUserPermitAutoplayOnWeb = (): boolean => {
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

const doesUserPermitAutoplayOnApps = async (): Promise<boolean> => {
	/* isAutoplayEnabled is available on the video client from 8.8.0 onwards */
	const isBridgetCompatible = await hasMinimumBridgetVersion('8.8.0');
	if (!isBridgetCompatible) {
		return true;
	}

	try {
		const videoClient = getVideoClient();
		return await videoClient.isAutoplayEnabled();
	} catch (error) {
		if (error instanceof Error) {
			window.guardian.modules.sentry.reportError(
				error,
				'self-hosted-video',
			);
		}
		log('dotcom', 'Failed to set app autoplay user preference:', error);
		return true;
	}
};

type Props = {
	sources: Source[];
	atomId: string;
	uniqueId: string;
	videoStyle: VideoPlayerFormat;
	aspectRatio: number;
	posterImage?: string;
	posterImageAspectRatio: string;
	fallbackImage?: CardPictureProps['mainImage'];
	fallbackImageSize: CardPictureProps['imageSize'];
	fallbackImageLoading: CardPictureProps['loading'];
	fallbackImageAlt: CardPictureProps['alt'];
	fallbackImageAspectRatio: CardPictureProps['aspectRatio'];
	linkTo: string;
	hideProgressBar?: boolean;
	subtitleSource?: string;
	subtitleSize: SubtitleSize;
	/**
	 * The position of subtitles and the audio icon.
	 */
	controlsPosition?: ControlsPosition;
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
	preventAutoplay: boolean;
	restrictHeightOnDesktop?: boolean;
	cardLink?: {
		headlineText: string;
		dataLinkName?: string;
		isExternalLink: boolean;
	};
	isInLoopClickTestVariant?: boolean;
};

export const SelfHostedVideo = ({
	sources,
	atomId,
	uniqueId,
	videoStyle,
	aspectRatio,
	posterImage,
	posterImageAspectRatio,
	fallbackImage,
	fallbackImageSize,
	fallbackImageLoading,
	fallbackImageAlt,
	fallbackImageAspectRatio,
	linkTo,
	hideProgressBar = false,
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
	preventAutoplay,
	restrictHeightOnDesktop = false,
	cardLink,
	isInLoopClickTestVariant,
}: Props) => {
	const adapted = useShouldAdapt();
	const { renderingTarget } = useConfig();
	const ab = useAB();
	const isInClickToPlayTest =
		Boolean(
			ab?.isUserInTestGroup(
				'fronts-and-curation-click-to-play',
				'variant',
			),
		) && videoStyle === 'Default';
	const videoStyleSettings: VideoStyleSettings = videoSettingsMap[videoStyle];

	const willAttemptAutoplay =
		videoStyleSettings.autoplay && !preventAutoplay && !isInClickToPlayTest;
	const isTabletOrAbove = useMatchMedia(removeMediaRulePrefix(from.tablet));

	const videoRef = useRef<HTMLVideoElement>(null);
	const videoContainerRef = useRef<HTMLElement>(null);

	const fullscreenContainerRef = useRef<HTMLDivElement>(null);
	const [isPlayable, setIsPlayable] = useState(false);
	/**
	 * Autoplay videos must start muted as browser autoplay policies require it.
	 * Click-to-play videos start unmuted as the user deliberately chose to play.
	 */
	const [isMuted, setIsMuted] = useState<boolean>(willAttemptAutoplay);
	const [showPosterImage, setShowPosterImage] = useState<boolean>(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState<number | undefined>(undefined);
	const [playerState, setPlayerState] =
		useState<(typeof PLAYER_STATES)[number]>('NOT_STARTED');
	const [isAutoplayAllowed, setIsAutoplayAllowed] = useState<boolean | null>(
		null,
	);
	const [hasPageBecomeActive, setHasPageBecomeActive] = useState(false);
	const [width, setWidth] = useState<number | undefined>();
	const [height, setHeight] = useState<number | undefined>();
	const [optimisedSources, setOptimisedSources] = useState<Source[]>([]);
	const [isProgressBarSeeking, setIsProgressBarSeeking] = useState(false);

	const isWeb = renderingTarget === 'Web';
	const isApps = renderingTarget === 'Apps';

	const isLoopClickThroughTestVariant =
		videoStyle === 'Loop' && isInLoopClickTestVariant;

	/**
	 * The video will autoplay if all of the following are true:
	 * - the style of video allows autoplay
	 * - the parent allows autoplay, i.e. we may not want to autoplay on certain page types
	 * - autoplay is allowed by the browser, e.g. if "reduce motion" is enabled then we don't autoplay
	 * - the user is not in the click-to-play test variant
	 */
	const shouldAutoplay =
		videoStyleSettings.autoplay &&
		!preventAutoplay &&
		isAutoplayAllowed === true &&
		!isInClickToPlayTest;

	const showProgressBar =
		!hideProgressBar &&
		videoStyleSettings.showProgressBar &&
		playerState !== 'NOT_STARTED';

	const hasAudio =
		videoStyleSettings.supportsAudio &&
		sources.some((source) => source.hasAudio);

	const showIcons =
		(hasAudio || videoStyleSettings.supportsFullscreen) &&
		playerState !== 'NOT_STARTED';

	const subtitlesPosition: SubtitlesPosition =
		videoStyleSettings.useInteractiveProgressBar === true &&
		controlsPosition === 'bottom'
			? 'bottom-elevated'
			: controlsPosition;

	/**
	 * Show the play icon when the video is not playing, except for when it is scrolled out of view,
	 * i.e. paused by intersection observer. In this case, the intersection observer will resume playback
	 * and having a play icon would falsely indicate a user action is required to resume playback.
	 */
	const showPlayIcon =
		videoStyleSettings.canShowPlayIcon &&
		(playerState === 'PAUSED_BY_USER' ||
			playerState === 'PAUSED_BY_BROWSER' ||
			playerState === 'ENDED' ||
			(playerState === 'NOT_STARTED' && !shouldAutoplay));

	const {
		fadeableControlsStyles,
		isShowingControls: isShowingFadeableControls,
		showPauseIcon,
		showFadeableControlsAndStartTimer,
	} = useFadeableControls({
		playerState,
		isEnabled: videoStyleSettings.enableFadeableControls,
	});

	let showPlayPauseIcon: 'play' | 'pause' | null = null;
	if (showPlayIcon) {
		showPlayPauseIcon = 'play';
	} else if (showPauseIcon) {
		showPlayPauseIcon = 'pause';
	}

	/** The aspect ratio of the video will be clamped within the specified range */
	const aspectRatioOfVisibleVideo = roundAspectRatio(
		getAspectRatioOfVisibleVideo(
			aspectRatio,
			minAspectRatio,
			maxAspectRatio,
		),
	);

	const isVideoCroppedAtTopBottom = aspectRatio < aspectRatioOfVisibleVideo;
	const isVideoCroppedAtLeftRight = aspectRatio > aspectRatioOfVisibleVideo;

	const isGreyBarsAtSidesOnDesktop =
		containerAspectRatioDesktop !== undefined &&
		containerAspectRatioDesktop > aspectRatioOfVisibleVideo;

	const isGreyBarsAtTopAndBottomOnDesktop =
		containerAspectRatioDesktop !== undefined &&
		containerAspectRatioDesktop < aspectRatioOfVisibleVideo;

	const optimisedPosterImage =
		!isUndefined(posterImage) && showPosterImage
			? getOptimisedPosterImage(
					posterImage,
					posterImageAspectRatio,
					isTabletOrAbove,
					/**
					 * When the video is horizontally letterboxed (grey bars appear at the top and bottom), the
					 * height of the video is not known, so we measure
					 * the container. Otherwise, the video element matches the
					 * rendered width, so we measure the video directly.
					 */
					isGreyBarsAtTopAndBottomOnDesktop
						? videoContainerRef
						: videoRef,
				)
			: undefined;

	const ophanVideoStyle = videoStyle.toLowerCase() as OphanVideoStyle;

	const sendOphanTrackingEvent = useCallback(
		(event: VideoEventKey) => {
			if (isWeb) {
				ophanTrackerWeb(atomId, ophanVideoStyle)(event);
			}
			if (isApps) {
				ophanTrackerApps(atomId, ophanVideoStyle)(event);
			}
		},
		[isWeb, isApps, atomId, ophanVideoStyle],
	);

	const setMutedState = useCallback(
		({ value, track = true }: { value: boolean; track?: boolean }) => {
			setIsMuted(value);
			if (track && isMuted !== value) {
				sendOphanTrackingEvent(value ? 'mute' : 'unmute');
			}
		},
		[isMuted, sendOphanTrackingEvent],
	);

	const [isInView, setNode] = useIsInView({
		repeat: true,
		threshold: VISIBILITY_THRESHOLD,
	});

	const activeCue = useSubtitles({
		video: videoRef.current,
		playerState,
		currentTime,
	});

	const [trackMilestones, resetMilestones] = useVideoMilestoneTracking(
		sendOphanTrackingEvent,
		videoStyle === 'Default',
	);

	useVideoAttentionTracking(
		`gu-video-${ophanVideoStyle}-${atomId}`,
		isInView,
		playerState === 'PLAYING',
		renderingTarget,
	);

	const playVideo = useCallback(async () => {
		const video = videoRef.current;
		if (!video) {
			return;
		}

		/** https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay#example_handling_play_failures */
		const startPlayPromise = video.play();

		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- In earlier versions of the HTML specification, play() didn't return a value
		if (startPlayPromise !== undefined) {
			await startPlayPromise
				.then(() => {
					// Autoplay succeeded
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

	const pauseVideo = useCallback(
		(
			pauseReason: Extract<
				PlayerStates,
				| 'PAUSED_BY_USER'
				| 'PAUSED_BY_INTERSECTION_OBSERVER'
				| 'PAUSED_BY_BROWSER'
			>,
		) => {
			const video = videoRef.current;
			if (!video) {
				return;
			}

			if (pauseReason === 'PAUSED_BY_INTERSECTION_OBSERVER') {
				setMutedState({ value: true, track: false });
			}

			setPlayerState(pauseReason);

			void video.pause();
		},
		[setMutedState],
	);

	const playPauseVideo = () => {
		if (playerState === 'PLAYING') {
			if (isInView === true) {
				void pauseVideo('PAUSED_BY_USER');
				sendOphanTrackingEvent('pause');
			}
		} else {
			void playVideo();
			if (playerState !== 'NOT_STARTED' && playerState !== 'ENDED') {
				sendOphanTrackingEvent('resume');
			}
		}
	};

	const updateCurrentTime = (newTime: number) => {
		if (videoRef.current) {
			videoRef.current.currentTime = newTime;
			setCurrentTime(newTime);
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

	const positionCues = useCallback(
		(video: HTMLVideoElement) => {
			if (
				!videoStyleSettings.canShowSubtitles ||
				!videoStyleSettings.supportsAudio
			) {
				return;
			}

			const track = video.textTracks[0];
			if (!track?.cues) {
				return;
			}

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
		},
		[videoStyleSettings.canShowSubtitles, videoStyleSettings.supportsAudio],
	);

	/**
	 * Setup.
	 *
	 * 1. Determine whether we can autoplay video.
	 * 2. Use the best video size available for the user's screen size
	 * 3. Creates event listeners to control playback when there are multiple videos.
	 */
	useEffect(() => {
		if (renderingTarget === 'Apps') {
			void doesUserPermitAutoplayOnApps().then(setIsAutoplayAllowed);
		} else {
			setIsAutoplayAllowed(doesUserPermitAutoplayOnWeb());
		}

		const screenWidth = window.innerWidth;
		const filteredSources = findOptimisedSourcePerMimeType(
			sources,
			screenWidth,
		);
		setOptimisedSources(filteredSources);

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
					setMutedState({ value: true });
				}
			}
		};

		/**
		 * Mute the current video when a YouTube video is played
		 * Triggered by the CustomEvent in YoutubeAtomPlayer.
		 */
		const handleCustomPlayYoutubeEvent = () => {
			setMutedState({ value: true });
		};

		/**
		 * When the page is restored from BFCache, we need to retrigger autoplay,
		 * as the video player state will be PAUSED_BY_BROWSER.
		 */
		const handleRestoreFromCache = (event: PageTransitionEvent) => {
			if (event.persisted) {
				if (renderingTarget === 'Apps') {
					void doesUserPermitAutoplayOnApps().then(
						setIsAutoplayAllowed,
					);
				} else {
					setIsAutoplayAllowed(doesUserPermitAutoplayOnWeb());
				}
				setHasPageBecomeActive(true);
				setMutedState({ value: true });
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
			if (renderingTarget === 'Apps' && document.hidden) {
				pauseVideo('PAUSED_BY_BROWSER');
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
	}, [setMutedState, uniqueId, sources, renderingTarget, pauseVideo]);

	/**
	 * Track the first time the video comes into view.
	 */
	useOnce(() => {
		const video = videoRef.current;
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

		sendOphanTrackingEvent('view');
	}, [isInView === true ? true : undefined]);

	/**
	 * Show a poster image if a video does NOT play automatically. Otherwise, we do not need
	 * to download the image as the video will be autoplayed and the image will not be seen.
	 *
	 * If the video is partially in view (not enough to trigger autoplay) and hasn't yet been
	 * seen, we want to show the poster image to avoid showing a blank space.
	 */
	useEffect(() => {
		if (
			!shouldAutoplay ||
			(isInView === false && playerState === 'NOT_STARTED')
		) {
			setShowPosterImage(true);
		}
	}, [shouldAutoplay, isInView, playerState]);

	const {
		isFullscreen,
		isWebKitFullscreen,
		handleFullscreenClick,
		fullscreenStyles,
		globalFullscreenStyles,
	} = useVideoFullscreen({
		videoRef,
		playerContainerRef: fullscreenContainerRef,
		renderingTarget,
		sendOphanTrackingEvent,
		positionCues,
		showFadeableControlsAndStartTimer,
	});

	if (adapted) {
		return FallbackImageComponent;
	}

	const handleLoadedMetadata = () => {
		const video = videoRef.current;
		if (!video) {
			return;
		}

		setDuration(video.duration);
		positionCues(video);
	};

	const handleLoadedData = () => {
		const video = videoRef.current;
		if (!video) {
			return;
		}

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
		trackMilestones({ started: true });
	};

	const handlePlayPauseClick = (event: React.SyntheticEvent) => {
		if (!videoStyleSettings.isInteractive) {
			return;
		}

		/**
		 * If we're on a touch device and the controls aren't showing,
		 * show the controls instead of pausing the video.
		 * Note that hovering with a mouse shows controls on non-touch devices.
		 */
		if (playerState === 'PLAYING' && !isShowingFadeableControls) {
			showFadeableControlsAndStartTimer();
			return;
		}

		event.preventDefault();
		playPauseVideo();
	};

	const handleAudioClick = (event: React.SyntheticEvent) => {
		if (!videoStyleSettings.isInteractive) {
			return;
		}

		void submitClickComponentEvent(event.currentTarget, renderingTarget);

		event.stopPropagation(); // Don't pause the video

		showFadeableControlsAndStartTimer(); // Show controls when a button is clicked

		if (isMuted) {
			// Emit video play audio event so other components are aware when a video is played with sound
			dispatchCustomPlayAudioEvent(uniqueId);
			setMutedState({ value: false });
		} else {
			setMutedState({ value: true });
		}
	};

	/**
	 * If the video was paused and we know that it wasn't paused by the user
	 * or the intersection observer, we can deduce that it was paused by the
	 * browser. Therefore we need to apply the pause state to the video.
	 */
	const handlePause = () => {
		if (!videoStyleSettings.isInteractive) {
			return;
		}

		if (
			playerState === 'PAUSED_BY_USER' ||
			playerState === 'PAUSED_BY_INTERSECTION_OBSERVER'
		) {
			return;
		}

		pauseVideo('PAUSED_BY_BROWSER');
	};

	const handleEnded = () => {
		if (playerState === 'PLAYING') {
			trackMilestones({ ended: true });
			resetMilestones();
			setPlayerState('ENDED');
		}
	};

	/**
	 * If the video could not be loaded due to an error, report to
	 * Sentry and log in the console.
	 */
	const onError = () => {
		const message = `Self-hosted video could not be played. source: ${
			videoRef.current?.currentSrc ?? 'unknown'
		}`;

		window.guardian.modules.sentry.reportError(
			new Error(message),
			'self-hosted-video',
		);

		log('dotcom', message);
	};

	const seekForward = () => {
		const video = videoRef.current;
		if (!video) {
			return;
		}

		const increment = videoStyleSettings.seekIncrement ?? 0;
		const newTime = Math.min(video.currentTime + increment, video.duration);

		updateCurrentTime(newTime);
	};

	const seekBackward = () => {
		const video = videoRef.current;
		if (!video) {
			return;
		}

		const increment = videoStyleSettings.seekIncrement ?? 0;
		const newTime = Math.max(video.currentTime - increment, 0);

		updateCurrentTime(newTime);
	};

	const handleTimeUpdate = () => {
		const video = videoRef.current;
		if (!video) {
			return;
		}

		if (playerState === 'PLAYING') {
			if (!isProgressBarSeeking) {
				setCurrentTime(video.currentTime);
			}

			/**
			 * We only want to track milestone events for "long-form"
			 * videos, not loops or cinemagraphs. We expect these to be
			 * too short to be worth tracking progress milestones.
			 */
			trackMilestones({
				currentTime: video.currentTime,
				duration: video.duration,
			});

			if (video.currentTime < 1) {
				resetMilestones();
			}
		}
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>): void => {
		if (!videoStyleSettings.isInteractive) {
			return;
		}

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
				setMutedState({ value: !isMuted });
				break;
		}
	};

	const handleProgressBarInput = (
		event: React.FormEvent<HTMLInputElement>,
	) => {
		if (duration === undefined) {
			return;
		}

		showFadeableControlsAndStartTimer();

		const percentage = Number(event.currentTarget.value);
		const time = convertProgressPercentageToCurrentTime(
			percentage,
			duration,
		);

		if (time === null) {
			return;
		}

		updateCurrentTime(time);
	};

	/**
	 * Autoplay/resume playback when the player comes into view or when
	 * the page has been restored from the BFCache.
	 *
	 * Stops playback when the video is scrolled out of view.
	 */
	if (isPlayable) {
		if (
			shouldAutoplay &&
			isInView === true &&
			(playerState === 'NOT_STARTED' ||
				playerState === 'PAUSED_BY_INTERSECTION_OBSERVER' ||
				(hasPageBecomeActive && playerState === 'PAUSED_BY_BROWSER'))
		) {
			if (hasPageBecomeActive) {
				setHasPageBecomeActive(false);
			}
			void playVideo();
		} else if (
			playerState === 'PLAYING' &&
			isInView === false &&
			!isFullscreen
		) {
			void pauseVideo('PAUSED_BY_INTERSECTION_OBSERVER');
		}
	}

	return (
		<figure
			ref={videoContainerRef}
			className={`video-container ${videoStyle.toLocaleLowerCase()} ${
				role === 'immersive' ? 'element-video-immersive' : ''
			}`}
			data-component="gu-video-loop"
		>
			<div
				ref={setNode}
				css={[
					cardStyles(
						videoStyleSettings.isInteractive,
						aspectRatioOfVisibleVideo,
						containerAspectRatioMobile,
						containerAspectRatioDesktop,
					),
					restrictHeightOnDesktop && maxHeightStyles,
				]}
			>
				{globalFullscreenStyles && (
					<Global styles={globalFullscreenStyles} />
				)}
				<div
					ref={fullscreenContainerRef}
					css={[
						videoViewportStyles(
							aspectRatio,
							aspectRatioOfVisibleVideo,
							isGreyBarsAtSidesOnDesktop,
							isGreyBarsAtTopAndBottomOnDesktop,
							isVideoCroppedAtTopBottom,
							isVideoCroppedAtLeftRight,
							containerAspectRatioDesktop,
						),
						fullscreenStyles,
						fadeableControlsStyles,
					]}
					onMouseMove={showFadeableControlsAndStartTimer}
				>
					<SelfHostedVideoPlayer
						sources={optimisedSources}
						atomId={atomId}
						uniqueId={uniqueId}
						aspectRatio={aspectRatio}
						width={width}
						height={height}
						posterImage={optimisedPosterImage}
						FallbackImageComponent={FallbackImageComponent}
						currentTime={currentTime}
						duration={duration}
						ref={videoRef}
						hasAudio={hasAudio}
						isMuted={isMuted}
						handleLoadedMetadata={handleLoadedMetadata}
						handleLoadedData={handleLoadedData}
						handleCanPlay={handleCanPlay}
						handlePlaying={handlePlaying}
						handlePlayPauseClick={handlePlayPauseClick}
						handleAudioClick={handleAudioClick}
						handleTimeUpdate={handleTimeUpdate}
						handleKeyDown={handleKeyDown}
						handleProgressBarInput={handleProgressBarInput}
						handleProgressBarSeekStart={() => {
							setIsProgressBarSeeking(true);
						}}
						handleProgressBarSeekEnd={() => {
							setIsProgressBarSeeking(false);
						}}
						handlePause={handlePause}
						handleFullscreenClick={handleFullscreenClick}
						handleEnded={handleEnded}
						onError={onError}
						preloadPartialData={shouldAutoplay}
						showPlayPauseIcon={showPlayPauseIcon}
						showProgressBar={showProgressBar}
						useLongFormProgressBar={
							videoStyleSettings.useInteractiveProgressBar ===
							true
						}
						showSubtitles={videoStyleSettings.canShowSubtitles}
						subtitleSource={subtitleSource}
						subtitleSize={subtitleSize}
						showIcons={showIcons}
						iconsPosition={controlsPosition}
						subtitlesPosition={subtitlesPosition}
						activeCue={activeCue}
						shouldLoop={videoStyleSettings.loop}
						showFullscreenIcon={
							videoStyleSettings.supportsFullscreen
						}
						isInteractive={videoStyleSettings.isInteractive}
						isFullscreen={isFullscreen}
						isWebKitFullscreen={isWebKitFullscreen}
						linkTo={linkTo}
						cardLink={cardLink}
						isLoopAndInLoopClickTestVariant={Boolean(
							isLoopClickThroughTestVariant,
						)}
					/>
				</div>
			</div>
			{caption !== undefined && caption !== '' && format && (
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
