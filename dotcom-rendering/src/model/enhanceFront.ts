import type { DCRFrontType } from '../types/front';
import { enhanceCollections } from './enhanceCollections';
import { validateAsFrontType } from './validate';

export const enhanceFront = (body: unknown): DCRFrontType => {
	const data = validateAsFrontType(body);
	return {
		...data,
		webTitle: `${
			data.pressedPage.seoData.title ?? data.pressedPage.seoData.webTitle
		} | The Guardian`,
		pressedPage: {
			...data.pressedPage,
			collections: enhanceCollections(
				data.pressedPage.collections,
				data.editionId,
				data.pageId,
			),
		},
	};
};
