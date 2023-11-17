## apps-rendering

### Install

1. Clone the repo, then CD into the `apps-rendering` subdirectory before running any commands -
2. Make sure you're using the version of Node specified in [`.nvmrc`](/.nvmrc)
3. Install dependencies:

```sh
yarn
```

### Run (Development)

**Before you start** get `mobile` Janus credentials (ask someone if you're unsure what this means)

#### Everything

This is the simplest way to get started, but will intermingle all the logs together in one shell. If you're doing development work it might be easier to run the client and server in separate shells as described in the next subsection.

```sh
yarn watch
```

View in a browser at http://localhost:3030.

The Apps Rendering development server supports the following routes for testing
articles in the browser:

-   `/path/to/content`
    -   e.g [http://localhost:3030/food/2020/mar/15/easter-taste-test-dan-lepard-hot-cross-bun-milk-dark-chocolate-mini-eggs-bunny-sloth](http://localhost:3030/food/2020/mar/15/easter-taste-test-dan-lepard-hot-cross-bun-milk-dark-chocolate-mini-eggs-bunny-sloth)
-   `/(uk|us|au|international)/path/to/content`
    -   e.g [http://localhost:3030/au/food/2020/mar/15/easter-taste-test-dan-lepard-hot-cross-bun-milk-dark-chocolate-mini-eggs-bunny-sloth](http://localhost:3030/au/food/2020/mar/15/easter-taste-test-dan-lepard-hot-cross-bun-milk-dark-chocolate-mini-eggs-bunny-sloth)
-   `/rendered-items/path/to/content`
    -   e.g [http://localhost:3030/rendered-items/food/2020/mar/15/easter-taste-test-dan-lepard-hot-cross-bun-milk-dark-chocolate-mini-eggs-bunny-sloth](http://localhost:3030/rendered-items/food/2020/mar/15/easter-taste-test-dan-lepard-hot-cross-bun-milk-dark-chocolate-mini-eggs-bunny-sloth)
-   `/(uk|us|au|international)/rendered-items/path/to/content`
    -   e.g [http://localhost:3030/au/rendered-items/food/2020/mar/15/easter-taste-test-dan-lepard-hot-cross-bun-milk-dark-chocolate-mini-eggs-bunny-sloth](http://localhost:3030/au/rendered-items/food/2020/mar/15/easter-taste-test-dan-lepard-hot-cross-bun-milk-dark-chocolate-mini-eggs-bunny-sloth)

Additionally, each route above can take a `?editions` query parameter to render
the article as for the Editions app.

We also recommend testing articles in the mobile device simulators.
The development server also supports a specific route for testing with the
device simulator:

-   `/AppsArticle/https://www.theguardian.com/food/2020/mar/15/easter-taste-test-dan-lepard-hot-cross-bun-milk-dark-chocolate-mini-eggs-bunny-sloth`
    -   e.g [http://localhost:3030/AppsArticle/https://www.theguardian.com/food/2020/mar/15/easter-taste-test-dan-lepard-hot-cross-bun-milk-dark-chocolate-mini-eggs-bunny-sloth](http://localhost:3030/AppsArticle/https://www.theguardian.com/food/2020/mar/15/easter-taste-test-dan-lepard-hot-cross-bun-milk-dark-chocolate-mini-eggs-bunny-sloth)

This route matches the one implemented by DCR for rendering apps articles.

_**Note**: You will need to refresh the page to see any changes you make to the server code. Any changes to client code should reload automatically._

#### Client and Server In Separate Shells

This will output each command's logs to different shells, which can make development easier.

To start the server:

```sh
yarn watch:server
```

To start the client:

```sh
yarn watch:client
```

View in a browser at http://localhost:3030

_**Note**: You will need to refresh the page to see any changes you make to the server code. Any changes to client code should reload automatically._

#### Server Only

You may need to build the client-side code first with:

```sh
yarn build:client
```

Then start the server with:

```sh
yarn watch:server
```

View in a browser at http://localhost:3040

_**Note**: You will need to refresh the page to see any changes you make to the server code. If you change the client code you will need to rebuild it with the first command mentioned in this subsection._

### Test

The unit tests are built using Jest. They can be run with the following command:

```sh
yarn test
```

### Lint

ESLint is used to validate the code. It can be run like this:

```sh
yarn lint
```

It can automatically fix problems for you:

```sh
yarn lint:fix
```

### Storybook

A good way to see components and test them in isolation is to run storybook:

```sh
yarn storybook
```

Stories are deployed on [GitHub pages](https://guardian.github.io/apps-rendering)

### Generating `apps-rendering-api-models`

> **Note**
> These models have moved! You can now find them, along with release instructions, at [`guardian/apps-rendering-api-models`](https://github.com/guardian/apps-rendering-api-models).

[`MAPI`](https://github.com/guardian/mobile-apps-api) uses `apps-rendering-api-models` to communicate with the Apps Rendering API. To render an article, MAPI sends a `RenderingRequest` to Apps Rendering. The `RenderingRequest` includes all the information Apps Rendering requires for rendering. `RenderingRequest` and other associated models are defined in `apps-rendering-api-models`.
