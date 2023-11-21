# Dotcom/Apps Rendering

This repository contains the rendering logic for articles on theguardian.com. It is a monorepo with 2 projects, `apps-rendering` and `dotcom-rendering`.

## Developer setup

Install [Node.js](https://nodejs.org).

We recommend using [fnm](https://github.com/Schniz/fnm). It is great at managing multiple versions of Node.js on one machine.

> You may find it useful to add `--version-file-strategy recursive` to the [`fnm` shell setup](https://github.com/Schniz/fnm?tab=readme-ov-file#shell-setup). This will set the active Node version to first version it finds in the current directory _or_ any parent directory.

Install [Yarn 1 (Classic)](https://classic.yarnpkg.com/).

## Install

Run `yarn` in the root directory of this project to install packages.

## Run

You should always `cd` into the correct subdirectory before running commands (e.g `make dev` for dotcom-rendering, or `yarn watch` for apps-rendering) except for storybook.

### `apps rendering`

Go to [apps rendering](apps-rendering/README.md) for more details.

### `dotcom rendering`

Go to [dotcom rendering](dotcom-rendering/README.md) for more details.

## Root actions

Most commands are run from within each project but the following are managed from the monorepo root:

### Storybook/Chromatic

`yarn storybook` - Runs Storybook for all projects
`yarn build-storybook` - Builds Storybook for all projects

Chromatic now runs at project level. `cd` into the project dir and run `yarn chromatic -t [CHROMATIC PROJECT TOKEN]`

You can find the token in the project Chromatic instance.

To run Chromatic in CI on your pr, add the `run_chromatic` label once you're ready to check for visual regressions.
