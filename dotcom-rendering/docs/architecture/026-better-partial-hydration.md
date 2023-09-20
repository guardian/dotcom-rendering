# Improved Partial Hydration

## Context

We already had a solution for partial hydration in DCR but the developer experience was poor and it was not scaling well.

### What is Partial Hydration?

Partial hydration (aka React Islands) is the name for the technique where, instead of hydrating the entire page, you target specific parts using ids or markers in an effort to reduce the amount of work needed on the client.

See: https://addyosmani.com/blog/rehydration/

### Before

We used App.tsx which was a global react app that let us have shared state between islands. For lazy loading we employed React Loadable Components. From there, we used a component called `HydrateOnce` which was designed to only execute once even though the global react was triggering re-renders as state changed.

This was problematic because sometimes you had dependencies on global state so to get around this we added the `waitFor` prop.

To create a new island you had to:

1. Wrap your component on the server with a div with an manually gererated id, like 'my-thing-root'
2. Update the `LoadableComponents` type in index.d.ts
3. Update `document.tsx` to create the chunk
4. Insert the `loadable` statement at the top of `App.tsx`
5. Extract the props needed for hydration from the global CAPI object
6. Create an entry in the return of `App.tsx` to call `HydrateOnce` using the extracted props

### After

PRs #[3629](https://github.com/guardian/dotcom-rendering/pull/3629) & [#3784](https://github.com/guardian/dotcom-rendering/pull/3784) simplify the process of partial hydration by moving the logic out of a React app and into a simple script tag. This removes the need to manage re-renders, can use standard dynamic imports and reduces the effort needed to use.

To create a new island you now:

1. Wrap you component on the server with `Island`.
2. Add `.importable` to the component filename. Eg: `[MyThing].importable.tsx`

This is simpler to use, harder to make mistakes with and is certain to only ever send the data to the client that is required.
