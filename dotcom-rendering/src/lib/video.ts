import { object, string, type InferOutput } from "valibot";

export type CustomPlayEventDetail = { uniqueId: string };

export const customLoopPlayAudioEventName = 'looping-video:play-with-audio';
export const customYoutubePlayEventName = 'youtube-video:play';

export const SourceSchema = object({
	src: string(),
	mimeType: SupportedVideoFileType,
});

export type Source = InferOutput<typeof SourceSchema>;

/**
 * Order is important here - the browser will use the first type it supports.
 */
export const supportedVideoFileTypes = [
	'application/x-mpegURL', // HLS format
	'application/vnd.apple.mpegurl', // Alternative HLS format
	'video/mp4', // MP4 format
] as const;

export type SupportedVideoFileType = (typeof supportedVideoFileTypes)[number];
