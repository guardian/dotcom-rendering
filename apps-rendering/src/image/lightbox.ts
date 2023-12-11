// ----- Imports ----- //

import type { Option } from '../../vendor/@guardian/types/index';
import { OptionKind } from '../../vendor/@guardian/types/index';

// ----- Types ----- //

interface Lightbox {
	className: string;
	caption: Option<string>;
	credit: Option<string>;
}

// ----- Functions ----- //

/**
 * Lightbox is only available for images above a certain size,
 * we don't enable it for small images (e.g. thumbnails). Therefore
 * this will only return a lightbox className if one is provided *and*
 * the image is above a certain width.
 */
const getClassName = (
	imageWidth: number,
	lightbox: Option<Lightbox>,
): string | undefined => {
	if (imageWidth > 620 && lightbox.kind === OptionKind.Some) {
		return lightbox.value.className;
	}

	return undefined;
};

const getCaption = (lightbox: Option<Lightbox>): string | undefined => {
	if (
		lightbox.kind === OptionKind.Some &&
		lightbox.value.caption.kind === OptionKind.Some
	) {
		return lightbox.value.caption.value;
	}

	return undefined;
};

const getCredit = (lightbox: Option<Lightbox>): string | undefined => {
	if (
		lightbox.kind === OptionKind.Some &&
		lightbox.value.credit.kind === OptionKind.Some
	) {
		return lightbox.value.credit.value;
	}

	return undefined;
};

// ----- Exports ----- //

export type { Lightbox };

export { getClassName, getCaption, getCredit };
