# AB Test framework

This directory contains the code and configuration for the AB testing framework used on theguardian.com.

Instructions for setting up a new server-side or client-side AB test using this framework can be found [here](https://github.com/guardian/dotcom-rendering/blob/main/dotcom-rendering/docs/development/ab-testing-in-dcr.md).

## How it works

There is a single configuration file located at [`config/abTests.ts`](./config/abTests.ts) which is used to define all AB tests on theguardian.com.

This configuration is used to build keys and values, which are deployed to fastly edge dictionaries.

Once deployed, these configurations are accessible at the edge via fastly. Fastly passes a user's AB participations to Frontend and DCR via the `x-gu-server-ab-tests` response header (server side A/B tests) and `gu_client_ab_tests` response cookie (client side A/B tests).

See the [fastly-edge-cache documentation](https://github.com/guardian/fastly-edge-cache/blob/main/theguardiancom/docs/ab-testing.md) for even more details.

### Validation

The AB test configuration is validated locally during development and also as part of the CI pipeline to ensure that there are no misconfigured tests, based on the validators in [`config/scripts/validation`](./config/scripts/validation).

### Building

Which AB tests should use which mvt ids is computed by the build script located in [`config/scripts/build`](./config/scripts/build) from the [`config/abTests.ts`](./config/abTests.ts) configuration file.

Tests are built into 2 json artifacts `config/dist/mvts.json` and `config/dist/ab-tests.json` which are the dictionaries represented as lists of keys and values for the mapping of AB tests to MVT IDs and the test definitions respectively.

The algorithm allocates tests available MVT IDs based on the audience size and space. Allocation is deterministic, so the same test (with the same name) will always be assigned the same MVT ID as long as the test hasn't been removed, allowing for consistent user experience when tests are added/updated/removed. This also means that new/update tests will not use contiguous MVT IDs, but will instead use whichever MVT IDs are available.

However, the allocation is completely separate for each audience space, so if you have a test in space `A` and move it to space `B`, it will be allocated different MVT IDs.

### Deployment

These artifacts are first uploaded to S3 by riff-raff during deployment.

Then during [cloudformation deployment](./cdk/), a lambda function located in [deploy-lambda](./deploy-lambda) is invoked to read these artifacts from S3 and update the relevant fastly dictionaries using the fastly API, where they can be accessed immediately at the edge.

See the [fastly-edge-cache documentation](https://github.com/guardian/fastly-edge-cache/blob/main/theguardiancom/docs/ab-testing.md) for even more details.
