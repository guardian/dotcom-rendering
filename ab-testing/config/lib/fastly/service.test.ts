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

describe("FastlyService", async () => {
	await test("getDictionary - returns FastlyDictionary instance", async () => {
		const mockResponse = {
			id: "dict-123",
			name: "test-dictionary",
		};
		mockFetch(mockResponse);

		const client = new FastlyClient("test-api-token");
		const service = new FastlyService(client, {
			id: "service-123",
			name: "test-service",
			activeVersion: 1,
		});

		const dictionary = await service.getDictionary("test-dictionary");

		equal(dictionary instanceof FastlyDictionary, true);
		equal(dictionary.id, "dict-123");
		equal(dictionary.name, "test-dictionary");
		equal(dictionary.service, service);
	});

	await test("getDictionaryItems - calls client.getDictionaryItems", async () => {
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

		const items = await service.getDictionaryItems("dict-123");

		deepEqual(items, mockResponse);

		equal((globalThis.fetch as MockedFetch).mock.calls.length, 1);

		match(
			(globalThis.fetch as MockedFetch).mock.calls[0]
				?.arguments[0] as string,
			/dictionary\/dict-123\/items\?per_page=1000/,
		);
	});

	await test("updateDictionaryItems - calls client.updateDictionaryItems", async () => {
		mockFetch({ status: "ok" });

		const client = new FastlyClient("test-api-token");
		const service = new FastlyService(client, {
			id: "service-123",
			name: "test-service",
			activeVersion: 1,
		});

		const items = [
			{ item_key: "key1", item_value: "value1", op: "create" as const },
		];
		await service.updateDictionaryItems("dict-123", items);

		equal((globalThis.fetch as MockedFetch).mock.calls.length, 1);

		match(
			(globalThis.fetch as MockedFetch).mock.calls[0]
				?.arguments[0] as string,
			/dictionary\/dict-123\/items/,
		);
	});
});
