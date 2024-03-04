import { ArticleDesign, type ArticleFormat } from '@guardian/libs';
import { JSDOM } from 'jsdom';
import type { BlockquoteBlockElement, FEElement } from '../types/content';

const isQuoted = (element: BlockquoteBlockElement): boolean => {
	// A quoted blockquote: <blockquote class="quoted"><p>I think therefore I am</p></blockquote>
	const frag = JSDOM.fragment(element.html);
	return !!frag.querySelector('.quoted');
};

export const enhanceBlockquotes =
	(format: ArticleFormat) =>
	(elements: FEElement[]): FEElement[] => {
		const isPhotoEssay = format.design === ArticleDesign.PhotoEssay;

		// Loops the array of article elements looking for BlockquoteBlockElements to enhance
		return elements.map<FEElement>((element) => {
			switch (element._type) {
				case 'model.dotcomrendering.pageElements.BlockquoteBlockElement':
					if (isQuoted(element)) {
						// When blockquotes have the `quoted` class we represent this using
						// the quoted prop
						return {
							_type: 'model.dotcomrendering.pageElements.BlockquoteBlockElement',
							elementId: element.elementId,
							html: element.html,
							quoted: true,
						};
					} else if (isPhotoEssay) {
						// If a blockquote is not queoted it is a Simple Blockquote and for
						// photo essays we transform these into HighlightBlockElements
						return {
							_type: 'model.dotcomrendering.pageElements.HighlightBlockElement',
							elementId: element.elementId,
							html: element.html,
						};
					} else {
						// Otherwise we don't transform anything and pass the element through
						return element;
					}
					break;
				default:
					return element;
			}
		});
	};
