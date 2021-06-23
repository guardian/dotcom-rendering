import { stripHTML } from '@root/src/model/strip-html';

const isInteractiveContentBlockElement = (element: CAPIElement) =>
	element._type ===
		'model.dotcomrendering.pageElements.InteractiveBlockElement' &&
	element?.scriptUrl === 'https://uploads.guim.co.uk/2019/03/20/boot.js';

const enhance = (elements: CAPIElement[]): CAPIElement[] => {
	const updatedElements: CAPIElement[] = [];
	const hasInteractiveContentBlockElement = elements.some((element) =>
		isInteractiveContentBlockElement(element),
	);

	console.log(`hasInteractiveContentBlockElement: ${  hasInteractiveContentBlockElement}`)

	if (hasInteractiveContentBlockElement) {
		// We want to record all `SubheadingBlockElement` to construct the interactive content block
		const subheadingLinks: SubheadingBlockElement[] = [];
		const withUpdatedSubheadings: CAPIElement[] = elements.map(
			(thisElement) => {
				if (
					thisElement._type ===
					'model.dotcomrendering.pageElements.SubheadingBlockElement'
				) {
					const enhancedSubheading = {
						...thisElement,
						html: thisElement.html.replace(
							'<h2>',
							// add ID to H2 element
							`<h2 id='${thisElement.elementId}'>`,
						),
					};
					subheadingLinks.push(enhancedSubheading);
					return enhancedSubheading;
				}
				return thisElement;
			},
		);

		// replace interactive content block
		withUpdatedSubheadings.forEach((element) => {
			if (isInteractiveContentBlockElement(element)) {
				updatedElements.push({
					_type:
						'model.dotcomrendering.pageElements.DividerBlockElement',
					size: 'full',
					spaceAbove: 'tight',
				});
				updatedElements.push({
					_type:
						'model.dotcomrendering.pageElements.InteractiveContentBlockElement',
					elementId: element.elementId,
					// Strip the HTML from the subheading links for use as titles within the element
					subheadingLinks: subheadingLinks.map((subheading) => ({
						...subheading,
						html: stripHTML(subheading.html),
					})),
				});

			} else {
				updatedElements.push(element);
			}
		});

		return updatedElements;
	}

	return updatedElements.length ? updatedElements : elements;
};

export const enhanceInteractiveContentElements = (data: CAPIType): CAPIType => {
	const enhancedBlocks = data.blocks.map((block: Block) => {
		return {
			...block,
			elements: enhance(block.elements),
		};
	});

	return {
		...data,
		blocks: enhancedBlocks,
	} as CAPIType;
};
