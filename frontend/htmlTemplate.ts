import resetCSS from /* preval */ './lib/reset-css';
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
    title?: string;
    bundleJS: string;
    css: string;
    html: string;
    data: {
        page: string;
        site: string;
    };
    cssIDs: string[];
    nonBlockingJS?: string;
    fontFiles?: string[];
}) => {
    const sanitiseDomRefs = (jsString: string) =>
        jsString.replace(/"(document.*?innerHTML)"/g, '$1');
    const vendorJS = assets.dist('vendor.js');

    const fontCSS = [
        assets.static('fonts/guardian-headline/full-not-hinted/fonts.css'),
        assets.static('fonts/guardian-textegyptian/full-not-hinted/fonts.css'),
        assets.static('fonts/guardian-textsans/full-not-hinted/fonts.css'),
    ];

    return `<!doctype html>
        <html>
            <head>
                <title>${title}</title>
                <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
                <link rel="preload" href="${vendorJS}" as="script">
                <link rel="preload" href="${bundleJS}" as="script">
                ${fontFiles
                    .map(
                        fontFile =>
                            `<link rel="preload" href="${assets.static(
                                fontFile,
                            )}" as="font" crossorigin>`,
                    )
                    .join('\n')}
                ${fontCSS
                    .map(
                        fontFile =>
                            `<link rel="stylesheet" href="${fontFile}" media="nope!" onload="this.media='all'">`,
                    )
                    .join('\n')}
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
