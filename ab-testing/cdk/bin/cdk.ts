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

const abTestingArtifactDeployment = "ab-testing-dictionary-artifact";

deployments.set(abTestingArtifactDeployment, {
	app: abTestingArtifactDeployment,
	contentDirectory: "dictionary-deploy-lambda/artifacts",
	type: "aws-s3",
	regions: new Set(["eu-west-1"]),
	stacks: new Set(["frontend"]),
	parameters: {
		bucketSsmKey: "/account/services/dotcom-store.bucket",
		prefixStack: false,
		publicReadAcl: false,
	},
});

deployments.set("ab-testing-ui-artifact", {
	app: "ab-testing-ui-artifact",
	contentDirectory: "admin/ab-testing",
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

deployments
	.get(`lambda-update-eu-west-1-frontend-${appName}`)
	?.dependencies?.push(abTestingArtifactDeployment);

riffRaff.synth();
