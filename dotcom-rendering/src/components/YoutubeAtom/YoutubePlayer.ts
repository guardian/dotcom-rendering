import { log } from '@guardian/libs';
import type { google } from './ima';
import { loadYouTubeAPI } from './loadYouTubeApi';

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace -- YT types are in a namespace
	namespace YT {
		export class ImaManager {
			getAdsLoader: () => google.ima.AdsLoader;
			getAdsManager: () => google.ima.AdsManager;
		}
		export const createPlayerForPublishers: (
			id: string,
			makeAdsRequestCallback: (
				adsRequest: { adTagUrl: string },
				adsRenderingSettings: google.ima.AdsRenderingSettings,
			) => void,
			config: {
				youtubeOptions: PlayerOptions;
			},
			onPlayerReadyCallback: (
				player: Player,
				imaManager: ImaManager,
			) => void,
		) => void;
	}
}

type EmbedConfig = {
	embedConfig: {
		relatedChannels: string[];
		adsConfig: { disableAds: true };
		enableIma: boolean;
		disableRelatedVideos: boolean;
	};
};

type PlayerOptions = YT.PlayerOptions & EmbedConfig;

type PlayerListenerName = keyof YT.Events;

type PlayerReadyCallback = () => void;

type AdsRequestCallback = (
	adsRequest: { adTagUrl: string },
	adsRenderingSettings: google.ima.AdsRenderingSettings,
) => void;

type SetPlayerResolve = {
	player: YT.Player;
	imaManager?: YT.ImaManager;
};

type YouTubePlayerArgs = {
	id: string;
	youtubeOptions: PlayerOptions;
	onReadyListener: PlayerReadyCallback;
	enableIma: boolean;
	imaAdsRequestCallback?: AdsRequestCallback;
	imaAdManagerListeners?: (imaManager: YT.ImaManager) => void;
};

const noop = () => {
	return;
};

class YouTubePlayer {
	playerPromise: Promise<SetPlayerResolve>;
	private player?: YT.Player;

	constructor({
		id,
		youtubeOptions,
		onReadyListener,
		enableIma,
		imaAdsRequestCallback = noop,
		imaAdManagerListeners = noop,
	}: YouTubePlayerArgs) {
		this.playerPromise = this.setPlayer(
			id,
			youtubeOptions,
			onReadyListener,
			enableIma,
			imaAdsRequestCallback,
			imaAdManagerListeners,
		);
	}

	private async setPlayer(
		id: string,
		youtubeOptions: PlayerOptions,
		onReadyListener: PlayerReadyCallback,
		enableIma: boolean,
		imaAdsRequestCallback: AdsRequestCallback,
		imaAdManagerListeners: (imaManager: YT.ImaManager) => void,
	) {
		const YTAPI = await loadYouTubeAPI(enableIma);
		const playerPromise = new Promise<SetPlayerResolve>(
			(resolve, reject) => {
				try {
					/**
					 * If enableIma is true, YT.createPlayerForPublishers will be called to initiate IMA ads
					 * If enableIma is false, the standard YT.Player constructor will be called
					 * Listeners are set appropriately for each method
					 */
					if (enableIma) {
						YTAPI.createPlayerForPublishers(
							id,
							imaAdsRequestCallback,
							{
								youtubeOptions,
							},
							// onReady callback for YT.createPlayerForPublishers
							(player, imaManager) => {
								this.player = player;
								imaAdManagerListeners(imaManager);
								onReadyListener();
								resolve({
									player,
									imaManager,
								});
							},
						);
					} else {
						this.player = new YTAPI.Player(id, {
							...youtubeOptions,
							events: {
								onReady: onReadyListener,
								onStateChange:
									youtubeOptions.events?.onStateChange,
							},
						});
						resolve({ player: this.player });
					}
				} catch (e) {
					this.logError(e as Error);
					reject(e);
				}
			},
		);
		return playerPromise;
	}

	private logError(error: Error) {
		log('dotcom', `YouTubePlayer failed to load: ${error.message}`);
		window.guardian.modules.sentry.reportError(error, 'youtube-player');
	}

	getPlayerState(): Promise<YT.PlayerState | void> {
		return this.playerPromise
			.then(({ player }) => {
				return player.getPlayerState();
			})
			.catch((e: Error) => this.logError(e));
	}

	playVideo(): Promise<void> {
		return this.playerPromise
			.then(({ player }) => {
				player.playVideo();
			})
			.catch((e: Error) => this.logError(e));
	}

	pauseVideo(): Promise<void> {
		return this.playerPromise
			.then(({ player }) => {
				player.pauseVideo();
			})
			.catch((e: Error) => this.logError(e));
	}

	stopVideo(): Promise<void> {
		return this.playerPromise
			.then(({ player }) => {
				player.stopVideo();
			})
			.catch((e: Error) => this.logError(e));
	}

	removeEventListener<T extends YT.PlayerEvent>(
		eventName: PlayerListenerName,
		listener: YT.PlayerEventHandler<T>,
	): void {
		/**
		 * If the YouTube API hasn't finished loading,
		 * this.player may be undefined in which case removeEventListener
		 * will fail silently.
		 */
		this.player?.removeEventListener<T>(eventName, listener);
	}
}

export { PlayerListenerName, YouTubePlayer, YouTubePlayerArgs };
