const { resolve } = require('path');
const { promisify } = require('util');
const glob = promisify(require('glob'));

const getSites = () => glob('*', { cwd: `sites` });
const getPagesForSite = (site = '*') =>
    glob('*.js', { cwd: `sites/${site}/pages` }).then(paths =>
        paths.map(path => path.replace(/\.[^/.]+$/, '')),
    );

const root = __dirname;
const dist = resolve(root, 'dist');
const target = resolve(root, 'target');

module.exports = {
    dist,
    root,
    target,
    getPagesForSite,
    getSites,
};
