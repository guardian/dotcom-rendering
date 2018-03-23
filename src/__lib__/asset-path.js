// @flow

let assetHash = {};
try {
    // path is relative to the server bundle
    // eslint-disable-next-line global-require,import/no-unresolved
    assetHash = require('./manifest.json');
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

export const hashedPath = (fileType: FileType, name: string) =>
    prefix(`assets/${fileType}`, assetHash[name] || name);

export const staticPath = (fileType: FileType, name: string) =>
    prefix(`static/${fileType}`, assetHash[name] || name);
