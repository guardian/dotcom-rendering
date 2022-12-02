## We're hiring!

Ever thought about joining us?
[https://workforus.theguardian.com/careers/product-engineering/](https://workforus.theguardian.com/careers/product-engineering/)

# Dotcom/Apps Rendering

This repository contains the rendering logic for articles on theguardian.com. It is a monorepo with 3 projects, `apps-rendering`, `common-rendering` and `dotcom-rendering`.

You should always `cd` into the correct subdirectory before running commands (e.g `make dev` for dotcom-rendering, or `pnpm watch` for apps-rendering) except for storybook. Linting, imports, builds and github actions should work as before.

## `apps rendering`

Go to [apps rendering](apps-rendering/README.md) for more details.

## `dotcom rendering`

Go to [dotcom rendering](dotcom-rendering/README.md) for more details.

## `common rendering`

Go to [common rendering](common-rendering/README.md) for more details.

## Root actions

Most commands are run from within each project but the following are managed from the monorepo root:

### Storybook/Chromatic

`pnpm storybook` - Runs Storybook for all projects
`pnpm build-storybook` - Builds Storybook for all projects

Chromatic now runs at project level. `cd` into the project dir and run `pnpm chromatic -t [CHROMATIC PROJECT TOKEN]`

You can find the token in the project Chromatic instance.

### Install Node.js

Make sure you have [Node.js](https://nodejs.org) installed.

We recommend using [nvm](https://github.com/creationix/nvm) (especially combined with [this handy gist](https://gist.github.com/sndrs/5940e9e8a3f506b287233ed65365befb)). It is great at managing multiple versions of Node.js on one machine.

### Install Packages

Run `pnpm install` in the root directory of this project to install packages
