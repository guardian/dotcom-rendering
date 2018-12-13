// import raven from 'raven-js';
import { isAdBlockInUse } from './detectAdBlocker';

let adblockBeingUsed = false;

isAdBlockInUse().then((inUse: boolean) => {
    adblockBeingUsed = inUse;
});

export const init: (data: ArticleProps) => void = ({ CAPI, config }) => {
    const sentryOptions = {
        whitelistUrls: [
            // localhost will not log errors, but call `shouldSendCallback`
            /localhost/,
            /assets\.guim\.co\.uk/,
            /ophan\.co\.uk/,
        ],
        tags: {
            edition: CAPI.editionLongForm,
            contentType: CAPI.contentType,
        },
        ignoreErrors: [
            "Can't execute code from a freed script",
            /There is no space left matching rules from/gi,
            'Top comments failed to load:',
            'Comments failed to load:',
            /InvalidStateError/gi,
            /Fetch error:/gi,
            'Network request failed',
            'This video is no longer available.',
            'UnknownError',
            'Fetch error while requesting https://api.nextgen.guardianapps.co.uk/weatherapi/city.json:',
        ],
        dataCallback(data: {
            culprit: string | undefined;
            tags: {
                origin: string;
            };
        }): {} {
            const { culprit } = data;
            const resp = Object.assign({}, data);
            if (culprit) {
                const culpritMatches = /j.ophan.co.uk/.test(culprit);
                resp.tags.origin = culpritMatches ? 'ophan' : 'app';
                resp.culprit = culprit.replace(/\/[a-z\d]{32}(\/[^/]+)$/, '$1');
            }
            return resp;
        },
        shouldSendCallback(data: {
            tags: {
                ignored: boolean | undefined;
            };
        }): boolean {
            const { isDev } = config;
            const isIgnored =
                typeof data.tags.ignored !== 'undefined' && data.tags.ignored;
            // const { enableSentryReporting } = config.get('switches');
            const isInSample = Math.random() < 0.1;
            if (isDev && !isIgnored) {
                // Some environments don't support or don't always expose the console Object
                if (window.console && window.console.warn) {
                    window.console.warn('Raven captured error.', data);
                }
            }
            return (
                //     enableSentryReporting &&
                isInSample && !isIgnored && !adblockBeingUsed && !isDev
            );
        },
    };
};
