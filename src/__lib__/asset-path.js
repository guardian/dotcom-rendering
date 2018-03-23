// @flow

let assetHash = {};
try {
    // path is relative to the server bundle
    // eslint-disable-next-line global-require,import/no-unresolved
    assetHash = require('./manifest.json');
} catch (e) {
    // do nothing
}

const prefix = (type, name) => {
    if (process.env.NODE_ENV === 'production') {
        return `https://assets.guim.co.uk/guui/${type}/${name}`;
    }
    return `/${type}/${name}`;
};

export function hashedPath(type, name) {
    return prefix(`assets/${type}`, assetHash[name] || name);
}

export function staticPath(type, name) {
    return prefix(`static/${type}`, assetHash[name] || name);
}
