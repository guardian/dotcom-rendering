# Beta AB Test framework

This directory contains the code and configuration for the AB testing framework used on theguardian.com. If you're looking to set up a new server or client side AB test using the new framework then please visit the docs [here](https://github.com/guardian/dotcom-rendering/blob/main/dotcom-rendering/docs/development/ab-testing-in-dcr.md#beta-ab-test-framework).

## How it works

The AB testing framework uses Deno to run scripts that validate and deploy the tests. The `deno.json` file contains the tasks that can be run, such as `validate`, `deploy`, and `build`.

Which tests using which mvt ids is computed by the `build` task, which generates the `dist/mvts.json` file. This file contains the mapping of AB tests to MVT IDs.

The algorithm allocates tests available MVT IDs based on the audience size and space. Allocation is deterministic, so the same test (with the same name) will always be assigned the same MVT ID as long as the test hasn't been removed, allowing for consistent user experience when tests are added/updated/removed. This also means that new/update tests will not use contiguous MVT IDs, but will instead use whichever MVT IDs are available.

However, the allocation is completely separate for each audience space, so if you have a test in space `A` and move it to space `B`, it will be allocated different MVT IDs.

The state of the AB tests is stored in Fastly dictionaries, which are updated when the `deploy` task is run. Logic in fastly VCL will then use these dictionaries to determine which users are in which test groups and set appropriate headers and/or cookies.

See the [fastly-edge-cache documentation](https://github.com/guardian/fastly-edge-cache/blob/main/theguardiancom/docs/ab-testing.md) for even more details.
