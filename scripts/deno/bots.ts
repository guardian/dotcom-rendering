import {
  AthenaClient,
  GetQueryExecutionCommand,
  GetQueryResultsCommand,
  StartQueryExecutionCommand,
} from "npm:@aws-sdk/client-athena";

const date = Temporal.Now.plainDateISO().subtract(
  Temporal.Duration.from({ days: 3 }),
);

console.log("Three days ago:", date.toString());

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
  LIMIT 100`,
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

const { ResultSet } = await client.send(
  new GetQueryResultsCommand({ QueryExecutionId }),
);

if (!ResultSet) throw "Could not get a result";

const csv =
  ResultSet.Rows?.map(({ Data }) =>
    Data?.map(({ VarCharValue }) => VarCharValue).join(",\t")
  ).join("\n") ?? "";

const filePath = `./${date.toString()}.csv`;

console.log("\nSaved CSV file to:", filePath);

await Deno.writeTextFile(filePath, csv);
