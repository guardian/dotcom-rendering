import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import { resets } from '@guardian/source-foundations';
import he from 'he';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ConfigProvider } from '../components/ConfigContext';
import { epicChoiceCardCss } from '../components/Epic.amp';
import { stickyAdLabelCss } from '../components/StickyAd.amp';
import { getFontsCss } from '../lib/fonts-css';
import type { Config } from '../types/configContext';

interface RenderToStringResult {
	html: string;
	css: string;
}

interface Metadata {
	description: string;
	canonicalURL: string;
}

export const renderArticle = ({
	linkedData,
	title,
	body,
	scripts,
	metadata,
}: {
	linkedData: { [key: string]: any }[];
	title: string;
	body: React.ReactElement;
	scripts: string[];
	metadata: Metadata;
}) => {
	const key = 'dcr-amp';
	const cache = createCache({ key });
	// eslint-disable-next-line @typescript-eslint/unbound-method
	const { extractCritical } = createEmotionServer(cache);

	// We are currently considering AMP to be a renderingTarget of Web
	const config: Config = { renderingTarget: 'Web', darkModeAvailable: false };

	const { html, css }: RenderToStringResult = extractCritical(
		renderToStaticMarkup(
			<ConfigProvider value={config}>
				<CacheProvider value={cache}>{body}</CacheProvider>
			</ConfigProvider>,
		),
	);

	const favicon =
		process.env.NODE_ENV === 'production'
			? 'favicon-32x32.ico'
			: 'favicon-32x32-dev-yellow.ico';

	return `<!doctype html>
<html ⚡ lang="en">
    <head>
    <meta charset="utf-8">

    <!-- SEO related meta -->
    <title>${title}</title>
    <meta name="description" content="${he.encode(metadata.description)}" />

    <link rel="canonical" href="${metadata.canonicalURL}" />
    <meta name="viewport" content="width=device-width,minimum-scale=1">
    <link rel="icon" href="https://static.guim.co.uk/images/${favicon}">


    ${linkedData.reduce(
		(prev, ld) => `${prev}
<script type="application/ld+json">${JSON.stringify(ld)}</script>`,
		'',
	)}

    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <script async src="https://cdn.ampproject.org/v0.js"></script>

    <!-- AMP elements that are always required -->
    <script async custom-element="amp-experiment" src="https://cdn.ampproject.org/v0/amp-experiment-0.1.js"></script>
    <script async custom-template="amp-mustache" src="https://cdn.ampproject.org/v0/amp-mustache-0.2.js"></script>
    <script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"></script>
    <script async custom-element="amp-accordion" src="https://cdn.ampproject.org/v0/amp-accordion-0.1.js"></script>
    <script async custom-element="amp-list" src="https://cdn.ampproject.org/v0/amp-list-0.1.js"></script>
    <script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"></script>
    <script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
    <script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"></script>
    <script async custom-element="amp-geo" src="https://cdn.ampproject.org/v0/amp-geo-0.1.js"></script>
    <script async custom-element="amp-consent" src="https://cdn.ampproject.org/v0/amp-consent-0.1.js"></script>
	<script async custom-element="amp-sticky-ad" src="https://cdn.ampproject.org/v0/amp-sticky-ad-1.0.js"></script>
	<script async custom-element="amp-script" src="https://cdn.ampproject.org/v0/amp-script-0.1.js"></script>

    <!-- AMP element which is specific to the live blog -->
    <script async custom-element="amp-live-list" src="https://cdn.ampproject.org/v0/amp-live-list-0.1.js"></script>
    <script async custom-element="amp-audio" src="https://cdn.ampproject.org/v0/amp-audio-0.1.js"></script>

    <script async custom-element="amp-bind" src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"></script>
    <script async custom-element="amp-form" src="https://cdn.ampproject.org/v0/amp-form-0.1.js"></script>

    <!-- AMP elements that are optional dependending on content -->
    ${scripts.join(' ')}

    <style amp-custom>
        ${getFontsCss()}
        ${resets.resetCSS}
        ${css}
		${stickyAdLabelCss}
		${epicChoiceCardCss}
    </style>

    </head>
    <body>
    ${html}
    </body>
</html>`;
};
