// @flow

import { keyRegister } from './CapiComponent';
import resetCSS from './reset-css';
import { hashedPath, staticPath } from './asset-path';

export default ({
    title = 'The Guardian',
    css = '',
    cssIDs = '',
    html = '',
    data = {},
    jsNonBlocking = '',
}: {
    title?: string,
    css: string,
    html: string,
    data?: {},
    jsNonBlocking?: string,
}) => {
    const bundle = hashedPath('javascript', `${data.page}.js`);
    const vendor = hashedPath('javascript', 'vendor.js');
    const fonts = staticPath('css', 'fonts.css');
    const sanitiseDomRefs = jsString =>
        jsString.replace(/"(document.*?innerHTML)"/g, '$1');
    return `
    <!doctype html>
    <html>
        <head>
            <title>${title}</title>
            <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
            <link rel="preload" href="${vendor}" as="script">
            <link rel="preload" href="${bundle}" as="script">
            <link rel="stylesheet" href="${fonts}" media="nope!" onload="this.media='all'">
            <style>${resetCSS}${css}</style>
        </head>
        <body>
            <div id='app'>${html}</div>
            <script>
            window.gu = ${sanitiseDomRefs(
                JSON.stringify({
                    app: {
                        data: {
                            ...data,
                            content: {
                                ...Object.keys(data.content).reduce(
                                    (acc, key) => {
                                        if (keyRegister.has(key)) {
                                            acc[
                                                key
                                            ] = `document.querySelector('[data-capi-key=${key}]').innerHTML`;
                                        } else {
                                            acc[key] = data.content[key];
                                        }

                                        return acc;
                                    },
                                    {},
                                ),
                            },
                        },
                        cssIDs,
                    },
                }),
            )};
            </script>
            <script src="${vendor}"></script>
            <script src="${bundle}"></script>
            <script>${jsNonBlocking}</script>
        </body>
    </html>
`;
};
