import "source-map-support/register.js";
import { RiffRaffYamlFile } from "@guardian/cdk/lib/riff-raff-yaml-file/index.js";
import { App } from "aws-cdk-lib";
import { AbTestingConfig } from "../lib/abTestingConfig.ts";

const app = new App({ outdir: "cdk.out/ab-testing-config" });

new AbTestingConfig(app, "AbTestingConfigCode", {
	stack: "frontend",
	stage: "CODE",
	env: {
		region: "eu-west-1",
	},
});

new AbTestingConfig(app, "AbTestingConfigProd", {
	stack: "frontend",
	stage: "PROD",
	env: {
		region: "eu-west-1",
	},
});

const riffRaff = new RiffRaffYamlFile(app);
const {
	riffRaffYaml: { deployments },
} = riffRaff;

deployments.set("config/ab-testing", {
	app: "ab-testing-config-artifact",
	contentDirectory: "ab-testing-config-artifacts",
	type: "aws-s3",
	regions: new Set(["eu-west-1"]),
	stacks: new Set(["frontend"]),
	parameters: {
		bucketSsmKey: "/account/services/dotcom-store.bucket",
		cacheControl: "public, max-age=315360000",
		prefixStack: false,
		publicReadAcl: false,
	},
});

deployments.set("admin/ab-testing", {
	app: "ab-testing-ui-artifact",
	contentDirectory: "ab-testing-ui-artifact",
	type: "aws-s3",
	regions: new Set(["eu-west-1"]),
	stacks: new Set(["frontend"]),
	parameters: {
		bucketSsmKey: "/account/services/dotcom-store.bucket",
		cacheControl: "public, max-age=315360000",
		prefixStack: false,
		publicReadAcl: false,
	},
});

const cfnDeployment = deployments.get(
	`cfn-eu-west-1-frontend-ab-testing-config`,
)!;

// We need the test artifacts in place before deploying the lambda that uses them
cfnDeployment.dependencies = cfnDeployment.dependencies
	? [...cfnDeployment.dependencies, "config/ab-testing"]
	: ["config/ab-testing"];

riffRaff.synth();
