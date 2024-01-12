import { octokit } from "./github.ts";

const get_pulls = async (page: number) => {
  if (!octokit) throw Error("No Octokit");

  const { data: pulls } = await octokit.request(
    "GET /repos/{owner}/{repo}/pulls",
    {
      owner: "guardian",
      repo: "dotcom-rendering",
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
      per_page: 100,
      state: "closed",
      sort: "updated",
      direction: "desc",
      page,
    },
  );

  return pulls;
};

async function* get_all_pulls(max_page: number) {
  let page = 1;
  const pulls = await get_pulls(page++);

  while (page <= max_page) {
    if (pulls.length === 0) {
      pulls.push(...(await get_pulls(page++)));
    }
    const pull = pulls.shift();
    if (!pull) return;
    yield pull;
  }
}

const dates = new Map<string, number>();

for await (const pull of get_all_pulls(20)) {
  if (!pull.merged_at) continue;
  const date = pull.merged_at.slice(0, 10);
  const count = dates.get(date) ?? 0;
  dates.set(date, count + 1);
}

for (const [date, count] of dates) {
  console.log(`${date}\t${count}`);
}
