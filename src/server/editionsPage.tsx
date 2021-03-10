// ----- Imports ----- //

import { cache } from '@emotion/css';
import { CacheProvider } from '@emotion/react';
import { extractCritical } from '@emotion/server';
import type { EmotionCritical } from '@emotion/server/create-instance';
import type { RenderingRequest } from '@guardian/apps-rendering-api-models/renderingRequest';
import type { Option } from '@guardian/types';
import { map, none, some } from '@guardian/types';
import { getThirdPartyEmbeds } from 'capi';
import type { ThirdPartyEmbeds } from 'capi';
import Article from 'components/editions/article';
import Scripts from 'components/scripts';
import type { Item } from 'item';
import { fromCapi } from 'item';
import { JSDOM } from 'jsdom';
import { compose } from 'lib';
import type { ReactElement } from 'react';
import { renderToString } from 'react-dom/server';
import { cspEditions } from 'server/csp';
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
	html {
		height: 100%;
	}
    body {
		margin: 0;
		height: 100%;
		min-height: 100%;
    }
`;

const renderHead = (
	request: RenderingRequest,
	thirdPartyEmbeds: ThirdPartyEmbeds,
	itemStyles: string,
	emotionIds: string[],
): string => {
	const cspString = cspEditions(
		{ scripts: [], styles: [styles, itemStyles] },
		thirdPartyEmbeds,
	);

	return `
		<meta charSet="utf-8" />
		<title>${request.content.webTitle}</title>
		<meta name="viewport" content="initial-scale=1" />
		<meta http-equiv="Content-Security-Policy" content="${cspString}" />
        <style>${styles}</style>
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

const buildHtml = (
	head: string,
	body: string,
	scripts: ReactElement,
): string => `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            ${head}
            <style>${styles}</style>
        </head>
        <body>
			${body}
			${renderToString(scripts)}
        </body>
    </html>
`;

function render(
	imageSalt: string,
	request: RenderingRequest,
	getAssetLocation: (assetName: string) => string,
): Page {
	const item = fromCapi({ docParser, salt: imageSalt })(request);
	const body = renderBody(item);
	const thirdPartyEmbeds = getThirdPartyEmbeds(request.content);
	const head = renderHead(request, thirdPartyEmbeds, body.css, body.ids);

	const clientScript = map(getAssetLocation)(some('editions.js'));

	const scripts = (
		<Scripts
			clientScript={clientScript}
			twitter={thirdPartyEmbeds.twitter}
		/>
	);

	return {
		html: buildHtml(head, body.html, scripts),
		clientScript: none,
	};
}

// ----- Exports ----- //

export { render };
