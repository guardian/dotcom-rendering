// ----- Imports ----- //

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import type { EmotionCritical } from '@emotion/server/create-instance';
import type { RenderingRequest } from '@guardian/apps-rendering-api-models/renderingRequest';
import { background } from '@guardian/src-foundations/palette';
import { Design, Display, map, none, some } from '@guardian/types';
import type { Format, Option } from '@guardian/types';
import { getThirdPartyEmbeds, requiresInlineStyles } from 'capi';
import type { ThirdPartyEmbeds } from 'capi';
import { atomCss, atomScript } from 'components/atoms/interactiveAtom';
import Body from 'components/body';
import Meta from 'components/meta';
import Scripts from 'components/scripts';
import { fromCapi } from 'item';
import type { Item } from 'item';
import { JSDOM } from 'jsdom';
import { createElement as h } from 'react';
import type { ReactElement } from 'react';
import { renderToString } from 'react-dom/server';
import { csp } from 'server/csp';
import { pageFonts } from 'styles';

// ----- Types ----- //

interface Page {
	html: string;
	clientScript: Option<string>;
}

// ----- Setup ----- //

const docParser = JSDOM.fragment.bind(null);

// ----- Functions ----- //

const scriptName = ({ design, display }: Format): Option<string> => {
	switch (design) {
		case Design.Live:
			return some('liveblog.js');
		case Design.Interactive:
			return display !== Display.Immersive ? some('article.js') : none;
		case Design.Comment:
		case Design.Feature:
		case Design.Analysis:
		case Design.Review:
		case Design.Article:
		case Design.Quiz:
			return some('article.js');
		case Design.Media:
			return some('media.js');
		default:
			return none;
	}
};

const shouldHideAds = (request: RenderingRequest): boolean =>
	request.content.fields?.shouldHideAdverts ?? false;

const styles = (format: Format): string => {
	const bg = format.design === Design.Media ? background.inverse : 'white';
	return `
        ${pageFonts}

    body {
        background: ${
			format.design === Design.Media ? background.inverse : 'white'
		};
        margin: 0;
        font-family: 'Guardian Text Egyptian Web';
        overflow-x: hidden;
        line-height: 1.5;
    }

    @media (prefers-color-scheme: dark) {
        body {
            background: ${bg};
            margin: 0;
            font-family: 'Guardian Text Egyptian Web';
            overflow-x: hidden;
            line-height: 1.5;
        }

        @media (prefers-color-scheme: dark) {
            body {
                background: transparent;
            }
        }
    `;
};

function renderHead(
	item: Item,
	request: RenderingRequest,
	thirdPartyEmbeds: ThirdPartyEmbeds,
	itemStyles: string,
	emotionIds: string[],
	inlineStyles: boolean,
): string {
	const generalStyles = styles(item);
	const cspString = csp(
		item,
		{
			scripts: [atomScript],
			styles: [generalStyles, itemStyles, atomCss],
		},
		thirdPartyEmbeds,
		inlineStyles,
	);
	const meta = h(Meta, { title: request.content.webTitle, cspString });

	return `
        ${renderToString(meta)}
        <link rel="stylesheet" type="text/css" href="/fontSize.css">
        <style>${generalStyles}</style>
        <style data-emotion-css="${emotionIds.join(' ')}">${itemStyles}</style>
        <script id="targeting-params" type="application/json">
            ${JSON.stringify(request.targetingParams)}
        </script>
    `;
}

const cache = createCache({ key: 'ar' });
const emotionServer = createEmotionServer(cache);

const renderBody = (item: Item, request: RenderingRequest): EmotionCritical =>
	emotionServer.extractCritical(
		renderToString(
			<CacheProvider value={cache}>
				<Body item={item} shouldHideAds={shouldHideAds(request)} />
			</CacheProvider>,
		),
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
	const clientScript = map(getAssetLocation)(scriptName(item));
	const thirdPartyEmbeds = getThirdPartyEmbeds(request.content);
	const body = renderBody(item, request);
	const inlineStyles = requiresInlineStyles(request.content);
	const head = renderHead(
		item,
		request,
		thirdPartyEmbeds,
		body.css,
		body.ids,
		inlineStyles,
	);
	const scripts = (
		<Scripts
			clientScript={clientScript}
			twitter={thirdPartyEmbeds.twitter}
		/>
	);

	return { html: buildHtml(head, body.html, scripts), clientScript };
}

// ----- Export ----- //

export { render };
