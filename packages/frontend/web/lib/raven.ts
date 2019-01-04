import raven, { RavenStatic } from 'raven-js';
import { get } from '@frontend/web/lib/appData';

let ravenConfig: RavenStatic;

export const getRaven: () => RavenStatic = () => {
    if (ravenConfig) {
        return ravenConfig;
    }

    const { sentryPublicApiKey, sentryHost, isDev, switches } = get(
        'config',
    ) as ConfigType;
    const { editionLongForm, contentType } = get('CAPI') as CAPIType;

    const sentryUrl = `https://${sentryPublicApiKey}@${sentryHost}`;
    const sentryOptions = {
        whitelistUrls: [
            // localhost will not log errors, but call `shouldSendCallback`
            /webpack-internal/,
            /localhost/,
            /assets\.guim\.co\.uk/,
            /ophan\.co\.uk/,
        ],
        tags: {
            contentType,
            edition: editionLongForm,
        },
        ignoreErrors: [
            "Can't execute code from a freed script",
            /InvalidStateError/gi,
            /Fetch error:/gi,
            'Network request failed',
            'This video is no longer available.',
            'UnknownError',
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
            const isIgnored =
                typeof data.tags.ignored !== 'undefined' && data.tags.ignored;
            const isInSample = Math.random() < 0.1;

            if (isDev && !isIgnored) {
                // Some environments don't support or don't always expose the console Object
                if (window.console && window.console.warn) {
                    window.console.warn('Raven captured error.', data);
                }
            }

            return (
                switches.enableSentryReporting &&
                isInSample &&
                !isIgnored &&
                !isDev
            );
        },
    };

    ravenConfig = raven.config(sentryUrl, sentryOptions).install();

    return ravenConfig;
};
