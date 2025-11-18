import type { Source } from '../lib/video';
import { VideoPlayerFormat } from './content';
import type { PodcastSeriesImage } from './tag';

type Media = {
	type: 'YoutubeVideo' | 'SelfHostedVideo' | 'Audio' | 'Gallery';
};

/** For displaying embedded, playable videos directly in cards */
type YoutubeVideo = Media & {
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
