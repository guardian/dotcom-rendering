import { css } from '@emotion/react';
import { log } from '@guardian/libs';
import type React from 'react';
import { useEffect, useState } from 'react';
import { submitClickComponentEvent } from '../client/ophan/ophan';
import type { VideoEventKey } from '../components/YoutubeAtom/YoutubeAtom';
import { palette } from '../palette';
import type { RenderingTarget } from '../types/renderingTarget';
import { getVideoClient } from './bridgetApi';
import { getZIndex } from './getZIndex';
import { hasMinimumBridgetVersion } from './useIsBridgetCompatible';

/**
 * The Fullscreen API is not supported by Safari mobile,
 * so we need to check if we have access to the webkit API we can use instead.
 */
const shouldUseWebkitFullscreen = (video: HTMLVideoElement): boolean => {
	return (
		'webkitDisplayingFullscreen' in video &&
		'webkitEnterFullscreen' in video &&
		'webkitExitFullscreen' in video
	);
};

/**
 * The events we need to respond to for fullscreen tracking.
 */
const fullscreenChangeEvents = [
	'fullscreenchange',
	'webkitfullscreenchange',
	'webkitbeginfullscreen',
	'webkitendfullscreen',
];

const displayFullscreenStyle = css`
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
`;

/**
 * Returns a global style that hides overflow on the html element when the
 * video is in bridget fullscreen mode.
 */
const getFullscreenGlobalHiddenOverflow = (hideOverflow: boolean) =>
	(hideOverflow &&
		css`
			html {
				overflow: hidden;
			}
		`) ||
	css``;

const buildFullscreenStyles = (bridgetFullscreen: boolean) => css`
	${bridgetFullscreen && displayFullscreenStyle}

	${bridgetFullscreen &&
	css`
		position: fixed;
		top: 0;
		z-index: ${getZIndex('selfHostedFullscreen')};
		/* override vw and vh with svw and svh if supported */
		/* stylelint-disable declaration-block-no-duplicate-properties */
		width: 100svw;
		height: 100svh;
		/* stylelint-enable declaration-block-no-duplicate-properties */
	`}

	&:fullscreen {
		${displayFullscreenStyle};
	}
`;

const doesBridgetSupportFullscreen = async (): Promise<boolean> => {
	const isBridgetCompatible = await hasMinimumBridgetVersion('8.8.0');

	if (!isBridgetCompatible) {
		return false;
	}

	try {
		const videoClient = getVideoClient();

		/**
		 * We request to set the video to fullscreen to determine if the Bridget function is supported.
		 * > On Android, this method will return true if the operation was successful, false otherwise
		 * > On iOS, this method will always return false
		 * – taken from comments on the Bridget thrift interface.
		 */
		return await videoClient.setFullscreen(false);
	} catch (error) {
		if (error instanceof Error) {
			window.guardian.modules.sentry.reportError(
				error,
				'self-hosted-video',
			);
		}
		log('dotcom', 'Failed to check Bridget fullscreen support:', error);
		return false;
	}
};

type Props = {
	videoRef: React.RefObject<HTMLVideoElement | null>;
	playerContainerRef: React.RefObject<HTMLDivElement | null>;
	renderingTarget: RenderingTarget;
	sendOphanTrackingEvent: (event: VideoEventKey) => void;
	positionCues: (video: HTMLVideoElement) => void;
	showFadeableControlsAndStartTimer: () => void;
};

type ReturnValue = {
	isFullscreen: boolean;
	isWebKitFullscreen: boolean;
	handleFullscreenClick: (event: React.SyntheticEvent) => void;
	/**
	 * Styles for the player container element. Applies bridget fullscreen
	 * layout and the `:fullscreen` pseudo-class styles.
	 */
	fullscreenStyles: ReturnType<typeof css>;
	/**
	 * A style value to pass to a `<Global>` component that hides page overflow
	 * whilst bridget fullscreen is active.
	 */
	globalFullscreenStyles: ReturnType<
		typeof getFullscreenGlobalHiddenOverflow
	>;
};

/**
 * Manages all fullscreen behaviour for self-hosted videos across three
 * environments: standard browser Fullscreen API, iOS Safari webkit fullscreen,
 * and the bridget fullscreen API used by Guardian apps.
 *
 * Mirrors the shape of `useFadeableControls` by returning computed styles for
 * the player container alongside the state and event handler.
 */
