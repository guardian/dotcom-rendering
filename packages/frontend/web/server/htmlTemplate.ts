import resetCSS from /* preval */ '@frontend/lib/reset-css';
import fontsCSS from '@frontend/lib/fonts-css';
import assets from '@frontend/lib/assets';

export default ({
    title = 'The Guardian',
    linkedData,
    priorityScripts,
    lowPriorityScripts,
    css,
    html,
    data,
    cssIDs,
    nonBlockingJS = '',
    fontFiles = [],
}: {
    title?: string;
    linkedData: object;
    priorityScripts: string[];
    lowPriorityScripts: string[];
    css: string;
    html: string;
    data: {
        page: string;
        site: string;
    };
    cssIDs: string[];
    nonBlockingJS?: string;
    fontFiles?: string[];
}) => `<!doctype html>
        <html>
            <head>
                <title>${title}</title>
                <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
                <script type="application/ld+json">
                    ${JSON.stringify(linkedData)}
                </script>
                
                ${priorityScripts
                    .map(
                        url => `<link rel="preload" href="${url}" as="script">`,
                    )
                    .join('\n')}
                ${fontFiles
                    .map(
                        fontFile =>
                            `<link rel="preload" href="${assets.static(
                                fontFile,
                            )}" as="font" crossorigin>`,
                    )
                    .join('\n')}
                <style>${fontsCSS}${resetCSS}${css}</style>
                <script>
                window.guardian = ${JSON.stringify({
                    app: {
                        data,
                        cssIDs,
                    },
                    config: {
                        tests: {
                            renderer: 'new',
                        },
                    },
                })};
                // this is a global that's called at the bottom of the pf.io response,
                // once the polyfills have run. This may be useful for debugging.
                // mainly to support browsers that don't support async=false or defer
                function guardianPolyfilled() {
                    try {
                        window.guardian.polyfilled = true;
                        window.guardian.onPolyfilled();
                    } catch (e) {};
                }
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
