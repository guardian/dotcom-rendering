// add some helpful assertions
import 'jest-dom/extend-expect';
// this is basically: afterEach(cleanup)
import '@testing-library/react/cleanup-after-each';

import { WindowGuardianConfig } from '@frontend/model/window-guardian';

const windowGuardianConfig = {
    page: {
        sentryPublicApiKey: '344003a8d11c41d8800fbad8383fdc50',
        sentryHost: 'app.getsentry.com/35463',
        sentryDsn: 'https://1937ab71c8804b2b8438178dfdd6468f@sentry.io/1377847',
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
            reportError: (error: Error, feature: string): void => {
                // tslint:disable-next-line: no-console
                console.log(
                    `Error: attempting to log error without having registered sentry.\nError is: ${error.message}`,
                );
            },
        },
    },
};

// Stub global Guardian object
window.guardian = windowGuardian;
