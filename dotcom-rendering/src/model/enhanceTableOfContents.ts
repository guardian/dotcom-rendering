import { JSDOM } from 'jsdom';

const isHeading = (element: CAPIElement, level: 'H2' | 'H3' | 'H4') => {
	if (
		element._type !==
			'model.dotcomrendering.pageElements.TextBlockElement' &&
		element._type !==
			'model.dotcomrendering.pageElements.SubheadingBlockElement'
	)
		return false;
	const frag = JSDOM.fragment(element.html);
	return frag.firstElementChild?.nodeName === level;
};

const isH2 = (
	element: CAPIElement,
): element is SubheadingBlockElement | TextBlockElement => {
	return isHeading(element, 'H2');
};

const isH3 = (
	element: CAPIElement,
): element is SubheadingBlockElement | TextBlockElement => {
	return isHeading(element, 'H3');
};

const isH4 = (
	element: CAPIElement,
): element is SubheadingBlockElement | TextBlockElement => {
	return isHeading(element, 'H4');
};

const extractText = (
	element: SubheadingBlockElement | TextBlockElement,
): string => {
	const frag = JSDOM.fragment(element.html);
	if (!frag.firstElementChild) return '';
	return frag.textContent?.trim() ?? '';
};

const hasH2s = (blocks: Block[]) => {
	return blocks.find((block) => block.elements.find(isH2));
};

const hasH3s = (blocks: Block[]) => {
	return blocks.find((block) => block.elements.find(isH3));
};

const hasH4s = (blocks: Block[]) => {
	return blocks.find((block) => block.elements.find(isH4));
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
): TOCType[] | undefined => {
	if (
		format.design !== 'ArticleDesign' ||
		hasInteractiveContentsElement(blocks)
	) {
		return undefined;
	}

	const tocs: TOCType[] = [];
	if (hasH2s(blocks)) {
		blocks.forEach((block) => {
			block.elements.forEach((element) => {
				if (isH2(element)) {
					tocs.push({
						id: element.elementId,
						title: extractText(element),
						nested: [],
					});
				}
				if (isH3(element)) {
					if (tocs.length > 0) {
						const lastItem = tocs[tocs.length - 1];
						lastItem.nested.push({
							id: element.elementId,
							title: extractText(element),
						});
					} else {
						// This is an orphan h3 with no parent h2 element to assign it to
						// so we don't show it in the table
					}
				}
			});
		});
	} else if (hasH3s(blocks)) {
		blocks.forEach((block) => {
			block.elements.forEach((element) => {
				if (isH3(element)) {
					tocs.push({
						id: element.elementId,
						title: extractText(element),
						nested: [],
					});
				}
			});
		});
	} else if (hasH4s(blocks)) {
		blocks.forEach((block) => {
			block.elements.forEach((element) => {
				if (isH4(element)) {
					tocs.push({
						id: element.elementId,
						title: extractText(element),
						nested: [],
					});
				}
			});
		});
	}

	return tocs.length >= 3 ? tocs : undefined;
};
