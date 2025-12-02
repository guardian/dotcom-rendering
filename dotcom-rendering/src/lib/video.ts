import type { VideoAssets } from '../types/content';

export type CustomPlayEventDetail = { uniqueId: string };

export const customSelfHostedVideoPlayAudioEventName =
	'self-hosted-video:play-with-audio';
export const customYoutubePlayEventName = 'youtube-video:play';

export type Source = {
	src: string;
	mimeType: SupportedVideoFileType;
};

/**
 * Order is important here - the browser will use the first type it supports.
 * 'application/x-mpegURL' & 'application/vnd.apple.mpegurl' have been filtered out
 * whilst a hls chrome bug is investigated
 * https://issues.chromium.org/issues/454630434
 */
export const supportedVideoFileTypes = [
	// 'application/x-mpegURL', // HLS format
	// 'application/vnd.apple.mpegurl', // Alternative HLS format
	'video/mp4', // MP4 format
] as const;

export type SupportedVideoFileType = (typeof supportedVideoFileTypes)[number];

const isSupportedMimeType = (
	mime: string | undefined,
): mime is SupportedVideoFileType => {
	if (!mime) return false;

	return (supportedVideoFileTypes as readonly string[]).includes(mime);
};

/**
 * The looping video player types its `sources` attribute as `Sources`.
 * However, looping videos in articles are delivered as media atoms, which type
 * their `assets` as `VideoAssets`. Which means that we need to alter the shape
 * of the incoming `assets` to match the requirements of the outgoing `sources`.
 */
export const convertAssetsToVideoSources = (assets: VideoAssets[]): Source[] =>
	assets
		.filter((asset) => isSupportedMimeType(asset.mimeType))
		.map((asset) => ({
			src: asset.url,
			mimeType: asset.mimeType as Source['mimeType'],
		}));

export const getSubtitleAsset = (assets: VideoAssets[]): string | undefined =>
	assets.find((asset) => asset.mimeType === 'text/vtt')?.url;

export const getFirstVideoAsset = (
	assets: VideoAssets[],
): VideoAssets | undefined => {
	return assets.find((asset) => isSupportedMimeType(asset.mimeType));
};