export const useVideoFullscreen = ({
	videoRef,
	playerContainerRef,
	renderingTarget,
	sendOphanTrackingEvent,
	positionCues,
	showFadeableControlsAndStartTimer,
}: Props): ReturnValue => {
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [isWebKitFullscreen, setIsWebKitFullscreen] = useState(false);
	const [shouldUseBridgetFullscreen, setShouldUseBridgetFullscreen] =
		useState(false);

	const isApps = renderingTarget === 'Apps';
	const isBridgetFullscreen = isFullscreen && shouldUseBridgetFullscreen;

	/* Detect whether the apps bridget client supports fullscreen */
	useEffect(() => {
		if (isApps) {
			void doesBridgetSupportFullscreen().then(
				setShouldUseBridgetFullscreen,
			);
		}
	}, [isApps]);

	/* Handle webkit (iOS Safari) end-fullscreen events to sync state and reposition cues */
	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		const handleEndFullscreen = () => {
			setIsWebKitFullscreen(false);
			positionCues(video);
		};

		video.addEventListener('webkitendfullscreen', handleEndFullscreen);

		return () =>
			video.removeEventListener(
				'webkitendfullscreen',
				handleEndFullscreen,
			);
	}, [videoRef, positionCues]);

	/**
	 * Capture fullscreen tracking events across browsers and devices.
	 * We need to support events across:
	 * - Browsers with fullscreen API support
	 * - OSX Safari
	 * - iOS Safari
	 */
	useEffect(() => {
		const video = videoRef.current;
		const playerContainer = playerContainerRef.current;

		if (!playerContainer && !video) return;

		const updateStateAndReportFullscreenEvent = () => {
			const isInFullscreenMode =
				document.fullscreenElement !== null ||
				(video !== null &&
					'webkitDisplayingFullscreen' in video &&
					Boolean(video.webkitDisplayingFullscreen));

			if (isInFullscreenMode) {
				setIsFullscreen(true);
			} else {
				setIsFullscreen(false);
			}

			const event = isInFullscreenMode
				? 'enter_fullscreen'
				: 'exit_fullscreen';

			sendOphanTrackingEvent(event);
		};

		for (const event of fullscreenChangeEvents) {
			if (video) {
				video.addEventListener(
					event,
					updateStateAndReportFullscreenEvent,
				);
			}

			if (playerContainer) {
				playerContainer.addEventListener(
					event,
					updateStateAndReportFullscreenEvent,
				);
			}
		}

		return () => {
			for (const event of fullscreenChangeEvents) {
				if (video) {
					video.removeEventListener(
						event,
						updateStateAndReportFullscreenEvent,
					);
				}

				if (playerContainer) {
					playerContainer.removeEventListener(
						event,
						updateStateAndReportFullscreenEvent,
					);
				}
			}
		};
	}, [videoRef, playerContainerRef, sendOphanTrackingEvent]);

	const handleFullscreenClick = (event: React.SyntheticEvent) => {
		void submitClickComponentEvent(event.currentTarget, renderingTarget);
		event.stopPropagation(); // Don't pause the video

		showFadeableControlsAndStartTimer(); // Show controls when a button is clicked

		const video = videoRef.current;
		if (!video) {
			return;
		}

		if (shouldUseWebkitFullscreen(video)) {
			/**
			 * webkit fullscreen methods are not part of the standard HTMLVideoElement
			 * type definition as they are iOS only.
			 * We need to extend the type to expect these handlers when we're on iOS to keep TS happy.
			 * @see https://developer.apple.com/documentation/webkitjs/htmlvideoelement/1633500-webkitenterfullscreen
			 */
			const webkitVideo = video as HTMLVideoElement & {
				webkitDisplayingFullscreen: boolean;
				webkitEnterFullscreen: () => void;
				webkitExitFullscreen: () => void;
			};

			if (webkitVideo.webkitDisplayingFullscreen) {
				setIsWebKitFullscreen(false);
				return webkitVideo.webkitExitFullscreen();
			} else {
				setIsWebKitFullscreen(true);
				return webkitVideo.webkitEnterFullscreen();
			}
		}

		if (shouldUseBridgetFullscreen) {
			const videoClient = getVideoClient();
			const fullscreen = !isFullscreen;
			void videoClient
				.setFullscreen(fullscreen)
				.then(() => setIsFullscreen(fullscreen));
			const trackingEvent = isFullscreen
				? 'enter_fullscreen'
				: 'exit_fullscreen';
			sendOphanTrackingEvent(trackingEvent);
			return;
		}

		if (document.fullscreenElement) {
			void document.exitFullscreen();
		} else if (playerContainerRef.current) {
			void playerContainerRef.current.requestFullscreen();
		}
	};

	return {
		isFullscreen,
		isWebKitFullscreen,
		handleFullscreenClick,
		fullscreenStyles: buildFullscreenStyles(isBridgetFullscreen),
		globalFullscreenStyles:
			getFullscreenGlobalHiddenOverflow(isBridgetFullscreen),
	};
};
