import resetCSS from /* preval */ './lib/reset-css';
import fontsCSS from './lib/fonts-css';
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
                <style>${fontsCSS}${resetCSS}${css}</style>
            </head>
            <body>
                <div id='app'>${html}</div>
                <script>
                window.guardian = ${sanitiseDomRefs(
                    JSON.stringify({
                        app: {
                            data,
                            cssIDs,
                        },
                        config: {},
                    }),
                )};
                (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
                </script>
                <script src="${vendorJS}"></script>
                <script src="${bundleJS}"></script>
                <script>${nonBlockingJS}</script>
            </body>
        </html>`;
};
