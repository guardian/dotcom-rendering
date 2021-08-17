# Dotcom/Apps Rendering

This multi-project repo includes dotcom-rendering, annd shortly will include apps-rendering, which will live side by side as separate applications. The purpose of the monorepo is to make it easier for the two projects to share code and reduce duplication. The projects are swimlaned for fault isolation, and share the same node version.

The codebase of dotcom rendering is moved in a ‘dotcom-rendering’ subdirectory. To run dotcom-rendering scripts, e.g `make dev` `yarn storybook`, etc - You can do so by first `cd`’ing into the dotcom-rendering subdirectory.

<!-- TEMPORARY : This section is just here as an initial guide for the first few days post-migration -->

## Getting started after migration?!

Welcome back to dotcom rendering!

If you're using this project, not too much has changed! Follow the steps below to get up-and-running with dotcom rendering -

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
```

The biggest change to the repository is simply that the contents of dotcom-rendering has now moved into a `dotcom-rendering` subdirectory, and you should always cd into that directory before running your familiar DCR commands. Everything you're used to (linting, imports, builds, github actions) should work as before, so no need to worry!

## Quick start

### Install Node.js

Make sure you have [Node.js](https://nodejs.org) installed.

We recommend using [nvm](https://github.com/creationix/nvm) (especially combined with [this handy gist](https://gist.github.com/sndrs/5940e9e8a3f506b287233ed65365befb)). It is great at managing multiple versions of Node.js on one machine.

### dotcom rendering

Go to [dotcom rendering](dotcom-rendering/README.md) for more details.
