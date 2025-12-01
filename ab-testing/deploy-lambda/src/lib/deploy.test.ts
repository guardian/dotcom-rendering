import assert from "node:assert";
import { beforeEach, describe, it, mock } from "node:test";
import * as deployDictionary from "./deploy-dictionary.ts";
import { fetchAndDeployArtifacts } from "./deploy.ts";
import * as fetchArtifact from "./fetch-artifact.ts";

describe("deploy", () => {
	beforeEach(() => {
		// Set required environment variables for tests
		process.env.ARTIFACT_BUCKET_NAME = "test-bucket";
		process.env.STAGE = "TEST";
	});

	describe("fetchAndDeployArtifacts", () => {
		it("should fetch and deploy artifacts in parallel", async () => {
			const mockKeyValues = [{ item_key: "test1", item_value: "value1" }];

			const mockFetchArtifact = mock.fn(async () => mockKeyValues);
			const mockDeployDictionary = mock.fn(async () => {});

			mock.method(
				fetchArtifact,
				"fetchDictionaryArtifact",
				mockFetchArtifact,
			);
			mock.method(
				deployDictionary,
				"deployDictionary",
				mockDeployDictionary,
			);

			const mockDictionary1 = {
				name: "ab-tests-dictionary",
			};
			const mockDictionary2 = {
				name: "mvt-dictionary",
			};

			await fetchAndDeployArtifacts([
				{
					artifact: "ab-tests.json",
					dictionary: mockDictionary1 as never,
				},
				{
					artifact: "mvts.json",
					dictionary: mockDictionary2 as never,
				},
			]);

			// Should fetch artifacts for both dictionaries
			assert.strictEqual(mockFetchArtifact.mock.calls.length, 2);

			// Should deploy to both dictionaries
			assert.strictEqual(mockDeployDictionary.mock.calls.length, 2);
		});

		it("should use correct S3 paths for artifacts", async () => {
			const mockKeyValues = [{ item_key: "test1", item_value: "value1" }];

			const mockFetchArtifact = mock.fn(async () => mockKeyValues);
			const mockDeployDictionary = mock.fn(async () => {});

			mock.method(
				fetchArtifact,
				"fetchDictionaryArtifact",
				mockFetchArtifact,
			);
			mock.method(
				deployDictionary,
				"deployDictionary",
				mockDeployDictionary,
			);

			const mockDictionary = {
				name: "test-dictionary",
			};

			await fetchAndDeployArtifacts([
				{
					artifact: "ab-tests.json",
					dictionary: mockDictionary as never,
				},
			]);

			// Verify correct S3 bucket and path were used
			assert.strictEqual(mockFetchArtifact.mock.calls.length, 1);
		});

		it("should throw error when artifact fetch fails", async () => {
			const mockFetchArtifact = mock.fn(async () => {
				throw new Error("S3 fetch failed");
			});
			const mockDeployDictionary = mock.fn(async () => {});

			mock.method(
				fetchArtifact,
				"fetchDictionaryArtifact",
				mockFetchArtifact,
			);
			mock.method(
				deployDictionary,
				"deployDictionary",
				mockDeployDictionary,
			);

			const mockDictionary = {
				name: "test-dictionary",
			};

			await assert.rejects(
				async () => {
					await fetchAndDeployArtifacts([
						{
							artifact: "ab-tests.json",
							dictionary: mockDictionary as never,
						},
					]);
				},
				{
					name: "Error",
					message: "S3 fetch failed",
				},
			);
		});

		it("should throw error when deployment fails", async () => {
			const mockKeyValues = [{ item_key: "test1", item_value: "value1" }];

			const mockFetchArtifact = mock.fn(async () => mockKeyValues);
			const mockDeployDictionary = mock.fn(async () => {
				throw new Error("Deployment failed");
			});

			mock.method(
				fetchArtifact,
				"fetchDictionaryArtifact",
				mockFetchArtifact,
			);
			mock.method(
				deployDictionary,
				"deployDictionary",
				mockDeployDictionary,
			);

			const mockDictionary = {
				name: "test-dictionary",
			};

			await assert.rejects(
				async () => {
					await fetchAndDeployArtifacts([
						{
							artifact: "ab-tests.json",
							dictionary: mockDictionary as never,
						},
					]);
				},
				{
					name: "Error",
					message: "Deployment failed",
				},
			);
		});

		it("should handle empty deployments array", async () => {
			const mockFetchArtifact = mock.fn(async () => []);
			const mockDeployDictionary = mock.fn(async () => {});

			mock.method(
				fetchArtifact,
				"fetchDictionaryArtifact",
				mockFetchArtifact,
			);
			mock.method(
				deployDictionary,
				"deployDictionary",
				mockDeployDictionary,
			);

			await fetchAndDeployArtifacts([]);

			assert.strictEqual(mockFetchArtifact.mock.calls.length, 0);
			assert.strictEqual(mockDeployDictionary.mock.calls.length, 0);
		});
	});
});
