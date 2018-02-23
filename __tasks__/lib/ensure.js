// @flow
const { log } = require('./log');

module.exports = (...packages) =>
    new Promise(resolve => {
        try {
            resolve(packages.map(require));
        } catch (e) {
            log(`Pre-installing dependency (${packages.join(', ')})...`);
            require('child_process')
                .spawn('npm', ['i', ...packages, '--no-save'])
                .on('close', code => {
                    if (code !== 0) process.exit(code);
                    try {
                        resolve(packages.map(require));
                    } catch (e2) {
                        console.log(e2);
                    }
                });
        }
    });
