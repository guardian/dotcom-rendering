// @flow

let assetHash = {};
try {
    // path is relative to the server bundle
    // $FlowFixMe
    assetHash = require('./manifest.json'); // eslint-disable-line global-require,import/no-unresolved
} catch (e) {
    // do nothing
}

const prefix = (path: string, name: string): string => {
    if (process.env.NODE_ENV === 'production') {
        return `//assets.guim.co.uk/guui/${path}/${name}`;
    }
    return `/${path}/${name}`;
};

type FileType = 'javascript' | 'css';

export const hashedPath = (fileType: FileType, name: string): string =>
    prefix(`assets/${fileType}`, assetHash[name] || name);

export const staticPath = (fileType: FileType, name: string): string =>
    prefix(`static/${fileType}`, assetHash[name] || name);
