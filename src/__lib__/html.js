// @flow

import resetCSS from './reset-css';

export default ({
    title = 'The Guardian',
    css = '',
    cssIDs = '',
    html = '',
    jsApp = '/assets/javascript/app.browser.js',
    data = {},
    jsNonBlocking = '',
}: {
    title?: string,
    css: string,
    html: string,
    jsApp?: string,
    data?: {},
    jsNonBlocking?: string,
}) => `
    <!doctype html>
    <html>
        <head>
            <title>${title}</title>
            <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
            <link rel="stylesheet" href="/static/css/fonts.css" />
            <style>${resetCSS}${css}</style>
        </head>
        <body>
            <div id='app'>${html}</div>
            <script>
window.gu = ${JSON.stringify(
    {
        app: {
            data,
            cssIDs,
        },
    },
    null,
    2,
)};
            </script>
            <script src="${jsApp}"></script>
            <script>${jsNonBlocking}</script>
        </body>
    </html>
`;
