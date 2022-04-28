import { Octokit } from "https://cdn.skypack.dev/octokit?dts";

type Comment = {
  body: string;
  id: number;
};

type ListCommentResponse = {
  data: Comment[];
};

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
// const event = JSON.parse(Deno.readTextFileSync(path));
const event = { pull_request: { number: 4759 } };
const issue_number = event.pull_request.number;
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
      "dotcom-rendering/.lighthouseci/assertion-results.json",
    ),
  );

  const auditCount = data.length;
  const failedAuditCount = data.filter((result) => !result.passed).length;
  const resultsTemplateString = data.map((result) =>
    `| ${result.auditTitle} | ${
      result.passed ? "✅" : "❌"
    } | ${result.expected} | ${result.actual} |`
  );

  return [
    `⚡️ Lighthouse report for the changes in this PR:`,
    "| Category | Passed | Expected | Actual |",
    "| --- | --- | --- | --- |",
    ...resultsTemplateString,
    " ",
    `🔥 ${failedAuditCount} of ${auditCount} audits failed.`,
  ].join("\n");
};

const getCommentID = async (): Promise<number | null> => {
  const { data: comments }: ListCommentResponse = await octokit.rest.issues
    .listComments({
      owner: "guardian",
      repo: "dotcom-rendering",
      issue_number: 4759,
    });

  console.log(comments);

  const comment = comments.find(
    (comment) => comment.body.includes("⚡️ Lighthouse report"),
  );

  return comment?.id ?? null;
};

try {
  const lighthouseResults = createLighthouseResultsMd();
  const commentID = await getCommentID();

  commentID
    ? await octokit.rest.issues.updateComment({
      owner: "guardian",
      repo: "dotcom-rendering",
      comment_id: commentID,
      body: lighthouseResults,
    })
    : await octokit.rest.issues.createComment({
      owner: "guardian",
      repo: "dotcom-rendering",
      issue_number,
      body: lighthouseResults,
    });
} catch (error) {
  console.error("there was an error:", error.message);
}
