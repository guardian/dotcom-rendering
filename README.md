# 𝐆𝐔𝐔𝐈 [![GitHub version](https://badge.fury.io/gh/guardian%2Fguui.svg)](https://badge.fury.io/gh/guardian%2Fguui) [![Build Status](https://travis-ci.org/guardian/guui.svg?branch=master)](https://travis-ci.org/guardian/guui) [![Known Vulnerabilities](https://snyk.io/test/github/guardian/guui/badge.svg?targetFile=package.json)](https://snyk.io/test/github/guardian/guui?targetFile=package.json)

Frontend rendering framework for theguardian.com. It uses [react](https://reactjs.org/), [emotion](https://emotion.sh) for CSS.

_Any/all of these could change before we reach `2.0.0`._

Chat room: [Digital/dotcom-rendering](https://chat.google.com/room/AAAA6yBswlI)

## Setup

### Node

The only thing you need to make sure you have installed before you get going is Node.

We recommend [nvm](https://github.com/creationix/nvm) (especially combined with [this handy gist](https://gist.github.com/sndrs/5940e9e8a3f506b287233ed65365befb)). It is great at managing multiple versions of Node on one machine.

If you prefer to [install Node manually](https://nodejs.org/en/),
check the [.nvmrc](https://github.com/guardian/guui/blob/master/.nvmrc) for the current required version.

That's it – everything else should be installed for you on demand.

## Development

`make dev` starts the development server.

### Running alongside identity

You may want local identity cookies to be available in dotcom-rendering. To enable this:

1. Add `127.0.0.1 r.thegulocal.com` to the end of your hosts file
2. Follow the installation steps in [identity-platform/nginx](https://github.com/guardian/identity-platform/tree/master/nginx)
3. run `./scripts/nginx/setup.sh`
4. access dotcom-rendering through https://r.thegulocal.com

### Change preview article

You can preview an article from `theguardian.com` by appending the query string parameter `url` to your localhost article page. EG. `http://localhost:3030/Article?url=https://www.theguardian.com/world/2013/jun/09/edward-snowden-nsa-whistleblower-surveillance`

### Debugging tools

In order to ease development you may want to install:

-   Chrome Extension [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en).

## Production

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

### VSCode

We recommend using the [VSCode](https://code.visualstudio.com/) IDE. VSCode includes built in TypeScript language support and has a rich library of extensions which let you add formatters, debuggers and tools to your installation to support your development workflow.

Recommended VSCode extensions are listed in `.vscode/extensions.json` and VSCode should prompt you to install these when you open the project. You can also find these extensions using Command Palette (shift + cmd + P) and typing the 'Extensions: Show Recommended Extensions command' or by searching for '@recommended' in the extensions pane.

#### Auto fix on save

We recommend you update your workspace settings to automatically fix formatting errors on save. Follow these steps to do this:

1. Open the Command Palette (shift + cmd + P) and type `Preferences: Open Workspace Settings`.
2. Search for 'tslint.autoFixOnSave'.
3. Update your `settings.json` with:

```json
    "tslint.autoFixOnSave": true,
```
