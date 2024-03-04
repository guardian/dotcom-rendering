# Testing your JavaScript

## Jest tests

Tests are run using [Jest](https://jestjs.io). You can run the full unit test suite locally by running:

```bash
make test
```

To run an individual test suite, run the command:

```bash
pnpm test [TestSuiteName]
```

For example to run `ShareCount.test.tsx` only you can run the command:

```bash
pnpm test ShareCount
```

Alternatively, you can use `watch` mode to have jest run the suite as files are updated:

```
pnpm test --watch
```

## Writing tests

Tests should be colocated with the module/Component under test and should end with the suffix `.test.ts` or `.test.tsx`.

For example:
`components/ShareCount.tsx`
`components/ShareCount.test.tsx`
`lib/cookie.ts`
`lib/cookie.test.ts`

## React Testing Library tests

To test components we use [react-testing-library](https://github.com/kentcdodds/react-testing-library). This a testing utility that allows you to tests against the rendered DOM, output from your component. The utility makes you write tests from a “user-perspective”, asserting against user-facing properties.

### Do test

When we write tests for Components, we should test the render logic and not the internal implementation details.

Test the expected behavior of a component: what it renders, how the props it receives alter what's rendered and how user interactions and events that trigger changes of state alter what's rendred.

Look for conditional statements (ternaries, if statements, and switch statements) in the render method for clues about what to test. You should always test your public interface (the props your component takes). For example, if the Component under test takes a prop which is a function that is executed onClick we can test it’s executed by simulating a click on the Component under test.

### Don't test

Tests that require you to duplicate the application code exactly. These tests will be brittle. For example if a component renders with a height 10px, if you test that the component has a height 10px and you then update the Component so it’s height is 11px then you’ll have to update your test, even though the component’s behavior has not changed. Don’t test inline styles, unless the value can change based on props/state.

Don't assert against behaviours covered by the library code. EG. Testing types of properties passed to the component, this is unnecessary.

### Snapshots

Jest [Snapshot](https://jestjs.io/docs/en/snapshot-testing) tests make sure the rendered output of a UI Component does not change unexpectedly.

We will **not** be writing snaphot test Components for the following reasons:

-   Snapshots immortalize a Component’s current markup as the true markup, regardless of whether or not the component is correct.
-   Too easy to fix tests without fixing underlying bugs simplu by running `jest --u` override command.
-   Increased risk of false negatives and false positives - If the tests fail when there are no bugs, that is a false negative. If the tests pass when there are bugs present, that is a false positive.
-   Developer time required to check snapshot test failures when simple non-breaking changes introduced, plus developer time required to review snapshot output in Pull Requests.

## Playwright tests

[Playwright](https://playwright.dev/) offers a solution for integration tests where tests are executed in a real browser. By executing at this level it provides a realistic representation of a user interacting with the page.

### How to run locally

Running Playwright locally requires having a DCR server running.

#### Against the PROD server

First create the prod build:

`make build`

To run the tests on the command line in headless mode:

`make playwright`

To run the tests in the Playwright UI:

`make playwright-open`

Changes to the tests will hot reload in the Playwright UI but not changes to the DCR code.

If you want to update the DCR code the server will need to be re-built using `make build`.

#### Against the DEV server

To enable hot reloading of the DCR code _and_ the test code:

Edit `load-page.ts` to change the port to the dev server port 3030

To run the tests on the command line in headless mode:

`pnpm playwright:run`

To run the tests in the Playwright UI:

`pnpm playwright:open`
