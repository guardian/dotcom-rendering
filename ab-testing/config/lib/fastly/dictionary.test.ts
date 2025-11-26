import { deepEqual, equal, match } from "node:assert";
import type { Mock } from "node:test";
import test, { describe, mock } from "node:test";
import { FastlyClient } from "./client.ts";
import { FastlyDictionary } from "./dictionary.ts";
import { FastlyService } from "./service.ts";

type MockedFetch = Mock<typeof fetch>;

function mockFetch(response: unknown, status = 200, statusText = "OK") {
	const mockResponse = new Response(JSON.stringify(response), {
		status,
		statusText,
		headers: { "Content-Type": "application/json" },
	});

	globalThis.fetch = mock.fn(async () => Promise.resolve(mockResponse));
}

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

		equal((globalThis.fetch as MockedFetch).mock.calls.length, 1);
		match(
			(globalThis.fetch as MockedFetch).mock.calls[0]
				?.arguments[0] as string,
			/dictionary\/dict-123\/items\?per_page=1000/,
		);
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

		match(
			(globalThis.fetch as MockedFetch).mock.calls[0]
				?.arguments[0] as string,
			/dictionary\/dict-123\/items/,
		);

		const fetchOptions = (globalThis.fetch as MockedFetch).mock.calls[0]
			?.arguments[1] as RequestInit;
		equal(fetchOptions.method, "PATCH");
	});
});
