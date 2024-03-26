import {
  AthenaClient,
  GetQueryExecutionCommand,
  GetQueryResultsCommand,
  StartQueryExecutionCommand,
} from "npm:@aws-sdk/client-athena";

const client = new AthenaClient({ region: "eu-west-1" });

Deno.env.set("AWS_PROFILE", "frontend");

const date = "2024-03-20";

const [year, month, day] = date.split("-");

const { QueryExecutionId } = await client.send(
  new StartQueryExecutionCommand({
    QueryString: `SELECT
	  count(1) request_count,
	  COUNT (DISTINCT client_ip) distinct_ip_count,
	  request_user_agent
  FROM fastly_logs.fastly_www_theguardian_com_logs_json_partitioned
  WHERE year = ${year}
	  AND month = ${month}
	  AND day = ${day}
  GROUP BY request_user_agent
  ORDER BY request_count desc
  LIMIT 100`,
    ResultReuseConfiguration: {
      ResultReuseByAgeConfiguration: { Enabled: true, MaxAgeInMinutes: 60 },
    },
  }),
);

if (!QueryExecutionId) throw "Could not get an executing ID";

console.info({ QueryExecutionId });

while (true) {
  const { QueryExecution } = await client.send(
    new GetQueryExecutionCommand({ QueryExecutionId }),
  );

  if (QueryExecution?.Status?.State === "SUCCEEDED") break;

  console.info(QueryExecution?.Status);

  await new Promise((resolve) => setTimeout(resolve, 360));
}

const { ResultSet } = await client.send(
  new GetQueryResultsCommand({ QueryExecutionId }),
);

if (!ResultSet) throw "Could not get a result";

const csv =
  ResultSet.Rows?.map(({ Data }) =>
    Data?.map(({ VarCharValue }) => VarCharValue).join(",\t")
  ).join("\n") ?? "";

console.log("\n\n");
console.log(csv);

await Deno.writeTextFile(`./${date}.csv`, csv);
