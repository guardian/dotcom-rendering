# Dotcom/Apps Rendering

This repository has become a mopnorepo containing dotcom-rendering and apps-rendering as separate applications. The purpose of the monorepo is to make it easier for the two projects to share code and reduce duplication. The projects are swimlaned for fault isolation, and share the same node version.

You should always `cd` into the correct subdirectory before running commands (e.g `make dev` for dotcom-rendering, or `npm run watch` for apps-rendering). Linting, imports, builds and github actions should work as before.

<!-- TEMPORARY : This section is just here as an initial guide for the first few days post-migration -->

## Getting started after migration?

Welcome to the monorepo for dotcom-rendering and apps-rendering.

If you're using this project, not too much has changed. Follow the steps below to get up and running:

```bash
# (Optional) Delete your existing node_modules folder
dotcom-rendering $ rm -rf ./node_modules

# (IMPORTANT) Move into the dotcom-rendering subdirectory
dotcom-rendering $ cd dotcom-rendering

# You should now be in the 'dotcom-rendering' subdirectory

# (Optional) Install node packages
# If you're not running 'make dev' right away - this will help your vscode eslint, etc work as expected (if you use them)
dotcom-rendering/dotcom-rendering $ yarn install

# Run DCR
dotcom-rendering/dotcom-rendering $ make dev

# If you're working with apps-rendering, move into the apps-rendering subdirectory
dotcom-rendering $ cd apps-rendering

# You should now be in the 'apps-rendering' subdirectory

# (Optional) Install node packages
# If you're not running 'npm run watch' right away
dotcom-rendering/apps-rendering $ npm install

# Run AR
dotcom-rendering/apps-rendering $ npm run watch
```

## Quick start

### Install Node.js

Make sure you have [Node.js](https://nodejs.org) installed.

We recommend using [nvm](https://github.com/creationix/nvm) (especially combined with [this handy gist](https://gist.github.com/sndrs/5940e9e8a3f506b287233ed65365befb)). It is great at managing multiple versions of Node.js on one machine.

### dotcom rendering

Go to [dotcom rendering](dotcom-rendering/README.md) for more details.

### apps rendering

Go to [apps rendering](apps-rendering/README.md) for more details.
