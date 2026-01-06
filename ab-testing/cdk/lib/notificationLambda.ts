import { GuScheduledLambda } from "@guardian/cdk";
import {
	GuStack,
	type GuStackProps,
} from "@guardian/cdk/lib/constructs/core/stack.js";
import { GuEmailIdentity } from "@guardian/cdk/lib/constructs/ses/index.js";
import type { App } from "aws-cdk-lib";
import { Schedule } from "aws-cdk-lib/aws-events";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { Subscription, SubscriptionProtocol, Topic } from "aws-cdk-lib/aws-sns";

const lambdaFunctionName = "ab-testing-notification-lambda";

const getEmailDomain = (stage: GuStackProps["stage"]) => {
	switch (stage) {
		case "PROD":
			return "abtesting.gutools.co.uk";
		case "CODE":
		default:
			return "abtesting.code.dev-gutools.co.uk";
	}
};

export class AbTestingNotificationLambda extends GuStack {
	constructor(scope: App, id: string, props: GuStackProps) {
		super(scope, id, props);

		const runDailyRule = {
			// 5am daily on weekdays
			schedule: Schedule.expression("cron(0 5 ? * MON-FRI *)"),
			description: "Daily expiry checks for AB testing configuration",
		};

		const emailIdentity = new GuEmailIdentity(this, "EmailIdentity", {
			app: lambdaFunctionName,
			domainName: getEmailDomain(props.stage),
		});

		const snsTopic = new Topic(this, "AbTestingNotificationSnsTopic");

		// Notify teams in PROD if this lambda errors
		if (props.stage === "PROD") {
			new Subscription(this, "ABTestingNotificationErrors", {
				topic: snsTopic,
				// TODO: Change this to dig.dev.web-engineers@theguardian.com after testing for a while
				endpoint: "commercial.dev@guardian.co.uk",
				protocol: SubscriptionProtocol.EMAIL,
			});
		}

		const lambda = new GuScheduledLambda(
			this,
			"AbTestingNotificationLambda",
			{
				app: lambdaFunctionName,
				fileName: "lambda.zip",
				handler: "index.handler",
				rules: this.stage === "PROD" ? [runDailyRule] : [],
				monitoringConfiguration: {
					snsTopicName: snsTopic.topicName,
					toleratedErrorPercentage: 0,
				},
				runtime: Runtime.NODEJS_22_X,
				environment: {
					STAGE: props.stage,
					EMAIL_DOMAIN: emailIdentity.emailIdentityName,
				},
			},
		);

		lambda.addToRolePolicy(
			new PolicyStatement({
				effect: Effect.ALLOW,
				actions: ["ses:SendEmail"],
				resources: [emailIdentity.emailIdentityArn],
			}),
		);
	}
}
