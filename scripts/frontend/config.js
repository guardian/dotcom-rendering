const { resolve } = require('path');

const siteName = 'frontend';

const root = resolve(__dirname, '..', '..');
const dist = resolve(root, 'dist');
const target = resolve(root, 'target');

module.exports = {
    dist,
    root,
    target,
    siteName,
};
