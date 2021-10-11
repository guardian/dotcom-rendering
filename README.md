# Dotcom/Apps Rendering

This repository has become a mopnorepo containing dotcom-rendering and apps-rendering as separate applications. The purpose of the monorepo is to make it easier for the two projects to share code and reduce duplication. The projects are swimlaned for fault isolation, and share the same node version.

You should always `cd` into the correct subdirectory before running commands (e.g `make dev` for dotcom-rendering, or `npm run watch` for apps-rendering) except for storybook. Linting, imports, builds and github actions should work as before.

<!-- TEMPORARY : This section is just here as an initial guide for the first few days post-migration -->

## Storybook

While most DCR scripts should be run from within the `dotcom-rendering` subdirectory, storybook remains at the root of the project. So make sure you're _not_ in a subdirectory before running `yarn storybook` or `yarn build-storybook` as before.

## Quick start

### Install Node.js

Make sure you have [Node.js](https://nodejs.org) installed.

We recommend using [nvm](https://github.com/creationix/nvm) (especially combined with [this handy gist](https://gist.github.com/sndrs/5940e9e8a3f506b287233ed65365befb)). It is great at managing multiple versions of Node.js on one machine.

### dotcom rendering

Go to [dotcom rendering](dotcom-rendering/README.md) for more details.

### apps rendering

Go to [apps rendering](apps-rendering/README.md) for more details.
