import { css, jsx } from '@emotion/react';
import { body } from '@guardian/source-foundations';
import type { ReactNode } from 'react';
import { Fragment } from 'react';
import { getAttrs, isElement, parseHtml } from '../lib/domUtils';
import { palette } from '../palette';
import { logger } from '../server/lib/logging';
import { QuoteIcon } from './QuoteIcon';

type Props = {
	html: string;
	quoted?: boolean;
};

const baseBlockquoteStyles = css`
	margin-bottom: 14px;
	${body.medium({
		fontWeight: 'regular',
		fontStyle: 'italic',
		lineHeight: 'loose',
	})};

	color: ${palette('--block-quote-text')};

	p {
		margin-bottom: 8px;
	}

	a {
		color: ${palette('--article-link-text')};
		text-decoration: none;
		border-bottom: 1px solid ${palette('--article-link-border')};

		:hover {
			color: ${palette('--article-link-text-hover')};
			border-bottom: 1px solid ${palette('--article-link-border-hover')};
		}
	}
`;

const simpleBlockquoteStyles = css`
	${baseBlockquoteStyles}
	margin-top: 16px;
	margin-right: 0;
	margin-bottom: 16px;
	margin-left: 33px;
`;

const quotedBlockquoteStyles = css`
	${baseBlockquoteStyles}
`;

/**
 * Searches through the siblings of an element to determine if it's the first
 * of the desired node type.
 */
const isFirstSiblingOfType = (name: string, node: Node): boolean => {
	const prevSibling = node.previousSibling;
	if (!prevSibling) return true;
	if (prevSibling.nodeName === name) return false;
	else return isFirstSiblingOfType(name, prevSibling);
};

const textElement =
	(isQuoted: boolean) =>
	(node: Node, key: number): ReactNode => {
		const text = node.textContent ?? '';
		const children = Array.from(node.childNodes).map(textElement(isQuoted));
		switch (node.nodeName) {
			case 'P': {
				// We want to add the quote icon to the first "P" node of the blockquote element
				if (
					isQuoted &&
					node.parentElement?.nodeName === 'BLOCKQUOTE' &&
					isFirstSiblingOfType('P', node)
				) {
					return (
						<p>
							<QuoteIcon colour={palette('--block-quote-fill')} />
							{children}
						</p>
					);
				}
				return jsx('p', { children });
			}
			case 'BLOCKQUOTE':
				return jsx('blockquote', {
					key,
					children,
					css: isQuoted
						? quotedBlockquoteStyles
						: simpleBlockquoteStyles,
				});
			case 'A':
				return jsx('a', {
					href: getAttrs(node)?.getNamedItem('href')?.value,
					key,
					children,
				});
			case 'STRONG':
				return jsx('strong', {
					css: { fontWeight: 'bold' },
					key,
					children,
				});
			case '#text':
			case 'SPAN':
				return text;
			case 'BR':
				// BR cannot accept children as it's a void element
				return jsx('br', {
					key,
				});
			case 'H2':
			case 'B':
			case 'EM':
			case 'UL':
			case 'OL':
			case 'LI':
			case 'MARK':
			case 'SUB':
			case 'SUP':
			case 'S':
			case 'I':
				return jsx(node.nodeName.toLowerCase(), {
					key,
					children,
				});
			default:
				logger.warn(
					'BlockquoteBlockComponent: Unknown element received',
					{
						isDev: process.env.NODE_ENV !== 'production',
						element: {
							name: node.nodeName,
							html: isElement(node) ? node.outerHTML : undefined,
						},
					},
				);
				return null;
		}
	};

export const BlockquoteBlockComponent = ({ html, quoted }: Props) => {
	const fragment = parseHtml(html);

	return jsx(Fragment, {
		children: Array.from(fragment.childNodes).map(textElement(!!quoted)),
	});
};
