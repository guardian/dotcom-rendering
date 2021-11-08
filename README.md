# Dotcom/Apps Rendering

This repository has become a monorepo containing dotcom-rendering and apps-rendering as separate applications. The purpose of the monorepo is to make it easier for the two projects to share code and reduce duplication. The projects are swimlaned for fault isolation, and share the same node version.

You should always `cd` into the correct subdirectory before running commands (e.g `make dev` for dotcom-rendering, or `npm run watch` for apps-rendering) except for storybook. Linting, imports, builds and github actions should work as before.

<!-- TEMPORARY : This section is just here as an initial guide for the first few days post-migration -->

## Storybook

While most DCR scripts should be run from within the `dotcom-rendering` subdirectory, storybook remains at the root of the project. So make sure you're _not_ in a subdirectory before running `yarn storybook` or `yarn build-storybook` as before.

## Quick start

### Install Node.js

Make sure you have [Node.js](https://nodejs.org) installed.

We recommend using [nvm](https://github.com/creationix/nvm) (especially combined with [this handy gist](https://gist.github.com/sndrs/5940e9e8a3f506b287233ed65365befb)). It is great at managing multiple versions of Node.js on one machine.

### Install Packages

run `yarn` in the root directory of this project to install packages for `dotcom-rendering`, `apps-rendering` (currently post-install), and `common-rendering`.

### dotcom rendering

Go to [dotcom rendering](dotcom-rendering/README.md) for more details.

### apps rendering

Go to [apps rendering](apps-rendering/README.md) for more details.

## Using yarn workspaces

> Note: This is only being used for dotcom-rendering and common-rendering, not apps-rendering

When updating, adding, or removing packages for a specific sub-project (e.g dotcom-rendering), it should be done with the `yarn workspace` command in the root directory.

Some examples (all run in root directory)

```
# General usage
yarn workspace <package name> <yarn command> < ... ags >
# <package name> should be the "name" specified in the package.json, not the subdirectory name, e.g @guardian/common-rendering, or @guardian/dotcom-rendering

# e.g

# Add a package
yarn workspace @guardian/dotcom-rendering add my-new-package

# Remove a package
yarn workspace @guardian/dotcom-rendering remove my-new-package

# Update a package
yarn workspace @guardian/dotcom-rendering upgrade my-new-package
```
