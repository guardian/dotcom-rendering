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

/** @type {(name: string) => RegExp} */
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
	'../../../src/web/components',
);

const PREFIX = 'window.chartData = ';

const chunk = zod.object({
	label: zod.string(),
	isAsset: zod.boolean(),
	statSize: zod.number(),
	parsedSize: zod.number(),
	gzipSize: zod.number(),
});

/** Sorted by gzipSize */
const getBundleReport = () =>
	readFile(
		resolve(
			fileURLToPath(import.meta.url),
			'../../../dist/browser.modern-bundles.html',
		),
		'utf-8',
	)
		.then((file) =>
			file
				.split('\n')
				.find((line) => line.trim().startsWith(PREFIX))
				?.trim(),
		)
		.then((bundle_data) =>
			zod
				.array(chunk)
				.parse(
					JSON.parse(
						bundle_data?.slice(PREFIX.length, -1).trim() ?? '[]',
					),
				),
		)
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
const getIslands = (report) =>
	readdir(componentsDirectory)
		.then((components) =>
			components.filter((component) =>
				component.endsWith('.importable.tsx'),
			),
		)
		.then((filenames) =>
			Promise.all(
				filenames.map(async (filename) => ({
					filename,
					content: await readFile(
						resolve(componentsDirectory, filename),
						'utf-8',
					),
				})),
			),
		)
		.then((files) =>
			Promise.all(
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
								content
									.slice(0, index + match.length)
									.split('\n').length + 2,
						  ]
								.map((line_count) => `L${line_count}`)
								.join('-')
						: '';

					const description =
						matched?.[1]
							?.split('\n')
							.map((jsdoc_line) => jsdoc_line.slice(3))
							.join('\n') ??
						`# ${name} \n No description yet… 😢`;

					const html = await processor.process(description);

					return { html, gzipSize, parsedSize, filename, lines };
				}),
			),
		)

		.then((islandsData) =>
			islandsData
				.sort((a, b) => b.gzipSize - a.gzipSize)
				.map(
					({ gzipSize, parsedSize, html, filename, lines }) => `<li>
    <header>
        <h4>${(gzipSize / 1024).toFixed(1)}kB gzip ${getTrafficLight(
						gzipSize,
					)}</h4>
        <h4>${(parsedSize / 1024).toFixed(1)}kB parsed</h4>
    </header>

    <main>
    ${String(html)}
    </main>

    <footer>
    See <a href="https://github.com/guardian/dotcom-rendering/blob/main/dotcom-rendering/src/web/components/${filename}${lines}">…/components/${filename}${lines}</a> online
    </footer>
    </li>`,
				),
		);

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

		await writeFile(
			resolve(
				fileURLToPath(import.meta.url),
				'../../../dist',
				'islands.html',
			),
			html,
		);

		console.info('Succesfully generated Island report card:');
		console.info('dist/islands.html');
	} catch (err) {
		console.error('Failed to produce the Island description page');
		console.error(err);
	}
};

await generateIslandDescriptions();
