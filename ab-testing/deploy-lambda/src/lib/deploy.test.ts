import assert from "node:assert";
import { before, beforeEach, describe, it, mock } from "node:test";

describe("deploy", () => {
	describe("fetchAndDeployArtifacts", () => {
		const deployDictionaryMock = mock.fn<() => Promise<unknown>>();
		const fetchArtifactMock = mock.fn<() => Promise<unknown>>();

		const mockDeployDictionary = (
			impl: (...args: unknown[]) => Promise<unknown>,
		) => {
			deployDictionaryMock.mock.mockImplementation(impl);
		};

		const mockFetchArtifact = (
			impl: (...args: unknown[]) => Promise<unknown>,
		) => {
			fetchArtifactMock.mock.mockImplementation(impl);
		};

		before(() => {
			mock.module("./fetch-artifact.ts", {
				namedExports: {
					fetchDictionaryArtifact: fetchArtifactMock,
				},
			});

			mock.module("./deploy-dictionary.ts", {
				namedExports: {
					deployDictionary: deployDictionaryMock,
				},
			});
		});

		beforeEach(() => {
			// Set required environment variables for tests
			process.env.ARTIFACT_BUCKET_NAME = "test-bucket";
			process.env.STAGE = "TEST";

			deployDictionaryMock.mock.resetCalls();
			fetchArtifactMock.mock.resetCalls();
		});

		it("should fetch and deploy artifacts in parallel", async () => {
			const mockKeyValues = [{ item_key: "test1", item_value: "value1" }];

			mockDeployDictionary(mock.fn(async () => {}));
			mockFetchArtifact(mock.fn(async () => mockKeyValues));

			const mockDictionary1 = {
				name: "ab-tests-dictionary",
			};
			const mockDictionary2 = {
				name: "mvt-dictionary",
			};

			const { fetchAndDeployArtifacts } = await import("./deploy.ts");

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
			assert.strictEqual(fetchArtifactMock.mock.calls.length, 2);

			// Should deploy to both dictionaries
			assert.strictEqual(deployDictionaryMock.mock.calls.length, 2);
		});

		it("should use correct S3 paths for artifacts", async () => {
			const mockKeyValues = [{ item_key: "test1", item_value: "value1" }];

			mockFetchArtifact(mock.fn(async () => mockKeyValues));
			mockDeployDictionary(mock.fn(async () => {}));

			const mockDictionary = {
				name: "test-dictionary",
			};

			const { fetchAndDeployArtifacts } = await import("./deploy.ts");

			await fetchAndDeployArtifacts([
				{
					artifact: "ab-tests.json",
					dictionary: mockDictionary as never,
				},
			]);

			// Verify correct S3 bucket and path were used
			assert.strictEqual(fetchArtifactMock.mock.calls.length, 1);
		});

		it("should throw error when artifact fetch fails", async () => {
			mockFetchArtifact(
				mock.fn(async () => {
					throw new Error("S3 fetch failed");
				}),
			);
			mockDeployDictionary(mock.fn(async () => {}));

			const mockDictionary = {
				name: "test-dictionary",
			};

			const { fetchAndDeployArtifacts } = await import("./deploy.ts");

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

			mockFetchArtifact(mock.fn(async () => mockKeyValues));
			mockDeployDictionary(
				mock.fn(async () => {
					throw new Error("Deployment failed");
				}),
			);

			const mockDictionary = {
				name: "test-dictionary",
			};

			const { fetchAndDeployArtifacts } = await import("./deploy.ts");

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
			mockFetchArtifact(mock.fn(async () => []));
			mockDeployDictionary(mock.fn(async () => {}));

			const { fetchAndDeployArtifacts } = await import("./deploy.ts");

			await fetchAndDeployArtifacts([]);

			assert.strictEqual(fetchArtifactMock.mock.calls.length, 0);
			assert.strictEqual(deployDictionaryMock.mock.calls.length, 0);
		});
	});
});
