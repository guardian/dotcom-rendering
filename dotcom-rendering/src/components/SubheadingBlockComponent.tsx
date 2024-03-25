import { css, jsx } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign, ArticleDisplay, ArticleSpecial } from '@guardian/libs';
import { from, headline } from '@guardian/source-foundations';
import { textSans } from '@guardian/source-foundations/cjs/source-foundations/src/typography/api';
import type { ReactNode } from 'react';
import { Fragment } from 'react';
import { isElement, parseHtml } from '../lib/domUtils';
import { palette } from '../palette';
import { logger } from '../server/lib/logging';

type Props = { html: string; format: ArticleFormat };

const getAuthoritativeStyles = (format: ArticleFormat) => {
	/** TODO !
	 * This is temporary until https://github.com/guardian/dotcom-rendering/pull/10989 has been merged.
	 * The desired font weight is "regular" */
	const fontWeight = 'light';

	return css`
		${format.display === ArticleDisplay.Immersive
			? headline.small({ fontWeight, lineHeight: 'tight' })
			: headline.xsmall({ fontWeight, lineHeight: 'tight' })}

		${from.tablet} {
			${format.display === ArticleDisplay.Immersive
				? headline.medium({ fontWeight, lineHeight: 'tight' })
				: headline.small({ fontWeight, lineHeight: 'tight' })}
		}

		/** Labs uses sans text */
		${format.theme === ArticleSpecial.Labs &&
		css`
			${format.display === ArticleDisplay.Immersive
				? textSans.xxlarge({ fontWeight, lineHeight: 'tight' })
				: textSans.xlarge({ fontWeight, lineHeight: 'tight' })}

			${from.tablet} {
				${format.display === ArticleDisplay.Immersive
					? textSans.xxxlarge({ fontWeight, lineHeight: 'tight' })
					: textSans.xxlarge({ fontWeight, lineHeight: 'tight' })}
			}
		`}

		color: ${palette('--subheading-text')};

		/* NB. this is overridden for consecutive h2s in ArticleBody global styles */
		padding-top: 8px;

		padding-bottom: 2px;
		${from.tablet} {
			padding-bottom: 4px;
		}
	`;
};

const getStyles = (format: ArticleFormat) => {
	switch (format.design) {
		// "Authoritative clear" styles
		case ArticleDesign.Obituary:
		// "Authoritative stand-out" styles
		case ArticleDesign.Comment:
		case ArticleDesign.Editorial:
			return getAuthoritativeStyles(format);
		default:
			// ! Not implemented
			return css``; // TODO
	}
};

const ignoreGlobalH2Styling = (format: ArticleFormat) => {
	switch (format.design) {
		// Authoritative clear
		case ArticleDesign.Obituary:
		// Authoritative stand-out
		case ArticleDesign.Comment:
		case ArticleDesign.Editorial:
			return true;
		default:
			return false;
	}
};

const getStyleAttributes = (format: ArticleFormat) => {
	return {
		css: getStyles(format),
		/** While working on the new styles for formats, we ignore the global styling in
		 * ArticleBody.tsx but continue using it for the formats not using new styling yet */
		...(ignoreGlobalH2Styling(format) && {
			'data-ignore': 'global-h2-styling',
		}),
	};
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
							style={{ color: 'inherit' }}
						>
							{Array.from(node.childNodes).map(
								buildElementTree(format),
							)}
						</a>
					);

				case 'H2':
					return (
						<h2
							id={attributes.getNamedItem('id')?.value}
							{...getStyleAttributes(format)}
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
