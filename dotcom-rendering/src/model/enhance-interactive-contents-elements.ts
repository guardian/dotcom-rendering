import { stripHTML } from './sanitise';

const scriptUrls = [
	'https://interactive.guim.co.uk/page-enhancers/nav/boot.js',
	'https://uploads.guim.co.uk/2019/03/20/boot.js',
	'https://uploads.guim.co.uk/2019/12/11/boot.js',
	'https://interactive.guim.co.uk/testing/2020/11/voterSlideshow/boot.js',
	'https://uploads.guim.co.uk/2021/10/15/boot.js',
];

const isInteractiveContentsBlockElement = (element: CAPIElement): boolean =>
	element._type ===
		'model.dotcomrendering.pageElements.InteractiveBlockElement' &&
	!!element.scriptUrl &&
	scriptUrls.includes(element.scriptUrl);

const enhance = (elements: CAPIElement[]): CAPIElement[] => {
	const updatedElements: CAPIElement[] = [];
	const hasInteractiveContentsBlockElement = elements.some((element) =>
		isInteractiveContentsBlockElement(element),
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
		elements.forEach((element) => {
			if (isInteractiveContentsBlockElement(element)) {
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
		});

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
