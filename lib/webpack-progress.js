const webpack = require('webpack');
const logUpdate = require('log-update');
const termSize = require('term-size');
const { green: colour } = require('chalk');

const platforms = {};
const { columns } = termSize();

const bar = progress => {
    const complete = Math.floor(columns * progress);
    const remaining = columns - complete;
    const char = '•';
    return colour(char.repeat(complete)) + colour.dim(char.repeat(remaining));
};

const logProgress = () => {
    const values = Object.values(platforms);
    const progress =
        values.reduce((total, current) => total + current) / values.length;
    if (progress < 1) logUpdate(bar(progress));
    else logUpdate.clear();
};

function ProgressPlugin() {
    return platform =>
        new webpack.ProgressPlugin(progress => {
            platforms[platform] = progress;
            logProgress();
        });
}

module.exports = ProgressPlugin;
