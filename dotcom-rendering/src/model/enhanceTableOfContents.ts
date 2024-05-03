import { JSDOM } from 'jsdom';
import { createTitleId } from '../components/KeyTakeaway';
import type {
	NumberedTitleBlockElement,
	SubheadingBlockElement,
} from '../types/content';
import type { TableOfContentsItem } from '../types/frontend';

const extractText = (
	element: SubheadingBlockElement | NumberedTitleBlockElement,
): string => {
	const frag = JSDOM.fragment(element.html);
	if (!frag.firstElementChild) return '';
	return frag.textContent?.trim() ?? '';
};

const extractID = (
	element: SubheadingBlockElement | NumberedTitleBlockElement,
): string => {
	const frag = JSDOM.fragment(element.html);
	if (!frag.firstElementChild) return '';
	return frag.querySelector('H2')?.getAttribute('id') ?? '';
};

const hasInteractiveContentsElement = (blocks: Block[]): boolean => {
	return blocks.some((block) =>
		block.elements.some(
			(element) =>
				element._type ===
				'model.dotcomrendering.pageElements.InteractiveContentsBlockElement',
		),
	);
};

export const enhanceTableOfContents = (
	blocks: Block[],
): TableOfContentsItem[] | undefined => {
	if (hasInteractiveContentsElement(blocks)) {
		return undefined;
	}

	const tocItems: TableOfContentsItem[] = [];

	for (const block of blocks) {
		for (const element of block.elements) {
			if (
				element._type ===
				'model.dotcomrendering.pageElements.KeyTakeawaysBlockElement'
			) {
				for (const keyTakeaway of element.keyTakeaways) {
					console.log(keyTakeaway.title);
					tocItems.push({
						id: createTitleId(keyTakeaway.title),
						title: keyTakeaway.title,
					});
				}
			} else if (
				element._type ===
					'model.dotcomrendering.pageElements.SubheadingBlockElement' ||
				element._type ===
					'model.dotcomrendering.pageElements.NumberedTitleBlockElement'
			) {
				tocItems.push({
					id: extractID(element),
					title: extractText(element),
				});
			}
		}
	}

	return tocItems.length >= 3 ? tocItems : undefined;
};
