import { Octokit } from "https://cdn.skypack.dev/octokit?dts";
import type { RestEndpointMethodTypes } from "https://cdn.skypack.dev/@octokit/plugin-rest-endpoint-methods?dts";

const token = Deno.env.get("GITHUB_TOKEN");
if (!token) {
	console.warn("Missing GITHUB_TOKEN");
	Deno.exit(1);
}

const path = Deno.env.get("GITHUB_EVENT_PATH");
if (!path) {
	console.warn("Missing GITHUB_PATH");
	Deno.exit(1);
}

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

const event = JSON.parse(Deno.readTextFileSync(path));
const issue_number = event.pull_request.number;

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
}

const createLighthouseResultsMd = (): string => {
	const data: Result[] = JSON.parse(
		Deno.readTextFileSync(
			"dotcom-rendering/.lighthouseci/assertion-results.json"
		)
	);

	const auditCount = data.length;
	const failedAuditCount = data.filter((result) => !result.passed).length;
	const resultsTemplateString = data.map(
		(result) =>
			`| ${result.auditTitle} | ${result.passed ? "✅" : "❌"} | ${
				result.expected
			} | ${result.actual} |`
	);

	return [
		`${MAGIC_STRING} for the changes in this PR:`,
		"| Category | Passed | Expected | Actual |",
		"| --- | --- | --- | --- |",
		...resultsTemplateString,
		" ",
		failedAuditCount > 1 &&
			`⚠️ Budget exceeded for ${failedAuditCount} of ${auditCount} audits.`,
	].join("\n");
};

const getCommentID = async (): Promise<number | null> => {
	const {
		data: comments,
	}: RestEndpointMethodTypes["issues"]["listComments"]["response"] = await octokit.rest.issues.listComments(
		{
			...GIHUB_PARAMS,
		}
	);

	console.log(comments);

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
