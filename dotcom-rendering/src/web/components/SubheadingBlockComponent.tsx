import { jsx } from '@emotion/react';
import type { ReactNode } from 'react';
import { Fragment } from 'react';
import { logger } from '../../server/lib/logging';
import { isElement, parseHtml } from '../lib/domUtils';

type Props = { html: string };

const buildElementTree = (node: Node): ReactNode => {
	if (isElement(node)) {
		return jsx(node.tagName.toLowerCase(), {
			id: node.attributes.getNamedItem('id')?.value,
			children: Array.from(node.childNodes).map(buildElementTree),
		});
	} else if (node.nodeType === node.TEXT_NODE) {
		return node.textContent;
	} else {
		logger.warn('SubheadingBlockComponent: Unknown element received', {
			isDev: process.env.NODE_ENV !== 'production',
			element: {
				name: node.nodeName,
				html: isElement(node) ? node.outerHTML : undefined,
			},
		});
		return null;
	}
};

export const SubheadingBlockComponent = ({ html }: Props) => {
	const fragment = parseHtml(html);
	return jsx(Fragment, {
		children: Array.from(fragment.childNodes).map(buildElementTree),
	});
};
