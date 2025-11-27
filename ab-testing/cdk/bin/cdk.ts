import "source-map-support/register.js";
import { RiffRaffYamlFile } from "@guardian/cdk/lib/riff-raff-yaml-file/index.js";
import { App } from "aws-cdk-lib";
import { AbTestingConfig } from "../lib/abTestingConfig.ts";
import { AbTestingDeploymentLambda } from "../lib/deploymentLambda.ts";

const app = new App();

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

const riffRaff = new RiffRaffYamlFile(app);
const {
	riffRaffYaml: { deployments },
} = riffRaff;

// The dictionary artifacts to be deployed to S3
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

// the admin UI artifacts to be deployed to S3
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

const configCloudformationDeployment = deployments.get(
	`cfn-eu-west-1-frontend-ab-testing-config`,
)!;

configCloudformationDeployment.dependencies = [
	...(configCloudformationDeployment.dependencies ?? []),
	// We need the test artifacts in place before running the Config CloudFormation deployment
	"config/ab-testing",
	// We need the upload lambda in place before running the Config CloudFormation deployment
	"lambda-update-eu-west-1-frontend-ab-testing-deployment-lambda",
];

riffRaff.synth();
