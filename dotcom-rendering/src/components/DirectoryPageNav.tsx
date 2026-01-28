import { css } from '@emotion/react';
import {
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

type Props = {
	selected: string;
	pageId: string;
};

interface DirectoryPageNavConfig {
	sectionSlug: string;
	textColor: string;
	backgroundColor: string;
	title: { label: string; link: string };
	links: { label: string; href: string; selectedSlug?: string }[];
}

const configs = [
	{
		sectionSlug: 'women-s-euro-2025',
		textColor: palette.neutral[100],
		backgroundColor: palette.news[400],
		title: {
			label: "Women's Euro 2025",
			link: '/football/women-s-euro-2025',
		},
		links: [
			{
				label: 'Fixtures',
				href: '/football/women-s-euro-2025/fixtures',
				selectedSlug: 'fixtures',
			},
			{
				label: 'Tables',
				href: '/football/women-s-euro-2025/overview',
				selectedSlug: 'tables',
			},
			{ label: 'Top scorers', href: '/p/x2e3za' },
			{ label: 'Players guide', href: '/p/x27nz8' },
			{
				label: 'Full coverage',
				href: '/football/women-s-euro-2025',
			},
		],
	},
	{
		sectionSlug: 'winter-olympics-2026',
		textColor: palette.neutral[7],
		backgroundColor: '#CCCCCC',
		title: {
			label: 'Milano Cortina Winter Olympics 2026',
			link: '/tbd',
		},
		links: [
			{
				label: 'Schedule',
				href: '/p/x4x38e',
				selectedSlug: 'schedule',
			},
			{
				label: 'Results',
				href: '/p/x4x3k4',
				selectedSlug: 'results',
			},
			{ label: 'Medal table', href: '/p/x4x3k6' },
			{ label: 'Full coverage', href: '/tbd' },
		],
	},
] satisfies DirectoryPageNavConfig[];

export const DirectoryPageNav = ({ selected, pageId }: Props) => {
	const config = configs.find((cfg) => pageId.includes(cfg.sectionSlug));

	if (!config) {
		return null;
	}

	const { textColor, backgroundColor } = config;

	const nav = css({
		backgroundColor,
		'&': css(grid.paddedContainer),
		alignContent: 'space-between',
		height: 116,
		[from.tablet]: {
			height: 140,
		},
		[from.desktop]: {
			height: 150,
		},
	});

	const largeLinkStyles = css({
		...headlineBold24Object,
		color: textColor,
		textDecoration: 'none',
		'&': css(grid.column.centre),
		[from.tablet]: headlineBold42Object,
		[from.leftCol]: css(
			grid.between('left-column-start', 'right-column-end'),
		),
	});

	const list = css({
		display: 'flex',
		flexWrap: 'wrap',
		'&': css(grid.column.all),
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
		<nav css={nav}>
			<a href={config.title.link} css={largeLinkStyles}>
				{config.title.label}
			</a>
			<ul css={list}>
				{config.links.map((link, i) => (
					<li key={link.label} css={listItem}>
						<a
							href={link.href}
							css={
								i === config.links.length - 1
									? lastSmallLink
									: smallLink
							}
							style={
								link.selectedSlug === selected
									? selectedStyles
									: {}
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
