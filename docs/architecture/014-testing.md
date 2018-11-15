# Jest & react-testing-library

## Context

In dotcom-Rendering we’ll typically be writing 2 types of automated test, traditional unit tests (using Jest) for testing our own libs/helpers etc, and Component integration tests that test the interactions between the various Components in our application.

[Jest](https://jestjs.io) is a fast JavaScript testing utility developed by Facebook. We've decided to use Jest for a number of reasons including: Jest was developed by Facebook so works particularly well with React and requires little configuration, tests are run in parallel which makes running your test suite very fast and it is used widly within The Guardian.

When we write tests for Components they should be relevant for user interfaces, they should therefore test the render logic and not the internal implementation details of our Components. We evaluated using [Enzyme](https://airbnb.io/enzyme/) or [react-testing-library](https://github.com/kentcdodds/react-testing-library). Both are complementary tools to Jest, that integrate well to provide testing abilities.

Enzyme is a comprehensive JavaScript Testing utility that exposes an API via the ReactWrapper. It allows you to query state, props of Component instances and interact directly with a Component's internals. The API is based on manipulating Components via the ReactWrapper. Using Enzyme you can assert, manipulate, and traverse your React Components' output, however this flexibility can lead to bad practices and facilitates the testing of irrelevant implementation details.

react-testing-library is a lightweight alternative to Enzyme. Rather than dealing with React Components the utility allows you to tests against actual DOM nodes. So you don’t assert against props passed/state (implementation details) but DOM output. The utility makes you write tests from a “user-perspective”, asserting against user-facing properties.

> The more your tests resemble the way your software is used, the more confidence they can give you.

Kent C. Dodds (react-testing-library author)

Having used react-testing-library we feel that although it's API is less comprehensive that Enzyme it is most appropriate for testing our Components as user interfaces and it minimizes the likelihood of bad practises in our tests.

## Decision

We will use a combination of Jest and react-testing-library for testing our Components.

## Status

Approved
