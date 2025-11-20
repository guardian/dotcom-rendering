# Beta AB Test framework

This directory contains the code and configuration for the AB testing framework used on theguardian.com. If you're looking to set up a new server or client side AB test using the new framework then please visit the docs [here](https://github.com/guardian/dotcom-rendering/blob/main/dotcom-rendering/docs/development/ab-testing-in-dcr.md#beta-ab-test-framework).

### Structure

-   `config/` - Contains the configuration and scripts for building and validating AB tests.
-   `frontend/` - Contains the source code for the admin interface that shows current test state, viewable from https://frontend.gutools.co.uk/analytics/ab-testing (or https://frontend.code.dev-gutools.co.uk/analytics/ab-testing for CODE)
-   `deploy-lambda/` - Contains the code for the lambda function that deploys the AB test state to Fastly edge-dictionaries.
-   `cdk/` - Contains the AWS CDK code for deploying the test configuration, UI and lambda function.

## How it works

The AB testing framework runs scripts that validate, build and deploy the tests.

Which tests using which mvt ids is computed by the `build` task, which generates the `config/dist/mvts.json` file. This file contains the mapping of AB tests to MVT IDs.

The algorithm allocates tests available MVT IDs based on the audience size and space. Allocation is deterministic, so the same test (with the same name) will always be assigned the same MVT ID as long as the test hasn't been removed, allowing for consistent user experience when tests are added/updated/removed. This also means that new/update tests will not use contiguous MVT IDs, but will instead use whichever MVT IDs are available.

However, the allocation is completely separate for each audience space, so if you have a test in space `A` and move it to space `B`, it will be allocated different MVT IDs.

The state of the AB tests is uploaded to Fastly edge-dictionaries, where our fastly service can read the test definitions and MVT ID mappings to determine which test groups a user should see.

See the [fastly-edge-cache documentation](https://github.com/guardian/fastly-edge-cache/blob/main/theguardiancom/docs/ab-testing.md) for even more details.
