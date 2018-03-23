// @flow

let assetHash = {};
try {
    // path is relative to the server bundle
    // eslint-disable-next-line global-require,import/no-unresolved
    assetHash = require('./manifest.json');
} catch (e) {
    // do nothing
}

const prefix = (name) => {
    if(process.env.NODE_ENV === "production"){
        return `https:\/\/assets.guim.co.uk/javascript/${name}`;
    } else {
        return `/assets/javascript/${name}`;
    }
}

export default name => prefix(assetHash[name] || name);
