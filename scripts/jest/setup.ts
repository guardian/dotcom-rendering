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
        record: ({}: { [key: string]: any }) => null,
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
        preact: undefined,
        emotion: undefined,
        emotionCore: undefined,
        emotionTheming: undefined,
    },
    readerRevenue: {
        changeGeolocation: () => {},
        showMeTheEpic: () => {},
        showMeTheBanner: () => {},
        showNextVariant: () => {},
        showPreviousVariant: () => {},
    },
    gaPath: "/assets/ga.js",
};

// Stub global Guardian object
// We should never be able to directly set things to the global window object.
// But in this case we want to stub things for testing, so it's ok to ignore this rule
// @ts-ignore
window.guardian = windowGuardian;

// Mock Local Storage
// See: https://github.com/facebook/jest/issues/2098#issuecomment-260733457
// eslint-disable-next-line func-names
const localStorageMock = (function () {
    let store: {
        [key: string]: string;
    } = {};
    return {
        getItem(key: string) {
            return store[key] || null;
        },
        setItem(key: string, value: string) {
            store[key] = value.toString();
        },
        removeItem(key: string) {
            delete store[key];
        },
        clear() {
            store = {};
        },
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
});
