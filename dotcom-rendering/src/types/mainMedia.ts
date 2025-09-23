import {
	boolean,
	literal,
	number,
	object,
	optional,
	type Output,
	string,
	union,
} from 'valibot';
import { PodcastSeriesImageSchema } from './tag';
/** For displaying embedded, playable videos directly in cards */
const VideoSchema = object({
	type: literal('Video'),
	/** @see https://github.com/guardian/frontend/blob/8e7e4d0e/common/app/model/content/Atom.scala#L159 */
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

export type MainMedia = Output<typeof MainMediaSchema>;

export const MainMediaSchema = union([
	VideoSchema,
	LoopVideoSchema,
	AudioSchema,
	GallerySchema,
]);
