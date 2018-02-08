// @flow

import resetCSS from './__reset-css';

export default ({
    title = 'The Guardian',
    stylesForHead = '',
    html = '',
    jsApp = '/assets/javascript/app.browser.js',
}: {
    title?: string,
    stylesForHead: string,
    html: string,
    jsApp?: string,
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
            <script src="${jsApp}"></script>
        </body>
    </html>
`;
