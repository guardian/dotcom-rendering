# React Context API

## Context

[A decision](dotcom-rendering/docs/architecture/016-react-context-api.md) was made in 2019 to avoid use of the React context API, preferring prop-drilling and avoiding global state.

[This decision was revisited in 2023](https://github.com/guardian/dotcom-rendering/discussions/8696) due to [the introduction of rendering target as a prop](dotcom-rendering/docs/architecture/proposed-adrs/rendering-type.md) which represents a global state, resulting in very heavy prop-drilling throughout the app. This began to complicate pull requests due to so many unrelated changes appearing in the diff since the props needed to be provided at every layer of the app, as well as tightly coupling components unnecessarily.

An RFC was put together [here](https://github.com/guardian/dotcom-rendering/pull/8704) to trial using the React context API for this specific type of global state, which doesn't change throughout the component lifecycle.

## Decision

The decision to allow use of context more generally rests on the following _"lines in the sand"_:

-   Context should be considered **global** for rendered components in dotcom-rendering
-   Context should **only be used for JSX components** (ie. not for JSON responses or non-JSX helper code)
-   Context should **not be used for values that change between re-renders**, since this adds unnecessary complexity and there are alternative solutions for these cases
-   Context should **only be used for server-side rendered (SSR) components** and therefore should **not be used inside islands**

## Status

Proposed
