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
 */
export const supportedVideoFileTypes = [
	'application/x-mpegURL', // HLS format
	'application/vnd.apple.mpegurl', // Alternative HLS format
	'video/mp4', // MP4 format
] as const;

export const filterOutHlsSources = (sources: Source[]): Source[] =>
	sources.filter(
		(source) =>
			source.mimeType.toLowerCase() !== 'application/x-mpegurl' &&
			source.mimeType.toLowerCase() !== 'application/vnd.apple.mpegurl',
	);

export type SupportedVideoFileType = (typeof supportedVideoFileTypes)[number];
