import type { FEElement } from '../types/content';

export const getAudioData = (
	mainMediaElements: FEElement[] | undefined,
): { audioDownloadUrl: string; mediaId: string } | undefined => {
	const audioBlockElement = mainMediaElements?.find(
		(element) =>
			element._type ===
			'model.dotcomrendering.pageElements.AudioBlockElement',
	);
	if (audioBlockElement?.assets[0] && audioBlockElement.elementId) {
		return {
			audioDownloadUrl: audioBlockElement.assets[0].url,
			mediaId: audioBlockElement.elementId,
		};
	}
	return undefined;
};
