// @flow
const path = require('path');
const fs = require('fs');

module.exports.pages = fs
    .readdirSync(path.resolve(__dirname, '..', '..', 'src', 'pages'))
    .map(filename => filename.split('.js')[0]);

module.exports.injectPage = page =>
    `string-replace-loader?search=__PAGE__ENTRY__POINT__&replace=./pages/${page}!./src/browser.js`;
