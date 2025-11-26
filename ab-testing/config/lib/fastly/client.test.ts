import { deepEqual, equal, match, rejects } from "node:assert";
import type { Mock } from "node:test";
import test, { describe, mock } from "node:test";
import { FastlyClient } from "./client.ts";

type MockedFetch = Mock<typeof fetch>;

function mockFetch(response: unknown, status = 200, statusText = "OK") {
	const mockResponse = new Response(JSON.stringify(response), {
		status,
		statusText,
		headers: { "Content-Type": "application/json" },
	});

	globalThis.fetch = mock.fn(async () => Promise.resolve(mockResponse));
}

describe("FastlyClient", async () => {
	await test("fetch - successfully fetches data", async () => {
		const mockResponse = { data: "test" };
		mockFetch(mockResponse);

		const client = new FastlyClient("test-api-token");
		const result = await client.fetch("test-endpoint");

		deepEqual(result, mockResponse);
		equal((globalThis.fetch as MockedFetch).mock.calls.length, 1);
		equal(
			(globalThis.fetch as MockedFetch).mock.calls[0]
				?.arguments[0] as string,
			"https://api.fastly.com/test-endpoint",
		);
	});

	await test("fetch - throws error on fetch failure", async () => {
		mockFetch(
			{ error: "Something went wrong" },
			500,
			"Internal Server Error",
		);

		const client = new FastlyClient("test-api-token");

		await rejects(
			async () => {
				await client.fetch("test-endpoint");
			},
			Error,
			"Failed to fetch from Fastly: 500",
		);
	});

	await test("getService - returns service config", async () => {
		const mockResponse = {
			id: "service-123",
			name: "test-service",
			versions: [
				{ active: false, number: 1 },
				{ active: true, number: 2 },
			],
		};
		mockFetch(mockResponse);

		const client = new FastlyClient("test-api-token");
		const result = await client.getService("service-123", "test-service");

		deepEqual(result, {
			id: "service-123",
			name: "test-service",
			activeVersion: 2,
			client,
		});

		match(
			(globalThis.fetch as MockedFetch).mock.calls[0]
				?.arguments[0] as string,
			/service\/service-123/,
		);
	});

	await test("getService - throws error when service name doesn't match", async () => {
		const mockResponse = {
			id: "service-123",
			name: "wrong-service",
			versions: [{ active: true, number: 1 }],
		};
		mockFetch(mockResponse);

		const client = new FastlyClient("test-api-token");

		await rejects(
			async () => {
				await client.getService("service-123", "test-service");
			},
			Error,
			"Service ID service-123 does not match the expected service name test-service",
		);
	});

	await test("getService - throws error when no active version found", async () => {
		const mockResponse = {
			id: "service-123",
			name: "test-service",
			versions: [{ active: false, number: 1 }],
		};
		mockFetch(mockResponse);

		const client = new FastlyClient("test-api-token");

		await rejects(
			async () => {
				await client.getService("service-123", "test-service");
			},
			Error,
			"No active version found for service test-service",
		);
	});

	await test("getDictionary - returns dictionary config", async () => {
		const mockResponse = {
			id: "dict-123",
			name: "test-dictionary",
		};
		mockFetch(mockResponse);

		const client = new FastlyClient("test-api-token");
		const result = await client.getDictionary({
			activeVersion: 1,
			dictionaryName: "test-dictionary",
			serviceId: "service-123",
		});

		deepEqual(result, mockResponse);
		match(
			(globalThis.fetch as MockedFetch).mock.calls[0]
				?.arguments[0] as string,
			/service-123\/version\/1\/dictionary\/test-dictionary/,
		);
	});

	await test("getDictionaryItems - fetches and returns dictionary items", async () => {
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

		const client = new FastlyClient("test-api-token");
		const result = await client.getDictionaryItems({
			dictionaryId: "test-dict",
			serviceId: "service-123",
		});

		deepEqual(result, mockResponse);
		equal((globalThis.fetch as MockedFetch).mock.calls.length, 1);
		match(
			(globalThis.fetch as MockedFetch).mock.calls[0]
				?.arguments[0] as string,
			/dictionary\/test-dict\/items\?per_page=1000/,
		);
	});

	await test("getDictionaryItems - throws error on invalid response", async () => {
		// Mock invalid response format
		mockFetch("not an array");

		const client = new FastlyClient("test-api-token");

		await rejects(
			async () => {
				await client.getDictionaryItems({
					dictionaryId: "test-dict",
					serviceId: "service-123",
				});
			},
			Error,
			"Expected an array",
		);
	});

	await test("updateDictionaryItems - makes PATCH request with correct data", async () => {
		mockFetch({ status: "ok" });

		const client = new FastlyClient("test-api-token");
		const items = [
			{ item_key: "key1", item_value: "value1", op: "create" as const },
		];
		await client.updateDictionaryItems({
			dictionaryId: "dict-123",
			serviceId: "service-123",
			items,
		});

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

	await test("updateDictionaryItems - throws error on non-ok status", async () => {
		mockFetch({ status: "error" });

		const client = new FastlyClient("test-api-token");
		const items = [
			{ item_key: "key1", item_value: "value1", op: "create" as const },
		];

		await rejects(
			async () => {
				await client.updateDictionaryItems({
					dictionaryId: "dict-123",
					serviceId: "service-123",
					items,
				});
			},
			Error,
			"Failed to update dictionary: error",
		);
	});

	await test("verifyDictionaryName - succeeds when IDs match", async () => {
		const mockResponse = {
			id: "dict-123",
			name: "test-dictionary",
		};
		mockFetch(mockResponse);

		const client = new FastlyClient("test-api-token");
		await client.verifyDictionaryName({
			serviceId: "service-123",
			activeVersion: 1,
			dictionaryName: "test-dictionary",
			dictionaryId: "dict-123",
		});

		// No error thrown means success
		equal((globalThis.fetch as MockedFetch).mock.calls.length, 1);
	});

	await test("verifyDictionaryName - throws error when IDs don't match", async () => {
		const mockResponse = {
			id: "dict-456",
			name: "test-dictionary",
		};
		mockFetch(mockResponse);

		const client = new FastlyClient("test-api-token");

		await rejects(
			async () => {
				await client.verifyDictionaryName({
					serviceId: "service-123",
					activeVersion: 1,
					dictionaryName: "test-dictionary",
					dictionaryId: "dict-123",
				});
			},
			Error,
			"Dictionary ID dict-123 does not match the expected dictionary test-dictionary",
		);
	});
});
