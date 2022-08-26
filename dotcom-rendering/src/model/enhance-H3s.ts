import { JSDOM } from 'jsdom';

/**
 * Checks if this element is a 'false h3' based on the convention: <p><strong>H3 text</strong></p>
 */

const isTextBlockElement = (
	element: CAPIElement,
): element is TextBlockElement =>
	element._type === 'model.dotcomrendering.pageElements.TextBlockElement';

const isFalseH3 = (element: TextBlockElement): element is FalseH3 => {
	const frag = JSDOM.fragment(element.html);
	if (!frag.firstElementChild) return false;
	const html = frag.firstElementChild.outerHTML;
	// The following things must be true for an element to be a faux H3
	const hasPwrapper = frag.firstElementChild.nodeName === 'P';
	const containsStrongtags =
		frag.firstElementChild.outerHTML.includes('<strong>');
	const doesNotContainLinks =
		!frag.firstElementChild.outerHTML.includes('<a>');
	const startStrong = html.startsWith('<p><strong>');
	const endsStrong = html.endsWith('</strong></p>');

	return (
		hasPwrapper &&
		containsStrongtags &&
		doesNotContainLinks &&
		startStrong &&
		endsStrong
	);
};

interface FalseH3 extends TextBlockElement {
	html: `<p><strong>${string}</strong></p>`;
}

const extractH3 = (element: FalseH3): string => {
	const frag = JSDOM.fragment(element.html);
	return (
		frag.firstElementChild?.innerHTML
			.replaceAll('<strong>', '')
			.replaceAll('</strong>', '') ?? ''
	);
};

/**
 * Why not just add H3s in Composer?
 * Truth is, you can't. So to get around this there's a convention that says if
 * you insert <p><strong>Faux H3!</strong>,</p> then we replace it with a h3 tag
 * instead.
 */
const enhance = (elements: CAPIElement[]): CAPIElement[] =>
	elements.map((thisElement) => {
		if (isTextBlockElement(thisElement) && isFalseH3(thisElement)) {
			const h3Text = extractH3(thisElement);

			return {
				...thisElement,
				html: `<h3>${h3Text}</h3>`,
			};
		} else {
			return thisElement;
		}
	});

export const enhanceH3s = (blocks: Block[], format: CAPIFormat): Block[] => {
	const hasChapteredUI =
		format.display === 'NumberedListDisplay' ||
		format.design === 'AnalysisDesign' ||
		format.design === 'ExplainerDesign';

	if (!hasChapteredUI) {
		return blocks;
	}

	return blocks.map((block: Block) => {
		return {
			...block,
			elements: enhance(block.elements),
		};
	});
};
