import assert from "node:assert";
import { describe, it, mock } from "node:test";
import { S3Client } from "@aws-sdk/client-s3";
import type { Jsonifiable } from "type-fest";
import { fetchDictionaryArtifact } from "./fetch-artifact.ts";

describe("fetch-artifact", () => {
	describe("fetchDictionaryArtifact", () => {
		const mockS3SendResponse = (responseBody?: Jsonifiable) => {
			const mockBody = {
				transformToString: async () =>
					responseBody ? JSON.stringify(responseBody) : undefined,
			};
			const mockSend = mock.fn(async () => ({
				Body: mockBody,
			}));
			mock.method(S3Client.prototype, "send", mockSend);
			return mockSend;
		};

		it("should fetch and parse valid artifact from S3", async () => {
			const mockData = [
				{ item_key: "test1", item_value: "value1" },
				{ item_key: "test2", item_value: "value2" },
			];

			const mockSend = mockS3SendResponse(mockData);

			const result = await fetchDictionaryArtifact(
				"test-bucket",
				"test-key",
			);

			assert.strictEqual(mockSend.mock.calls.length, 1);

			assert.deepStrictEqual(result, mockData);
		});

		it("should throw error when S3 response has no body", async () => {
			mockS3SendResponse(undefined);

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
			const mockSend = mockS3SendResponse("invalid json {");

			mock.method(S3Client.prototype, "send", mockSend);

			await assert.rejects(async () => {
				await fetchDictionaryArtifact("test-bucket", "test-key");
			});
		});

		it("should throw error when data structure is invalid", async () => {
			const mockSend = mockS3SendResponse([
				{ wrong_key: "test1", wrong_value: "value1" }, // Invalid structure
			]);

			mock.method(S3Client.prototype, "send", mockSend);

			await assert.rejects(async () => {
				await fetchDictionaryArtifact("test-bucket", "test-key");
			});
		});

		it("should validate that all items have required fields", async () => {
			const mockSend = mockS3SendResponse([
				{ item_key: "test1", item_value: "value1" },
				{ item_key: "test2" }, // Missing item_value
			]);

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
			mockS3SendResponse([]);

			const result = await fetchDictionaryArtifact(
				"test-bucket",
				"test-key",
			);

			assert.deepStrictEqual(result, []);
		});
	});
});
