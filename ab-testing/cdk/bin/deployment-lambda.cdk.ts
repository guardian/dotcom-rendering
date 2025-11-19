import "source-map-support/register.js";
import { GuRoot } from "@guardian/cdk/lib/constructs/root.js";
import { DeploymentLambda } from "../lib/deploymentLambda.ts";

const app = new GuRoot({ outdir: "cdk.out/deployment-lambda" });

new DeploymentLambda(app, "AbTestingDeploymentLambdaCode", {
	stack: "frontend",
	stage: "CODE",
	env: {
		region: "eu-west-1",
	},
});

new DeploymentLambda(app, "AbTestingDeploymentLambdaProd", {
	stack: "frontend",
	stage: "PROD",
	env: {
		region: "eu-west-1",
	},
});
