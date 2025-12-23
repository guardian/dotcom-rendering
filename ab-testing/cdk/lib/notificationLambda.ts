import { GuScheduledLambda } from "@guardian/cdk";
import {
	GuStack,
	type GuStackProps,
} from "@guardian/cdk/lib/constructs/core/stack.js";
import type { App } from "aws-cdk-lib";
import { Schedule } from "aws-cdk-lib/aws-events";
import { Runtime } from "aws-cdk-lib/aws-lambda";

export const lambdaFunctionName = "ab-testing-notification-lambda";

export class AbTestingNotificationLambda extends GuStack {
	constructor(scope: App, id: string, props: GuStackProps) {
		super(scope, id, props);

		// const lambda =
		new GuScheduledLambda(this, "AbTestingNotificationLambda", {
			app: lambdaFunctionName,
			fileName: "lambda.zip",
			handler: "index.handler",
			rules: [
				{
					// 5am daily on weekdays
					schedule: Schedule.expression("cron(0 5 ? * MON-FRI *)"),
					description:
						"Daily expiry checks for AB testing configuration",
				},
			],
			monitoringConfiguration: { noMonitoring: true },
			runtime: Runtime.NODEJS_22_X,
		});
	}
}
