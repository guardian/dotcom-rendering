# ✋ NOT IN USE YET

> If you want to edit the _current_ webpack config, look in:
> [`../../scripts/webpack/webpack.config.js`](../../scripts/webpack/webpack.config.js).

This directory contains a proposed new webpack setup, that provides a
one-to-one relation between `./bundle.*.mjs` config files and `dist/bundle.*/*`
bundles.

The configs are not in use yet, and neither is the `../../webpack.config.js` file which
composes them.

They _are_ though all valid and ready to use.

You can try the setup out and build the configs by running this from `dotcom-rendering` app dir:

```shell
$ NODE_ENV=production yarn webpack --progress
```

There are also some tests that compare the current and proposed configs in `./.test.mjs`.

Run them by running this from `dotcom-rendering` app dir:

```sh
$ NODE_ENV=production node configs/webpack/.test.mjs
```
