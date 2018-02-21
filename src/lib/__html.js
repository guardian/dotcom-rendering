// @flow

import resetCSS from './__reset-css';

export default ({
    title = 'The Guardian',
    stylesForHead = '',
    html = '',
    jsApp = '/assets/javascript/app.browser.js',
    state = {},
    jsNonBlocking = '',
}: {
    title?: string,
    stylesForHead: string,
    html: string,
    jsApp?: string,
    state?: {},
    jsNonBlocking?: string,
}) => `
    <!doctype html>
    <html>
        <head>
            <title>${title}</title>
            <style>${resetCSS}</style>
            ${stylesForHead}
        </head>
        <body>
            <div id='app'>${html}</div>
            <script>
            window.gu = { app: { state: ${JSON.stringify(state)} } };</script>
            <script src="${jsApp}"></script>
            <script>${jsNonBlocking}</script>
        </body>
    </html>
`;
