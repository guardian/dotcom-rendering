export type CustomPlayEventDetail = { uniqueId: string };

export const customLoopPlayAudioEventName = 'looping-video:play-with-audio';
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
	'video/mp4', // MP4 format
] as const;

export type SupportedVideoFileType = (typeof supportedVideoFileTypes)[number];
