import "source-map-support/register.js";
import { GuRoot } from "@guardian/cdk/lib/constructs/root.js";
import { AbTestingDeploymentLambda } from "../lib/deploymentLambda.ts";

const app = new GuRoot({ outdir: "cdk.out/deployment-lambda" });

new AbTestingDeploymentLambda(app, "AbTestingDeploymentLambdaCode", {
	stack: "frontend",
	stage: "CODE",
	env: {
		region: "eu-west-1",
	},
});

new AbTestingDeploymentLambda(app, "AbTestingDeploymentLambdaProd", {
	stack: "frontend",
	stage: "PROD",
	env: {
		region: "eu-west-1",
	},
});
