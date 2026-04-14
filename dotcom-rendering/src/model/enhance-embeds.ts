import { JSDOM } from 'jsdom';
import type { FEElement } from '../types/content';

export const enhanceEmbeds = (elements: FEElement[]): FEElement[] =>
	elements.map<FEElement>((element) => {
		switch (element._type) {
			case 'model.dotcomrendering.pageElements.EmbedBlockElement':
				// Parse the embed block element, find the iframe and add
				// the alt text as a title attribute if it exists
				// https://dequeuniversity.com/tips/provide-iframe-titles
				const dom = JSDOM.fragment(element.html);
				const iframe = dom.querySelector('iframe');
				if (iframe && element.alt) {
					iframe.setAttribute('title', element.alt);
					return {
						...element,
						...{
							html: iframe.outerHTML,
						},
					};
				} else {
					return element;
				}
				break;
			default:
				return element;
		}
	});
