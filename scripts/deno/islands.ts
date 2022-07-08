import { dcr, octokit } from './github.ts';
import type { RestEndpointMethodTypes } from 'https://cdn.skypack.dev/@octokit/plugin-rest-endpoint-methods@v5?dts';

const pull_number = parseInt(Deno.args[0], 10);

const SIZE_REGEX = /\/(\w+)-importable\.\*{20}.js` \| ([\d\.]+ [kM]?B)/i;

const isSizeChangeComment = (
	comment: RestEndpointMethodTypes['issues']['listComments']['response']['data'][number],
): comment is RestEndpointMethodTypes['issues']['listComments']['response']['data'][number] & {
	body: string;
	user: { login: string };
} =>
	!!(
		comment.user?.login.startsWith('github-actions') &&
		comment.body?.startsWith('**Size Change:**')
	);

const factors = [
	['B', 1],
	['kB', 1_000],
	['MB', 1_000_000],
] as const;

const getBytes = (size: string): number | undefined => {
	const [value, unit] = size.split(' ');

	const bytes = parseFloat(value);
	if (Number.isNaN(bytes)) return;
	const [, factor = undefined] =
		factors.find(([si_unit]) => si_unit === unit) ?? [];

	if (!factor) return;

	return Math.ceil(bytes * factor);
};

type Change = {
	pr: number;
	date: Date;
	size: number;
};

const getIslandSizes = async (
	issue_number: number,
): Promise<Map<string, Change>> => {
	const { data: comments } = await octokit.rest.issues.listComments({
		...dcr,
		issue_number,
	});

	const islands = comments
		.filter(isSizeChangeComment)
		.flatMap(({ body }) => body.split('\n'))
		.map((line) => SIZE_REGEX.exec(line)?.slice(1, 3))
		.filter((island): island is string[] => typeof island !== 'undefined')
		.map(
			([name, size]) =>
				[
					name,
					{
						pr: issue_number,
						date: new Date(),
						size: getBytes(size),
					},
				] as const,
		)
		.filter(
			(island): island is [string, Change] =>
				typeof island[1].size === 'number',
		);

	return new Map(islands);
};

if (!Number.isNaN(pull_number)) {
	const islands: Map<string, Change> = await getIslandSizes(pull_number);

	const data = [...islands.entries()]
		.flatMap(([name, changes]) =>
			[changes].map(({ date, size, pr }) => [
				name,
				date.toISOString().slice(0, 10),
				size,
				pr,
			]),
		)
		.map((line) => line.join('\t'));

	console.log(
		[['name', 'date', 'size', 'pr'].join('\t'), ...data].join('\n'),
	);
}

export type { Change };
export { getIslandSizes };
