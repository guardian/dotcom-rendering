export const enhanceNewsletterSignup = (
	blocks: Block[],
	newsletter?: Newsletter,
): Block[] => {
	if (!newsletter) {
		return blocks;
	}

	blocks[0]?.elements.unshift({
		_type: 'model.dotcomrendering.pageElements.NewsletterSignupBlockElement',
		newsletter: newsletter,
		elementId: newsletter.elementId,
	});

	return blocks;
};
