import { App } from "aws-cdk-lib";
import { AbTestingConfig } from "../lib/abTestingConfig.ts";
import { AbTestingDeploymentLambda } from "../lib/deploymentLambda.ts";
import { AbTestingNotificationLambda } from "../lib/notificationLambda.ts";
import { riffRaffYamlFile } from "../lib/riffRaffYamlFile.ts";

const app = new App();

const region = "eu-west-1";
const stack = "frontend";
const riffRaffProjectName = "dotcom:ab-testing";

new AbTestingDeploymentLambda(app, "AbTestingDeploymentLambdaCode", {
	stack,
	stage: "CODE",
	env: {
		region,
	},
	riffRaffProjectName,
});

new AbTestingDeploymentLambda(app, "AbTestingDeploymentLambdaProd", {
	stack,
	stage: "PROD",
	env: {
		region,
	},
	riffRaffProjectName,
});

new AbTestingConfig(app, "AbTestingConfigCode", {
	stack,
	stage: "CODE",
	env: {
		region,
	},
	riffRaffProjectName,
});

new AbTestingConfig(app, "AbTestingConfigProd", {
	stack,
	stage: "PROD",
	env: {
		region,
	},
	riffRaffProjectName,
});

new AbTestingNotificationLambda(app, "AbTestingNotificationLambdaCode", {
	stack,
	stage: "CODE",
	env: {
		region,
	},
	riffRaffProjectName,
});

new AbTestingNotificationLambda(app, "AbTestingNotificationLambdaProd", {
	stack,
	stage: "PROD",
	env: {
		region,
	},
	riffRaffProjectName,
});

const riffRaff = riffRaffYamlFile({ app, stack, region, riffRaffProjectName });

riffRaff.synth();
