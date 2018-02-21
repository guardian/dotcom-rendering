// @flow
const execa = require('execa');
const { log } = require('./log');

module.exports = () => {
    log('installing GUUI CLI');

    // this is a bit weird. we use yarn to manage deps, but `yarn link`
    // doesn't put the bin in your global path. `npm link` does, but it
    // leaves npm artefacts around. so we run `npm link` then remove them.
    execa.sync('npm', ['link']);
    execa.sync('rm', ['package-lock.json']);
};
