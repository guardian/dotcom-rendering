import { css } from '@emotion/react';
import {
	type Breakpoint,
	breakpoints,
	from,
	headlineBold24Object,
	headlineBold42Object,
	palette,
	textSans14Object,
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
	titleIconImage: string;
	title: { label: string; id: string };
	links: { label: string; id: string }[];
	backgroundImages?: {
		mobile: string;
		mobileLandscape: string;
		phablet: string;
		tablet: string;
		desktop: string;
		wide: string;
	};
}

const configs = [
	// World Cup 2026
	{
		pageIds: [
			'football/world-cup-2026',
			'football/world-cup-2026/fixtures',
			'football/world-cup-2026/overview',
		],
		tagIds: ['football/world-cup-2026'],
		textColor: palette.neutral[100],
		backgroundColor: palette.brand[400],
		title: {
			label: 'World Cup',
			id: 'football/world-cup-2026',
		},
		titleIconImage:
			'data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2246%22%20viewBox%3D%220%200%2040%2046%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Crect%20width%3D%2212.3697%22%20height%3D%2232.4706%22%20fill%3D%22%23D71921%22/%3E%3Crect%20x%3D%2213.5294%22%20y%3D%2213.5295%22%20width%3D%2212.3697%22%20height%3D%2232.4706%22%20fill%3D%22white%22/%3E%3Crect%20x%3D%2227.059%22%20width%3D%2212.3697%22%20height%3D%2232.4706%22%20fill%3D%22%23007E46%22/%3E%3Ccircle%20cx%3D%2219.7142%22%20cy%3D%226.18487%22%20r%3D%226.18487%22%20fill%3D%22white%22/%3E%3C/svg%3E',
		links: [
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
		backgroundImages: {
			mobile: 'https://media.guim.co.uk/4ba0caac6d18c1fe6a5a3267b270d8c21ae6f940/0_0_750_376/750.jpg',
			mobileLandscape:
				'https://media.guim.co.uk/4ba0caac6d18c1fe6a5a3267b270d8c21ae6f940/0_0_750_376/750.jpg',
			phablet:
				'https://media.guim.co.uk/4ba0caac6d18c1fe6a5a3267b270d8c21ae6f940/0_0_750_376/750.jpg',
			tablet: 'https://media.guim.co.uk/861646115875f3f246313036f754b2f5f1480b1a/0_0_1480_276/1480.jpg',
			desktop:
				'https://media.guim.co.uk/167bec4a208bfc7fdc6b2127186b9bb183932259/0_0_1960_276/1960.jpg',
			wide: 'https://media.guim.co.uk/4e44f9a88fcc9a3b1b5294f7e581644baa75c904/0_0_2600_276/2600.jpg',
		},
	},
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
		titleIconImage: '',
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
			wide: 'https://uploads.guim.co.uk/2026/02/03/winter-olympics-980px.jpg',
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
		titleIconImage: '',
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
			wide: 'https://uploads.guim.co.uk/2026/03/03/winter-paralympics-980px.jpg',
		},
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
		position: 'relative',
	});

	const largeLinkStyles = css({
		position: 'absolute',
		top: '4px',
		left: 0,
		...headlineBold24Object,
		color: textColor,
		textDecoration: 'none',
		'&': css(grid.column.centre),
		gridRow: 1,
		display: 'flex',
		alignItems: 'flex-start',
		[from.tablet]: headlineBold42Object,
		[from.leftCol]: css(
			grid.between('left-column-start', 'right-column-end'),
		),
	});

	const list = css({
		display: 'flex',
		'&': css(grid.column.all),
		alignSelf: 'end',
		position: 'relative',
		'--top-border-gap': '1.55rem',
		overflowX: 'scroll',
		scrollbarWidth: 'none',
		padding: '10px 10px',
		borderTop: '1px solid',
		borderColor: palette.brand[600],
		height: '100%',
		[from.mobileLandscape]: {
			padding: '10px 20px',
		},
		[from.tablet]: {
			'--top-border-gap': '3rem',
		},
		'&:after': {
			content: '""',
			position: 'sticky',
			right: '-10px',
			top: '-10px',
			height: '100%',
			minWidth: 40,
			background: `linear-gradient(to left, ${backgroundColor}, transparent)`,
			[from.mobileLandscape]: {
				right: '-20px',
			},
		},
	});

	const selectedStyles = {
		fontWeight: 'bold',
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
		[from.desktop]: {
			'&:hover a': {
				textDecoration: 'underline',
				color: 'var(--masthead-nav-link-text-hover)',
			},
		},
		[from.leftCol]: {
			flexBasis: 160,
		},
	});

	const smallLink = css({
		...textSans14Object,
		padding: '4px 12px 6px 0',
		display: 'block',
		lineHeight: 1,
		color: textColor,
		textDecoration: 'none',
		whiteSpace: 'nowrap',
		[from.leftCol]: {
			padding: '9px 10px 10px',
		},
	});

	return (
		<nav css={[nav, heightStyles]}>
			<a href={`/${config.title.id}`} css={largeLinkStyles}>
				<TitleIconImage src={config.titleIconImage} />
				{config.title.label}
			</a>
			<BackgroundImage images={config.backgroundImages} />

			<ul css={list}>
				{config.links.map((link, i) => (
					<li
						key={link.label}
						css={listItem}
						style={pageId === link.id ? selectedStyles : {}}
					>
						<a href={`/${link.id}`} css={smallLink}>
							{link.label}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
};

const heightStyles = css({
	height: '',
	[from.tablet]: {
		height: '',
	},
	[from.desktop]: {
		height: '',
	},
});

const TitleIconImage = (props: { src: string }) => {
	if (!props.src) {
		return null;
	}

	return (
		<img
			src={props.src}
			alt=""
			css={{
				height: 40,
				width: 'auto',
				marginRight: 8,
				objectFit: 'cover',
			}}
		/>
	);
};

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
			return 'desktop';
		case 'wide':
			return 'wide';
	}
};

type Images = Exclude<DirectoryPageNavConfig['backgroundImages'], undefined>;
type ImageSize = keyof Images;
