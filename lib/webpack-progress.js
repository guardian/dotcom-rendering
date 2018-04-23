const webpack = require('webpack');
const logUpdate = require('log-update');
const termSize = require('term-size');
const { green: colour } = require('chalk');

const platforms = {};
const { columns } = termSize();
const prod = process.env.NODE_ENV === 'production';
let firstRun = true;

const bar = progress => {
    const complete = Math.floor(columns * progress);
    const remaining = columns - complete;
    const char = '•';
    return colour(char.repeat(complete)) + colour.dim(char.repeat(remaining));
};

const logProgress = () => {
    if (firstRun) {
        const values = Object.values(platforms);
        const progress =
            values.reduce((total, current) => total + current) / values.length;
        if (progress < 1) logUpdate(bar(progress));
        else if (prod) {
            logUpdate.clear();
        } else {
            // progress shows as dev server starts, but we don't want to ever show it after that
            firstRun = false;
        }
    }
};

function ProgressPlugin() {
    return platform =>
        new webpack.ProgressPlugin(progress => {
            platforms[platform] = progress;
            logProgress();
        });
}

module.exports = ProgressPlugin;
