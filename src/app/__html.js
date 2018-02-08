// @flow

import resetCSS from './__reset-css';

export default ({
    title = 'The Guardian',
    stylesForHead = '',
    html = '',
}: {
    title?: string,
    stylesForHead: string,
    html: string,
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
            <script src="/assets/javascript/app.browser.js"></script>
        </body>
    </html>
`;
