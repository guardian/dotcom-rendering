type Media = {
	type: 'Video' | 'Audio' | 'Gallery';
};

/** For displaying embedded, playable videos directly in cards */
type Video = Media & {
	type: 'Video';
	/** @see https://github.com/guardian/frontend/blob/8e7e4d0e/common/app/model/content/Atom.scala#L159 */
	id?: string;
	videoId: string;
	height: number;
	width: number;
	origin: string;
	title: string;
	duration: number;
	expired: boolean;
	images: Array<{ url: string; width: number }>;
};

type Audio = Media & {
	type: 'Audio';
	duration: number;
};

type Gallery = Media & {
	type: 'Gallery';
};

export type MainMedia = Video | Audio | Gallery;
