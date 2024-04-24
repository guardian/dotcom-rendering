import type { FEElement } from '../types/content';

const isParagraph = (element: FEElement) =>
	element._type === 'model.dotcomrendering.pageElements.TextBlockElement';

type ReducerAccumulator = {
	elements: FEElement[];
	paragraphCounter: number;
};

const createDisclaimerBlock = (): FEElement => ({
	_type: 'model.dotcomrendering.pageElements.DisclaimerBlockElement',
	elementId: 'disclaimer',
	// this is a marker element and its html should not be rendered
	html: '',
	role: 'inline',
});

/**
 * Create a DisclaimerBlockElement before the 2nd paragraph
 * This element is just a marker to be used by the layout implementations which
 * will insert a <Disclaimer> component
 */
const insertDisclaimerElement = (elements: FEElement[]): FEElement[] => {
	const enhancedElements = elements.reduce(
		(acc: ReducerAccumulator, element: FEElement): ReducerAccumulator => {
			const paragraphCounter = isParagraph(element)
				? acc.paragraphCounter + 1
				: acc.paragraphCounter;

			const newElements =
				paragraphCounter === 2 && isParagraph(element)
					? [...acc.elements, createDisclaimerBlock(), element]
					: [...acc.elements, element];

			return {
				elements: newElements,
				paragraphCounter,
			};
		},
		{
			elements: [],
			paragraphCounter: 0,
		},
	);
	return enhancedElements.elements;
};

const enhanceDisclaimer =
	(hasAffiliateLinksDisclaimer: boolean) =>
	(elements: FEElement[]): FEElement[] =>
		hasAffiliateLinksDisclaimer
			? insertDisclaimerElement(elements)
			: elements;

export { enhanceDisclaimer, insertDisclaimerElement };
