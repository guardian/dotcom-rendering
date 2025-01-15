import type { Block } from '../types/blocks';
import type { FEArticleType } from '../types/frontend';

export const buildCrosswordBlock = (data: FEArticleType): Block | undefined => {
	return data.crossword
		? {
				id: data.crossword.id,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.CrosswordElement',
						crossword: data.crossword,
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
