import type { GuStackProps } from "@guardian/cdk/lib/constructs/core/stack.js";
import { GuStack } from "@guardian/cdk/lib/constructs/core/stack.js";
import { GuLambdaFunction } from "@guardian/cdk/lib/constructs/lambda/index.js";
import { GuS3Bucket } from "@guardian/cdk/lib/constructs/s3/index.js";
import type { App } from "aws-cdk-lib";
import { CustomResource } from "aws-cdk-lib";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { StringParameter } from "aws-cdk-lib/aws-ssm";

type Props = GuStackProps & {
	app: string;
};

export class DictionaryDeployLambda extends GuStack {
	constructor(scope: App, id: string, props: Props) {
		super(scope, id, props);

		const { app } = props;

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
					parameterName: `/${app}/${this.stage}/fastly-api-token`,
				},
			);

		const fastlyConfigParameter =
			StringParameter.fromSecureStringParameterAttributes(
				this,
				"FastlyAbTestingConfigParameter",
				{
					parameterName: `/${app}/${this.stage}/fastly-ab-testing-config`,
				},
			);

		const lambda = new GuLambdaFunction(this, "DictionaryDeployLambda", {
			functionName: `${app}-${this.stage}`,
			fileName: "lambda.zip",
			handler: "index.handler",
			app,
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

		// Trigger the Lambda to run upon deployment
		new CustomResource(this, "InvokeDictionaryDeployLambda", {
			serviceToken: lambda.functionArn,
		});
	}
}
