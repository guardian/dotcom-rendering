import assert from "node:assert";
import { before, describe, it, mock } from "node:test";
import type { Jsonifiable } from "type-fest";

describe("fetch-artifact", () => {
	describe("fetchDictionaryArtifact", () => {
		const mockSend = mock.fn<() => Promise<unknown>>();

		before(() => {
			mock.module("@aws-sdk/client-s3", {
				namedExports: {
					S3Client: class {
						constructor() {}

						send = mockSend;
					},
					GetObjectCommand: class {
						constructor() {}
					},
				},
			});
		});

		const mockS3SendResponse = (responseBody?: Jsonifiable) => {
			const mockBody = {
				transformToString: async () =>
					responseBody ? JSON.stringify(responseBody) : "",
			};
			mockSend.mock.mockImplementation(async () => ({
				Body: mockBody,
			}));
		};

		it("should fetch and parse valid artifact from S3", async () => {
			const mockData = [
				{ item_key: "test1", item_value: "value1" },
				{ item_key: "test2", item_value: "value2" },
			];

			mockS3SendResponse(mockData);

			const { fetchDictionaryArtifact } = await import(
				"./fetch-artifact.ts"
			);

			const result = await fetchDictionaryArtifact(
				"test-bucket",
				"test-key",
			);

			assert.strictEqual(mockSend.mock.calls.length, 1);

			assert.deepStrictEqual(result, mockData);
		});

		it("should throw error when S3 response has no body", async () => {
			mockSend.mock.mockImplementation(async () => ({
				Body: null,
			}));

			const { fetchDictionaryArtifact } = await import(
				"./fetch-artifact.ts"
			);

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
			mockS3SendResponse("invalid json {");

			const { fetchDictionaryArtifact } = await import(
				"./fetch-artifact.ts"
			);

			await assert.rejects(async () => {
				await fetchDictionaryArtifact("test-bucket", "test-key");
			});
		});

		it("should throw error when data structure is invalid", async () => {
			mockS3SendResponse([
				{ wrong_key: "test1", wrong_value: "value1" }, // Invalid structure
			]);

			const { fetchDictionaryArtifact } = await import(
				"./fetch-artifact.ts"
			);

			await assert.rejects(async () => {
				await fetchDictionaryArtifact("test-bucket", "test-key");
			});
		});

		it("should validate that all items have required fields", async () => {
			mockS3SendResponse([
				{ item_key: "test1", item_value: "value1" },
				{ item_key: "test2" }, // Missing item_value
			]);

			const { fetchDictionaryArtifact } = await import(
				"./fetch-artifact.ts"
			);

			await assert.rejects(async () => {
				await fetchDictionaryArtifact("test-bucket", "test-key");
			});
		});

		it("should handle S3 client errors", async () => {
			mockSend.mock.mockImplementation(async () => {
				throw new Error("S3 access denied");
			});

			const { fetchDictionaryArtifact } = await import(
				"./fetch-artifact.ts"
			);

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

			const { fetchDictionaryArtifact } = await import(
				"./fetch-artifact.ts"
			);

			const result = await fetchDictionaryArtifact(
				"test-bucket",
				"test-key",
			);

			assert.deepStrictEqual(result, []);
		});
	});
});
