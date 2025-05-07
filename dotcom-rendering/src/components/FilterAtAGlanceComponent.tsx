import { css, jsx } from '@emotion/react';
import { neutral, textSans17 } from '@guardian/source/foundations';
import type { ReactNode } from 'react';
import { Fragment } from 'react';
import type { IOptions } from 'sanitize-html';
import sanitise from 'sanitize-html';
import { getAttrs, isElement, parseHtml } from '../lib/domUtils';
import { logger } from '../server/lib/logging';

type Props = {
	html: string;
};

const sanitiserOptions: IOptions = {
	// We allow all tags, which includes script & style which are potentially vulnerable
	// `allowVulnerableTags: true` suppresses this warning
	allowVulnerableTags: true,
	allowedTags: false, // Leave tags from CAPI alone
	allowedAttributes: false, // Leave attributes from CAPI alone
	transformTags: {
		a: (tagName, attribs) => {
			if (!attribs.href) return { tagName, attribs };

			const mailto = attribs.href.startsWith('mailto:')
				? ` | ${attribs.href}`
				: '';

			return {
				tagName, // Just return anchors as is
				attribs: {
					...attribs, // Merge into the existing attributes
					...{
						'data-link-name': `in body link${mailto}`, // Add the data-link-name for Ophan to anchors
					},
				},
			};
		},
	},
};

export const textBlockStyles = () => css`
	${textSans17}

	max-width: 100%;
	width: fit-content;

	background-color: ${neutral[97]};
	padding: 10px;
	border-radius: 10px;

	p,
	li {
		padding: 0px;
	}

	sub {
		margin-top: 10px;
	}

	a::before {
		content: ' ';
		clear: right;
		display: block;
	}
`;

const buildElementTree =
	() =>
	(node: Node, key: number): ReactNode => {
		const children = Array.from(node.childNodes).map(buildElementTree());

		switch (node.nodeName) {
			case 'P': {
				return jsx('p', { css: textBlockStyles(), children });
			}
			case 'BLOCKQUOTE':
				return jsx('blockquote', {
					key,
					children,
				});
			case 'A': {
				const href = getAttrs(node)?.getNamedItem('href')?.value;

				return jsx('a', {
					href,
					target: getAttrs(node)?.getNamedItem('target')?.value,
					'data-link-name':
						getAttrs(node)?.getNamedItem('data-link-name')?.value,
					'data-component':
						getAttrs(node)?.getNamedItem('data-component')?.value,
					/**
					 * Affiliate links must have the rel attribute set to "sponsored"
					 * @see https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links
					 */
					rel: getAttrs(node)?.getNamedItem('rel')?.value,
					key,
					children,
				});
			}
			case 'EM':
				return jsx('em', {
					key,
					children,
				});
			case 'STRONG':
				return jsx('strong', {
					key,
					children,
				});
			case '#text': {
				if (node.textContent !== null) {
					return node.textContent;
				}
				return jsx('p', { css: textBlockStyles(), children });
			}
			case 'SPAN':
				if (
					getAttrs(node)?.getNamedItem('data-dcr-style')?.value ===
					'bullet'
				) {
					return jsx('span', {
						'data-dcr-style': 'bullet',
						key,
						children,
					});
				}
				return jsx('p', { css: textBlockStyles(), children });
			case 'BR':
				return;
			case 'STRIKE':
				return jsx('s', {
					css: textBlockStyles(),
					key,
					children,
				});
			case 'OL':
				return jsx('ol', {
					'data-ignore':
						getAttrs(node)?.getNamedItem('data-ignore')?.value,
					key,
					children,
				});
			case 'FOOTER':
			case 'SUB':
			case 'SUP':
			case 'H2':
			case 'H3':
			case 'H4':
			case 'B':
			case 'UL':
			case 'LI':
			case 'MARK':
			case 'S':
			case 'I':
			case 'VAR':
			case 'U':
			case 'DEL':
				return jsx(node.nodeName.toLowerCase(), {
					css: textBlockStyles(),
					key,
					children,
				});
			default:
				logger.warn('TextBlockComponent: Unknown element received', {
					isDev: process.env.NODE_ENV !== 'production',
					element: {
						name: node.nodeName,
						html: isElement(node) ? node.outerHTML : undefined,
					},
				});
				return null;
		}
	};

export const FilterAtAGlanceComponent = ({ html }: Props) => {
	const fragment = parseHtml(sanitise(html, sanitiserOptions));
	return jsx(Fragment, {
		children: Array.from(fragment.childNodes).map(buildElementTree()),
	});
};
