# Core development principles (lines in the sand)

## Our JavaScript [bundle size](https://github.com/guardian/dotcom-rendering/blob/master/package.json#L13-L19) will not exceed 120KB

[Alex Russell conducted analysis](https://infrequently.org/2017/10/can-you-afford-it-real-world-web-performance-budgets/) of real world JavaScript in 2017. He concludes that to ensure a time to interactive of <= 5 seconds on first load, sites should serve between 130KB and 170KB of JavaScript. Since we don't have direct control over the size of all JavaScript, we will keep our JavaScript bundles below 120KB (minified and gzipped).

## Scripts will not block rendering

Any script added to dotcom-rendering must must not block first paint or cause a dramatic repaint. Third party scripts should have an `async` or `defer` attribute, be loaded programmatically from within our application JavaScript, or be added at the bottom of the document body.
