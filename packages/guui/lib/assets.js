// @flow

let assetHash = {};
try {
    // path is relative to the server bundle
    // $FlowFixMe
    assetHash = require('./manifest.json'); // eslint-disable-line global-require,import/no-unresolved
} catch (e) {
    // do nothing
}

// GU_STAGE is set in sites/dotcom/cloudformation.yml, so will be undefined locally
const stage =
    typeof process.env.GU_STAGE === 'string'
        ? process.env.GU_STAGE.toUpperCase()
        : process.env.GU_STAGE;

const CDN = stage
    ? `//assets${stage === 'CODE' ? '-code' : ''}.guim.co.uk/guui/`
    : '/';

export default {
    dist: (path: string): string => `${CDN}assets/${assetHash[path] || path}`,
    static: (path: string): string =>
        `${CDN}static/__SITE__/${assetHash[path] || path}`,
};
