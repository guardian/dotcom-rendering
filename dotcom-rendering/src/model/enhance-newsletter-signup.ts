// places the NewsletterSignup in the middle of the array
// TO DO - more sophisicated placement when business logic is decided.
const findIndexToInsertAt = (elements: CAPIElement[]): number => {
	return Math.floor(elements.length / 2);
};

export const enhanceNewsletterSignup = (
	blocks: Block[],
	newsletter?: Newsletter,
): Block[] => {
	if (!newsletter) {
		return blocks;
	}

	const { elements } = blocks[0];

	elements.splice(findIndexToInsertAt(elements), 0, {
		_type: 'model.dotcomrendering.pageElements.NewsletterSignupBlockElement',
		newsletter: newsletter,
		elementId: newsletter.elementId,
	});

	return blocks;
};
