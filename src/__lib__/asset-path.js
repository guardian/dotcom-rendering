// @flow

let assetHash = {};
try {
    // path is relative to the server bundle
    // eslint-disable-next-line global-require,import/no-unresolved
    assetHash = require('./manifest.json');
} catch (e) {
    // do nothing
}

const prefix = (path : string, name: string): string => {
    if (process.env.NODE_ENV === 'production') {
        return `//assets.guim.co.uk/guui/${path}/${name}`;
    }
    return `/${path}/${name}`;
};

type filetype = 'javascript' | 'css';

export const hashedPath = (filetype : filetype, name : string) => prefix(`assets/${filetype}`, assetHash[name] || name);

export const staticPath = (filetype : filetype, name : string) => prefix(`static/${filetype}`, assetHash[name] || name);

