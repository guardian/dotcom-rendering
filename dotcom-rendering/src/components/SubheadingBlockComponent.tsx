import { css, jsx } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '@guardian/libs';
import { type FontWeight, from, headline } from '@guardian/source-foundations';
import { textSans } from '@guardian/source-foundations/cjs/source-foundations/src/typography/api';
import type { ReactNode } from 'react';
import { Fragment } from 'react';
import { isElement, parseHtml } from '../lib/domUtils';
import { palette } from '../palette';
import { logger } from '../server/lib/logging';

type Props = { html: string; format: ArticleFormat };

const getFontStyles = ({
	format,
	fontWeight,
}: {
	format: ArticleFormat;
	fontWeight: FontWeight;
}) => css`
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

	padding-bottom: 2px;
	${from.tablet} {
		padding-bottom: 4px;
	}

	/* We don't allow additional font weight inside h2 tags */
	strong {
		font-weight: inherit;
	}
`;

const getStyles = (format: ArticleFormat) => {
	switch (format.design) {
		case ArticleDesign.Obituary:
		case ArticleDesign.Comment:
		case ArticleDesign.Editorial:
			/** TODO !
			 * This is temporary until https://github.com/guardian/dotcom-rendering/pull/10989 has been merged.
			 * The desired font weight is "regular" */
			return getFontStyles({ format, fontWeight: 'light' });

		case ArticleDesign.Standard:
		case ArticleDesign.Profile:
		case ArticleDesign.Explainer:
		case ArticleDesign.Timeline:
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
		case ArticleDesign.Analysis:
			return getFontStyles({ format, fontWeight: 'medium' });

		case ArticleDesign.Feature: {
			const fontWeight = format.theme === Pillar.News ? 'medium' : 'bold';
			return getFontStyles({ format, fontWeight });
		}
		case ArticleDesign.Interview:
		case ArticleDesign.Recipe:
		case ArticleDesign.Review:
			return getFontStyles({ format, fontWeight: 'bold' });

		default:
			return getFontStyles({ format, fontWeight: 'medium' });
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
							css={getStyles(format)}
							/** We override the h2 styling applied globally in ArticleBody */
							data-ignore="global-h2-styling"
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
