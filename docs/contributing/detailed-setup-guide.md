# Detailed setup guide

- [Chat](#chat)
- [Developing](#developing)
- [Production](#production)
- [Other tasks](#other-tasks)
- [IDE setup](#ide-setup)

## Chat

Check out the [Digital/dotcom-rendering](https://chat.google.com/room/AAAA6yBswlI) channel on Chat. If you haven't already done so already, please ask the Dotcom Platform team for an invite.

## Developing

### Setup

The only thing you need to make sure you have installed before you get going is Node.

We recommend [nvm](https://github.com/creationix/nvm) (especially combined with [this handy gist](https://gist.github.com/sndrs/5940e9e8a3f506b287233ed65365befb)). It is great at managing multiple versions of Node.js on one machine.

If you prefer to [install Node.js manually](https://nodejs.org),
check the [.nvmrc](https://github.com/guardian/dotcom-rendering/blob/master/.nvmrc) for the current required version.

That's it – everything else should be installed for you on demand.

### Start

Start the development server:

```
$ make dev
```

This will start the development server on port 3030: [http://localhost:3030](http://localhost:3030).

### Running alongside identity

You may want local identity cookies to be available in `dotcom-rendering`. To enable this:

1. Add `127.0.0.1 r.thegulocal.com` to the end of your `/etc/hosts` file
2. Follow the installation steps in [`identity-platform/nginx`](https://github.com/guardian/identity-platform/tree/master/nginx)
3. run `./scripts/nginx/setup.sh`
4. access `dotcom-rendering` through https://r.thegulocal.com

### Previewing article on local

You can preview an article from `theguardian.com` by appending the query string parameter `url` to your localhost article page. For example:

```
http://localhost:3030/Article?url=https://www.theguardian.com/world/2013/jun/09/edward-snowden-nsa-whistleblower-surveillance
```

You can use this technique to integrate with a locally running instance of `frontend`. This is especially useful for testing changes to the data model:

```
http://localhost:3030/Article?url=http://localhost:9000/world/2013/jun/09/edward-snowden-nsa-whistleblower-surveillance
```

### Previewing AMP on local

You can preview an AMP page similarly to an article, as follows

```
http://localhost:3030/AMPArticle?url=https://amp.theguardian.com/world/2013/jun/09/edward-snowden-nsa-whistleblower-surveillance
```

### Debugging tools

For ease of development you may want to install:

- [React Developer Tools](https://github.com/facebook/react-devtools)

## Production

- `make build` creates production-ready bundles.
- `make start` starts the production server.
- `make stop` stops the production server.

## Other tasks

### Code quality

```
$ make lint
$ make tsc
$ make test
```

`make validate` runs all of the above, plus a final `make build`.

If you get lint errors, `make fix` will attempt to automatically fix them for you.

See [the makefile](https://github.com/guardian/dotcom-rendering/blob/master/makefile) for the full list.

## IDE setup

We recommend using the [VSCode](https://code.visualstudio.com/) IDE. VSCode includes built in TypeScript language support and has a rich library of extensions which let you add formatters, debuggers and tools to your installation to support your development workflow.

### Extensions

Recommended VSCode extensions are listed in `.vscode/extensions.json` and VSCode should prompt you to install these when you open the project. You can also find these extensions by searching for `@recommended` in the extensions pane.

### Auto fix on save

We recommend you update your workspace settings to automatically fix formatting errors on save:

1. Open the Command Palette (`shift + cmd + P`) and type `Preferences: Open Workspace Settings`
2. Search for `tslint.autoFixOnSave`
3. Update your `settings.json` with:

```json
    "tslint.autoFixOnSave": true,
```

