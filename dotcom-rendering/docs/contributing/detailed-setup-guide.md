# Detailed setup guide

## High level diagram

This high level diagram shows the difference between the data flow when DCR is used in production, driven by the frontend backend, and when DCR is used as a local server. The arrows are labelled in the order they happen. The bold arrow is the JSON data object that DCR uses to generate the HTML document.

![](detailed-setup-guide-pics/high-level-diagram.png)

## Developing

## Getting started

To download the repository

```
$ git clone git@github.com:guardian/dotcom-rendering.git
$ cd dotcom-rendering
```

### Node.js

Make sure you have [Node.js](https://nodejs.org) installed.

We recommend using [fnm](https://github.com/Schniz/fnm) to help manage multiple versions of Node.js on on machine.

### Install Dependencies

run

```
$ make install
```

If it complains that you do not have the right version of node, then run (or replace with the correct version manager or the correct version):

```
$ fnm install 22.14.0
```

### Running on local

```sh
$ make dev
```

This will start the development server on port 3030: [http://localhost:3030](http://localhost:3030).

Note: To run the development server with support for legacy browsers, use `make dev-legacy`

### Previewing article on local

You can preview an article from `theguardian.com` by appending the full URL to the path of your localhost article page. For example:

http://localhost:3030/Article/https://www.theguardian.com/world/2013/jun/09/edward-snowden-nsa-whistleblower-surveillance

You can use this technique to integrate with a locally running instance of `frontend`. This is especially useful for testing changes to the data model:

http://localhost:3030/Article/http://localhost:9000/world/2013/jun/09/edward-snowden-nsa-whistleblower-surveillance

### Previewing AMP on local

You can preview an AMP page similarly to an article, as follows

http://localhost:3030/AMPArticle/https://amp.theguardian.com/world/2013/jun/09/edward-snowden-nsa-whistleblower-surveillance

or, connecting to a locally running instance of frontend,

http://localhost:3030/AMPArticle/http://localhost:9000/world/2013/jun/09/edward-snowden-nsa-whistleblower-surveillance

### Note on rebasing vs merging

The dotcom-rendering github account is set up to merge PRs into main instead of rebase. Merge commits are useful to quickly revert things when there is a major incident - whereas with rebase you might have to revert a whole load of commits.

However, if you are working on a feature branch and plan to make a PR, it's still recommended to rebase on `main` to avoid extraneous merge commits in branches.

### Debugging tools

For ease of development you may want to install:

-   [React Developer Tools](https://github.com/facebook/react-devtools)

### Running alongside identity/sign in

You may want to develop against signed in behaviour in `dotcom-rendering`.
In order for this to work you have to run `dotcom-rendering` on a local domain with `https`.

To set this up this:

1. Run `./scripts/nginx/setup.sh`

    - This will create a local domain `r.thegulocal.com` and set up a reverse proxy to `localhost:3030` with a valid SSL certificate.

2. `dotcom-rendering` can now be accessed through https://r.thegulocal.com when running the development server
3. Sign in to https://profile.code.dev-theguardian.com/ on a separate tab/window

    - Third party cookies must be enabled in your browser for this to work

4. Back on `dotcom-rendering` under https://r.thegulocal.com set a cookie with the name `GU_U` with any value on the `r.thegulocal.com` domain and refresh the page
5. You should now be signed in!

    - You should see the header change to show `My Account` instead of `Sign in`
    - In local storage you should see a key `gu.access_token` and `gu.id_token` with the values of the tokens you are signed in with

## Production

-   `make build` creates production-ready bundles.
-   `make prod` starts the production server.

More scripts can be found in the `makefile` prod section [scripts](https://github.com/guardian/dotcom-rendering/blob/main/makefile)

The production port default is 9000 for deployment, but to run locally alongside frontend, you will need to manually override. To hit the server, add

```
rendering.endpoint = "http://localhost:${port}/Article"
```

with the override port number to [`frontend.conf`](https://github.com/guardian/frontend/blob/main/docs/03-dev-howtos/14-override-default-configuration.md) and run frontend locally.

## Environment Variables

| Name                          | Description                                                                                                                                    |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `HOSTNAME`                    | Defaults to `localhost`. If running behind a reverse proxy (Github Codespaces / Ngrok) this needs to be set to the hostname used to access DCR |
| `NODE_ENV`                    | `production` or `development`. Toggles features such as hot reloading, compression, localhost access, etc                                      |
| `GU_STAGE`                    | `PROD` or `DEV`. Typically used to decide if DCR should call Production downstream API's or CODE downstream API's                              |
| `GU_PUBLIC`                   | Any value, undefined will disable. Toggles serving assets on the `/assets/` endpoint                                                           |
| `DISABLE_LOGGING_AND_METRICS` | Boolean. Toggle for enabling Log4js                                                                                                            |

Most of these variables are set by our make scripts and you don't need to worry about setting them.
