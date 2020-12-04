# Viewer Body Selector

## What is the contract?

We place the `article-body-viewer-selector` class on the container element for the article body.

## Where is it relied upon?

[Here](https://github.com/guardian/editorial-viewer/blob/714862c72d8070e18715f01b04a64f2fd2500ff2/public/javascript/components/viewer.js#L252) is where the viewer from composer selects links from the article body of preview articles.

## Why is it required?

Special behaviour is added to links in viewer to control whether or not the link opens in a new tab or within the iframe.
