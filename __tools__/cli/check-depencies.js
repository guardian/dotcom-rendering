// @flow
const execa = require('execa');
const { log } = require('./log');

module.exports = version => {
    log('Checking dependencies');
    try {
        if (execa.shellSync('yarn -v').stdout !== version) {
            throw new Error();
        }
    } catch (e) {
        execa.sync('npm', ['i', '-g', `yarn@${version}`]);
    }
    execa.sync('yarn');
};
