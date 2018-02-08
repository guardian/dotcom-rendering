// @flow
// @preval

// note: this file is intended to imported using babel-plugin-preval
// the easiest way is probably with the import-comment:
// https://www.npmjs.com/package/babel-plugin-preval#import-comment

const { readFileSync } = require('fs');

const resetCSSPath = require.resolve('reset-css');
module.exports = readFileSync(resetCSSPath, 'utf-8').replace(/\s/g, '');
