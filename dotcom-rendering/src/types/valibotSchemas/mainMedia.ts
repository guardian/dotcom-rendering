import {
	boolean,
	literal,
	number,
	object,
	optional,
	string,
	union,
} from 'valibot';
import { PodcastSeriesImageSchema } from './tag';

const VideoSchema = object({
	type: literal('Video'),
	id: string(),
	videoId: string(),
	height: number(),
	width: number(),
	origin: string(),
	title: string(),
	duration: number(),
	expired: boolean(),
	image: optional(string()),
});

const LoopVideoSchema = object({
	type: literal('LoopVideo'),
	atomId: string(),
	videoId: string(),
	height: number(),
	width: number(),
	duration: number(),
	image: optional(string()),
});

const AudioSchema = object({
	type: literal('Audio'),
	duration: string(),
	podcastImage: optional(PodcastSeriesImageSchema),
});

const GallerySchema = object({
	type: literal('Gallery'),
	count: string(),
});

export const MainMediaSchema = union([
	VideoSchema,
	LoopVideoSchema,
	AudioSchema,
	GallerySchema,
]);
