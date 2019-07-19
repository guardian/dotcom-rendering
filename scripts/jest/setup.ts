// add some helpful assertions
import 'jest-dom/extend-expect';
// this is basically: afterEach(cleanup)
import 'react-testing-library/cleanup-after-each';

import { makeWindowGuardianConfigForTest } from '@frontend/model/window-guardian';

const windowGuardianConfig = makeWindowGuardianConfigForTest();

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
