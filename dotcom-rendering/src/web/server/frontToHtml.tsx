import { isBoolean, isObject, isString } from '@guardian/libs';
import type { Request } from 'express';
import { escape } from 'he';

type FrontData = { query: Request['query']; body: FrontType };

const displayJSON = (json: unknown): string => {
	if (isString(json)) return `<span class="string">"${escape(json)}"</span>`;
	if (isBoolean(json) || Number.isFinite(json))
		return `<span class="number">${json}</span>`;

	if (json === null) return `null`;

	if (isObject(json))
		return `<ul>${Object.entries(json)
			.map(([key, value]) => {
				return `<li>${key}: ${displayJSON(value)}</li>`;
			})
			.join(' ')}</ul>`;

	if (Array.isArray(json)) {
		if (json.length === 0) return '<span class="array">[]</span>';
		return `<ol>${json
			.map(displayJSON)
			.map((value) => `<li>${value}</li>`)
			.join('')}</ol>`;
	}

	return `(unknown type) : ${json}`;
};

export const frontToHtml = ({ query, body }: FrontData) => {
	const config = (isObject(body) && body) || {};

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
	<h2><a href="https://www.theguardian.com${slug}.json?dcr=true">See JSON endpoint ${slug}.json</a></h2>
	<style>
	li {
		padding-top: 1em;
		font-family: monospace;
		word-break: break-all;
	}

	ul {
		border-left: 2px solid #aaa;
		padding-left: 18px;
	}

	.string {
		color: orangered;
	}

	.number {
		color: darkcyan;
	}

	.array {
		color: darkblue;
	}
	</style>

	${displayJSON(config)}

	</body>
	</html>`;
};
