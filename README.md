## apps-rendering

### Install

1. Clone the repo
2. Make sure you're using Node 12 (specific version found in `.nvmrc`)
3. Install dependencies:

```sh
npm install
```

### Run (Development)

1. Get `mobile` Janus credentials (ask someone if you're unsure what this means)
2. Run in watch mode:

```sh
npm run watch:server
```

3. View in a browser at http://localhost:3040

_**Note**: You will need to refresh the page to see any changes you make._

### Test

The unit tests are built using Jest. They can be run with the following command:

```sh
npm run test:run
```

### Lint

ESLint is used to validate the code. It can be run like this:

```sh
npm run lint
```
