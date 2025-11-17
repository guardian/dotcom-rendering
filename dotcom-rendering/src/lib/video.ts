export type CustomPlayEventDetail = { uniqueId: string };

export const customLoopPlayAudioEventName = 'looping-video:play-with-audio';
export const customYoutubePlayEventName = 'youtube-video:play';

export type Source = {
	src: string;
	mimeType: SupportedVideoFileType;
};

/**
 * This is required whilst test m3u8 support
 */
export const supportedMP4VideoFileTypes = [
	'video/mp4', // MP4 format
] as const;

/**
 * Order is important here - the browser will use the first type it supports.
 */
export const supportedVideoFileTypes = [
	'application/x-mpegURL', // HLS format
	'application/vnd.apple.mpegurl', // Alternative HLS format
	'video/mp4', // MP4 format
] as const;

export type SupportedVideoFileType = (typeof supportedVideoFileTypes)[number];

export type SupportedMP4VideoFileType =
	(typeof supportedMP4VideoFileTypes)[number];
