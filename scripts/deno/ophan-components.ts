import { octokit } from './github.ts';
import {
	DOMParser,
	Element,
} from 'https://deno.land/x/deno_dom@v0.1.34-alpha/deno-dom-wasm.ts';

type OphanAttribute = 'data-link-name' | 'data-component';

const url = 'https://www.theguardian.com/international';

const html = await Promise.all(
	['?dcr=false', '?dcr=true'].map((params) =>
		fetch(url + params).then((response) => response.text()),
	),
);

const getOphanComponents = (
	html: string,
	attribute: OphanAttribute,
): Element[] => {
	const doc = new DOMParser().parseFromString(html, 'text/html');
	if (!doc) throw new Error('Unable to parse DOM');

	return [...doc.querySelectorAll(`[${attribute}]`)].filter(
		(node): node is Element => node instanceof Element,
	);
};

const issues = {
	'data-link-name': 4692,
	'data-component': 4698,
} as const satisfies Record<OphanAttribute, number>;

const updateIssue = async (attribute: OphanAttribute) => {
	const frontend = getOphanComponents(html[0], attribute);
	const dcr = getOphanComponents(html[1], attribute);

	type ExistsOnDcr = 'identical' | 'tag-mismatch' | 'missing';
	type OphanComponent<T extends ExistsOnDcr = ExistsOnDcr> = {
		name: string;
		element: Element;
		matches: Element[];
		existsOnDcr: T;
	};

	const components: OphanComponent[] = frontend.map((element) => {
		const name = element.getAttribute(attribute);
		if (!name) throw new Error('Invalid name');

		const tag = element.tagName;
		const matches = dcr.filter(
			(element) => element.getAttribute(attribute) === name,
		);
		if (matches.some(({ tagName }) => tagName === tag)) {
			return { name, element, matches, existsOnDcr: 'identical' };
		} else if (matches.length > 0) {
			return {
				name,
				element,
				matches,
				existsOnDcr: 'tag-mismatch',
			};
		}

		return { name, element, matches: [], existsOnDcr: 'missing' };
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

[Frontend]: ${url}?dcr=false
[DCR]: ${url}?dcr=true

### Missing from DCR (${missing.length} / ${components.length})

${
	missing.length
		? missing
				.map(
					({ name, element: { tagName } }) =>
						`- [ ] **\`${name}\`** &rarr; \`<${tagName}/>\``,
				)
				.join('\n')
		: 'No missing component in DCR 🎉'
}

### Tag mismatch (${mismatches.length} / ${components.length})

${
	mismatches.length
		? mismatches
				.map(
					({ name, element: { tagName }, matches }) =>
						`- [X] **\`${name}\`** : \`<${matches.map(
							({ tagName }) => tagName,
						)} />\` &cross; should be &rarr; \`<${tagName}/>\``,
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
					({ name, element: { tagName } }) =>
						`- [X] **\`${name}\`** &rarr; \`<${tagName}/>\``,
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
