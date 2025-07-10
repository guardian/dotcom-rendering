# Dotcom Rendering

The rendering framework for theguardian.com.

It primarily uses [TypeScript](https://www.typescriptlang.org/), [Node.js](https://nodejs.org/en), [Express](https://expressjs.com/), [React](https://reactjs.org/) and [Emotion](https://emotion.sh).

## Getting started

This guide will help you get the `dotcom-rendering` application running on your development machine.

Start in your `~/code` directory:

```
$ cd ~/code
```

Clone the repository from GitHub:

```
$ git clone git@github.com:guardian/dotcom-rendering.git
```

Change directory to the repository root:

```
$ cd dotcom-rendering
```

### Install Node.js

To install and manage Node versions, we highly recommend installing a Node version manager such as [fnm](https://github.com/Schniz/fnm) (preferred), [nvm](https://github.com/nvm-sh/nvm) or [asdf](https://asdf-vm.com/guide/getting-started.html).

Ensure you're at the root directory of this project, then follow the instructions for your version manager to install Node.

For `fnm` this will be:

```
$ fnm use
```

For `nvm` this will be:

```
$ nvm use
```

Once installed, check the running Node version (ignoring any 'v' prefix) matches the version in [.nvmrc](../.nvmrc)

```
$ node --version
```

#### fnm

[fnm](https://github.com/Schniz/fnm) has some useful features which we recommend to make Node version detection as seamless as possible:

##### --use-on-cd

This configuration automatically detects and changes to the required Node version when changing directories.

https://github.com/Schniz/fnm/blob/master/docs/configuration.md#--use-on-cd

##### --version-file-strategyrecursive

This configuration allows the Node version detection to scan all parent directories.

https://github.com/Schniz/fnm/blob/master/docs/configuration.md#--version-file-strategyrecursive

### Corepack

Enable [corepack](https://github.com/nodejs/corepack) to install the correct package manager:

```sh
$ corepack enable
```

If you're using `asdf`, you'll need to run `asdf reshim nodejs` after running `corepack enable`.

### Install dependencies

Change from the project root directory to the inner `dotcom-rendering` directory:

```
$ cd dotcom-rendering
```

Run

```
$ make install
```

If you get an Node version error then check the setup for your version manager.

### Running locally

```sh
$ make dev
```

Will start the development server on [http://localhost:3030](http://localhost:3030).

A list of content types with example URLs is available on the [root path](http://localhost:3030).

You can render a specific article by appending the the production URL to the `Article` endpoint, for example:
http://localhost:3030/Article/https://www.theguardian.com/sport/2019/jul/28/tour-de-france-key-moments-egan-bernal-yellow-jersey

You can view the JSON representation of an article as sent by [Frontend](https://github.com/guardian/frontend) to DCR, by appending `.json?dcr=true` to the production URL, for example:
https://www.theguardian.com/sport/2019/jul/28/tour-de-france-key-moments-egan-bernal-yellow-jersey.json?dcr=true

### Detailed setup

If you're trying to integrate with other applications, we also have a more [detailed setup guide](docs/contributing/detailed-setup-guide.md).

## VS Code

We recommend using [VSCode](https://code.visualstudio.com/).

### Settings

We have configured a collection of _required_ VS Code settings in the file `.vscode/settings.json.required`.

We have configured a collection of _recommended_ VS Code settings in the file `.vscode/settings.json.recommended`.

Copy the required settings and any recommended settings you wish to use over to `.vscode/settings.json` to activate them.

The `settings.json` file is git ignored to prevent it from overriding any indivdiual developer's settings.

### Extensions

VSCode should prompt you to install our recommended extensions when you open the project.

You can also find these extensions by searching for `@recommended` in the extensions pane.

### Auto fix on save

We recommend you update your workspace settings to automatically fix formatting and linting errors on save, this avoids code style validation failures. These instructions assume you have installed the `esbenp.prettier-vscode` VSCode plugin:

1. Open the Command Palette (`shift + cmd + P`) and select:

    ```
    Preferences: Open Workspace Settings (JSON)
    ```

2. If it doesn't already exist add the following:
    ```json
    "editor.codeActionsOnSave": {
    	"source.fixAll.eslint": true
    }
    ```

## Technologies

| Technology                                                                                                                 | Description                                                                                                                                                                                                                                                                                                                                       |
| -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img alt="Typescript" src="./docs/images/logo-typescript.png" width="350" />                                               | DCR is written in [TypeScript](https://www.typescriptlang.org/)                                                                                                                                                                                                                                                                                   |
| <img alt="Preact" src="./docs/images/logo-preact.jpg" width="350" />                                                       | DCR is rendered on the server with Preact and uses Preact as the Client-side framework. We use preact-compat to ensure compatability with React modules.                                                                                                                                                                                          |
| <img alt="Emotion CSS-in-JS" src="./docs/images/logo-emotion.png" width="350" />                                           | [Emotion](https://emotion.sh) is css-in-js library, DCR uses the `css` tagged template literal style to allow CSS copy-pasting.                                                                                                                                                                                                                   |
| <img alt="Express" src="./docs/images/logo-express.png" width="350" />                                                     | We use [Express](https://expressjs.com/) as a very thin server to communicate with the Frontend endpoint.                                                                                                                                                                                                                                         |
| <img alt="Storybook" src="./docs/images/logo-storybook.jpg" width="350" />                                                 | We use [Storybook](https://storybook.js.org/) to generate [component variations](https://main--63e251470cfbe61776b0ef19.chromatic.com) that are then visual regression tested in [Chromatic](https://www.chromatic.com/). You'll notice `.stories.` files in the repository that define the component variations.                                 |
| <img alt="Chromatic" src="./docs/images/logo-chromatic.jpg" width="350" />                                                 | [Chromatic](https://www.chromatic.com/) is a visual regression testing tool that tests our Storybook components at PR time.                                                                                                                                                                                                                       |
| <img alt="Jest" src="./docs/images/logo-jest.jpg" width="350" />                                                           | [Jest](https://jestjs.io) is a unit testing tool. You will find Jest tests in the repo with `.test.` filenames.                                                                                                                                                                                                                                   |
| <img alt="Playwright" src="./docs/images/logo-playwright.svg" width="350" />                                               | [Playwright](https://playwright.dev/) is an integration testing tool that runs tests in the browser. You will find the Playwright tests in the [playwright directory](./playwright).                                                                                                                                                              |
| <img alt="AB Testing" src="./docs/images/logo-ab-testing.png" width="350" />                                               | The [A/B Testing library](https://github.com/guardian/csnx/tree/main/libs/@guardian/ab-core) is an internal NPM Module. There are [docs here](./docs/development/ab-testing-in-dcr.md).                                                                                                                                                           |
| <img alt="Deno" title="Deno logo, MIT License: https://deno.land/artwork" src="./docs/images/logo-deno.svg" width="350" /> | [Deno](https://deno.land/) is a JavaScript runtime that we've started incorporating into some of our Github Actions workflows. You will only need to install it if you are planning to run the workflow scripts locally. Some installation and troubleshooting instructions can be found in the [Deno scripts folder](../scripts/deno/README.md). |

## Concepts

There are some concepts to learn, that will make working with Dotcom Rendering clearer:

-   Design and Display Types use the [Switch Pattern](docs/patterns/switch-on-display-design.md)
-   [DecideLayout](docs/patterns/decide-layout.md)
-   [Prop Drilling](https://kentcdodds.com/blog/prop-drilling/) (and [why we don't use React Context](docs/architecture/016-react-context-api.md))
-   Dynamic imports
-   [Enhancers](docs/patterns/enhancers.md)
-   Data generated in Frontend

## Design system

[Source](https://theguardian.design) is the Guardian's design system. For detailed and up-to-date information on how to use it, see the [Source guide](https://github.com/guardian/csnx/blob/main/docs/source/README.md).

## Code quality

You can ensure your code passes code quality tests by running:

```sh
$ make validate
```

This runs our linting tool, the TypeScript compiler and our tests, before finally building the bundles.

You can also run these tasks individually:

```sh
$ make lint
$ make stylelint
$ make tsc
$ make test
```

If you get lint errors, you can attempt to automatically fix them with:

```sh
$ make fix
```

See [the makefile](./makefile) for the full list.

## Testing

[Testing tools and testing strategy](docs/testing.md)

## Debugging

DCR provides a visual debugging tool through a bookmarklet which you can find out more about in the [debug tool docs](./src/client/debug/README.md).

## Vulnerabilities

### Dependabot

To monitor vulnerabilities from GitHub, you can use [Dependabot alerts in the security tab](https://github.com/guardian/dotcom-rendering/security/dependabot).

### Manual audit

To check for vulnerabilities in development, you can run:

```sh
$ make audit
```
