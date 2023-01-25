import { octokit } from './github.ts';
import type { EventPayloadMap } from 'https://cdn.skypack.dev/@octokit/webhooks-types?dts';
import 'https://raw.githubusercontent.com/GoogleChrome/lighthouse-ci/v0.8.2/types/assert.d.ts';

/* -- Setup -- */

/** Path for workflow event */
const path = Deno.env.get('GITHUB_EVENT_PATH');
if (!path) throw new Error('Missing GITHUB_EVENT_PATH');

/**
 * https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads
 */
const payload: EventPayloadMap['push' | 'pull_request'] = JSON.parse(
	Deno.readTextFileSync(path),
);

const isPullRequestEvent = (
	payload: EventPayloadMap[keyof EventPayloadMap],
): payload is EventPayloadMap['pull_request'] =>
	//@ts-expect-error -- We’re actually checking the type
	typeof payload?.pull_request?.number === 'number';

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
const issue_number = isPullRequestEvent(payload)
	? // If PullRequestEvent
	  payload.pull_request.number
	: // If PushEvent
	  4584;

console.log(`Using issue #${issue_number}`);

/** The Lighthouse results directory  */
const dir = 'dotcom-rendering/.lighthouseci';

/** https://github.com/GoogleChrome/lighthouse-ci/blob/5963dcce0e88b8d3aedaba56a93ec4b93cf073a1/packages/utils/src/assertions.js#L15-L30 */
interface AssertionResult {
	url: string;
	name:
		| keyof Omit<LHCI.AssertCommand.AssertionOptions, 'aggregationMethod'>
		| 'auditRan';
	operator: string;
	expected: number;
	actual: number;
	values: number[];
	passed: boolean;
	level?: LHCI.AssertCommand.AssertionFailureLevel;
	auditId?: string;
	auditProperty?: string;
	auditTitle?: string;
	auditDocumentationLink?: string;
	message?: string;
}
const results: AssertionResult[] = JSON.parse(
	Deno.readTextFileSync(`${dir}/assertion-results.json`),
);

/* -- Definitions -- */

/** The string to search for when looking for a comment */
const IDENTIFIER_COMMENT = `<-- url: ${Deno.env.get('LHCI_URL')} -->`;
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

const generateAuditTable = (
	auditUrl: string,
	results: AssertionResult[],
): string => {
	const resultsTemplateString = results.map(
		({ auditTitle, auditProperty, passed, expected, actual, level }) =>
			`| ${auditTitle ?? auditProperty ?? 'Unknown Test'} | ${getStatus(
				passed,
				level,
			)} | ${expected} | ${formatNumber(expected, actual)} |`,
	);

	const [, testUrlClean] = Deno.env.get('LHCI_URL').split('?url=');

	const table = [
		`> tested url \`${testUrlClean}\``,
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
	const reportUrl = results[0].url;

	const [endpoint] = Deno.env.get('LHCI_URL').split('?url=');

	return [
		IDENTIFIER_COMMENT,
		`## ⚡️ Lighthouse report for the changes in this PR`,
		`### [Report for ${endpoint.split('/').slice(-1)}](${reportUrl})`,
		failedAuditCount > 0
			? `⚠️ Budget exceeded for ${failedAuditCount} of ${auditCount} audits.`
			: 'All audits passed',
		generateAuditTable(reportUrl, results),
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
