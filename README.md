# guui [![Build Status](https://travis-ci.org/guardian/guui.svg?branch=master)](https://travis-ci.org/guardian/guui)

Frontend rendering framework for theguardian.com. It uses [react](https://reactjs.org/) and [styletron](https://github.com/rtsao/styletron).

Slack channel: [#dotcom-future](https://theguardian.slack.com/messages/C0JES5PEV)

## Requirements
- [node](https://nodejs.org/en/)
  - check the [.nvmrc](https://github.com/guardian/guui/blob/master/.nvmrc) for the current supported version
  - [nvm](https://github.com/creationix/nvm) is probably your best bet here, especially with [this](https://gist.github.com/sndrs/5940e9e8a3f506b287233ed65365befb)
- [yarn](https://yarnpkg.com/en/docs/install)

## Develop
`make dev`

## Build
`make build`

## Code quality
- `make lint`
- `make flow`
- `make test`

`make validate` runs all of the above, plus a final `make build`.

## Other
See [the makefile](https://github.com/guardian/guui/blob/master/makefile) for the full list.

## IDE setup

### VSCode
We use [babel-plugin-module-resolver](https://github.com/tleunen/babel-plugin-module-resolver) to allow us to import things cleanly. If you're using VSCode, adding the following to a `./jsconfig.json` file will help it resolve modules usefully:

```json
{
    "compilerOptions": {
        "baseUrl": "src/",
    }
}
```

The following extensions may also make life a bit easier:

- [css-in-js autocomplete/conversion](https://marketplace.visualstudio.com/items?itemName=paulmolluzzo.convert-css-in-js)
- [colour highlighting in JS](https://marketplace.visualstudio.com/items?itemName=naumovs.color-highlight)
