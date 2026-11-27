import { JSDOM } from 'jsdom';

/*
 * On module load, pre-warms the underlying setup that happens lazily on the
 * first call to `JSDOM.fragment`, to speed up later calls to `fragment` made by
 * functions like `parseHtml`.
 */
JSDOM.fragment('');

export const parseHtml = (html: string): DocumentFragment =>
	JSDOM.fragment(html);

// The nodeType for ELEMENT_NODE has the value 1.
export function isElement(node: Node): node is Element {
	return node.nodeType === 1;
}

export const getAttrs = (node: Node): NamedNodeMap | undefined =>
	isElement(node) ? node.attributes : undefined;
