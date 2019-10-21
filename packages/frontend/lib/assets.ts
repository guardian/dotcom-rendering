interface AssetHash {
    [key: string]: string;
}

let assetHash: AssetHash = {};

try {
    // path is relative to the server bundle

    // tslint:disable-next-line:no-var-requires
    assetHash = require('./manifest.json');
} catch (e) {
    // do nothing
}

// GU_STAGE is set in frontend/cloudformation.yml, so will be undefined locally
const stage =
    typeof process.env.GU_STAGE === 'string'
        ? process.env.GU_STAGE.toUpperCase()
        : process.env.GU_STAGE;

const CDN = stage ? `//assets.guim.co.uk/` : '/';

export const getDist = (path: string): string =>
    `${CDN}assets/${assetHash[path] || path}`;

export const getStatic = (path: string): string =>
    `${CDN}static/frontend/${assetHash[path] || path}`;
