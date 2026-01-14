import { jsx } from '@emotion/react';
import type { ReactNode } from 'react';
import { Fragment } from 'react';
import type { IOptions } from 'sanitize-html';
import sanitise from 'sanitize-html';
import { parseHtml } from '../lib/domUtils';
import { grid } from '../grid';

type Props = {
	body?: string;
};

/**
 * https://www.npmjs.com/package/sanitize-html#default-options
 */
const sanitiserOptions: IOptions = {
	// We allow all tags, which includes script & style which are potentially vulnerable
	// `allowVulnerableTags: true` suppresses this warning
	allowVulnerableTags: true,
	allowedTags: false, // Leave tags from CAPI alone
	allowedAttributes: false, // Leave attributes from CAPI alone
};

const buildElementTree = (node: Node, key: number): ReactNode => {
	const children = Array.from(node.childNodes).map(buildElementTree);

	switch (node.nodeName) {
		case '#text':
			return node.textContent;

		case 'IMG':
			return null;
		default:
			return jsx(node.nodeName.toLowerCase(), {
				key,
				children,
			});
	}
};

export const HostedArticleBody = ({ body }: Props) => {
	if (!body) {
		return <></>;
	}

	const fragment = parseHtml(sanitise(body, sanitiserOptions));

	return jsx(Fragment, {
		children: Array.from(fragment.childNodes).map(buildElementTree),
	});
};
