// @ts-check

import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { log, warn } from '../../scripts/log.js';
import semverParse from 'semver/functions/parse.js';
import semverSatisfies from 'semver/functions/satisfies.js';

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

/**
 * @typedef {'major' | 'minor' | 'patch'} MatchLevel
 */
const requiredNodeVersionMatches =
	/** @type {const} @satisfies {ReadonlyArray<{filepath: string, pattern: RegExp, matchLevel: MatchLevel}>}*/ ([
		{
			filepath: 'Containerfile',
			pattern: /^FROM node:(.+)-alpine$/m,
			matchLevel: 'patch',
		},
		{
			filepath: 'scripts/deploy/riff-raff.yaml',
			pattern: /^ +Recipe: dotcom-rendering.*-node-(\d+\.\d+\.\d+).*?$/m,
			matchLevel: 'patch',
		},
		{
			filepath: '../apps-rendering/riff-raff.yaml',
			pattern: /^ +Recipe: apps-rendering.*-node-(\d+\.\d+\.\d+).*?$/m,
			matchLevel: 'patch',
		},
		{
			filepath: 'package.json',
			pattern: /^\t+"@types\/node"\: "(.+)",$/m,
			/*
			Definitely Typed packages only match the major and minor
			versions of the corresponding library/node release.
			https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/README.md#how-do-definitely-typed-package-versions-relate-to-versions-of-the-corresponding-library

			Note: Given this rule, this should be set to 'minor'. It's currently
			set to 'major' because the latest node release doesn't yet have
			types available for it (v22.18.0, latest types package is v22.17.x).
			*/
			matchLevel: 'major',
		},
		{
			filepath: '../apps-rendering/package.json',
			pattern: /^\t+"@types\/node"\: "(.+)",$/m,
			/*
			Definitely Typed packages only match the major and minor
			versions of the corresponding library/node release.
			https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/README.md#how-do-definitely-typed-package-versions-relate-to-versions-of-the-corresponding-library

			Note: Given this rule, this should be set to 'minor'. It's currently
			set to 'major' because the latest node release doesn't yet have
			types available for it (v22.18.0, latest types package is v22.17.x).
			*/
			matchLevel: 'major',
		},
	]);

/**
 *
 * @param {string} a
 * @param {string} b
 * @param {MatchLevel} matchLevel
 * @returns boolean
 */
const versionMatches = (a, b, matchLevel) => {
	const semverA = semverParse(a);

	switch (matchLevel) {
		case 'major':
			return semverSatisfies(b, `${semverA?.major}.x.x`);
		case 'minor':
			return semverSatisfies(b, `${semverA?.major}.${semverA?.minor}.x`);
		case 'patch':
			return semverSatisfies(b, a);
	}
};

const problems = (
	await Promise.all(
		requiredNodeVersionMatches.map(
			async ({ filepath, pattern, matchLevel }) => {
				const fileContents = await readFile(
					resolve(...filepath.split('/')),
					'utf-8',
				);
				const foundNodeVersion =
					fileContents.match(pattern)?.[1] ?? undefined;

				const matches =
					foundNodeVersion === undefined
						? false
						: versionMatches(
								nodeVersion,
								foundNodeVersion,
								matchLevel,
						  );

				return matches
					? undefined
					: `Node version in ${filepath} (${foundNodeVersion}) does not match \`.nvmrc\` (${nodeVersion}), expected them to match versions to the ${matchLevel} level`;
			},
		),
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
