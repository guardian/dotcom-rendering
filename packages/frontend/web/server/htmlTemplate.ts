import resetCSS from /* preval */ '@frontend/lib/reset-css';
import { getFontsCss } from '@frontend/lib/fonts-css';
import { getStatic } from '@frontend/lib/assets';
import { prepareCmpString } from '@frontend/web/browser/prepareCmp';

import { WindowGuardian } from '@frontend/model/window-guardian';

export const htmlTemplate = ({
    title = 'The Guardian',
    description,
    linkedData,
    priorityScripts,
    lowPriorityScripts,
    css,
    html,
    windowGuardian,
    fontFiles = [],
    ampLink,
}: {
    title?: string;
    description: string;
    linkedData: object;
    priorityScripts: string[];
    lowPriorityScripts: string[];
    css: string;
    html: string;
    fontFiles?: string[];
    windowGuardian: WindowGuardian;
    ampLink?: string;
}) => {
    const favicon =
        process.env.NODE_ENV === 'production'
            ? 'favicon-32x32.ico'
            : 'favicon-32x32-dev-yellow.ico';

    const priorityScriptTags = priorityScripts.map(
        src => `<script defer src="${src}"></script>`,
    );

    const lowPriorityScriptTags = lowPriorityScripts.map(
        src => `<script async src="${src}"></script>`,
    );

    const fontPreloadTags = fontFiles.map(
        fontFile =>
            `<link rel="preload" href="${getStatic(
                fontFile,
            )}" as="font" crossorigin>`,
    );

    return `<!doctype html>
        <html lang="en">
            <head>
                <title>${title}</title>
                <meta name="description" content="${escape(description)}" />

                <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
                <link rel="icon" href="https://static.guim.co.uk/images/${favicon}">

                <script type="application/ld+json">
                    ${JSON.stringify(linkedData)}
                </script>

                <!-- TODO make this conditional when we support more content types -->
                ${ampLink ? `<link rel="amphtml" href="${ampLink}">` : ''}

                ${fontPreloadTags.join('\n')}

                <script>
                    window.guardian = ${JSON.stringify(windowGuardian)};
                    window.guardian.queue = []; // Queue for functions to be fired by polyfill.io callback
                </script>

                <script type="module">
                    window.guardian.mustardCut = true;
                </script>

                <script nomodule>
                    // Browser fails mustard check
                    window.guardian.mustardCut = false;
                </script>

                <script>
                    // this is a global that's called at the bottom of the pf.io response,
                    // once the polyfills have run. This may be useful for debugging.
                    // mainly to support browsers that don't support async=false or defer
                    function guardianPolyfilled() {
                        window.guardian.polyfilled = true;
                        if (window.guardian.mustardCut === false) {
                            window.guardian.queue.forEach(function(startup) { startup() })
                        }
                    }

                    // We've got contracts to abide by with the Ophan tracker
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
                </script>

                <script>${prepareCmpString}</script>

                ${priorityScriptTags.join('\n')}
                <style>${getFontsCss()}${resetCSS}${css}</style>
            </head>

            <body>
                <div id="app">${html}</div>
                ${lowPriorityScriptTags.join('\n')}
            </body>
        </html>`;
};
