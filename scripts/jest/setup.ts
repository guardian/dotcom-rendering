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
    polyfilled: false,
    onPolyfilled: () => undefined,
    ophan: {
        setEventEmitter: () => null,
        trackComponentAttention: () => null,
        record: ({  }: {}) => null,
        viewId: '',
        pageViewId: '',
    },
};

// Stub global Guardian object
window.guardian = windowGuardian;
