import React from 'react';
import { extractCritical } from 'emotion-server';
import { renderToString } from 'react-dom/server';
import { CacheProvider } from '@emotion/core';
import { cache } from 'emotion';
import resetCSS from /* preval */ '@frontend/lib/reset-css';
import { getFontsCss } from '@frontend/lib/fonts-css';

interface RenderToStringResult {
    html: string;
    css: string;
}

export const document = ({
    linkedData,
    title,
    body,
    scripts,
}: {
    linkedData: object;
    title: string;
    body: React.ReactElement<any>;
    scripts: string[];
}) => {
    const { html, css }: RenderToStringResult = extractCritical(
        // TODO: CacheProvider can be removed when we've moved over to using @emotion/core
        renderToString(<CacheProvider value={cache}>{body}</CacheProvider>),
    );
    return `<!doctype html>
<html ⚡>
    <head>
    <meta charset="utf-8">
    <title>${title}</title>
    <link rel="canonical" href="self.html" />
    <meta name="viewport" content="width=device-width,minimum-scale=1">

    <script type="application/ld+json">
        ${JSON.stringify(linkedData)}
    </script>

    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <script async src="https://cdn.ampproject.org/v0.js"></script>

    <!-- AMP elements that are always required -->
    <script async custom-template="amp-mustache" src="https://cdn.ampproject.org/v0/amp-mustache-0.2.js"></script>
    <script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"></script>
    <script async custom-element="amp-accordion" src="https://cdn.ampproject.org/v0/amp-accordion-0.1.js"></script>
    <script async custom-element="amp-list" src="https://cdn.ampproject.org/v0/amp-list-0.1.js"></script>
    <script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"></script>
    <script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>

    <!-- AMP elements that are optional dependending on content -->
    ${scripts.join(' ')}

    <style amp-custom>${getFontsCss()}${resetCSS}${css}</style>
    </head>
    <body>
    ${html}
    </body>
</html>`;
};
