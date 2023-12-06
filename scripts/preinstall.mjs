#!/usr/bin/env node

/**
 * Make sure that we are installing node_modules with a Corepack-managed package
 * manager.
 *
 * Note that because npm and pnpm run preinstall scripts _after_ installing,
 * this check is only useful if we're using yarn...🤯
 * - https://github.com/npm/cli/issues/2660
 * - https://github.com/pnpm/pnpm/issues/3836
 *
 * This is fine while we move from using globally installed yarns to Corepack,
 * but means it's useless after that.
 *
 * This file can be deleted once people have fully migrated to Corepack.
 */

// If COREPACK_ROOT is present in ENV, then Corepack is enabled.
// https://github.com/nodejs/corepack#environment-variables
if (process.env.COREPACK_ROOT) {
	process.exit(0);
}

const { log, command, warn } = await import('./log.js');

warn(`Corepack is not enabled`);

// I don't know how packageManager would not be yarn, given the issues with npm
// and pnpm, but let's just be sure.
let packageManager = 'your current package manager';
if (process.env.npm_execpath?.includes('pnpm')) packageManager = 'pnpm';
if (process.env.npm_execpath?.includes('yarn')) packageManager = 'yarn';
if (process.env.npm_execpath?.includes('npm')) packageManager = 'npm';

log(
	`This project requires Corepack to automatically provide the correct Node package manager. To use it, remove ${packageManager} and enable Corepack:`,
);
console.log(``);

if (process.env.npm_execpath?.includes('node_modules'))
	command(`npm uninstall -g ${packageManager}`);
if (process.env.npm_execpath?.includes('brew'))
	command(`brew uninstall ${packageManager}`);

command(`corepack enable`);

if (process.execPath?.includes('asdf')) {
	console.log(``);
	log(
		`It looks like you are using asdf, so you may also need to reshim Node:`,
	);
	console.log(``);
	command(`asdf reshim nodejs`);
}

console.log(``);
log(
	`You will still be able to use ${packageManager} in other projects, as before.`,
);
log(`See https://github.com/nodejs/corepack for more information.`);

process.exit(1);
