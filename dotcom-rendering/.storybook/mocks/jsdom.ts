/**
 * Mock JSDOM with native document/window implementation
 *
 * This file mocks JSDOM (which relies on Node.js built-in libs like 'fs'), and returns the native window element and DocumentFragment.
 * This solution allows us to use enhancers (see /src/model/enhance-*) in storybook.
 * This is required because enhancers only run on the server bundle, which has access to node.js built-ins. Since storybook runs entirely on the client, these modules do not exist.
 *
 * A better potential solution may be to provide a DOM wrapper for enhancers which supports both JSDOM and Native DOM implementations.
 */

export class JSDOM {
	constructor() {}
	window = window;

	static fragment(html) {
		try {
			const docNodes = new DOMParser().parseFromString(html, 'text/html')
				.body.childNodes;

			const frag = new DocumentFragment();
			Array.from(docNodes).forEach((node) => frag.appendChild(node));
			return frag;
		} catch (e) {
			console.error(e);
		}
	}
}
