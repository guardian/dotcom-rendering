# Dotcom Rendering

Frontend rendering framework for theguardian.com. It uses [React](https://reactjs.org/), with [Emotion](https://emotion.sh) for styling.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<!-- Automatically created with yarn run createtoc and on push hook -->

- [Quick start](#quick-start)
  - [Install Node.js](#install-nodejs)
  - [Running instructions](#running-instructions)
  - [Detailed Setup](#detailed-setup)
  - [Technologies](#technologies)
  - [Architecture Diagram](#architecture-diagram)
  - [Concepts](#concepts)
  - [Feedback](#feedback)
- [Where can I see Dotcom Rendering in Production?](#where-can-i-see-dotcom-rendering-in-production)
- [Code Quality](#code-quality)
  - [Snyk Code Scanning](#snyk-code-scanning)
- [IDE setup](#ide-setup)
  - [Extensions](#extensions)
  - [Auto fix on save](#auto-fix-on-save)
- [Thanks](#thanks)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Quick start

This guide will help you get the `dotcom-rendering` application running on your development machine.

### Install Node.js

The only thing you need to make sure you have installed before you get going is [Node.js](https://nodejs.org).

We recommend using [nvm](https://github.com/creationix/nvm) (especially combined with [this handy gist](https://gist.github.com/sndrs/5940e9e8a3f506b287233ed65365befb)). It is great at managing multiple versions of Node.js on one machine.

### Running instructions

```
$ git clone git@github.com:guardian/dotcom-rendering.git
$ cd dotcom-rendering
$ make dev
```

`make dev` will start the development server on port 3030: [http://localhost:3030](http://localhost:3030).

Visit the [root path of the dev server](http://localhost:3030) for some example URLs to visit.

You can render a specific article by [specifying the production URL in the query string](http://localhost:3030/Article?url=https://www.theguardian.com/sport/2019/jul/28/tour-de-france-key-moments-egan-bernal-yellow-jersey).

You can view the JSON representation of an article, as per the model sent to the renderer on the server, by going to

http://localhost:3030/ArticleJson?url=https://www.theguardian.com/sport/2019/jul/28/tour-de-france-key-moments-egan-bernal-yellow-jersey

### Detailed Setup

If you're new to JavaScript projects, if you're trying to integrate with other applications or if you prefer to take things slow, we also have a more [detailed setup guide](docs/contributing/detailed-setup-guide.md).

### Technologies

| Technology                                                                       | Description                                                                                                                                                                                                                                                                                                                             |
| -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img alt="Preact" src="./docs/images/logo-preact.jpg" width="350" />             | DCR is rendered on the server with Preact and uses Preact as the Client-side framework. We use preact-compat to ensure compatability with React modules.                                                                                                                                                                                |
| <img alt="Emotion CSS-in-JS" src="./docs/images/logo-emotion.png" width="350" /> | Emotion is css-in-js library, DCR uses the `css` tagged template literal style to allow CSS copy-pasting.                                                                                                                                                                                                                               |
| <img alt="Typescript" src="./docs/images/logo-typescript.png" width="350" />     | DCR is written in Typescript. You can see the [block element types](./src/lib/content.d.ts) as an example of our Typescript types.                                                                                                                                                                                                      |
| <img alt="Express" src="./docs/images/logo-express.png" width="350" />           | We use Express as a very thin server to communicate with the Frontend endpoint.                                                                                                                                                                                                                                                         |
| <img alt="Storybook" src="./docs/images/logo-storybook.jpg" width="350" />       | We use [storybook to generate component variations and 'layouts'](https://5dfcbf3012392c0020e7140b-borimwnbdl.chromatic.com/?path=/story/*) that are then visual regression tested in Chromatic. You'll notice `.stories.` files in the repo for components that define the variations of components as defined by the component props. |
| <img alt="Chromatic" src="./docs/images/logo-chromatic.jpg" width="350" />       | Chromatic is a visual regression testing tool that reviews our Storybook components at PR time.                                                                                                                                                                                                                                         |
| <img alt="Cypress" src="./docs/images/logo-cypress.png" width="350" />           | Cypress is an integration testing tool that runs tests in the browser. You will find the Cypress tests in the [cypress folder](./cypress).                                                                                                                                                                                              |
| <img alt="Chromatic" src="./docs/images/logo-jest.jpg" width="350" />            | Jest is a unit testing tool. You will find Jest tests in the repo with `.test.` filenames.                                                                                                                                                                                                                                              |
| <img alt="AB Testing" src="./docs/images/logo-ab-testing.png" width="350" />     | The [A/B Testing library](https://github.com/guardian/ab-testing) is an internal NPM Module. There are a [some docs here](./docs/development/ab-testing-in-dcr.md).                                                                                                                                                                     |

### Architecture Diagram

You can see a _web only_ architecture diagram by running `make arch-diagram`. It will give you an overview of the current server and browser web architecture.

### Concepts

There are some concepts to learn, that will make working with Dotcom Rendering clearer:

-   Design and Display Types use the [Switch Pattern](docs/patterns/switch-on-display-design.md)
-   [DecideLayout](docs/patterns/decide-layout.md)
-   [Prop Drilling](https://kentcdodds.com/blog/prop-drilling/) (and [why we don't use React Context](docs/architecture/018-react-context-api.md))
-   Dynamic imports
-   [EnhanceCAPI](docs/patterns/enhance-capi.md)
-   Data generated in Frontend

### Feedback

After completing this setup guide, we would greatly appreciate it if you could complete our [dotcom-rendering setup
questionnaire](https://docs.google.com/forms/d/e/1FAIpQLSdwFc05qejwW_Gtl3pyW4N22KqmY5zXoDKAUAjrkOwb2uXNcQ/viewform?vc=0&c=0&w=1). It should only take 3 minutes and will help us improve this documentation and the setup process in the future. Thank you! 🙏


## Where can I see Dotcom Rendering in Production?

As of April 2021, most articles are rendered with Dotcom Rendering.

You can force DCR on or off explicitly with
[`?dcr=true` or `?dcr=false`](https://github.com/guardian/frontend/pull/21753).

One way to verify whether the article you're looking at is being rendered by DCR or not is to look for `(modern)` in the footer after the copyright notice.

## Code Quality

You can ensure your code passes code quality tests by running:

```
$ make validate
```

This runs our linting tool, the TypeScript compiler and our tests, before finally building the bundles.

You can also run these tasks individually:

```
$ make lint
$ make stylelint
$ make tsc
$ make test
```

If you get lint errors, you can attempt to automatically fix them with:

```
$ make fix
```

See [the makefile](https://github.com/guardian/dotcom-rendering/blob/main/makefile) for the full list.

[Read about testing tools and testing strategy](docs/testing.md).

### Snyk Code Scanning
There's a Github action set up on the repository to scan for vulnerabilities. This is set to "continue on error" and so will show a green tick regardless. In order to check the vulnerabilities we can use the Github code scanning feature in the security tab and this will list all vulnerabilities for a given branch etc. You should use this if adding/removing/updating packages to see if there are any vulnerabilities.

## IDE setup

We recommend using [VSCode](https://code.visualstudio.com/).

### Extensions

VSCode should prompt you to install our recommended extensions when you open the project.

You can also find these extensions by searching for `@recommended` in the extensions pane.

### Auto fix on save

We recommend you update your workspace settings to automatically fix formatting errors on save, this avoids code style validation failures. These instructions assume you have installed the `esbenp.prettier-vscode` VSCode plugin:

1. Open the Command Palette (`shift + cmd + P`) and type

    ```
    >Preferences: Open Settings (JSON)
    ```

2. Add the key value `"tslint.autoFixOnSave": true,`

If you prefer not to use an editor like VSCode then you can use the following commands to manage formatting:

- `yarn prettier:check` &rarr; Checks for prettier issues
- `yarn prettier:fix` &rarr; Checks and fixes prettier issues
- `yarn lint` &rarr; Checks for linting issues
- `yarn lint --fix` &rarr; Checks and fixes linting issues

## Thanks

<a href="https://www.chromaticqa.com/"><img src="https://cdn-images-1.medium.com/letterbox/147/36/50/50/1*oHHjTjInDOBxIuYHDY2gFA.png?source=logoAvatar-d7276495b101---37816ec27d7a" width="120"/></a>

Thanks to [Chromatic](https://www.chromaticqa.com/) for providing the visual testing platform that helps us catch unexpected changes on time
