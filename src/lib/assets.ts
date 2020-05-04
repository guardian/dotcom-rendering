interface AssetHash {
    [key: string]: string;
}

let assetHash: AssetHash = {};
let assetHashLegacy: AssetHash = {};

try {
    // path is relative to the server bundle
    // eslint-disable-next-line import/no-unresolved
    assetHash = require('./manifest.json');
    // eslint-disable-next-line import/no-unresolved
    assetHashLegacy = require('./manifest.legacy.json');
} catch (e) {
    // do nothing
}

// TODO: this shoudl be removed in favor of `frontendAssetsFullURL` defined in CAPI
// GU_STAGE is set in cloudformation.yml, so will be undefined locally
const stage =
    typeof process.env.GU_STAGE === 'string'
        ? process.env.GU_STAGE.toUpperCase()
        : process.env.GU_STAGE;

const CDN = stage
    ? `//assets${stage === 'CODE' ? '-code' : ''}.guim.co.uk/`
    : '/';

export const getDist = ({
    path,
    legacy,
}: {
    path: string;
    legacy: boolean;
}): string => {
    const selectedAssetHash = legacy ? assetHashLegacy : assetHash;
    return `${CDN}assets/${selectedAssetHash[path] || path}`;
};

// TODO: Do static files ever appear in the manifest.json?
// Note we do not have any variation between in compliation for static files
// therefore we just look up using assetHash
export const getStatic = (path: string): string =>
    `${CDN}static/frontend/${assetHash[path] || path}`;
