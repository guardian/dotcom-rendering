import assert from "node:assert";
import { describe, it, mock } from "node:test";
import { S3Client } from "@aws-sdk/client-s3";
import { fetchDictionaryArtifact } from "./fetch-artifact.ts";

describe("fetch-artifact", () => {
	describe("fetchDictionaryArtifact", () => {
		it("should fetch and parse valid artifact from S3", async () => {
			const mockData = [
				{ item_key: "test1", item_value: "value1" },
				{ item_key: "test2", item_value: "value2" },
			];

			const mockBody = {
				transformToString: async () => JSON.stringify(mockData),
			};

			const mockSend = mock.fn(async () => ({
				Body: mockBody,
			}));

			mock.method(S3Client.prototype, "send", mockSend);

			const result = await fetchDictionaryArtifact(
				"test-bucket",
				"test-key",
			);

			assert.strictEqual(mockSend.mock.calls.length, 1);

			assert.deepStrictEqual(result, mockData);
		});

		it("should throw error when S3 response has no body", async () => {
			const mockSend = mock.fn(async () => ({
				Body: undefined,
			}));

			mock.method(S3Client.prototype, "send", mockSend);

			await assert.rejects(
				async () => {
					await fetchDictionaryArtifact("test-bucket", "test-key");
				},
				{
					name: "Error",
					message: "No body found in S3 object response",
				},
			);
		});

		it("should throw error when JSON parsing fails", async () => {
			const mockBody = {
				transformToString: async () => "invalid json {",
			};

			const mockSend = mock.fn(async () => ({
				Body: mockBody,
			}));

			mock.method(S3Client.prototype, "send", mockSend);

			await assert.rejects(async () => {
				await fetchDictionaryArtifact("test-bucket", "test-key");
			});
		});

		it("should throw error when data structure is invalid", async () => {
			const mockData = [
				{ wrong_key: "test1", wrong_value: "value1" }, // Invalid structure
			];

			const mockBody = {
				transformToString: async () => JSON.stringify(mockData),
			};

			const mockSend = mock.fn(async () => ({
				Body: mockBody,
			}));

			mock.method(S3Client.prototype, "send", mockSend);

			await assert.rejects(async () => {
				await fetchDictionaryArtifact("test-bucket", "test-key");
			});
		});

		it("should validate that all items have required fields", async () => {
			const mockData = [
				{ item_key: "test1", item_value: "value1" },
				{ item_key: "test2" }, // Missing item_value
			];

			const mockBody = {
				transformToString: async () => JSON.stringify(mockData),
			};

			const mockSend = mock.fn(async () => ({
				Body: mockBody,
			}));

			mock.method(S3Client.prototype, "send", mockSend);

			await assert.rejects(async () => {
				await fetchDictionaryArtifact("test-bucket", "test-key");
			});
		});

		it("should handle S3 client errors", async () => {
			const mockSend = mock.fn(async () => {
				throw new Error("S3 access denied");
			});

			mock.method(S3Client.prototype, "send", mockSend);

			await assert.rejects(
				async () => {
					await fetchDictionaryArtifact("test-bucket", "test-key");
				},
				{
					name: "Error",
					message: "S3 access denied",
				},
			);
		});

		it("should handle empty array response", async () => {
			const mockData: never[] = [];

			const mockBody = {
				transformToString: async () => JSON.stringify(mockData),
			};

			const mockSend = mock.fn(async () => ({
				Body: mockBody,
			}));

			mock.method(S3Client.prototype, "send", mockSend);

			const result = await fetchDictionaryArtifact(
				"test-bucket",
				"test-key",
			);

			assert.deepStrictEqual(result, []);
		});
	});
});
