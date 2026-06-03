import { css } from '@emotion/react';
import {
	type Breakpoint,
	breakpoints,
	from,
	headlineBold24Object,
	headlineBold42Object,
	palette,
	space,
	textSans14Object,
	textSansBold14Object,
} from '@guardian/source/foundations';
import { grid } from '../grid';
import { getInteractionClient } from '../lib/bridgetApi';
import { generateImageURL } from '../lib/image';
import { useAB } from '../lib/useAB';
import { worldCup2026PageIds } from '../lib/worldCup2026';
import {
	WorldCup2026Icon,
	WorldCup2026IconSmall,
} from '../lib/WorldCup2026Icons';
import { palette as themePalette } from '../palette';
import type { RenderingTarget } from '../types/renderingTarget';
import type { TagType } from '../types/tag';
import { useConfig } from './ConfigContext';

type Props = {
	pageId: string;
	pageTags?: TagType[];
};

type PlatformColor =
	| string
	| {
			web: string;
			app: string;
	  };

interface SlimDirectoryPageNavConfig {
	pageIds: string[];
	tagIds: string[];
	textColor: PlatformColor;
	primaryLinkColor: PlatformColor;
	textHoverColor: PlatformColor;
	backgroundColor: PlatformColor;
	borderColor: PlatformColor;
	titleIcon?: React.ReactElement;
	title: { label: string; id: string };
	links: Array<{ label: string; id: string }>;
	slimNav: true;
}

interface FullDirectoryPageNavConfig {
	pageIds: string[];
	tagIds: string[];
	textColor: PlatformColor;
	backgroundColor: PlatformColor;
	titleIcon?: React.ReactElement;
	title: { label: string; id: string };
	links: Array<{ label: string; id: string }>;
	backgroundImages: {
		mobile: string;
		mobileLandscape: string;
		phablet: string;
		tablet: string;
		desktop: string;
		wide: string;
	};
	slimNav?: never;
}

type DirectoryPageNavConfig =
	| SlimDirectoryPageNavConfig
	| FullDirectoryPageNavConfig;

const worldCup2026Links = [
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
		id: 'p/x4z6hj',
	},
	{
		label: 'Golden boot',
		id: '',
	},
	{
		label: 'More football',
		id: 'football',
	},
];

