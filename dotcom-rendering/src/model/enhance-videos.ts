import { ArticleDesign } from '@guardian/libs';
import type { FEElement } from '../types/content';

const addHtmlToGuVideoBlocks = (elements: FEElement[], html?: string) => {
	if (!html) {
		return elements;
	}
	const enhancedElements = elements.map((element) => {
		if (
			element._type ===
			'model.dotcomrendering.pageElements.GuVideoBlockElement'
		) {
			return {
				...element,
				html,
			};
		}
		return element;
	});
	return enhancedElements;
};

export const enhanceGuVideos =
	(format: ArticleFormat, html?: string) =>
	(elements: FEElement[]): FEElement[] => {
		const isVideo = format.design === ArticleDesign.Video;
		if (isVideo) {
			return addHtmlToGuVideoBlocks(elements, html);
		}
		return elements;
	};
