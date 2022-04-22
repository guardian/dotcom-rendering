const tags = ["data-link-name", "data-component"] as const;
type OphanAttribute = typeof tags[number];
const isOphanAttribute = (tag?: string): tag is OphanAttribute =>
	tags.includes(tag as OphanAttribute);

const attribute = Deno.args[0];
if (!isOphanAttribute(attribute)) {
	console.warn(`invalid tag: ${attribute}`);
	console.info(`Use one of [${tags.join(", ")}] instead.`);
	Deno.exit(1);
}

const URLS = {
	frontend: "https://www.theguardian.com/international?dcr=false",
	dcr: "https://www.theguardian.com/international?dcr=true",
};

const regexLinkName = /<([a-zA-Z]+)[^>]+?\bdata-link-name="(.+?)"/gi;
const regexComponent = /<([a-zA-Z]+)[^>]+?\bdata-component="(.+?)"/gi;
const tagMatch = (tag: OphanAttribute) =>
	tag === "data-link-name" ? regexLinkName : regexComponent;

const getOphanTags = (url: string, tag: OphanAttribute) =>
	fetch(url)
		.then((response) => response.text())
		.then((html) => html.matchAll(tagMatch(tag)))
		.then((matches) => [...matches].map((match) => [match[2], match[1]]));

const frontend = await getOphanTags(URLS.frontend, attribute);
const dcr = await getOphanTags(URLS.dcr, attribute);

type ExistsOnDcr = "identical" | "tag-mismatch" | "missing";
type Issue<T extends ExistsOnDcr = ExistsOnDcr> = {
	name: string;
	tag: string;
	dcrTag?: string;
	existsOnDcr: T;
};

const issues: Issue[] = frontend
	.reduce<[Set<string>, [string, string][]]>(
		([set, array], [name, tag]) => {
			if (!set.has(name)) array.push([name, tag]);
			set.add(name);
			return [set, array];
		},
		[new Set(), []]
	)[1]
	.map(([name, tag]) => {
		const fullMatch = dcr.find(
			([nameDcr, tagDcr]) => nameDcr === name && tagDcr === tag
		);
		if (fullMatch) return { name, tag, existsOnDcr: "identical" };

		const partialMatch = dcr.find(([nameDcr]) => nameDcr === name);

		if (partialMatch)
			return {
				name,
				tag,
				dcrTag: partialMatch[1],
				existsOnDcr: "tag-mismatch",
			};

		return { name, tag, existsOnDcr: "missing" };
	});

const isIssueType =
	<T extends ExistsOnDcr>(existsOnDcr: T) =>
	(issue: Issue): issue is Issue<T> =>
		issue.existsOnDcr === existsOnDcr;

const missing = issues.filter(isIssueType("missing"));
const mismatches = issues.filter(isIssueType("tag-mismatch"));
const identical = issues.filter(isIssueType("identical"));

const output = `
## Remaining Front components mismatches

Comparing the international Front between [Frontend][] & [DCR][].

Component attribute: **\`${attribute}\`**

[Frontend]: ${URLS.frontend}
[DCR]: ${URLS.dcr}

### Missing from DCR (${missing.length} / ${issues.length})

${missing
	.map(({ tag, name }) => `- [ ] **\`${name}\`** &rarr; \`<${tag}/>\``)
	.join("\n")}

### Tag mismatch (${mismatches.length} / ${issues.length})

${mismatches
	.map(
		({ tag, name, dcrTag }) =>
			`- [X] **\`${name}\`** : \`<${dcrTag} />\` &cross; should be &rarr; \`<${tag}/>\``
	)
	.join("\n")}

---

### Identical match (${identical.length} / ${issues.length})

${identical
	.map(({ tag, name }) => `- [X] **\`${name}\`** &rarr; \`<${tag}/>\``)
	.join("\n")}
`;

await Deno.stdout.write(new TextEncoder().encode(output));
