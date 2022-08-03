import { JSDOM } from 'jsdom';

const isEmailEmbed = (element: CAPIElement): boolean =>
	element._type === 'model.dotcomrendering.pageElements.EmbedBlockElement' &&
	element.html.includes('<iframe') &&
	element.html.includes('email/form');

const getPromotedNewsletters = (elements: CAPIElement[]): Newsletter[] =>
	elements
		.filter(
			(element) =>
				element._type ===
				'model.dotcomrendering.pageElements.NewsletterSignupBlockElement',
		)
		.map((element) => (element as NewsletterSignupBlockElement).newsletter);

const getEmbedIframeSrc = (embed: EmbedBlockElement): string | undefined =>
	JSDOM.fragment(embed.html).querySelector('iframe')?.getAttribute('src') ||
	undefined;


const remove = (elements: CAPIElement[]): CAPIElement[] => {
	const emailEmbeds = elements.filter(isEmailEmbed) as EmbedBlockElement[];
	if (emailEmbeds.length === 0) {
		return elements;
	}
	const promotedNewsletters = getPromotedNewsletters(elements);

	const elementsToRemove = emailEmbeds.filter((embed) => {
		const iframeSrc = getEmbedIframeSrc(embed);
		// The iframe src for an email embed ends with either the listId or
		// identityName of the newsletter.
		return !iframeSrc || promotedNewsletters.some((newsletter) =>
			iframeSrc?.includes(newsletter.identityName) || iframeSrc.includes(newsletter.listId.toString()),
		);
	}) as CAPIElement[];

	return elements.filter((element) => !elementsToRemove.includes(element));
};

export const removeOldSignUpEmbeds = (blocks: Block[]): Block[] =>
	blocks.map((block: Block) => ({
		...block,
		elements: remove(block.elements),
	}));
