/**
 * @file
 *
 * This script is used to generate reports of the most frequent user agents
 * making request to the Guardian’s website, using the JSON logs from Fastly.
 *
 * You need Frontend Dev credentials to make the request to Athena.
 *
 * Run with the following command to bypass permission prompts:
 * `deno run --allow-sys=osRelease --allow-env --allow-net=athena.eu-west-1.amazonaws.com --allow-read --allow-write=. ./bots.ts --date=2024-03-27`
 *
 * Note that the selected date should be within the last two weeks,
 * as older data may not be in the standard storage class.
 */

import {
  AthenaClient,
  GetQueryExecutionCommand,
  GetQueryResultsCommand,
  ResultSet,
  StartQueryExecutionCommand,
} from "npm:@aws-sdk/client-athena";
import { parseArgs } from "https://deno.land/std@0.207.0/cli/parse_args.ts";

const flags = parseArgs(Deno.args, {
	string: ["date"],
})

const date = Temporal.PlainDate.from(flags.date ?? "")

console.info("Using", date);

const client = new AthenaClient({ region: "eu-west-1" });

Deno.env.set("AWS_PROFILE", "frontend");

const { QueryExecutionId } = await client.send(
  new StartQueryExecutionCommand({
    QueryString: `SELECT
	  count(1) request_count,
	  COUNT (DISTINCT client_ip) distinct_ip_count,
	  request_user_agent
  FROM fastly_logs.fastly_www_theguardian_com_logs_json_partitioned
  WHERE year = ${date.year}
	  AND month = ${String(date.month).padStart(2, "0")}
	  AND day = ${String(date.day).padStart(2, "0")}
  GROUP BY request_user_agent
  ORDER BY request_count desc
  LIMIT ${100_000}`,
    ResultReuseConfiguration: {
      ResultReuseByAgeConfiguration: { Enabled: true, MaxAgeInMinutes: 60 },
    },
  }),
);

if (!QueryExecutionId) throw "Could not get an executing ID";

while (true) {
  const { QueryExecution } = await client.send(
    new GetQueryExecutionCommand({ QueryExecutionId }),
  );

  const state = QueryExecution?.Status?.State;
  if (state === "SUCCEEDED") {
    console.info("Finished processing");
    break;
  } else if (state === "FAILED") {
    throw "Executing failed";
  }

  const delay = state === "RUNNING" ? 2400 : 360;

  console.info(`Currently ${state}, retrying in ${delay}ms`);

  await new Promise((resolve) => setTimeout(resolve, delay));
}

const csv = await Array.fromAsync(getRows(client));

const filePath = `./${date.toString()}.csv`;

console.log("\nSaved CSV file to:", filePath);

await Deno.writeTextFile(filePath, csv.map((row) => row.join("\t")).join("\n"));

async function* getRows(client: AthenaClient) {
  let { ResultSet, NextToken } = await client.send(
    new GetQueryResultsCommand({ QueryExecutionId }),
  );

  yield* toRow(ResultSet);

  let count = ResultSet?.Rows?.length ?? 0

  while (NextToken) {
	// `\r` overwrite the existing line to prevent a long log.
	await Deno.stdout.write(new TextEncoder().encode(`\rFetched ${count.toLocaleString()} rows`));
    ({ ResultSet, NextToken } = await client.send(
      new GetQueryResultsCommand({ QueryExecutionId, NextToken }),
    ));
	count += ResultSet?.Rows?.length ?? 0;
    yield* toRow(ResultSet);
  }
}

function toRow(ResultSet?: ResultSet) {
  return ResultSet?.Rows?.map(({ Data }) =>
    Data?.flatMap(({ VarCharValue }) =>
      typeof VarCharValue === "string" ? [VarCharValue] : []
    ) ?? []
  ) ?? [];
}
