# dotcom-rendering

Frontend rendering framework for theguardian.com. It uses [React](https://reactjs.org/), with [Emotion](https://emotion.sh) for styling.

<!-- START doctoc -->
<!-- END doctoc -->

## Chat

Check out the [Digital/dotcom-rendering](https://chat.google.com/room/AAAA6yBswlI) channel on Chat. If you haven't already done so already, please ask the Dotcom Platform team for an invite.

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

The project uses [Yarn Workspaces](https://yarnpkg.com/en/docs/workspaces) and the code can be found in the `packages/` folder.

### Detailed Setup

If you're new to JavaScript projects, if you're trying to integrate with other applications or if you prefer to take things slow, we also have a more [detailed setup guide](docs/contributing/detailed-setup-guide.md).

### Feedback

After completing this setup guide, we would greatly appreciate it if you could complete our [dotcom-rendering setup
questionnaire](https://docs.google.com/forms/d/e/1FAIpQLSdwFc05qejwW_Gtl3pyW4N22KqmY5zXoDKAUAjrkOwb2uXNcQ/viewform?vc=0&c=0&w=1). It should only take 3 minutes and will help us improve this documentation and the setup process in the future. Thank you! 🙏

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

See [the makefile](https://github.com/guardian/dotcom-rendering/blob/master/makefile) for the full list.

## IDE setup

We recommend using [VSCode](https://code.visualstudio.com/).

### Extensions

VSCode should prompt you to install our recommended extensions when you open the project.

You can also find these extensions by searching for `@recommended` in the extensions pane.

### Auto fix on save

We recommend you update your workspace settings to automatically fix formatting errors on save, this avoids code style validation failures. These instructions assume you have installed the `esbenp.prettier-vscode` VSCode plugin:

1. Open the Command Palette (`shift + cmd + P`) and type `>Preferences: Open Settings (JSON)`
2. Add the key value `"tslint.autoFixOnSave": true,`
