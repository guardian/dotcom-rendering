import {
	assertEquals,
	assertRejects,
	assertStringIncludes,
} from 'jsr:@std/assert';
import { stub, Stub } from 'jsr:@std/testing/mock';

// Mock environment variables
stub(Deno.env, 'get', (key: string) => {
	if (
		[
			'FASTLY_API_TOKEN',
			'FASTLY_SERVICE_ID',
			'FASTLY_MVT_DICTIONARY_ID',
			'FASTLY_AB_TESTS_DICTIONARY_ID',
		].includes(key)
	) {
		return 'test';
	}
});

let fetchStub: Stub<typeof globalThis>;

function mockFetch(response: unknown, status = 200, statusText = 'OK') {
	// Restore original fetch if it was stubbed
	if (fetchStub) {
		fetchStub.restore();
	}

	const mockResponse = new Response(JSON.stringify(response), {
		status,
		statusText,
		headers: { 'Content-Type': 'application/json' },
	});

	// Create a new stub
	fetchStub = stub(
		globalThis,
		'fetch',
		(_input: string | URL | Request, _init?: RequestInit) =>
			Promise.resolve(mockResponse),
	);

	return fetchStub;
}

// Import after mocking
const {
	calculateBulkUpdates,
	getDictionaryItems,
	getMVTGroupsFromDictionary,
	getABTestGroupsFromDictionary,
	bulkUpdateMVTGroups,
	bulkUpdateABTestGroups,
	encodeObject,
} = await import('./fastly-api.ts');

Deno.test('calculateBulkUpdates - creates new items', () => {
	const currentDictionary: Array<{ item_key: string; item_value: string }> =
		[];
	const newDictionary = [
		{ item_key: 'test1', item_value: 'value1' },
		{ item_key: 'test2', item_value: 'value2' },
	];

	const result = calculateBulkUpdates(newDictionary, currentDictionary);

	assertEquals(result.length, 2);
	assertEquals(result[0], {
		item_key: 'test1',
		item_value: 'value1',
		op: 'create',
	});
	assertEquals(result[1], {
		item_key: 'test2',
		item_value: 'value2',
		op: 'create',
	});
});

Deno.test('calculateBulkUpdates - updates existing items', () => {
	const currentDictionary = [
		{ item_key: 'test1', item_value: 'old_value1' },
		{ item_key: 'test2', item_value: 'value2' },
	];
	const newDictionary = [
		{ item_key: 'test1', item_value: 'new_value1' },
		{ item_key: 'test2', item_value: 'value2' },
	];

	const result = calculateBulkUpdates(newDictionary, currentDictionary);

	assertEquals(result.length, 1);
	assertEquals(result[0], {
		item_key: 'test1',
		item_value: 'new_value1',
		op: 'update',
	});
});

Deno.test('calculateBulkUpdates - deletes removed items', () => {
	const currentDictionary = [
		{ item_key: 'test1', item_value: 'value1' },
		{ item_key: 'test2', item_value: 'value2' },
	];
	const newDictionary = [{ item_key: 'test1', item_value: 'value1' }];

	const result = calculateBulkUpdates(newDictionary, currentDictionary);

	assertEquals(result.length, 1);
	assertEquals(result[0], {
		item_key: 'test2',
		op: 'delete',
	});
});

Deno.test('calculateBulkUpdates - no changes needed', () => {
	const currentDictionary = [
		{ item_key: 'test1', item_value: 'value1' },
		{ item_key: 'test2', item_value: 'value2' },
	];
	const newDictionary = [
		{ item_key: 'test1', item_value: 'value1' },
		{ item_key: 'test2', item_value: 'value2' },
	];

	const result = calculateBulkUpdates(newDictionary, currentDictionary);

	assertEquals(result.length, 0);
});

Deno.test('calculateBulkUpdates - combination of operations', () => {
	const currentDictionary = [
		{ item_key: 'keep', item_value: 'same_value' },
		{ item_key: 'update', item_value: 'old_value' },
		{ item_key: 'delete', item_value: 'will_be_deleted' },
	];
	const newDictionary = [
		{ item_key: 'keep', item_value: 'same_value' },
		{ item_key: 'update', item_value: 'new_value' },
		{ item_key: 'create', item_value: 'new_item' },
	];

	const result = calculateBulkUpdates(newDictionary, currentDictionary);

	assertEquals(result.length, 3);

	const deleteOp = result.find((op) => op.op === 'delete');
	assertEquals(deleteOp, {
		item_key: 'delete',
		op: 'delete',
	});

	const updateOp = result.find((op) => op.op === 'update');
	assertEquals(updateOp, {
		item_key: 'update',
		item_value: 'new_value',
		op: 'update',
	});

	const createOp = result.find((op) => op.op === 'create');
	assertEquals(createOp, {
		item_key: 'create',
		item_value: 'new_item',
		op: 'create',
	});
});

