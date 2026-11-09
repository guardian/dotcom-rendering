/**
 * @file
 * This file was largely copied from https://github.com/guardian/dotcom-rendering/blob/016de51dc294d3a2895b52091258de0adbadcef5/dotcom-rendering/src/components/SubNav.importable.tsx
 */
import { css, type SerializedStyles } from '@emotion/react';
import {
	breakpoints,
	from,
	headlineBold28,
	space,
	textSans14,
	textSansBold14,
} from '@guardian/source/foundations';
import { useEffect, useRef } from 'react';
import { submitComponentEvent } from '../../../client/ophan/ophan';
import { grid } from '../../../grid';
import { isNetworkFront as isANetworkFront } from '../../../lib/edition';
import { generateImageURL } from '../../../lib/image';
import { nestedOphanComponents } from '../../../lib/ophan-helpers';
import { useIsInView } from '../../../lib/useIsInView';
import { palette as themePalette } from '../../../palette';
import type {
	CustomSubnav,
	CustomSubnavHeader,
	CustomSubnavImage,
	RenderingPage,
} from '../../../types/customSubnav';
import { useConfig } from '../../ConfigContext';

type Props = {
	customSubNav: CustomSubnav;
	renderingPage: RenderingPage;
	pageId?: string;
	hasPageSkin?: boolean;
	underlineHeader?: boolean;
	isCard?: boolean;
	canonicalUrl?: string;
};

const subNavStyles = css`
	${textSans14};
	display: flex;
	column-gap: ${space[2]}px;
	color: inherit;
	min-height: 28px;
	width: 100%;
	margin-top: ${space[2]}px;

	${from.mobileMedium} {
		margin-top: ${space[3]}px;
	}

	${from.tablet} {
		min-height: 30px;
	}
`;

const subNavStylesFromLeftCol = css`
	${from.leftCol} {
		margin-top: 14px;
	}
`;

/** On articles the header and links sit on a single aligned row. */
const articleContainerStyles = css`
	display: flex;
	align-items: stretch;
	/* Keep this container at the reduced list height instead of the shared
	 * article min-height, otherwise the outer row remains taller than the
	 * inline list itself.
	 */
	min-height: 0;

	${from.mobileMedium} {
		min-height: 0;
	}

	${from.tablet} {
		min-height: 0;
	}

	${from.leftCol} {
		min-height: 0;
	}
`;

/**
 * On articles the links row sits inline next to the header. The stacked top margins are
 * removed so the header divider spans the full component height set by the container.
 */
const articleSubNavStyles = css`
	margin-top: 0;
	align-items: center;

	${from.mobileMedium} {
		margin-top: 0;
	}

	${from.leftCol} {
		margin-top: 0;
	}
`;

/** Article subnavs keep a small horizontal gap between the header and the list items. */
const articleHeaderGapStyles = css`
	margin-left: ${space[1]}px;
	padding-left: ${space[1]}px;
`;

/** Article subnavs have a divider separating the header text from the scrollable list. */
const articleDividerStyles = css`
	${articleHeaderGapStyles}
	border-left: 1px solid ${themePalette('--masthead-nav-lines')};
`;

const articleHeaderStyles = css`
	${textSansBold14};
	color: ${themePalette('--custom-subnav-header-text')};
	display: flex;
	align-items: center;
	white-space: nowrap;
	/** Adding top padding to align with the subnav links
	 * due to the different default layout models unordered lists and anchor tags use
	 * even if they have the same min-height.
	 * The 1.1px is selected based on the alignment visually with the subnav links.
	 */
	padding-top: 1.1px;
	padding-right: 0;
	margin-right: 0;
`;

const headerTextWrapperStyles = css`
	display: flex;
	align-items: center;
	flex-shrink: 0;
`;

/** On fronts the header sits above the links as a large stacked heading. */
const frontContainerStyles = css`
	${headlineBold28};
	margin-top: ${space[2]}px;
	color: ${themePalette('--masthead-nav-link-text')};
`;

/**
 * On fronts, when an image is present the subnav mirrors DirectoryPageNav: a
 * fixed-width, centred grid (blue) with the image spanning the full width on the
 * top row and the links beneath it. The surrounding row is white (set by the
 * Titlepiece wrapper), so only this padded container shows blue.
 */
const imageNavStyles = css`
	${grid.paddedContainer}
	position: relative;
	background-color: ${themePalette('--masthead-nav-background')};
`;

const imageWrapperStyles = css`
	${grid.column.all}
	grid-row: 1;
	position: relative;
	display: block;
	border-bottom: 1px solid ${themePalette('--masthead-nav-lines')};
`;

