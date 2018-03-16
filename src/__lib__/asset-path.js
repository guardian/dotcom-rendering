// @flow

let assetHash = {};
try {
    // path is relative to the server bundle
    // eslint-disable-next-line global-require,import/no-unresolved
    assetHash = require('./manifest.json');
} catch (e) {
    // do nothing
}

export default name => `/assets/javascript/${assetHash[name] || name}`;
