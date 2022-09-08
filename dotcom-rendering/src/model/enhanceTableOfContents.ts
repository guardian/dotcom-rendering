import { JSDOM } from 'jsdom';
import type { TableOfContents, TableOfContentsItem } from 'src/types/frontend';

const isHeading = (element: CAPIElement): boolean => {
	return (
		element._type ==
		'model.dotcomrendering.pageElements.SubheadingBlockElement'
	);
};

const isH2 = (element: CAPIElement): element is SubheadingBlockElement => {
	console.log('isheading', element, isHeading(element));
	return isHeading(element);
};

const extractText = (element: SubheadingBlockElement): string => {
	const frag = JSDOM.fragment(element.html);
	if (!frag.firstElementChild) return '';
	return frag.textContent?.trim() ?? '';
};

const hasInteractiveContentsElement = (blocks: Block[]): boolean => {
	return !!blocks.find((block) =>
		block.elements.find(
			(element) =>
				element._type ===
				'model.dotcomrendering.pageElements.InteractiveContentsBlockElement',
		),
	);
};

export const enhanceTableOfContents = (
	format: CAPIFormat,
	blocks: Block[],
): TableOfContents => {
	console.log(format);

	const tocItems: TableOfContentsItem[] = [];

	if (
		!(
			format.design !== 'ExplainerDesign' ||
			hasInteractiveContentsElement(blocks)
		)
	) {
		blocks.forEach((block) => {
			console.log(block.elements);
			block.elements.forEach((element) => {
				if (isH2(element)) {
					tocItems.push({
						id: element.elementId,
						title: extractText(element),
					});
				}
			});
		});
	}

	return { items: tocItems };
};
