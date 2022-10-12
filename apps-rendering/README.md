## apps-rendering

### Install

1. Clone the repo, then CD into the `apps-rendering` subdirectory before running any commands -
2. Make sure you're using the version of Node specified in [`.nvmrc`](/.nvmrc)
3. Install dependencies:

```sh
npm install
```

### Run (Development)

**Before you start** get `mobile` Janus credentials (ask someone if you're unsure what this means)

#### Everything

This is the simplest way to get started, but will intermingle all the logs together in one shell. If you're doing development work it might be easier to run the client and server in separate shells as described in the next subsection.

```sh
npm run watch
```

View in a browser at http://localhost:8080 (standard port for [webpack-dev-server](https://webpack.js.org/configuration/dev-server/#devserverport))

_**Note**: You will need to refresh the page to see any changes you make to the server code. Any changes to client code should reload automatically._

#### Client and Server In Separate Shells

This will output each command's logs to different shells, which can make development easier.

To start the server:

```sh
npm run watch:server
```

To start the client:

```sh
npm run watch:client
```

View in a browser at http://localhost:8080 (standard port for [webpack-dev-server](https://webpack.js.org/configuration/dev-server/#devserverport))

_**Note**: You will need to refresh the page to see any changes you make to the server code. Any changes to client code should reload automatically._

#### Server Only

You may need to build the client-side code first with:

```sh
npm run build:client
```

Then start the server with:

```sh
npm run watch:server
```

View in a browser at http://localhost:3040

_**Note**: You will need to refresh the page to see any changes you make to the server code. If you change the client code you will need to rebuild it with the first command mentioned in this subsection._

### Test

The unit tests are built using Jest. They can be run with the following command:

```sh
npm run test
```

### Lint

ESLint is used to validate the code. It can be run like this:

```sh
npm run lint
```

It can automatically fix problems for you:

```sh
npm run lint:fix
```

### Storybook

A good way to see components and test them in isolation is to run storybook:

```sh
npm run storybook
```

Stories are deployed on [GitHub pages](https://guardian.github.io/apps-rendering)

### Generating apps-rendering API models

> **Note**
> These models have moved! You can now find them, along with release instructions, at [`guardian/apps-rendering-api-models`](https://github.com/guardian/apps-rendering-api-models).

The `apps-rendering-api-models` are used to communicate with the Apps Rendering API. [`MAPI`](https://github.com/guardian/mobile-apps-api) constructs a `RenderingRequest` when it wants Apps Rendering to render an article. This includes all the information Apps Rendering requires to do the render. `RenderingRequest` and other associated types are all defined in `apps-rendering-api-models`.
