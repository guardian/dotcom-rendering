# Testing your JavaScript

## Jest Tests

Tests are run using [Jest](https://jestjs.io). You can run the full unit test suite locally by running:

```bash
make test
```

To run an individual test suite, run the command:

```bash
yarn test [TestSuiteName]
```

For example to run `ShareCount.test.tsx` only you can run the command:

```bash
yarn test ShareCount
```

Alternatively, you can use `watch` mode to have jest run the suite as files are updated:

```
yarn test --watch
```

## Writing tests

Tests should be colocated with the module/Component under test and should end with the suffix `.test.ts`, `.test.tsx`. For example: `components/ShareCount.tsx`/`components/ShareCount.test.tsx` and `lib/cookie.ts`/`lib/cookie.test.ts`.

### Testing Components

#### Do test

When we write tests for Components, we should test the render logic and not the internal implementation details.

Test the expected behavior of a component: what it renders, how the props it receives alter what's rendered and how user interactions and events that trigger changes of state alter what's rendred.

Look for conditional statements (ternaries, if statements, and switch statements) in the render method for clues about what to test. You should always test your public interface (the props your component takes). For example, if the Component under test takes a prop which is a function that is executed onClick we can test it’s executed by simulating a click on the Component under test.

Alongside jest we use [react-testing-library](https://github.com/kentcdodds/react-testing-library). This a testing utility that allows you to tests against the rendred DOM, output from your component. The utility makes you write tests from a “user-perspective”, asserting against user-facing properties.

#### Don't test

Tests that require you to duplicate the application code exactly. These tests will be brittle. For example if a component renders with a height 10px, if you test that the component has a height 10px and you then update the Component so it’s height is 11px then you’ll have to update your test, even though the component’s behavior has not changed. Don’t test inline styles, unless the value can change based on props/state.

Don't assert against behaviours covered by the library code. EG. Testing types of properties passed to the component, this is unnecessary.

### Snapshots

Jest [Snapshot](https://jestjs.io/docs/en/snapshot-testing) tests make sure the rendered output of a UI Component does not change unexpectedly.

We will **not** be writing snaphot test Components for the following reasons:

-   Snapshots immortalize a Component’s current markup as the true markup, regardless of whether or not the component is correct.
-   Too easy to fix tests without fixing underlying bugs simplu by running `jest --u` override command.
-   Increased risk of false negatives and false positives - If the tests fail when there are no bugs, that is a false negative. If the tests pass when there are bugs present, that is a false positive.
-   Developer time required to check snapshot test failures when simple non-breaking changes introduced, plus developer time required to review snapshot output in Pull Requests.

## Cypress Tests

Cypress offers a solution for integration tests where tests are executed in a headless browser, using the actual browser apis. By executing at this level it provides an extremely realistic representation of a user interacting with the page.

### Types of Cypress tests

We have two main types of Cypress tests. End to end and mocked. Both have pros and cons but by using a balance of both we aim to gain the most benefit at the least cost.

#### End to end

These tests use live data to load a page, populating components with real api response data. This tests are an absolute truth, if they work then the there is a very high level of confidence that the actual site will work.

The down side to these types of tests is that they are slower and have a dependency on external endpoints. Too many such tests will slow down the suite and network transience can cause false negatives

#### Mocked

By using mocked data and endpoints, we increase the speed that tests execute at and have complete certainty in what to expect from our mocked endpoints. The risk though is that an api might have changed or break and we won't be aware of this.

### How to run locally

Running Cypress locally requires having a DCR server running. To run the CI server locally, you can run `make run-ci`. The Cypress server should automatically re-load in response to changes in `.spec.` files, but the CI server will need to be re-built every time you want to update the DCR code itself, as opposed to the spec code. You can re-build DCR by re-running `make run-ci`.

To run Cypress in interactive mode (visually):

```
yarn cypress:open
```

This opens a test GUI. Use this when writing or debugging tests.

To run cypress in headless mode (for ci):

```
yarn cypress:run
```

To only run mocked tests:

```
yarn cypress:run:mocked
```

To only run e2e tests:

```
yarn cypress:run:e2e
```
