import resetCSS from /* preval */ '@frontend/lib/reset-css';
import { getFontsCss } from '@frontend/lib/fonts-css';
import { getStatic } from '@frontend/lib/assets';

import { WindowGuardian } from '@frontend/model/window-guardian';

export const htmlTemplate = ({
    title = 'The Guardian',
    linkedData,
    preloadScripts,
    priorityScripts,
    lowPriorityScripts,
    css,
    html,
    windowGuardian,
    nonBlockingJS = '',
    fontFiles = [],
    ampLink,
}: {
    title?: string;
    linkedData: object;
    preloadScripts: string[];
    priorityScripts: string[];
    lowPriorityScripts: string[];
    css: string;
    html: string;
    nonBlockingJS?: string;
    fontFiles?: string[];
    windowGuardian: WindowGuardian;
    ampLink?: string;
}) => {
    const favicon =
        process.env.NODE_ENV === 'production'
            ? 'favicon-32x32.ico'
            : 'favicon-32x32-dev-yellow.ico';

    return `<!doctype html>
        <html lang="en">
            <head>
                <title>${title}</title>
                <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
                <link rel="icon" href="https://static.guim.co.uk/images/${favicon}">

                <script type="application/ld+json">
                    ${JSON.stringify(linkedData)}
                </script>

                ${preloadScripts
                    .map(
                        url => `<link rel="preload" href="${url}" as="script">`,
                    )
                    .join('\n')}
                ${fontFiles
                    .map(
                        fontFile =>
                            `<link rel="preload" href="${getStatic(
                                fontFile,
                            )}" as="font" crossorigin>`,
                    )
                    .join('\n')}

                <!-- TODO make this conditional when we support more content types -->
                ${ampLink ? `<link rel="amphtml" href="${ampLink}">` : ''}

                <style>${getFontsCss()}${resetCSS}${css}</style>
                <script>
                window.guardian = ${JSON.stringify(windowGuardian)};
                // this is a global that's called at the bottom of the pf.io response,
                // once the polyfills have run. This may be useful for debugging.
                // mainly to support browsers that don't support async=false or defer
                function guardianPolyfilled() {
                    try {
                        window.guardian.polyfilled = true;
                        window.guardian.onPolyfilled();
                    } catch (e) {};
                }

                // We've got contract's to abide by with the Ophan tracker
                // Setting pageViewId here ensures we're not getting race-conditions at all
                window.guardian.config.ophan = {
                    // This is duplicated from
                    // https://github.com/guardian/ophan/blob/master/tracker-js/assets/coffee/ophan/transmit.coffee
                    // Please do not change this without talking to the Ophan project first.
                    pageViewId:
                        new Date().getTime().toString(36) +
                        'xxxxxxxxxxxx'.replace(/x/g, function() {
                            return Math.floor(Math.random() * 36).toString(36);
                        }),
                };

                (function() {
                    var firstScript = document.scripts[0];
                    [${priorityScripts.map(script =>
                        JSON.stringify(script),
                    )}].forEach(url => {
                        if ('async' in firstScript) {
                            // modern browsers
                            var script = document.createElement('script');
                            script.async = false;
                            script.src = url;
                            if (document.head) {
                                document.head.appendChild(script);
                            }
                        } else {
                            // fall back to defer
                            document.write('<script src="' + url + '" defer></' + 'script>');
                        }
                    });
                })();
                </script>
            </head>
            <body>
                <div id="app">${html}</div>
                ${lowPriorityScripts
                    .map(script => `<script async src="${script}"></script>`)
                    .join('\n')}
                <script>${nonBlockingJS}</script>
            </body>
        </html>`;
};
