# A/B testing in DCR

This documentation covers the updated A/B test framework, developed by commercial-dev to support both client and server side A/B tests in DCR and launched in January 2026. If you're interested in how it works please visit the docs [here](https://github.com/guardian/dotcom-rendering/tree/main/ab-testing).

Instructions for the legacy framework can still be found [here](./legacy-ab-testing-in-dcr.md).

## Creating a new A/B test

### 1. Configure your A/B test

Create an A/B test in [ab-testing/config/abTests.ts](../ab-testing/config/abTests.ts) **both server _and_ client side tests** are defined here.

Add your A/B tests to the `abTests` array in the `abTests.ts` file. Each test should have a unique name.

```ts
{
	name: 'webex-example-test',
	description:
		'Test something interesting on the site',
	owners: ['webex@guardian.co.uk'],
	status: 'ON',
	expirationDate: '2025-12-30',
	type: 'client',
	audienceSize: 10 / 100,
	audienceSpace: "A",
	groups: ['control', 'variant'],
shouldForceMetricsCollection: true
}
```

When you create a PR that modifies the `abTests.ts` file, a git hook and CI will run checks to ensure that your A/B test is valid (not expired, enough space for the test etc.).

When your PR is merged, the A/B test will be automatically deployed to Fastly and be available at the same time as your changes.

#### Guidelines for A/B test configuration

