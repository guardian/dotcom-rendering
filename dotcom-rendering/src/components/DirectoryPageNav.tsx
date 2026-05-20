import { css } from '@emotion/react';
import {
	type Breakpoint,
	breakpoints,
	from,
	headlineBold15Object,
	headlineBold17Object,
	headlineBold24Object,
	headlineBold42Object,
	headlineMedium15Object,
	headlineMedium17Object,
	palette,
	space,
	textSans14Object,
	textSansBold14Object,
} from '@guardian/source/foundations';
import { grid } from '../grid';
import { generateImageURL } from '../lib/image';
import { palette as themePalette } from '../palette';
import type { TagType } from '../types/tag';

type Props = {
	pageId: string;
	pageTags?: TagType[];
};

interface DirectoryPageNavConfig {
	pageIds: string[];
	tagIds: string[];
	variant?: 'subnav';
	subLinkBadge?: string;
	textColor: string;
	backgroundColor: string;
	title: { label: string; id: string };
	links: { label: string; id: string }[];
	backgroundImages?: {
		mobile: string;
		mobileLandscape: string;
		phablet: string;
		tablet: string;
		desktop: string;
	};
}

const configs = [
	// Winter Olympics 2026
	{
		pageIds: [
			'sport/winter-olympics-2026',
			'sport/ng-interactive/2026/feb/04/winter-olympics-full-schedule-milano-cortina-2026',
			'sport/ng-interactive/2026/feb/04/winter-olympics-results-milano-cortina-2026',
			'sport/ng-interactive/2026/feb/04/winter-olympics-2026-latest-medal-table-milano-cortina',
		],
		tagIds: [],
		textColor: palette.neutral[7],
		backgroundColor: '#22B24B',
		title: {
			label: 'Winter Olympics 2026',
			id: 'sport/winter-olympics-2026',
		},
		links: [
			{
				label: 'Schedule',
				id: 'sport/ng-interactive/2026/feb/04/winter-olympics-full-schedule-milano-cortina-2026',
			},
			{
				label: 'Results',
				id: 'sport/ng-interactive/2026/feb/04/winter-olympics-results-milano-cortina-2026',
			},
			{
				label: 'Medal table',
				id: 'sport/ng-interactive/2026/feb/04/winter-olympics-2026-latest-medal-table-milano-cortina',
			},
			{
				label: 'Full coverage',
				id: 'sport/winter-olympics-2026',
			},
		],
		backgroundImages: {
			mobile: 'https://uploads.guim.co.uk/2026/02/03/winter-olympics-414px.jpg',
			mobileLandscape:
				'https://uploads.guim.co.uk/2026/02/03/winter-olympics-480px.jpg',
			phablet:
				'https://uploads.guim.co.uk/2026/02/03/winter-olympics-740_px.jpg',
			tablet: 'https://uploads.guim.co.uk/2026/02/03/winter-olympics-740px-thin.jpg',
			desktop:
				'https://uploads.guim.co.uk/2026/02/03/winter-olympics-980px.jpg',
		},
	},
	// Winter Paralympics 2026
	{
		pageIds: [
			'sport/winter-paralympics-2026',
			'sport/ng-interactive/2026/mar/05/winter-paralympics-results-from-milano-cortina-2026',
			'sport/ng-interactive/2026/mar/05/winter-paralympics-2026-latest-medal-table-for-milano-cortina',
		],
		tagIds: [],
		textColor: palette.neutral[7],
		backgroundColor: '#22B24B',
		title: {
			label: 'Winter Paralympics 2026',
			id: 'sport/winter-paralympics-2026',
		},
		links: [
			{
				label: 'Results',
				id: 'sport/ng-interactive/2026/mar/05/winter-paralympics-results-from-milano-cortina-2026',
			},
			{
				label: 'Medal table',
				id: 'sport/ng-interactive/2026/mar/05/winter-paralympics-2026-latest-medal-table-for-milano-cortina',
			},
			{
				label: 'Full coverage',
				id: 'sport/winter-paralympics-2026',
			},
		],
		backgroundImages: {
			mobile: 'https://uploads.guim.co.uk/2026/03/03/winter-paralympics-414px.jpg',
			mobileLandscape:
				'https://uploads.guim.co.uk/2026/03/03/winter-paralympics-480px.jpg',
			phablet:
				'https://uploads.guim.co.uk/2026/03/03/winter-paralympics-740px.jpg',
			tablet: 'https://uploads.guim.co.uk/2026/03/03/winter-paralympics-740px-thin.jpg',
			desktop:
				'https://uploads.guim.co.uk/2026/03/03/winter-paralympics-980px.jpg',
		},
	},
	// World Cup 2026
	{
		pageIds: [] as string[],
		tagIds: ['football/world-cup-2026'],
		variant: 'subnav',
		textColor: palette.neutral[7],
		backgroundColor: palette.brand[400],
		title: {
			label: 'World Cup 2026',
			id: 'football/world-cup-2026',
		},
		subLinkBadge:
			'data:image/svg+xml,%3Csvg%20width%3D%2216%22%20height%3D%2217%22%20viewBox%3D%220%200%2016%2017%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Crect%20width%3D%224.39184%22%20height%3D%2211.5286%22%20fill%3D%22%2390DCFF%22/%3E%3Crect%20x%3D%225.80347%22%20y%3D%225%22%20width%3D%224.39184%22%20height%3D%2211.5286%22%20fill%3D%22%2390DCFF%22/%3E%3Crect%20x%3D%2211.6084%22%20width%3D%224.39184%22%20height%3D%2211.5286%22%20fill%3D%22%2390DCFF%22/%3E%3Ccircle%20cx%3D%227.99939%22%20cy%3D%222.19592%22%20r%3D%222.19592%22%20fill%3D%22%2390DCFF%22/%3E%3C/svg%3E',
		links: [
			{
				label: 'World Cup',
				id: 'football/world-cup-2026',
			},
			{
				label: 'Match centre',
				id: 'football/world-cup-2026/overview',
			},
			{
				label: 'Player guide',
				id: '',
			},
			{
				label: 'Bracketology',
				id: '',
			},
			{
				label: 'Golden boot',
				id: '',
			},
			{
				label: 'More football',
				id: 'football',
			},
		],
	},
] satisfies DirectoryPageNavConfig[];

