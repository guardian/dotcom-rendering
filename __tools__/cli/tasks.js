// @flow
const execa = require('execa');

const { log } = require('./log');

const tasks = {
    dev: () => {
        log('Starting dev server...');
        execa('webpack-dev-server', ['--hot', '--env.browser'], {
            stdio: 'inherit',
        });
    },
    build: () => {
        log('building production bundles\n');
        execa.sync('rm', ['-rf', 'dist']);
        execa.sync('webpack', ['--color'], {
            env: { NODE_ENV: 'production' },
            stdio: 'inherit',
        });
    },
};

const list = () => {
    log('GUUI has the following tasks:');
    Object.keys(tasks).forEach(taskName => console.log(`     ${taskName}`));
};

module.exports = { tasks, list };
