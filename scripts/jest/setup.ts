// add some helpful assertions
import 'jest-dom/extend-expect';

import { WindowGuardianConfig } from '@root/src/model/window-guardian';

const windowGuardianConfig = {
    page: {
        sentryPublicApiKey: '344003a8d11c41d8800fbad8383fdc50',
        sentryHost: 'app.getsentry.com/35463',
        dcrSentryDsn:
            'https://1937ab71c8804b2b8438178dfdd6468f@sentry.io/1377847',
    },
} as WindowGuardianConfig;

const windowGuardian = {
    app: {
        data: {},
        cssIDs: [],
    },
    config: windowGuardianConfig,
    mustardCut: false,
    polyfilled: false,
    onPolyfilled: () => undefined,
    queue: [],
    ophan: {
        setEventEmitter: () => null,
        trackComponentAttention: () => null,
        record: ({  }: {}) => null,
        viewId: '',
        pageViewId: '',
    },
    modules: {
        sentry: {
            reportError: (error: Error): void => {
                // eslint-disable-next-line no-console
                console.log(
                    `Error: attempting to log error without having registered sentry.\nError is: ${error.message}`,
                );
            },
        },
    },
    functions: {
        import: (url: string) => import(url),
    },
    automat: {
        react: undefined,
        emotion: undefined,
        emotionCore: undefined,
        emotionTheming: undefined,
    },
};

// Stub global Guardian object
window.guardian = windowGuardian;
