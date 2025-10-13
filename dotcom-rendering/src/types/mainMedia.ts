import {
	array,
	boolean,
	literal,
	number,
	object,
	optional,
	type InferOutput,
	string,
	union,
} from 'valibot';
import { PodcastSeriesImageSchema } from './tag';
import { SourceSchema } from '../lib/video';
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
	sources: array(SourceSchema),
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

export type MainMedia = InferOutput<typeof MainMediaSchema>;

export const MainMediaSchema = union([
	VideoSchema,
	LoopVideoSchema,
	AudioSchema,
	GallerySchema,
]);
