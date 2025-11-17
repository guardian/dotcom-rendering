import "source-map-support/register.js";
import { RiffRaffYamlFile } from "@guardian/cdk/lib/riff-raff-yaml-file/index.js";
import { App } from "aws-cdk-lib";
import { DictionaryDeployLambda } from "../lib/dictionaryDeployLambda.ts";

const app = new App();

const appName = "ab-testing-deploy";

new DictionaryDeployLambda(app, "DictionaryDeployLambdaCode", {
	stack: "frontend",
	stage: "CODE",
	env: {
		region: "eu-west-1",
	},
	app: appName,
});

new DictionaryDeployLambda(app, "DictionaryDeployLambdaProd", {
	stack: "frontend",
	stage: "PROD",
	env: {
		region: "eu-west-1",
	},
	app: appName,
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

// We need the test artifacts in place before deploying the lambda that uses them
deployments
	.get(`cfn-eu-west-1-frontend-dictionary-deploy-lambda`)
	?.dependencies?.push("config/ab-testing");

riffRaff.synth();
