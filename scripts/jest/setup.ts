// add some helpful assertions
import 'jest-dom/extend-expect';
// this is basically: afterEach(cleanup)
import 'react-testing-library/cleanup-after-each';

// Stub global Guardian object
window.guardian = {
    app: {
        data: {},
        cssIDs: [],
    },
    polyfilled: false,
    onPolyfilled: () => {
        return undefined;
    },
};
