# Loadable Components and Dynamic Importing

In https://github.com/guardian/dotcom-rendering/pull/2194 we introduced [Loadable Components](https://loadable-components.com/) to DCR.

## What are we trying to achieve?

The end goal is ‘Nothing over the wire’. I.E: Do not send any Javascript to the user’s browser that they do not use.

### Side Quest Goals

Along with this goal we're looking to:
- Parallelise downloads so that we can get to parse and execute of the main app as quickly as possible.
- Increase browser and Fastly caching for multi-visit users by reducing the number of new files (currently any change in the React app generates a new hash and invalidates the cache)

## How do I split out my component for Loadable Components?

1. Identify the Component you want to split in App.tsx
   1. Use the `loadable` function, which contains a callback for the import
   2. The callback should return a Promise - either resolved with your `import` if it the Component is in the CAPI array or `Promise.reject()` if not
   3. Use the `resolveComponent` option to resolve to a named export in the imported ES6 module
2. Add the Component you are splitting to index.d.ts in the `LoadableComponents` array
   1. If it should always load, use 'always' as the `addWhen` value
   2. If it should only load if a component is in the request, add the CAPI Type value
3. Add your component to `document.tsx` in the `allChunks` array
   1. The `chunkName` will be snake-case from after `components/` import path e.g: `components/elements/YoutubeBlockComponent` becomes `elements-YoutubeBlockComponent`.
   2. You can double check the name when running `make dev` in the `dist/` folder, the file `loadable-manifest-browser.json`
4. `addWhen` should match your type above. It is double opt-in.
5. Write a Cypress test to verify the functionality of your component
   1. It is important to write a test to ensure that when your component is on the page it loads as is expected

## What does Loadable Components do?

1. Split out components from the React app
2. Check whether those components should be loaded at request time and add their script tags to the page to take advantage of the preparsrer
3. Wait for the components required for the page view to be loaded before page view

#### What parts of loadable components are we and are we not using?

- We are using the [client-side module for loadable components](https://loadable-components.com/docs/api-loadable-component/) that gives us some [benefits over react lazy](https://loadable-components.com/docs/loadable-vs-react-lazy/), like being able to code split *for hydrated components*
- [The webpack plugin](https://loadable-components.com/docs/api-loadable-webpack-plugin/) generates a stats file that we use on the server to gather chunks
- [The babel plugin](https://loadable-components.com/docs/babel-plugin/#babel-plugin) turns a loadable call into what is required for chunking, automatically adding things like the chunkName
- The [loadable/server module](https://loadable-components.com/docs/api-loadable-server/) has some methods that we use to:
	- Add chunks based on the components needed for the pageview
	- Gather the information for those chunks so we can create the script tags

We do not use the loadable/server `collectChunks` method because our partial hydration and architecture make it difficult when loadable expects a fully isomorphic app that is similar on client and server. This does give us more control, however, on what components we add to the page - and mirrors how we're splitting components for AMP.

document.tsx has detailed comments on what we're doing and why.
