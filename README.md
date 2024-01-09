# Dotcom/Apps Rendering

This repository contains the rendering logic for articles on theguardian.com. It is a monorepo with 2 projects, `apps-rendering` and `dotcom-rendering`.

## Developer setup

Install [Node.js](https://nodejs.org).

We recommend using [fnm](https://github.com/Schniz/fnm). It is great at managing multiple versions of Node.js on one machine.

> You may find it useful to add `--version-file-strategy recursive` to the [`fnm` shell setup](https://github.com/Schniz/fnm?tab=readme-ov-file#shell-setup). This will set the active Node version to first version it finds in the current directory _or_ any parent directory.

Once Node is installed, make sure you're using the correct package manager by [enabling corepack](https://github.com/nodejs/corepack?tab=readme-ov-file#utility-commands):

```sh
corepack enable
```

> [!NOTE]
>
> If you're using `asdf`, you'll need to run `asdf reshim nodejs` after running `corepack enable`.

## Install

Run `pnpm` in the root directory of this project to install packages.

## Run

You should always `cd` into the correct subdirectory before running commands (e.g `make dev` for dotcom-rendering, or `pnpm watch` for apps-rendering).

### `apps rendering`

Go to [apps rendering](apps-rendering/README.md) for more details.

### `dotcom rendering`

Go to [dotcom rendering](dotcom-rendering/README.md) for more details.
