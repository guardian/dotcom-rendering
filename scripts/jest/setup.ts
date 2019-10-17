// add some helpful assertions
import 'jest-dom/extend-expect';
// this is basically: afterEach(cleanup)
import '@testing-library/react/cleanup-after-each';

import { WindowGuardianConfig } from '@frontend/model/window-guardian';

const windowGuardianConfig = {
    page: {
        sentryPublicApiKey: '344003a8d11c41d8800fbad8383fdc50',
        sentryHost: 'app.getsentry.com/35463',
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
        raven: {
            reportError: (
                err: Error,
                tags: { [key: string]: string },
                shouldThrow: boolean,
            ): void => {
                // tslint:disable-next-line: no-console
                console.log(
                    `Error: attempting to log error without having registered raven.\nError is: ${err.message}`,
                );
            },
        },
    },
};

// Stub global Guardian object
window.guardian = windowGuardian;
