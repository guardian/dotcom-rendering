# AB Testing

This directory contains the code and configuration for the AB testing framework used on theguardian.com.

The [`abTest.ts`](./abTest.ts) module is where you should define your AB tests.

Add your AB tests to the `abTests` array in the `abTest.ts` file. Each test should have a unique name.

```ts
{
	name: 'webex-example-test',
	description:
		'Test something interesting on the site',
	owners: ['webex@guardian.co.uk'],
	status: 'ON',
	expirationDate: '2050-12-30',
	type: 'client',
	audienceSize: 10 / 100,
	groups: ['control', 'variant'],
	shouldForceMetricsCollection: true
}
```

When you create a PR that modifies the `abTest.ts` file, a git hook and CI will run checks to ensure that your AB test is valid (not expired, enough space for the test etc.).

When your PR is merged, the AB test will be automatically deployed to Fastly and be available at the same time as your changes.

## Guidelines for AB Tests

### Naming Conventions

AB tests should be prefixed with the team associated with the test, for example `webex-example-test`. This helps to identify the team responsible for the test and is enforce by typescript validation.

### Test Size and Groups

The `audienceSize` is the size of the whole test and is divided between the test groups that you specify. The "resolution" of sizing is down to 0.1%, so groups will be rounded to the nearest 0.1%.

Convention is to have groups named control and variant, but you can name them as you wish.

A single group is also possible, for example if you're rolling out a new feature and don't need a control.

### Client vs Server Side Tests

All requests are processed by Fastly at the edge, however, ab testing of server-side logic in Frontend or DCR will need to be cached separately. Client side tests do not need to be cached separately, as they are applied in the browser after the response is delivered.

Ensure that the `type` field is set to either `client` or `server` to indicate the type of test so that server side tests can be cached correctly, and client side tests are not splitting the cache unnecessarily.

There's a limit of the number of concurrent server-side tests that can be run, enforce by the validation script, so it's important to use client-side tests where possible.

### Test Expiration

AB tests should have an expiration date set in the future. This is to ensure that tests do not run indefinitely.

Expired tests will cause the ab testing validation to fail, and will not be deployed.

Tests that expire while they are are in-flight will not be served by fastly, and should be removed from the `abTest.ts` file as soon as possible.

### Audience Spaces

Ideally AB tests would never overlap (users being in multiple tests), but sometimes this is unavoidable, for example when running a very large 50+% test without interrupting existing tests.

To add a test where there is not enough space in the default audience space (`A`), you can specify a different `audienceSpace` in the test definition.

For example if there are already 3 25% tests in space `A` totalling 75%, and you want to run a 50% test, you can set the `audienceSpace` to `B` to allow this test to overlap with the existing tests.

### Test Status

Tests can be set to `ON` or `OFF` using the `status` field. Only tests with status `ON` will be validated and deployed.

## How it works

The AB testing framework uses Deno to run scripts that validate and deploy the tests. The `deno.json` file contains the tasks that can be run, such as `validate`, `deploy`, and `build`.

Which tests using which mvt ids is computed by the `build` task, which generates the `dist/mvts.json` file. This file contains the mapping of AB tests to MVT IDs.

The algorithm allocates tests available MVT IDs based on the audience size and space. Allocation is deterministic, so the same test (with the same name) will always be assigned the same MVT ID as long as the test hasn't been removed, allowing for consistent user experience when tests are added/updated/removed. This also means that new/update tests will not use contiguous MVT IDs, but will instead use whichever MVT IDs are available.

However, the allocation is completely separate for each audience space, so if you have a test in space `A` and move it to space `B`, it will be allocated different MVT IDs.

The state of the AB tests is stored in Fastly dictionaries, which are updated when the `deploy` task is run. Logic in fastly VCL will then use these dictionaries to determine which users are in which test groups and set appropriate headers and/or cookies.

See the [fastly-edge-cache documentation](https://github.com/guardian/fastly-edge-cache/blob/main/theguardiancom/docs/ab-testing.md) for even more details.