const configs = [
	// World Cup 2026 Fronts
	{
		pageIds: worldCup2026PageIds,
		tagIds: [],
		textColor: palette.neutral[100],
		backgroundColor: palette.brand[400],
		borderColor: themePalette('--masthead-nav-lines'),
		title: {
			label: 'World Cup',
			id: 'football/world-cup-2026',
		},
		titleIcon: <WorldCup2026Icon />,
		links: worldCup2026Links,
		backgroundImages: {
			mobile: 'https://media.guim.co.uk/4ba0caac6d18c1fe6a5a3267b270d8c21ae6f940/0_0_750_376/750.jpg',
			mobileLandscape:
				'https://media.guim.co.uk/8e1356cc926c6bbfcdb3da5908252ba0b4cbd3bb/0_0_960_376/960.jpg',
			phablet:
				'https://media.guim.co.uk/ed4fe540c6a114db35c1f73fc41ee802c3fea7d3/0_0_1320_282/1320.jpg',
			tablet: 'https://media.guim.co.uk/861646115875f3f246313036f754b2f5f1480b1a/0_0_1480_276/1480.jpg',
			desktop:
				'https://media.guim.co.uk/167bec4a208bfc7fdc6b2127186b9bb183932259/0_0_1960_276/1960.jpg',
			wide: 'https://media.guim.co.uk/4e44f9a88fcc9a3b1b5294f7e581644baa75c904/0_0_2600_276/2600.jpg',
		},
	},
	// World Cup 2026 Articles
	{
		pageIds: [] as string[],
		tagIds: ['football/world-cup-2026'],
		textColor: {
			web: themePalette('--masthead-nav-link-text'),
			app: themePalette('--article-text'),
		},
		primaryLinkColor: {
			web: palette.sport[600],
			app: themePalette('--apps-directory-page-nav-primary-link-color'),
		},
		textHoverColor: themePalette('--masthead-nav-link-text-hover'),
		backgroundColor: {
			web: themePalette('--masthead-nav-background'),
			app: themePalette('--article-background'),
		},
		borderColor: {
			web: themePalette('--masthead-nav-lines'),
			app: themePalette('--article-border'),
		},
		title: {
			label: 'World Cup 2026',
			id: 'football/world-cup-2026',
		},
		slimNav: true,
		titleIcon: <WorldCup2026IconSmall />,
		links: worldCup2026Links,
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

const getPlatformColour = (
	color: PlatformColor,
	renderingTarget: RenderingTarget,
): string => {
	if (typeof color === 'string') {
		return color;
	}

	return renderingTarget === 'Web' ? color.web : color.app;
};

export const DirectoryPageNav = ({ pageId, pageTags }: Props) => {
	const { renderingTarget } = useConfig();

	const isApps = renderingTarget === 'Apps';

	const ab = useAB();

	const config = configs.find(
		(cfg) =>
			cfg.pageIds.includes(pageId) ||
			cfg.tagIds.some(
				(tagId) => pageTags?.some((tag) => tag.id === tagId) ?? false,
			),
	);

	if (!config) {
		return null;
	}

	if (
		config.title.id === 'football/world-cup-2026' &&
		ab?.isUserInTest('webx-world-cup-2026-subnav') !== true
	) {
		return null;
	}

	const { slimNav } = config;

	const includeHeader = !slimNav;

	const onTouchStart = async () => {
		await getInteractionClient().disableArticleSwipe(true);
	};

	const onTouchEnd = async () => {
		await getInteractionClient().disableArticleSwipe(false);
	};

	const backgroundColor = getPlatformColour(
		config.backgroundColor,
		renderingTarget,
	);

	const textColor = getPlatformColour(config.textColor, renderingTarget);

	const primaryLinkColor = config.primaryLinkColor
		? getPlatformColour(config.primaryLinkColor, renderingTarget)
		: textColor;

	const borderColor =
		config.borderColor &&
		getPlatformColour(config.borderColor, renderingTarget);

	const container = css({
		backgroundColor: slimNav ? backgroundColor : 'transparent',
	});

	const nav = css({
		backgroundColor,
		'&': css(grid.paddedContainer),
		alignContent: 'space-between',
		position: 'relative',
	});

	const navWeb = css({
		'&': css(
			grid.paddedContainer,
			grid.verticalRules({
				color: borderColor,
			}),
		),
	});

	const largeLinkStyles = css({
		position: 'absolute',
		top: space[3],
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
		svg: {
			marginRight: space[2],
			width: space[10],
			height: 'auto',
			[from.tablet]: {
				width: space[14],
			},
		},
	});

	const list = css({
		'&': css(grid.column.all),
		display: 'flex',
		alignItems: 'center',
		position: 'relative',
		overflowX: 'scroll',
		scrollbarWidth: 'none',
		borderTop: slimNav ? undefined : '1px solid',
		borderBottom: '1px solid',
		borderColor,
		padding: `0 ${space[3]}px`,
		height: space[10],
		[from.mobileLandscape]: {
			padding: `0 ${space[5]}px`,
			height: slimNav ? space[10] : space[12],
		},
		// This creates a gradient fade on the right side to indicate that there's more to scroll for.
		'&:after': {
			content: '""',
			position: 'sticky',
			right: -space[3],
			top: 0,
			height: '100%',
			minWidth: 40,
			background: `linear-gradient(to left, ${backgroundColor}, transparent)`,
			[from.mobileLandscape]: {
				right: `-${space[5]}px`,
			},
		},
	});

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
	});

	const primaryLinkStyles = css({
		display: 'flex',
		alignItems: 'center',
		paddingRight: space[6],
		svg: {
			marginRight: space[2],
		},
		// small right border
		'&::after': {
			content: '""',
			display: 'block',
			position: 'absolute',
			right: space[3],
			top: '50%',
			transform: 'translateY(-50%)',
			width: 1,
			height: space[3],
			backgroundColor: borderColor,
		},
		'&:not(:hover)': {
			color: primaryLinkColor,
			'svg rect, svg circle': {
				fill: primaryLinkColor,
			},
		},
	});

	const primaryLinkHoverStyles = css({
		'&:hover': {
			textDecoration: 'none',
			color: config.textHoverColor,
			'svg rect, svg circle': {
				fill: config.textHoverColor,
			},
		},
	});

	const smallLink = css({
		...textSans14Object,
		paddingRight: space[3],
		display: 'block',
		lineHeight: 1,
		color: textColor,
		textDecoration: 'none',
		whiteSpace: 'nowrap',
	});

	const smallLinkWeb = css({
		'&:hover': {
			textDecoration: 'underline',
			color: config.textHoverColor,
		},
	});

	const boldSmallLink = css({
		...textSansBold14Object,
	});

	return (
		<div css={container}>
			<nav css={[nav, !isApps && navWeb]}>
				{includeHeader && (
					<>
						<a href={`/${config.title.id}`} css={largeLinkStyles}>
							{config.titleIcon && config.titleIcon}
							{config.title.label}
						</a>
						<BackgroundImage images={config.backgroundImages} />
					</>
				)}

				<ul
					css={list}
					onTouchStart={isApps ? void onTouchStart : undefined}
					onTouchEnd={isApps ? void onTouchEnd : undefined}
				>
					{
						// If the nav is without a header, the first link is styled as a primary link, otherwise there is a separate header link and all links in the list are styled the same.
					}
					{slimNav && (
						<li css={listItem}>
							<a
								href={`/${config.title.id}`}
								css={[
									smallLink,
									primaryLinkStyles,
									!isApps && primaryLinkHoverStyles,
									pageId === config.title.id && boldSmallLink,
								]}
							>
								{config.titleIcon}
								{config.title.label}
							</a>
						</li>
					)}
					{config.links.map((link) => (
						<li key={link.label} css={listItem}>
							<a
								href={`/${link.id}`}
								css={[
									smallLink,
									!isApps && smallLinkWeb,
									pageId === link.id && boldSmallLink,
								]}
							>
								{link.label}
							</a>
						</li>
					))}
				</ul>
			</nav>
		</div>
	);
};

const BackgroundImage = (props: {
	images: FullDirectoryPageNavConfig['backgroundImages'];
}) => {
	return (
		<picture
			css={[
				{
					'&': css(grid.column.all),
					gridRow: '1/3',
				},
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
					height: 'auto',
					display: 'block',
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

type Images = Exclude<
	FullDirectoryPageNavConfig['backgroundImages'],
	undefined
>;
type ImageSize = keyof Images;
