// @flow
import resetCSS from './lib/reset-css';
import assets from './lib/assets';

export default ({
    title = 'The Guardian',
    bundleJS,
    css,
    html,
    data,
    cssIDs,
    nonBlockingJS = '',
    fontFiles = [],
}: {
    title?: string,
    bundleJS: string,
    css: string,
    html: string,
    data: {
        page: string,
        site: string,
    },
    cssIDs: Array<string>,
    nonBlockingJS?: string,
    fontFiles?: Array<string>,
}) => {
    const sanitiseDomRefs = jsString =>
        jsString.replace(/"(document.*?innerHTML)"/g, '$1');
    const vendorJS = assets.dist('vendor.js');
    const fontCSS = assets.static('css/fonts.css');
    const fontDomain = 'https://interactive.guim.co.uk/fonts/guss-webfonts/';

    return `<!doctype html>
        <html>
            <head>
                <title>${title}</title>
                <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
                <link rel="preload" href="${vendorJS}}" as="script">
                <link rel="preload" href="${bundleJS}" as="script">
                ${fontFiles
                    .map(
                        fontFile =>
                            `<link rel="preload" href="${fontDomain}${fontFile}" as="font" crossorigin>`,
                    )
                    .join('\n')}
                <link rel="stylesheet" href="${fontCSS}" media="nope!" onload="this.media='all'">
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
                <script src="${vendorJS}"></script>
                <script src="${bundleJS}"></script>
                <script>${nonBlockingJS}</script>
            </body>
        </html>`;
};
