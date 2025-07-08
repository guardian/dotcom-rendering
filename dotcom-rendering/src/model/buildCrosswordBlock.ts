import type { FEArticle } from '../frontend/feArticle';
import type { Block } from '../types/blocks';

export const buildCrosswordBlock = (data: FEArticle): Block | undefined => {
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
