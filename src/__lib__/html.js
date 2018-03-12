// @flow

import resetCSS from './reset-css';

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
}) => `
    <!doctype html>
    <html>
        <head>
            <title>${title}</title>
            <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
            <link rel="preload" href="/static/css/fonts.css" as="style">
            <link rel="preload" href="/assets/javascript/${
                data.page
            }.browser.js" as="script">
            <link rel="stylesheet" href="/static/css/fonts.css" media="nope!" onload="this.media='all'">
            <style>${resetCSS}${css}</style>
        </head>
        <body>
            <div id='app'>${html}</div>
            <script>
            window.gu = ${JSON.stringify({
                app: {
                    data: {
                        ...data,
                        content: Object.entries(data.content).reduce(
                            (content, [key]) => ({
                                [key]: `document.querySelector('[data-content-${key}]').innerHTML`,
                                ...content,
                            }),
                            {},
                        ),
                    },
                    cssIDs,
                },
            }).replace(/"(document.*?innerHTML)"/g, '$1')};
            </script>
            <script src="/assets/javascript/${data.page}.browser.js"></script>
            <script>${jsNonBlocking}</script>
        </body>
    </html>
`;
