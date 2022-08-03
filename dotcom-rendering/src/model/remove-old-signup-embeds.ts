const hasNewsletterSignupBlockElement = (block: Block): boolean =>
	!!block.elements.find(
		(element) =>
			element._type ===
			'model.dotcomrendering.pageElements.NewsletterSignupBlockElement',
	);

// TO DO - smarter HTML checking using regex?
const isEmailEmbed = (element: CAPIElement): boolean =>
	element._type === 'model.dotcomrendering.pageElements.EmbedBlockElement' &&
	element.html.includes('<iframe') &&
	element.html.includes('email/form');

const remove = (elements: CAPIElement[]): CAPIElement[] => {
	const emailEmbeds = elements.filter(isEmailEmbed) as EmbedBlockElement[];
	const embedstoRemove = emailEmbeds as CAPIElement[]
	return elements.filter(element => !embedstoRemove.includes(element))
};

export const removeOldSignUpEmbeds = (blocks: Block[]): Block[] =>
	blocks.map((block: Block) =>
		hasNewsletterSignupBlockElement(block)
			? {
					...block,
					elements: remove(block.elements),
			  }
			: block,
	);
