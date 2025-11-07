# AB Testing in DCR

This document explains how to set up A/B tests in Dotcom Rendering (DCR).

There's a new beta A/B testing framework in DCR that supports both client-side and server-side tests with the same API. It's currently in it's beta/testing phase, so please get in touch with the commercial-dev team if you'd like to use it. [Details on how to use the new framework are at the bottom of this document](#beta-ab-test-framework).

## Client-side A/B tests

> [!NOTE]
> Setting up a client-side A/B test using the [A/B Testing Library](https://github.com/guardian/csnx/tree/main/libs/%40guardian/ab-core). The library docs explain the integration and the API.

### Quick Start

1. [Create a switch in Frontend](https://github.com/guardian/frontend/blob/main/common/app/conf/switches/ABTestSwitches.scala)
1. Ensure that you [create an A/B test](https://github.com/guardian/frontend/tree/main/static/src/javascripts/projects/common/modules/experiments/tests) on _Frontend_ using the [A/B test API](https://github.com/guardian/csnx/tree/main/libs/%40guardian/ab-core#the-api).
1. Add your test to [concurrent tests](https://github.com/guardian/frontend/blob/main/static/src/javascripts/projects/common/modules/experiments/ab-tests.ts) on _Frontend_.
1. Copy the JS file into DCR (and update to TS types) in [experiments/tests](https://github.com/guardian/dotcom-rendering/blob/main/dotcom-rendering/src/experiments/ab-tests.ts)
1. Add it to the test array in [src/experiments/ab-tests.ts](https://github.com/guardian/dotcom-rendering/blob/main/dotcom-rendering/src/experiments/ab-tests.ts)
1. Force the A/B test (ignoring canRun of A/B test and variant) with the URL opt-in http://local...#ab-YourTest=yourVariant
1. Set a GU_mvt_id or GU_mvt_id_local cookie with the MVT ID that matches the test Audience and Audience Offset ([Use this calculator](https://ab-tests.netlify.app/))
1. Check the network tab for the Ophan request _abTestRegister_ has your test and variant

### Gotchas

-   The ABTest Switch name must be hyphenated, lower case and must starts with `ab-`; for instance `ab-my-cool-ab-test`. The JavaScript/TypeScript ab-test ID must be in PascalCase; for instance `MyCoolAbTest`.
-   Assuming that your test has a variant whose id is `variant-1`, The url fragment for opt-in is, then, `#ab-MyCoolAbTest=variant-1`.
-   Your ABTest Switch has a sell by date and your abTest has an expiry date. Matching them up avoids confusion.

### Use in Components

```ts
// Within the components
import { useAB } from '../lib/useAB';

// Example usage of AB Tests
// Used in the e2e tests as smoke test of the AB tests framework integration
const ABTestAPI = useAB()?.api;

// We can check if a user is in a variant, returns a boolean
// ABTestTest being an ab test that was passed in via the ab test array
const abTestDataAttr =
	(ABTestAPI?.isUserInVariant('AbTestTest', 'control') &&
		'ab-test-control') ||
	(ABTestAPI?.isUserInVariant('AbTestTest', 'variant') &&
		'ab-test-variant') ||
	'ab-test-not-in-test';

// We can get the variant straight from a check for
// whether the test is runnable
const runnableTest = ABTestAPI?.runnableTest(abTestTest);
const variantFromRunnable =
	(runnableTest && runnableTest.variantToRun.id) || 'not-runnable';

<div
	data-ab-user-in-variant={abTestDataAttr}
	data-ab-runnable-test={variantFromRunnable}
>
	AB Test
</div>;
```

## Server-side A/B tests

In order to set up a server-side test in DCR, follow steps 1-4 outlined in the `frontend` [documentation](https://github.com/guardian/frontend/blob/main/docs/03-dev-howtos/01-ab-testing.md#write-a-server-side-test).

On the live website, Fastly automatically assigns users to buckets. You can force yourself into a test on your local machine by following these steps:

1. Ensure you are running `frontend` locally and your server-side experiment is enabled in the dashboard.
2. Use the Header Hacker extension to change the HTTP headers as described in the `frontend` documentation. Please note that this is the only way to opt-in locally. If testing in the CODE environment, use the `/opt/in/` link.

You can verify that you have been correctly assigned to the variant by appending `.json?dcr` to the end of an article link (e.g. `http://localhost:9000/world/2021/jan/01/your-article.json?dcr`. This will return the document data in `JSON` format. Your A/B test will be within the `config` object in camel case, as follows:

```json
"abTests": {
	"yourAbTestVariant": "variant"
}
```

You can access server-side `abTests` within DCR wherever the CAPI object is used (`CAPIArticle.config.abTests`).

---

# Beta AB Test framework

This is a new framework that has been developed by commercial-dev to support both client and server side A/B tests in DCR. The goal is to eventually replace the legacy A/B testing framework described above with this new framework.

Please get in touch with the commercial-dev team if you'd like up to date information on it's state of readiness.

If you're interested in how it works please visit the docs [here](https://github.com/guardian/dotcom-rendering/tree/main/ab-testing#beta-ab-test-framework).

## Creating a new A/B test

### 1. Configure your A/B test

Create an A/B test in [ab-testing/abTest.ts](../ab-testing/abTest.ts) **both server _and_ client side tests** are defined here.

Add your A/B tests to the `abTests` array in the `abTest.ts` file. Each test should have a unique name.

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

When you create a PR that modifies the `abTest.ts` file, a git hook and CI will run checks to ensure that your A/B test is valid (not expired, enough space for the test etc.).

When your PR is merged, the A/B test will be automatically deployed to Fastly and be available at the same time as your changes.

#### Guidelines for A/B tests

#### Naming Conventions

A/B tests should be prefixed with the team associated with the test, for example `webex-example-test`. This helps to identify the team responsible for the test and is enforce by typescript validation.

#### Test Size and Groups

The `audienceSize` is the size of the whole test and is divided between the test groups that you specify. The "resolution" of sizing is down to 0.1%, so groups will be rounded to the nearest 0.1%.

Convention is to have groups named control and variant, but you can name them as you wish.

A single group is also possible, for example if you're rolling out a new feature and don't need a control.

#### Client vs Server Side Tests

All requests are processed by Fastly at the edge, however, A/B testing of server-side logic in Frontend or DCR will need to be cached separately. Client side tests do not need to be cached separately, as they are applied in the browser after the response is delivered.

Ensure that the `type` field is set to either `client` or `server` to indicate the type of test so that server side tests can be cached correctly, and client side tests are not splitting the cache unnecessarily.

There's a limit of the number of concurrent server-side tests that can be run, enforce by the validation script, so it's important to use client-side tests where possible.

#### Test Expiration

A/B tests should have an expiration date set in the future. This is to ensure that tests do not run indefinitely.

Expired tests will cause the A/B testing validation to fail, and will not be deployed.

Tests that expire while they are are in-flight will not be served by fastly, and should be removed from the `abTest.ts` file as soon as possible.

#### Audience Spaces

Ideally A/B tests would never overlap (users being in multiple tests), but sometimes this is unavoidable, for example when running a very large 50+% test without interrupting existing tests.

To add a test where there is not enough space in the default audience space (`A`), you can specify a different `audienceSpace` in the test definition.

For example if there are already 3 25% tests in space `A` totalling 75%, and you want to run a 50% test, you can set the `audienceSpace` to `B` to allow this test to overlap with the existing tests.

#### Test Status

Tests can be set to `ON` or `OFF` using the `status` field. Only tests with status `ON` will be validated and deployed.

When the config is merged, the A/B test will be automatically deployed and be available at the same time as your changes.

A/B test on/off state is controlled only by the config. Expired tests will cause the A/B testing validation to fail, they will also not be served. In effect expired tests are turned off "automatically", but their config needs to be cleaned up.

The test will appear in https://frontend.gutools.co.uk/analytics/ab-testing once the config is deployed.

### 2. Putting your code changes behind an A/B test

Once your A/B test has been configured you can conditionally put your code changes behind an A/B test participation. The instructions below describe how to do this, and are applicable to both client and server side tests.

#### Use in Components

```ts
// Within the components
import { useBetaAB } from '../lib/useAB';

const someComponent = () => {
	// Example usage of A/B tests
	const abTests = useBetaAB();

	// Am I in the test at all?
	const isInTest = abTests?.isUserInTest('AbTestTest') ?? false;

	const isInControlGroup =
		(abTests?.isUserInTestGroup('AbTestTest', 'control') ?? false);

	const isInVariantGroup =
	abTests?.isUserInTestGroup('AbTestTest', 'variant') ?? false;

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

### 3. Ways to check your participation

#### In source code

As detailed above the `useAB` module exposes methods for getting a user's A/B test participations.

```ts
import { useBetaAB } from '../lib/useAB';

const abTests = useBetaAB();

// Get all of the user's server/client-side A/B test participations
const abTestParticipations = abTests?.getParticipations(); // EG. { commercial-dev-client-side-test: 'variant', commercial-dev-server-side-test: 'variant' }

// Is user in the AbTestTest test (any cohort)
const isInTest = abTests?.isUserInTest('AbTestTest') ?? false;

// Is user in the AbTestTest test (control cohort)
const isInControlGroup =
	abTests?.isUserInTestGroup('AbTestTest', 'control') ?? false;

// Is user in the AbTestTest test (variant cohort)
const isInVariantGroup =
	abTests?.isUserInTestGroup('AbTestTest', 'variant') ?? false;
```

#### On the Client

The A/B test API described above is also available on the window object as `window.guardian.modules.abTests`. **Note:** This only works client side, you should use the `useBetaAB` hook described above in React components.

#### On the Server

Server side tests are also available in the CAPI object e.g. `CAPIArticle.config.serverSideABTests`.

#### In the response headers

Fastly sends a user's AB participations via the `x-gu-server-ab-tests` response header (server side A/B tests) and `gu_client_ab_tests` response cookie (client side A/B tests).

### 4. Testing your changes on CODE

If you want to test your changes on CODE you need to follow these steps:

1. Configure the A/B tests on your branch

2. Deploy your branch to CODE

3. Manually run the [🧪 AB testing CI (CODE)](https://github.com/guardian/dotcom-rendering/actions/workflows/ab-testing-ci-code.yml) worfklow using your branch. This deploys the test config to Fastly CODE.

The 3rd step is crucial as Fastly buckets users into tests/cohorts and returns your A/B test participations as response headers.

### 5. Forcing yourself into a test on PROD/CODE

Use the opt-in and opt-out URL fragments to force yourself into or out of a test.

When opted-in, the test will override any mvt based assignment and you'll only be in the opted-in test group.

When opted-out, you'll return to random/mvt based assignment.

These links are also in the [frontend admin](https://frontend.gutools.co.uk/analytics/ab-testing).

-   Opt-in Example on PROD: `https://theguardian.com/ab-tests/opt/in/commercial-test-example:variant`
-   Opt-out on PROD: `https://theguardian.com/ab-tests/opt/out`

You can use the same routes on CODE.
