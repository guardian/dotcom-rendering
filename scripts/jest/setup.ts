// add some helpful assertions
import 'jest-dom/extend-expect';
// this is basically: afterEach(cleanup)
import 'react-testing-library/cleanup-after-each';

import { windowGuardianConfig } from '@frontend/model/window-guardian';

// Stub global Guardian object
window.guardian = {
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
