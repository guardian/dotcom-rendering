import type { GuStackProps } from "@guardian/cdk/lib/constructs/core/stack.js";
import { GuStack } from "@guardian/cdk/lib/constructs/core/stack.js";
import { GuLambdaFunction } from "@guardian/cdk/lib/constructs/lambda/index.js";
import { GuS3Bucket } from "@guardian/cdk/lib/constructs/s3/index.js";
import type { App } from "aws-cdk-lib";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { StringParameter } from "aws-cdk-lib/aws-ssm";

export const lambdaFunctionName = "ab-testing-deployment-lambda";

export class AbTestingDeploymentLambda extends GuStack {
	constructor(scope: App, id: string, props: GuStackProps) {
		super(scope, id, props);

		const s3Bucket = GuS3Bucket.fromBucketName(
			this,
			"DictionaryDeployBucket",
			StringParameter.valueForStringParameter(
				this,
				`/account/services/dotcom-store.bucket`,
			),
		);

		const fastlyApiKeyParameter =
			StringParameter.fromSecureStringParameterAttributes(
				this,
				"FastlyApiKeyParameter",
				{
					parameterName: `/ab-testing/${this.stage}/fastly-api-token`,
				},
			);

		const fastlyConfigParameter =
			StringParameter.fromSecureStringParameterAttributes(
				this,
				"FastlyAbTestingConfigParameter",
				{
					parameterName: `/ab-testing/${this.stage}/fastly-config`,
				},
			);

		const lambda = new GuLambdaFunction(this, "AbTestingDeploymentLambda", {
			functionName: `${lambdaFunctionName}-${this.stage}`,
			fileName: "lambda.zip",
			handler: "index.handler",
			app: lambdaFunctionName,
			runtime: Runtime.NODEJS_22_X,
			memorySize: 256,
			environment: {
				STAGE: this.stage,
				ARTIFACT_BUCKET_NAME: s3Bucket.bucketName,
			},
		});

		s3Bucket.grantRead(lambda);
		fastlyApiKeyParameter.grantRead(lambda);
		fastlyConfigParameter.grantRead(lambda);
	}
}
