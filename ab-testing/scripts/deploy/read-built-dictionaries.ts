import { readTextFile } from 'jsr:@std/fs/unstable-read-text-file';
import { object, string, assert, array } from 'jsr:@superstruct/core';

const fastlyKVStruct = object({
	item_key: string(),
	item_value: string(),
});

const getUpdatedABTestGroups = async (file: string) => {
	const updatedABTestGroups = JSON.parse(await readTextFile(file));

	assert(updatedABTestGroups, array(fastlyKVStruct));

	return updatedABTestGroups;
};

const getMVTGroups = async (file: string) => {
	const mvtGroups = JSON.parse(await readTextFile(file));

	assert(mvtGroups, array(fastlyKVStruct));
	return mvtGroups;
};

export { getUpdatedABTestGroups, getMVTGroups };
