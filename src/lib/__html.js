// @flow

import resetCSS from './__reset-css';
import fonts from './__fonts';

export default ({
    title = 'The Guardian',
    css = '',
    cssIDs = '',
    html = '',
    jsApp = '/assets/javascript/app.browser.js',
    state = {},
    jsNonBlocking = '',
}: {
    title?: string,
    css: string,
    html: string,
    jsApp?: string,
    state?: {},
    jsNonBlocking?: string,
}) => `
    <!doctype html>
    <html>
        <head>
            <title>${title}</title>
            <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
            <style>${resetCSS}${fonts}${css}</style>
        </head>
        <body>
            <div id='app'>${html}</div>
            <script>
            window.gu = {
                app: {
                    state: ${JSON.stringify(state)},
                    cssIDs: ${JSON.stringify(cssIDs)},
                }
            };
            </script>
            <script src="${jsApp}"></script>
            <script>${jsNonBlocking}</script>
        </body>
    </html>
`;
