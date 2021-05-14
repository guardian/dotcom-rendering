import { JSDOM } from 'jsdom';

const isQuoted = (element: BlockquoteBlockElement): boolean => {
	// A quoted blockquote: <blockquote class="quoted"><p>I think therefore I am</p></blockquote>
	const frag = JSDOM.fragment(element.html);
	return !!frag.querySelector('.quoted');
};

const enhance = (
	elements: CAPIElement[],
	isPhotoEssay: boolean,
): CAPIElement[] => {
	// Loops the array of article elements looking for BlockquoteBlockElements to enhance
	const enhanced: CAPIElement[] = [];
	elements.forEach((element) => {
		switch (element._type) {
			case 'model.dotcomrendering.pageElements.BlockquoteBlockElement':
				if (isQuoted(element)) {
					// When blockquotes have the `quoted` class we represent this using
					// the quoted prop
					enhanced.push({
						_type:
							'model.dotcomrendering.pageElements.BlockquoteBlockElement',
						elementId: element.elementId,
						html: element.html,
						quoted: true,
					});
				} else if (isPhotoEssay) {
					// If a blockquote is not queoted it is a Simple Blockquote and for
					// photo essays we transform these into HighlightBlockElements
					enhanced.push({
						_type:
							'model.dotcomrendering.pageElements.HighlightBlockElement',
						elementId: element.elementId,
						html: element.html,
					});
				} else {
					// Otherwise we don't transform anything and pass the element through
					enhanced.push(element);
				}
				break;
			default:
				enhanced.push(element);
		}
	});
	return enhanced;
};

export const enhanceBlockquotes = (data: CAPIType): CAPIType => {
	const { isPhotoEssay } = data.config;

	const enhancedBlocks = data.blocks.map((block: Block) => {
		return {
			...block,
			elements: enhance(block.elements, isPhotoEssay || false),
		};
	});

	return {
		...data,
		blocks: enhancedBlocks,
	} as CAPIType;
};
