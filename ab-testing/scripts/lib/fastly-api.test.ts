import { deepEqual, equal, match, rejects } from "node:assert";
import type { Mock } from "node:test";
import test, { mock } from "node:test";

const mockConfig = {
	serviceName: "test-service",
	serviceId: "test-service-id",
	mvtDictionaryId: "test-mvt-dictionary-id",
	mvtDictionaryName: "test-mvt-dictionary",
	abTestsDictionaryId: "test-ab-tests-dictionary-id",
	abTestsDictionaryName: "test-ab-tests-dictionary",
};

// Mock environment variables
process.env.FASTLY_AB_TESTING_CONFIG = JSON.stringify(mockConfig);
process.env.FASTLY_API_TOKEN = "test-api-token";

type MockedFetch = Mock<typeof fetch>;

function mockFetch(response: unknown, status = 200, statusText = "OK") {
	const mockResponse = new Response(JSON.stringify(response), {
		status,
		statusText,
		headers: { "Content-Type": "application/json" },
	});

	globalThis.fetch = mock.fn(async () => Promise.resolve(mockResponse));
}

// Import after mocking
const {
	calculateUpdates,
	getDictionaryItems,
	getMVTGroupsFromDictionary,
	getABTestGroupsFromDictionary,
	updateMVTGroups,
	updateABTestGroups,
	encodeObject,
} = await import("./fastly-api.ts");

test("calculateUpdates - creates new items", () => {
	const currentDictionary: Array<{ item_key: string; item_value: string }> =
		[];
	const newDictionary = [
		{ item_key: "test1", item_value: "value1" },
		{ item_key: "test2", item_value: "value2" },
	];

	const result = calculateUpdates(newDictionary, currentDictionary);

	equal(result.length, 2);
	deepEqual(result[0], {
		item_key: "test1",
		item_value: "value1",
		op: "create",
	});
	deepEqual(result[1], {
		item_key: "test2",
		item_value: "value2",
		op: "create",
	});
});

test("calculateUpdates - updates existing items", () => {
	const currentDictionary = [
		{ item_key: "test1", item_value: "old_value1" },
		{ item_key: "test2", item_value: "value2" },
	];
	const newDictionary = [
		{ item_key: "test1", item_value: "new_value1" },
		{ item_key: "test2", item_value: "value2" },
	];

	const result = calculateUpdates(newDictionary, currentDictionary);

	equal(result.length, 1);
	deepEqual(result[0], {
		item_key: "test1",
		item_value: "new_value1",
		op: "update",
	});
});

test("calculateUpdates - deletes removed items", () => {
	const currentDictionary = [
		{ item_key: "test1", item_value: "value1" },
		{ item_key: "test2", item_value: "value2" },
	];
	const newDictionary = [{ item_key: "test1", item_value: "value1" }];

	const result = calculateUpdates(newDictionary, currentDictionary);

	equal(result.length, 1);
	deepEqual(result[0], {
		item_key: "test2",
		op: "delete",
	});
});

test("calculateUpdates - no changes needed", () => {
	const currentDictionary = [
		{ item_key: "test1", item_value: "value1" },
		{ item_key: "test2", item_value: "value2" },
	];
	const newDictionary = [
		{ item_key: "test1", item_value: "value1" },
		{ item_key: "test2", item_value: "value2" },
	];

	const result = calculateUpdates(newDictionary, currentDictionary);

	equal(result.length, 0);
});

test("calculateUpdates - combination of operations", () => {
	const currentDictionary = [
		{ item_key: "keep", item_value: "same_value" },
		{ item_key: "update", item_value: "old_value" },
		{ item_key: "delete", item_value: "will_be_deleted" },
	];
	const newDictionary = [
		{ item_key: "keep", item_value: "same_value" },
		{ item_key: "update", item_value: "new_value" },
		{ item_key: "create", item_value: "new_item" },
	];

	const result = calculateUpdates(newDictionary, currentDictionary);

	equal(result.length, 3);

	const deleteOp = result.find((op) => op.op === "delete");
	deepEqual(deleteOp, {
		item_key: "delete",
		op: "delete",
	});

	const updateOp = result.find((op) => op.op === "update");
	deepEqual(updateOp, {
		item_key: "update",
		item_value: "new_value",
		op: "update",
	});

	const createOp = result.find((op) => op.op === "create");
	deepEqual(createOp, {
		item_key: "create",
		item_value: "new_item",
		op: "create",
	});
});

