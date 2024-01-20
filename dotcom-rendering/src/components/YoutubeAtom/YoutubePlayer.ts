import type { AdsConfig } from '@guardian/commercial';
import { log } from '@guardian/libs';
import type { google } from './ima';
import { loadYouTubeAPI } from './loadYouTubeApi';

type EmbedConfig = {
	embedConfig: {
		relatedChannels: string[];
		adsConfig: AdsConfig;
		enableIma: boolean;
	};
};

type PlayerOptions = YT.PlayerOptions & EmbedConfig;

export declare class ImaManager {
	constructor(
		player: YT.Player,
		id: string,
		adContainerId: string,
		makeAdsRequestCallback: (
			adsRequest: { adTagUrl: string },
			adsRenderingSettings: google.ima.AdsRenderingSettings,
		) => void,
	);
	getAdsLoader: () => google.ima.AdsLoader;
	getAdsManager: () => google.ima.AdsManager;
}

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace -- YT types are in a namespace
	namespace YT {
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

type PlayerListenerName = keyof YT.Events;

type PlayerReadyCallback = () => void;

type AdsRequestCallback = (
	adsRequest: { adTagUrl: string },
	adsRenderingSettings: google.ima.AdsRenderingSettings,
) => void;

type SetPlayerResolve = {
	player: YT.Player;
	imaManager?: ImaManager;
};

class YouTubePlayer {
	playerPromise: Promise<SetPlayerResolve>;
	private player?: YT.Player;

	constructor(
		id: string,
		youtubeOptions: PlayerOptions,
		onPlayerReadyCallback: PlayerReadyCallback,
		enableIma: boolean,
		imaAdsRequestCallback: AdsRequestCallback,
		imaAdManagerListeners: (imaManager: ImaManager) => void,
	) {
		this.playerPromise = this.setPlayer(
			id,
			youtubeOptions,
			onPlayerReadyCallback,
			enableIma,
			imaAdsRequestCallback,
			imaAdManagerListeners,
		);
	}

	private async setPlayer(
		id: string,
		youtubeOptions: PlayerOptions,
		onPlayerReadyCallback: PlayerReadyCallback,
		enableIma: boolean,
		imaAdsRequestCallback: AdsRequestCallback,
		imaAdManagerListeners: (imaManager: ImaManager) => void,
	) {
		const YTAPI = await loadYouTubeAPI(enableIma);
		const playerPromise = new Promise<SetPlayerResolve>(
			(resolve, reject) => {
				try {
					if (enableIma) {
						YTAPI.createPlayerForPublishers(
							id,
							imaAdsRequestCallback,
							{
								youtubeOptions,
							},
							(player, imaManager) => {
								this.player = player;
								imaAdManagerListeners(imaManager);
								onPlayerReadyCallback();
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
								onReady: onPlayerReadyCallback,
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

	private logError(e: Error) {
		log('dotcom', `YouTubePlayer failed to load: ${e.message}`);
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

export { PlayerListenerName, YouTubePlayer };
