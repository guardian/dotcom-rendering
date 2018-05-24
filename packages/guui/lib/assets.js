// @flow

let assetHash = {};
try {
    // path is relative to the server bundle
    // $FlowFixMe
    assetHash = require('./manifest.json'); // eslint-disable-line global-require,import/no-unresolved
} catch (e) {
    // do nothing
}

const CDN = process.env.GU_PUBLIC ? '//assets.guim.co.uk/guui/' : '/';

export default {
    dist: (path: string): string => `${CDN}assets/${assetHash[path] || path}`,
    static: (path: string): string => `${CDN}static/${assetHash[path] || path}`,
};
