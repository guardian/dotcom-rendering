# Three Javascript Experiences

## Status

_Pending_

## Context

[See RFC](https://docs.google.com/document/d/1Fhu_g4Q9-a18jWftnGt1n6Scn8x88X-7jX2Ygr8LJrk/edit)

As of 27 May 2022, Internet Explorer 11 (IE11) is no longer officially supported.
The Client Side Tooling & Infrastructure team has recommended dropping features targeting only IE11.
As much as 1% of web users either don’t have Javascript (JS) enabled or fail to execute it properly,
according to a 2013 study by the GDS. As our readers are using a multitude of different browsers,
defining expectations for readers without a modern browser would be beneficial.

Currently, we have a few strategies for serving JS, via distinct build processes, on www.theguardian.com:
- [The DCR modern bundle](https://github.com/guardian/dotcom-rendering/blob/88284f57956f1f021255800fb725d889bae8b44e/dotcom-rendering/scripts/webpack/webpack.config.browser.js#L17-L114),
  for browsers, that natively support ES modules
- [The DCR legacy bundle](https://github.com/guardian/dotcom-rendering/blob/88284f57956f1f021255800fb725d889bae8b44e/dotcom-rendering/scripts/webpack/webpack.config.browser.js#L17-L114),
  for browsers that don’t support modern features
- [The Commercial bundle](https://github.com/guardian/frontend/blob/70ee8608928e132d409188ce010ab4260f954c56/webpack.config.commercial.prod.js#L9-L32),
  served to all browsers with JS enabled
- [A PolyfillIO bundle](https://github.com/guardian/dotcom-rendering/blob/88284f57956f1f021255800fb725d889bae8b44e/dotcom-rendering/src/web/server/articleToHtml.tsx#L102-L103),
  which does browser sniffing to partially polyfill
- Several inline scripts served to all readers:
  - [Monkey-patching window.performance](https://github.com/guardian/dotcom-rendering/blob/88284f57956f1f021255800fb725d889bae8b44e/dotcom-rendering/src/web/server/articleTemplate.ts#L208-L214)
  - [Setting the Ophan pageViewId](https://github.com/guardian/dotcom-rendering/blob/88284f57956f1f021255800fb725d889bae8b44e/dotcom-rendering/src/web/server/articleTemplate.ts#L216-L239)
  - [Setting the Ophan browserId](https://github.com/guardian/dotcom-rendering/blob/88284f57956f1f021255800fb725d889bae8b44e/dotcom-rendering/src/web/server/articleTemplate.ts#L241-L264)
  - [Initialise Twitter if they are embeds on the page](https://github.com/guardian/dotcom-rendering/blob/88284f57956f1f021255800fb725d889bae8b44e/dotcom-rendering/src/web/server/articleTemplate.ts#L274-L276)
  - [Nav script to improve accessibility](https://github.com/guardian/dotcom-rendering/blob/88284f57956f1f021255800fb725d889bae8b44e/dotcom-rendering/src/web/components/Nav/Nav.tsx#L84-L160)
  - [Column script to improve accessibility](https://github.com/guardian/dotcom-rendering/blob/88284f57956f1f021255800fb725d889bae8b44e/dotcom-rendering/src/web/components/Nav/ExpandedMenu/Column.tsx#L207-L223)

For users without JS, we add the following:
- [The ComScore tracking image](https://github.com/guardian/dotcom-rendering/blob/88284f57956f1f021255800fb725d889bae8b44e/dotcom-rendering/src/web/server/articleTemplate.ts#L279-L283)

Resources are better spent improving the experience of readers with no JS than readers with outdated JavaScript. 


## Decision

Define three distinct JS experiences that help us clarify use cases.
- **Default JavaScript**:readers that are using modern browsers, which natively support ES modules, are served our JavaScript bundle
- **Essential Javascript**: readers on legacy browsers, which do not not support ES Modules natively, are no longer served a full parity bundle.
- **Zero JavaScript**: readers on browsers without JavaScript get no interactivity.

| Feature         | Default JavaScript | Essential JavaScript | Zero Javascript |
|-----------------|--------------------|----------------------|-----------------|
| `atomIframe`    | Yes                | No                   | No              |
| `bootCmp`       | Yes                | No                   | No              |
| `debug`         | Yes                | No                   | No              |
| `dynamicImport` | Yes                | No                   | No              |
| `embedIframe`   | Yes                | No                   | No              |
| `ga`            | Yes                | No                   | No              |
| `initDiscussion`| Yes                | No                   | No              |
| `islands`       | Yes                | No                   | No              |
| `newsletterEmbedIframe`| Yes         | No                   | No              |
| Ophan           | Yes `ophan/init`   | Basic `ophan.ng.js`  | No              |
| `relativeTime`  | Yes                | No                   | No              |
| `sentryLoader`  | Yes                | No                   | No              |


