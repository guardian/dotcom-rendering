# Moving from React to Preact

## Context

We decided to make the jump from React to Preact. Main advantages was reducing the bundle size, with minimal changes to the architecture.

Preact had been quite good at keeping up with React features, which was one of the main [previous concerns.](https://github.com/guardian/dotcom-rendering/blob/main/docs/architecture/003-react.md)

Preact uses a lib called [`preact/compat`](https://preactjs.com/guide/v10/switching-to-preact) which allows us to not have a major refactoring to embrace React.

## Decision

Using webpack aliases we can use `preact/compat` to intercept `react` and `react-dom` imports. We should keep writing components as if we are using react in order to make React compatibility an easy transition if needed.

`preact/compat` add only 2kb extra to preact bundle, but even this has enabled us to go from ~93kb to ~66kb in our react bundle.

## Status

Approved
