import { parseArgs } from "node:util";
import { getApiTokenFromEnv, getConfigFromEnv } from "../../lib/config.ts";
import { FastlyClient } from "../../lib/fastly/client.ts";
import { deployABTests } from "./deploy-ab-tests.ts";
import { deployMVTs } from "./deploy-mvts.ts";

const flags = parseArgs({
	args: process.argv.slice(2),
	options: {
		mvts: {
			type: "string",
			short: "m",
		},
		"ab-tests": {
			type: "string",
			short: "a",
		},
	},
}).values;

if (!flags["mvts"] || !flags["ab-tests"]) {
	console.error(
		"Please provide the path to the mvt and ab test groups dictionaries",
	);
	process.exit(1);
}
const { serviceId, serviceName, abTestsDictionaryName, mvtDictionaryName } =
	getConfigFromEnv();

const fastly = new FastlyClient(getApiTokenFromEnv());

const service = await fastly.getService(serviceId, serviceName);

const abTestDictionary = await service.getDictionary(abTestsDictionaryName);
const mvtDictionary = await service.getDictionary(mvtDictionaryName);

await Promise.all([
	deployABTests(flags["ab-tests"], abTestDictionary),
	deployMVTs(flags["mvts"], mvtDictionary),
]);

console.log("Successfully updated ab test groups and mvt groups dictionaries");
