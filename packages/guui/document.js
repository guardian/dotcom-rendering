// @flow

import { renderToString } from '@guardian/guui';
import resetCSS from './lib/reset-css';
import { hashedPath, staticPath } from './lib/asset-path';

export default ({
    title = 'The Guardian',
    Page,
    data,
    nonBlockingJS = '',
}: {
    title?: string,
    Page: React.ComponentType<{}>,
    data: { page: string, site: string },
    nonBlockingJS?: string,
}) => {
    const bundle = hashedPath(
        'javascript',
        `${data.site}.${data.page.toLowerCase()}.js`,
    );
    const vendor = hashedPath('javascript', 'vendor.js');
    const fonts = staticPath('css', 'fonts.css');

    const { html, css, ids: cssIDs } = renderToString(<Page />);

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
            window.gu = ${JSON.stringify({
                app: {
                    data,
                    cssIDs,
                },
            })};
            </script>
            <script src="${vendor}"></script>
            <script src="${bundle}"></script>
            <script>${nonBlockingJS}</script>
        </body>
    </html>
`;
};
