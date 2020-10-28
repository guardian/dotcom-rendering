// ----- Imports ----- //

import React from 'react';
import { renderToString } from 'react-dom/server';
import { JSDOM } from 'jsdom';
import { RenderingRequest } from '@guardian/apps-rendering-api-models/renderingRequest';
import { none, Option } from '@guardian/types/option';

import { fromCapi } from 'item';
import Article from 'components/editions/article';
import { pageFonts } from 'styles';


// ----- Types ----- //

interface Page {
    html: string;
    clientScript: Option<string>;
}


// ----- Setup ----- //

const docParser = JSDOM.fragment.bind(null);


// ----- Functions ----- //

const renderHead = (request: RenderingRequest): string =>
    renderToString(
        <>
            <meta charSet="utf-8" />
            <title>{request.content.webTitle}</title>
            <meta name="viewport" content="initial-scale=1" />
        </>
    );

const styles = `
    ${pageFonts}

    body {
        margin: 0;
    }
`;

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

function render(
    imageSalt: string,
    request: RenderingRequest,
): Page {
    const item = fromCapi({ docParser, salt: imageSalt })(request);

    return {
        html: buildHtml(
            renderHead(request),
            renderToString(<Article item={item} />),
        ),
        clientScript: none,
    };
}


// ----- Exports ----- //

export {
    render,
};
