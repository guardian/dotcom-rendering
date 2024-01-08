# Sign In Gate

## Quick Setup Guide

1. Create AB test switch in [guardian/frontend](https://github.com/guardian/frontend/blob/main/common/app/conf/switches/ABTestSwitches.scala), [docs](https://github.com/guardian/frontend/blob/main/docs/03-dev-howtos/01-ab-testing.md#adding-a-switch)
2. Add test definition to `src/web/experiments/tests` folder, and import test in the `src/web/experiments/ab-tests.ts` file. Variant name in test definition must be unique.
3. Import test definition in the `signInGateTests` array in the `signInGate.ts`
4. If the test needs a design, make it in the `gateDesigns` folder
5. Set up individual variants in the `gates` folder, exports the `SignInGateComponent` type. Display rules defined here in the `canShow` method. Helpers in `displayRule.ts`.
6. Import the `SignInGateComponent` in `SignInGateSelector.tsx` by mapping the variant name to the `SignInGateComponent` in the `signInGateTestVariantToGateMapping` array in `signInGate.ts`.
7. Add a value for the new test to `signInGateTestIdToComponentId` map (for tracking) in `signInGate.ts`.
8. If there is a new gate design, add the component to Storybook by modifying `SignInGate.stories.tsx`
9. Update Cypress tests in `sign-in-gate.cy.js`, and any unit tests e.g. `displayRule.test.ts`

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

First a AB Test Switch needs to be set up in [guardian/frontend](https://github.com/guardian/frontend/blob/main/common/app/conf/switches/ABTestSwitches.scala). You can follow the instructions from [here](https://github.com/guardian/frontend/blob/main/docs/03-dev-howtos/01-ab-testing.md#adding-a-switch).

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

The test definition should also be replicated in `frontend` too if the same sign in gate tests is required on both `DCR` and `frontend`. Use the existing documentation in [`frontend`](https://github.com/guardian/frontend/blob/main/static/src/javascripts/projects/common/modules/identity/sign-in-gate/README.md) to set up the tests there. Tests should be mirrored is as far as possible.

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
// src/web/components/SignInGate/types.ts
type SignInGateComponent = {
	gate?: (props: SignInGateProps) => JSX.Element;
	canShow: (isSignedIn: boolean, currentTest: CurrentABTest) => boolean;
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

Now that the required components have been set up, the AB tests must be matched to the SignInGateComponent that we've created.

All of the following section happens in the `src/web/components/SignInGate/signInGate.ts` file.

#### AB Tests

In `signInGate.ts`, you'll first need to make sure that the AB test definition is imported into the `signInGateTests` array.

This is because we use this array to determine which sign in gate test the user is in, and then determine which one to show by finding the test and (more importantly) the unique variant that the user has been assigned to.

#### Test Variant to Gate Component

Now that we know which variant the user is in, we need to determine which `SignInGateComponent` to show. We do this in the `signInGateTestVariantToGateMapping` object, where we map the key (variant name) to the value (the `SignInGateComponent`). This is used to find the display rules/gate that should run/be displayed.

#### Test ID to Ophan Component ID

Finally we map the AB Test definition `id` to a `string` in the `signInGateTestIdToComponentId` object, which is the Ophan Component ID, this let's us determine in analysis which version of the gate was used. This can be any value, but ideally should be the same as the `ophanComponentId` property from the `frontend` test definition.

### Testing The Gate

Now that the code for the sign in gate test has been set up, it needs to be tested that it actually works correctly.

#### Storybook

The best way to design/develop the styling of the gate is to set up a Storybook component.

In the `SignInGate.stories.tsx` file, simply import the gate design component, and then export it similar to the following example:

```tsx
export const mainPatientia = () => {
	return (
		<Section fullWidth={true}>
			<SignInGatePatientia
				guUrl="https://theguardian.com"
				signInUrl="https://profile.theguardian.com/"
				dismissGate={() => {}}
				component="test"
			/>
		</Section>
	);
};
mainPatientia.storyName = 'patientia_standalone';
```

The props can be set to anything here, since storybook is only interested in the design of the component.

To view it in storybook simply run `make storybook-dev` which will launch a storybook server (with live reloading) to be able to view and develop it.

#### Forced Test Variant

Once the test has been set up, you may want to force yourself into the test to manually check that it's working as expected.

First, ensure you are running `frontend` locally, and the AB test switch has been switched on eg. `safeState=On` - do not commit this change.

Currently there are 2 ways of doing this.

**A)** Set the `GU_mvt_id_local` cookie in your browser.

To do this use https://ab-tests.netlify.app/ to figure out an mvt_id to use for your test. You'll need to set the audience size and offset, as well as any variants in that test. Then modify the `MVT ID` until in `Results` at the bottom, `Is user in test?` is `Yes`, and the variant that you want is highlighted.

The advantage of this is being able to force yourself into a specific section of the audience, which is useful to see what the audience will see if test information is changed, or there are overlapping tests. You'll also need to work out the mvt_id for running the Cypress integration tests.

The disadvantage of this method is that it's a bit tricky to work out exactly which mvt_id to set, and if you make changed to the audience and offset, you may have to adjust the value of the cookie too.

**B)** Add the `forcedTestVariant` prop to the `SetABTests` Island:

```tsx
<Island priority="critical">
	<SetABTests
		abTestSwitches={CAPIArticle.config.switches}
		pageIsSensitive={CAPIArticle.config.isSensitive}
		isDev={!!CAPIArticle.config.isDev}
		// forced test variant prop
		forcedTestVariant={{
			// id of the test from the test definition
			testId: 'SignInGatePatientia',
			// name of the variant to force into
			variant: { id: 'patientia-variant-1', test: () => {} },
		}}
	/>
</Island>
```

The advantages of using the forcedTestVariant:

-   you don't have to work out the value of the mvt_id to set, and that if the audience size or offset has changed it will automatically be picked up.
-   you can technically run it without running `frontend` locally by manually switchi on your AB test switch:

```tsx
 abTestSwitches={{
       ...CAPIArticle.config.switches,
       ...cypressAbSwitches,
       ...{ abSignInGateSwitchName: true }, // DO NOT COMMIT THIS!!
   }}
```

The disadvantage of this is that you have to make sure that you **DO NOT** commit the `forcedTestVariant` or `abTestSwitches` change to main, and that if the `id` or variant id changes, you have to make sure to change it here too.

#### Testing in CODE

To test in CODE you will need to:

1. Ensure the AB test is deployed in Frontend CODE and switched ON here: https://frontend.code.dev-gutools.co.uk/dev/switchboard
2. Ensure the AB test experiment file with audience offsets are depolyed to Frontend CODE and check here: https://frontend.code.devv-gutools.co.uk/analytics/abtests (These test files should be identical in DCR and Frontend)
3. Deploy you DCR branch to CODE.
4. In chrome dev tools, set the value of the `GU_mvt_id` for the `dev-theguardian.com` cookie to one that will be captured by your desired test bucket (use https://ab-tests.netlify.app/)
5. Navigate to an article page and trigger DCR by adding `?dcr` to the url
6. Verify you are in the correct test bucket by looking at the `abtest` value sent to Ophan in the network tab.

#### Cypress Integration Tests

The Cypress tests for the sign in gate are in `sign-in-gate.cy.js`. We use cypress to test that the functionality of the gate works as expected in a browser. Each test that shows a gate **must** be tested individually, as well as any display rules to show that gate (unless the display rules are shared).

Some useful things to note when writing sign in gate tests:

Inside each sign in gate `describe` block, use the `beforeEach` block to reset things before each test is run, for example:

```js
// describe block for the sign in gate main test
describe('SignInGateMain', () => {
    beforeEach(() => {
        // you need to force the user into the test first using the mvt id
        // so use the setMvtCookie method to set this cookie on all the tests
        // (since cookies don't persist between each test)
        // see the section above to work out which value of the mvt_id should be set

        // sign in gate main runs from 0-900000 MVT IDs, so 500 forces user into test
        setMvtCookie('500');

        // setArticleCount is used to set a default number of article views in localstorage
        // for that display rule
        // if needed this can be ovverriden in a test itself, to set more or less article counts

        // set article count to be min number to view gate
        setArticleCount(3);

        // use the setCookieConsent helper method to make sure that the CMP banner is hidden on each test
        // set consent cookie to hide cmp banner
        setCookieConsent();
    })

    ...
```

In each test the `visitArticleAndScrollToGateForLazyLoad` should be called, this helper method makes cypress visit an article page and scroll down the page once loaded so that the sign in gate can be lazy loaded. This method can also take an object to override the default values:

```js
visitArticleAndScrollToGateForLazyLoad({
	url: 'some overriden article url', // use this to override the default article that is visited, e.g. to test that it displays correctly on different article types/sections

	roughPosition: 1000, // use this to override the default y position that is scrolled to after the sign in gate is loaded, you should only need this if the gate does not load because the article had not scrolled enough to lazy load the gate
});
```

In the gate designs themselves, it is useful to set a `data-testid` attributes on any specific element you need to target in Cypress. For example we add this attribute to the top level of the sign in gate div element which we can use to test it's been inserted onto the page. For example:

```html
// gateDesigns/SignInGatePatientia.tsx ...
<div className="{signinGate}" data-testid="sign-in-gate-patientia">...</div>
...
```

```js
// sign-in-gate.cy.js
...
it('should load the sign in gate', () => {
    visitArticleAndScrollToGateForLazyLoad();

    cy.get('[data-testid=sign-in-gate-patientia]').should('be.visible');
});
...
```

To run the cypress tests interactively, make sure the development server is running first, and then use `pnpm cypress:open` to open the interactive cypress testing tool.

Since the Cypress tests rely on a production article, it would normally get the AB switch state from there. In some cases this switch may not be on, or may not be defined yet, in turn meaning that the Cypress tests will fail.

To decouple the switch state from production, we define the state of the switch in DCR that will be set only when running within Cypress. In `src/web/experiments/cypress-switches.ts` update the `cypressSwitches` object to add the switch and state for your new test.

```ts
...
const cypressSwitches = {
    abAbTestTest: true,
    abSignInGatePatientia: true, // setting the Patientia test to always be true in Cypress regardless of production state
};
...
```

Now the AB test will be picked up even if the switch does not exist yet in Frontend, or the switch is set to Off in Frontend too.

#### Unit Tests

Finally for specific code which can be unit tested too, there are some tests for those too. For display rules, you'll find them in `src/web/components/SignInGate/displayRule.test.ts` and for the setting/checking if the gate has been dismissed in `src/web/components/SignInGate/dismissGate.test.ts`. Ideally unit tests should not be a replacement for the integration tests.

You can run tests using `pnpm test`, if you want to run for a specific test file use `pnpm test ./path/to/file` e.g. `pnpm test ./src/web/components/SignInGate/displayRule.test.ts`
