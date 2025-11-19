import { describe, it } from "node:test";
import { snapshot } from "node:test";
import { basename } from "path";
import { GuRoot } from "@guardian/cdk/lib/constructs/root.js";
import { Template } from "aws-cdk-lib/assertions";
import { DeploymentLambda } from "./deploymentLambda.ts";

snapshot.setResolveSnapshotPath(
	() =>
		`${import.meta.dirname}/__snapshots__/${basename(
			import.meta.filename,
		)}.snap`,
);

void describe("The ID5 Baton Lambda stack", () => {
	void it("matches the CODE snapshot", ({ assert }) => {
		const app = new GuRoot();
		const stack = new DeploymentLambda(app, "DeploymentLambda", {
			stack: "frontend",
			stage: "CODE",
			env: {
				region: "eu-west-1",
			},
		});
		const template = Template.fromStack(stack);
		assert.snapshot(template.toJSON());
	});

	void it("matches the PROD snapshot", ({ assert }) => {
		const app = new GuRoot();
		const stack = new DeploymentLambda(app, "DeploymentLambda", {
			stack: "frontend",
			stage: "PROD",
			env: {
				region: "eu-west-1",
			},
		});
		const template = Template.fromStack(stack);
		assert.snapshot(template.toJSON());
	});
});
