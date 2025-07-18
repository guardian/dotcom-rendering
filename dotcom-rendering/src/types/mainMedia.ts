import type { PodcastSeriesImage } from './tag';

type Media = {
	type: 'Video' | 'LoopVideo' | 'Audio' | 'Gallery';
};

/** For displaying embedded, playable videos directly in cards */
type Video = Media & {
	type: 'Video';
	/** @see https://github.com/guardian/frontend/blob/8e7e4d0e/common/app/model/content/Atom.scala#L159 */
	id: string;
	videoId: string;
	height: number;
	width: number;
	origin: string;
	title: string;
	duration: number;
	expired: boolean;
	image?: string;
};

type LoopVideo = Media & {
	type: 'LoopVideo';
	atomId: string;
	videoId: string;
	height: number;
	width: number;
	duration: number;
	image?: string;
};

type Audio = Media & {
	type: 'Audio';
	duration: string;
	podcastImage?: PodcastSeriesImage;
};

type Gallery = Media & {
	type: 'Gallery';
	count: string;
};

export type MainMedia = Video | LoopVideo | Audio | Gallery;
