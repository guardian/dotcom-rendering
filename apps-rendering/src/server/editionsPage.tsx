// ----- Imports ----- //

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import type { EmotionCritical } from '@emotion/server/create-instance';
import type { RenderingRequest } from '@guardian/apps-rendering-api-models/renderingRequest';
import type { ArticleTheme } from '@guardian/libs';
import { resets } from '@guardian/source-foundations';
import type { Option } from '../../vendor/@guardian/types/index';
import {
	map,
	none,
	some,
	withDefault,
} from '../../vendor/@guardian/types/index';
import { getThirdPartyEmbeds } from 'capi';
import type { ThirdPartyEmbeds } from 'capi';
import Layout from 'components/editions/layout';
import { atomCss, atomScript } from 'components/InteractiveAtom';
import Meta from 'components/Meta';
import Scripts from 'components/Scripts';
import type { Response } from 'express';
import type { Item } from 'item';
import { fromCapi } from 'item';
import { JSDOM } from 'jsdom';
import type { ReactElement } from 'react';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { csp } from 'server/csp';
import {
	editionsDevFonts as devFonts,
	editionsPreviewFonts as previewFonts,
	editionsPageFonts as prodFonts,
} from 'styles';
import { Stage } from './appIdentity';

// ----- Types ----- //

interface Page {
	html: string;
	clientScript: Option<string>;
}

enum EditionsEnv {
	Dev,
	Prod,
	Preview,
	Browser,
}

// ----- Setup ----- //

const docParser = JSDOM.fragment.bind(null);
const emotionCache = createCache({ key: 'ar' });
const emotionServer = createEmotionServer(emotionCache);

// ----- Functions ----- //

const stage = Stage === 'CODE' ? 'code' : 'prod';
const s3Path = `https://editions-published-${stage}.s3.eu-west-1.amazonaws.com`;

const getEditionsEnv = (isPreview: boolean, path?: string): EditionsEnv => {
	if (isPreview) {
		return EditionsEnv.Preview;
	} else if (process.env.NODE_ENV !== 'production') {
		return EditionsEnv.Dev;
	} else if (path === '/editions-article') {
		return EditionsEnv.Prod;
	} else {
		return EditionsEnv.Browser;
	}
};

const getFonts = (env: EditionsEnv): string => {
	switch (env) {
		case EditionsEnv.Prod:
			return prodFonts;
		case EditionsEnv.Preview:
			return previewFonts(s3Path);
		default:
			return devFonts;
	}
};

const getStyles = (fonts: string): string => `
	${fonts}
	${resets.resetCSS}

	html {
		margin: 0;
		height: 100%;
		min-height: 100%;
	}

	body {
		margin: 0;
	}
`;

function renderHead(
	item: Item,
	request: RenderingRequest,
	thirdPartyEmbeds: ThirdPartyEmbeds,
	itemStyles: string,
	emotionIds: string[],
	inlineStyles: boolean,
	enviroment: EditionsEnv,
): string {
	const fonts = getFonts(enviroment);
	const generalStyles = getStyles(fonts);
	const isEditions = true;
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
	const meta = h(Meta, {
		title: request.content.webTitle,
		cspString,
		isEditions: true,
	});

	return `
        ${renderToString(meta)}
        <style>${generalStyles}</style>
        <style data-emotion-css="${emotionIds.join(' ')}">${itemStyles}</style>
    `;
}

const renderBody = (item: Item): EmotionCritical =>
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
	res: Response,
	getAssetLocation: (assetName: string) => string,
	themeOverride: Option<ArticleTheme>,
): Page {
	const path = res.req.path;
	const isPreview = res.req.query.isPreview === 'true';
	const environment = getEditionsEnv(isPreview, path);
	const item = fromCapi({ docParser, salt: imageSalt, app: 'Editions' })(
		request,
		none,
	);

	const newItem = {
		...item,
		theme: withDefault(item.theme)(themeOverride),
	};

	const body = renderBody(newItem);
	const thirdPartyEmbeds = getThirdPartyEmbeds(request.content);

	const head = renderHead(
		item,
		request,
		thirdPartyEmbeds,
		body.css,
		body.ids,
		false,
		environment,
	);

	const devScript = map(getAssetLocation)(some('editions.js'));
	const prodScript = some('assets/js/editions.js');
	const previewScript = some(`${s3Path}/assets/js/editions.js`);

	const getClientScript = (env: EditionsEnv): Option<string> => {
		switch (env) {
			case EditionsEnv.Prod:
				return prodScript;
			case EditionsEnv.Preview:
				return previewScript;
			default:
				return devScript;
		}
	};

	const clientScript = getClientScript(environment);

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
