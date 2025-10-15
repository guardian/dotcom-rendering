# AB Testing in DCR

This document explains how to set up A/B tests in Dotcom Rendering (DCR).

## Creating a new A/B test

Create an ab test in [ab-testing/abTest.ts](../ab-testing/abTest.ts) both server and client side tests are defined here. More information on defining tests can be found in [ab-testing/README.md](../ab-testing/README.md).

When the config is merged, the A/B test will be automatically deployed and be available at the same time as your changes.

Ab test on/off state is controlled only by the config. Expired tests will cause the ab testing validation to fail, they will also not be served. In effect expired tests are turned off "automatically", but their config needs to be cleaned up.

The test will appear in https://frontend.gutools.co.uk/analytics/ab-testing once the config is deployed.

## Putting code changes behind an A/B test (group)

### Use in Components

Again, this applies to both client and server side tests.

```ts
// Within the components
import { useBetaAB } from '../lib/useAB';

const someComponent = () => {
	// Example usage of AB Tests
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

### Other ways to check

The ab test API is also available on the window object as `window.guardian.modules.abTests`, this only works client side. It's best to use the `useBetaAB` hook in react components.

Server side tests are also available in the CAPI object e.g. `CAPIArticle.config.serverSideABTests`.

## Forcing yourself into a test

Use the opt-in and opt-out URL fragments to force yourself into or out of a test.

When opted-in, the test will override any cookie based assignment and you'll only be in the specified test group.

When opted-out, you'll return to random/cookie based assignment.

These links are also in the [frontend admin](https://frontend.gutools.co.uk/analytics/ab-testing).

-   Opt-in Example: `https://theguardian.com/ab-tests/opt/in/commercial-test-example:variant`
-   Opt-out: `https://theguardian.com/ab-tests/opt/out`

# Legacy A/B testing in DCR

> [!WARNING]
> This section describes the legacy A/B testing framework in DCR. New A/B tests should use the new A/B testing framework described above.

The documentation remains here for reference, until all legacy A/B tests have ended or have been migrated to the new framework.

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
