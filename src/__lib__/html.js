// @flow

import resetCSS from './reset-css';
import hashedAsset from './asset-path';

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
    const bundle = hashedAsset(`${data.page.toLowerCase()}.js`);
    const vendor = hashedAsset('vendor.js');

    return `
    <!doctype html>
    <html>
        <head>
            <title>${title}</title>
            <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
            <link rel="preload" href="${vendor}" as="script">
            <link rel="preload" href="${bundle}" as="script">
            <link rel="stylesheet" href="/static/css/fonts.css" media="nope!" onload="this.media='all'">
            <style>${resetCSS}${css}</style>
        </head>
        <body>
            <div id='app'>${html}</div>
            <script>
            window.gu = ${JSON.stringify({
                app: {
                    data,
                    cssIDs,
                },
            })};
            </script>
            <script src="${vendor}"></script>
            <script src="${bundle}"></script>
            <script>${jsNonBlocking}</script>
        </body>
    </html>
`;
};
