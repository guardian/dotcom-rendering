const webpack = require('webpack');
const logUpdate = require('log-update');
const termSize = require('term-size');
const { green: colour } = require('chalk');

// we have multiple configs, which means multiple progress reports
// we store the various reports against each config here
const compilerProgress = {};

const { columns } = termSize();
const prod = process.env.NODE_ENV === 'production';
let shouldRun = true;

const bar = progress => {
    const complete = Math.floor(columns * progress);
    const remaining = columns - complete;
    const char = '•';
    return colour(char.repeat(complete)) + colour.dim(char.repeat(remaining));
};

const logProgress = () => {
    const values = Object.values(compilerProgress);
    const totalProgress =
        values.reduce((total, current) => total + current) / values.length;
    if (totalProgress < 1) {
        logUpdate(bar(totalProgress));
    } else if (prod) {
        logUpdate.clear();
    } else {
        // progress shows as dev server starts, but we don't want to ever show it after that
        shouldRun = false;
    }
};

function ProgressPlugin() {
    return compiler =>
        new webpack.ProgressPlugin(progress => {
            if (shouldRun) {
                compilerProgress[compiler] = progress;
                logProgress();
            }
        });
}

module.exports = ProgressPlugin;
