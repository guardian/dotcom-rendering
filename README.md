# dotcom-rendering [![GitHub version](https://badge.fury.io/gh/guardian%2Fguui.svg)](https://badge.fury.io/gh/guardian%2Fguui) [![Build Status](https://travis-ci.org/guardian/guui.svg?branch=master)](https://travis-ci.org/guardian/guui) [![Known Vulnerabilities](https://snyk.io/test/github/guardian/guui/badge.svg?targetFile=package.json)](https://snyk.io/test/github/guardian/guui?targetFile=package.json)

Frontend rendering framework for theguardian.com. It uses [React](https://reactjs.org/), with [Emotion](https://emotion.sh) for styling.

## Chat

Feel free to check out the [Digital/dotcom-rendering](https://chat.google.com/room/AAAA6yBswlI) channel on Chat (ask the Dotcom Platform team for an invite).

## Quick start

This guide will help you get the dotcom-rendering application running on your development machine.

If you're new to JavaScript projects, if you're trying to integrate with other applications or if you prefer to take things slow, we also have a more [detailed setup guide](docs/contributing/detailed-setup-guide.md).

### Install Node.js

The only thing you need to make sure you have installed before you get going is [Node.js](https://nodejs.org).

We recommend using [nvm](https://github.com/creationix/nvm) (especially combined with [this handy gist](https://gist.github.com/sndrs/5940e9e8a3f506b287233ed65365befb)). It is great at managing multiple versions of Node.js on one machine.

### Development

`make dev` starts the development server.

### Production

-   `make build` creates production-ready bundles.
-   `make start` starts the production server.
-   `make stop` stops the production server.

## Other tasks

### Code quality

-   `make lint`
-   `make tsc`
-   `make test`

`make validate` runs all of the above, plus a final `make build`.

If you get lint errors, `make fix` will attempt to automatically fix them for you.

See [the makefile](https://github.com/guardian/guui/blob/master/makefile) for the full list.

## IDE setup

We recommend using [VSCode](https://code.visualstudio.com/).

### Extensions

VSCode should prompt you to install our recommended extensions these when you open the project. 

You can also find these extensions by searching for `@recommended` in the extensions pane.

### Auto fix on save

We recommend you update your workspace settings to automatically fix formatting errors on save:

1. Open the Command Palette (`shift + cmd + P`) and type `Preferences: Open Workspace Settings`
2. Search for `tslint.autoFixOnSave`
3. Update your `settings.json` with:

```json
    "tslint.autoFixOnSave": true,
```
