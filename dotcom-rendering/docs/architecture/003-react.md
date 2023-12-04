# React

## Context

The majority of client side developers at the Guardian have some [React](https://reactjs.org/) experience, and it is succesfully used in several projects. Its [JSX syntax](https://reactjs.org/docs/introducing-jsx.html) is expressive and readable.

The [Preact](https://preactjs.com/) library has a similar API to React, and is an order of magnitude smaller in terms of file size (3.35KB vs 29.07KB Gzipped). It excludes a lot of React features that we will likely never use.

However, React has a larger community, and is driven by a dedicated team at Facebook. It comes with synthetic events that offer better cross browser support. It is easier to configure, as tools such as Babel, Webpack and Flow assume that JSX implies React. It is easier to [profile using Chrome dev tools](https://reactjs.org/blog/2016/11/16/react-v15.4.0.html#profiling-components-with-chrome-timeline). It also has better integration with the [Enzyme](http://airbnb.io/enzyme/) test utilities.

The React team is working on a number of new features (async rendering, time slicing, suspense). It is [unlikely](https://github.com/developit/preact-compat/issues/432) that Preact will be able to keep up with the pace of React's development.

## Decision

We will build the dotcom rendering layer in React.

## Status

Accepted
