import { array, object, string } from 'https://cdn.skypack.dev/zod@3.17?dts';
import {
	DOMParser,
	Element,
	Node,
} from 'https://deno.land/x/deno_dom@v0.1.22-alpha/deno-dom-wasm.ts';
import { octokit } from './github.ts';

const searchParams = new URLSearchParams({
	'api-key': 'test',
	'query-fields': 'body',
	q: 'iframe',
	'show-fields': 'body',
	'page-size': String(100),
});
const url = new URL(
	`search?${searchParams}`,
	'http://content.guardianapis.com/',
);

const schema = object({
	response: object({
		status: string(),
		results: array(
			object({
				id: string(),
				webTitle: string(),
				fields: object({
					body: string(),
				}),
			}),
		),
	}),
});

const {
	response: { results },
} = await fetch(url.toString())
	.then((r) => r.json())
	.then(schema.parse);

const parser = new DOMParser();

const isElement = (n: Node): n is Element => n instanceof Element;

type Status = 'ok' | 'warning' | 'missing';
type Info = {
	status: Status;
	attr: string;
	value: string;
};
type Ok = Info & { status: 'ok' };
type Warning = Info & { status: 'warning' };
type Missing = Info & { status: 'missing' };
type Article = {
	url: string;
	title: string;
	iframes: Array<Ok | Warning | Missing>;
};

const getStatus = (iframes: Article['iframes']): Status => {
	if (iframes.length === 0) return 'missing';
	if (iframes.some(({ status }) => status === 'missing')) return 'missing';
	if (iframes.some(({ status }) => status === 'warning')) return 'warning';
	return 'ok';
};

const promises = results.map(async ({ id, webTitle: title }) => {
	const url = `https://www.theguardian.com/${id}`;
	const body = await fetch(url).then((r) => r.text());
	const document = parser.parseFromString(body, 'text/html');
	const attrs = ['title', 'srcDoc', 'src'] as const;
	const iframes: Article['iframes'] = [
		...(document?.querySelectorAll('iframe') ?? []),
	]
		.filter(isElement)
		.map((iframe) => {
			const attr = attrs.find((attr) => iframe.getAttribute(attr));
			if (!attr) throw new Error('could not get any attribute');

			const value = iframe.getAttribute(attr) ?? '';

			switch (attr) {
				case 'title': {
					// Check if the title contains less than 9 different letters
					const warning =
						attr === 'title' && new Set(value?.split('')).size < 9;
					return {
						status: warning ? 'warning' : 'ok',
						attr,
						value,
					};
				}
				case 'srcDoc':
				case 'src':
					return {
						status: 'missing',
						attr,
						value,
					};

				default:
					return {
						status: 'missing',
						attr: '???',
						value: '???',
					};
			}
		});

	const result = {
		url,
		title,
		status: getStatus(iframes),
		iframes,
	};

	return result;
});

const articles = await Promise.all(promises);

const missing = articles.filter(({ status }) => status === 'missing');
const warning = articles.filter(({ status }) => status === 'warning');
const ok = articles.filter(({ status }) => status === 'ok');

const statusEmoji = {
	missing: '🚫',
	warning: '⚠️',
	ok: '✅',
} as const;

const formatter = (articles: Article[], checked: boolean): string =>
	articles
		.flatMap(({ url, title, iframes }) => {
			const frames = iframes.length
				? iframes.map(
						({ attr, value, status }) =>
							`  - ${statusEmoji[status]} \`${attr}\`: \`${value}\``,
				  )
				: [
						`  - ${statusEmoji['missing']} All iframes are renderd Client-side`,
				  ];
			return [`- [${checked ? 'X' : ' '}] [${title}](${url})`, ...frames];
		})
		.join('\n');

const body = `
# List of iframes with missing titles

> **Note**
> Do not attempt to fix these individually. This is a list to track recent issues
> This list is generated [from CAPI](${url})


## Missing
${formatter(missing, false)}

## Warning
${formatter(warning, true)}

## Ok
${formatter(ok, true)}
`;

const issue_number = 5510;

if (!octokit) {
	console.log(body);
	Deno.exit();
}

try {
	const {
		data: { html_url },
	} = await octokit.rest.issues.update({
		owner: 'guardian',
		repo: 'dotcom-rendering',
		issue_number,
		body,
	});

	console.info(`Updated list of issues for dotcom-rendering#${issue_number}`);
	console.info(html_url);
} catch (error) {
	// do_something
	console.warn(`Failed to update issue #${issue_number}`);
	console.error(error);

	console.log(body);
}

Deno.exit();
