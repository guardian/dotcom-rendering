import { Octokit } from "https://cdn.skypack.dev/octokit?dts";

const token = Deno.env.get("GITHUB_TOKEN");
if (!token) {
	console.warn("Missing GITHUB_TOKEN");
	Deno.exit(1);
}

// const path = Deno.env.get("GITHUB_EVENT_PATH") ?? "";
// if (!path) {
// 	console.warn("Missing GITHUB_PATH");
// 	Deno.exit(1);
// }

const octokit = new Octokit({ auth: token });
// const event = JSON.parse(Deno.readTextFileSync(path)) ?? {pull_request: {number: 4759}};
const event = {pull_request: {number: 4759}}

interface Result {
	actual: number;
	expected: number;
	passed: boolean;
	operator: string;
	auditTitle: string;
}

async function postLighthouseResults() {
  try {
    console.log("reading results...");

    const data: Result[] = JSON.parse(
      await Deno.readTextFile("dotcom-rendering/.lighthouseci/assertion-results.json")
    );

    const auditCount = data.length;
    const failedAuditCount = data.filter((result) => !result.passed).length;
	console.log("FILTERED", data);
	const resultsTemplateString = data.map(result => `| ${result.auditTitle} | ${result.passed ? '✅' : '❌'} | ${result.expected} | ${result.actual} |`);

	const comment = [
		`⚡️ Lighthouse report for the changes in this PR:`,
		'| Category | Passed | Expected | Actual |',
		'| --- | --- |--- | --- | --- |',
		...resultsTemplateString,
		' ',
		`🔥 ${failedAuditCount} of ${auditCount} audits failed.`,
	].join('\n')
	
	console.log(comment);

	await octokit.request("PATCH /repos/{owner}/{repo}/issues/{issue_number}", {
		owner: "guardian",
		repo: "dotcom-rendering",
		issue_number: event.pull_request.number,
		body: comment,
	});


  } catch (error) {
    console.error("there was an error:", error.message);
  }
}

postLighthouseResults();
