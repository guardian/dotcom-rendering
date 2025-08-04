import * as env from './env.ts';
import {
	object,
	string,
	assert,
	array,
	nullable,
	boolean,
	number,
	type,
} from 'jsr:@superstruct/core';

const dictionaryItemStruct = object({
	service_id: string(),
	item_key: string(),
	item_value: string(),
	dictionary_id: string(),
	created_at: string(),
	updated_at: string(),
	deleted_at: nullable(string()),
});

type UpdateDictionaryItemRequest =
	| {
			item_key: string;
			item_value: string;
			op: 'create' | 'update' | 'upsert';
	  }
	| {
			item_key: string;
			op: 'delete';
	  };

const FASTLY_API_BASE_URL = 'https://api.fastly.com/service';

/**
 * Fetch data from Fastly API
 * We're using fetch instead of the Fastly API client as it doesn't play nicely with Deno, nor is it typed
 *
 * @param url - The URL to fetch
 * @param options - Fetch options
 * @returns The parsed JSON response
 * @throws Error if the response is not ok or if the response cannot be parsed
 */
const fetchFromFastly = async <T>(
	url: string,
	options: RequestInit = {},
): Promise<T> => {
	const response = await fetch(url, {
		...options,
		headers: {
			...options.headers,
			'Fastly-Key': env.FASTLY_API_TOKEN,
		},
	});
	if (!response.ok) {
		console.error(await response.text());
		throw new Error(
			`Failed to fetch from Fastly: ${response.status} ${response.statusText}`,
		);
	}
	const data = await response.json();
	if (!data) {
		throw new Error(`Failed to parse response from Fastly`);
	}
	return data;
};

const getService = async (serviceId: string) => {
	const service = await fetchFromFastly(
		`${FASTLY_API_BASE_URL}/${serviceId}`,
	);

	assert(
		service,
		type({
			id: string(),
			name: string(),
			versions: array(
				type({
					active: boolean(),
					number: number(),
				}),
			),
		}),
	);

	return service;
};

const getDictionary = async ({
	serviceId,
	activeVersion,
	dictionaryName,
}: {
	serviceId: string;
	activeVersion: number;
	dictionaryName: string;
}) => {
	const dictionary = await fetchFromFastly(
		`${FASTLY_API_BASE_URL}/${serviceId}/version/${activeVersion}/dictionary/${dictionaryName}`,
	);
	assert(dictionary, type({ id: string(), name: string() }));

	return dictionary;
};

const getDictionaryItems = async ({
	serviceId,
	dictionaryId,
}: {
	serviceId: string;
	dictionaryId: string;
}) => {
	const dictionary = await fetchFromFastly(
		`${FASTLY_API_BASE_URL}/${serviceId}/dictionary/${dictionaryId}/items?per_page=1000`,
	);

	assert(dictionary, array(dictionaryItemStruct));

	return dictionary;
};

const updateDictionaryItems = async ({
	serviceId,
	dictionaryId,
	items,
}: {
	serviceId: string;
	dictionaryId: string;
	items: UpdateDictionaryItemRequest[];
}) => {
	const dictionary = await fetchFromFastly(
		`${FASTLY_API_BASE_URL}/${serviceId}/dictionary/${dictionaryId}/items`,
		{
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				service_id: serviceId,
				dictionary_id: dictionaryId,
				items,
			}),
		},
	);

	assert(dictionary, object({ status: string() }));
	if (dictionary.status !== 'ok') {
		throw new Error(`Failed to update dictionary: ${dictionary.status}`);
	}
	return dictionary;
};

/**
 * Calculate the bulk updates for a dictionary
 * Compare the new dictionary with the current dictionary and return the operations required
 *
 * @param updatedDictionary
 * @param currentDictionary
 * @returns
 */
const calculateUpdates = (
	updatedDictionary: Array<{
		item_key: string;
		item_value: string;
	}>,
	currentDictionary: Array<{
		item_key: string;
		item_value: string;
	}>,
): UpdateDictionaryItemRequest[] => {
	const currentDictionaryKeys = new Set(
		currentDictionary.map((group) => group.item_key),
	);

	const updateDeleteOps = currentDictionary.reduce<{
		updates: UpdateDictionaryItemRequest[];
		deletes: UpdateDictionaryItemRequest[];
	}>(
		(ops, group) => {
			const updatedGroup = updatedDictionary.find(
				(newGroup) => newGroup.item_key === group.item_key,
			);

			if (!updatedGroup) {
				return {
					...ops,
					deletes: [
						...(ops.deletes ?? []),
						{
							item_key: group.item_key,
							op: 'delete',
						},
					],
				};
			}

			if (group.item_value !== updatedGroup.item_value) {
				return {
					...ops,
					updates: [
						...(ops.updates ?? []),
						{
							item_key: group.item_key,
							item_value: updatedGroup.item_value,
							op: 'update',
						},
					],
				};
			}

			return ops;
		},
		{
			updates: [],
			deletes: [],
		},
	);

	const createOpts: UpdateDictionaryItemRequest[] = updatedDictionary
		.filter((group) => !currentDictionaryKeys.has(group.item_key))
		.map(({ item_key, item_value }) => ({
			item_key,
			item_value,
			op: 'create',
		}));

	const bulkUpdates = [
		...updateDeleteOps.deletes,
		...updateDeleteOps.updates,
		...createOpts,
	];

	return bulkUpdates;
};

/**
 * Verify that the service and dictionary names match the expected IDs
 *
 */
const verifyDictionaryName = async ({
	activeVersion,
	dictionaryName,
	dictionaryId,
}: {
	activeVersion: number;
	dictionaryName: string;
	dictionaryId: string;
}) => {
	const dictionary = await getDictionary({
		serviceId: env.SERVICE_ID,
		activeVersion: activeVersion,
		dictionaryName,
	});

	if (dictionary.id !== dictionaryId) {
		throw new Error(
			`Dictionary ID ${dictionaryId} does not match the expected dictionary ${dictionaryName}`,
		);
	}

	return;
};

const getMVTGroupsFromDictionary = () =>
	getDictionaryItems({
		serviceId: env.SERVICE_ID,
		dictionaryId: env.MVTS_DICTIONARY_ID,
	});

const getABTestGroupsFromDictionary = () =>
	getDictionaryItems({
		serviceId: env.SERVICE_ID,
		dictionaryId: env.TEST_GROUPS_DICTIONARY_ID,
	});

const updateMVTGroups = (items: UpdateDictionaryItemRequest[]) =>
	updateDictionaryItems({
		serviceId: env.SERVICE_ID,
		dictionaryId: env.MVTS_DICTIONARY_ID,
		items,
	});
const updateABTestGroups = (items: UpdateDictionaryItemRequest[]) =>
	updateDictionaryItems({
		serviceId: env.SERVICE_ID,
		dictionaryId: env.TEST_GROUPS_DICTIONARY_ID,
		items,
	});

const encodeObject = (obj: Record<string, unknown> | Array<string>) =>
	Object.entries(obj)
		.map(([key, value]) => `${key}=${value}`)
		.join(',');

export {
	getMVTGroupsFromDictionary,
	getABTestGroupsFromDictionary,
	getService,
	getDictionaryItems,
	updateMVTGroups,
	updateABTestGroups,
	calculateUpdates,
	encodeObject,
	verifyDictionaryName,
};
