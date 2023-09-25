# Storybook

We use Storybook to visualise our components in an isolated environment, where we can tweak the conditions as we want.
We use Chromatic for visual regression testing of Storybook components.

## Rendering context

We use context for static, global state in the dotcom-rendering app, so every story is wrapped in a context provider component. In the real world, our top component includes this context provider.

In Storybook is largely invisible as it's hidden within the [configuration](dotcom-rendering/.storybook). There's a decorator configured to wrap around stories and log the context output to the console, for easier debugging.
