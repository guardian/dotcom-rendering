import type { FEElement } from '../types/content';

export const getAudioData = (
	mainMediaElements: FEElement[] | undefined,
):
	| {
			audioDownloadUrl: string;
			audioDownloadUrlWithAds: string;
			mediaId: string;
			durationSeconds?: number;
	  }
	| undefined => {
	const audioBlockElement = mainMediaElements?.find(
		(element) =>
			element._type ===
			'model.dotcomrendering.pageElements.AudioBlockElement',
	);
	if (audioBlockElement?.assets[0] && audioBlockElement.id) {
		const { fields } = audioBlockElement.assets[0];
		const mins = parseInt(fields?.durationMinutes ?? '0', 10);
		const secs = parseInt(fields?.durationSeconds ?? '0', 10);
		const total = (isNaN(mins) ? 0 : mins) * 60 + (isNaN(secs) ? 0 : secs);
		return {
			audioDownloadUrl: audioBlockElement.assets[0].url,
			audioDownloadUrlWithAds: audioBlockElement.assets[0].urlWithAds,
			mediaId: audioBlockElement.id,
			durationSeconds: total > 0 ? total : undefined,
		};
	}
	return undefined;
};
