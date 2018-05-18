const { resolve } = require('path');
const { promisify } = require('util');
const glob = promisify(require('glob'));

const getSites = () => glob('*', { cwd: `sites` });
const getPagesForSite = (site = '*') =>
    glob('*.js', { cwd: `sites/${site}/pages` }).then(paths =>
        paths.map(path => path.replace(/\.[^/.]+$/, '')),
    );

module.exports = {
    dist: resolve(__dirname, 'dist'),
    root: __dirname,
    getPagesForSite,
    getSites,
};