Deno.test(
	'getDictionaryItems - fetches and returns dictionary items',
	async () => {
		const mockResponse = [
			{
				service_id: 'test-service',
				item_key: 'key1',
				item_value: 'value1',
				dictionary_id: 'test-dict',
				created_at: '2023-01-01',
				updated_at: '2023-01-01',
				deleted_at: null,
			},
		];

		mockFetch(mockResponse);

		const result = await getDictionaryItems({
			serviceId: 'test-service',
			dictionaryId: 'test-dict',
		});

		assertEquals(result, mockResponse);
		assertEquals(fetchStub.calls.length, 1);
		assertEquals(
			fetchStub.calls[0].args[0],
			'https://api.fastly.com/service/test-service/dictionary/test-dict/items?per_page=1000',
		);
	},
);

Deno.test('getDictionaryItems - throws error on invalid response', async () => {
	// Mock invalid response format
	mockFetch('not an array');

	await assertRejects(
		async () => {
			await getDictionaryItems({
				serviceId: 'test-service',
				dictionaryId: 'test-dict',
			});
		},
		Error,
		'Expected an array',
	);
});

Deno.test('getDictionaryItems - throws error on fetch failure', async () => {
	mockFetch({ error: 'Something went wrong' }, 500, 'Internal Server Error');

	await assertRejects(
		async () => {
			await getDictionaryItems({
				serviceId: 'test-service',
				dictionaryId: 'test-dict',
			});
		},
		Error,
		'Failed to fetch from Fastly: 500',
	);
});

Deno.test('getMVTGroupsFromDictionary - calls the right endpoint', async () => {
	const mockResponse = [] as unknown;
	mockFetch(mockResponse);

	await getMVTGroupsFromDictionary();

	assertEquals(fetchStub.calls.length, 1);
	assertStringIncludes(fetchStub.calls[0].args[0], '/dictionary/test/items');
});

Deno.test(
	'getABTestGroupsFromDictionary - calls the right endpoint',
	async () => {
		const mockResponse = [] as unknown;
		mockFetch(mockResponse);

		await getABTestGroupsFromDictionary();

		assertEquals(fetchStub.calls.length, 1);
		assertStringIncludes(
			fetchStub.calls[0].args[0],
			'/dictionary/test/items',
		);
	},
);

Deno.test(
	'bulkUpdateMVTGroups - makes PATCH request with correct data',
	async () => {
		mockFetch({ status: 'ok' });

		const items = [
			{ item_key: 'key1', item_value: 'value1', op: 'create' as const },
		];
		await bulkUpdateMVTGroups(items);

		assertEquals(fetchStub.calls.length, 1);
		assertEquals(fetchStub.calls[0].args[1].method, 'PATCH');

		const requestBody = JSON.parse(fetchStub.calls[0].args[1].body);
		assertEquals(requestBody.items, items);
	},
);

Deno.test(
	'bulkUpdateABTestGroups - makes PATCH request with correct data',
	async () => {
		mockFetch({ status: 'ok' });

		const items = [
			{ item_key: 'key1', item_value: 'value1', op: 'update' as const },
		];
		await bulkUpdateABTestGroups(items);

		assertEquals(fetchStub.calls.length, 1);
		assertEquals(fetchStub.calls[0].args[1].method, 'PATCH');

		const requestBody = JSON.parse(fetchStub.calls[0].args[1].body);
		assertEquals(requestBody.items, items);
	},
);

Deno.test(
	'bulkUpdateABTestGroups - throws error on non-ok status',
	async () => {
		mockFetch({ status: 'error' });

		const items = [
			{ item_key: 'key1', item_value: 'value1', op: 'create' as const },
		];

		await assertRejects(
			async () => {
				await bulkUpdateABTestGroups(items);
			},
			Error,
			'Failed to update dictionary: error',
		);
	},
);

Deno.test('encodeObject - encodes object to string', () => {
	const obj = {
		test: 'value',
		another: 123,
		bool: true,
	};

	const result = encodeObject(obj);
	assertEquals(result, 'test=value,another=123,bool=true');
});

Deno.test('encodeObject - handles arrays', () => {
	const arr = ['test', 'another'];

	const result = encodeObject(arr);
	assertEquals(result, '0=test,1=another');
});
