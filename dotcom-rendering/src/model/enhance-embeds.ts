import { JSDOM } from 'jsdom';
import type { CAPIElement } from '../types/content';

const addTitleToIframe = (elements: CAPIElement[]): CAPIElement[] => {
	const enhanced: CAPIElement[] = [];
	elements.forEach((element) => {
		switch (element._type) {
			case 'model.dotcomrendering.pageElements.EmbedBlockElement':
				// Parse the embed block element, find the iframe and add
				// the alt text as a title attribute if it exists
				// https://dequeuniversity.com/tips/provide-iframe-titles
				const dom = JSDOM.fragment(element.html);
				const iframe = dom.querySelector('iframe');
				if (iframe && element.alt) {
					iframe.setAttribute('title', element.alt);
					enhanced.push({
						...element,
						...{
							html: iframe.outerHTML,
						},
					});
				} else {
					enhanced.push(element);
				}
				break;
			default:
				enhanced.push(element);
		}
	});
	return enhanced;
};

export const enhanceEmbeds = (blocks: Block[]): Block[] =>
	blocks.map((block: Block) => {
		return {
			...block,
			elements: addTitleToIframe(block.elements),
		};
	});
