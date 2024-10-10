import { jsx } from '@emotion/react';
import type { ReactNode } from 'react';
import { Fragment } from 'react';
import { isElement, parseHtml } from '../lib/domUtils';
import type { ArticleFormat } from '../lib/format';
import { logger } from '../server/lib/logging';
import { Subheading } from './Subheading';

type Props = { html: string; format: ArticleFormat };

export const buildElementTree =
	(format: ArticleFormat) =>
	(node: Node): ReactNode => {
		if (isElement(node)) {
			const { attributes } = node;
			switch (node.nodeName) {
				case 'A':
					return (
						<a
							href={attributes.getNamedItem('href')?.value}
							target={attributes.getNamedItem('target')?.value}
							style={{ color: 'inherit' }}
						>
							{Array.from(node.childNodes).map(
								buildElementTree(format),
							)}
						</a>
					);

				case 'H2':
					return (
						<Subheading
							id={attributes.getNamedItem('id')?.value}
							format={format}
							topPadding={true}
						>
							{Array.from(node.childNodes).map(
								buildElementTree(format),
							)}
						</Subheading>
					);

				default:
					return jsx(node.tagName.toLowerCase(), {
						children: Array.from(node.childNodes).map(
							buildElementTree(format),
						),
					});
			}
		} else if (node.nodeType === node.TEXT_NODE) {
			// plain text receives no styling
			return node.textContent;
		} else {
			logger.warn('SubheadingBlockComponent: Unknown element received', {
				isDev: process.env.NODE_ENV !== 'production',
				element: { name: node.nodeName },
			});
			return null;
		}
	};

export const SubheadingBlockComponent = ({ html, format }: Props) => {
	const fragment = parseHtml(html);
	return jsx(Fragment, {
		children: Array.from(fragment.childNodes).map(buildElementTree(format)),
	});
};
