// ----- Imports ----- //

import type { Image as ImageData } from 'image';
import type { Video as VideoData } from 'video';
import type { Cartoon as CartoonData } from 'cartoon';

// ----- Types ----- //

export const enum MainMediaKind {
	Image,
	Video,
	Cartoon,
}

export type MainMedia =
	| { kind: MainMediaKind.Image; image: ImageData }
	| { kind: MainMediaKind.Video; video: VideoData }
	| { kind: MainMediaKind.Cartoon; cartoon: CartoonData };
