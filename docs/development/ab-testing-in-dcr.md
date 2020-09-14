# AB Testing in DCR

## Setting up a client-side A/B test using the [A/B Testing Library](https://github.com/guardian/ab-testing)

The library docs above explain the integration and the API.

### Quick Start

1. [Create a switch in Frontend](https://github.com/guardian/frontend/blob/main/common/app/conf/switches/ABTestSwitches.scala)
2. Ensure that you [create an A/B test](https://github.com/guardian/frontend/tree/main/static/src/javascripts/projects/common/modules/experiments/tests) on _Frontend_.
3. Add your test to [concurrent tests](https://github.com/guardian/frontend/blob/main/static/src/javascripts/projects/common/modules/experiments/ab-tests.js) on _Frontend_.
4. Copy the JS file into DCR (and update to TS types) in [web/experiments/tests](https://github.com/guardian/dotcom-rendering/tree/main/src/web/experiments/tests)
5. Add it to the test array in [src/web/experiments/ab-tests.ts](https://github.com/guardian/dotcom-rendering/blob/main/src/web/experiments/ab-tests.ts)
6. Use the [A/B test API](https://github.com/guardian/ab-testing#the-api)
7. Force the A/B test (ignoring canRun of A/B test and variant) with the URL opt-in http://local...#ab-yourTest=yourVariant
8. Set a GU_mvt_id or GU_mvt_id_local cookie with the MVT ID that matches the test Audience and Audience Offset ([Use this calculator](https://ab-tests.netlify.app/))
9. Check the network tab for the Ophan request _abTestRegister_ has your test and variant

## Gotchas

-   Your ABTest Switch has a sell by date and your abTest has an expiry date. Matching them up avoids confusion.
-   Your ABTest Switch ID is hyphenated and starts with ab- and it must match the JS AB test ID camel cased
-   The aforementioned JS ID _must_ start uppercase. I.E: ab-my-cool-ab-test (serverside test switch ID) === MyCoolAbTest (JS AB test ID)

## Use in Components

```ts
// Within the components
import { useAB } from '@guardian/ab-react';

// Example usage of AB Tests
// Used in the Cypress tests as smoke test of the AB tests framework integration
const ABTestAPI = useAB();

// We can check if a user is in a variant, returns a boolean
// ABTestTest being an ab test that was passed in via the ab test array
const abTestDataAttr =
    (ABTestAPI.isUserInVariant('AbTestTest', 'control') && 'ab-test-control') ||
    (ABTestAPI.isUserInVariant('AbTestTest', 'variant') && 'ab-test-variant') ||
    'ab-test-not-in-test';

// We can get the variant straight from a check for
// whether the test is runnable
const runnableTest = ABTestAPI.runnableTest(abTestTest);
const variantFromRunnable =
    (runnableTest && runnableTest.variantToRun.id) || 'not-runnable';

<div
    data-ab-user-in-variant={abTestDataAttr}
    data-ab-runnable-test={variantFromRunnable}
>
    AB Test
</div>;
```
