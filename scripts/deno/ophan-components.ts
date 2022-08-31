import { octokit } from './github.ts';

type Platform = 'frontend' | 'dcr';
type OphanAttribute = 'data-link-name' | 'data-component';

const URLS: Record<Platform, string> = {
	frontend: 'https://www.theguardian.com/international?dcr=false',
	dcr: 'https://www.theguardian.com/international?dcr=true',
};

const html: Record<Platform, string> = {
	frontend: await fetch(URLS.frontend).then((response) => response.text()),
	dcr: await fetch(URLS.dcr).then((response) => response.text()),
};

const regexLinkName = /<([a-zA-Z]+)[^>]+?\bdata-link-name="(.+?)"/gi;
const regexComponent = /<([a-zA-Z]+)[^>]+?\bdata-component="(.+?)"/gi;
const tagMatch = (attribute: OphanAttribute) =>
	attribute === 'data-link-name' ? regexLinkName : regexComponent;

type TagPair = [name: string, tag: string];
const getOphanComponents = (html: string, tag: OphanAttribute): TagPair[] =>
	[...html.matchAll(tagMatch(tag))].map((match) => [match[2], match[1]]);

const issues: Record<OphanAttribute, number> = {
	'data-link-name': 4692,
	'data-component': 4698,
};

const updateIssue = async (attribute: OphanAttribute) => {
	const frontend = getOphanComponents(html.frontend, attribute);
	const dcr = getOphanComponents(html.dcr, attribute);

	type ExistsOnDcr = 'identical' | 'tag-mismatch' | 'missing';
	type OphanComponent<T extends ExistsOnDcr = ExistsOnDcr> = {
		name: string;
		tag: string;
		dcrTag?: string;
		existsOnDcr: T;
	};

	const components: OphanComponent[] = frontend
		// remove duplicate component
		.reduce<[Set<string>, TagPair[]]>(
			([set, array], [name, tag]) => {
				if (!set.has(name)) array.push([name, tag]);
				set.add(name);
				return [set, array];
			},
			[new Set(), []],
		)[1]
		.map(([name, tag]) => {
			const fullMatch = dcr.find(
				([nameDcr, tagDcr]) => nameDcr === name && tagDcr === tag,
			);
			if (fullMatch) return { name, tag, existsOnDcr: 'identical' };

			const partialMatch = dcr.find(([nameDcr]) => nameDcr === name);

			if (partialMatch) {
				return {
					name,
					tag,
					dcrTag: partialMatch[1],
					existsOnDcr: 'tag-mismatch',
				};
			}

			return { name, tag, existsOnDcr: 'missing' };
		});

	const isIssueType =
		<T extends ExistsOnDcr>(existsOnDcr: T) =>
		(issue: OphanComponent): issue is OphanComponent<T> =>
			issue.existsOnDcr === existsOnDcr;

	const missing = components.filter(isIssueType('missing'));
	const mismatches = components.filter(isIssueType('tag-mismatch'));
	const identical = components.filter(isIssueType('identical'));

	const body = `
## Remaining Front components mismatches

Comparing **\`${attribute}\`** on the international Front between [Frontend][] & [DCR][].

[Frontend]: ${URLS.frontend}
[DCR]: ${URLS.dcr}

### Missing from DCR (${missing.length} / ${components.length})

${
	missing.length
		? missing
				.map(
					({ tag, name }) =>
						`- [ ] **\`${name}\`** &rarr; \`<${tag}/>\``,
				)
				.join('\n')
		: 'No missing component in DCR 🎉'
}

### Tag mismatch (${mismatches.length} / ${components.length})

${
	mismatches.length
		? mismatches
				.map(
					({ tag, name, dcrTag }) =>
						`- [X] **\`${name}\`** : \`<${dcrTag} />\` &cross; should be &rarr; \`<${tag}/>\``,
				)
				.join('\n')
		: 'No tag mismatches'
}

---

### Identical match (${identical.length} / ${components.length})

${
	identical.length
		? identical
				.map(
					({ tag, name }) =>
						`- [X] **\`${name}\`** &rarr; \`<${tag}/>\``,
				)
				.join('\n')
		: 'No identical match'
}
`;

	const issue_number = issues[attribute];

	if (!octokit) {
		console.log(body);
		return;
	}

	const {
		data: { body: previousBody },
	} = await octokit.rest.issues.get({
		owner: 'guardian',
		repo: 'dotcom-rendering',
		issue_number,
	});

	const {
		data: { body: newBody, html_url },
	} = await octokit.rest.issues.update({
		owner: 'guardian',
		repo: 'dotcom-rendering',
		issue_number,
		body,
	});

	const change: string =
		previousBody === newBody ? '[no change]' : `[some changes]`;

	console.info(`PR dotcom-rendering#${issue_number} ${attribute} ${change}`);
	console.info(html_url);
};

await updateIssue('data-component');
await updateIssue('data-link-name');

Deno.exit();
