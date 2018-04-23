const webpack = require('webpack');
const logUpdate = require('log-update');
const termSize = require('term-size');
const chalk = require('chalk');

const stages = {};
const { columns } = termSize();

const bar = progress => {
    const width = columns;
    const complete = Math.floor(width * progress);
    const remaining = width - complete;
    const char = '•';
    return (
        chalk.green(char.repeat(complete)) +
        chalk.green.dim(char.repeat(remaining))
    );
};

const logProgress = () => {
    const values = Object.values(stages);
    const progress =
        values.reduce((total, current) => total + current) / values.length;
    if (progress < 1) logUpdate(bar(progress));
    else logUpdate.clear();
};

function ProgressPlugin() {
    return ({ platform }) =>
        new webpack.ProgressPlugin(progress => {
            stages[platform] = progress;
            logProgress();
        });
}

module.exports = ProgressPlugin;
