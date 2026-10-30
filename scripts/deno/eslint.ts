import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const require = createRequire(import.meta.url);
const repositoryRoot = fileURLToPath(new URL('../..', import.meta.url));
const dotcomRenderingRoot = join(repositoryRoot, 'dotcom-rendering');
const reportDirectory = join(repositoryRoot, '.eslint');
const reportPath = join(reportDirectory, 'dotcom-rendering-report.json');
const outputPath = join(reportDirectory, 'dotcom-report.md');

const shouldLint = process.argv.includes('--lint');

const lint = () => {
	mkdirSync(reportDirectory, { recursive: true });
	const eslintPackage = require.resolve('eslint/package.json');
	const eslintBin = join(dirname(eslintPackage), 'bin', 'eslint.js');
	const result = spawnSync(
		process.execPath,
		[
			eslintBin,
			'.',
			'--ext',
			'.ts,.tsx',
			'--format',
			'json',
			'--output-file',
			reportPath,
		],
		{ cwd: dotcomRenderingRoot, stdio: 'inherit' },
	);

	if (result.error) throw result.error;
	if (result.status === null || result.status > 1) {
		throw new Error(
			`ESLint failed with exit code ${result.status ?? 'unknown'}`,
		);
	}
};

if (shouldLint) lint();

const file = readFileSync(reportPath, 'utf8');

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
		path: filePath.replace(repositoryRoot, '.'),
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
			count: count + (brokenRules[ruleId] ?? 0),
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

writeFileSync(outputPath, output);
