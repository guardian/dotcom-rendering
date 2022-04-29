import { Octokit } from "https://cdn.skypack.dev/octokit?dts";
import type { RestEndpointMethodTypes } from "https://cdn.skypack.dev/@octokit/plugin-rest-endpoint-methods?dts";

/* -- Setup -- */

/** Github token for Authentication */
const token = Deno.env.get("GITHUB_TOKEN");
if (!token) throw new Error("Missing GITHUB_TOKEN");

/** Path for workflow event */
const path = Deno.env.get("GITHUB_EVENT_PATH");
if (!path) throw new Error("Missing GITHUB_EVENT_PATH");

/**
 * https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads
 */
const payload: {
	action: string;
	sender: Record<string, unknown>;
	repository: Record<string, unknown>;
	organization: Record<string, unknown>;
	installation: Record<string, unknown>;
	issue?: { number: number };
	pull_request?: { number: number };
	number?: number;
} = JSON.parse(Deno.readTextFileSync(path));
/**
 * The Current Issue / PR number for adding a Lighthouse report
 * On push to the main branch, defaults to the original issue:
 * https://github.com/guardian/dotcom-rendering/issues/4584
 */
const issue_number =
	(payload.issue ?? payload.pull_request ?? payload).number ?? 4584;

/** The Lighthouse results directory  */
const dir = "dotcom-rendering/.lighthouseci";

const links: Record<string, string> = JSON.parse(
	Deno.readTextFileSync(`${dir}/links.json`)
);

interface Result {
	actual: number;
	expected: number;
	passed: boolean;
	operator: string;
	auditTitle: string;
	name: string;
	values: number[];
	level: string;
	url: string;
	auditDocumentationLink: string;
}
const results: Result[] = JSON.parse(
	Deno.readTextFileSync(`${dir}/assertion-results.json`)
);

/* -- Definitions -- */

/** The string to search for when looking for a comment */
const MAGIC_STRING = "⚡️ Lighthouse report";
const GIHUB_PARAMS = {
	owner: "guardian",
	repo: "dotcom-rendering",
	issue_number,
};

const octokit = new Octokit({ auth: token }) as {
	rest: {
		issues: {
			[Method in keyof RestEndpointMethodTypes["issues"]]: (
				arg: RestEndpointMethodTypes["issues"][Method]["parameters"]
			) => Promise<RestEndpointMethodTypes["issues"][Method]["response"]>;
		};
	};
};

/* -- Methods -- */

const generateAuditTable = (auditUrl: string, results: Result[]): string => {
	const reportUrl = links[auditUrl];

	const resultsTemplateString = results.map(
		(result) =>
			`| ${result.auditTitle} | ${result.passed ? "✅" : "❌"} | ${
				result.expected
			} | ${result.actual} |`
	);

	const [endpoint, testUrlClean] = auditUrl.split("?url=");

	const table = [
		`### [Report for ${endpoint.split("/").slice(-1)}](${reportUrl})`,
		`> tested url \`${testUrlClean}\``,
		"",
		"| Category | Status | Expected | Actual |",
		"| --- | --- | --- | --- |",
		...resultsTemplateString,
		"",
	].join("\n");

	return table;
};

const createLighthouseResultsMd = (): string => {
	const auditCount = results.length;
	const failedAuditCount = results.filter((result) => !result.passed).length;
	const auditUrls = [...new Set<string>(results.map((result) => result.url))];

	return [
		`## ${MAGIC_STRING} for the changes in this PR`,
		`Lighthouse tested ${auditUrls.length} URLs  `,
		failedAuditCount > 1 &&
			`⚠️ Budget exceeded for ${failedAuditCount} of ${auditCount} audits.`,
		...auditUrls.map((url) =>
			generateAuditTable(
				url,
				results.filter((result) => result.url === url)
			)
		),
	].join("\n\n");
};

const getCommentID = async (): Promise<number | null> => {
	const { data: comments } = await octokit.rest.issues.listComments({
		...GIHUB_PARAMS,
	});

	const comment = comments.find((comment) =>
		comment.body?.includes(MAGIC_STRING)
	);

	return comment?.id ?? null;
};

try {
	const body = createLighthouseResultsMd();
	const comment_id = await getCommentID();

	comment_id
		? await octokit.rest.issues.updateComment({
				...GIHUB_PARAMS,
				comment_id,
				body,
		  })
		: await octokit.rest.issues.createComment({
				...GIHUB_PARAMS,
				body,
		  });
} catch (error) {
	if (error instanceof Error) throw error;

	console.error("there was an error:", error.message);
	Deno.exit(1);
}
