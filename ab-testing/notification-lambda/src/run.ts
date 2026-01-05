#!/usr/bin/env node
/**
 * Run the lambda handler locally using frontend AWS account credentials
 *
 * Usage:
 *   STAGE=CODE node src/run.ts
 *   STAGE=PROD node src/run.ts
 *
 * Prerequisites:
 *   - AWS credentials for the frontend account must be configured
 */

import type { CloudFormationCustomResourceEvent, Context } from "aws-lambda";
import { handler } from "./index.ts";

const stage = process.env.STAGE ?? "CODE";
const emailDomain =
	process.env.EMAIL_DOMAIN ??
	`notifications@abtesting.local.dev-gutools.co.uk`;

process.env.EMAIL_DOMAIN = emailDomain;

// Create a mock CloudFormation event
const mockEvent: CloudFormationCustomResourceEvent = {
	RequestType: "Create",
	ServiceToken:
		"arn:aws:lambda:eu-west-1:123456789012:function:mock-function",
	ResponseURL:
		"https://cloudformation-custom-resource-response.s3.amazonaws.com/mock-url",
	StackId:
		"arn:aws:cloudformation:eu-west-1:123456789012:stack/mock-stack/mock-id",
	RequestId: "mock-request-id",
	LogicalResourceId: "MockResource",
	ResourceType: "Custom::DictionaryDeployer",
	ResourceProperties: {
		ServiceToken:
			"arn:aws:lambda:eu-west-1:123456789012:function:mock-function",
	},
};

// Create a mock Lambda context
const mockContext: Context = {
	callbackWaitsForEmptyEventLoop: false,
	functionName: "ab-testing-notification-lambda-local",
	functionVersion: "$LATEST",
	invokedFunctionArn:
		"arn:aws:lambda:eu-west-1:123456789012:function:mock-function",
	memoryLimitInMB: "512",
	awsRequestId: "mock-request-id",
	logGroupName: "/aws/lambda/ab-testing-notification-lambda-local",
	logStreamName: "2025/11/19/[$LATEST]mock-stream",
	getRemainingTimeInMillis: () => 300000,
	done: () => {},
	fail: () => {},
	succeed: () => {},
};

console.log(
	`Running lambda handler locally with STAGE=${stage} and EMAIL_DOMAIN=${emailDomain}\n`,
);

// Run the handler
// Cast to unknown then to the correct function type to work around typing issues
const runHandler = handler as unknown as (
	event: CloudFormationCustomResourceEvent,
	context: Context,
	callback: () => void,
) => Promise<void>;

void (async () => {
	try {
		await runHandler(mockEvent, mockContext, () => {});
		console.log("\n✅ Lambda handler completed successfully");
		process.exit(0);
	} catch (error) {
		console.error("\n❌ Lambda handler failed:", error);
		process.exit(1);
	}
})();
