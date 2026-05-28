import type { GuStackProps } from "@guardian/cdk/lib/constructs/core/stack.js";
import { GuStack } from "@guardian/cdk/lib/constructs/core/stack.js";
import type { App } from "aws-cdk-lib";
import { CfnParameter, CustomResource, Duration } from "aws-cdk-lib";
import { Function } from "aws-cdk-lib/aws-lambda";
import { lambdaFunctionName } from "./deploymentLambda.ts";

export class AbTestingConfig extends GuStack {
	constructor(scope: App, id: string, props: GuStackProps) {
		super(scope, id, props);

		const lambda = Function.fromFunctionName(
			this,
			"DeploymentLambdaFunction",
			`${lambdaFunctionName}-${this.stage}`,
		);

		const buildId = new CfnParameter(this, "BuildId", {
			type: "String",
			description:
				"The riff-raff build id, automatically generated and provided by riff-raff",
		});

		// Trigger the Lambda to run upon deployment
		new CustomResource(this, "InvokeDictionaryDeployLambda", {
			serviceToken: lambda.functionArn,
			serviceTimeout: Duration.minutes(5),
			resourceType: "Custom::FastlyEdgeDictionaryDeploy",
			properties: {
				/** Ensures the custom resource is invoked on every deploy */
				BuildId: buildId.valueAsString,
			},
		});
	}
}
