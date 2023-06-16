import {
	fromFileUrl,
	resolve,
} from 'https://deno.land/std@0.192.0/path/mod.ts';
import { eq } from 'https://deno.land/std@0.192.0/semver/eq.ts';
import { parse as parseSemVer } from 'https://deno.land/std@0.192.0/semver/mod.ts';
import { SemVer } from 'https://deno.land/std@0.192.0/semver/types.ts';
import { parse as parseYaml } from 'https://deno.land/std@0.192.0/yaml/mod.ts';
import z from 'npm:zod@3';

const root = fromFileUrl(import.meta.resolve('../../'));
const issues: string[] = [];

const nodeVersion = parseSemVer(
	await Deno.readTextFile(resolve(root, '.nvmrc')),
);

const format = ({ major, minor, patch }: SemVer) =>
	'v' + [major, minor, patch].join('.');

console.info('Found node version:', format(nodeVersion));

const riffRaffFilepath = resolve(
	root,
	'dotcom-rendering',
	'scripts',
	'deploy',
	'riff-raff.yaml',
);
const {
	deployments: {
		'frontend-cfn': {
			parameters: {
				amiParametersToTags: {
					AMI: { Recipe: riffRaffRecipe },
				},
			},
		},
	},
} = z
	.object({
		deployments: z.object({
			'frontend-cfn': z.object({
				parameters: z.object({
					amiParametersToTags: z.object({
						AMI: z.object({
							Recipe: z.string(),
						}),
					}),
				}),
			}),
		}),
	})
	.parse(parseYaml(await Deno.readTextFile(riffRaffFilepath)));

if (!riffRaffRecipe.split('-').includes(`node${nodeVersion.major}`)) {
	issues.push(
		'Mismatches node version in Riff-Raff AMI',
		riffRaffRecipe,
		riffRaffFilepath,
	);
}

const dcrContainerFilepath = resolve(root, 'dotcom-rendering', 'Containerfile');
const containerNodeVersion = parseSemVer(
	(await Deno.readTextFile(dcrContainerFilepath)).match(
		/^FROM node:([0-9\.]+)-alpine$/m,
	)?.[1] ?? '---',
);

if (!eq(nodeVersion, containerNodeVersion)) {
	issues.push(
		'Mismatched node versions in Containerfile',
		format(containerNodeVersion),
		dcrContainerFilepath,
	);
}

if (issues.length > 0) {
	for (const issue of issues) {
		console.error(issue);
	}
	Deno.exit(1);
} else {
	console.info('All Node versions match');
}