const headerImageStyles = css`
	display: block;
	width: 100%;
	height: 210px;
	object-fit: cover;

	${from.tablet} {
		height: 140px;
	}
`;

const imageHeaderTextStyles = css`
	${headlineBold28};
	position: absolute;
	left: ${space[3]}px;
	bottom: ${space[1]}px;
	color: ${themePalette('--masthead-nav-link-text')};

	${from.mobileLandscape} {
		left: ${space[5]}px;
	}
`;

const imageListStyles = css`
	${grid.column.all}
	grid-row: 2;
	${textSans14};
	display: flex;
	align-items: center;
	column-gap: ${space[2]}px;
	min-height: 39px;
	padding: 0 ${space[3]}px;

	${from.mobileLandscape} {
		padding: 0 ${space[5]}px;
	}

	${from.tablet} {
		min-height: 44px;
	}
`;

/** Largest breakpoints first so the <source> media queries cascade correctly. */
const byBreakpointWidthDesc = (a: CustomSubnavImage, b: CustomSubnavImage) =>
	breakpoints[b.breakpoint] - breakpoints[a.breakpoint];

/**
 * Builds a `1x, 2x` srcSet via the Fastly Image Optimiser so each breakpoint's
 * image is served at the right width and pixel density (mirrors DirectoryPageNav).
 */
const buildSrcSet = ({ imageSrc, breakpoint }: CustomSubnavImage) =>
	`${generateImageURL({
		mainImage: imageSrc,
		imageWidth: breakpoints[breakpoint],
		resolution: 'low',
	})}, ${generateImageURL({
		mainImage: imageSrc,
		imageWidth: breakpoints[breakpoint],
		resolution: 'high',
	})} 2x`;

const HeaderImage = ({
	images,
	headerText,
}: {
	images: CustomSubnavImage[];
	headerText: string;
}) => {
	const sorted = [...images].sort(byBreakpointWidthDesc);
	/** Smallest breakpoint is the <img> fallback; the rest become <source>s. */
	const fallback = sorted.at(-1);
	if (!fallback) {
		return null;
	}
	return (
		<picture>
			{sorted.slice(0, -1).map((image) => (
				<source
					key={image.breakpoint}
					media={`(min-width: ${breakpoints[image.breakpoint]}px)`}
					srcSet={buildSrcSet(image)}
				/>
			))}
			<img
				src={generateImageURL({
					mainImage: fallback.imageSrc,
					imageWidth: breakpoints[fallback.breakpoint],
					resolution: 'low',
				})}
				srcSet={buildSrcSet(fallback)}
				alt={`${headerText} subnav`}
				css={headerImageStyles}
			/>
		</picture>
	);
};

/** Sets horizontal scrolling behaviour and removes the scrollbar */
const scrollableSubNavStyles = css`
	display: flex;
	flex-wrap: nowrap;
	overflow-x: auto;
	-webkit-mask-image: linear-gradient(
		to right,
		black calc(100% - 40px),
		transparent
	);
	mask-image: linear-gradient(to right, black calc(100% - 40px), transparent);

	@supports selector(::-webkit-scrollbar) {
		&::-webkit-scrollbar {
			display: none;
		}
	}
	scrollbar-width: none; /* Firefox */

	& > * {
		flex-shrink: 0;
	}
`;

const subnavListItemStyles = css`
	white-space: nowrap;
`;

const subnavLinkStyles = css`
	color: ${themePalette('--masthead-nav-link-text')};
	text-decoration: none;
	padding-right: ${space[1]}px;

	&:hover {
		text-decoration: underline;
		color: ${themePalette('--masthead-nav-link-text-hover')};
	}
`;

const selectedLink = css`
	${textSansBold14}
`;

const headerLinkStyles = css`
	color: inherit;
	text-decoration: none;

	&:hover {
		text-decoration: underline;
	}
`;

const HeaderText = ({
	header: { headerText, dotcomPath },
	cssOverrides,
	underlineHeader,
}: {
	header: CustomSubnavHeader;
	cssOverrides?: SerializedStyles;
	underlineHeader?: boolean;
}) => {
	const link = dotcomPath ? (
		<a
			css={[
				headerLinkStyles,
				cssOverrides,
				underlineHeader &&
					css`
						text-decoration: underline;
					`,
			]}
			data-src-focus-disabled={true}
			href={dotcomPath}
			data-link-name={nestedOphanComponents(
				'header',
				'custom subnav',
				headerText,
			)}
		>
			{headerText}
		</a>
	) : (
		<span css={cssOverrides}>{headerText}</span>
	);

	return <span css={headerTextWrapperStyles}>{link}</span>;
};

