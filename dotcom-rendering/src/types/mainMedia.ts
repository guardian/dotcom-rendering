type Media = {
	type: 'Video' | 'Audio' | 'Gallery';
};

/** For displaying embedded, playable videos directly in cards */
type Video = Media & {
	type: 'Video';
	id: string;
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
