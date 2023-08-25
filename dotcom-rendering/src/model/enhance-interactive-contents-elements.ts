import type { FEElement, SubheadingBlockElement } from '../types/content';
import { isLegacyTableOfContents } from './isLegacyTableOfContents';
import { stripHTML } from './sanitise';

const enhance = (elements: FEElement[]): FEElement[] => {
	const updatedElements: FEElement[] = [];
	const hasInteractiveContentsBlockElement = elements.some((element) =>
		isLegacyTableOfContents(element),
	);

	if (hasInteractiveContentsBlockElement) {
		// We want to record all `SubheadingBlockElement` to construct the interactive content block
		const subheadingLinks = elements.filter(
			(element): element is SubheadingBlockElement => {
				return (
					element._type ===
					'model.dotcomrendering.pageElements.SubheadingBlockElement'
				);
			},
		);

		// Get the last element with an 'elementId'
		// Using .slice() allows us to avoid mutating the original array
		const endDocumentElement = elements
			.slice()
			.reverse()
			.find((element) => 'elementId' in element);

		// replace interactive content block
		for (const element of elements) {
			if (isLegacyTableOfContents(element)) {
				updatedElements.push({
					_type: 'model.dotcomrendering.pageElements.DividerBlockElement',
					size: 'full',
					spaceAbove: 'tight',
				});
				if ('elementId' in element && element.elementId)
					updatedElements.push({
						_type: 'model.dotcomrendering.pageElements.InteractiveContentsBlockElement',
						elementId: element.elementId,
						// Strip the HTML from the subheading links for use as titles within the element
						subheadingLinks: subheadingLinks.map((subheading) => ({
							...subheading,
							html: stripHTML(subheading.html),
						})),
						endDocumentElementId:
							endDocumentElement &&
							'elementId' in endDocumentElement
								? endDocumentElement.elementId
								: undefined,
					});
			} else {
				updatedElements.push(element);
			}
		}

		return updatedElements;
	}

	return updatedElements.length ? updatedElements : elements;
};

export const enhanceInteractiveContentsElements = (blocks: Block[]): Block[] =>
	blocks.map((block: Block) => {
		return {
			...block,
			elements: enhance(block.elements),
		};
	});
