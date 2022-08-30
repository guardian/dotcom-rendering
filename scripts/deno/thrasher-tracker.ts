import { array, object, string } from 'https://deno.land/x/zod@v3.17.3/mod.ts';
import { fetchJSON } from './json.ts';
import prettyBytes from 'https://esm.sh/pretty-bytes@6.0.0';
import { octokit } from './github.ts';

// -- Constants -- //

const gu = 'https://www.theguardian.com/';

const fronts = ['uk', 'us', 'international', 'au'] as const;

const regex =
	/(http|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/g;

const frontSchema = object({
	pressedPage: object({
		collections: array(
			object({
				id: string(),
				collectionType: string(),
				displayName: string(),
				curated: array(
					object({
						enriched: object({
							embedHtml: string().optional(),
							embedCss: string().optional(),
							embedJs: string().optional(),
						}),
					}),
				),
			}),
		),
	}),
});

/**
 * We ignore all fonts extensions because browsers will only load
 * `woff2`one of these resources at a time.
 */
const _fontsExtensions = ['woff', 'ttf'];

const supportedResourceExtensions = [
	'js',
	'png',
	'woff2',
	'gif',
	'jpg',
	'mp4',
	'css',
];

// -- Methods -- //

const getExtension = (url: URL) => url.pathname.split('.').slice(-1)[0];

const isSupportedResourceType = (url: URL): boolean =>
	supportedResourceExtensions.includes(getExtension(url));

const getResourceSize = async (url: URL): Promise<number> => {
	const response = await fetch(url);
	return (await response.blob()).size;
};

const getThrasherResources = (urls: URL[]) => {
	return Promise.all(
		urls.map(async (url) => {
			const size = await getResourceSize(url);
			return { url, size };
		}),
	);
};

const getFrontThrashers = async (path: string) => {
	const url = new URL(`${path}.json?dcr`, gu);
	const {
		pressedPage: { collections },
	} = await fetchJSON(url, { parser: frontSchema.parse });

	const thrashers = collections.filter(
		(collection) => collection.collectionType === 'fixed/thrasher',
	);

	const thrashersWithResources = thrashers.flatMap(
		async ({ displayName, curated: [{ enriched }] }) => {
			const resourceUrls = Object.values(enriched)
				.flatMap((embed) =>
					[...embed.matchAll(regex)].map(([url]) => new URL(url)),
				)
				.filter(isSupportedResourceType);

			const resources = await getThrasherResources(resourceUrls);

			const embedSize = new Blob([...Object.values(enriched)]).size;

			const resourceSize = resources.reduce((map, { url, size }) => {
				const ext = getExtension(url);
				const acc = map.get(ext) ?? 0;
				map.set(ext, acc + size);
				return map;
			}, new Map<string, number>());

			return {
				displayName,
				resources,
				embedSize,
				resourceSize,
				totalSize:
					embedSize +
					[...resourceSize.values()].reduce(
						(acc, next) => acc + next,
						0,
					),
			};
		},
	);
	return Promise.all(thrashersWithResources);
};

const getTable = (data: Awaited<ReturnType<typeof getFrontThrashers>>) => {
	const rows = data
		.slice()
		.sort((a, b) => b.totalSize - a.totalSize)
		.map(
			({ displayName, embedSize, resourceSize, totalSize }) =>
				'| ' +
				[
					displayName,
					prettyBytes(totalSize),
					prettyBytes(embedSize),
					[...resourceSize.entries()]
						.sort(([, a], [, b]) => b - a)
						.map(
							([resourceType, size]) =>
								`\`${resourceType}\`: ${prettyBytes(size)}`,
						)
						.join(', '),
				].join(' | ') +
				' |',
		);
	return [
		'| Name | Total size | Embed size | Resources |',
		'| ---- | ---------- | ---------- | --------- |',
		...rows,
	];
};

// -- Script -- //

const lines = ['# Largest thrashers on network fronts'];

for (const front of fronts) {
	lines.push(
		'',
		'',
		`## [${front.toUpperCase()} Front](${new URL(front, gu).toString()}) `,
		'',
	);
	const data = await getFrontThrashers(front);

	lines.push(...getTable(data));
}

const body = lines.join('\n');

if (!octokit) {
	console.log(body);
	Deno.exit();
}

const {
	data: { html_url },
} = await octokit.rest.issues.update({
	owner: 'guardian',
	repo: 'dotcom-rendering',
	issue_number: 5856,
	body,
});

console.log('Updated issue:', html_url);

Deno.exit();
