// ----- Imports ----- //

import type { Image as ImageData } from 'image';
import type { Video as VideoData } from 'video';

// ----- Types ----- //

export const enum MainMediaKind {
	Image,
	Video,
}

export type MainMedia =
	| { kind: MainMediaKind.Image; image: ImageData }
	| { kind: MainMediaKind.Video; video: VideoData };
