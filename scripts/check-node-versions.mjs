// @ts-check

import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { log, warn } from '../dotcom-rendering/scripts/env/log.js';

// ----- Setup ----- //

const __dirname = dirname(fileURLToPath(import.meta.url));
/** Matches `x.y.z` pattern */
const nodeVersionPattern = /^\d+\.\d+\.\d+$/;

// ----- Functions ----- //

/**
 * @typedef {{ major: string, minor: string, patch: string }} SemverVersion
 * 
 * @param {string} version
 * @return {SemverVersion | undefined}
 */
const parseNodeVersion = (version) => {
	const [major, minor, patch] = version.split('.');

	if (major === undefined || minor === undefined || patch === undefined) {
		return undefined;
	}
	
	return { major, minor, patch };
}

/**
 * @param {SemverVersion} version
 * @return {string}
 */
const showSemverVersion = (version) =>
	`${version.major}.${version.minor}.${version.patch}`;

/**
 * @param {string} nvmrcVersion
 * @return {SemverVersion | undefined}
 */
const parseNvmrcVersion = (nvmrcVersion) => {
	const versionString = nvmrcVersion.match(nodeVersionPattern)?.[0] ?? undefined;

	if (versionString === undefined) {
		return undefined;
	}

	return parseNodeVersion(versionString);
}

/**
 * @typedef {'Major' | 'Minor' | 'Patch'} MatchLevel
 * 
 * @param {SemverVersion} a
 * @param {SemverVersion} b
 * @param {MatchLevel} level
 * @returns {string | undefined}
 */
const matchVersions = (a, b, level) => {
	if (a.major !== b.major) {
		return 'Major versions do not match';
	}

	if ((level === 'Minor' || level === 'Patch') && a.minor !== b.minor) {
		return 'Minor versions do not match';
	}

	if (level === 'Patch' && a.patch !== b.patch) {
		return 'Patch versions do not match';
	}

	return undefined;
}

// ----- Script ----- //

process.chdir(resolve(__dirname, '..'));

const nvmrc = (await readFile('.nvmrc', 'utf-8'))
	// We don’t care about leading or trailing whitespace
	.trim();

const nodeVersion = parseNvmrcVersion(nvmrc);

if (!nodeVersion) {
	warn(
		'Node version in .nvmrc has incorrect pattern:',
		`\`${nvmrc}\` does not match \`x.y.z\``,
	);
	process.exit(1);
} else {
	log(`Found node version ${showSemverVersion(nodeVersion)} in \`.nvmrc\``);
}

const requiredNodeVersionMatches =
	/** @type {const} @satisfies {ReadonlyArray<{filepath: string, pattern: RegExp, matchLevel: MatchLevel}>}*/ ([
		{
			filepath: 'dotcom-rendering/Containerfile',
			pattern: /^FROM node:(.+)-alpine$/m,
			matchLevel: 'Patch',
		},
		{
			filepath: 'dotcom-rendering/scripts/deploy/riff-raff.yaml',
			pattern: /^ +Recipe: dotcom-rendering.*-node-(\d+\.\d+\.\d+)$/m,
			matchLevel: 'Patch',
		},
		{
			filepath: 'apps-rendering/riff-raff.yaml',
			pattern: /^ +Recipe: .+-mobile-node(\d+\.\d+\.\d+).*$/m,
			matchLevel: 'Patch',
		},
		{
			filepath: 'dotcom-rendering/package.json',
			pattern: /^\s*"@types\/node": "(\d+\.\d+\.\d+)",?$/m,
			matchLevel: 'Minor',
		},
		{
			filepath: 'apps-rendering/package.json',
			pattern: /^\s*"@types\/node": "(\d+\.\d+\.\d+)",?$/m,
			matchLevel: 'Minor',
		},
	]);

const problems = (
	await Promise.all(
		requiredNodeVersionMatches.map(async ({ filepath, pattern, matchLevel }) => {
			const fileContents = await readFile(
				resolve(...filepath.split('/')),
				'utf-8',
			);
			const foundNodeVersion =
				fileContents.match(pattern)?.[1] ?? undefined;
			
			if (foundNodeVersion !== undefined) {
				const parsedVersion = parseNodeVersion(foundNodeVersion);

				if (parsedVersion !== undefined) {
					const matchError = matchVersions(nodeVersion, parsedVersion, matchLevel);

					if (matchError !== undefined) {
						return [
							`Node version in ${filepath} (${showSemverVersion(parsedVersion)}) `,
							`does not match \`.nvmrc\` (${showSemverVersion(nodeVersion)}): `,
							matchError
						].join('');
					}

					return undefined;
				}
			}

			return `Could not parse version in ${filepath}: ${foundNodeVersion}`;
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
