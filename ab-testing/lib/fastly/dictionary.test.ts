import { deepEqual, equal, match } from "node:assert";
import type { Mock } from "node:test";
import test, { describe, mock } from "node:test";

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
const { FastlyClient } = await import("./client.ts");
const {
	getMVTGroupsFromDictionary,
	getABTestGroupsFromDictionary,
	updateMVTGroups,
	updateABTestGroups,
} = await import("./dictionary.ts");

const { FastlyService } = await import("./service.ts");
const { FastlyDictionary } = await import("./dictionary.ts");

describe("FastlyDictionary", async () => {
	await test("getItems - calls service.getDictionaryItems", async () => {
		const mockResponse = [
			{
				service_id: "test-service",
				item_key: "key1",
				item_value: "value1",
				dictionary_id: "dict-123",
				created_at: "2023-01-01",
				updated_at: "2023-01-01",
				deleted_at: null,
			},
		];
		mockFetch(mockResponse);

		const client = new FastlyClient("test-api-token");
		const service = new FastlyService(client, {
			id: "service-123",
			name: "test-service",
			activeVersion: 1,
		});
		const dictionary = new FastlyDictionary(service, {
			id: "dict-123",
			name: "test-dictionary",
		});

		const items = await dictionary.getItems();

		deepEqual(items, mockResponse);
	});

	await test("updateItems - calls service.updateDictionaryItems", async () => {
		mockFetch({ status: "ok" });

		const client = new FastlyClient("test-api-token");
		const service = new FastlyService(client, {
			id: "service-123",
			name: "test-service",
			activeVersion: 1,
		});
		const dictionary = new FastlyDictionary(service, {
			id: "dict-123",
			name: "test-dictionary",
		});

		const items = [
			{ item_key: "key1", item_value: "value1", op: "create" as const },
		];
		await dictionary.updateItems(items);

		equal((globalThis.fetch as MockedFetch).mock.calls.length, 1);
	});

	test("getMVTGroupsFromDictionary - calls the right endpoint", async () => {
		const mockResponse = [] as unknown;
		mockFetch(mockResponse);

		const client = new FastlyClient("test-api-token");
		await getMVTGroupsFromDictionary(client);

		equal((globalThis.fetch as MockedFetch).mock.calls.length, 1);
		match(
			(globalThis.fetch as MockedFetch).mock.calls[0]
				?.arguments[0] as string,
			new RegExp(`/dictionary/${mockConfig.mvtDictionaryId}/items`),
		);
	});

	test("getABTestGroupsFromDictionary - calls the right endpoint", async () => {
		const mockResponse = [] as unknown;
		mockFetch(mockResponse);

		const client = new FastlyClient("test-api-token");
		await getABTestGroupsFromDictionary(client);

		equal((globalThis.fetch as MockedFetch).mock.calls.length, 1);
		match(
			(globalThis.fetch as MockedFetch).mock.calls[0]
				?.arguments[0] as string,
			new RegExp(`/dictionary/${mockConfig.abTestsDictionaryId}/items`),
		);
	});

	test("updateMVTGroups - makes PATCH request with correct data", async () => {
		mockFetch({ status: "ok" });

		const client = new FastlyClient("test-api-token");
		const items = [
			{ item_key: "key1", item_value: "value1", op: "create" as const },
		];
		await updateMVTGroups(client, items);

		equal((globalThis.fetch as MockedFetch).mock.calls.length, 1);
		equal(
			(globalThis.fetch as MockedFetch).mock.calls[0]?.arguments[1]
				?.method,
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

		const client = new FastlyClient("test-api-token");
		const items = [
			{ item_key: "key1", item_value: "value1", op: "update" as const },
		];
		await updateABTestGroups(client, items);

		equal((globalThis.fetch as MockedFetch).mock.calls.length, 1);
		equal(
			(globalThis.fetch as MockedFetch).mock.calls[0]?.arguments[1]
				?.method,
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
});
