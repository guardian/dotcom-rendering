// ----- Imports ----- //

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import type { EmotionCritical } from '@emotion/server/create-instance';
import type { RenderingRequest } from '@guardian/apps-rendering-api-models/renderingRequest';
import { ArticleDesign, ArticleDisplay } from '@guardian/libs';
import type { ArticleFormat } from '@guardian/libs';
import { background, resets } from '@guardian/source-foundations';
import { map, none, some } from '../../vendor/@guardian/types/index';
import type { Option } from '../../vendor/@guardian/types/index';
import { getThirdPartyEmbeds, requiresInlineStyles } from 'capi';
import type { ThirdPartyEmbeds } from 'capi';
import { atomCss, atomScript } from 'components/InteractiveAtom';
import Layout from 'components/Layout';
import Meta from 'components/Meta';
import Scripts from 'components/Scripts';
import { fromCapi } from 'item';
import type { Item } from 'item';
import { JSDOM } from 'jsdom';
import { pipe } from 'lib';
import type { ReactElement } from 'react';
import { renderToString } from 'react-dom/server';
import { csp } from 'server/csp';
import { pageFonts } from 'styles';
import { insertNewsletterIntoItem } from '../newsletter';

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

const scriptName = ({ design, display }: ArticleFormat): Option<string> => {
	switch (design) {
		case ArticleDesign.Interactive:
			return display !== ArticleDisplay.Immersive
				? some('article.js')
				: none;
		default:
			return some('article.js');
	}
};

const styles = (format: ArticleFormat): string => `
    ${pageFonts}
	${resets.resetCSS}

    body {
        background: ${
			format.design === ArticleDesign.Gallery ||
			format.design === ArticleDesign.Audio ||
			format.design === ArticleDesign.Video ||
			format.design === ArticleDesign.Picture
				? background.inverse
				: 'white'
		};
        margin: 0;
        font-family: 'Guardian Text Egyptian Web';
        overflow-x: hidden;
        line-height: 1.4;
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
				<Layout item={item} />
			</CacheProvider>,
		),
	);

const buildHtml = (
	head: string,
	body: string,
	scripts: ReactElement,
	isBlog: boolean,
): string => {
	// Used when taking the reader to the top of the blog on toast click
	// or when linking to a specific block
	const smoothScrolling = isBlog ? 'style="scroll-behavior: smooth;"' : '';

	return `<!DOCTYPE html>
    <html lang="en" ${smoothScrolling}>
        <head>
            ${head}
        </head>
        <body>
            ${body}
            ${renderToString(scripts)}
        </body>
    </html>
`;
};

function render(
	imageSalt: string,
	request: RenderingRequest,
	getAssetLocation: (assetName: string) => string,
	page: Option<string>,
): Page {
	const item = pipe(
		fromCapi({ docParser, salt: imageSalt })(request, page),
		insertNewsletterIntoItem,
	);

	const clientScript = map(getAssetLocation)(scriptName(item));
	const thirdPartyEmbeds = getThirdPartyEmbeds(request.content);
	const body = renderBody(item, request);
	const inlineStyles = requiresInlineStyles(request);
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

	const isBlog =
		item.design === ArticleDesign.LiveBlog ||
		item.design === ArticleDesign.DeadBlog;

	return { html: buildHtml(head, body.html, scripts, isBlog), clientScript };
}

// ----- Export ----- //

export { render };
