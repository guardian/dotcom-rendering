import resetCSS from './lib/reset-css';
import { hashedPath, staticPath } from './lib/asset-path';

export default ({ 
    title = 'The Guardian', 
    vendor = ['javascript', 'vendor.js'],
    fonts = ['css', 'fonts.css'],
    bundle,
    css,
    html,
    data,
    cssIDs,
    nonBlockingJS = ''
}) => {
    const vendorPath = hashedPath(...vendor);
    const fontsPath = staticPath(...fonts);
    const bundlePath = hashedPath(...bundle);
    const sanitiseDomRefs = jsString =>
        jsString.replace(/"(document.*?innerHTML)"/g, '$1');

    return `<!doctype html>
        <html>
            <head>
                <title>${title}</title>
                <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
                <link rel="preload" href="${vendorPath}" as="script">
                <link rel="preload" href="${bundlePath}" as="script">
                <link rel="stylesheet" href="${fontsPath}" media="nope!" onload="this.media='all'">
                <style>${resetCSS}${css}</style>
            </head>
            <body>
                <div id='app'>${html}</div>
                <script>
                window.gu = ${sanitiseDomRefs(JSON.stringify({
                    app: {
                        data,
                        cssIDs,
                    },
                }))};
                </script>
                <script src="${vendorPath}"></script>
                <script src="${bundlePath}"></script>
                <script>${nonBlockingJS}</script>
            </body>
        </html>`;
};
