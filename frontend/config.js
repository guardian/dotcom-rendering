const { resolve } = require('path');
const { promisify } = require('util');
const glob = promisify(require('glob'));

const siteName = 'frontend';
const getPagesForSite = () =>
    glob('*.ts*(x)', { cwd: `${siteName}/web/pages` }).then(paths =>
        paths.map(path => path.replace(/\.[^/.]+$/, '')),
    );

const root = __dirname;
const dist = resolve(root, 'dist');
const target = resolve(root, 'target');
const prodPort = 9000;
const devServerPort = 3030;

module.exports = {
    dist,
    root,
    target,
    getPagesForSite,
    siteName,
    prodPort,
    devServerPort,
};
