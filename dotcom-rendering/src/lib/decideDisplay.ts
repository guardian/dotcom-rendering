import { ArticleDisplay } from '@guardian/libs';
import type { FEFormat } from '../types/frontend';

export const decideDisplay = ({
	display,
	design,
}: Partial<FEFormat>): ArticleDisplay => {
	switch (display) {
		case 'StandardDisplay':
			return ArticleDisplay.Standard;
		case 'ImmersiveDisplay':
			switch (design) {
				// Temporary hack until we can handle Immersive Comment pieces
				case 'CommentDesign':
					return ArticleDisplay.Standard;
				// Galleries are not immersive; they're galleries. This needs
				// to be fixed in the CAPI client.
				case 'GalleryDesign':
					return ArticleDisplay.Standard;
				default:
					return ArticleDisplay.Immersive;
			}
		case 'ShowcaseDisplay':
			return ArticleDisplay.Showcase;
		case 'NumberedListDisplay':
			return ArticleDisplay.NumberedList;
		default:
			return ArticleDisplay.Standard;
	}
};
