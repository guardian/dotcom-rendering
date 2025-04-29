import { readTextFile } from 'jsr:@std/fs/unstable-read-text-file';
import { join } from 'jsr:@std/path/join';
import { object, string, assert, array } from 'jsr:@superstruct/core';

const fastlyKVStruct = object({
	item_key: string(),
	item_value: string(),
});

const getUpdatedABTestGroups = async () => {
	const updatedABTestGroups = JSON.parse(
		await readTextFile(
			join(
				import.meta.dirname,
				'../..',
				'dist',
				'active_ab_test_groups.json',
			),
		),
	);

	assert(updatedABTestGroups, array(fastlyKVStruct));

	return updatedABTestGroups;
};

const getMVTGroups = async () => {
	const mvtGroups = JSON.parse(
		await readTextFile(
			join(import.meta.dirname, '../..', 'dist', 'mvt_dict.json'),
		),
	);

	assert(mvtGroups, array(fastlyKVStruct));
	return mvtGroups;
};

export { getUpdatedABTestGroups, getMVTGroups };
