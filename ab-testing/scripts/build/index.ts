import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { parseArgs } from "node:util";
import { activeABtests } from "../../abTests.ts";
import {
	mvtDictionaryId,
	mvtDictionaryName,
	serviceId,
	serviceName,
} from "../../lib/config.ts";
import { FastlyClient } from "../../lib/fastly/client.ts";
import { parseMVTValue, stringifyMVTValue } from "../../lib/fastly-subfield.ts";
import { buildABTestGroupKeyValues } from "./build-ab-tests-dict.ts";
import { calculateAllSpaceUpdates } from "./calculate-mvt-updates.ts";

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

const fastly = new FastlyClient(process.env.FASTLY_API_TOKEN ?? "");

const service = await fastly.getService(serviceId, serviceName);

const mvtGroupsDictionary = await service.getDictionary(
	mvtDictionaryId,
	mvtDictionaryName,
);

const mvtGroupsDictionaryItems = await mvtGroupsDictionary.getItems();

const mvtGroups = new Map(
	mvtGroupsDictionaryItems.map(({ item_key, item_value }) => {
		const testGroups = parseMVTValue(item_value);
		return [item_key, testGroups];
	}),
);

const abTestGroupKeyValues = buildABTestGroupKeyValues(activeABtests);

const mvtIdKeyValues = calculateAllSpaceUpdates(mvtGroups, activeABtests);

const mvtDictArray = Array.from(
	mvtIdKeyValues.entries().map(([key, value]) => ({
		item_key: key,
		item_value: stringifyMVTValue(value),
	})),
);

console.log(`Writing ${mvtDictArray.length} MVT groups to ${flags["mvts"]}`);

// Ensure the build's destination folder path exists
for (const path of [flags["mvts"], flags["ab-tests"]]) {
	await mkdir(dirname(path), { recursive: true });
}

// write the abTestDictArray to a file
await writeFile(
	flags["ab-tests"],
	JSON.stringify(abTestGroupKeyValues, null, 2),
);

// write the mvtKVsArray to a file
await writeFile(flags["mvts"], JSON.stringify(mvtDictArray, null, 2));
