// ----- Imports ----- //

import { CacheProvider } from '@emotion/core';
import type { RenderingRequest } from '@guardian/apps-rendering-api-models/renderingRequest';
import type { Option } from '@guardian/types/option';
import { none } from '@guardian/types/option';
import Article from 'components/editions/article';
import type { EmotionCritical } from 'create-emotion-server';
import { cache } from 'emotion';
import { extractCritical } from 'emotion-server';
import type { Item } from 'item';
import { fromCapi } from 'item';
import { JSDOM } from 'jsdom';
import { compose } from 'lib';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { assetHashes } from 'server/csp';
import { pageFonts } from 'styles';

// ----- Types ----- //

interface Page {
	html: string;
	clientScript: Option<string>;
}

// ----- Setup ----- //

const docParser = JSDOM.fragment.bind(null);

// ----- Functions ----- //

const csp = (styles: string[]): string =>
	`
	default-src 'self';
	style-src ${assetHashes(styles)};
	img-src 'self' https://i.guim.co.uk;
	`.trim();

const styles = `
    ${pageFonts}

    body {
        margin: 0;
    }
`;

const renderHead = (
	request: RenderingRequest,
	emotionCritical: EmotionCritical,
): string =>
	renderToString(
		<>
			<meta charSet="utf-8" />
			<title>{request.content.webTitle}</title>
			<meta name="viewport" content="initial-scale=1" />
			<meta
				httpEquiv="Content-Security-Policy"
				content={csp([styles, emotionCritical.css])}
			/>
			<style data-emotion-css={emotionCritical.ids.join(' ')}>
				{emotionCritical.css}
			</style>
		</>,
	);

const renderBody = (item: Item): EmotionCritical =>
	compose(
		extractCritical,
		renderToString,
	)(
		<CacheProvider value={cache}>
			<Article item={item} />
		</CacheProvider>,
	);

const buildHtml = (head: string, body: string): string => `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            ${head}
            <style>${styles}</style>
        </head>
        <body>
            ${body}
        </body>
    </html>
`;

function render(imageSalt: string, request: RenderingRequest): Page {
	const item = fromCapi({ docParser, salt: imageSalt })(request);
	const body = renderBody(item);

	return {
		html: buildHtml(renderHead(request, body), body.html),
		clientScript: none,
	};
}

// ----- Exports ----- //

export { render };
