# Only serve JavaScript ES Modules

## Context

As of June 2022, [the Guardian’s website no longer supports IE11][recommended-browsers].

[recommended-browsers]: https://www.theguardian.com/help/recommended-browsers
[cut the mustard]: ../principles/browser-support.md#cutting-the-mustard

DCR currently build two JavaScript bundles:

1. for modern browsers, that [natively support ES modules](https://caniuse.com/es6-module)
2. for legacy browsers, that don’t support modern features

Resources are better spent improving the experience of readers with
no JavaScript than readers with outdated JavaScript.

## Decision

Stop serving our legacy JavaScript bundle to readers whose browser do not [cut the mustard][].

Only serve our modern JavaScript bundle to modern browsers that natively support ES Modules:

-   Google Chrome 61+
-   Mozilla Firefox 60+
-   Microsoft Edge 16+
-   Apple Safari 10.1+
-   Apple iOS Safari 10.3+
-   Opera 48+

Still serve minimal JavaScript which is necessary to improve accessibility.

By doing so, we can better focus on:

-   optimising our bundle for modern browsers
-   favour a `noscript` experience over a heavily polyfilled one

## Status

Approved
