import type { CloudFormationCustomResourceEvent, Context } from "aws-lambda";

const SUCCESS = "SUCCESS";
const FAILED = "FAILED";

type Status = typeof SUCCESS | typeof FAILED;

const maskCredentialsAndSignature = (message: string) => {
	return message
		.replace(/X-Amz-Credential=[^&\s]+/i, "X-Amz-Credential=*****")
		.replace(/X-Amz-Signature=[^&\s]+/i, "X-Amz-Signature=*****");
};

// Modernised implementation of cfn-response's send function using fetch
// https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-lambda-function-code-cfnresponsemodule.html
const send = async (
	event: CloudFormationCustomResourceEvent,
	context: Context,
	responseStatus: Status,
	responseData?: unknown,
	physicalResourceId?: string,
) => {
	const responseBody = JSON.stringify({
		Status: responseStatus,
		Reason:
			"See the details in CloudWatch Log Stream: " +
			context.logStreamName,
		// This is copied from the AWS docs example, it needs to be unique for each resource
		// The logStreamName is unique per invocation so using that works
		PhysicalResourceId: physicalResourceId ?? context.logStreamName,
		StackId: event.StackId,
		RequestId: event.RequestId,
		LogicalResourceId: event.LogicalResourceId,
		Data: responseData,
	});

	console.log("Response body:\n", responseBody);
	console.log("Sending response to:", event.ResponseURL);

	try {
		await fetch(event.ResponseURL, {
			method: "PUT",
			headers: {
				"content-type": "",
			},
			body: responseBody,
		});
	} catch (error) {
		console.log(
			"send(..) failed executing fetch: " +
				maskCredentialsAndSignature(String(error)),
		);
		throw error;
	}
};

export { send, SUCCESS, FAILED };
export type { Status };
