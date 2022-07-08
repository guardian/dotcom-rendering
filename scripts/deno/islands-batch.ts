import { dcr, octokit } from './github.ts';
import { type Change, getIslandSizes } from './islands.ts';

const page = 1;

const { data: prs } = await octokit.rest.pulls.list({
	...dcr,
	sort: 'updated',
	direction: 'desc',
	state: 'closed',
	per_page: 100,
	page,
});

const islands = (
	await Promise.all(
		prs.map(async ({ number, merged_at }) => ({
			merged_at,
			islands: await getIslandSizes(number),
		})),
	)
).reduce((prev, { islands, merged_at }) => {
	if (!merged_at) return prev;

	for (const [name, change] of islands) {
		const island = prev.get(name) ?? [];

		prev.set(name, island.concat({ ...change, date: new Date(merged_at) }));
	}
	return prev;
}, new Map<string, Array<Change>>());

console.log(islands);
