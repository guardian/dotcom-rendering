import "source-map-support/register.js";
import { App } from "aws-cdk-lib";
import { AbTestingConfig } from "../lib/abTestingConfig.ts";
import { AbTestingDeploymentLambda } from "../lib/deploymentLambda.ts";
import { AbTestingNotificationLambda } from "../lib/notificationLambda.ts";
import { riffRaffYamlFile } from "../lib/riffRaffYamlFile.ts";

const app = new App();

const region = "eu-west-1";
const stack = "frontend";

new AbTestingDeploymentLambda(app, "AbTestingDeploymentLambdaCode", {
	stack,
	stage: "CODE",
	env: {
		region,
	},
});

new AbTestingDeploymentLambda(app, "AbTestingDeploymentLambdaProd", {
	stack,
	stage: "PROD",
	env: {
		region,
	},
});

new AbTestingNotificationLambda(app, "AbTestingNotificationLambdaCode", {
	stack,
	stage: "CODE",
	env: {
		region,
	},
});

// Commented out during testing
// new AbTestingNotificationLambda(app, "AbTestingNotificationLambdaProd", {
// 	stack,
// 	stage: "PROD",
// 	env: {
// 		region,
// 	},
// });

new AbTestingConfig(app, "AbTestingConfigCode", {
	stack,
	stage: "CODE",
	env: {
		region,
	},
});

new AbTestingConfig(app, "AbTestingConfigProd", {
	stack,
	stage: "PROD",
	env: {
		region,
	},
});

const riffRaff = riffRaffYamlFile({ app, stack, region });

riffRaff.synth();
