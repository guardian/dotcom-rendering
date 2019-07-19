// add some helpful assertions
import 'jest-dom/extend-expect';
// this is basically: afterEach(cleanup)
import 'react-testing-library/cleanup-after-each';

import { WindowGuardianConfig } from '@frontend/model/window-guardian';

const windowGuardianConfig = {
    googleAnalytics: null,
    images: null,
    libs: null,
    modules: null,
    nav: null,
    ophan: null,
    page: {
        sentryPublicApiKey: '344003a8d11c41d8800fbad8383fdc50',
        sentryHost: 'app.getsentry.com/35463',
    },
    stylesheets: null,
    switches: null,
    tests: null,
} as WindowGuardianConfig;

const windowGuardian = {
    app: {
        data: {},
        cssIDs: [],
    },
    config: windowGuardianConfig,
    polyfilled: false,
    onPolyfilled: () => {
        return undefined;
    },
};

// Stub global Guardian object
window.guardian = windowGuardian;
