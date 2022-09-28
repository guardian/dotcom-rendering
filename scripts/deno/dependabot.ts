/**
 * A regex to filter matching branches
 */
const REGEX = Deno.args[0];

const process = Deno.run({
	cmd: [
		'git',
		'branch',
		'-r',
		'--list',
		'origin/dependabot/*',
		'--no-merged',
	],
	stdout: 'piped',
});

const branches = new TextDecoder()
	.decode(await process.output())
	.split('\n')
	.map((line) => line.trim())
	.filter((branch) => branch.match(REGEX));

console.warn('About to merge the following branches:', branches);

const shouldProceed = confirm('Do you want to merge these branches?');
if (!shouldProceed) {
	console.info('Not merging anything');
	Deno.exit();
}

for (const branch of branches) {
	const process = Deno.run({
		cmd: ['git', 'merge', branch],
	});
	const { code } = await process.status();
	if (code !== 0) Deno.exit(code);
	console.info('merged', branch.split('/').at(-1));
}

Deno.exit();
