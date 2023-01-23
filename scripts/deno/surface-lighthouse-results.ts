import { octokit } from './github.ts';
import { record, string } from 'npm:zod@3';
import 'https://raw.githubusercontent.com/GoogleChrome/lighthouse-ci/v0.10.0/types/assert.d.ts';

/**
 * One of two values depending on the workflow trigger event
 *
 * - on a "pull_request" event: the current Issue / PR number
 * on which to add or update the Lighthouse report
 *
 * - on a "push" event: the original issue to track the latest report:
 * https://github.com/guardian/dotcom-rendering/issues/4584, which allows
 * to track the state Lighthouse CI Reports on `main` over time.
 */
const issue_number = parseInt(Deno.env.get('ISSUE') || '4584');

console.log(`Using issue #${issue_number}`);

/** The Lighthouse results directory  */
const dir = 'dotcom-rendering/.lighthouseci';

type AssertionResult = LHCI.AssertResults.AssertionResult;
const results: AssertionResult[] = JSON.parse(
	await Deno.readTextFile(`${dir}/assertion-results.json`),
);

const testUrl = new URL(Deno.env.get('LHCI_URL') ?? 'http://localhost:9000/');
const testUrlWithoutHash = testUrl.href.replace(/#.+$/, '');

const reportURL = record(string()).parse(
	JSON.parse(await Deno.readTextFile(`${dir}/links.json`)),
)[testUrlWithoutHash];

if (!reportURL) throw new Error('Could not find report URL');

/* -- Definitions -- */

/** The string to search for when looking for a comment */
const IDENTIFIER_COMMENT = `<!-- url: ${testUrl} -->`;
const GIHUB_PARAMS = {
	owner: 'guardian',
	repo: 'dotcom-rendering',
	issue_number,
} as const;

/* -- Methods -- */

/** If large number, round to 0 decimal, if small, round to 6 decimal points */
const formatNumber = (expected: number, actual: number): string =>
	expected > 100 ? Math.ceil(actual).toString() : actual.toFixed(6);

const getStatus = (
	passed: boolean,
	level: AssertionResult['level'],
): '✅' | '⚠️' | '❌' => {
	if (passed) return '✅';

	switch (level) {
		case 'off':
		case 'warn':
			return '⚠️';
		case 'error':
		default:
			return '❌';
	}
};

const generateAuditTable = (results: AssertionResult[]): string => {
	const resultsTemplateString = results.map(
		({ auditTitle, auditProperty, passed, expected, actual, level }) =>
			`| ${auditTitle ?? auditProperty ?? 'Unknown Test'} | ${getStatus(
				passed,
				level,
			)} | ${expected} | ${formatNumber(expected, actual)} |`,
	);

	const testedUrl = testUrl.searchParams.get('url') ?? '😪';

	const table = [
		`> tested url \`${testedUrl}\``,
		'',
		'| Category | Status | Expected | Actual |',
		'| --- | --- | --- | --- |',
		...resultsTemplateString,
	].join('\n');

	return table;
};

const createLighthouseResultsMd = (): string => {
	const auditCount = results.length;
	const failedAuditCount = results.filter((result) => !result.passed).length;

	return [
		IDENTIFIER_COMMENT,
		`## ⚡️ Lighthouse report for the changes in this PR`,
		`### [Report for ${testUrl.pathname}](${reportURL})`,
		failedAuditCount > 0
			? `⚠️ Budget exceeded for ${failedAuditCount} of ${auditCount} audits.`
			: 'All audits passed',
		generateAuditTable(results),
	].join('\n\n');
};

const getCommentID = async (): Promise<number | null> => {
	if (!octokit) return null;
	const { data: comments } = await octokit.rest.issues.listComments({
		...GIHUB_PARAMS,
	});

	const comment = comments.find((comment) =>
		comment.body?.includes(IDENTIFIER_COMMENT),
	);

	return comment?.id ?? null;
};

const body = createLighthouseResultsMd();

if (!octokit) {
	console.log(body);
	Deno.exit();
}

try {
	const comment_id = await getCommentID();

	const { data } = comment_id
		? await octokit.rest.issues.updateComment({
				...GIHUB_PARAMS,
				comment_id,
				body,
		  })
		: await octokit.rest.issues.createComment({
				...GIHUB_PARAMS,
				body,
		  });

	console.log(
		`Successfully ${
			comment_id ? 'updated' : 'created'
		} Lighthouse report comment`,
	);
	console.log('See:', data.html_url);
	Deno.exit();
} catch (error: unknown) {
	if (!(error instanceof Error)) {
		console.error('Unknown error:', String(error));
		Deno.exit(1);
	}

	// Dependabot integration does not have the permission to update comments
	if (error.message === 'Resource not accessible by integration') {
		console.warn('Failed to update the comment', error);
		Deno.exit();
	}

	throw error;
}
