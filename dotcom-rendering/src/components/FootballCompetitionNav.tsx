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
	selected: 'fixtures' | 'tables' | 'none';
	pageId: string;
};

export const FootballCompetitionNav = ({ selected, pageId }: Props) =>
	pageId.includes('women-s-euro-2025') ? (
		<nav css={nav}>
			<a
				href="https://www.theguardian.com/football/women-s-euro-2025"
				css={largeLinkStyles}
			>
				Women's Euro 2025
			</a>
			<ul css={list}>
				<li
					css={listItem}
					style={selected === 'fixtures' ? selectedStyles : undefined}
				>
					<a
						href="https://www.theguardian.com/football/women-s-euro-2025/fixtures"
						css={smallLink}
					>
						Fixtures
					</a>
				</li>
				<li
					css={listItem}
					style={selected === 'tables' ? selectedStyles : undefined}
				>
					<a
						href="https://www.theguardian.com/football/women-s-euro-2025/table"
						css={smallLink}
					>
						Tables
					</a>
				</li>
				<li css={listItem}>
					<a
						href="https://www.theguardian.com/p/x2e3za"
						css={smallLink}
					>
						Top scorers
					</a>
				</li>
				<li css={listItem}>
					<a
						href="https://www.theguardian.com/p/x27nz8"
						css={smallLink}
					>
						Player's guide
					</a>
				</li>
				<li css={listItem}>
					<a
						href="https://www.theguardian.com/football/women-s-euro-2025"
						css={lastSmallLink}
					>
						Full coverage
					</a>
				</li>
			</ul>
		</nav>
	) : null;

const nav = css({
	backgroundColor: palette.news[400],
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
	color: palette.neutral[100],
	textDecoration: 'none',
	'&': css(grid.column.centre),
	[from.tablet]: headlineBold42Object,
	[from.leftCol]: css(grid.between('left-column-start', 'right-column-end')),
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
	backgroundImage: `linear-gradient(
        #d84d4d 0,
        #d84d4d 1px,
        transparent 1px,
        transparent var(--top-border-gap),
        #d84d4d var(--top-border-gap),
        #d84d4d calc(var(--top-border-gap) + 1px),
        transparent 1px,
        transparent var(--top-border-gap)
    )`,
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
		backgroundColor: palette.neutral[100],
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
	color: palette.neutral[100],
	textDecoration: 'none',
	'&::after': {
		content: '""',
		display: 'block',
		position: 'absolute',
		top: 0,
		right: 0,
		width: 1,
		height: '1.3rem',
		backgroundColor: '#d84d4d',
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
