import { Octokit } from "https://cdn.skypack.dev/octokit?dts";
import type { RestEndpointMethodTypes } from "https://cdn.skypack.dev/@octokit/plugin-rest-endpoint-methods?dts";

const token = Deno.env.get("GITHUB_TOKEN");
if (!token) {
	console.warn("Missing GITHUB_TOKEN");
	Deno.exit(1);
}

const path = Deno.env.get("GITHUB_EVENT_PATH");
if (!path) {
	console.warn("Missing GITHUB_EVENT_PATH");
	Deno.exit(1);
}

console.log(path);

const MAGIC_STRING = "⚡️ Lighthouse report";

const octokit = new Octokit({ auth: token });

const {
	createComment,
	updateComment,
}: {
	createComment: (
		arg: RestEndpointMethodTypes["issues"]["createComment"]["parameters"]
	) => Promise<
		RestEndpointMethodTypes["issues"]["createComment"]["response"]
	>;
	updateComment: (
		arg: RestEndpointMethodTypes["issues"]["updateComment"]["parameters"]
	) => Promise<
		RestEndpointMethodTypes["issues"]["updateComment"]["response"]
	>;
} = octokit.rest.issues;

/**
 * https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads
 */
const event: {
	action: string;
	sender: Record<string, unknown>;
	repository: Record<string, unknown>;
	organization: Record<string, unknown>;
	installation: Record<string, unknown>;
	issue?: { number: number };
	pull_request?: { number: number };
	number?: number;
} = JSON.parse(Deno.readTextFileSync(path));
console.log(event);
const issue_number = (event.issue ?? event.pull_request ?? event).number;

console.log({ issue_number });

const GIHUB_PARAMS = {
	owner: "guardian",
	repo: "dotcom-rendering",
	issue_number,
};
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

const dir = "dotcom-rendering/.lighthouseci";

const info: Record<string, string> = JSON.parse(
	Deno.readTextFileSync(`${dir}/links.json`)
);

const generateAuditTable = (auditUrl: string, results: Result[]): string => {
	const reportUrl = info[auditUrl];

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
	const data: Result[] = JSON.parse(
		Deno.readTextFileSync(`${dir}/assertion-results.json`)
	);

	const auditCount = data.length;
	const failedAuditCount = data.filter((result) => !result.passed).length;
	const auditUrls = [...new Set<string>(data.map((result) => result.url))];

	return [
		`## ${MAGIC_STRING} for the changes in this PR`,
		`Lighthouse tested ${auditUrls.length} URLs  `,
		failedAuditCount > 1 &&
			`⚠️ Budget exceeded for ${failedAuditCount} of ${auditCount} audits.`,
		...auditUrls.map((url) =>
			generateAuditTable(
				url,
				data.filter((result) => result.url === url)
			)
		),
	].join("\n\n");
};

const getCommentID = async (): Promise<number | null> => {
	const {
		data: comments,
	}: RestEndpointMethodTypes["issues"]["listComments"]["response"] = await octokit.rest.issues.listComments(
		{
			...GIHUB_PARAMS,
		}
	);

	const comment = comments.find((comment) =>
		comment.body?.includes(MAGIC_STRING)
	);

	return comment?.id ?? null;
};

try {
	const body = createLighthouseResultsMd();
	const comment_id = await getCommentID();

	comment_id
		? await updateComment({
				...GIHUB_PARAMS,
				comment_id,
				body,
		  })
		: await createComment({
				...GIHUB_PARAMS,
				body,
		  });
} catch (error) {
	console.error("there was an error:", error.message);
}
