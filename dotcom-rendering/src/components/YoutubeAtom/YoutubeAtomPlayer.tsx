import { css, Global } from '@emotion/react';
import type { Participations } from '@guardian/ab-core';
import { buildImaAdTagUrl } from '@guardian/commercial-core';
import type { ConsentState } from '@guardian/libs';
import { log } from '@guardian/libs';
import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from 'react';
import { getVideoClient } from '../../lib/bridgetApi';
import { getZIndex } from '../../lib/getZIndex';
import { getAuthStatus } from '../../lib/identity';
import type { CustomPlayEventDetail } from '../../lib/video';
import {
	customLoopPlayAudioEventName,
	customYoutubePlayEventName,
} from '../../lib/video';
import type { AdTargeting } from '../../types/commercial';
import type { RenderingTarget } from '../../types/renderingTarget';
import type { google } from './ima';
import type { VideoEventKey } from './YoutubeAtom';
import type { PlayerListenerName, YouTubePlayerArgs } from './YoutubePlayer';
import { YouTubePlayer } from './YoutubePlayer';

type Props = {
	uniqueId: string;
	videoId: string;
	height: number;
	width: number;
	title?: string;
	origin?: string;
	eventEmitters: Array<(event: VideoEventKey) => void>;
	autoPlay: boolean;
	onReady: () => void;
	pauseVideo: boolean;
	deactivateVideo: () => void;
	enableAds: boolean;
	adTargeting: AdTargeting;
	consentState: ConsentState;
	abTestParticipations: Participations;
	renderingTarget: RenderingTarget;
};

type ProgressEvents = {
	hasSentPlayEvent: boolean;
	hasSent25Event: boolean;
	hasSent50Event: boolean;
	hasSent75Event: boolean;
	hasSentEndEvent: boolean;
};

/**
 *  Player listeners e.g.
 *  name: onReady, onStateChange, etc...
 *  listener: YT.PlayerEventHandler<PlayerEvent>, YT.PlayerEventHandler<OnStateChangeEvent>
 */
type PlayerListener<T extends PlayerListenerName> = {
	name: T;
	listener: NonNullable<YT.Events[T]>;
};

type PlayerListeners = Array<PlayerListener<PlayerListenerName>>;

/**
 * Given a YT.PlayerEventHandler, (e.g. PlayerEventHandler<OnStateChangeEvent>)
 * return its event type (e.g. OnStateChangeEvent)
 */
type ExtractEventType<T> = T extends YT.PlayerEventHandler<infer X> ? X : never;

const imaPlayerStyles = css`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;

const fullscreenStyles = (id: string) => css`
	html {
		overflow: hidden;
	}
	iframe#${id} {
		position: fixed;
		top: 0;
		/* override vw and vh with vsw and vsh if supported */
		width: 100vw;
		height: 100vh;
		/* stylelint-disable-next-line declaration-block-no-duplicate-properties */
		width: 100svw;
		/* stylelint-disable-next-line declaration-block-no-duplicate-properties */
		height: 100svh;
		z-index: ${getZIndex('youTubeFullscreen')};
	}
