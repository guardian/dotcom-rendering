# @guardian/ab-testing-deploy-lambda

This directory contains the AWS Lambda function responsible for deploying AB testing configurations to Fastly.

The lambda is triggered during cloudformation to update the AB testing configurations stored in Fastly dictionaries. It reads the latest AB test definitions and their associated MVT IDs, then updates the Fastly service accordingly.

It is implemented to be invoked as a [`CustomResource`](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-custom-resources.html), which is a way to extend CloudFormation functionality by writing custom provisioning logic in an AWS Lambda.

## How it works

When the deployment lambda is invoked, it performs the following steps:

1. Reads the AB test definitions and MVT ID mappings from the artifacts located in S3.
2. Connects to the Fastly API using credentials from AWS Secrets Manager.
3. Updates the relevant Fastly dictionaries with the new AB test configurations.

## Local Development

Get `frontend` credentials from Janus.

install dependencies:

```bash
 pnpm install
```

Call the `run.ts` script, (be sure to announce you're using the CODE stage in the semaphore chat channel):

```bash
 STAGE=CODE ARTIFACT_BUCKET_NAME=the-bucket node src/run.ts
```
