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
        assets.static('fonts/guardian-headline/noalts-not-hinted/fonts.css'),
        assets.static(
            'fonts/guardian-textegyptian/noalts-not-hinted/fonts.css',
        ),
        assets.static('fonts/guardian-textsans/noalts-not-hinted/fonts.css'),
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
                window.guardian = ${sanitiseDomRefs(
                    JSON.stringify({
                        app: {
                            data,
                            cssIDs,
                        },
                        config: {},
                    }),
                )};

                (function (window, document) {
                    function getCookieValue(name) {
                        var nameEq = name + "=",
                            cookies = document.cookie.split(';'),
                            value = null;
                        cookies.forEach(function (cookie) {
                            while (cookie.charAt(0) === ' ') {
                                cookie = cookie.substring(1, cookie.length);
                            }
                            if (cookie.indexOf(nameEq) === 0) {
                                value = cookie.substring(nameEq.length, cookie.length);
                            }
                        });
                        return value;
                    }
                    window.guardian.config.ophan = {
                        // This is duplicated from
                        // https://github.com/guardian/ophan/blob/master/tracker-js/assets/coffee/ophan/transmit.coffee
                        // Please do not change this without talking to the Ophan project first.
                        // WHY?
                        // https://github.com/guardian/frontend/pull/9982
                        pageViewId: new Date().getTime().toString(36) +
                            'xxxxxxxxxxxx'.replace(/x/g, () => {
                                return Math.floor(
                                    Math.random() * 36,
                                ).toString(36);
                            }),
                        browserId: getCookieValue('bwid')
                    };
                })(window, document);
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
