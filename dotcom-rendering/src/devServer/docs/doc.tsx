import type { ReactNode } from 'react';

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
	<body>
		<nav>
			<ul>
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
		<h1>{title}</h1>
		{children}
	</body>
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
