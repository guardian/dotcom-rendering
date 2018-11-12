# Testing your JavaScript

## Running tests

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

## Writing tests

Tests should be colocated with the module/Component under test and should end with the suffix `.test.ts`, `.test.tsx`. For example: `components/ShareCount.tsx`/`components/ShareCount.test.tsx` and `lib/cookie.ts`/`lib/cookie.test.tsx`.

### Testing Components

#### Do test

When we write tests for Components, we should test the render logic and not the internal implementation details.

Test the expected behavior of a component: what it renders, how the props it receives alter what's rendered and how user interactions and events that trigger changes of state alter what's rendred.

Look for conditional statements (ternaries, if statements, and switch statements) in the render method for clues about what to test. You should always test your public interface (the props your component takes). For example, if the Component under test takes a prop which is a function that is executed onClick we can test it’s executed by simulating a click on the Component under test.

Alongside jest we use [react-testing-library](https://github.com/kentcdodds/react-testing-library). This a testing utility that allows you to tests against the rendred DOM, output from your component. The utility makes you write tests from a “user-perspective”, asserting against user-facing properties.

#### Don't test

Tests that require you to duplicate the application code exactly. These tests will be brittle. For example if a component renders with a height 10px, if you test that the component has a height 10px and you then update the Component so it’s height is 11px then you’ll have to update your test, even though the component’s behavior has not changed. Don’t test inline styles, unless the value can change based on props/state.

Don't assert against behaviours covered by the library code. EG. Testing types of properties passed to the component, this is unnecessary.

#### Snapshots

Jest [Snapshot](https://jestjs.io/docs/en/snapshot-testing) tests make sure the rendered output of a UI Component does not change unexpectedly.

Jest creates a snapshot file the first time a test with a `.toMatchSnapshot();` assertion is run. The snapshot artifact should be committed alongside code changes, and reviewed as part of the code review process.

##### What if a Snapshot test fails?

A snapshot test will fail when the snapshot for our updated component no longer matches the snapshot artifact for the test case. In this event you should check the failed tests output to see whether the difference between the snapshot and the artifact is intended or not. If it is intended we will need to update our snapshot artifact. You can run `yarn test` with a flag `--updateSnapshot` that will tell it to re-generate snapshots:

```bash
 yarn test --updateSnapshot --testNamePattern [TestSuiteName]
```

##### Things to be aware of with Snapshots

Snapshots immortalize a component’s current markup as the True Markup, regardless of whether or not the component is correct. If you record a snapshot with a bug in your component the snapshot will believe it to be expected.

It's easy to fix failing snapshot tests without diagnosing the cause by running  `yarn test --updateSnapshot`, you should be sure you've not introduced a regression before updating a snapshot.
