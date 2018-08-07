const { resolve } = require('path');
const { promisify } = require('util');
const glob = promisify(require('glob'));

const siteName = 'frontend';
const getPagesForSite = () =>
    glob('*.js', { cwd: `${siteName}/pages` }).then(paths =>
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
    siteName,
};
