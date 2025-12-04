import { RiffRaffYamlFile } from "@guardian/cdk/lib/riff-raff-yaml-file/index.js";
import type { App } from "aws-cdk-lib";

/**
 * Generates a RiffRaff YAML file configuration for deploying ab-testing artifacts and CloudFormation stacks.
 * Ensures that the CloudFormation deployment depends on the artifact deployments and lambda updates.
 *
 * @param app The CDK application instance.
 * @param stack The name of the stack (e.g., "frontend").
 * @param region The AWS region (e.g., "eu-west-1").
 * @returns An instance of RiffRaffYamlFile with the configured deployments.
 */
export const riffRaffYamlFile = ({
	app,
	stack,
	region,
}: {
	app: App;
	stack: string;
	region: string;
}) => {
	const riffRaff = new RiffRaffYamlFile(app);
	const {
		riffRaffYaml: { deployments },
	} = riffRaff;

	// The dictionary artifacts to be deployed to S3
	deployments.set("config/ab-testing", {
		app: "ab-testing-config-artifact",
		contentDirectory: "ab-testing-config-artifacts",
		type: "aws-s3",
		regions: new Set([region]),
		stacks: new Set([stack]),
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
		regions: new Set([region]),
		stacks: new Set([stack]),
		parameters: {
			bucketSsmKey: "/account/services/dotcom-store.bucket",
			cacheControl: "public, max-age=315360000",
			prefixStack: false,
			publicReadAcl: false,
		},
	});

	const configCloudformationDeployment = deployments.get(
		["cfn", region, stack, "ab-testing-config"].join("-"),
	)!;

	configCloudformationDeployment.dependencies = [
		...(configCloudformationDeployment.dependencies ?? []),
		// We need the test artifacts in place before running the ab-testing-config CloudFormation deployment
		"config/ab-testing",
		// We need the lambda to be updated before running the ab-testing-config CloudFormation deployment
		["lambda-update", region, stack, "ab-testing-deployment-lambda"].join(
			"-",
		),
	];

	return riffRaff;
};
