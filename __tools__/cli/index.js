#!/usr/bin/env node

// @flow

const ansiEscapes = require('ansi-escapes');

process.stdout.write(ansiEscapes.clearScreen);

const argv = require('minimist')(process.argv.slice(2));
const execa = require('execa');
const chalk = require('chalk');

const { log, warn } = require('./log');
const install = require('./install');
const { tasks, list } = require('./tasks');
const checkDependencies = require('./check-depencies');

const YARN_VERSION = '1.3.2';

const [task] = argv._;

if (!task) {
    list();
    process.exit();
}

if (task === 'setup') {
    checkDependencies(YARN_VERSION);

    install();

    log(`Done — you can now run ${chalk.white('guui TASK_NAME')} etc.`);
    list();
    process.exit();
}

// if a package script is calling this file, install GUUI cli.
if (process.env.npm_lifecycle_event) {
    try {
        execa.shellSync('which guui');
        warn(
            `Did you mean ${chalk.white(
                `guui ${process.env.npm_lifecycle_event}`,
            )}?`,
        );
    } catch (e) {
        warn(`Use the GUUI CLI rather than yarn or npm.`);
        install();
        log(
            `Try ${chalk.white(
                `guui ${process.env.npm_lifecycle_event}`,
            )} instead.`,
        );
    }
    process.exit();
}

checkDependencies(YARN_VERSION);

if (tasks[task]) {
    tasks[task]();
} else {
    warn(`No task called ${task} exists.`);
    list();
}
