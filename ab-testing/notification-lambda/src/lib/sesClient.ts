import { SESClient } from "@aws-sdk/client-ses";
import { fromIni, fromNodeProviderChain } from "@aws-sdk/credential-providers";

const IS_RUNNING_LOCALLY = !process.env.LAMBDA_TASK_ROOT;

const standardAwsConfig = {
	region: "eu-west-1",
	credentials: IS_RUNNING_LOCALLY
		? fromIni({ profile: "frontend" })
		: fromNodeProviderChain(),
};

export const sesClient = new SESClient(standardAwsConfig);
