import { deepEqual, ok } from "node:assert";
import test, { it } from "node:test";
import { GuRoot } from "@guardian/cdk/lib/constructs/root.js";
import { AbTestingConfig } from "./abTestingConfig.ts";
import { AbTestingDeploymentLambda } from "./deploymentLambda.ts";
import { riffRaffYamlFile } from "./riffRaffYamlFile.ts";

const riffRaffProjectName = "dotcom:ab-testing";

test("riffRaffYamlFile", async () => {
	await it("should have config deployments", () => {
		const app = new GuRoot();
		const stack = "frontend";
		const region = "eu-west-1";

		new AbTestingConfig(app, "AbTestingConfig", {
			stack: "frontend",
			stage: "CODE",
			env: {
				region: "eu-west-1",
			},
			riffRaffProjectName,
		});

		new AbTestingDeploymentLambda(app, "AbTestingDeploymentLambda", {
			stack: "frontend",
			stage: "CODE",
			env: {
				region: "eu-west-1",
			},
			riffRaffProjectName,
		});

		const riffRaff = riffRaffYamlFile({
			app,
			stack,
			region,
			riffRaffProjectName,
		});

		const { configuration } = riffRaff;

		ok(
			configuration
				.get("dotcom:ab-testing")
				?.deployments.get("config/ab-testing"),
		);
		ok(
			configuration
				.get("dotcom:ab-testing")
				?.deployments.get("admin/ab-testing"),
		);
	});

	it("should have correct dependencies for config CloudFormation deployment", () => {
		const app = new GuRoot();
		const stack = "frontend";
		const region = "eu-west-1";

		new AbTestingConfig(app, "AbTestingConfig", {
			stack,
			stage: "CODE",
			env: {
				region,
			},
			riffRaffProjectName,
		});

		new AbTestingDeploymentLambda(app, "AbTestingDeploymentLambda", {
			stack,
			stage: "CODE",
			env: {
				region,
			},
			riffRaffProjectName,
		});

		const riffRaff = riffRaffYamlFile({
			app,
			stack,
			region,
			riffRaffProjectName,
		});
		const { configuration } = riffRaff;

		const configCloudformationDeploymentName = `cfn-${region}-${stack}-ab-testing-config`;

		const deploymentLambdaDeploymentName = `lambda-update-${region}-${stack}-ab-testing-deployment-lambda`;

		const configCloudformationDeployment = configuration
			.get(riffRaffProjectName)
			?.deployments.get(configCloudformationDeploymentName);

		deepEqual(
			[...(configCloudformationDeployment?.dependencies ?? [])].sort(),
			["config/ab-testing", deploymentLambdaDeploymentName].sort(),
		);
	});
});
