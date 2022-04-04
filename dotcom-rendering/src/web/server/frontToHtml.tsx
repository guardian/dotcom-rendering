import { isObject } from '@guardian/libs';
import type { Request } from 'express';

type FrontData = { query: Request['query']; body: unknown };

export const frontToHtml = ({ query, body }: FrontData) => {
	const config =
		(isObject(body) && isObject(body?.config) && body.config) || {};

	const slug: string =
		query?.url?.toString().replace('https://www.theguardian.com/', '/') ??
		'Missing url query param';

	return `<!DOCTYPE html>
	<html lang="en">
	<head>
	<meta charset="UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>Dummy Front | The Guardian</title>
	</head>
	<body>
	<h1>Dummy Front: ${slug}</h1>
	<h2><a href="https://www.theguardian.com${slug}.json">See JSON endpoint ${slug}.json</a></h2>
	<ul>
	${Object.entries(config)
		.map(([key, value]) => {
			return `<li>${key}: ${JSON.stringify(value)}</li>`;
		})
		.join(' ')}
	<style>
	li {
		padding-top: 1em;
		font-family: monospace;
		word-break: break-all;
	}
	</style>
	</ul>
	</body>
	</html>`;
};
