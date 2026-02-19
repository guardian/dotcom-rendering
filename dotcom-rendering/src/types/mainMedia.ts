import type { Source } from '../lib/video';
import type { PodcastSeriesImage } from './tag';

export type VideoPlayerFormat = 'Default' | 'Loop' | 'Cinemagraph';

type Media = {
	type: 'YoutubeVideo' | 'SelfHostedVideo' | 'Audio' | 'Gallery';
};

/** For displaying embedded, playable videos directly in cards */
export type YoutubeVideo = Media & {
	type: 'YoutubeVideo';
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
	isLive: boolean;
};

type SelfHostedVideo = Media & {
	type: 'SelfHostedVideo';
	videoStyle: VideoPlayerFormat;
	atomId: string;
	sources: Source[];
	height: number;
	width: number;
	duration: number;
	subtitleSource?: string;
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

export type MainMedia = YoutubeVideo | SelfHostedVideo | Audio | Gallery;

export type ArticleMedia =
	| Pick<Gallery, 'type' | 'count'>
	| Pick<Audio, 'type' | 'duration'>
	| Pick<SelfHostedVideo, 'type' | 'duration'>
	| Pick<YoutubeVideo, 'type' | 'duration' | 'isLive'>;
