# Debug bookmarklet

The DCR debug bookmarklet is a script designed to be executed from a bookmarklet which will annotate a DCR page with debug information.

Add the follow script string as the 'url' to your bookmark:

```js
javascript: (() => {
    document.body.appendChild(document.createElement('script')).src =
        'https://assets.guim.co.uk/assets/debug.js';
})();
```

## Running locally

If you need to run this locally, you can simply get it from the dev server:

```js
javascript: (() => {
    document.body.appendChild(document.createElement('script')).src =
        'http://localhost:3030/assets/debug.js';
})();
```

## After publishing

Assets on assets.guim.co.uk are cached by fastly - to allow users to receive the latest update of this bookmarklet,
you should log into the fastly dashboard and clear the cache!
