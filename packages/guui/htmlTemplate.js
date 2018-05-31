// @flow
import resetCSS from './lib/reset-css';
import assets from './lib/assets';

export default ({
    title = 'The Guardian',
    vendor = assets.dist('vendor.js'),
    fonts = assets.static('css/fonts.css'),
    bundle,
    css,
    html,
    data,
    cssIDs,
    nonBlockingJS = '',
}: {
    title?: string,
    vendor?: string,
    fonts?: string,
    bundle?: string,
    css: string,
    html: string,
    data: {
        page: string,
        site: string,
    },
    cssIDs: Array<string>,
    nonBlockingJS?: string,
}) => {
    const sanitiseDomRefs = jsString =>
        jsString.replace(/"(document.*?innerHTML)"/g, '$1');

    return `<!doctype html>
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
                            data,
                            cssIDs,
                        },
                    }),
                )};
                </script>
                <script src="${vendor}"></script>
                <script src="${bundle}"></script>
                <script>${nonBlockingJS}</script>
            </body>
        </html>`;
};
