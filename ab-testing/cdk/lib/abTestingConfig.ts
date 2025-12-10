import type { GuStackProps } from "@guardian/cdk/lib/constructs/core/stack.js";
import { GuStack } from "@guardian/cdk/lib/constructs/core/stack.js";
import type { App } from "aws-cdk-lib";
import { CustomResource, Duration } from "aws-cdk-lib";
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

		// Trigger the Lambda to run upon deployment
		new CustomResource(this, "InvokeDictionaryDeployLambda", {
			serviceToken: lambda.functionArn,
			serviceTimeout: Duration.minutes(5),
			resourceType: "Custom::FastlyEdgeDictionaryDeploy",
		});
	}
}
