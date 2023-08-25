// @ts-check

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import * as zod from 'zod';

const dir = resolve(fileURLToPath(import.meta.url), '../../../dist/stats');

/**
 * This regex is dynamic so we can find the precise JSDoc for
 * the Island that has the name of the file it is in.
 *
 * @type {(name: string) => RegExp}
 */
const getRegExForIsland = (name) =>
	new RegExp(
		'\n/\\*\\*\n?' +
			'((?: \\*.*\n)+)' +
			' \\*\\/' +
			`\nexport const ${name} =`,
		'm',
	);

const componentsDirectory = resolve(
	fileURLToPath(import.meta.url),
	'../../../src/components',
);

const chunk = zod.object({
	label: zod.string(),
	isAsset: zod.boolean(),
	statSize: zod.number(),
	parsedSize: zod.number(),
	gzipSize: zod.number(),
});

/** Sorted by gzipSize */
const getBundleReport = () =>
	readFile(resolve(dir, 'client.web-bundles.json'), 'utf-8')
		.then((bundle_data) => zod.array(chunk).parse(JSON.parse(bundle_data)))
		.then((report) => report.sort((a, b) => b.gzipSize - a.gzipSize));

/**
 * Below 1kB – Good
 * Below 5kB – Average
 * Above 5kB – Poor
 * @type {(gzipSize: number) => '🔴' | '🟠' | '🟢'}
 */
const getTrafficLight = (gzipSize) => {
	if (gzipSize < 1 * 1024) return '🟢';
	if (gzipSize < 5 * 1024) return '🟠';
	return '🔴';
};

const processor = unified()
	.use(remarkParse)
	.use(remarkRehype)
	.use(rehypeSlug)
	.use(rehypeAutolinkHeadings, { behavior: 'wrap', test: 'h1' })
	.use(rehypeStringify);

/**
 * @param {Awaited<ReturnType<typeof getBundleReport>>} report
 */
const getIslands = async (report) => {
	const components = await readdir(componentsDirectory);

	const filenames = components.filter((component) =>
		component.endsWith('.importable.tsx'),
	);

	const files = await Promise.all(
		filenames.map(async (filename) => ({
			filename,
			content: await readFile(
				resolve(componentsDirectory, filename),
				'utf-8',
			),
		})),
	);

	const islandsData = await Promise.all(
		files.map(async ({ filename, content }) => {
			const name = filename.replace('.importable.tsx', '');
			const { gzipSize = 0, parsedSize = 0 } =
				report.find(({ label }) =>
					label.startsWith(name + '-importable.'),
				) ?? {};

			const matched = content.match(getRegExForIsland(name));

			const { index, match } = matched
				? { match: matched[1], index: matched.index ?? -1 }
				: { match: undefined, index: -1 };

			const lines = match
				? '#' +
				  [
						content.slice(0, index).split('\n').length + 1,
						content.slice(0, index + match.length).split('\n')
							.length + 2,
				  ]
						.map((line_count) => `L${line_count}`)
						.join('-')
				: '';

			const description =
				matched?.[1]
					?.split('\n')
					.map((jsdoc_line) => jsdoc_line.slice(3))
					.join('\n') ?? `# ${name} \n No description yet… 😢`;

			const html = await processor.process(description);

			return { html, gzipSize, parsedSize, filename, lines };
		}),
	);

	return islandsData
		.slice()
		.sort((a, b) => b.gzipSize - a.gzipSize)
		.map(({ gzipSize, parsedSize, html, filename, lines }) => {
			const gzip = [
				(gzipSize / 1024).toFixed(1),
				'kB gzip ',
				getTrafficLight(gzipSize),
			].join('');
			const parsed = `${(parsedSize / 1024).toFixed(1)}kB parsed`;
			return `<li>
    <header>
        <h4>${gzip}</h4>
        <h4>${parsed}</h4>
    </header>

    <main>
    ${String(html)}
    </main>

    <footer>
    See <a href="https://github.com/guardian/dotcom-rendering/blob/main/dotcom-rendering/src/components/${filename}${lines}">…/components/${filename}${lines}</a> online
    </footer>
    </li>`;
		});
};

/**
 * @param {string[]} islands
 */
const getHtml = (islands) =>
	readFile(
		resolve(fileURLToPath(import.meta.url), '..', 'islands.html'),
		'utf-8',
	).then((template) =>
		template
			.replace('<!--TIMESTAMP-->', new Date().toISOString())
			.replace('<!--ISLANDS-->', islands.join('\n')),
	);

const generateIslandDescriptions = async () => {
	try {
		const report = await getBundleReport();
		const islands = await getIslands(report);
		const html = await getHtml(islands);

		await writeFile(resolve(dir, 'islands.html'), html);

		console.info('Succesfully generated Island report card:');
		console.info(dir + '/islands.html');
	} catch (err) {
		console.error('Failed to produce the Island description page');
		throw err;
	}
};

await generateIslandDescriptions();
