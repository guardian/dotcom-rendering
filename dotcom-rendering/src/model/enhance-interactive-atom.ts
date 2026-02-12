import { ArticleDesign, type ArticleFormat } from '../lib/articleFormat';
import type { FEElement } from '../types/content';

export const enhanceInteractiveAtomElements =
	(format: ArticleFormat) =>
	(elements: FEElement[]): FEElement[] => {
		const isInteractiveFormat =
			format.design === ArticleDesign.Interactive ||
			format.design === ArticleDesign.FullPageInteractive;

		const enhancedAtomElements = elements.filter((element) => {
			const isFullWidthInteractiveAtom =
				element._type ===
					'model.dotcomrendering.pageElements.InteractiveAtomBlockElement' &&
				element.role === 'fullWidth';
			return !(isFullWidthInteractiveAtom && !isInteractiveFormat);
		});
		return enhancedAtomElements;
	};
