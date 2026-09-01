/**
 * @file
 * This file was largely copied from https://github.com/guardian/dotcom-rendering/blob/016de51dc294d3a2895b52091258de0adbadcef5/dotcom-rendering/src/components/SubNav.importable.tsx
 */
import { css } from '@emotion/react';
import {
	breakpoints,
	from,
	headlineBold28,
	space,
	textSans14,
	textSansBold14,
} from '@guardian/source/foundations';
import { grid } from '../../../grid';
import { nestedOphanComponents } from '../../../lib/ophan-helpers';
import { palette as themePalette } from '../../../palette';
import type { CustomSubnav, RenderingPage } from '../../../types/customSubnav';

type Props = {
	customSubNav: CustomSubnav;
	currentNavLink: string;
	renderingPage: RenderingPage;
	hasPageSkin?: boolean;
};

const subNavStyles = css`
	${textSans14}
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
	min-height: 36px;

	${from.mobileMedium} {
		min-height: 40px;
	}
	${from.tablet} {
		min-height: 42px;
	}
	${from.leftCol} {
		min-height: 44px;
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

const articleHeaderStyles = css`
	${textSansBold14}
	color: ${themePalette('--custom-subnav-header-text')};
	display: flex;
	align-items: center;
	white-space: nowrap;
	padding-right: ${space[2]}px;
	margin-right: ${space[2]}px;
	border-right: 1px solid ${themePalette('--masthead-nav-lines')};
`;

/** Served from `src/static`; temporary test assets until real images arrive in the payload. */
const headerImageBasePath = '/static/frontend/customsubnav';

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
	height: auto;
`;

const imageHeaderTextStyles = css`
	${headlineBold28}
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
	${textSans14}
	display: flex;
	align-items: center;
	column-gap: ${space[2]}px;
	min-height: 28px;
	padding: 0 ${space[3]}px;

	${from.mobileLandscape} {
		padding: 0 ${space[5]}px;
	}
	${from.tablet} {
		min-height: 30px;
	}
`;

/** Temporary breakpoint-specific header images; swap for payload images later. */
const HeaderImage = () => (
	<picture>
		<source
			media={`(min-width: ${breakpoints.wide}px)`}
			srcSet={`${headerImageBasePath}/wc-wide.png`}
		/>
		<source
			media={`(min-width: ${breakpoints.desktop}px)`}
			srcSet={`${headerImageBasePath}/wc-desktop.png`}
		/>
		<source
			media={`(min-width: ${breakpoints.tablet}px)`}
			srcSet={`${headerImageBasePath}/wc-tablet.png`}
		/>
		<img
			src={`${headerImageBasePath}/wc-mobile.png`}
			alt=""
			css={headerImageStyles}
		/>
	</picture>
);

/** Sets horizontal scrolling behaviour and removes the scrollbar */
const scrollableSubNavStyles = css`
	overflow-x: scroll;

	@supports selector(::-webkit-scrollbar) {
		&::-webkit-scrollbar {
			display: none;
		}
	}
	scrollbar-width: none; /* Firefox */
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

/**
 * Renders a custom subnav (header + links, images and further data to follow) assigned to fronts or articles.
 */
export const CustomSubNav = ({
	customSubNav,
	currentNavLink,
	renderingPage,
	hasPageSkin,
}: Props) => {
	const isArticle = renderingPage === 'article';
	const hasHeaderImage = !isArticle && (customSubNav.images?.length ?? 0) > 0;

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
				{linkText === currentNavLink ? (
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
				data-component={`custom-subnav-${customSubNav.header.headerText}`}
				data-component-id={customSubNav.id}
				data-rendering-page={renderingPage}
				css={imageNavStyles}
			>
				<div css={imageWrapperStyles}>
					<HeaderImage />
					<span css={imageHeaderTextStyles}>
						{customSubNav.header.headerText}
					</span>
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

	return (
		<div
			data-component={`custom-subnav-${customSubNav.header.headerText}`}
			data-component-id={customSubNav.id}
			data-rendering-page={renderingPage}
			css={
				isArticle
					? articleContainerStyles
					: [
							headlineBold28,
							css`
								margin-top: ${space[2]}px;
								color: ${themePalette(
									'--masthead-nav-link-text',
								)};
							`,
						]
			}
		>
			{isArticle ? (
				<span css={articleHeaderStyles}>
					{customSubNav.header.headerText}
				</span>
			) : (
				customSubNav.header.headerText
			)}
			<ul
				css={[
					subNavStyles,
					!hasPageSkin && subNavStylesFromLeftCol,
					scrollableSubNavStyles,
					isArticle && articleSubNavStyles,
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
