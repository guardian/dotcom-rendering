import type { FEArticle } from '../frontend/feArticle';
import { isPuzzlesHubV3Enabled } from '../lib/puzzlesHubVersionExperiment';
import type { Block } from '../types/blocks';

export const buildCrosswordBlock = (data: FEArticle): Block | undefined => {
	/**
	 * Premium only while the v3 test is on (which needs v1 and v2). With any of
	 * them off the element is exactly what it was before this flag existed.
	 */
	const requiresSubscription =
		data.crosswordRequiresSubscription === true &&
		isPuzzlesHubV3Enabled(data.config);

	return data.crossword
		? {
				id: data.crossword.id,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.CrosswordElement',
						crossword: data.crossword,
						...(requiresSubscription && {
							requiresSubscription: true,
						}),
					},
				],
				attributes: {
					pinned: false,
					keyEvent: false,
					summary: false,
				},
				primaryDateLine: data.webPublicationDateDisplay,
				secondaryDateLine: data.webPublicationSecondaryDateDisplay,
			}
		: undefined;
};
