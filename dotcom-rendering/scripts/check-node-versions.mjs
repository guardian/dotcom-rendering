// @ts-check

import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { log, warn } from '../../scripts/log.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

process.chdir(resolve(__dirname, '..'));

const nvmrc = (await readFile('../.nvmrc', 'utf-8'))
	// We don’t care about leading or trailing whitespace
	.trim();

/** Matches `x.y.z` pattern */
const nodeVersionPattern = /^\d+\.\d+\.\d+$/;
const nodeVersion = nvmrc.match(nodeVersionPattern)?.[0] ?? undefined;

if (!nodeVersion) {
	warn(
		'Node version in .nvmrc has incorrect pattern:',
		`\`${nvmrc}\` does not match \`x.y.z\``,
	);
	process.exit(1);
} else {
	log(`Found node version ${nodeVersion} in \`.nvmrc\``);
}

const requiredNodeVersionMatches =
	/** @type {const} @satisfies {ReadonlyArray<{filepath: string, pattern: RegExp}>}*/ ([
		{
			filepath: 'Containerfile',
			pattern: /^FROM node:(.+)-alpine$/m,
		},
		{
			filepath: 'scripts/deploy/riff-raff-v1.yaml',
			pattern: /^ +Recipe: dotcom-rendering.*-node-(\d+\.\d+\.\d+).*?$/m,
		},
		{
			filepath: 'scripts/deploy/riff-raff-v2.yaml',
			pattern: /^ +Recipe: dotcom-rendering.*-node-(\d+\.\d+\.\d+).*?$/m,
		},
		{
			filepath: '../apps-rendering/riff-raff.yaml',
			pattern: /^ +Recipe: .+-mobile-node(\d+\.\d+\.\d+).*$/m,
		},
	]);

const problems = (
	await Promise.all(
		requiredNodeVersionMatches.map(async ({ filepath, pattern }) => {
			const fileContents = await readFile(
				resolve(...filepath.split('/')),
				'utf-8',
			);
			const foundNodeVersion =
				fileContents.match(pattern)?.[1] ?? undefined;

			return foundNodeVersion === nodeVersion
				? undefined
				: `Node version in ${filepath} (${foundNodeVersion}) does not match \`.nvmrc\` (${nodeVersion})`;
		}),
	)
).filter(
	/** @type {(problem?: string) => problem is string} */
	(problem) => !!problem,
);

if (problems.length === 0) {
	log(
		`All ${requiredNodeVersionMatches.length} checked files use the correct Node version`,
	);
	process.exitCode = 0;
} else {
	for (const problem of problems) {
		warn(problem);
	}
	process.exitCode = 1;
}
