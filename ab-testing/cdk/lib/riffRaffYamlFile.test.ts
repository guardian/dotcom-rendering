import { deepEqual, ok } from "node:assert";
import test, { it } from "node:test";
import { GuRoot } from "@guardian/cdk/lib/constructs/root.js";
import { AbTestingConfig } from "./abTestingConfig.ts";
import { AbTestingDeploymentLambda } from "./deploymentLambda.ts";
import { riffRaffYamlFile } from "./riffRaffYamlFile.ts";

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
		});

		new AbTestingDeploymentLambda(app, "AbTestingDeploymentLambda", {
			stack: "frontend",
			stage: "CODE",
			env: {
				region: "eu-west-1",
			},
		});

		const riffRaff = riffRaffYamlFile({ app, stack, region });

		const {
			riffRaffYaml: { deployments },
		} = riffRaff;

		ok(deployments.get("config/ab-testing"));
		ok(deployments.get("admin/ab-testing"));
	});

	it("should have correct dependencies for config CloudFormation deployment", () => {
		const app = new GuRoot();
		const stack = "frontend";
		const region = "eu-west-1";

		new AbTestingConfig(app, "AbTestingConfig", {
			stack: "frontend",
			stage: "CODE",
			env: {
				region: "eu-west-1",
			},
		});

		new AbTestingDeploymentLambda(app, "AbTestingDeploymentLambda", {
			stack: "frontend",
			stage: "CODE",
			env: {
				region: "eu-west-1",
			},
		});

		const riffRaff = riffRaffYamlFile({ app, stack, region });
		const {
			riffRaffYaml: { deployments },
		} = riffRaff;

		const configCloudformationDeploymentName = [
			"cfn",
			region,
			stack,
			"ab-testing-config",
		].join("-");

		const deploymentLambdaDeploymentName = [
			"lambda-update",
			region,
			stack,
			"ab-testing-deployment-lambda",
		].join("-");

		const configCloudformationDeployment = deployments.get(
			configCloudformationDeploymentName,
		);

		const deploymentLambdaDeployment = deployments.get(
			deploymentLambdaDeploymentName,
		);

		ok(
			configCloudformationDeployment,
			"Config CloudFormation deployment not found",
		);

		ok(
			deploymentLambdaDeployment,
			"Deployment Lambda deployment not found",
		);

		deepEqual(
			configCloudformationDeployment.dependencies,
			["config/ab-testing", deploymentLambdaDeploymentName].sort(),
		);
	});
});
