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

### Change preview article
You can preview an article from `theguardian.com` by appending the query string parameter `url` to your localhost article page. EG. `http://localhost:3003/frontend/Article?url=https://www.theguardian.com/world/2013/jun/09/edward-snowden-nsa-whistleblower-surveillance`

## Production
 - `make build` creates production-ready bundles.
 - `make start` starts the production server.
 - `make stop` stops the production server.

## Other tasks

### Code quality
- `make lint`
- `make tsc`
- `make test`

`make validate` runs all of the above, plus a final `make build`.

If you get lint errors, `make fix` will attempt to automatically fix them for you.

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

The following extensions will life easier:

- [tslint](https://marketplace.visualstudio.com/items?itemName=eg2.tslint) (esp. with `tslint.autoFixOnSave` enabled)

Also:

- [css-in-js syntax highlighting](https://marketplace.visualstudio.com/items?itemName=jpoissonnier.vscode-styled-components)
- [colour highlighting in JS](https://marketplace.visualstudio.com/items?itemName=naumovs.color-highlight)
