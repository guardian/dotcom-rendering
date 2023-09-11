# Use React portals

## Context

We already have partial hydration implemented using react 'islands', a design pattern where we use multiple react apps on the same page, but now we have a requirement to share data between these islands.

React portals would allow us to have one root react app with multiple portals existing within it without the need to hydrate the entire dom. See: https://reacttraining.com/blog/portals-with-context/

There are two ways to share data between portals. Using props, or react context.

### React context

Useful because it means all child components can access the context at any point in the tree but adds 'magic'.

### Props

More explicit but causes additional prop drilling.

## Decision

Implement react portals pattern and use props to pass down shared data.

Don't use react context, use pure props instead. This means more prop drilling but we prefer this cost over the complexity of context.

## Status

Approved

...
