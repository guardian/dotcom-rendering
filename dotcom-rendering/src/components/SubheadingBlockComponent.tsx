import { css, jsx } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign, ArticleDisplay } from '@guardian/libs';
import { from, headline } from '@guardian/source-foundations';
import type { ReactNode } from 'react';
import { Fragment } from 'react';
import { isElement, parseHtml } from '../lib/domUtils';
import { palette } from '../palette';
import { logger } from '../server/lib/logging';

type Props = { html: string; format: ArticleFormat };

const getStyles = (format: ArticleFormat) => {
	switch (format.design) {
		case ArticleDesign.Obituary:
			switch (format.display) {
				// Authoritative clear
				case ArticleDisplay.Immersive:
					return css`
						${headline.small({
							fontWeight: 'regular',
							lineHeight: 'tight',
						})}
						color: ${palette('--subheading-text')};
						padding-top: 8px;
						padding-bottom: 2px;

						${from.tablet} {
							${headline.medium({
								fontWeight: 'regular',
								lineHeight: 'tight',
							})}
							padding-bottom: 4px;
						}
					`;
				case ArticleDisplay.Showcase:
				case ArticleDisplay.Standard:
					return css`
						${headline.xsmall({
							fontWeight: 'regular',
							lineHeight: 'tight',
						})}
						color: ${palette('--subheading-text')};
						padding-top: 8px;
						padding-bottom: 2px;

						${from.tablet} {
							${headline.small({
								fontWeight: 'regular',
								lineHeight: 'tight',
							})}
							padding-bottom: 4px;
						}
					`;

				default:
					return ''; // TODO
			}
		default:
			return ''; // TODO
	}
};

const buildElementTree =
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
						>
							{Array.from(node.childNodes).map(
								buildElementTree(format),
							)}
						</a>
					);

				case 'H2':
					return (
						<h2
							css={getStyles(format)}
							id={attributes.getNamedItem('id')?.value}
						>
							{Array.from(node.childNodes).map(
								buildElementTree(format),
							)}
						</h2>
					);

				default:
					return jsx(node.tagName.toLowerCase(), {
						children: Array.from(node.childNodes).map(
							buildElementTree(format),
						),
					});
			}
		} else if (node.nodeType === node.TEXT_NODE) {
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
