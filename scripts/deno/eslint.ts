const path = '.eslint/dotcom-rendering-report.json';

const shouldLint = Deno.args.includes('--lint');

const lint = () => {
	const process = Deno.run({
		cwd: './dotcom-rendering/',
		cmd: [
			'../node_modules/.bin/eslint',
			'.',
			...['--ext', '.ts,.tsx'],
			...['--format', 'json'],
			...['--output-file', '../' + path],
		],
	});

	return process.status();
};

if (shouldLint) await lint();

const file = Deno.readTextFileSync(path);

type LintedFile = {
	filePath: string;
	messages: Array<{
		ruleId: string;
		severity: number;
		message: string;
		line: number;
		column: number;
		nodeType: string;
		messageId: string;
		endLine: number;
		endColumn: number;
	}>;
};

const rules: LintedFile[] = JSON.parse(file);

const files = rules.map(({ filePath, messages }) => {
	const brokenRules = messages.reduce<Record<string, number>>(
		(prev, { ruleId }) => {
			const count = prev[ruleId] ?? 0;
			prev[ruleId] = count + 1;
			return prev;
		},
		{},
	);

	return {
		path: filePath.replace(Deno.cwd(), '.'),
		brokenRules,
	};
});

type Count = {
	[ruleId in string]: {
		count: number;
		files: string[];
	};
};

const counts = files.reduce<Count>((prev, { path, brokenRules }) => {
	Object.keys(brokenRules).forEach((ruleId) => {
		if (!prev[ruleId]) prev[ruleId] = { count: 0, files: [] };

		const { count, files } = prev[ruleId];
		prev[ruleId] = {
			count: count + brokenRules[ruleId],
			files: files.concat(path),
		};
	});

	return prev;
}, {});

const output = Object.entries(counts)
	.sort(([, { count: a }], [, { count: b }]) => b - a)
	.map(([ruleId, { count, files }]) => {
		return [
			'<details>',
			`<summary><code>${ruleId}</code> : <strong>${count}</strong> problems over ${files.length} files</summary>`,
			'<ul>',
			...files.slice(0, 10).map((f) => `<li>${f}</li>`),
			...(files.length > 10
				? ['<li>…and more, only first 10 files shown</li>']
				: []),
			'</ul>',
			'</details>',
		].join('\n');
	})
	.join('\n\n');

Deno.writeTextFileSync('.eslint/dotcom-report.md', output);
