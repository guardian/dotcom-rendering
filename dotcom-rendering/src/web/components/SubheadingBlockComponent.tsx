import { jsx } from '@emotion/react';
import type { ReactNode } from 'react';
import { Fragment } from 'react';
import { parseHtml } from '../lib/domUtils';

type Props = { html: string };

const buildElementTree = (node: Node): ReactNode => {
	if (node instanceof Element) {
		return jsx(node.tagName.toLowerCase(), {
			id: node.attributes.getNamedItem('id')?.value,
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
