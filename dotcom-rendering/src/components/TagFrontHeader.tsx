import { css, jsx } from '@emotion/react';
import {
	breakpoints,
	from,
	headline,
	neutral,
	palette,
	space,
	until,
} from '@guardian/source-foundations';
import { Fragment, type ReactNode } from 'react';
import { decideContainerOverrides } from '../lib/decideContainerOverrides';
import { isElement, parseHtml } from '../lib/domUtils';
import { logger } from '../server/lib/logging';
import type { DCRContainerPalette } from '../types/front';
import { generateSources, Sources } from './Picture';

type Props = {
	title: string;
	description?: string;
	image?: string;
	containerPalette?: DCRContainerPalette;
};

const width = (columns: number, columnWidth: number, columnGap: number) =>
	`width: ${columns * columnWidth + (columns - 1) * columnGap}px;`;

/** Not all browsers support CSS grid, so we set explicit width as a fallback */
const fallbackStyles = css`
	@supports not (display: grid) {
		padding: 0 12px;
		margin: 0 auto;

		${from.mobileLandscape} {
			padding: 0 20px;
		}

		${from.tablet} {
			${width(12, 40, 20)}
		}

		${from.desktop} {
			${width(12, 60, 20)}
		}

		${from.leftCol} {
			${width(14, 60, 20)}
		}

		${from.wide} {
			${width(16, 60, 20)}
		}
	}
`;

const containerStyles = css`
	display: grid;

	grid-template-rows:
		[headline-start image-start] auto
		[headline-end content-start] auto
		[content-end image-end] auto;

	grid-template-columns:
		[viewport-start] 0px
		[content-start title-start]
		repeat(3, minmax(0, 1fr))
		[content-end title-end image-start]
		minmax(0, 1fr)
		[image-end]
		0px [viewport-end];

	grid-auto-flow: dense;
	column-gap: 10px;

	${from.mobileLandscape} {
		column-gap: 20px;
	}

	${from.tablet} {
		grid-template-columns:
			[viewport-start] minmax(0, 1fr)
			[content-start title-start]
			repeat(6, 40px) [content-end title-end]
			repeat(4, 40px)
			[image-start]
			repeat(2, 40px)
			[image-end]
			minmax(0, 1fr) [viewport-end];
	}

	${from.desktop} {
		grid-template-columns:
			[viewport-start] minmax(0, 1fr)
			[content-start title-start]
			repeat(6, 60px) [content-end]
			repeat(4, 60px)
			[title-end image-start]
			repeat(2, 60px)
			[image-end]
			minmax(0, 1fr) [viewport-end];
	}

	${from.leftCol} {
		grid-template-rows:
			[headline-start content-start image-start] auto
			[headline-end content-end image-end] auto;

		grid-template-columns:
			[viewport-start] minmax(0, 1fr)
			[title-start]
			repeat(2, 60px)
			[title-end content-start]
			repeat(7, 60px) [content-end]
			repeat(3, 60px)
			[image-start]
			repeat(2, 60px)
			[image-end]
			minmax(0, 1fr) [viewport-end];
	}

	${from.wide} {
		grid-template-columns:
			[viewport-start] minmax(0, 1fr)
			[title-start]
			repeat(3, 60px)
			[title-end content-start]
			repeat(8, 60px) [content-end]
			repeat(2, 60px)
			[image-start]
			repeat(2, 60px)
			[image-end]
			repeat(1, 60px)
			minmax(0, 1fr) [viewport-end];
	}
`;

const sectionHeadline = css`
	grid-row: headline;
	grid-column: title;

	display: flex;
	flex-direction: column;
`;

const paddings = css`
	padding-top: ${space[2]}px;
	padding-bottom: ${space[2]}px;
`;

const sectionImage = css`
	grid-row: image;
	grid-column: image;
	justify-self: end;
`;

const sectionContent = css`
	margin: 0;

	grid-column: content;
	grid-row: content;
`;

/** element which contains border and inner background colour, if set */
const decoration = css`
	grid-row: 1 / -1;
	grid-column: 1 / -1;

	${from.tablet} {
		grid-column: 2 / -2;
	}

	border-width: 1px;
	border-color: ${palette.neutral[86]};
	border-style: none;
`;

/** only visible once content stops sticking to left and right edges */
const sideBorders = css`
	${from.tablet} {
		margin: 0 -20px;
		border-left-style: solid;
		border-right-style: solid;
	}
`;

const titleContainerStyle = css`
	${until.leftCol} {
		max-width: 74%;
	}
`;

const paragraphStyle = css`
	${headline.xxxsmall()}
	color: ${palette.neutral[46]};
`;

const titleStyle = css`
	${headline.xxsmall({ fontWeight: 'bold' })};
	color: ${neutral[7]};
	padding-bottom: ${space[1]}px;
	overflow-wrap: break-word; /*if a single word is too long, this will break the word up rather than have the display be affected*/
`;

const buildElementTree = (node: Node): ReactNode => {
	if (isElement(node)) {
		switch (node.nodeName) {
			case 'A':
				return jsx('a', {
					href: node.attributes.getNamedItem('href')?.value,
					target: node.attributes.getNamedItem('target')?.value,
					children: Array.from(node.childNodes).map(buildElementTree),
				});
			case 'BR':
				return jsx('br');
			default:
				return jsx(node.tagName.toLowerCase(), {
					children: Array.from(node.childNodes).map(buildElementTree),
				});
		}
	} else if (node.nodeType === node.TEXT_NODE) {
		return node.textContent;
	} else {
		logger.warn('TagFrontHeader: Unknown element received', {
			isDev: process.env.NODE_ENV !== 'production',
			element: {
				name: node.nodeName,
				html: isElement(node) ? node.outerHTML : undefined,
			},
		});
		return null;
	}
};

const imageStyle = css`
	width: 80px;
	border-radius: 40px;

	${from.desktop} {
		width: 100px;
		border-radius: 50px;
	}
`;

const Picture = ({ image }: { image: string }) => {
	const sources = generateSources(image, [
		{ breakpoint: breakpoints.mobile, width: 80 },
		{ breakpoint: breakpoints.desktop, width: 100 },
	]);

	const fallback = sources[0]?.lowResUrl;

	if (!fallback) throw new Error('Missing source');

	return (
		<picture>
			<Sources sources={sources} />
			<img alt="" src={fallback} css={imageStyle} />
		</picture>
	);
};

export const TagFrontHeader = ({
	title,
	containerPalette,
	description,
	image,
}: Props) => {
	const overrides =
		containerPalette && decideContainerOverrides(containerPalette);

	const descriptionFragment = description
		? parseHtml(description)
		: undefined;

	return (
		<section
			css={[
				fallbackStyles,
				containerStyles,
				css`
					background-color: ${overrides?.background.container};
				`,
			]}
		>
			<div css={[decoration, sideBorders]} />

			<div css={[sectionHeadline, titleContainerStyle, paddings]}>
				<h2 css={titleStyle}>{title}</h2>
			</div>

			{image !== undefined && (
				<div css={[sectionImage, paddings]}>
					<Picture image={image} />
				</div>
			)}

			{descriptionFragment ? (
				<div css={[sectionContent, paddings, paragraphStyle]}>
					{jsx(Fragment, {
						children: Array.from(
							descriptionFragment.childNodes,
						).map(buildElementTree),
					})}
				</div>
			) : null}
		</section>
	);
};
