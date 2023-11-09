# Use React hooks

## Context

We've avoided using React hooks for some time in order to ensure un-desired complexity is avoided in the code base. But as hooks are now standard fare in React applications, it makes sense to review our usage of them in DCR.

## Decision

-   Prefer non-stateful components if possible
-   Prefer React's official hooks to custom hooks
-   Avoid abstractions that could lead to hooks within hooks within hooks.
-   Prefer hooks to classes with component lifecycle methods
-   Try to build hooks that are generic and reusable

## Status

...
