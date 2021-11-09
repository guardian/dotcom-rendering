// ----- Imports ----- //

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import type { EmotionCritical } from '@emotion/server/create-instance';
import type { RenderingRequest } from '@guardian/apps-rendering-api-models/renderingRequest';
import { background, resets } from '@guardian/source-foundations';
import { Design, Display, map, none, some } from '@guardian/types';
import type { Format, Option } from '@guardian/types';
import { getThirdPartyEmbeds, requiresInlineStyles } from 'capi';
import type { ThirdPartyEmbeds } from 'capi';
import { atomCss, atomScript } from 'components/interactiveAtom';
import Layout from 'components/layout';
import Meta from 'components/meta';
import Scripts from 'components/scripts';
import { fromCapi } from 'item';
import type { Item } from 'item';
import { JSDOM } from 'jsdom';
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
const emotionCache = createCache({ key: 'ar' });
const emotionServer = createEmotionServer(emotionCache);

// ----- Functions ----- //

const scriptName = ({ design, display }: Format): Option<string> => {
	switch (design) {
		case Design.LiveBlog:
			return some('liveblog.js');
		case Design.Interactive:
			return display !== Display.Immersive ? some('article.js') : none;
		case Design.Editorial:
		case Design.Letter:
		case Design.Comment:
		case Design.Feature:
		case Design.Analysis:
		case Design.Review:
		case Design.Article:
		case Design.Quiz:
		case Design.Media:
			return some('article.js');
		default:
			return none;
	}
};

const shouldHideAds = (request: RenderingRequest): boolean =>
	request.content.fields?.shouldHideAdverts ?? false;

const styles = (format: Format): string => `
    ${pageFonts}
	${resets.resetCSS}

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
            background: transparent;
        }
    }
`;

function renderHead(
	item: Item,
	request: RenderingRequest,
	thirdPartyEmbeds: ThirdPartyEmbeds,
	itemStyles: string,
	emotionIds: string[],
	inlineStyles: boolean,
): string {
	const generalStyles = styles(item);
	const isEditions = false;
	const cspString = csp(
		item,
		{
			scripts: [atomScript],
			styles: [generalStyles, itemStyles, atomCss],
		},
		thirdPartyEmbeds,
		inlineStyles,
		isEditions,
	);
	const meta = (
		<Meta title={request.content.webTitle} cspString={cspString} />
	);

	return `
        ${renderToString(meta)}
        <style>${generalStyles}</style>
        <style data-emotion-css="${emotionIds.join(' ')}">${itemStyles}</style>
        <link rel="stylesheet" type="text/css" href="/fontSize.css">
        <script id="targeting-params" type="application/json">
            ${JSON.stringify(request.targetingParams)}
        </script>
    `;
}

const renderBody = (item: Item, request: RenderingRequest): EmotionCritical =>
	emotionServer.extractCritical(
		renderToString(
			<CacheProvider value={emotionCache}>
				<Layout item={item} shouldHideAds={shouldHideAds(request)} />
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
