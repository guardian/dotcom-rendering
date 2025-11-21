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
