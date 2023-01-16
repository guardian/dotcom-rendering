import pkg from '../../dotcom-rendering/package.json' assert { type: 'json' };
import { octokit } from './github.ts';

const prefix = '@types/';

/**
 * We only look at major.minor versions as per DefinitelyTyped docs:
 * https://github.com/DefinitelyTyped/DefinitelyTyped#how-do-definitely-typed-package-versions-relate-to-versions-of-the-corresponding-library
 */
const majorMinorVersions = Object.entries(pkg.dependencies).map(
	([dependency, version]) =>
		[dependency, version.match(/(\d+\.\d+)/)?.at(0)] as const,
);

const dependencies = majorMinorVersions
	.filter(([dependency]) => dependency.startsWith(prefix))
	.map(([dependency, version]) => ({
		main: majorMinorVersions.find(
			([dep]) => dep === dependency.replace(prefix, ''),
		),
		type: [dependency, version] as const,
	}));

const body = `## Audit of \`@types/\` packages

### No main package found
${dependencies
	.filter(({ main }) => main === undefined)
	.map(
		({ type: [dependency, version] }) =>
			`- [ ] \`${dependency}\` – ${version}`,
	)
	.join('\n')}

### Mismatched versions
${dependencies
	.filter(({ main, type }) => main !== undefined && main[1] !== type[1])
	.map(
		({ main, type }) =>
			`- [ ] \`${main?.[0]}\` – ${main?.[1]} (types ${type[1]})`,
	)
	.join('\n')}

### Matched dependencies
${dependencies
	.filter(({ main, type }) => main !== undefined && main[1] === type[1])
	.map(({ main }) => `- [X] \`${main?.[0]}\` – ${main?.[1]}`)
	.join('\n')}
`;

if (!octokit) {
	console.log(body);
	Deno.exit();
}

/** https://github.com/guardian/dotcom-rendering/issues/6965 */
const issue_number = 6965;

try {
	const {
		data: { html_url },
	} = await octokit.rest.issues.update({
		owner: 'guardian',
		repo: 'dotcom-rendering',
		issue_number,
		body,
	});

	console.info(`Updated list of issues for dotcom-rendering#${issue_number}`);
	console.info(html_url);
} catch (error) {
	console.warn(`Failed to update issue #${issue_number}`);
	console.error(error);

	console.log(body);
}

Deno.exit();
