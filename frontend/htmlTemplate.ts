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

    // <!-- link rel="stylesheet" href="${assets.static('fonts/fonts.css')}" -->

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
                <style>
                @font-face{font-family:"GH Guardian Headline";src:url(https://assets.guim.co.uk/guui/static/frontend/fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-Light.woff2) format("woff2"),url(https://assets.guim.co.uk/guui/static/frontend/fonts/guardian-headline/latin1-not-hinted/GHGuardianHeadline-Light.woff) format("woff"),url(https://assets.guim.co.uk/guui/static/frontend/fonts/guardian-headline/latin1-not-hinted/GHGuardianHeadline-Light.ttf) format("truetype");font-weight:300;font-style:normal}@font-face{font-family:"GH Guardian Headline";src:url(https://assets.guim.co.uk/guui/static/frontend/fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-LightItalic.woff2) format("woff2"),url(https://assets.guim.co.uk/guui/static/frontend/fonts/guardian-headline/latin1-not-hinted/GHGuardianHeadline-LightItalic.woff) format("woff"),url(https://assets.guim.co.uk/guui/static/frontend/fonts/guardian-headline/latin1-not-hinted/GHGuardianHeadline-LightItalic.ttf) format("truetype");font-weight:300;font-style:italic;font-display:swap}@font-face{font-family:"GH Guardian Headline";src:url(https://assets.guim.co.uk/guui/static/frontend/fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-Medium.woff2) format("woff2"),url(https://assets.guim.co.uk/guui/static/frontend/fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-Medium.woff) format("woff"),url(https://assets.guim.co.uk/guui/static/frontend/fonts/guardian-headline/latin1-not-hinted/GHGuardianHeadline-Medium.ttf) format("truetype");font-weight:500;font-style:normal;font-display:swap}@font-face{font-family:"GH Guardian Headline";src:url(https://assets.guim.co.uk/guui/static/frontend/fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-MediumItalic.woff2) format("woff2"),url(https://assets.guim.co.uk/guui/static/frontend/fonts/guardian-headline/latin1-not-hinted/GHGuardianHeadline-MediumItalic.woff) format("woff"),url(https://assets.guim.co.uk/guui/static/frontend/fonts/guardian-headline/latin1-not-hinted/GHGuardianHeadline-MediumItalic.ttf) format("truetype");font-weight:500;font-style:italic;font-display:swap}@font-face{font-family:"GH Guardian Headline";src:url(https://assets.guim.co.uk/guui/static/frontend/fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-Bold.woff2) format("woff2"),url(https://assets.guim.co.uk/guui/static/frontend/fonts/guardian-headline/latin1-not-hinted/GHGuardianHeadline-Bold.woff) format("woff"),url(https://assets.guim.co.uk/guui/static/frontend/fonts/guardian-headline/latin1-not-hinted/GHGuardianHeadline-Bold.ttf) format("truetype");font-weight:700;font-style:normal;font-display:swap}@font-face{font-family:GuardianTextEgyptian;src:url(https://assets.guim.co.uk/guui/static/frontend/fonts/guardian-textegyptian/noalts-not-hinted/GuardianTextEgyptian-Regular.woff2) format("woff2"),url(https://assets.guim.co.uk/guui/static/frontend/fonts/guardian-textegyptian/noalts-not-hinted/GuardianTextEgyptian-Regular.woff) format("woff"),url(https://assets.guim.co.uk/guui/static/frontend/fonts/guardian-textegyptian/latin1-not-hinted/GuardianTextEgyptian-Regular.ttf) format("truetype");font-weight:400;font-style:normal;font-display:swap}@font-face{font-family:GuardianTextEgyptian;src:url(https://assets.guim.co.uk/guui/static/frontend/fonts/guardian-textegyptian/noalts-not-hinted/GuardianTextEgyptian-RegularItalic.woff2) format("woff2"),url(https://assets.guim.co.uk/guui/static/frontend/fonts/guardian-textegyptian/latin1-not-hinted/GuardianTextEgyptian-RegularItalic.woff) format("woff"),url(https://assets.guim.co.uk/guui/static/frontend/fonts/guardian-textegyptian/latin1-not-hinted/GuardianTextEgyptian-RegularItalic.ttf) format("truetype");font-weight:400;font-style:italic;font-display:swap}@font-face{font-family:GuardianTextEgyptian;src:url(https://assets.guim.co.uk/guui/static/frontend/fonts/guardian-textegyptian/noalts-not-hinted/GuardianTextEgyptian-Bold.woff2) format("woff2"),url(https://assets.guim.co.uk/guui/static/frontend/fonts/guardian-textegyptian/latin1-not-hinted/GuardianTextEgyptian-Bold.woff) format("woff"),url(https://assets.guim.co.uk/guui/static/frontend/fonts/guardian-textegyptian/latin1-not-hinted/GuardianTextEgyptian-Bold.ttf) format("truetype");font-weight:700;font-style:normal;font-display:swap}@font-face{font-family:GuardianTextSans;src:url(https://assets.guim.co.uk/guui/static/frontend/fonts/guardian-textsans/noalts-not-hinted/GuardianTextSans-Regular.woff2) format("woff2"),url(https://assets.guim.co.uk/guui/static/frontend/fonts/guardian-textsans/noalts-not-hinted/GuardianTextSans-Regular.woff) format("woff"),url(https://assets.guim.co.uk/guui/static/frontend/fonts/guardian-textsans/latin1-not-hinted/GuardianTextSans-Regular.ttf) format("truetype");font-weight:400;font-style:normal;font-display:swap}@font-face{font-family:GuardianTextSans;src:url(https://assets.guim.co.uk/guui/static/frontend/fonts/guardian-textsans/noalts-not-hinted/GuardianTextSans-RegularItalic.woff2) format("woff2"),url(https://assets.guim.co.uk/guui/static/frontend/fonts/guardian-textsans/latin1-not-hinted/GuardianTextSans-RegularItalic.woff) format("woff"),url(https://assets.guim.co.uk/guui/static/frontend/fonts/guardian-textsans/latin1-not-hinted/GuardianTextSans-RegularItalic.ttf) format("truetype");font-weight:400;font-style:italic;font-display:swap}@font-face{font-family:GuardianTextSans;src:url(https://assets.guim.co.uk/guui/static/frontend/fonts/guardian-textsans/noalts-not-hinted/GuardianTextSans-Bold.woff2) format("woff2"),url(https://assets.guim.co.uk/guui/static/frontend/fonts/guardian-textsans/latin1-not-hinted/GuardianTextSans-Bold.woff) format("woff"),url(https://assets.guim.co.uk/guui/static/frontend/fonts/guardian-textsans/latin1-not-hinted/GuardianTextSans-Bold.ttf) format("truetype");font-weight:700;font-style:normal;font-display:swap}
                </style>
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
