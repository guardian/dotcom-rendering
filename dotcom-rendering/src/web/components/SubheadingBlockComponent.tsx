import { jsx } from '@emotion/react';
import { JSDOM } from 'jsdom';
import type { ReactNode } from 'react';
import { Fragment } from 'react';

type Props = { html: string };

const parseHtml = (html: string): DocumentFragment => JSDOM.fragment(html);

function isElement(node: Node): node is Element {
	return node.nodeType === 1;
}

const getAttrs = (node: Node): NamedNodeMap | undefined =>
	isElement(node) ? node.attributes : undefined;

const buildElementTree = (node: Node): ReactNode => {
	if (node.nodeType === node.ELEMENT_NODE) {
		const element = node as Element;
		return jsx(element.tagName.toLowerCase(), {
			id: getAttrs(node)?.getNamedItem('id')?.value,
			children: Array.from(node.childNodes).map(buildElementTree),
		});
	} else if (node.nodeType === node.TEXT_NODE) {
		return node.textContent;
	} else {
		return null;
	}
};

export const SubheadingBlockComponent = ({ html }: Props) => {
	const fragment = parseHtml(html);
	return jsx(Fragment, {
		children: Array.from(fragment.childNodes).map(buildElementTree),
	});
};