`;

/**
 * We set the external_fullscreen configuration property depending on
 * whether the native layer needs to delegate fullscreen styling to
 * the webview.
 *
 * This is true for Android but not for iOS which handles fullscreen
 * natively. The Bridget method setFullscreen returns a value to
 * indicate this requirement. We use it here by passing a value of
 * false for fullscreen when intialising the player to determine
 * the value we need to pass for external_fullscreen.
 *
 * external_fullscreen is allowed listed on our CODE and PROD domains.
 */
const setAppsConfiguration = async (
	basePlayerConfiguration: YouTubePlayerArgs,
	renderingTarget: RenderingTarget,
) => {
	if (renderingTarget === 'Apps') {
		const requiresWebFullscreen =
			await getVideoClient().setFullscreen(false);
		const updatedConfiguration = {
			...basePlayerConfiguration,
			external_fullscreen: requiresWebFullscreen ? 1 : 0,
		};
		return updatedConfiguration;
	}
	return basePlayerConfiguration;
};

/**
 * Dispatches a custom play event so that other players listening
 * for this event will stop playing
 */
const dispatchCustomPlayEvent = (uniqueId: string) => {
	document.dispatchEvent(
		new CustomEvent(customYoutubePlayEventName, {
			detail: { uniqueId },
		}),
	);
};

/**
 * Create an onStateChange listener that will invoke all eventEmitters
 * on the following events:
 *
 * - play
 * - pause
 * - cued
 * - ended
 * - 25% progress
 * - 50% progress
 * - 75% progress
 *
 * progressEvents are refs stored by the main component
 */
const createOnStateChangeListener =
	(
		videoId: string,
		uniqueId: string,
		progressEvents: ProgressEvents,
		eventEmitters: Props['eventEmitters'],
	): YT.PlayerEventHandler<YT.OnStateChangeEvent> =>
	(event) => {
		const loggerFrom = 'YoutubeAtomPlayer onStateChange';
		log('dotcom', {
			from: loggerFrom,
			videoId,
			event,
		});

		/**
		 * event.target is the actual underlying YT player
		 */
		const player = event.target;

		if (event.data === YT.PlayerState.PLAYING) {
			/**
			 * Emit video play event so other components
			 * get aware when a video is played
			 */
			dispatchCustomPlayEvent(uniqueId);

			if (!progressEvents.hasSentPlayEvent) {
				log('dotcom', {
					from: loggerFrom,
					videoId,
					msg: 'start play',
					event,
				});
				for (const eventEmitter of eventEmitters) eventEmitter('play');
				progressEvents.hasSentPlayEvent = true;

				/**
				 * Set a timeout to check progress again in the future
				 */
				setTimeout(() => {
					checkProgress();
				}, 3000);
			} else {
				log('dotcom', {
					from: loggerFrom,
					videoId,
					msg: 'resume',
					event,
				});
				for (const eventEmitter of eventEmitters) {
					eventEmitter('resume');
				}
			}

			const checkProgress = () => {
				const currentTime = player.getCurrentTime();
				const duration = player.getDuration();

				if (!duration || !currentTime) return;

				const percentPlayed = (currentTime / duration) * 100;

				if (!progressEvents.hasSent25Event && 25 < percentPlayed) {
					log('dotcom', {
						from: loggerFrom,
						videoId,
						msg: 'played 25%',
						event,
					});
					for (const eventEmitter of eventEmitters) {
						eventEmitter('25');
					}
					progressEvents.hasSent25Event = true;
				}

				if (!progressEvents.hasSent50Event && 50 < percentPlayed) {
					log('dotcom', {
						from: loggerFrom,
						videoId,
						msg: 'played 50%',
						event,
					});
					for (const eventEmitter of eventEmitters) {
						eventEmitter('50');
					}
					progressEvents.hasSent50Event = true;
				}

				if (!progressEvents.hasSent75Event && 75 < percentPlayed) {
					log('dotcom', {
						from: loggerFrom,
						videoId,
						msg: 'played 75%',
						event,
					});
					for (const eventEmitter of eventEmitters) {
						eventEmitter('75');
					}
					progressEvents.hasSent75Event = true;
				}

				const currentPlayerState = player.getPlayerState();

				if (currentPlayerState !== YT.PlayerState.ENDED) {
					/**
					 * Set a timeout to check progress again in the future
					 */
					setTimeout(() => checkProgress(), 3000);
				}

				return null;
			};
		}

		if (event.data === YT.PlayerState.PAUSED) {
			log('dotcom', {
				from: loggerFrom,
				videoId,
				msg: 'pause',
				event,
			});
			for (const eventEmitter of eventEmitters) eventEmitter('pause');
		}

		if (event.data === YT.PlayerState.CUED) {
			log('dotcom', {
				from: loggerFrom,
				videoId,
				msg: 'cued',
				event,
			});
			for (const eventEmitter of eventEmitters) eventEmitter('cued');
			progressEvents.hasSentPlayEvent = false;
		}

		if (
			event.data === YT.PlayerState.ENDED &&
			!progressEvents.hasSentEndEvent
		) {
			log('dotcom', {
				from: loggerFrom,
				videoId,
				msg: 'ended',
				event,
			});
			for (const eventEmitter of eventEmitters) eventEmitter('end');
			progressEvents.hasSentEndEvent = true;
			progressEvents.hasSentPlayEvent = false;
		}
	};

/**
 * Creates an onReady listener
 */
const createOnReadyListener =
	(
		videoId: string,
		onReadyCallback: () => void,
		setPlayerReady: () => void,
	) =>
	() => {
		log('dotcom', {
			from: 'YoutubeAtomPlayer onReady',
			videoId,
			msg: 'Ready',
		});
		/**
		 * Callback to notify parent YoutubeAtom that the player is ready
		 */
		onReadyCallback();

		/**
		 * Callback to set value of playerReady ref
		 */
		setPlayerReady();
	};

/**
 * Creates a callback that the IMA manager will use to build an IMA ad request
 * and sets ad rendering settings
 */
const createImaAdsRequestCallback = (
	adTargeting: AdTargeting | undefined,
	consentState: ConsentState,
	abTestParticipations: Participations,
	isSignedIn: boolean,
) => {
	const adTargetingEnabled = adTargeting && !adTargeting.disableAds;
	const adUnit =
		adTargetingEnabled && adTargeting.adUnit ? adTargeting.adUnit : '';
	const customParams = adTargetingEnabled ? adTargeting.customParams : {};

	const adsRequestCallback = (
		adsRequest: { adTagUrl: string },
		adsRenderingSettings: google.ima.AdsRenderingSettings,
	) => {
		adsRequest.adTagUrl = buildImaAdTagUrl({
			adUnit,
			customParams,
			consentState,
			clientSideParticipations: abTestParticipations,
			isSignedIn,
		});
		adsRenderingSettings.useStyledNonLinearAds = true;
		if (window.google) {
			adsRenderingSettings.uiElements = [
				window.google.ima.UiElements.AD_ATTRIBUTION,
				window.google.ima.UiElements.COUNTDOWN,
			] as const;
		}
	};

	return adsRequestCallback;
};

/**
 * Creates listeners for the IMA manager
 */
const createImaManagerListeners = (uniqueId: string) => {
	return (imaManager: YT.ImaManager) => {
		const onAdsManagerLoaded = () => {
			if (window.google) {
				imaManager
					.getAdsManager()
					.addEventListener(
						window.google.ima.AdEvent.Type.Started,
						() => {
							dispatchCustomPlayEvent(uniqueId);
						},
					);
			}
		};

		if (window.google) {
			imaManager
				.getAdsLoader()
				.addEventListener(
					window.google.ima.AdsManagerLoadedEvent.Type
						.AdsManagerLoaded,
					onAdsManagerLoaded,
					false,
				);
		}
	};
};

const isSignedIn = async (): Promise<boolean> => {
	try {
		const authStatus = await getAuthStatus();
		return authStatus.kind === 'SignedIn';
	} catch (error: unknown) {
		if (error instanceof Error) {
			window.guardian.modules.sentry.reportError(
				error,
				'youtube-atom-player-is-signed-in',
			);
		}
	}
	return false;
};

export const YoutubeAtomPlayer = ({
	uniqueId,
	videoId,
	height,
	width,
	title,
	origin,
	eventEmitters,
	autoPlay,
	onReady,
	pauseVideo,
	deactivateVideo,
	enableAds,
	adTargeting,
	consentState,
	abTestParticipations,
	renderingTarget,
}: Props): JSX.Element => {
	/**
	 * useRef for player and progressEvents
	 * Provides mutable persistent state for the player across renders
	 * Does not cause re-renders on update
	 */
	const player = useRef<YouTubePlayer>();
	const progressEvents = useRef<ProgressEvents>({
		hasSentPlayEvent: false,
		hasSent25Event: false,
		hasSent50Event: false,
		hasSent75Event: false,
		hasSentEndEvent: false,
	});

	const [playerReady, setPlayerReady] = useState<boolean>(false);
	const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
	const [applyFullscreenStyles, setApplyFullscreenStyles] =
		useState<boolean>(false);
	const playerReadyCallback = useCallback(() => setPlayerReady(true), []);
	const playerListeners = useRef<PlayerListeners>([]);
	/**
	 * A map ref with a key of eventname and a value of eventHandler
	 */
	const customListeners = useRef<
		Record<string, (event: CustomEventInit<CustomPlayEventDetail>) => void>
	>({});

	const adsManager = useRef<google.ima.AdsManager>();

	const id = `youtube-player-${uniqueId}`;

	/**
	 * Initialise player useEffect
	 */
	useEffect(
		() => {
			if (!player.current) {
				log('dotcom', {
					from: 'YoutubeAtomPlayer initialise',
					videoId,
				});

				const onReadyListener = createOnReadyListener(
					videoId,
					onReady,
					playerReadyCallback,
				);

				const onStateChangeListener = createOnStateChangeListener(
					videoId,
					uniqueId,
					progressEvents.current,
					eventEmitters,
				);

				/**
				 * Configuration for the base YouTube player
				 * IMA is configured separately
				 */
				const basePlayerConfiguration: YouTubePlayerArgs = {
					id,
					youtubeOptions: {
						height: '100%',
						width: '100%',
						videoId,
						playerVars: {
							controls: 1,
							fs: 1,
							modestbranding: 1,
							origin,
							playsinline: 1,
							rel: 0,
						},
						embedConfig: {
							relatedChannels: [],
							// Since IMA ads the YouTube player API no longer accepts ad configuration
							adsConfig: { disableAds: true },
							enableIma: enableAds,
							// YouTube recommends disabling related videos when IMA ads are enabled
							disableRelatedVideos: enableAds,
						},
						events: {
							onStateChange: onStateChangeListener,
							onFullscreenToggled: () => {
								if (renderingTarget === 'Apps') {
									log('dotcom', {
										from: 'YoutubeAtomPlayer fullscreen',
										videoId,
									});
									setIsFullscreen((prev) => !prev);
								}
							},
						},
					},
					onReadyListener,
					enableIma: enableAds,
				};

				const basePlayerConfigurationWithApps = setAppsConfiguration(
					basePlayerConfiguration,
					renderingTarget,
				);

				void Promise.allSettled([
					basePlayerConfigurationWithApps,
					isSignedIn(),
				]).then(([playerConfigurationResult, isSignedInResult]) => {
					const playerConfiguration =
						playerConfigurationResult.status === 'fulfilled'
							? playerConfigurationResult.value
							: basePlayerConfiguration;
					const isSignedInValue =
						isSignedInResult.status === 'fulfilled'
							? isSignedInResult.value
							: false;
					if (enableAds) {
						player.current = new YouTubePlayer({
							...playerConfiguration,
							imaAdsRequestCallback: createImaAdsRequestCallback(
								adTargeting,
								consentState,
								abTestParticipations,
								isSignedInValue,
							),
							imaAdManagerListeners:
								createImaManagerListeners(uniqueId),
						});
					} else {
						player.current = new YouTubePlayer(playerConfiguration);
					}
				});

				/**
				 * Pause the current video when another video is played
				 * Triggered by the CustomEvent sent by each player on play
				 */
				const handleCustomPlayEvent = (
					event: CustomEventInit<CustomPlayEventDetail>,
				) => {
					if (event.detail) {
						const playedVideoId = event.detail.uniqueId;
						const thisVideoId = uniqueId;

						if (playedVideoId !== thisVideoId) {
							const playerStatePromise =
								player.current?.getPlayerState();
							void playerStatePromise?.then((playerState) => {
								if (playerState === YT.PlayerState.PLAYING) {
									void player.current?.pauseVideo();
								}
							});
							// pause ima ads playing on other videos
							adsManager.current?.pause();
							// mark player as inactive
							deactivateVideo();
						}
					}
				};

				/**
				 * add listener for custom play event
				 */
				document.addEventListener(
					customYoutubePlayEventName,
					handleCustomPlayEvent,
				);

				customListeners.current[customYoutubePlayEventName] =
					handleCustomPlayEvent;

				/**
				 * Pauses all playing videos when a looping video is unmuted. If a user is
				 * watching a looping video with sound, any playing Youtube video is paused.
				 */
				const handleCustomPlayLoopAudioEvent = (
					event: CustomEventInit<CustomPlayEventDetail>,
				) => {
					if (event.detail) {
						const playerStatePromise =
							player.current?.getPlayerState();
						void playerStatePromise?.then((playerState) => {
							if (playerState === YT.PlayerState.PLAYING) {
								void player.current?.pauseVideo();
							}
						});
					}
				};

				document.addEventListener(
					customLoopPlayAudioEventName,
					handleCustomPlayLoopAudioEvent,
				);
				customListeners.current[customLoopPlayAudioEventName] =
					handleCustomPlayLoopAudioEvent;

				playerListeners.current.push(
					{ name: 'onReady', listener: onReadyListener },
					{ name: 'onStateChange', listener: onStateChangeListener },
				);
			}
		},
		/**
		 * useEffect dependencies are mostly static but added to array for correctness
		 */
		[
			abTestParticipations,
			adTargeting,
			autoPlay,
			consentState,
			enableAds,
			eventEmitters,
			deactivateVideo,
			height,
			id,
			onReady,
			origin,
			playerReadyCallback,
			renderingTarget,
			uniqueId,
			videoId,
			width,
		],
	);

	/**
	 * Autoplay useEffect
	 */
	useEffect(() => {
		if (playerReady && autoPlay) {
			/**
			 * Autoplay is determined by the parent
			 * Typically true when there is a preceding overlay
			 */
			log('dotcom', {
				from: 'YoutubeAtomPlayer autoplay',
				videoId,
				msg: 'Playing video',
			});
			void player.current?.playVideo();
		}
	}, [playerReady, autoPlay, videoId]);

	/**
	 * Player pause useEffect
	 */
	useEffect(() => {
		/**
		 * if the 'pauseVideo' prop is true this should pause the video
		 *
		 * 'pauseVideo' is controlled by the close sticky video button
		 */
		if (pauseVideo) {
			void player.current?.pauseVideo();
		}
	}, [pauseVideo]);

	/**
	 * For apps rendered articles that return true for `setFullscreen` the web layer
	 * needs to handle the application of fullscreen styles
	 *
	 * This is only for the YouTube player in Android web views which does not support fullscreen
	 */
	useEffect(() => {
		if (renderingTarget === 'Apps') {
			const videoClient = getVideoClient();
			void videoClient.setFullscreen(isFullscreen).then((success) => {
				if (success) {
					setApplyFullscreenStyles(isFullscreen);
				}
			});
		}
	}, [isFullscreen, renderingTarget]);

	/**
	 * Unregister listeners useLayoutEffect
	 */
	useLayoutEffect(() => {
		/**
		 * Unregister listeners before component unmount
		 *
		 * An empty dependency array will call its cleanup on unmount.
		 *
		 * Use useLayoutEffect to ensure the cleanup function is run
		 * before the component is removed from the DOM. Usually clean up
		 * functions will run after the render and commit phase.
		 *
		 * If we attempt to unregister listeners after the component is
		 * removed from the DOM the YouTube API logs a warning to the console.
		 */

		const playerListenerNames = playerListeners.current;
		const customListenersNames = customListeners.current;

		return () => {
			for (const playerListener of playerListenerNames) {
				type T = ExtractEventType<typeof playerListener.name>;
				player.current?.removeEventListener<T>(
					playerListener.name,
					playerListener.listener,
				);
			}

			for (const [eventName, eventHandler] of Object.entries(
				customListenersNames,
			)) {
				document.removeEventListener(eventName, eventHandler);
			}
		};
	}, []);

	/**
	 * An element for the YouTube player to hook into the dom
	 */
	return (
		<>
			{applyFullscreenStyles && <Global styles={fullscreenStyles(id)} />}
			<div
				id={id}
				data-testid={id}
				data-atom-type="youtube"
				title={title}
				css={enableAds && imaPlayerStyles}
			></div>
		</>
	);
};
