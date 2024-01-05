import { css, jsx } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign, ArticleDisplay, ArticleSpecial } from '@guardian/libs';
import {
	body,
	from,
	palette,
	textSans,
	until,
} from '@guardian/source-foundations';
import type { ReactNode } from 'react';
import { Fragment } from 'react';
import type { IOptions } from 'sanitize-html';
import sanitise from 'sanitize-html';
import { decidePalette } from '../lib/decidePalette';
import { getAttrs, isElement, parseHtml } from '../lib/domUtils';
import { logger } from '../server/lib/logging';
import { DropCap } from './DropCap';

type Props = {
	html: string;
	format: ArticleFormat;
	isFirstParagraph: boolean;
	forceDropCap?: boolean;
};

const isLetter = (letter: string) => {
	return letter.toLowerCase() !== letter.toUpperCase();
};

const isOpenQuote = (t: string): boolean => {
	return [
		"'" /* apostrophe  */,
		'"' /* quotation mark */,
		'\u2018' /* open single quote */,
		'\u201c' /* open double quote */,
	].includes(t);
};

const stripHtmlFromString = (html: string): string => {
	// https://stackoverflow.com/questions/822452/strip-html-from-text-javascript is
	// a good discussion on how this can be done. Of the two approaches, regex and
	// DOM, both have unikely failure scenarios but the impact for failure with DOM
	// manipulation carries a potential security risk so we're using a regex.
	return html.replace(/(<([^>]+)>)/gi, '');
};

const getDropCappedSentence = (
	node: Node,
): { dropCap: string; restOfSentence: string } | undefined => {
	// The node is at the root of the document avoiding nodes like <a>
	// tags embedded in <p> tags dropping their cap
	if (node.parentNode?.parentNode?.nodeName !== '#document-fragment') return;

	// The node has to be the first grand-child
	if (node.previousSibling !== null) return;

	// The node’s parent has to be the first child
	if (node.parentNode.previousSibling !== null) return;

	const text = node.textContent;

	if (!text) return;

	const first = text.substring(0, 1);

	// If it starts with a quote and a letter, drop "“A"
	if (isOpenQuote(first)) {
		const second = text.substring(1, 2);

		if (isLetter(second)) {
			return {
				dropCap: `${first}${second}`,
				restOfSentence: text.substring(2),
			};
		}
	}

	// Or just drop if the first is a letter
	if (isLetter(first)) {
		return {
			dropCap: first,
			restOfSentence: text.substring(1),
		};
	}

	return;
};

const isValidFormatForDropCap = (format: ArticleFormat) => {
	if (format.theme === ArticleSpecial.Labs) return false;
	if (format.display === ArticleDisplay.Immersive) return true;
	switch (format.design) {
		case ArticleDesign.Feature:
		case ArticleDesign.Comment:
		case ArticleDesign.Review:
		case ArticleDesign.Interview:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.Recipe:
			return true;
		default:
			return false;
	}
};

const shouldShowDropCaps = (
	html: string,
	format: ArticleFormat,
	isFirstParagraph: boolean,
	forceDropCap?: boolean,
) => {
	const validDropCapFormat = isValidFormatForDropCap(format);
	// We need to strip any markup from our html string so that we accurately measure
	// the length that the reader will see. Eg. remove link tag html.
	const isLongEnough = stripHtmlFromString(html).length >= 200;

	if (validDropCapFormat && isLongEnough) {
		// When dropcaps are allowed, we always mark the first paragraph as a drop cap
		if (isFirstParagraph) return true;

		// For subsequent blocks of text, we only add a dropcap if a dinkus was inserted
		// prior to it in the article body (Eg: * * *), causing the forceDropCap flag to
		// be set
		if (forceDropCap) return true;
	}

	return false;
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

const styles = (format: ArticleFormat) => css`
	margin-bottom: 14px;
	word-break: break-word;
	${format.theme === ArticleSpecial.Labs ? textSans.medium() : body.medium()};

	strong em,
	strong u {
		font-weight: bold;
	}

	ul {
		margin-bottom: 12px;
	}

	${from.tablet} {
		ul {
			margin-bottom: 16px;
		}
	}

	li {
		margin-bottom: 6px;
		padding-left: 20px;
		display: flow-root;

		p {
			display: inline;
		}
	}

	li:before {
		display: inline-block;
		content: '';
		border-radius: 50%;
		height: 13px;
		width: 13px;
		background-color: ${palette.neutral[86]};
		margin-left: -20px;
		margin-right: 7px;
	}

	/* Subscript and Superscript styles */
	sub {
		bottom: -0.25em;
	}

	sup {
		top: -0.5em;
	}

	sub,
	sup {
		font-size: 75%;
		line-height: 0;
		position: relative;
		vertical-align: baseline;
	}

	[data-dcr-style='bullet'] {
		display: inline-block;
		content: '';
		border-radius: 50%;
		height: 13px;
		width: 13px;
		margin-right: 0.2px;
		background-color: ${decidePalette(format).background.bullet};
	}

	${until.tablet} {
		/* 	To stop long words going outside of the view port.
					For compatibility */
		overflow-wrap: anywhere;
		word-wrap: break-word;
	}
`;

const buildElementTree =
	(html: string, format: ArticleFormat, showDropCaps: boolean) =>
	(node: Node, key: number): ReactNode => {
		const children = Array.from(node.childNodes).map(
			buildElementTree(html, format, showDropCaps),
		);

		switch (node.nodeName) {
			case 'P': {
				return jsx('p', { css: styles(format), children });
			}
			case 'BLOCKQUOTE':
				return jsx('blockquote', {
					key,
					children,
				});
			case 'A':
				return jsx('a', {
					href: getAttrs(node)?.getNamedItem('href')?.value,
					target: getAttrs(node)?.getNamedItem('target')?.value,
					'data-link-name':
						getAttrs(node)?.getNamedItem('data-link-name')?.value,
					'data-component':
						getAttrs(node)?.getNamedItem('data-component')?.value,
					rel: getAttrs(node)?.getNamedItem('rel')?.value,
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
					const dropCappedSentence = showDropCaps
						? getDropCappedSentence(node)
						: undefined;
					if (dropCappedSentence) {
						const { dropCap, restOfSentence } = dropCappedSentence;
						return (
							<>
								<DropCap letter={dropCap} format={format} />
								{restOfSentence}
							</>
						);
					}

					return node.textContent;
				}
				return jsx('p', { css: styles(format), children });
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
				return jsx('p', { css: styles(format), children });
			case 'BR':
				return jsx('br', {
					key,
				});
			case 'STRIKE':
				return jsx('s', {
					css: styles(format),
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
			case 'EM':
			case 'UL':
			case 'LI':
			case 'MARK':
			case 'S':
			case 'I':
			case 'VAR':
			case 'U':
			case 'DEL':
				return jsx(node.nodeName.toLowerCase(), {
					css: styles(format),
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

export const TextBlockComponent = ({
	html,
	format,
	isFirstParagraph,
	forceDropCap,
}: Props) => {
	const showDropCaps = shouldShowDropCaps(
		html,
		format,
		isFirstParagraph,
		forceDropCap,
	);
	const fragment = parseHtml(sanitise(html, sanitiserOptions));
	return jsx(Fragment, {
		children: Array.from(fragment.childNodes).map(
			buildElementTree(
				sanitise(html, sanitiserOptions),
				format,
				showDropCaps,
			),
		),
	});
};
