import { JSDOM } from 'jsdom';
import type { FEElement, SubheadingBlockElement } from '../types/content';
import type { TableOfContentsItem } from '../types/frontend';

const isH2 = (element: FEElement): element is SubheadingBlockElement => {
	return (
		element._type ===
			'model.dotcomrendering.pageElements.SubheadingBlockElement' ||
		element._type ===
			'model.dotcomrendering.pageElements.NumberedTitleBlockElement'
	);
};

const extractText = (element: SubheadingBlockElement): string => {
	const frag = JSDOM.fragment(element.html);
	if (!frag.firstElementChild) return '';
	return frag.textContent?.trim() ?? '';
};

const extractID = (element: SubheadingBlockElement): string => {
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
	format: FEFormat,
	blocks: Block[],
): TableOfContentsItem[] | undefined => {
	if (hasInteractiveContentsElement(blocks)) {
		return undefined;
	}

	const tocItems: TableOfContentsItem[] = [];

	for (const block of blocks) {
		for (const element of block.elements) {
			if (isH2(element)) {
				tocItems.push({
					id: extractID(element),
					title: extractText(element),
				});
			}
		}
	}

	return tocItems.length >= 3 ? tocItems : undefined;
};
