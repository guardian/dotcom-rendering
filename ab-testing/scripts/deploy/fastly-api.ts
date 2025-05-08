import * as env from './env.ts';
import { object, string, assert, array, nullable } from 'jsr:@superstruct/core';

const dictionaryItemStruct = object({
	service_id: string(),
	item_key: string(),
	item_value: string(),
	dictionary_id: string(),
	created_at: string(),
	updated_at: string(),
	deleted_at: nullable(string()),
});

type BulkUpdateDictionaryItemRequest =
	| {
			item_key: string;
			item_value: string;
			op: 'create' | 'update' | 'upsert';
	  }
	| {
			item_key: string;
			op: 'delete';
	  };

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

const getDictionaryItems = async ({
	serviceId,
	dictionaryId,
}: {
	serviceId: string;
	dictionaryId: string;
}) => {
	const dictionary = await fetchFromFastly(
		`https://api.fastly.com/service/${serviceId}/dictionary/${dictionaryId}/items?per_page=1000`,
	);

	assert(dictionary, array(dictionaryItemStruct));

	return dictionary;
};

const bulkUpdateDictionaryItem = async ({
	serviceId,
	dictionaryId,
	items,
}: {
	serviceId: string;
	dictionaryId: string;
	items: BulkUpdateDictionaryItemRequest[];
}) => {
	const dictionary = await fetchFromFastly(
		`https://api.fastly.com/service/${serviceId}/dictionary/${dictionaryId}/items`,
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
const calculateBulkUpdates = (
	updatedDictionary: Array<{
		item_key: string;
		item_value: string;
	}>,
	currentDictionary: Array<{
		item_key: string;
		item_value: string;
	}>,
): BulkUpdateDictionaryItemRequest[] => {
	const currentDictionaryKeys = new Set(
		currentDictionary.map((group) => group.item_key),
	);

	const updateDeleteOps = currentDictionary
		.map((group) => {
			const updatedGroup = updatedDictionary.find(
				(newGroup) => newGroup.item_key === group.item_key,
			);

			if (!updatedGroup) {
				return {
					item_key: group.item_key,
					op: 'delete',
				} as const;
			}

			if (group.item_value !== updatedGroup.item_value) {
				return {
					item_key: group.item_key,
					item_value: updatedGroup.item_value,
					op: 'update',
				} as const;
			}

			return null;
		})
		.filter((update) => update !== null);

	const createOpts = updatedDictionary
		.filter(({ item_key }) => !currentDictionaryKeys.has(item_key))
		.map(
			({ item_key, item_value }) =>
				({
					item_key,
					item_value,
					op: 'create',
				}) as const,
		);

	const bulkUpdates = [...updateDeleteOps, ...createOpts];

	return bulkUpdates;
};

const getMVTGroupsFromDictionary = () =>
	getDictionaryItems({
		serviceId: env.SERVICE_ID,
		dictionaryId: env.MVT_DICTIONARY_ID,
	});

const getABTestGroupsFromDictionary = () =>
	getDictionaryItems({
		serviceId: env.SERVICE_ID,
		dictionaryId: env.AB_TESTS_DICTIONARY_ID,
	});

const bulkUpdateMVTGroups = (items: BulkUpdateDictionaryItemRequest[]) =>
	bulkUpdateDictionaryItem({
		serviceId: env.SERVICE_ID,
		dictionaryId: env.MVT_DICTIONARY_ID,
		items,
	});
const bulkUpdateABTestGroups = (items: BulkUpdateDictionaryItemRequest[]) =>
	bulkUpdateDictionaryItem({
		serviceId: env.SERVICE_ID,
		dictionaryId: env.AB_TESTS_DICTIONARY_ID,
		items,
	});

const encodeObject = (obj: Record<string, unknown> | Array<string>) =>
	Object.entries(obj)
		.map(([key, value]) => `${key}=${value}`)
		.join(',');

export {
	getMVTGroupsFromDictionary,
	getABTestGroupsFromDictionary,
	getDictionaryItems,
	bulkUpdateMVTGroups,
	bulkUpdateABTestGroups,
	calculateBulkUpdates,
	encodeObject,
};
