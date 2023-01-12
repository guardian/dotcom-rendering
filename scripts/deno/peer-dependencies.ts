import { octokit } from './github.ts';

const peers = async () => {
	// yarn install --check-files
	const process = Deno.run({
		cwd: './dotcom-rendering/',
		cmd: ['make', 'reinstall'],
		stdout: 'null',
		stderr: 'piped',
	});

	const [{ code }, rawOutput] = await Promise.all([
		process.status(),
		process.stderrOutput(),
	]);
	if (code !== 0) Deno.exit(code);

	return new TextDecoder()
		.decode(rawOutput)
		.split('\n')
		.filter((line) => line.includes('has incorrect peer dependency'))
		.map((line) => line.replace(/workspace-aggregator-[a-z0-9-]+ > /, ''));
};

const { dcr, ar, cr } = (await peers())
	.map((line) => {
		const matches = line.match(
			/warning "(.+?) > (.+?)" has incorrect peer dependency "(.+)"./,
		);
		if (!matches) throw new Error('Invalid string');

		const [, workspace, dependency, peer] = matches;

		return { workspace, dependency, peer };
	})
	.reduce<{ dcr: string[]; cr: string[]; ar: string[] }>(
		(acc, { workspace, dependency, peer }) => {
			const line = `- [ ] \`${dependency}\` requires peer \`${peer}\``;
			switch (workspace) {
				case '@guardian/dotcom-rendering':
					return {
						...acc,
						dcr: acc.dcr.concat(line),
					};

				case '@guardian/common-rendering ':
					return {
						...acc,
						cr: acc.cr.concat(line),
					};

				case '@guardian/apps-rendering ':
					return {
						...acc,
						ar: acc.ar.concat(line),
					};
				default:
					return acc;
			}
		},
		{ dcr: [], cr: [], ar: [] },
	);
// .sort(({ workspace: a }, { workspace: b }) => a.localeCompare(b));

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
