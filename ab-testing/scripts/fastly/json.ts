import { readTextFile } from 'jsr:@std/fs/unstable-read-text-file';
import { join } from 'jsr:@std/path/join';
import {
	object,
	string,
	number,
	enums,
	record,
	assert,
	array,
} from 'jsr:@superstruct/core';

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

	const abTestGroupStruct = record(
		string(),
		object({
			exp: number(),
			type: enums(['client', 'server']),
		}),
	);

	assert(updatedABTestGroups, abTestGroupStruct);

	return updatedABTestGroups;
};

const getMVTGroups = async () => {
	const mvtGroups = JSON.parse(
		await readTextFile(
			join(import.meta.dirname, '../..', 'dist', 'mvt_dict.json'),
		),
	);
	const mvtGroupStruct = record(string(), array(string()));
	assert(mvtGroups, mvtGroupStruct);
	return mvtGroups;
};

export { getUpdatedABTestGroups, getMVTGroups };
