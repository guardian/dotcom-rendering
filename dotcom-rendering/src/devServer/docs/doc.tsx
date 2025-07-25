import { css } from '@emotion/react';
import {
	article17Object,
	headlineBold24Object,
	headlineMedium20Object,
	headlineMedium24Object,
	headlineMedium34Object,
	palette,
	space,
} from '@guardian/source/foundations';
import type { ReactNode } from 'react';
import { grid } from '../../grid';

const Charset = () => <meta charSet="UTF-8" />;

const Viewport = () => (
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
);

const Head = ({ title, path }: { title: string; path: string }) => (
	<head>
		<Charset />
		<Viewport />
		<base href={path} target="_self" />
		<title>{`${title}: DCAR Dev Server`}</title>
	</head>
);

const Body = ({ title, children }: { title: string; children: ReactNode }) => (
	<body
		css={{
			h1: headlineMedium34Object,
			h2: {
				...headlineMedium24Object,
				borderBottomWidth: 1,
				borderBottomStyle: 'solid',
				borderBottomColor: palette.neutral[86],
				marginTop: space[9],
				marginBottom: 0,
			},
			h3: headlineMedium20Object,
			a: {
				color: palette.brand[400],
				textUnderlineOffset: 5,
			},
			['&']: css(grid.container),
			margin: 0,
			...article17Object,
		}}
	>
		<Nav />
		<main css={grid.column.centre}>
			<h1>{title}</h1>
			{children}
		</main>
	</body>
);

const Nav = () => (
	<nav
		css={{
			a: {
				textDecoration: 'none',
				color: palette.neutral[100],
			},
			display: 'grid',
			gridTemplateColumns: 'subgrid',
			['&']: css(grid.column.all),
			backgroundColor: palette.brand[400],
			...headlineBold24Object,
		}}
	>
		<ul
			css={{
				listStyle: 'none',
				padding: 0,
				margin: `${space[3]}px 0`,
				display: 'flex',
				gap: space[6],
				['&']: css(grid.column.centre),
			}}
		>
			<li>
				<a href="/">Home</a>
			</li>
			<li>
				<a href="/pages">Pages</a>
			</li>
			<li>
				<a href="/targets">Targets</a>
			</li>
		</ul>
	</nav>
);

export const Doc = ({
	title,
	path,
	children,
}: {
	title: string;
	path: string;
	children: ReactNode;
}) => (
	<html lang="en-gb">
		<Head title={title} path={path} />
		<Body title={title}>{children}</Body>
	</html>
);
