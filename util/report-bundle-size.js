// @flow
/* eslint-disable import/no-extraneous-dependencies,no-console */
const path = require('path');
const { readdirSync, readFileSync } = require('fs');

const filesizegzip = require('filesizegzip');
const asTable = require('as-table');

const dist = path.join(__dirname, '..', 'dist');

function ReportBundleSize() {}

ReportBundleSize.prototype.apply = compiler => {
    compiler.plugin('done', () => {
        const files = readdirSync(dist)
            .filter(file => file.endsWith('.js') && file.includes('browser'))
            .map(file => [
                file,
                filesizegzip(readFileSync(path.join(dist, file), 'utf8'), true),
            ]);
        console.log(`${asTable(files)}\n`);
    });
};

module.exports = ReportBundleSize;
