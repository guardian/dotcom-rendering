# Debug bookmarklet

> Your chance to to see the website through DCRs eyes!

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

Assets on assets.guim.co.uk are cached by fastly. To allow users to receive the latest version of this bookmarklet after an update,
you should log into the fastly dashboard and clear the cache!
