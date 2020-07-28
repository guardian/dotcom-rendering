# Sign In Gate

## Quick Setup Guide

1. Create AB test switch in [guardian/frontend](https://github.com/guardian/frontend/blob/master/common/app/conf/switches/ABTestSwitches.scala), [docs](https://github.com/guardian/frontend/blob/master/docs/03-dev-howtos/01-ab-testing.md#adding-a-switch)
2. Add test definition to `src/web/experiments/tests` folder, and import test in the `src/web/experiments/ab-tests.ts` file. Variant name in test definition must be unique.
3. Import test definition in the `tests` array in the `SignInGateSelector.tsx`
4. If the test needs a design, make it in the `gateDesigns` folder
5. Set up individual variants in the `gates` folder, exports the `SignInGateComponent` type. Display rules defined here in the `canShow` method. Helpers in `displayRule.ts`.
6. Import the `SignInGateComponent` in `SignInGateSelector.tsx` by mapping the variant name to the `SignInGateComponent` in the `testVariantToGateMapping` array.
7. Add it to Storybook by modifying `SignInGate.stories.tsx`
8. Update Cypress tests in the `cypress/integration/e2e/sign-in-gate.spec.js`, and any unit tests e.g. `displayRule.test.ts`

## Full Guide

### General

For all possible sign in gates, the following rules should apply:

-   All variant names should be unique across all tests
-   Running a Control/Variant with same audience size?
    -   Use single AB test with 2 variants defined
-   Running a Control/Variant test with different audience sizes?
    -   Use a separate AB test for each variant with unique id
    -   Use the `dataLinkNames` parameter to join up the name of the tests in reporting, essentially have this be the same between the tests.
    -   Useful example, see how the `SignInGateMain` is set up
-   Sign In Gate audience across all tests/variants should never overlap. If there is not enough space to deploy a new test, then change the audience of another test/variant.

#### `SignInGateMain`

-   The current version of the gate rolled out to the largest audience
-   This test should be continuous, when deploying a new version, just update the number of the variant.
-   Control and Variant running as 2 tests due to differing audience size
-   Both share the same `dataLinkNames` (`SignInGateMain`) for consistent reporting
-   Variant Test
    -   Test ID: `SignInGateMainVariant`
    -   Test Variants: `main-variant-x`
        -   `x` is a number relating to the current version of the test
    -   Variant shows the gate, should share the same display rules as control. A `VIEW` Ophan ComponentEvent is fired when the display rules are met, and the gate is inserted.
-   Control Test
    -   Test ID: `SignInGateMainControl`
    -   Test Variants: `main-control-x`
        -   `x` is a number relating to the current version of the test
    -   Control has same display rule as Variant, but will never see the gate itself. A `VIEW` Ophan ComponentEvent is fired if the display rules are met, but the gate is not inserted.

### AB Test Setup

There are a few steps to take to set up a Sign In Gate AB Test.

#### AB Test Switch

First a AB Test Switch needs to be set up in [guardian/frontend](https://github.com/guardian/frontend/blob/master/common/app/conf/switches/ABTestSwitches.scala). You can follow the instructions from [here](https://github.com/guardian/frontend/blob/master/docs/03-dev-howtos/01-ab-testing.md#adding-a-switch).

Example:

```scala
Switch(
    ABTests,
    "ab-sign-in-gate-patientia",
    "Marathon sign in gate test on 2nd article view",
    owners = Seq(Owner.withGithub("coldlink")),
    safeState = Off,
    sellByDate = new LocalDate(2020, 12, 1),
    exposeClientSide = true
)
```

This adds the ability to turn the test on/off from the Frontend Admin Tool.

The convention is that the test id has to start with the characters `ab-`.

**The hyphen-separated id that follows ab- must correspond to the TitleCased id defined in the JS test module. e.g. if the switch id is `ab-sign-in-gate-patientia`, the test id in the test definition must be `SignInGatePatientia`.**

Setting `safeState` to `Off` by default will mean that the switch must be enabled first before you'll be able to access the test.

When running dotcom-rendering locally for development, it is useful to have frontend also running locally when developing new tests.

#### AB Test Definition

Once the switch is set up, you'll need to add a test definition to the `src/web/experiments/tests` folder. Here's an example of a test definition.

```ts
import { ABTest } from '@guardian/ab-core';

export const signInGatePatientia: ABTest = {
    id: 'SignInGatePatientia',
    start: '2020-04-30',
    expiry: '2020-12-01',
    author: 'Mahesh Makani',
    description:
        'Marathon sign in gate test on 3nd article view of simple article templates, with higher priority over banners and epic',
    audience: 0.0001,
    audienceOffset: 0.9999,
    successMeasure: 'Users sign in or create a Guardian account',
    audienceCriteria:
        '2nd article of the day, lower priority than consent banner, simple articles (not gallery, live etc.), not signed in, not shown after dismiss, not on help, info sections etc. Exclude iOS 9 and guardian-live-australia. Suppresses other banners, and appears over epics',
    dataLinkNames: 'SignInGatePatientia',
    idealOutcome:
        'Conversion to sign in is higher when the gate is shown over a longer period of time, with no sustained negative impact to engagement levels or supporter acquisition',
    showForSensitive: false,
    canRun: () => true,
    variants: [
        {
            id: 'patientia-control-1',
            test: (): void => {},
        },
        {
            id: 'patientia-variant-1',
            test: (): void => {},
        },
    ],
};
```

You can see frontends [Writing a test](https://twitter.com/Ryallin/status/1238243897983348736) documentation for information about the properties of the test.

The most important properties are:

-   `id` - The unique name of the test. This must be TitleCased and correspond to the hyphen-separated portion of the switch id that follows ab-. e.g. if the switch id is `ab-sign-in-gate-patientia`, the test id in the test definition must be `SignInGatePatientia`.
-   `audience` - The ratio of people who you want in the test (Eg, 0.2 = 20%), who will then be split equally between the variants defined in the test.
-   `audienceOffset` - All users are given a permanent, unique hash that is a number between 0 and 1. audienceOffset allows you to specify the range of users you want to test. For example, an `audienceOffset` value of `0.5` and an audience of `0.1` means user with a hash between `0.5` and `0.6` will be opted in to the test. This helps to avoid overlapping tests.
-   `dataLinkNames` - Link names or custom link names used for test. As mentioned above, use the `dataLinkNames` parameter to join up the name of the tests in reporting, essentially have this be the same between the tests, if you're using multiple tests for multiple variants of different audience sizes.
-   `canRun` - A function to determine if the test is allowed to run (Eg, so you can target individual pages, segments etc.). For the sign in gate, this is likely always just returning true, since the display rules for the gate are determined in the component itself.
-   `variants` - An array of objects representing the groups (variants) in the test. In terms of the object properties, the main one that's required for the sign in gate is the `id` property. This is the `id` of the variant, and should be unique across all sign in gate tests. The `run` property should just be void, since we display the test elsewhere.

Once you've made the test definition, you'll need to import it into the `tests` array in the `src/web/experiments/ab-tests.ts` file.

The test definition should also be replicated in `frontend` too if the same sign in gate tests is required on both `DCR` and `frontend`. Use the existing documentation in [`frontend`](https://github.com/guardian/frontend/blob/master/static/src/javascripts/projects/common/modules/identity/sign-in-gate/README.md) to set up the tests there. Tests should be mirrored is as far as possible.

### Sign In Gate Design

The designs for the gate live as React components in the `src/web/components/SignInGate/gateDesigns` folder.

#### Gate Component

Each design should live as a separate component file in this folder. A design may be consumed by multiple tests/variants, therefore should be agnostic to any test information itself.

The best way to develop a design is to copy a previous design and change any styling required. Styling should remain in the component itself, and as far as possible specific to the element itself, as not to interfere with any other design on the page. As many components/stylings should be from the [Source design system](https://theguardian.design/), e.g. buttons, links, spacing css, typography css.

#### Viewing/Developing Design

The ideal way to view/develop the design is to use Storybook. See "Storybook" in the "Testing the Gate" section below on how to do this.

### Sign In Gate Component

In the `src/web/components/SignInGate/gates` folder, we have a file for each unique variant. Each file exports a `SignInGateComponent` type which is defined as:

```ts
type SignInGateComponent = {
    gate?: (props: SignInGateProps) => JSX.Element;
    canShow: (
        CAPI: CAPIBrowserType,
        isSignedIn: boolean,
        currentTest: CurrentABTest,
    ) => boolean;
};
```

The `canShow` method is used to determine the display rules, i.e. if the gate should be shown on the current page/article.

The `gate` property is related to the gate component that was designed. But rather than simply adding the component, it should be lazy loaded instead. This property is also optional as in some cases we don't want to show a sign in gate at all!

#### Display Rule (`canShow`)

The `canShow` method returns a boolean which determines if we show the gate on that article/page. In most cases the rules will be the same between the variants. If changes need to be made, the `displayRule.ts` file has methods which can be shared, and unit tests for those methods are in `displayRule.test.ts`.

#### Gate (`gate`)

The `gate` property relates to the gate design made in the `gateDesigns` folder. As mentioned this is optional as in some variants a gate should not be shown, but we still want to compare users on that page (e.g. through component events).

If a gate is required, it should not be directly assigned to the property, instead it should be lazy loaded, so we only load the script for the gate if the display rules have passed, and the user has scrolled far down enough the page to load the gate.

To use lazy loading, you'll need to do something similar to the following:

```tsx
// other methods up here
// e.g.

const canShow = ...;

...

// Use React.lazy to dynamically import the component if its required
// the perf stuff (start/end) is used to determine how fast it takes to load
// the main thing to be interested in is the import(...) statement which imports the component
// by pointing it to a file
// the name (e.g. SignInGatePatientia) should relate to the name of the gate design, and the name
// of the exported module from the design
const SignInGatePatientia = React.lazy(() => {
    const { start, end } = initPerf('SignInGatePatientia');
    start();
    return import(
        /* webpackChunkName: "SignInGatePatientia" */ '../gateDesigns/SignInGatePatientia'
    ).then((module) => {
        end();
        return { default: module.SignInGatePatientia };
    });
});

// the exported component with the gate and canShow properties
export const signInGateComponent: SignInGateComponent = {
    // we return a JSX component for the gate, with the props we pass
    // the component (SignInGatePatientia) is wrapped in a Suspense and Lazy component
    // which load the component if the canShow method returns true
    gate: ({ component, dismissGate, guUrl, signInUrl, abTest, isComment }) => (
        <Lazy margin={300}>
            <Suspense fallback={<></>}>
                <SignInGatePatientia
                    component={component}
                    dismissGate={dismissGate}
                    guUrl={guUrl}
                    signInUrl={signInUrl}
                    abTest={abTest}
                    isComment={isComment}
                />
            </Suspense>
        </Lazy>
    ),
    canShow,
};

```

### Map AB Test to Gate Component

#### AB Tests

#### Test Variant to Gate Component

#### Test ID to Ophan Component ID

### Testing The Gate

#### Storybook

#### Forced Test Variant

#### Cypress Integration Tests

#### Unit Tests
