import { ArticleDisplay } from '@guardian/libs';

export const decideDisplay = ({
	display,
}: Partial<CAPIFormat>): ArticleDisplay => {
	switch (display) {
		case 'StandardDisplay':
			return ArticleDisplay.Standard;
		case 'ImmersiveDisplay':
			return ArticleDisplay.Immersive;
		case 'ShowcaseDisplay':
			return ArticleDisplay.Showcase;
		case 'NumberedListDisplay':
			return ArticleDisplay.NumberedList;
		default:
			return ArticleDisplay.Standard;
	}
};