/**
 * Mirrors the centering of the Masthead Titlepiece's content area at each
 * breakpoint (matching Section/ElementContainer's margin-auto + max-width
 * pattern), with side padding matching ElementContainer's sidePadding.
 */
const subnavInnerStyles = css({
	position: 'relative',
	margin: 'auto',
	paddingLeft: 10,
	paddingRight: 10,
	[from.mobileLandscape]: {
		paddingLeft: 20,
		paddingRight: 20,
	},
	[from.tablet]: {
		maxWidth: 740,
	},
	[from.desktop]: {
		maxWidth: 980,
	},
	[from.leftCol]: {
		maxWidth: 1140,
	},
	[from.wide]: {
		maxWidth: 1300,
	},
});

export const DirectoryPageNav = ({ pageId, pageTags }: Props) => {
	const config = configs.find(
		(cfg) =>
			cfg.pageIds.includes(pageId) ||
			cfg.tagIds.some(
				(tagId) => pageTags?.some((tag) => tag.id === tagId),
			),
	);

	if (!config) {
		return null;
	}

	if (config.variant === 'subnav') {
		const subnavWrapperStyles = css({
			backgroundColor: config.backgroundColor,
			// paddingBottom: space[1],
		});

		const subnavListStyles = css({
			...textSans14Object,
			display: 'flex',
			alignItems: 'center',
			columnGap: space[2],
			minHeight: 28,
			width: '100%',
			[from.tablet]: {
				minHeight: 30,
			},
			overflowX: 'scroll',
			scrollbarWidth: 'none',
			'&::-webkit-scrollbar': {
				display: 'none',
			},
			listStyle: 'none',
			padding: 0,
		});

		const subnavListItemStyles = css({
			whiteSpace: 'nowrap',
			display: 'flex',
			alignItems: 'center',
			'&:first-of-type': {
				borderRight: `1px solid ${themePalette(
					'--masthead-nav-lines',
				)}`,
				paddingRight: space[1],
				'a:not(:hover)': {
					color: palette.sport[600],
				},
			},
		});

		const subnavLinkStyles = css({
			color: themePalette('--masthead-nav-link-text'),
			textDecoration: 'none',
			display: 'inline-flex',
			alignItems: 'center',
			columnGap: space[1],
			paddingRight: space[1],
			'&:hover': {
				textDecoration: 'underline',
				color: themePalette('--masthead-nav-link-text-hover'),
			},
		});

		const subLinkBadgeStyles = css({
			width: 16,
			height: 17,
			flexShrink: 0,
		});

		const subnavSelectedLinkStyles = css({
			...textSansBold14Object,
		});

		const subnavInnerWithBorderStyles = css(subnavInnerStyles, {
			paddingTop: space[2],
			paddingBottom: space[2],
			[from.tablet]: {
				'&::before': {
					content: '""',
					borderLeft: `1px solid ${themePalette(
						'--masthead-nav-lines',
					)}`,
					position: 'absolute',
					left: 0,
					top: 0,
					bottom: 0,
				},
				'&::after': {
					content: '""',
					borderRight: `1px solid ${themePalette(
						'--masthead-nav-lines',
					)}`,
					position: 'absolute',
					right: 0,
					top: 0,
					bottom: 0,
				},
			},
		});

		return (
			<nav css={subnavWrapperStyles}>
				<div css={subnavInnerWithBorderStyles}>
					{/* eslint-disable jsx-a11y/no-redundant-roles -- A11y fix for Safari */}
					<ul css={subnavListStyles} role="list">
						{/* eslint-enable jsx-a11y/no-redundant-roles */}
						{config.links.map((link) => (
							<li key={link.label} css={subnavListItemStyles}>
								<a
									href={`/${link.id}`}
									css={[
										subnavLinkStyles,
										pageId === link.id
											? subnavSelectedLinkStyles
											: undefined,
									]}
								>
									{config.subLinkBadge &&
									link.label === 'World Cup' ? (
										<img
											src={config.subLinkBadge}
											alt=""
											aria-hidden="true"
											css={subLinkBadgeStyles}
										/>
									) : null}
									{link.label}
								</a>
							</li>
						))}
					</ul>
				</div>
			</nav>
		);
	}

	const { textColor, backgroundColor } = config;

	const nav = css({
		backgroundColor,
		'&': css(grid.paddedContainer),
		alignContent: 'space-between',
	});

	const largeLinkStyles = css({
		...headlineBold24Object,
		color: textColor,
		textDecoration: 'none',
		'&': css(grid.column.centre),
		gridRow: 1,
		[from.tablet]: headlineBold42Object,
		[from.leftCol]: css(
			grid.between('left-column-start', 'right-column-end'),
		),
	});

	const list = css({
		display: 'flex',
		flexWrap: 'wrap',
		'&': css(grid.column.all),
		gridRow: 2,
		alignSelf: 'end',
		position: 'relative',
		'--top-border-gap': '1.55rem',
		[from.mobileLandscape]: {
			paddingLeft: 10,
		},
		[from.tablet]: {
			'--top-border-gap': '3rem',
		},
		backgroundImage: `
			linear-gradient(
				${textColor} 0,
				${textColor} 1px,
				transparent 1px,
				transparent var(--top-border-gap),
				${textColor} var(--top-border-gap),
				${textColor} calc(var(--top-border-gap) + 1px),
				transparent 1px,
				transparent var(--top-border-gap)
			)
		`,
	});

	const selectedStyles = {
		'--selected-height': '4px',
		'--selected-opacity': '1',
	};

	const listItem = css({
		position: 'relative',
		'&::before': {
			content: '""',
			display: 'block',
			position: 'absolute',
			left: 0,
			top: 0,
			width: '100%',
			height: 'var(--selected-height, 0)',
			opacity: 'var(--selected-opacity, 0)',
			backgroundColor: textColor,
			transition: 'height 0.3s ease-in-out, opacity 0.05s 0.1s linear',
		},
		'&:hover': selectedStyles,
		[from.leftCol]: {
			flexBasis: 160,
		},
	});

	const smallLink = css({
		...headlineBold15Object,
		padding: '4px 10px 6px',
		display: 'block',
		lineHeight: 1,
		color: textColor,
		textDecoration: 'none',
		'&::after': {
			content: '""',
			display: 'block',
			position: 'absolute',
			top: 0,
			right: 0,
			width: 1,
			height: '1.3rem',
			backgroundColor: textColor,
		},
		[from.tablet]: headlineBold17Object,
		[from.leftCol]: {
			padding: '9px 10px 10px',
		},
	});

	const lastSmallLink = css(smallLink, {
		...headlineMedium15Object,
		lineHeight: 1,
		[from.tablet]: headlineMedium17Object,
	});

	return (
		<nav css={[nav, heightStyles]}>
			<BackgroundImage images={config.backgroundImages} />
			<a href={`/${config.title.id}`} css={largeLinkStyles}>
				{config.title.label}
			</a>
			<ul css={list}>
				{config.links.map((link, i) => (
					<li
						key={link.label}
						css={listItem}
						style={pageId === link.id ? selectedStyles : {}}
					>
						<a
							href={`/${link.id}`}
							css={
								i === config.links.length - 1
									? lastSmallLink
									: smallLink
							}
						>
							{link.label}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
};

const heightStyles = css({
	height: 116,
	[from.tablet]: {
		height: 140,
	},
	[from.desktop]: {
		height: 150,
	},
});

const BackgroundImage = (props: {
	images: DirectoryPageNavConfig['backgroundImages'];
}) => {
	if (props.images === undefined) {
		return null;
	}

	return (
		<picture
			css={[
				{
					'&': css(grid.column.all),
					gridRow: '1/3',
				},
				heightStyles,
			]}
		>
			<Source images={props.images} breakpoint="wide" />
			<Source images={props.images} breakpoint="leftCol" />
			<Source images={props.images} breakpoint="desktop" />
			<Source images={props.images} breakpoint="tablet" />
			<Source images={props.images} breakpoint="phablet" />
			<Source images={props.images} breakpoint="mobileLandscape" />
			<Source images={props.images} breakpoint="mobileMedium" />
			<Source images={props.images} breakpoint="mobile" />
			<img
				src={generateImageURL({
					mainImage: props.images.mobile,
					imageWidth: breakpoints.mobileMedium,
					resolution: 'low',
				})}
				alt="Winter Olympics background graphic"
				css={{
					width: '100%',
					height: '100%',
					objectFit: 'cover',
					objectPosition: 'top',
				}}
			/>
		</picture>
	);
};

const Source = (props: { images: Images; breakpoint: Breakpoint }) => (
	<source
		media={`(min-width: ${breakpoints[props.breakpoint]}px)`}
		srcSet={`${generateImageURL({
			mainImage: props.images[breakpointToImageSize(props.breakpoint)],
			imageWidth: breakpoints[props.breakpoint],
			resolution: 'low',
		})}, ${generateImageURL({
			mainImage: props.images[breakpointToImageSize(props.breakpoint)],
			imageWidth: breakpoints[props.breakpoint],
			resolution: 'high',
		})} 2x`}
	/>
);

/**
 * We don't have an image for every breakpoint, so this picks an appropriate
 * image size in each case.
 */
const breakpointToImageSize = (breakpoint: Breakpoint): ImageSize => {
	switch (breakpoint) {
		case 'mobile':
		case 'mobileMedium':
			return 'mobile';
		case 'mobileLandscape':
			return 'mobileLandscape';
		case 'phablet':
			return 'phablet';
		case 'tablet':
			return 'tablet';
		case 'desktop':
		case 'leftCol':
		case 'wide':
			return 'desktop';
	}
};

type Images = Exclude<DirectoryPageNavConfig['backgroundImages'], undefined>;
type ImageSize = keyof Images;
