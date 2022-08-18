import { JSDOM } from 'jsdom';
import { isItemLink } from './enhance-numbered-lists';

const isFalseH3 = (element: CAPIElement): boolean => {
	if (!element) return false;
	// Checks if this element is a 'false h3' based on the convention: <p><strong><H3 text</strong></p>
	if (
		element._type !== 'model.dotcomrendering.pageElements.TextBlockElement'
	) {
		return false;
	}
	const frag = JSDOM.fragment(element.html);
	if (!frag || !frag.firstElementChild) return false;
	const html = frag.firstElementChild.outerHTML;
	// The following things must be true for an element to be a faux H3
	const hasPwrapper = frag.firstElementChild.nodeName === 'P';
	const containsStrongtags =
		frag.firstElementChild.outerHTML.includes('<strong>');
	const doesNotContainLinks =
		!frag.firstElementChild.outerHTML.includes('<a>');
	const htmlLength = html.length;
	const startStrong = html.substr(0, 11) === '<p><strong>';
	const endsStrong = html.substr(htmlLength - 13) === '</strong></p>';

	return (
		hasPwrapper &&
		containsStrongtags &&
		doesNotContainLinks &&
		startStrong &&
		endsStrong
	);
};

const extractH3 = (element: CAPIElement): string => {
	// Extract the text based on the convention: <p><strong><H3 text</strong></p>
	const textElement = element as TextBlockElement;
	const frag = JSDOM.fragment(textElement.html);
	if (isFalseH3(element)) {
		return (
			frag.firstElementChild?.innerHTML
				.split('<strong>')
				.join('')
				.split('</strong>')
				.join('') || ''
		);
	}
	return '';
};

const enhance = (elements: CAPIElement[]): CAPIElement[] => {
	/**
	 * Why not just add H3s in Composer?
	 * Truth is, you can't. So to get around this there's a convention that says if
	 * you insert <p><strong>Faux H3!</strong>,</p> then we replace it with a h3 tag
	 * instead.
	 *
	 * Note. H3s don't have any styles so we have to add them. In Frontend, they use
	 * a 'fauxH3' class for this. In DCR we add `globalH3Styles` which was added at
	 * the same time as this code.
	 */
	const withH3s: CAPIElement[] = [];
	let previousItem: CAPIElement | undefined;
	elements.forEach((thisElement) => {
		if (
			thisElement._type ===
			'model.dotcomrendering.pageElements.TextBlockElement' &&
			isFalseH3(thisElement)
		) {
			const h3Text = extractH3(thisElement);

			// To avoid having to depend on the ordering of the enhancer (which could easily be a source of bugs)
			// We determine if previous items are `ItemLinkBlockElement` through type and `isItemLink` functions
			const isPreviousItemLink =
				previousItem?._type ===
				'model.dotcomrendering.pageElements.ItemLinkBlockElement' ||
				(previousItem && isItemLink(previousItem));

			withH3s.push(
				{
					_type: 'model.dotcomrendering.pageElements.DividerBlockElement',
					size: 'full',
					spaceAbove: isPreviousItemLink ? 'loose' : 'tight',
				},
				{
					...thisElement,
					html: `<h3>${h3Text}</h3>`,
				},
			);
		} else {
			// Pass through
			withH3s.push(thisElement);
		}
		previousItem = thisElement;
	});
	return withH3s;
};

export const enhanceH3s = (blocks: Block[]): Block[] =>
	blocks.map((block: Block) => {
		return {
			...block,
			elements: enhance(block.elements),
		};
	});
