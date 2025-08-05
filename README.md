# Dotcom Rendering & Apps Rendering

This repository contains the rendering logic for theguardian.com and for a subset of articles in the live apps.

It is a monorepo with 2 projects, `apps-rendering` and `dotcom-rendering`.

## Run

### `apps rendering`

Go to [apps rendering](apps-rendering/README.md) for more details.

### `dotcom rendering`

Go to [dotcom rendering](dotcom-rendering/README.md) for more details.

## Root actions

Most commands are run from within each project but the following can be run from the root:

### Storybook

`pnpm storybook` - Runs Storybook for all projects
`pnpm build-storybook` - Builds Storybook for all projects
