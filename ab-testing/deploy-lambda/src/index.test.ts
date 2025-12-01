import assert from "node:assert";
import { afterEach, beforeEach, describe, it, mock } from "node:test";
import type { CloudFormationCustomResourceEvent, Context } from "aws-lambda";

describe("index", () => {
	const mockContext: Context = {
		callbackWaitsForEmptyEventLoop: false,
		functionName: "test-function",
		functionVersion: "$LATEST",
		invokedFunctionArn:
			"arn:aws:lambda:eu-west-1:123456789012:function:test-function",
		memoryLimitInMB: "128",
		awsRequestId: "test-aws-request-id",
		logGroupName: "/aws/lambda/test-function",
		logStreamName: "2025/12/01/[$LATEST]test-stream",
		getRemainingTimeInMillis: () => 300000,
		done: () => {},
		fail: () => {},
		succeed: () => {},
	};

	afterEach(() => {
		mock.restoreAll();
	});

	describe("handler", async () => {
		const customResourceSendMock = mock.fn();
		const fetchAndDeployMock = mock.fn();

		const getDictionaryItemsMock = mock.fn();
		const updateDictionaryItemsMock = mock.fn(async () => {
			return { status: "ok" };
		});

		const getServiceMock = mock.fn(async () => {
			return {
				getDictionary: async (name: string) => {
					return {
						name,
						getItems: getDictionaryItemsMock,
						updateItems: updateDictionaryItemsMock,
					};
				},
			};
		});

		beforeEach(async () => {
			mock.module("@guardian/ab-testing-config/lib/fastly/client.ts", {
				namedExports: {
					FastlyClient: class {
						constructor() {}

						getService = getServiceMock;
					},
				},
			});

			mock.module("./lib/fastly-config.ts", {
				namedExports: {
					getFastlyApiToken: async () => {
						return "test-api-token";
					},
					getFastlyConfig: async () => {
						return {
							serviceId: "test-service-id",
							serviceName: "test-service",
							abTestsDictionaryName: "ab-tests",
							mvtDictionaryName: "mvt-groups",
						};
					},
				},
			});

			mock.module("./lib/custom-resource-response.ts", {
				namedExports: {
					send: customResourceSendMock,
				},
			});

			mock.module("./lib/deploy.ts", {
				namedExports: {
					fetchAndDeployArtifacts: fetchAndDeployMock,
				},
			});

			customResourceSendMock.mock.resetCalls();
			fetchAndDeployMock.mock.resetCalls();
			getDictionaryItemsMock.mock.resetCalls();
			updateDictionaryItemsMock.mock.resetCalls();
		});

		await it("should send SUCCESS for Delete events without deploying", async () => {
			const deleteEvent: CloudFormationCustomResourceEvent = {
				RequestType: "Delete",
				ServiceToken:
					"arn:aws:lambda:eu-west-1:123456789012:function:test-function",
				ResponseURL: "https://example.com/response",
				StackId:
					"arn:aws:cloudformation:eu-west-1:123456789012:stack/test-stack/test-id",
				RequestId: "test-request-id",
				LogicalResourceId: "TestResource",
				ResourceType: "Custom::DictionaryDeployer",
				PhysicalResourceId: "test-physical-id",
				ResourceProperties: {
					ServiceToken:
						"arn:aws:lambda:eu-west-1:123456789012:function:test-function",
				},
			};

			const { handler } = await import("./index.ts");

			await handler(deleteEvent, mockContext);

			assert.strictEqual(customResourceSendMock.mock.calls.length, 1);

			const call = customResourceSendMock.mock.calls[0];

			assert.strictEqual(call?.arguments[2], "SUCCESS");

			// Should not attempt to deploy
			assert.strictEqual(fetchAndDeployMock.mock.calls.length, 0);
		});

		await it("should deploy dictionaries for Create events", async () => {
			process.env.STAGE = "TEST";

			const createEvent: CloudFormationCustomResourceEvent = {
				RequestType: "Create",
				ServiceToken:
					"arn:aws:lambda:eu-west-1:123456789012:function:test-function",
				ResponseURL: "https://example.com/response",
				StackId:
					"arn:aws:cloudformation:eu-west-1:123456789012:stack/test-stack/test-id",
				RequestId: "test-request-id",
				LogicalResourceId: "TestResource",
				ResourceType: "Custom::DictionaryDeployer",
				ResourceProperties: {
					ServiceToken:
						"arn:aws:lambda:eu-west-1:123456789012:function:test-function",
				},
			};

			const { handler } = await import("./index.ts");

			await handler(createEvent, mockContext);

			// Should send SUCCESS response
			assert.strictEqual(customResourceSendMock.mock.calls.length, 1);
			const call = customResourceSendMock.mock.calls[0];
			assert.strictEqual(call?.arguments[2], "SUCCESS");

			// Should attempt to deploy
			assert.strictEqual(fetchAndDeployMock.mock.calls.length, 1);
		});

		await it("should deploy dictionaries for update events", async () => {
			process.env.STAGE = "TEST";

			const updateEvent: CloudFormationCustomResourceEvent = {
				RequestType: "Update",
				ServiceToken:
					"arn:aws:lambda:eu-west-1:123456789012:function:test-function",
				ResponseURL: "https://example.com/response",
				StackId:
					"arn:aws:cloudformation:eu-west-1:123456789012:stack/test-stack/test-id",
				RequestId: "test-request-id",
				LogicalResourceId: "TestResource",
				PhysicalResourceId: "test-physical-id",
				ResourceType: "Custom::DictionaryDeployer",
				ResourceProperties: {
					ServiceToken:
						"arn:aws:lambda:eu-west-1:123456789012:function:test-function",
				},
				OldResourceProperties: {
					ServiceToken:
						"arn:aws:lambda:eu-west-1:123456789012:function:test-function",
				},
			};

			const { handler } = await import("./index.ts");

			await handler(updateEvent, mockContext);

			// Should send SUCCESS response
			assert.strictEqual(customResourceSendMock.mock.calls.length, 1);
			const call = customResourceSendMock.mock.calls[0];
			assert.strictEqual(call?.arguments[2], "SUCCESS");

			// Should attempt to deploy
			assert.strictEqual(fetchAndDeployMock.mock.calls.length, 1);
		});

		await it("should send FAILED response when deployment errors occur", async () => {
			process.env.STAGE = "TEST";

			fetchAndDeployMock.mock.mockImplementation(() => {
				throw new Error("Deployment failed");
			});

			const createEvent: CloudFormationCustomResourceEvent = {
				RequestType: "Create",
				ServiceToken:
					"arn:aws:lambda:eu-west-1:123456789012:function:test-function",
				ResponseURL: "https://example.com/response",
				StackId:
					"arn:aws:cloudformation:eu-west-1:123456789012:stack/test-stack/test-id",
				RequestId: "test-request-id",
				LogicalResourceId: "TestResource",
				ResourceType: "Custom::DictionaryDeployer",
				ResourceProperties: {
					ServiceToken:
						"arn:aws:lambda:eu-west-1:123456789012:function:test-function",
				},
			};

			const { handler } = await import("./index.ts");

			await handler(createEvent, mockContext);

			// Should send FAILED response
			assert.strictEqual(customResourceSendMock.mock.calls.length, 1);
			const call = customResourceSendMock.mock.calls[0];
			assert.strictEqual(call?.arguments[2], "FAILED");

			// Should attempt to deploy
			assert.strictEqual(fetchAndDeployMock.mock.calls.length, 1);
		});

		await it("should send faild event if fastly token is expired", async () => {
			process.env.STAGE = "TEST";

			getServiceMock.mock.mockImplementation(() => {
				throw new Error("Fastly API token expired");
			});

			const createEvent: CloudFormationCustomResourceEvent = {
				RequestType: "Create",
				ServiceToken:
					"arn:aws:lambda:eu-west-1:123456789012:function:test-function",
				ResponseURL: "https://example.com/response",
				StackId:
					"arn:aws:cloudformation:eu-west-1:123456789012:stack/test-stack/test-id",
				RequestId: "test-request-id",
				LogicalResourceId: "TestResource",
				ResourceType: "Custom::DictionaryDeployer",
				ResourceProperties: {
					ServiceToken:
						"arn:aws:lambda:eu-west-1:123456789012:function:test-function",
				},
			};

			const { handler } = await import("./index.ts");

			await handler(createEvent, mockContext);

			// Should send FAILED response
			assert.strictEqual(customResourceSendMock.mock.calls.length, 1);
			const call = customResourceSendMock.mock.calls[0];
			assert.strictEqual(call?.arguments[2], "FAILED");

			// Should attempt to deploy
			assert.strictEqual(fetchAndDeployMock.mock.calls.length, 0);
		});
	});
});
