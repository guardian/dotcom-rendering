import { describe, it } from "node:test";
import { snapshot } from "node:test";
import { basename } from "path";
import { GuRoot } from "@guardian/cdk/lib/constructs/root.js";
import { Template } from "aws-cdk-lib/assertions";
import { AbTestingNotificationLambda } from "./notificationLambda.ts";

snapshot.setResolveSnapshotPath(
	() =>
		`${import.meta.dirname}/__snapshots__/${basename(
			import.meta.filename,
		)}.snap`,
);

void describe("The AB testing notification lambda stack", () => {
	void it("matches the CODE snapshot", ({ assert }) => {
		const app = new GuRoot();
		const stack = new AbTestingNotificationLambda(
			app,
			"AbTestingNotificationLambdaCODE",
			{
				stack: "frontend",
				stage: "CODE",
				env: {
					region: "eu-west-1",
				},
			},
		);
		const template = Template.fromStack(stack);
		assert.snapshot(template.toJSON());
	});

	void it("matches the PROD snapshot", ({ assert }) => {
		const app = new GuRoot();
		const stack = new AbTestingNotificationLambda(
			app,
			"AbTestingNotificationLambdaPROD",
			{
				stack: "frontend",
				stage: "PROD",
				env: {
					region: "eu-west-1",
				},
			},
		);
		const template = Template.fromStack(stack);
		assert.snapshot(template.toJSON());
	});
});
