import { css, jsx } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign, ArticleDisplay, ArticleSpecial } from '@guardian/libs';
import {
	type FontWeight,
	from,
	headline,
	space,
} from '@guardian/source-foundations';
import { textSans } from '@guardian/source-foundations/cjs/source-foundations/src/typography/api';
import type { ReactNode } from 'react';
import { Fragment } from 'react';
import { isElement, parseHtml } from '../lib/domUtils';
import { palette } from '../palette';
import { logger } from '../server/lib/logging';

type Props = {
	html: string;
	format: ArticleFormat;
	topPadding?: boolean;
};

const getFontStyles = ({
	format,
	fontWeight,
	topPadding,
}: {
	format: ArticleFormat;
	fontWeight: FontWeight;
	topPadding: boolean;
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

	${topPadding && `padding-top: ${space[2]}px`};
	padding-bottom: ${space[0]}px ${from.tablet} {
		padding-bottom: ${space[1]}px;
	}

	/* We don't allow additional font weight inside h2 tags except for immersive articles */
	strong {
		font-weight: ${format.display === ArticleDisplay.Immersive
			? 'bold'
			: 'inherit'};
	}
`;

const getStyles = (format: ArticleFormat, topPadding: boolean) => {
	switch (format.design) {
		case ArticleDesign.Obituary:
		case ArticleDesign.Comment:
		case ArticleDesign.Editorial:
			/** TODO !
			 * This is temporary until https://github.com/guardian/dotcom-rendering/pull/10989 has been merged.
			 * The desired font weight is "regular" */
			return getFontStyles({
				format,
				fontWeight: 'light',
				topPadding,
			});

		case ArticleDesign.Standard:
		case ArticleDesign.Profile:
		case ArticleDesign.Explainer:
		case ArticleDesign.Timeline:
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
		case ArticleDesign.Analysis:
			return getFontStyles({
				format,
				fontWeight: 'medium',
				topPadding,
			});

		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Recipe:
		case ArticleDesign.Review:
			return getFontStyles({
				format,
				fontWeight: 'bold',
				topPadding,
			});

		default:
			return getFontStyles({
				format,
				fontWeight: 'medium',
				topPadding,
			});
	}
};

const buildElementTree =
	(format: ArticleFormat, topPadding: boolean) =>
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
								buildElementTree(format, topPadding),
							)}
						</a>
					);

				case 'H2':
					return (
						<h2
							id={attributes.getNamedItem('id')?.value}
							css={getStyles(format, topPadding)}
						>
							{Array.from(node.childNodes).map(
								buildElementTree(format, topPadding),
							)}
						</h2>
					);

				default:
					return jsx(node.tagName.toLowerCase(), {
						children: Array.from(node.childNodes).map(
							buildElementTree(format, topPadding),
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

export const SubheadingBlockComponent = ({
	html,
	format,
	topPadding = true,
}: Props) => {
	const fragment = parseHtml(html);
	return jsx(Fragment, {
		children: Array.from(fragment.childNodes).map(
			buildElementTree(format, topPadding),
		),
	});
};
