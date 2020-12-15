// ----- Imports ----- //

import { CacheProvider } from '@emotion/core';
import type { RenderingRequest } from '@guardian/apps-rendering-api-models/renderingRequest';
import type { Option } from '@guardian/types';
import { none } from '@guardian/types';
import { getThirdPartyEmbeds, requiresInlineStyles } from 'capi';
import type { ThirdPartyEmbeds } from 'capi';
import Article from 'components/editions/article';
import type { EmotionCritical } from 'create-emotion-server';
import { cache } from 'emotion';
import { extractCritical } from 'emotion-server';
import type { Item } from 'item';
import { fromCapi } from 'item';
import { JSDOM } from 'jsdom';
import { compose } from 'lib';
import { renderToString } from 'react-dom/server';
import { buildCsp } from 'server/csp';
import { pageFonts } from 'styles';

// ----- Types ----- //

interface Page {
	html: string;
	clientScript: Option<string>;
}

// ----- Setup ----- //

const docParser = JSDOM.fragment.bind(null);

// ----- Functions ----- //

const styles = `
    ${pageFonts}

    body {
        margin: 0;
    }
`;

const renderHead = (
	request: RenderingRequest,
	thirdPartyEmbeds: ThirdPartyEmbeds,
	itemStyles: string,
	emotionIds: string[],
	inlineStyles: boolean,
): string => {
	const generalStyles = styles;
	const cspString = buildCsp(
		{
			scripts: [],
			styles: [generalStyles, itemStyles],
		},
		thirdPartyEmbeds,
		inlineStyles,
	);

	return `
		<meta charSet="utf-8" />
		<title>${request.content.webTitle}</title>
		<meta name="viewport" content="initial-scale=1" />
		<meta http-equiv="Content-Security-Policy" content="${cspString}" />
        <style>${generalStyles}</style>
        <style data-emotion-css="${emotionIds.join(' ')}">${itemStyles}</style>
    `;
};

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
	const head = renderHead(
		request,
		getThirdPartyEmbeds(request.content),
		body.css,
		body.ids,
		requiresInlineStyles(request.content),
	);

	return {
		html: buildHtml(head, body.html),
		clientScript: none,
	};
}

// ----- Exports ----- //

export { render };