| Prop                         | Optional | Value                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ---------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name                         | false    | A/B tests should be prefixed with the team associated with the test, for example `webex-example-test`. This helps to identify the team responsible for the test and is enforced by typescript validation, you can inspect & edit the allowed team name definitions [here](https://github.com/guardian/dotcom-rendering/blob/main/ab-testing/config/types.ts#L7).                                                                                                                                                                                                                                                                                                                                                                                                                        |
| description                  | false    | A meaningful description of the A/B test.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| owners                       | false    | Email address of owner(s) of the test, to be used when notifying of near-expiry or expired tests.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| status                       | false    | Tests can be set to `ON` or `OFF` using the `status` field. Only tests with status `ON` will be validated and deployed. <br><br>When the config is merged, the A/B test will be automatically deployed and be available at the same time as your changes.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| expirationDate               | false    | A/B tests should have an expiration date set in the future. This is to ensure that tests do not run indefinitely. The duration of a test should be determined by how long we believe it will need to run in order to reach a statistically significant result - if you're unsure how long this is we'd recommend reaching out to our Data Analysts. Adding a buffer of an additional +2 weeks beyond the expected completion date will ensure tests do not end unexpectedly before we have a statistically significant result. <br><br>Expired tests will cause the A/B testing validation to fail, and will not be deployed. <br><br>Tests that expire while they are are in-flight will not be served by Fastly, and should be removed from the `abTest.ts` file as soon as possible. |
| type                         | false    | All requests are processed by Fastly at the edge, however, A/B testing of server-side logic in Frontend or DCR will need to be cached separately. Client side tests do not need to be cached separately, as they are applied in the browser after the response is delivered. <br><br>Ensure that the `type` field is set to either `client` or `server` to indicate the type of test so that server side tests can be cached correctly, and client side tests are not splitting the cache unnecessarily. <br><br>There's a limit of the number of concurrent server-side tests that can be run, enforced by the validation script, so it's important to use client-side tests where possible.                                                                                           |
| audienceSize                 | false    | The `audienceSize` is the size of the whole test and is divided between the test groups that you specify. For example, consider an audience size of 10% (`10 / 100`) with two test groups: control and variant. The control and variant test groups will each be allocated 5%. The "resolution" of sizing is down to 0.1%, so groups will be rounded to the nearest 0.1%. <br><br> **Caution:** If you ever need to run a 100% server-side test AKA the entire audience, start with a smaller test first e.g. 30%. This is because going from 0 -> 100% will invalidate the cache for all page views pretty much all at once. Starting with a smaller test will build up test group pages in the cache first, so there will be a less drastic spike in load on origin.                  |
| audienceSpace                | true     | Ideally A/B tests would never overlap (users being in multiple tests), but sometimes this is unavoidable, for example when running a very large 50+% test without interrupting existing tests. <br><br>To add a test where there is not enough space in the default audience space (`A`), you can specify a different `audienceSpace` in the test definition. <br><br>For example if there are already 3 25% tests in space `A` totalling 75%, and you want to run a 50% test, you can set the `audienceSpace` to `B` to allow this test to overlap with the existing tests.                                                                                                                                                                                                            |
| groups                       | false    | Test group definitions, eg. `['control', 'variant']`. Convention is to have groups named control and variant, but you can name them as you wish. <br><br>A single group is also possible, for example if you're rolling out a new feature and don't need a control.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| shouldForceMetricsCollection | true     | `true` or `false`. Bypasses sampling to force metrics collection for this test. See DCR Metrics component for end usage.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |

### 2. Putting your code changes behind an A/B test & checking A/B test participations

Once your A/B test has been configured you can conditionally put your code changes behind an A/B test participation. The instructions below describe how to do this, and are applicable to both client and server side tests.

#### In React Components (DCR)

> [!NOTE]
> You should use the `useBetaAB` hook described below in React components **_only_**.

The `useAB` module exposes methods for getting a user's A/B test participations, this can be used **both client _and_ server side**.

```ts
// Within the components
import { useBetaAB } from '../lib/useAB';

const someComponent = () => {
	// Example usage of A/B tests
	const abTests = useBetaAB();

	// Am I in the test at all?
	const isInTest = abTests?.isUserInTest('webex-example-test') ?? false;

	const isInControlGroup =
		abTests?.isUserInTestGroup('webex-example-test', 'control') ?? false;

	const isInVariantGroup =
		abTests?.isUserInTestGroup('webex-example-test', 'variant') ?? false;

	if (isInControlGroup) {
		return (
			<div>
				You're in the control group
			</div>
		);
	} else if (isInVariantGroup) {
		return (
			<div>
				You're in the variant group
			</div>
		);
	} else {
		return (
			<div>
				You're not in the test
			</div>
		);
	}
}
```

#### In client side code outside of React components (DCR)

The A/B test API described above is also available on the window at `window.guardian.modules.abTests`. **This _only_ works client side**.

```ts
const getAllTestParticipations =
	window.guardian.modules.abTests.getParicipations(); // eg. {webex-example-test: 'control'}

const isInTest =
	window.guardian.modules.abTests.isUserInTest('webex-example-test');

const isInControlGroup = window.guardian.modules.abTests.isUserInTestGroup(
	'webex-example-test',
	'control',
);

const isInVariantGroup = window.guardian.modules.abTests.isUserInTestGroup(
	'webex-example-test',
	'variant',
);
```

#### In server side code (DCR)

Server side test participations are available in the CAPI object e.g. `CAPIArticle.config.serverSideABTests`.

#### In server side code (Frontend)

See the [Frontend A/B testing class](https://github.com/guardian/frontend/blob/main/common/app/ab/ABTests.scala) with methods to get user participations.

#### In the response headers (Debugging)

Fastly sends a user's A/B participations via the `x-gu-server-ab-tests` response header (server side A/B tests) and `gu_client_ab_tests` response cookie (client side A/B tests).

### 3. Testing your changes on CODE

If you want to test your changes on CODE you need to follow these steps:

1. Configure the A/B tests on your branch

2. Deploy your code changes on DCR and/or Frontend to CODE as normal

3. Deploy the A/B test config to CODE by deploying the `dotcom:ab-testing` riff-raff project against your branch, there will be a comment in the PR with a link to do this once the config has been validated.

The 3rd step is crucial as Fastly buckets users into tests/cohorts and returns your A/B test participations as response headers.

### 4. Forcing yourself into a test on PROD/CODE

Use the opt-in and opt-out routes to force yourself into or out of a test.

When opted-in, the test will override any mvt based assignment and you'll only be in the opted-in test group.

Once opted-out of all tests you've opted into, you'll be back to your mvt based assignment.

These links are also in the [frontend admin](https://frontend.gutools.co.uk/analytics/ab-testing) and [CODE frontend admin](https://frontend.code.dev-gutools.co.uk/analytics/ab-testing).

-   Opt-in Example on PROD: `https://theguardian.com/ab-tests/opt-in/commercial-test-example:variant`
-   Opt-out Example on PROD: `https://theguardian.com/ab-tests/opt-out/commercial-test-example:variant`
-   Opt-out of all (opted in) tests on PROD: `https://theguardian.com/ab-tests/opt-out`

You can use the same routes on CODE.

### 5. Forcing yourself into a test locally

A URL query parameter can be used to force yourself into a test locally. The parameter is `ab-commercial-test-example=variant` where `commercial-test-example` is the name of the test in config and `variant` is the cohort you wish to opt-in to.

**Opt-in Example**

-   Articles: `http://localhost:3030/Article/https://www.theguardian.com/politics/2026/jan/08/go-back-home-farage-schoolmate-accounts-bring-total-alleging-racist-behaviour-to-34?ab-commercial-test-example=variant`
-   Fronts: `http://localhost:3030/Front/https://www.theguardian.com/international?ab-commercial-test-example=variant`
-   Interactives: `http://localhost:3030/Interactive/https://www.theguardian.com/global-development/ng-interactive/2022/jun/09/the-black-sea-blockade-mapping-the-impact-of-war-in-ukraine-on-the-worlds-food-supply-interactive?ab-commercial-test-example=variant`

You can verify that you're in the test by checking `window.guardian.modules.abTests.getParticipations()` in the browser console.

### 6. Admin page

A/B tests will appear in https://frontend.gutools.co.uk/analytics/ab-testing once the config is deployed. This page provides an overview of currently running A/B tests on theguardian.com, including audience segmentation across all tests, test opt-in/out links, status reporting (eg. on/off) and the duration of each test.
