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

#### AB Test Switch

#### AB Test Definition

### Sign In Gate Design

#### Gate Component

#### View Design

### Sign In Gate Component

#### Display Rule

#### Gate Design

### Map AB Test to Gate Component

#### AB Tests

#### Test Variant to Gate Component

#### Test ID to Ophan Component ID

### Testing The Gate

#### Storybook

#### Forced Test Variant

#### Cypress Integration Tests

#### Unit Tests
