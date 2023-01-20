import { octokit } from './github.ts';

const peers = async (cwd: string) => {
	const process = Deno.run({
		cwd,
		cmd: ['yarn', '--force'],
		stdout: 'null',
		stderr: 'piped',
	});

	const [{ code }, rawOutput] = await Promise.all([
		process.status(),
		process.stderrOutput(),
	]);

	if (code !== 0) Deno.exit(code);

	const deps = new TextDecoder()
		.decode(rawOutput)
		.split('\n')
		// keep only incorrect peer dependencies warnings
		.filter((line) => line.includes('has incorrect peer dependency'))
		// strip out the workspace-aggregator-xyz-012 prefixes
		.map((line) => line.replace(/workspace-aggregator-[a-z0-9-]+ > /, ''))
		// apps-rendering are not part of the workspace
		.map((line) => line.replace('" >', '"@guardian/apps-rendering >'));

	return deps;
};

type Workspaces = { dcr: string[]; cr: string[]; ar: string[] };
const initialValue: Workspaces = { dcr: [], cr: [], ar: [] };

const mismatches = (await Promise.all(['.', './apps-rendering'].map(peers)))
	.flat()
	.map((line) => {
		const matches = line.match(
			/warning "(.*?) > (.+?)" has incorrect peer dependency "(.+)"./,
		);
		if (!matches) throw new Error('Invalid string');

		const [, workspace, dependency, peer] = matches;

		return { workspace, dependency, peer };
	});

if (Deno.args[0] === '--ci') {
	/** The following peer deps have known issues */
	const knownErrors = [
		'@guardian/discussion-rendering@10.1.1', // apps-rendering should bump to v12
		'@guardian/eslint-plugin-source-react-components@9.0.0', // apps-rendering should bump to v11
		'@guardian/braze-components@8.1.3', // This should be fixed upstream to accept newer versions of @guardian/source-react-components-development-kitchen
		'webpack-filter-warnings-plugin@1.2.1', // this plugin is no longer needed in Webpack 5: https://github.com/mattlewis92/webpack-filter-warnings-plugin/pull/26#issuecomment-758802442
		'@guardian/discussion-rendering@11.0.3', // dotcom-rendering should bump to v12
		'@guardian/atoms-rendering@25.1.1', // I don’t think TS 4.8.4 was picked for any particular reason https://github.com/guardian/atoms-rendering/commit/9a95286f0b286d0392bcac022c83bcc6aca51ac8#diff-7ae45ad102eab3b6d7e7896acd08c427a9b25b346470d7bc6507b6481575d519R148
		'@guardian/types@9.0.1', // the @guardian/types are now part of libs, but until common-rendering is removed, this is bound to stick around
	];

	const worryingErrors = mismatches
		// Ignore @guardian/common-rendering package
		.filter(({ workspace }) => workspace !== '@guardian/common-rendering')
		.filter(({ dependency }) => !knownErrors.includes(dependency));

	if (worryingErrors.length > 0) {
		console.error(
			'The following peer dependencies mismatches must be resolved:',
		);
		console.warn(worryingErrors);
		Deno.exit(worryingErrors.length);
	} else {
		console.info('No new peer dependencies mismatch!');
		Deno.exit();
	}
}

const { dcr, ar, cr } = mismatches.reduce<Workspaces>(
	(acc, { workspace, dependency, peer }) => {
		const line = `- [ ] \`${dependency}\` requires peer \`${peer}\``;
		switch (workspace) {
			case '@guardian/dotcom-rendering':
				return {
					...acc,
					dcr: acc.dcr.concat(line),
				};

			case '@guardian/common-rendering':
				return {
					...acc,
					cr: acc.cr.concat(line),
				};

			case '@guardian/apps-rendering':
				return {
					...acc,
					ar: acc.ar.concat(line),
				};
			default:
				return acc;
		}
	},
	initialValue,
);

const body = `## Current peer dependencies mismatch

### dotcom-rendering
${dcr.length ? dcr.join('\n') : '- [X] all peer deps matched!'}

### apps-rendering
${ar.length ? ar.join('\n') : '- [X] all peer deps matched!'}

### common-rendering
${cr.length ? cr.join('\n') : '- [X] all peer deps matched!'}
`;

if (!octokit) {
	console.log(body);
	Deno.exit();
}

/** https://github.com/guardian/dotcom-rendering/issues/6945 */
const issue_number = 6945;

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
	// do_something
	console.warn(`Failed to update issue #${issue_number}`);
	console.error(error);

	console.log(body);
}

Deno.exit();
