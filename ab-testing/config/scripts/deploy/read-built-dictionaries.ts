import { readFile } from "fs/promises";
import { array, assert, object, string } from "superstruct";

const fastlyKVStruct = object({
	item_key: string(),
	item_value: string(),
});

const getUpdatedABTestGroups = async (file: string) => {
	const updatedABTestGroups = JSON.parse(
		await readFile(file, {
			encoding: "utf-8",
		}),
	) as unknown;

	assert(updatedABTestGroups, array(fastlyKVStruct));

	return updatedABTestGroups;
};

const getMVTGroups = async (file: string) => {
	const mvtGroups = JSON.parse(
		await readFile(file, {
			encoding: "utf-8",
		}),
	) as unknown;

	assert(mvtGroups, array(fastlyKVStruct));
	return mvtGroups;
};

export { getUpdatedABTestGroups, getMVTGroups };
