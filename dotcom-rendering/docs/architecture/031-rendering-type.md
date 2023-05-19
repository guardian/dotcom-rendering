# Using 'renderingType' to support different props / data requirements

## Status: Proposed

## Context

DCR is becoming a 'multi-purpose' rendering platform, which can output articles not just
for the web (which is historically what it was built for), but also for our apps.

While the goal (both from an engineering & product) perspective is that content rendered for each target
will remain largely the same, we do need to support some differences.

-   Using web technology vs native implementations of some features, e.g videos & lightbox.
-   Commercial code like adverts & reader revenue callouts.
-   Support for dark-mode

In order to support these differences, we're implementing a `renderingTarget` type that will allow a component
or piece of code to know whether it should output for web, apps, or any other potential target.

Furthermore, while the underlying data-model will not change between rendering targets, there may be
a requirement for data to be slightly different for some components as outlined in [this RFC](https://github.com/guardian/dotcom-rendering/issues/7256). In order to support this, we'd like to introduce a pattern for varying these props.

### Varying props pattern

To keep thing simple, rather than creating an abstraction as shown in the RFC, we're starting with a simple in-component based setup as shown below:

```ts
interface CommonProps {
	value: string;
	target: RenderingTarget;
}

interface AppProps extends CommonProps {
	target: 'Apps';
	apiUrl: string;
}

interface WebProps extends CommonProps {
	target: 'Web';
}

const Component = (props: AppProps | WebProps) => <>{/* … */}</>;
```

Given that we expect this pattern won't be used frequently, supporting a simple data structure that can be quickly
understood by any developer working on the project.

### Additional complexity

We should be aware that this pattern adds new complexity to the project as a whole, and while this was anticipated in the
outcome of the original spike, we should still make every effort to reduce this complexity where possible.

This may involve re-visiting this decision and making any alterations to the patterns that are necessary.

[Original RFC](https://github.com/guardian/dotcom-rendering/issues/7256) - [Original PR](https://github.com/guardian/dotcom-rendering/pull/7359)