test("getDictionaryItems - fetches and returns dictionary items", async () => {
	const mockResponse = [
		{
			service_id: "test-service",
			item_key: "key1",
			item_value: "value1",
			dictionary_id: "test-dict",
			created_at: "2023-01-01",
			updated_at: "2023-01-01",
			deleted_at: null,
		},
	];

	mockFetch(mockResponse);

	const result = await getDictionaryItems({
		dictionaryId: "test-dict",
	});

	deepEqual(result, mockResponse);
	equal((globalThis.fetch as MockedFetch).mock.calls.length, 1);
	equal(
		(globalThis.fetch as MockedFetch).mock.calls[0]?.arguments[0],
		`https://api.fastly.com/service/${mockConfig.serviceId}/dictionary/test-dict/items?per_page=1000`,
	);
});

test("getDictionaryItems - throws error on invalid response", async () => {
	// Mock invalid response format
	mockFetch("not an array");

	await rejects(
		async () => {
			await getDictionaryItems({
				dictionaryId: "test-dict",
			});
		},
		Error,
		"Expected an array",
	);
});

test("getDictionaryItems - throws error on fetch failure", async () => {
	mockFetch({ error: "Something went wrong" }, 500, "Internal Server Error");

	await rejects(
		async () => {
			await getDictionaryItems({
				dictionaryId: "test-dict",
			});
		},
		Error,
		"Failed to fetch from Fastly: 500",
	);
});

test("getMVTGroupsFromDictionary - calls the right endpoint", async () => {
	const mockResponse = [] as unknown;
	mockFetch(mockResponse);

	await getMVTGroupsFromDictionary();

	equal((globalThis.fetch as MockedFetch).mock.calls.length, 1);
	match(
		(globalThis.fetch as MockedFetch).mock.calls[0]?.arguments[0] as string,
		new RegExp(`/dictionary/${mockConfig.mvtDictionaryId}/items`),
	);
});

test("getABTestGroupsFromDictionary - calls the right endpoint", async () => {
	const mockResponse = [] as unknown;
	mockFetch(mockResponse);

	await getABTestGroupsFromDictionary();

	equal((globalThis.fetch as MockedFetch).mock.calls.length, 1);
	match(
		(globalThis.fetch as MockedFetch).mock.calls[0]?.arguments[0] as string,
		new RegExp(`/dictionary/${mockConfig.abTestsDictionaryId}/items`),
	);
});

test("updateMVTGroups - makes PATCH request with correct data", async () => {
	mockFetch({ status: "ok" });

	const items = [
		{ item_key: "key1", item_value: "value1", op: "create" as const },
	];
	await updateMVTGroups(items);

	equal((globalThis.fetch as MockedFetch).mock.calls.length, 1);
	equal(
		(globalThis.fetch as MockedFetch).mock.calls[0]?.arguments[1]?.method,
		"PATCH",
	);

	const requestBody = JSON.parse(
		(globalThis.fetch as MockedFetch).mock.calls[0]?.arguments[1]
			?.body as string,
	) as {
		items: Array<{
			item_key: string;
			item_value: string;
			op: "create" | "update" | "delete";
		}>;
	};

	deepEqual(requestBody.items, items);
});

test("updateABTestGroups - makes PATCH request with correct data", async () => {
	mockFetch({ status: "ok" });

	const items = [
		{ item_key: "key1", item_value: "value1", op: "update" as const },
	];
	await updateABTestGroups(items);

	equal((globalThis.fetch as MockedFetch).mock.calls.length, 1);
	equal(
		(globalThis.fetch as MockedFetch).mock.calls[0]?.arguments[1]?.method,
		"PATCH",
	);

	const requestBody = JSON.parse(
		(globalThis.fetch as MockedFetch).mock.calls[0]?.arguments[1]
			?.body as string,
	) as {
		items: Array<{
			item_key: string;
			item_value: string;
			op: "create" | "update" | "delete";
		}>;
	};
	deepEqual(requestBody.items, items);
});

test("updateABTestGroups - throws error on non-ok status", async () => {
	mockFetch({ status: "error" });

	const items = [
		{ item_key: "key1", item_value: "value1", op: "create" as const },
	];

	await rejects(
		async () => {
			await updateABTestGroups(items);
		},
		Error,
		"Failed to update dictionary: error",
	);
});

test("encodeObject - encodes object to string", () => {
	const obj = {
		test: "value",
		another: 123,
		bool: true,
	};

	const result = encodeObject(obj);
	equal(result, "test=value,another=123,bool=true");
});

test("encodeObject - handles arrays", () => {
	const arr = ["test", "another"];

	const result = encodeObject(arr);
	equal(result, "0=test,1=another");
});
