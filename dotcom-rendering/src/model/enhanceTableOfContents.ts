import { JSDOM } from 'jsdom';
import type { Block } from '../types/blocks';
import type {
	NumberedTitleBlockElement,
	SubheadingBlockElement,
} from '../types/content';
import { slugify } from './enhance-H2s';

export interface TableOfContentsItem {
	id: string;
	title: string;
}

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
					tocItems.push({
						id: slugify(keyTakeaway.title),
						title: keyTakeaway.title,
					});
				}
			} else if (
				element._type ===
				'model.dotcomrendering.pageElements.QAndAExplainerBlockElement'
			) {
				for (const qAndAExplainer of element.qAndAExplainers) {
					tocItems.push({
						id: slugify(qAndAExplainer.title),
						title: qAndAExplainer.title,
					});
				}
			} else if (
				element._type ===
				'model.dotcomrendering.pageElements.MiniProfilesBlockElement'
			) {
				for (const miniProfile of element.miniProfiles) {
					tocItems.push({
						id: slugify(miniProfile.title),
						title: miniProfile.title,
					});
				}
			} else if (
				element._type ===
				'model.dotcomrendering.pageElements.MultiBylinesBlockElement'
			) {
				for (const multiByline of element.multiBylines) {
					tocItems.push({
						id: slugify(multiByline.title),
						title: multiByline.title,
					});
				}
			} else if (
				element._type ===
				'model.dotcomrendering.pageElements.DCRSectionedTimelineBlockElement'
			) {
				for (const section of element.sections) {
					tocItems.push({
						id: slugify(section.title),
						title: section.title,
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
