// ----- Imports ----- //

import { cache } from '@emotion/css';
import { CacheProvider } from '@emotion/react';
import { extractCritical } from '@emotion/server';
import type { EmotionCritical } from '@emotion/server/create-instance';
import type { RenderingRequest } from '@guardian/apps-rendering-api-models/renderingRequest';
import type { Option, Theme } from '@guardian/types';
import { map, none, some, withDefault } from '@guardian/types';
import { getThirdPartyEmbeds } from 'capi';
import type { ThirdPartyEmbeds } from 'capi';
import { atomCss, atomScript } from 'components/atoms/interactiveAtom';
import Article from 'components/editions/article';
import Meta from 'components/meta';
import Scripts from 'components/scripts';
import type { Response } from 'express';
import type { Item } from 'item';
import { fromCapi } from 'item';
import { JSDOM } from 'jsdom';
import { compose } from 'lib';
import type { ReactElement } from 'react';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { csp } from 'server/csp';
import { editionsPageFonts, pageFonts } from 'styles';

// ----- Types ----- //

interface Page {
	html: string;
	clientScript: Option<string>;
}

enum EditionsEnv {
	Dev,
	Prod,
	Browser,
}

// ----- Setup ----- //

const docParser = JSDOM.fragment.bind(null);

// ----- Functions ----- //

const getEditionsEnv = (path?: string): EditionsEnv => {
	if (process.env.NODE_ENV !== 'production') {
		return EditionsEnv.Dev;
	} else if (path === '/editions-article') {
		return EditionsEnv.Prod;
	} else {
		return EditionsEnv.Browser;
	}
};

const getStyles = (env: EditionsEnv): string => `
	${env === EditionsEnv.Prod ? editionsPageFonts : pageFonts}

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
	const generalStyles = getStyles(enviroment);
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
	const meta = h(Meta, { title: request.content.webTitle, cspString });

	return `
        ${renderToString(meta)}
        <style>${generalStyles}</style>
        <style data-emotion-css="${emotionIds.join(' ')}">${itemStyles}</style>
    `;
}

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
	themeOverride: Option<Theme>,
): Page {
	const path = res.req?.path;

	const environment = getEditionsEnv(path);

	const item = fromCapi({ docParser, salt: imageSalt })(request);

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

	const clientScript =
		environment !== EditionsEnv.Prod
			? map(getAssetLocation)(some('editions.js'))
			: some('assets/js/editions.js');

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
