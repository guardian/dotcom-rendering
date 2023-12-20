// ----- Imports ----- //

import type { ArticleElementRole } from '@guardian/libs';
import type { Option } from '../../vendor/@guardian/types/index';
import type { Optional } from 'optional';

// ----- Types ----- //

/**
 * The media subtypes we support for images. Derived from `mimeType` in CAPI's
 * assets list (`image/jpeg`, `image/png` etc.).
 *
 * For more information on media types see:
 * - https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
 * - https://www.iana.org/assignments/media-types/media-types.xhtml#image
 */
enum ImageSubtype {
	Jpeg,
	Png,
	Svg,
}

interface Image {
	src: string;
	srcset: string;
	dpr2Srcset: string;
	alt: Option<string>;
	width: number;
	height: number;
	role: ArticleElementRole;
	imageSubtype: Optional<ImageSubtype>;
}

// ----- Exports ----- //

export { ImageSubtype };

export type { Image };
