import { ArticleDisplay } from '../lib/format';
import type { FEFormat } from '../types/frontend';

export const decideDisplay = ({
	display,
	design,
}: Partial<FEFormat>): ArticleDisplay => {
	switch (display) {
		case 'StandardDisplay':
			return ArticleDisplay.Standard;
		case 'ImmersiveDisplay':
			// Temporary hack until we can handle Immersive Comment pieces
			return design === 'CommentDesign'
				? ArticleDisplay.Standard
				: ArticleDisplay.Immersive;
		case 'ShowcaseDisplay':
			return ArticleDisplay.Showcase;
		case 'NumberedListDisplay':
			return ArticleDisplay.NumberedList;
		default:
			return ArticleDisplay.Standard;
	}
};
