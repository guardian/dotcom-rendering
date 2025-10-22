import type z from 'zod';
import { literal, object, string, union } from 'zod';

export type CustomPlayEventDetail = { uniqueId: string };

export const customLoopPlayAudioEventName = 'looping-video:play-with-audio';
export const customYoutubePlayEventName = 'youtube-video:play';

/**
 * Order is important here - the browser will use the first type it supports.
 */
export const supportedVideoFileTypes = [
	'application/x-mpegURL', // HLS format
	'application/vnd.apple.mpegurl', // Alternative HLS format
	'video/mp4', // MP4 format
] as const;

const SupportedVideoFileTypeSchema = union(
	supportedVideoFileTypes.map((type) => literal(type)),
);
export type SupportedVideoFileType = z.infer<
	typeof SupportedVideoFileTypeSchema
>;

export const SourceSchema = object({
	src: string(),
	mimeType: SupportedVideoFileTypeSchema,
});
export type Source = z.infer<typeof SourceSchema>;
