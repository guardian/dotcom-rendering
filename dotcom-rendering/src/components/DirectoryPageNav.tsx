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
} from '@guardian/source/foundations';
import { grid } from '../grid';
import { generateImageURL } from '../lib/image';
import type { TagType } from '../types/tag';

type Props = {
	pageId: string;
	pageTags?: TagType[];
};

interface DirectoryPageNavConfig {
	pageIds: string[];
	tagIds: string[];
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
			'global/ng-interactive/2026/feb/27/2026-winter-paralympics-results',
			'global/ng-interactive/2026/feb/27/2026-winter-paralympics-medal-table',
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
				id: 'global/ng-interactive/2026/feb/27/2026-winter-paralympics-results',
			},
			{
				label: 'Medal table',
				id: 'global/ng-interactive/2026/feb/27/2026-winter-paralympics-medal-table',
			},
			{
				label: 'Full coverage',
				id: 'sport/winter-paralympics-2026',
			},
		],
	},
] satisfies DirectoryPageNavConfig[];

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
