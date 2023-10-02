import type { FEElement } from '../types/content';

export const decideMainMediaCaption = (
	mainMedia: FEElement | undefined,
): string => {
	const caption: string[] = [];

	switch (mainMedia?._type) {
		case 'model.dotcomrendering.pageElements.ImageBlockElement':
			if (mainMedia.data.caption) {
				caption.push(mainMedia.data.caption);
			}

			if (mainMedia.displayCredit && mainMedia.data.credit) {
				caption.push(mainMedia.data.credit);
			}
			return caption.join(' ');

		case 'model.dotcomrendering.pageElements.EmbedBlockElement':
			if (mainMedia.caption) {
				caption.push(mainMedia.caption);
			}
			return caption.join(' ');

		default:
			return caption.join(' ');
	}
};