const CustomHeader = (
	customSubNav: CustomSubnav,
	cssOverrides: SerializedStyles | undefined,
	underlineHeader?: boolean,
) => {
	return customSubNav.header.showHeaderText ? (
		<HeaderText
			header={customSubNav.header}
			cssOverrides={cssOverrides}
			underlineHeader={underlineHeader}
		/>
	) : undefined;
};

/**
 * Renders a custom subnav (header + links, images and further data to follow) assigned to fronts or articles.
 */
export const CustomSubNav = ({
	customSubNav,
	renderingPage,
	hasPageSkin,
	underlineHeader,
	isCard = false,
	pageId,
	canonicalUrl,
}: Props) => {
	const hasTrackedView = useRef(false);
	const [isInView, setNode] = useIsInView({});
	const { renderingTarget } = useConfig();
	const isNetworkFront = pageId ? isANetworkFront(pageId) : false;
	const isArticle = renderingPage === 'article';

	useEffect(() => {
		if (isInView !== true || hasTrackedView.current) {
			return;
		}

		hasTrackedView.current = true;
		void submitComponentEvent(
			{
				component: {
					componentType: 'CUSTOM_SUBNAV',
					id: customSubNav.header.headerText,
				},
				action: 'VIEW',
				value: customSubNav.id,
			},
			renderingTarget,
		);
	}, [
		isInView,
		renderingTarget,
		customSubNav.header.headerText,
		customSubNav.id,
	]);
	/** DCR receives images for all platforms; only web images are rendered here. */
	const webImages = (customSubNav.images ?? []).filter((image) =>
		image.platforms.includes('web'),
	);
	const hasHeaderImage = !isArticle && webImages.length > 0;

	const linkItems = customSubNav.links.map(({ linkText, dotcomPath }) => (
		<li key={dotcomPath} css={subnavListItemStyles}>
			<a
				css={subnavLinkStyles}
				data-src-focus-disabled={true}
				href={dotcomPath}
				data-link-name={nestedOphanComponents(
					'header',
					'custom subnav',
					linkText,
				)}
			>
				{!isNetworkFront &&
				(dotcomPath === pageId || dotcomPath === canonicalUrl) ? (
					<span css={selectedLink}>{linkText}</span>
				) : (
					linkText
				)}
			</a>
		</li>
	));

	if (hasHeaderImage) {
		return (
			<div
				ref={setNode}
				data-component={`custom-subnav-${customSubNav.header.headerText}`}
				data-component-id={customSubNav.id}
				data-rendering-page={renderingPage}
				css={imageNavStyles}
			>
				<div css={imageWrapperStyles}>
					<HeaderImage
						images={webImages}
						headerText={customSubNav.header.headerText}
					/>
					{CustomHeader(
						customSubNav,
						imageHeaderTextStyles,
						underlineHeader,
					)}
				</div>
				<ul
					css={[imageListStyles, scrollableSubNavStyles]}
					role="list"
					style={{
						'--sub-nav-link': themePalette('--sub-nav-link-header'),
					}}
				>
					{linkItems}
				</ul>
			</div>
		);
	}

	if (isArticle || isCard) {
		const showHeaderDivider = !isCard;
		return (
			<div
				ref={setNode}
				data-component={`custom-subnav-${customSubNav.header.headerText}`}
				data-component-id={customSubNav.id}
				data-rendering-page={renderingPage}
				css={[articleContainerStyles, scrollableSubNavStyles]}
			>
				{CustomHeader(customSubNav, articleHeaderStyles)}
				<ul
					css={[
						subNavStyles,
						!hasPageSkin && subNavStylesFromLeftCol,
						articleSubNavStyles,
						!showHeaderDivider && articleHeaderGapStyles,
						showHeaderDivider
							? articleDividerStyles
							: articleHeaderGapStyles,
						css`
							flex-shrink: 0;
							width: max-content;
						`,
					]}
					role="list"
					style={{
						'--sub-nav-link': themePalette('--sub-nav-link-header'),
					}}
				>
					{linkItems}
				</ul>
			</div>
		);
	}

	return (
		<div
			ref={setNode}
			data-component={`custom-subnav-${customSubNav.header.headerText}`}
			data-component-id={customSubNav.id}
			data-rendering-page={renderingPage}
			css={frontContainerStyles}
		>
			{CustomHeader(customSubNav, undefined)}
			<ul
				css={[
					subNavStyles,
					!hasPageSkin && subNavStylesFromLeftCol,
					scrollableSubNavStyles,
				]}
				role="list"
				style={{
					'--sub-nav-link': themePalette('--sub-nav-link-header'),
				}}
			>
				{linkItems}
			</ul>
		</div>
	);
};
